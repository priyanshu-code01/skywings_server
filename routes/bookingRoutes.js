import express from "express";
import {
  bookFlight,
  getMyBookings,
  getAllBookings,
  updateBookingStatus,
} from "../controllers/bookingController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

// ==========================================
// 1. PUBLIC / USER ROUTES (Only 'protect')
// ==========================================

// Flight book karne ke liye
router.post("/book", protect, bookFlight);

// User ko apni khud ki bookings dikhane ke liye
router.get("/my-bookings", protect, getMyBookings);

// ==========================================
// 2. ADMIN SECURE ROUTES (Both 'protect' & 'admin')
// ==========================================

// Admin ko system ki SAARI bookings dikhane ke liye
router.get("/", protect, admin, getAllBookings);

// Admin dwara kisi ticket ko 'Confirmed' ya 'Cancelled' karne ke liye
router.put("/update-status/:id", protect, admin, updateBookingStatus);

export default router;
