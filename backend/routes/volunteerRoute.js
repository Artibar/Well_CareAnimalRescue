
import express from "express";
import {createVolunteer, getAllVolunteers, getVolunteerById, updateVolunteer, deleteVolunteer} from "../controller/volunteerController.js"
import { authorizeRoles } from "../middleware/roleMiddleware.js";
import {protect} from '../middleware/authMiddleware.js'
const volunteerRouter = express.Router();

volunteerRouter.post("/create", protect, createVolunteer);
volunteerRouter.get("/get", protect, authorizeRoles("admin", "volunteer"), getAllVolunteers);
volunteerRouter.get("/:id", protect, authorizeRoles("admin", "volunteer"), getVolunteerById);
volunteerRouter.put("/update/:id", protect, authorizeRoles("admin"), updateVolunteer);
volunteerRouter.delete("/:id", protect, authorizeRoles("admin"), deleteVolunteer)
export default volunteerRouter;