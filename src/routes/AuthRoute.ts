import express from "express";

// Middleware Imports
import { SignUpRateLimit } from "../middlewares/RateLimiter";
import AuthenticateToken from "../middlewares/AuthenticateToken";

// Controllers
import {
    VerifyEmailPostController,
    SignupPostController,
    SignInPostController,
    SendEmailGetController,
} from "../controllers/AuthController";

const router = express.Router();

router.post("/sign-in", SignInPostController);
router.post("/sign-up", SignUpRateLimit, SignupPostController);
router.post("/verify-email/:token", VerifyEmailPostController);
router.get("/send-email", AuthenticateToken, SendEmailGetController);

export default router;
