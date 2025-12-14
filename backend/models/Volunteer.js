
import mongoose from "mongoose";

const volunteerSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    address: {
        type:String,
        required: true
    },
    skills:{
        type: String,
        required: true
    },
     createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
},{timestamps: true});

const Volunteer = mongoose.model("Volunteer", volunteerSchema);
export default Volunteer;