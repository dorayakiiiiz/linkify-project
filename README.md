# Linkify

Linkify là một nền tảng SaaS Bio-Link Aggregator cho phép người dùng (Creators, KOLs, KOCs) xây dựng landing page cá nhân hóa duy nhất nhằm tổng hợp và điều hướng toàn bộ liên kết mạng xã hội (TikTok, Instagram, Facebook, Youtube,...). Bên cạnh đó, hệ thống còn hỗ trợ các tính năng mở rộng như tích hợp cửa hàng sản phẩm (Creator Shop) và quyên góp (Donation). Hệ thống bao gồm Web App cho Creator/Khán giả và Admin Dashboard để quản lý người dùng cũng như kiểm duyệt nội dung.

**🚀 Live Demo:** [https://my-linkify.vercel.app](https://my-linkify.vercel.app)

---

## Key Technical Features

Dự án này tập trung tối ưu trải nghiệm cá nhân hóa và quản lý nội dung đa nền tảng:

- **Tùy Chỉnh Giao Diện Real-Time & Kéo Thả:** Tùy biến toàn bộ giao diện (Theme, Gradient/Image Background, Button Styles, Typography) với tính năng xem trước (Live Preview) theo thời gian thực và kéo thả sắp xếp thứ tự liên kết/sản phẩm bằng **@hello-pangea/dnd**.
- **Thống Kê Truy Cập & Phân Tích (Analytics):** Hệ thống ghi nhận và phân tích sự kiện truy cập (`view`, `link_click`, `shop_click`) theo loại thiết bị (Mobile, Desktop) và nguồn truy cập (Referrer), trực quan hóa dữ liệu qua biểu đồ **Recharts**.
- **Creator Shop & Donation Integration:** Hỗ trợ đăng tải danh mục sản phẩm affiliate/bán hàng trực tiếp và tích hợp quyên góp thông qua cổng thanh toán hoặc mã QR Code động (**react-qr-code**).
- **Tự Động Hóa Ý Tưởng Bằng AI:** Tích hợp **OpenAI / Groq API** giúp Creator tự động đề xuất ý tưởng tiêu đề, nội dung bài đăng truyền thông nhanh chóng.
- **Xác Thực An Toàn & Phân Quyền Chặt Chẽ:** Hỗ trợ đăng ký/đăng nhập qua Email/Password (mã hóa bcrypt, xác thực JWT) và OAuth 2.0 (Google, Facebook) bằng **Passport.js**. Phân quyền phân biệt rõ ràng giữa Creator và Admin.
- **Kiểm Duyệt Nội Dung & Thùng Rác (Moderation & Soft Delete):** Trang Admin kiểm duyệt và xử lý tự động/thủ công các đường dẫn, sản phẩm vi phạm chính sách; tích hợp cơ chế Thùng rác khôi phục dữ liệu cho người dùng.

---

## Tech Stack

- **Backend:** Node.js, Express.js, MongoDB (Mongoose ORM), JWT, Passport.js.
- **Frontend (Web):** React.js (Vite), Tailwind CSS, Context API, Axios.
- **Khác:** OpenAI / Groq SDK (AI Content), Cloudinary (Media Storage), Brevo / Nodemailer (Email OTP), Recharts, @hello-pangea/dnd.

---

## Hướng Dẫn Cài Đặt & Chạy Môi Trường Local

Dưới đây là các bước để chạy toàn bộ hệ thống (Web Frontend + Backend API) ở môi trường máy tính cá nhân.

### 1. Cài Đặt Backend (Node.js / Express)

Mở Terminal 1 và trỏ vào thư mục `backend`:

```bash
cd backend
npm install
```

Tạo file `.env` từ file mẫu `.env.example`:

```bash
# Trên Linux/macOS
cp .env.example .env

# Trên Windows (PowerShell)
Copy-Item .env.example .env
```

Điền các thông số cấu hình tương ứng vào file `.env`:

```env
PORT=5000
CLIENT_URL=http://localhost:5173
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

# Email Service (Nodemailer / Gmail)
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password

# Groq AI Service (Content Moderation)
GROQAI_API_KEY=your_groq_api_key

# Storage (Cloudflare R2 / AWS S3)
S3_ENDPOINT=https://your_r2_endpoint.r2.cloudflarestorage.com
S3_ACCESS_KEY_ID=your_access_key
S3_SECRET_ACCESS_KEY=your_secret_key
S3_BUCKET_NAME=linkify
S3_PUBLIC_DOMAIN=https://pub-your_id.r2.dev
```

Khởi động Server Backend (Port 5000):

```bash
npm run dev
```

### 2. Cài Đặt Frontend (React / Vite)

Mở Terminal 2 và trỏ vào thư mục `frontend`:

```bash
cd frontend
npm install
```

Tạo file `.env` từ file mẫu `.env.example`:

```bash
# Trên Linux/macOS
cp .env.example .env

# Trên Windows (PowerShell)
Copy-Item .env.example .env
```

Nội dung file `frontend/.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

Khởi động Web Frontend:

```bash
npm run dev
```

Trang web sẽ chạy tại địa chỉ: `http://localhost:5173`. Bạn có thể mở trình duyệt để bắt đầu trải nghiệm.
