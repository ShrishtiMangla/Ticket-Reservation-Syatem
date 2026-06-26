import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const authMiddleware = asyncHandler(async (req, res, next) => {

    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "You are not logged in"
        });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
        return res.status(401).json({
            success: false,
            message: "User not found"
        });
    }

    req.user = user;

    next();

});