import User from "../models/User.mjs";
import Link from "../models/Link.mjs";
import Product from "../models/Product.mjs";
import Profile from "../models/Profile.mjs";
import Analytic from "../models/Analytic.mjs";

class AdminController {
  // [GET] /api/admin/users - Lấy danh sách tất cả users với phân trang và filter
  async getAllUser(req, res, next) {
    try {
      const { page = 1, limit = 10, search = "", status } = req.query;

      // Query chỉ lấy user có role là 'creator'
      const query = {
        role: "creator",
      };

      // Tìm kiếm theo displayName hoặc email
      if (search) {
        query.$or = [
          // i: ignore case
          { displayName: { $regex: search, $options: "i" } },
          { email: { $regex: search, $options: "i" } },
        ];
      }

      // Filter theo trạng thái khóa/mở
      if (status && status !== "all") {
        query.isLocked = status === "locked";
      }

      // parse từ string
      const skip = (parseInt(page) - 1) * parseInt(limit);

      const users = await User.find(query)
        .select("-password")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit));

      const totalUsers = await User.countDocuments(query);

      return res.status(200).json({
        data: users,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total: totalUsers,
          totalPages: Math.ceil(totalUsers / parseInt(limit)),
        },
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  // [GET] /api/admin/user/:id - Lấy chi tiết user kèm theo profile, links và products
  async getUserDetails(req, res, next) {
    try {
      const { id } = req.params;
      const user = await User.findById(id);
      if (!user) return res.status(404).json({ message: "User not found" });

      // Lấy profile của user
      const profile = await Profile.findOne({ userId: user._id });

      let links = [];
      let products = [];
      // todo: fix ko lấy deleted của creator
      if (profile) {
        // Lấy tất cả links, ưu tiên hiển thị links vi phạm (isFlagged) trước
        links = await Link.find({ profileId: profile._id }).sort({
          isFlagged: -1,
          deletedAt: -1,
          createdAt: -1,
        });

        // Lấy tất cả products, ưu tiên hiển thị products vi phạm trước
        products = await Product.find({ profileId: profile._id }).sort({
          isFlagged: -1,
          deletedAt: -1,
          createdAt: -1,
        });
      }

      res.json({ user, profile, links, products });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  // [PATCH] /api/admin/users/:id/lock - Khóa/mở khóa tài khoản user
  // Feature: Account lock/unlock with violation tracking
  async toggleLockUser(req, res, next) {
    try {
      const { id } = req.params;
      const user = await User.findById(id);

      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }

      // Không cho phép khóa tài khoản admin
      if (user.role === "admin") {
        return res
          .status(403)
          .json({ message: "Cannot lock an admin account." });
      }

      // Toggle trạng thái isLocked (true <-> false)
      user.isLocked = !user.isLocked;
      await user.save();

      return res.status(200).json({ message: "User locked successfully!" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  // [GET] /api/admin/links - Lấy danh sách links với filter theo trạng thái vi phạm
  // Feature: Flagged items listing
  async getAllLinks(req, res, next) {
    try {
      const { page = 1, limit = 10, search = "", status } = req.query;
      const query = {
        deletedBy: null,
      };

      // Filter: lấy links bị flagged hoặc safe
      if (status === "flagged") {
        query.isFlagged = true;
      } else if (status === "safe") {
        query.isFlagged = false;
      }

      if (search) {
        query.$or = [
          { title: { $regex: search, $options: "i" } },
          { url: { $regex: search, $options: "i" } },
        ];
      }

      const skip = (parseInt(page) - 1) * parseInt(limit);

      const links = await Link.find(query)
        .populate({
          path: "profileId",
          select: "username avatarUrl userId",
          populate: { path: "userId", select: "email displayName" },
        })
        .sort({ isFlagged: -1, createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit));

      const totalLinks = await Link.countDocuments(query);

      return res.status(200).json({
        data: links,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total: totalLinks,
          totalPages: Math.ceil(totalLinks / parseInt(limit)),
        },
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  // PATCH /api/admin/links/:id/resolve - Xử lý link vi phạm
  // Feature: Approve/Ban actions (safe/banned/ban_user)
  async resolveLinkViolation(req, res, next) {
    try {
      const { id } = req.params;
      const { decision } = req.body; // safe/banned/ban_user

      if (!["safe", "banned", "ban_user"].includes(decision)) {
        return res.status(400).json({ message: "Invalid decision" });
      }

      const link = await Link.findById(id);
      if (!link) return res.status(404).json({ message: "Link not found" });

      // Action: APPROVE - đánh dấu link an toàn, giảm violation count
      if (decision === "safe") {
        link.isFlagged = false;
        link.violationReason = null;
        link.violationConfidence = 0;
        link.isEnable = true;
        link.adminDecision = "safe";

        link.deletedBy = null;
        link.deletedAt = null;

        await link.save();

        // giảm số violation count
        const profile = await Profile.findById(link.profileId);
        if (profile) {
          await User.findByIdAndUpdate(profile.userId, {
            $inc: { violationCount: -1 },
          });
        }
        // Action: BAN - xóa mềm link vi phạm
      } else if (decision === "banned") {
        link.deletedBy = "admin";
        link.deletedAt = new Date();
        link.isEnable = false;
        link.adminDecision = "banned";

        await link.save();
        return res.json({
          message: "Link has been removed (soft delete) due to violation.",
        });
        // Action: BAN USER - xóa link và khóa tài khoản user
      } else if (decision === "ban_user") {
        link.deletedBy = "admin";
        link.deletedAt = new Date();
        link.isEnable = false;
        link.adminDecision = "banned";
        await link.save();

        const profile = await Profile.findById(link.profileId);
        if (profile) {
          await User.findByIdAndUpdate(profile.userId, {
            isLocked: true,
          });
        }

        return res.json({
          message: "Link removed and User locked successfully.",
        });
      }
      res.json({ message: "Link status updated", link });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  // [GET] /api/admin/products - Lấy danh sách products với filter vi phạm
  // Feature: Flagged items listing
  async getAllProducts(req, res, next) {
    try {
      const { page = 1, limit = 10, search = "", status } = req.query;
      const query = { deletedBy: null };

      // Filter theo trạng thái flagged/safe
      if (status === "flagged") query.isFlagged = true;
      else if (status === "safe") query.isFlagged = false;

      if (search) {
        query.$or = [
          { name: { $regex: search, $options: "i" } },
          { buyLink: { $regex: search, $options: "i" } },
        ];
      }

      const skip = (parseInt(page) - 1) * parseInt(limit);

      const products = await Product.find(query)
        .populate({
          path: "profileId",
          select: "username avatarUrl userId",
          populate: { path: "userId", select: "email displayName" },
        })
        .sort({ isFlagged: -1, createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit));

      const totalProducts = await Product.countDocuments(query);

      return res.status(200).json({
        data: products,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total: totalProducts,
          totalPages: Math.ceil(totalProducts / parseInt(limit)),
        },
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  // [PATCH] /api/admin/products/:id/resolve - Xử lý product vi phạm
  // Feature: Approve/Ban actions
  async resolveProductViolation(req, res, next) {
    try {
      const { id } = req.params;
      const { decision } = req.body; // safe/banned/ban_user

      if (!["safe", "banned", "ban_user"].includes(decision)) {
        return res.status(400).json({ message: "Invalid decision" });
      }

      const product = await Product.findById(id);
      if (!product)
        return res.status(404).json({ message: "Product not found" });

      // APPROVE - đánh dấu product an toàn
      if (decision === "safe") {
        product.isFlagged = false;
        product.violationReason = null;
        product.violationConfidence = 0;
        product.isEnable = true;
        product.adminDecision = "safe";
        product.deletedBy = null;
        product.deletedAt = null;

        await product.save();

        const profile = await Profile.findById(product.profileId);
        if (profile) {
          await User.findByIdAndUpdate(profile.userId, {
            $inc: { violationCount: -1 },
          });
        }
        // BAN - xóa mềm product vi phạm
      } else if (decision === "banned") {
        product.deletedBy = "admin";
        product.deletedAt = new Date();
        product.isEnable = false;
        product.adminDecision = "banned";
        await product.save();
        return res.json({ message: "Product removed (soft delete)." });
        // BAN_USER - xóa product và khóa tài khoản
      } else if (decision === "ban_user") {
        product.deletedBy = "admin";
        product.deletedAt = new Date();
        product.isEnable = false;
        product.adminDecision = "banned";
        await product.save();

        const profile = await Profile.findById(product.profileId);
        if (profile) {
          await User.findByIdAndUpdate(profile.userId, { isLocked: true });
        }
        return res.json({
          message: "Product removed and User locked successfully.",
        });
      }
      res.json({ message: "Product status updated.", product });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  // [GET] /api/admin/analytics
  async getSystemAnalytics(req, res, next) {
    try {
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      sevenDaysAgo.setHours(0, 0, 0, 0);

      // 1. TỔNG QUAN (LIFETIME COUNTS)
      const [totalUsers, totalProfiles, totalLinks, totalProducts] =
        await Promise.all([
          User.countDocuments({}),
          Profile.countDocuments({}),
          Link.countDocuments({}),
          Product.countDocuments({}),
        ]);

      // 2. TRAFFIC TOÀN HỆ THỐNG (7 NGÀY QUA)
      // Gom nhóm theo ngày và loại (view/click)
      const trafficStats = await Analytic.aggregate([
        {
          $match: {
            createdAt: { $gte: sevenDaysAgo },
          },
        },
        {
          $group: {
            _id: {
              date: {
                $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
              },
              type: "$type",
            },
            count: { $sum: 1 },
          },
        },
        { $sort: { "_id.date": 1 } },
      ]);

      // 3. TĂNG TRƯỞNG USER MỚI (7 NGÀY QUA)
      const userGrowth = await User.aggregate([
        {
          $match: {
            createdAt: { $gte: sevenDaysAgo },
          },
        },
        {
          $group: {
            _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
            count: { $sum: 1 },
          },
        },
        { $sort: { _id: 1 } },
      ]);

      // 4. TOP 5 CREATOR CÓ NHIỀU VIEW NHẤT (LIFETIME)
      // Phức tạp hơn xíu: Group Analytic theo profileId -> Đếm -> Sort -> Lookup Profile info
      const topProfiles = await Analytic.aggregate([
        { $match: { type: "view" } },
        { $group: { _id: "$profileId", views: { $sum: 1 } } },
        { $sort: { views: -1 } },
        { $limit: 5 },
        {
          $lookup: {
            from: "profiles", // Tên collection trong DB (thường là số nhiều chữ thường)
            localField: "_id",
            foreignField: "_id",
            as: "profileInfo",
          },
        },
        { $unwind: "$profileInfo" }, // Bung mảng ra object
        {
          // project đùng dể chỉ lựa ra những thuộc tính này để trả về
          $project: {
            username: "$profileInfo.username",
            avatarUrl: "$profileInfo.avatarUrl",
            views: 1, // giữ nguyên
          },
        },
      ]);

      res.status(200).json({
        counts: {
          users: totalUsers,
          profiles: totalProfiles,
          links: totalLinks,
          products: totalProducts,
        },
        trafficStats,
        userGrowth,
        topProfiles,
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

export default new AdminController();
