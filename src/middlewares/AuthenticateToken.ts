import jwt from "jsonwebtoken";

export default function AuthenticateToken(req, res, next) {
    // authorization["Bearer TOKEN"]

    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (token == null) {
        return res.status(401).json({
            message: "No token",
        });
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            console.log(err);
            return res.status(403).json({
                message: "Invalid Token",
            });
        }

        req.user = user;
        next();
    });
}
