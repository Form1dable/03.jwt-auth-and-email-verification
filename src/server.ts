import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import path from "path";

import connectDB from "./configs/db";

// Route imports
import AuthRoute from "./routes/AuthRoute";
import UserRoute from "./routes/UserRoute";

// Configuration
const app = express();
const PORT = process.env.PORT || 5000;
dotenv.config({ path: path.join(__dirname, "../.env") });
connectDB();

// Limiting Rules
const apiLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // Limit each IP to create 100 request in 1 Minute
    max: 100,
});

// Middlewares
app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use("/api", apiLimiter);
// Add create account api limiter later

// Routes
app.use("/user", UserRoute);
app.use("/auth", AuthRoute);

app.listen(PORT, () => {
    console.log(`SERVER STARTED ON PORT: ${PORT}`);
});
