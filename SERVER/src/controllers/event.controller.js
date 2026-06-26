import {
    addEventService, getAllEventsService, getEventByIdService, updateEventService, deleteEventService
} from '../services/event.service.js';
import { asyncHandler } from "../utils/asyncHandler.js";
import logger from '../utils/logger.js';

export const addEvent = asyncHandler(async (req, res) => {

    const event = await addEventService(req.body, req.user._id);
    logger.info(
        `Admin ${req.user.email} created event ${event.title}`
    );
    res.status(201).json({
        success: true,
        message: "Event added successfully",
        data: event
    })

});

export const getAllEvents = asyncHandler(async (req, res) => {

    const events = await getAllEventsService();
    res.status(200).json({
        success: true,
        message: "Events fetched successfully",
        data: events
    })

});
export const getEventById = asyncHandler(async (req, res) => {

    const event = await getEventByIdService(req.params.id);
    if (!event) {
        return res.status(404).json({
            success: false,
            message: "Event not found"
        })
    }
    return res.status(200).json({
        success: true,
        message: "Event fetched successfully",
        data: event
    })

});

export const updateEvent = asyncHandler(async (req, res) => {

    const event = await updateEventService(req.params.id, req.body);
    if (!event) {
        return res.status(404).json({
            success: false,
            message: "Event not found"
        })
    }
    logger.info(
        `Event updated: ${event.title}`
    );
    return res.status(200).json({
        success: true,
        message: "Event updated successfully",
        data: event
    })

});

export const deleteEvent = asyncHandler(async (req, res) => {

    const event = await deleteEventService(req.params.id);
    if (!event) {
        return res.status(404).json({
            success: false,
            message: "Event not found"
        })
    }
    logger.info(
        `Event deleted: ${event.title}`
    );
    return res.status(200).json({
        success: true,
        message: "Event deleted successfully",
        data: event
    })

});