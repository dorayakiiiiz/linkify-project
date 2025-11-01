
import authRouter from "./auth.mjs";
import homeRouter from "./home.mjs";


export default function route(app) {

    app.use('/auth', authRouter);

    app.use('/', homeRouter);
}