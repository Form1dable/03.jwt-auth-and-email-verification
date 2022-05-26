import express from "express";
import User from "../models/User";
import bcrypt from "bcryptjs";
import rateLimit from "express-rate-limit";

const router = express.Router();

// Rate Limiter
const createAccountLimiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 10,
    message:
        "Too many accounts have been created from this IP, please try again later.",
});

router.post("/sign-in", (req, res) => {
    return res.status(200).json({
        message: "Login",
    });
});

router.post("/sign-up", createAccountLimiter, async (req, res) => {
    try {
        const { username, email, password, confirm_password } = req.body;
        if (password !== confirm_password) {
            return res.status(403).json({
                message: "Password doesn't match",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            username,
            email,
            password: hashedPassword,
        });

        await user.save();

        return res.status(200).json({
            message: "Successfully created User Account",
            user,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error,
        });
    }
    return res.status(200).json({
        message: "Successfully created-user",
    });
});

export default router;
