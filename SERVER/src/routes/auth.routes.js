import { Router } from "express";
import {
    registerUser,
    loginUser,
    logoutUser
} from "../controllers/auth.controller.js";
import {authLimiter} from "../middlewares/rateLimiter.middleware.js";

const router = Router();

router.post("/register", authLimiter, registerUser);
router.post("/login", authLimiter, loginUser);
router.get("/logout", logoutUser);

export default router;