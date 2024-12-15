import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { checkRole } from "../middleware/roleMiddleware.js";
import { updateUserRole, getGlobalStats } from "../controllers/adminController.js";

const router = express.Router();

router.post("/update-role", protect, checkRole("admin"), updateUserRole); 
router.get("/stats", protect, checkRole("admin"), getGlobalStats); 

export default router;

