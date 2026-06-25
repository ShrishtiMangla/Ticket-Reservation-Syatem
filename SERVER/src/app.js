import express from "express";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import eventRoutes from "./routes/event.routes.js";
import bookingRoutes from "./routes/booking.routes.js";
import { errorHandler } from "./middlewares/error.middleware.js";

const app = express();

app.use(cookieParser());
app.use(express.json());//so that express can read json data from the request body

app.use("/api/auth",authRoutes)
app.use("/api/events", eventRoutes);
app.use("/api/bookings", bookingRoutes);
app.use(errorHandler);

app.get("/" ,(req , res)=>{
    res.send("Welcome to the ticket reservation system");
});

export default app;