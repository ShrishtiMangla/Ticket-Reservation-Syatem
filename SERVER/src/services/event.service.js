import Event from '../models/event.model.js';

export const addEventService = async (eventData , userId) => {
    if(eventData.price<0){
        throw new Error("Price cannot be negative");
    }
    eventData.createdBy = userId;
    eventData.availableSeats = eventData.totalSeats;
    const event = new Event(eventData);
    return await event.save();
};

export const getAllEventsService = (req,res)=>{
    return Event.find();
};

export const getEventByIdService = (id)=>{
    return Event.find()
            .sort({dateTime:1});;
};

export const updateEventService = (id, updateData)=>{
    if(updateData.price<0){
        throw new Error("Price cannot be negative");
    }
    return Event.findByIdAndUpdate(
        id,
        updateData,
        { new: true }
    );
};

export const deleteEventService = (id)=>{
    return Event.findByIdAndDelete(id);
};