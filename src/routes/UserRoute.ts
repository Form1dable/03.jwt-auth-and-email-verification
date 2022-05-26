import express from "express";
import AuthenticateToken from "../middlewares/AuthenticateToken";

const router = express.Router();

router.get("/profile", AuthenticateToken, async (req, res) => {
    const user = req.user;
    return res.status(200).json({
        message: "Profile",
        user,
    });
});

router.post("/create-profile", (req, res) => {
    return res.status(200).json({
        message: "Profile Created Successfully",
    });
});

export default router;
