import Flight from "../models/Flight.js";

// 1. Add a New Flight (Admin ke liye) - WITH IMAGE UPLOAD
export const addFlight = async (req, res) => {
  try {
    const {
      flightNumber,
      airlineName,
      source,
      destination,
      departureTime,
      arrivalTime,
      economyPrice,
      businessPrice,
      totalSeats,
    } = req.body;

    // 👇 NAYA: Cloudinary se jo image upload hui hai, uska URL yahan aayega 👇
    const imageUrl = req.file ? req.file.path : "";

    if (!imageUrl) {
      return res.status(400).json({ message: "Flight image is required!" });
    }

    // Check if flight exists
    const existingFlight = await Flight.findOne({ flightNumber });

    if (existingFlight) {
      return res.status(400).json({ message: "Flight number already exists" });
    }

    // Create new flight
    const newFlight = await Flight.create({
      flightNumber,
      airlineName,
      source,
      destination,
      departureTime,
      arrivalTime,
      economyPrice,
      businessPrice,
      totalSeats,
      image: imageUrl, // 👈 NAYA: Image URL database me save ho raha hai
    });

    res
      .status(201)
      .json({ message: "Flight added successfully", flight: newFlight });
  } catch (error) {
    console.error("❌ ERROR AAYA:", error.message);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// 2. Search Flights (Frontend se search form ke liye)
export const searchFlights = async (req, res) => {
  try {
    const { source, destination } = req.query; // date ko destructing se hata diya kyunki ab filter nahi karna

    // Base query
    let query = {};

    // Source search (Delhi, delhi, DELHI sab match karega)
    if (source) query.source = new RegExp(source, "i");

    // Destination search
    if (destination) query.destination = new RegExp(destination, "i");

    // Logic: Ab hum date match nahi kar rahe,
    // bas find karenge aur price ke hisaab se sort kar denge
    const flights = await Flight.find(query).sort({ economyPrice: 1 });

    res.status(200).json({
      count: flights.length,
      flights,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// 3. Get All Flights (Admin dashboard ya Home page ke liye)
export const getAllFlights = async (req, res) => {
  try {
    const flights = await Flight.find();
    res.status(200).json({ count: flights.length, flights });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// 👇 NAYE ADMIN FEATURES YAHAN SE SHURU HAIN 👇

// 4. Delete Flight (Admin Only)
export const deleteFlight = async (req, res) => {
  try {
    const flightId = req.params.id;
    const deletedFlight = await Flight.findByIdAndDelete(flightId);

    if (!deletedFlight) {
      return res.status(404).json({ message: "Flight not found" });
    }

    res.status(200).json({ message: "Flight Deleted Successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete flight", error: error.message });
  }
};

// 5. Update Flight Status (Admin Only)
export const updateFlightStatus = async (req, res) => {
  try {
    const flightId = req.params.id;
    const { status } = req.body; // 'Pending', 'Confirmed', ya 'Cancelled'

    const updatedFlight = await Flight.findByIdAndUpdate(
      flightId,
      { status: status },
      { new: true }, // Update hone ke baad naya data return karega
    );

    if (!updatedFlight) {
      return res.status(404).json({ message: "Flight not found" });
    }

    res
      .status(200)
      .json({
        message: `Flight status updated to ${status}`,
        flight: updatedFlight,
      });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update status", error: error.message });
  }
};
