import User from "../models/User";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";

// Utils
import SendMail from "../utils/SendMail";

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
        const { id } = user;

        const accessToken = jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: "10m",
        });

        return res.status(200).json({
            message: "Successfully created User Account",
            accessToken,
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
            const { id } = user;
            const accessToken = jwt.sign(
                { id },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: "10m" }
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

export async function VerifyEmailPostController(req, res, next) {
    const token = req.params.token;
    if (token == null) {
        return res.status(403).json({
            message: "Invalid",
        });
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, id) => {
        if (err) {
            return res.status(403).json({
                message: "Invalid",
            });
        }

        const user = await User.findOne({ id });
        user.update({ verified: true });

        res.status(200).json({
            message: "Your account has been successfully verified",
        });
    });
}

export async function SendEmailGetController(req, res, next) {
    // const info = SendMail();

    const { id } = req.user;

    const verifyToken = jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findOne({ id });
    //const { email } = user;
    let email = "sacoca1552@steamoh.com";

    try {
        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_PORT,
            auth: {
                user: process.env.MAIL_USERNAME,
                pass: process.env.MAIL_PASSWORD,
            },
        });

        const verificationMail = `localhost:5000/auth/verify-token/${verifyToken}`;

        // Message object
        let message = {
            from: `Express AUTH <${process.env.MAIL_USERNAME}>`,
            to: `Recipient <${email}>`,
            subject: "Auth Verification Email",
            text: `Click the link below to verify the account`,
        };

        // Sending email with the message
        transporter.sendMail(message, (err, info) => {
            if (err) {
                console.log("Error occurred. " + err.message);
                return res.status(500).json({
                    message: "Internal server error",
                });
            }
            return res.json({
                message: "Success",
                info,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error,
        });
    }
}
