import {Router} from 'express';
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/role.middleware.js";
import { getBookingStats } from "../controllers/stats.controller.js";

const router = Router();

router.get("/admin/stats", authMiddleware, authorize("admin"), getBookingStats);

export default router;