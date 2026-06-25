import {
    registerUserService,
    loginUserService
} from "../services/auth.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const registerUser = asyncHandler(async (req, res) => {

    const { user, token } = await registerUserService(req.body);

    res.cookie("token", token);
    res.status(201).json({
        success: true,
        message: "User registered successfully",
        data: user.isSelected("-password")
    });

});

export const loginUser = asyncHandler(async (req, res) => {

    const { user, token } = await loginUserService(req.body);
    res.cookie("token", token);
    res.status(200).json({
        success: true,
        message: "User logged in successfully",
        data: user.isSelected("-password")
    })
});

export const logoutUser = asyncHandler(async (req, res) => {

    res.clearCookie("token");
    res.status(200).json({
        success: true,
        message: "User logged out successfully"
    })

});