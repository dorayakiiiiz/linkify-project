import authRouter from "./auth.mjs";
import homeRouter from "./home.mjs";
import userRouter from "./user.mjs";
import profileRouter from "./profile.mjs";
import linkRouter from "./link.mjs";
import shopRouter from "./shop.mjs"; 
import adminRouter from "./admin.mjs"

export default function route(app) {
  app.use("/api/admin", adminRouter);
  app.use("/api/auth", authRouter);
  app.use("/api/user", userRouter);
  app.use("/api/profile", profileRouter);
  app.use("/api/links", linkRouter);
  app.use("/api/shop", shopRouter); 

  app.use("/api", homeRouter);
}
