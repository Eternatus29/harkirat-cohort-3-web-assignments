//  start writing from here
import jwt from "jsonwebtoken";

function authMiddleware(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        res.status(403).json({
            message: "Couldn't verify session."
        });
        return;
    }
    try {
        const userId = jwt.verify(token, process.env.JWT_SECRET).id;
        req.userId = userId;
        next();
    } catch {
        res.status(401).json({
            message: "Session Expired."
        })
    }
}

export default authMiddleware;