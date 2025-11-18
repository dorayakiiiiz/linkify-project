
import authRouter from "./auth.mjs";
import homeRouter from "./home.mjs";
import userRouter from "./user.mjs"
import profileRouter from "./profile.mjs"

export default function route(app) {

    app.use('/api/auth', authRouter);
    app.use('/api/user', userRouter);
    app.use('/api/profile', profileRouter);
<<<<<<< HEAD
=======

>>>>>>> 98d09f1c93f136487e4caa6f3003b152dd181b2b
    app.use('/api', homeRouter);

    // link routes (CRUD link)
    // app.use('/api/links', linkRouter);

}