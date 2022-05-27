import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import helmet from "helmet";
import path from "path";

import connectDB from "./configs/db";

// Route imports
import AuthRoute from "./routes/AuthRoute";
import UserRoute from "./routes/UserRoute";

// Middleware Imports
import { APIRateLimit } from "./middlewares/RateLimiter";

// Configuration
const app = express();
const PORT = process.env.PORT || 5000;
dotenv.config({ path: path.join(__dirname, "../.env") });
connectDB();

// Middlewares
app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", APIRateLimit);
// Add create account api limiter later

// Routes
app.use("/user", UserRoute);
app.use("/auth", AuthRoute);

app.listen(PORT, () => {
    console.log(`SERVER STARTED ON PORT: ${PORT}`);
});
