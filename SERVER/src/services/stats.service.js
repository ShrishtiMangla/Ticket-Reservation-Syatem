import booking from "../models/booking.model.js";

export const getBookingStatsService = async (req,res)=>{
    const totalBookings = await booking.countDocuments();
    const pendingBookings = await booking.countDocuments({
        bookingStatus: "IN-PROCESS"
    });

    const cancelledBookings = await booking.countDocuments({
        bookingStatus: "CANCELLED"
    });

    const confirmedBookings = await booking.countDocuments({
        bookingStatus: "CONFIRMED"
    });
    const Bookings = await booking.find({
        bookingStatus: "CONFIRMED"
    });

    let totalRevenue = 0;

    for(const booking of Bookings){
        totalRevenue += booking.totalPrice;
    }
    return {
        totalBookings,
        pendingBookings,
        cancelledBookings,
        confirmedBookings,
        totalRevenue    
    }
}