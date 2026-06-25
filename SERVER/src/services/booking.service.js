import mongoose from "mongoose";
import booking from "../models/booking.model.js"
import Event from "../models/event.model.js"
import AppError from "../utils/AppError.js";

export const createBookingService = async (eventId , userId , reqBody) => {
    const session = await mongoose.startSession();
    try{
        session.startTransaction();

        if(reqBody.numberOfSeats <= 0){
            throw new AppError("Number of seats must be greater than 0",400);
        }

        const e = await Event.findById(eventId).session(session);
        if(!e){
            throw new AppError("Event not found",404);
        }

        const event = await Event.findOneAndUpdate( // made code atomic
            {
                _id:eventId,
                availableSeats:{$gte:reqBody.numberOfSeats}
            },{
                $inc:{availableSeats:-reqBody.numberOfSeats}
            },{
                new: true,
                session: session
            }
        );

        if(!event){
            throw new AppError("Not enough seats available",400);
        }

        const totalPrice = event.price * reqBody.numberOfSeats;

        const bookingData = {
            user:userId,
            event:event._id,
            numberOfSeats:reqBody.numberOfSeats,
            totalPrice:totalPrice
        }

        const bookingDoc = new booking(bookingData);
        await bookingDoc.save({
            session: session
        });

        await session.commitTransaction();
        return bookingDoc;

    }catch(err){
        await session.abortTransaction();
        throw err;
        
    }finally{
        await session.endSession();
    }    
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
        throw new AppError("Booking not found",404);
    };
    if (bookingDoc.bookingStatus === "CANCELLED") {
        throw new AppError("Booking already cancelled",409);
    }

    const session = await mongoose.startSession();

    try{
        session.startTransaction();
        bookingDoc.bookingStatus = "CANCELLED";
        await bookingDoc.save(
            { session }
        );

        const event = await Event.findById(bookingDoc.event).session(session);
        if(event){
            event.availableSeats += bookingDoc.numberOfSeats;
            await event.save(
                { session }
            );
        }

        await session.commitTransaction();
        return bookingDoc;

    }catch(err){
        await session.abortTransaction();
        throw err;

    }finally{
        await session.endSession();
    }

    
};
