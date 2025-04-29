const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Hostel Schema
const hostelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  pincode: { type: String, required: true },
  nearbyUniversity: { type: String },
  roomTypes: { type: String, required: true },
  pricePerMonth: { type: Number, required: true },
  amenities: { type: [String], required: true },
  contactNumber: { type: String, required: true },
  contactEmail: { type: String, required: true },
  images: [{ type: String }],
  userId: { type: String, required: true },
  coordinates: {
    lat: { type: Number },
    lng: { type: Number },
  },
  createdAt: { type: Date, default: Date.now },
});

const Hostel = mongoose.model("Hostel", hostelSchema);

// Contact Schema
const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Contact = mongoose.model("Contact", contactSchema);

// University Schema
const universitySchema = new mongoose.Schema({
  name: { type: String, required: true },
  state: { type: String, required: true },
  Latitude: { type: Number, required: true },
  Longitude: { type: Number, required: true },
});

universitySchema.index({ name: "text" }); // Text index on name

const University = mongoose.model("University", universitySchema);

// Hostel Routes
app.post("/api/hostels", async (req, res) => {
  try {
    const hostelData = req.body;
    const address = `${hostelData.address}, ${hostelData.city}, ${hostelData.state}, ${hostelData.pincode}`;
    const geoResponse = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${process.env.GOOGLE_API_KEY}`
    );
    const location = geoResponse.data.results[0]?.geometry.location;
    if (location) {
      hostelData.coordinates = { lat: location.lat, lng: location.lng };
    } else {
      console.warn("Geocoding failed for address:", address);
    }
    const hostel = new Hostel(hostelData);
    await hostel.save();
    res.status(201).json({ message: "Hostel listed successfully", hostel });
  } catch (error) {
    console.error("Error saving hostel:", error);
    res.status(500).json({ message: "Failed to list hostel", error });
  }
});

app.get("/api/hostels", async (req, res) => {
  try {
    const hostels = await Hostel.find();
    res.status(200).json(hostels);
  } catch (error) {
    console.error("Error fetching hostels:", error);
    res.status(500).json({ message: "Failed to fetch hostels", error });
  }
});

// Contact Routes
app.post("/api/contacts", async (req, res) => {
  try {
    const contactData = req.body;
    const contact = new Contact(contactData);
    await contact.save();
    res.status(201).json({ message: "Contact message saved successfully", contact });
  } catch (error) {
    console.error("Error saving contact message:", error);
    res.status(500).json({ message: "Failed to save contact message", error });
  }
});

// University Search Route
app.get("/api/universities/search", async (req, res) => {
  try {
    const query = req.query.q ? String(req.query.q).trim() : "";
    console.log(`Search query: "${query}"`);

    let universities = [];
    if (query) {
      // Use regex for partial matching (case-insensitive)
      universities = await University.find({
        name: { $regex: query, $options: "i" },
      }).limit(30);

      // If no results from regex, try text search with quoted query for exact matches
      if (universities.length === 0) {
        try {
          universities = await University.find(
            { $text: { $search: `"${query}"` } }, // Quote query for exact phrase
            { score: { $meta: "textScore" } }
          )
            .sort({ score: { $meta: "textScore" } })
            .limit(30);
        } catch (textError) {
          console.warn("Text search failed:", textError.message);
        }
      }
    } else {
      // Return first 30 universities if no query
      universities = await University.find().limit(30);
    }

    console.log(`Found ${universities.length} universities for query "${query}"`);
    if (universities.length > 0) {
      console.log("Sample matched universities:", universities.slice(0, 3).map((u) => u.name));
    }

    const formattedUniversities = universities.map((uni) => ({
      name: uni.name,
      state: uni.state,
      coordinates: {
        lat: uni.Latitude,
        lng: uni.Longitude,
      },
    }));

    res.status(200).json(formattedUniversities);
  } catch (error) {
    console.error("Error searching universities:", error.message, error.stack);
    res.status(500).json({ message: "Failed to search universities", error: error.message });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));