import express from "express";
import { createRescueForm, deleteRescue, getAllRescueFormDetails, getRescueFormDetailByItsId, updateRescueForm, getEmergencyRequest } from "../controller/rescueController.js";
import upload from "../services/multer.js"
import { authorizeRoles } from "../middleware/roleMiddleware.js";
import {protect} from '../middleware/authMiddleware.js'
const rescueRouter = express.Router();
rescueRouter.get("/get", protect, authorizeRoles("admin", "volunteer"), getAllRescueFormDetails);
rescueRouter.get("/:id", protect, authorizeRoles("admin", "volunteer"), getRescueFormDetailByItsId);
rescueRouter.post("/create", protect, upload.single("animalImage"), createRescueForm)
rescueRouter.patch('/update/:id', protect, authorizeRoles("admin"), updateRescueForm)
rescueRouter.delete("/:id", protect, authorizeRoles("admin"), deleteRescue)
rescueRouter.get("/emergencies/all", protect, authorizeRoles("admin", "volunteer"), getEmergencyRequest)
export default rescueRouter