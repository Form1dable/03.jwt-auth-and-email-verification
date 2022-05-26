import express from "express";
import User from "../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import rateLimit from "express-rate-limit";

// Controllers
import {
    SignupPostController,
    SignInPostController,
} from "../controllers/AuthController";

const router = express.Router();

// Rate Limiter
const createAccountLimiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 10,
    message:
        "Too many accounts have been created from this IP, please try again later.",
});

router.post("/sign-in", SignInPostController);

router.post("/sign-up", createAccountLimiter, SignupPostController);

export default router;
