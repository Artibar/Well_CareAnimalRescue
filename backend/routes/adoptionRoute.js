
import express from "express"
import {getAllAdoption, getAdoptionByItsId, createAdoption, updateAdoption, deleteAdoption} from "../controller/adoptionController.js"
import { authorizeRoles } from "../middleware/roleMiddleware.js";
import { protect } from "../middleware/authMiddleware.js";
const adoptionRouter = express.Router()

adoptionRouter.get("/get",protect, authorizeRoles("admin", "volunteer"), getAllAdoption);
adoptionRouter.get("/:id", protect, authorizeRoles("admin", "volunteer"), getAdoptionByItsId);
adoptionRouter.post("/create", protect, createAdoption);
adoptionRouter.put("/update/:id", protect, authorizeRoles("admin"), updateAdoption);
adoptionRouter.delete("/:id", protect, authorizeRoles("admin"), deleteAdoption)
export default adoptionRouter;