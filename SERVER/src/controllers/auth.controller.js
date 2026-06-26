import { registerUserService, loginUserService } from "../services/auth.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import logger from "../utils/logger.js";

export const registerUser = asyncHandler(async (req, res) => {

    const { user, token } = await registerUserService(req.body);

    res.cookie("token", token);

    logger.info(
        `New user registered: ${user.email}`
    );

    res.status(201).json({
        success: true,
        message: "User registered successfully",
        data: user
    });

    
});

export const loginUser = asyncHandler(async (req, res) => {

    const { user, token } = await loginUserService(req.body);
    res.cookie("token", token);

    logger.info(
        `User logged in: ${user.email}`
    );

    res.status(200).json({
        success: true,
        message: "User logged in successfully",
        data: user
    })
    
});

export const logoutUser = asyncHandler(async (req, res) => {

    res.clearCookie("token");

    logger.info(
        `User logged out`
    );

    res.status(200).json({
        success: true,
        message: "User logged out successfully"
    })

});