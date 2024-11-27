import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { checkRole } from "../middleware/roleMiddleware.js";
import { updateUserRole } from "../controllers/authController.js";

const router = express.Router();


router.post("/update-role", protect, checkRole("admin"), updateUserRole);

export default router;
