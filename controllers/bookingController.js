import Booking from "../models/Booking.js";
import Flight from "../models/Flight.js";

// Book a Flight
export const bookFlight = async (req, res) => {
  try {
    const { flightId, flightClass, seatNumbers, totalAmount } = req.body;

    const pnrNumber = Math.random().toString(36).substring(2, 8).toUpperCase();

    const newBooking = await Booking.create({
      user: req.user._id,
      flight: flightId,
      flightClass,
      seatNumbers,
      passengersCount: seatNumbers.length,
      totalAmount,
      pnrNumber,
    });

    await Flight.findByIdAndUpdate(flightId, {
      $push: { bookedSeats: { $each: seatNumbers } },
    });

    res.status(201).json({
      message: "Flight booked successfully!",
      pnr: pnrNumber,
      booking: newBooking,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Get User's Bookings
export const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id }).populate(
      "flight",
    );
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Admin Features

// Get All Bookings (Admin Only)
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("user", "name email")
      .populate("flight", "flightNumber airlineName source destination");

    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Update Booking Status (Admin Only)
export const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const updatedBooking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true },
    );

    if (!updatedBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json({
      message: `Booking status successfully updated to ${status}`,
      booking: updatedBooking,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
