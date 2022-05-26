import express from "express";

const router = express.Router();

router.get("/profile", (req, res) => {
    return res.status(200).json({
        message: "Profile",
    });
});

router.post("/create-profile", (req, res) => {
    return res.status(200).json({
        message: "Profile Created Successfully",
    });
});

export default router;
