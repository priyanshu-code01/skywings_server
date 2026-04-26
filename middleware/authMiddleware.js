import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Protect routes
export const protect = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res
        .status(401)
        .json({ message: "Not authorized, please login first" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");

    next();
  } catch (error) {
    res.status(401).json({ message: "Not authorized, token failed" });
  }
};

// Admin access
export const admin = (req, res, next) => {
  const adminEmail = "priyanshu.code01@gmail.com";

  if (req.user && req.user.email === adminEmail) {
    next();
  } else {
    res
      .status(403)
      .json({ message: "Access Denied: Only Admin can perform this action" });
  }
};
