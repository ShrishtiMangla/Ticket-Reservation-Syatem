import { Router } from "express";
import {
    registerUser,
    loginUser,
    logoutUser
} from "../controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.get(
    "/test",
    authMiddleware,
    (req,res)=>{
        res.json({
            success:true,
            user:req.user
        });
    }
);

export default router;