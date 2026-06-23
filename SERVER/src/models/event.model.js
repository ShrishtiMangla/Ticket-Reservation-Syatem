import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
    },
    dateTime:{
        type:Date,
        required:true,
    },
    venue:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
        min:0
    },
    status:{
        type:String,
        enum:["UPCOMING","ACTIVE","CANCELLED","COMPLETED"],
        default:"UPCOMING"
    },
    totalSeats:{
        type:Number,
        required:true,
        min:0
    },
    availableSeats:{
        type:Number,
        required:true,
        min:0
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
},{
    timestamps:true
});

const Event = mongoose.model('Event', eventSchema);
export default Event;