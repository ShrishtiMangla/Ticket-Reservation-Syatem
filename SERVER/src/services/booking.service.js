import booking from "../models/booking.model.js"
import Event from "../models/event.model.js"

export const createBookingService = async (eventId , userId , reqBody) => {
    const event = await Event.findById(eventId);
    if(!event){
        throw new Error("Event not found");
    }
    if(event.availableSeats < reqBody.numberOfSeats){
        throw new Error("Not enough seats available");
    }
    if(reqBody.numberOfSeats <= 0){
        throw new Error("Number of seats must be greater than 0");
    }
    const totalPrice = event.price * reqBody.numberOfSeats;

    const bookingData = {
        user:userId,
        event:event._id,
        numberOfSeats:reqBody.numberOfSeats,
        totalPrice:totalPrice
    }

    const bookingDoc = new booking(bookingData);
    await bookingDoc.save();

    event.availableSeats -= reqBody.numberOfSeats;
    await event.save();

    return bookingDoc;
};

export const getMyBookingsService = async (userId) => {
    const bookings = await booking.find({user:userId}).populate("event");
    return bookings;
};

export const getBookingByIdService = async (userId, bookingId) => {
    const bookingDoc = await booking.findOne({_id:bookingId, user:userId}).populate("event");
    if(!bookingDoc){
        throw new Error("Booking not found");
    }
    return bookingDoc;
};

export const cancelBookingService = async (userId, bookingId) => {
    const bookingDoc = await booking.findOne({_id:bookingId, user:userId});
    if(!bookingDoc){
        throw new Error("Booking not found");
    }
    await booking.deleteOne({_id:bookingId});
    return bookingDoc;
};
