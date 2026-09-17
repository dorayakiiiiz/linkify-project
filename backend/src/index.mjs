
import express from 'express'
import cors from 'cors'
import passport from 'passport'
import cookiePaser from 'cookie-parser'


import { configDotenv } from "dotenv";
configDotenv();

import dbConnect from "./config/db/index.mjs";
import route from "./routes/index.mjs";
import { errorHandler } from "./middleware/ErrorMiddleware.mjs";
import { globalLimiter } from "./middleware/RateLimitMiddleware.mjs";
// import { recoverPendingModerations } from "./utils/moderationQueue.mjs";

const app = express();
const PORT = process.env.PORT;

// connect to database
dbConnect();
// dbConnect().then(() => {
//   recoverPendingModerations();
// });

// Init passport
app.use(passport.initialize())

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

const allowedOrigins = [
  "http://localhost:5173", // frontend dev
  'https://my-linkify.vercel.app'
];

const corsOptions = {
  origin: allowedOrigins,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));

app.options(/.*/, cors(corsOptions));

// Apply global rate limiting
app.use(globalLimiter);

// route app
route(app);

// Global error handling middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
