//authorization middleware
import jwt from "jsonwebtoken";

export const authorize = (role) => {
    return (req, res, next) => {

        if (req.user.role !== role) {
            return res.status(403).json({
                success: false,
                message: "Access denied. Insufficient permissions."
            });
        }

        next();
    };
};