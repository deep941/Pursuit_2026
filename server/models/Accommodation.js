import mongoose from "mongoose";

const accommodationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    college: {
        type: String,
        required: true,
        trim: true,
    },
    date: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
        enum: ["Male", "Female", "Other"],
    },
}, { timestamps: true });

const Accommodation = mongoose.model("Accommodation", accommodationSchema);

export default Accommodation;
