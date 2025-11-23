
import authRouter from "./auth.mjs";
import homeRouter from "./home.mjs";
import userRouter from "./user.mjs"
import profileRouter from "./profile.mjs"

export default function route(app) {

    app.use('/api/auth', authRouter);
    app.use('/api/user', userRouter);
    app.use('/api/profile', profileRouter);
    app.use('/api', homeRouter);

    // link routes (CRUD link)
    // app.use('/api/links', linkRouter);

}