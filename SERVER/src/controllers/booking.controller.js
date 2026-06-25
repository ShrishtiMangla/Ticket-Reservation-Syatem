import {
    createBookingService,
    getMyBookingsService,
    getBookingByIdService,
    cancelBookingService
} from "../services/booking.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const createBooking = asyncHandler(async (req, res) => {
    const eventId = req.params.id;
    const userId = req.user._id;

    const booking = await createBookingService(eventId, userId, req.body);
    res.status(201).json({
        success: true,
        message: "Booking created successfully",
        data: booking
    });

});

export const getMyBookings = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    const bookings = await getMyBookingsService(userId);
    res.status(200).json({
        success: true,
        message: "Bookings retrieved successfully",
        data: bookings
    });

});

export const getBookingById = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const bookingId = req.params.id;

    const booking = await getBookingByIdService(userId, bookingId);
    res.status(200).json({
        success: true,
        message: "Booking retrieved successfully",
        data: booking
    });

});

export const cancelBooking = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const bookingId = req.params.id;

    await cancelBookingService(userId, bookingId);
    res.status(200).json({
        success: true,
        message: "Booking cancelled successfully"
    });

});
