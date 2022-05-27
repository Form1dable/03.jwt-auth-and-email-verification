import rateLimit from "express-rate-limit";

export const APIRateLimit = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 100,
    message:
        "Too many requests have been made from this IP, please try again later",
});

export const SignUpRateLimit = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 10,
    message: "Too many accounts created from this IP, please try agiain later",
});
