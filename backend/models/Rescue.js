
import mongoose from 'mongoose';

const rescueSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    address: {type: String, required: true},
    animalType:{type: String, required: true},
    liveLocation:{ latitude: Number, longitude: Number },
    manualLocation: { type: String, required: true },
    isEmergency: {type: Boolean, },
    image: { type: String, required: true },
    status:{ type: String, enum:["pending", "in-progress", "completed", "cancelled"], default: "pending"},
    createdAt:{
        type: Date,
        default: Date.now
    },
    updatedAt:{
        type: Date,
        default: Date.now
    }
},{timestamps: true})

const Rescue = mongoose.model("Rescue", rescueSchema);
export default Rescue;