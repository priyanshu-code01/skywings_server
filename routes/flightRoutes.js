import express from "express";
import {
  addFlight,
  searchFlights,
  getAllFlights,
  deleteFlight, // 👈 NAYA
  updateFlightStatus, // 👈 NAYA
} from "../controllers/flightController.js";

import { protect, admin } from "../middleware/authMiddleware.js";
import { upload } from "../config/cloudinary.js"; // 👈 NAYA: Image upload middleware

const router = express.Router();

// ==========================================
// 1. PUBLIC ROUTES (Koi bhi access kar sakta hai)
// ==========================================
router.get("/search", searchFlights);
router.get("/", getAllFlights);

// ==========================================
// 2. ADMIN SECURE ROUTES (Sirf Admin access karega)
// ==========================================

// Flight add karna (Sath me 'image' upload bhi hogi)
router.post("/add", protect, admin, upload.single("image"), addFlight);

// Flight ko permanently delete karna
router.delete("/delete/:id", protect, admin, deleteFlight);

// Flight ka status update karna (Pending, Confirmed, Cancelled)
router.put("/update-status/:id", protect, admin, updateFlightStatus);

export default router;
