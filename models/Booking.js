import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    flight: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Flight",
      required: true,
    },
    flightClass: {
      type: String,
      enum: ["Economy", "Business"],
      required: true,
    },
    seatNumbers: [{ type: String, required: true }],
    passengersCount: { type: Number, required: true },
    totalAmount: { type: Number, required: true },
    pnrNumber: { type: String, required: true, unique: true },

    // 👇 NAYA: Admin ke liye 'Confirmed' status enum mein add kiya gaya hai 👇
    status: {
      type: String,
      enum: ["Booked", "Confirmed", "Cancelled"],
      default: "Booked",
    },
  },
  { timestamps: true },
);

export default mongoose.model("Booking", bookingSchema);
