import mongoose from 'mongoose';

const flightSchema = new mongoose.Schema({
    flightNumber: { type: String, required: true, unique: true },
    airlineName: { type: String, required: true },
    source: { type: String, required: true },
    destination: { type: String, required: true },
    departureTime: { type: Date, required: true },
    arrivalTime: { type: Date, required: true },
    economyPrice: { type: Number, required: true },
    businessPrice: { type: Number, required: true },
    totalSeats: { type: Number, default: 60 },
    bookedSeats: [{ type: String }],
    image: { type: String, required: true },
    status: { type: String, default: 'Pending', enum: ['Pending', 'Confirmed', 'Cancelled'] }
}, { timestamps: true });

export default mongoose.model('Flight', flightSchema);