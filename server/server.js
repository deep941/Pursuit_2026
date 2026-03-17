import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import dns from "dns";
import Registration from "./models/Registration.js";
import Contact from "./models/Contact.js";
import Accommodation from "./models/Accommodation.js";

// Bypass local/ISP DNS blocks for MongoDB SRV records
dns.setServers(["8.8.8.8", "8.8.4.4"]);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
const allowedOrigins = [process.env.FRONTEND_URL, "http://localhost:5173", "http://localhost:5174"];
app.use(cors({ origin: allowedOrigins }));
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected successfully"))
    .catch((err) => console.error("MongoDB connection error:", err));

// Routes
// POST: Register a user
app.post("/api/register", async (req, res) => {
    try {
        const { name, email, phone, branch, year, college, type, workshop, utr, fee, teamMembers } = req.body;

        // Validate
        if (!name || !email || !phone || !branch || !year || !college || !workshop) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        // Check if duplicate email for the same workshop
        const existingRegistration = await Registration.findOne({ email, workshop });
        if (existingRegistration) {
            return res.status(409).json({ error: "You are already registered for this workshop" });
        }

        // Check if UTR is unique (ignore '0' or empty which represent free events)
        if (utr && utr !== "0") {
            const existingUtr = await Registration.findOne({ utr });
            if (existingUtr) {
                return res.status(409).json({ error: "Please fill a valid UTR. This UTR is already used." });
            }
        }

        const newRegistration = new Registration({
            name,
            email,
            phone,
            branch,
            year,
            college,
            type,
            workshop,
            utr,
            fee,
            teamMembers
        });

        await newRegistration.save();

        res.status(201).json({ message: "Registration successful!", data: newRegistration });
    } catch (error) {
        console.error("Registration endpoint error:", error);
        res.status(500).json({ error: "Server error during registration" });
    }
});

// GET: Fetch all registrations (optional, for admin)
app.get("/api/registrations", async (req, res) => {
    try {
        const records = await Registration.find().sort({ createdAt: -1 });
        res.status(200).json(records);
    } catch (error) {
        res.status(500).json({ error: "Server error fetching registrations" });
    }
});

// POST: Contact Us form submission
app.post("/api/contact", async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        if (!name || !email || !subject || !message) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const newContact = new Contact({ name, email, subject, message });
        await newContact.save();

        res.status(201).json({ message: "Message sent successfully!", data: newContact });
    } catch (error) {
        console.error("Contact endpoint error:", error);
        res.status(500).json({ error: "Server error during contact submission" });
    }
});

// POST: Accommodation form submission
app.post("/api/accommodation", async (req, res) => {
    try {
        const { name, college, date, gender } = req.body;

        if (!name || !college || !date || !gender) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const newAccommodation = new Accommodation({ name, college, date, gender });
        await newAccommodation.save();

        res.status(201).json({ message: "Accommodation requested successfully!", data: newAccommodation });
    } catch (error) {
        console.error("Accommodation endpoint error:", error);
        res.status(500).json({ error: "Server error during accommodation submission" });
    }
});

// GET: Fetch all accommodations
app.get("/api/accommodations", async (req, res) => {
    try {
        const records = await Accommodation.find().sort({ createdAt: -1 });
        res.status(200).json(records);
    } catch (error) {
        res.status(500).json({ error: "Server error fetching accommodations" });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
