import User from "../models/User";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export async function SignupPostController(req, res, next) {
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

        const accessToken = jwt.sign({user.id}, process.env.ACCESS_TOKEN_SECRET)

        return res.status(200).json({
            message: "Successfully created User Account",
            accessToken
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error,
        });
    }
}

export async function SignInPostController(req, res, next) {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(403).json({
            message: "Email and Password is required",
        });
    }

    const user = await User.findOne({ email });

    if (!user) {
        return res.status(403).json({
            message: "Error: user not found",
        });
    }

    try {
        if (await bcrypt.compare(password, user.password)) {
            const { id, username, email } = user;
            const accessToken = jwt.sign(
                { id },
                process.env.ACCESS_TOKEN_SECRET
            );
            res.status(200).json({
                message: "Success",
                accessToken,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error,
        });
    }
}
