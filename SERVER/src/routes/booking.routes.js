import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/role.middleware.js";
import { createBooking } from "../controllers/booking.controller.js";
import { getMyBookings } from "../controllers/booking.controller.js";
import { getBookingById } from "../controllers/booking.controller.js";
import { cancelBooking } from "../controllers/booking.controller.js";

const router = Router();

router.post('/:id', authMiddleware, authorize('user'), createBooking); // id here is event id
router.get("/", authMiddleware, authorize('user'), getMyBookings);
router.get("/:id", authMiddleware, getBookingById);//here is booking id
router.delete("/:id", authMiddleware, cancelBooking);//here is booking id

export default router;