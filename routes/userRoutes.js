import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
} from "../controllers/userController.js";

const router = express.Router();

// ==========================================
// PUBLIC AUTH ROUTES (No Middleware Needed)
// ==========================================

// 1. Naya user account banane ke liye
router.post("/register", registerUser);

// 2. Login (Aam User aur Admin dono yahin se login karenge)
router.post("/login", loginUser);

// 3. Logout (Cookie clear karne ke liye)
router.post("/logout", logoutUser);

export default router;
