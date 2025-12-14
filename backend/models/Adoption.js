
import mongoose from "mongoose";

const adoptionSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    phone:{
        type:String,
        required: true,
    },
    email:{
      type:String,
      required: true,
    },
    address:{
        type:String,
        required: true,
    },
    animalType: {type : String, enum: ['dog', 'cat', 'rabbit', 'bird', 'other', 'tortoise'], required: true},
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
}, {timestamps: true})
const Adoption = mongoose.model("Adoption", adoptionSchema)
export default Adoption;