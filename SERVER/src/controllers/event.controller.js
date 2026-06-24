import {
    addEventService, getAllEventsService, getEventByIdService, updateEventService, deleteEventService
} from '../services/event.service.js';

export const addEvent = async (req, res) => {
    try{
        const event = await addEventService(req.body , req.user._id);
        res.status(201).json({
            success:true,
            message:"Event added successfully",
            data:event
        })
    }catch(err){
        res.status(500).json({
            success:false,
            message:err.message
        })
    }
}

export const getAllEvents = async (req, res) => {
    try{
        const events = await getAllEventsService();
        res.status(200).json({
            success:true,
            message:"Events fetched successfully",
            data:events
        })
    }catch(err){
        res.status(500).json({
            success:false,
            message:err.message
        })
    }
}
export const getEventById = async (req, res) => {
    try{
        const event = await getEventByIdService(req.params.id);
        if(!event){
            return res.status(404).json({
                success: false,
                message:"Event not found"
            })
        }
        return res.status(200).json({
            success: true,
            message:"Event fetched successfully",
            data:event
        })
    }catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
};

export const updateEvent = async (req, res) => {
    try{
        const event = await updateEventService(req.params.id, req.body);
        if(!event){
            return res.status(404).json({
                success: false,
                message:"Event not found"
            })
        }
        return res.status(200).json({
            success: true,
            message:"Event updated successfully",
            data:event
        })
    }catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
};

export const deleteEvent = async (req, res) => {
    try{
        const event = await deleteEventService(req.params.id);
        if(!event){
            return res.status(404).json({
                success: false,
                message:"Event not found"
            })
        }
        return res.status(200).json({
            success: true,
            message:"Event deleted successfully",
            data:event
        })
    }catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
};