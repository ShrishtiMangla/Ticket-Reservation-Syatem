import {createBookingService} from "../services/booking.service.js";
import { getMyBookingsService } from "../services/booking.service.js";
import { getBookingByIdService } from "../services/booking.service.js";
import { cancelBookingService } from "../services/booking.service.js";

export const createBooking = async (req, res) => {
    const eventId = req.params.id;
    const userId = req.user._id;

    try {
        const booking = await createBookingService(eventId, userId, req.body);
        res.status(201).json({
            success: true,
            message: "Booking created successfully",
            data: booking
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
}

export const getMyBookings = async (req, res) => {
    const userId = req.user._id;

    try {
        const bookings = await getMyBookingsService(userId);
        res.status(200).json({
            success: true,
            message: "Bookings retrieved successfully",
            data: bookings
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

export const getBookingById = async (req, res) => {
    const userId = req.user._id;
    const bookingId = req.params.id;

    try {
        const booking = await getBookingByIdService(userId, bookingId);
        res.status(200).json({
            success: true,
            message: "Booking retrieved successfully",
            data: booking
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

export const cancelBooking = async (req, res) => {
    const userId = req.user._id;
    const bookingId = req.params.id;

    try {
        await cancelBookingService(userId, bookingId);
        res.status(200).json({
            success: true,
            message: "Booking cancelled successfully"
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};
