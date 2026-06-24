import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    event:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event"
    },
    bookingStatus:{
        type:String,
        enum:["CONFIRMED","IN-PROCESS","CANCELLED"],
        default:"CONFIRMED"
    },
    bookingTime:{
        type:Date,
        default:Date.now
    },
    numberOfSeats:{
        type:Number,
        required:true,
        min:1
    },
    totalPrice:{
        type:Number,
        min:0
    }
},{
    timestamps:true
});

const booking = mongoose.model("booking",bookingSchema);
export default booking;