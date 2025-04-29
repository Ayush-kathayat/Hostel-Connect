const mongoose = require("mongoose");
require("dotenv").config();

const universities = [
  {
    id: 1,
    name: "Indian Institute of Science",
    location: "Bengaluru, Karnataka",
    coordinates: { lat: 13.0219, lng: 77.5671 },
    rank: 1
  },
  {
    id: 2,
    name: "Jawaharlal Nehru University",
    location: "New Delhi",
    coordinates: { lat: 28.5403, lng: 77.1675 },
    rank: 2
  },
  {
    id: 3,
    name: "Jamia Millia Islamia",
    location: "New Delhi",
    coordinates: { lat: 28.5612, lng: 77.2811 },
    rank: 3
  },
  {
    id: 4,
    name: "Jadavpur University",
    location: "Kolkata, West Bengal",
    coordinates: { lat: 22.4968, lng: 88.3714 },
    rank: 4
  },
  {
    id: 5,
    name: "Banaras Hindu University",
    location: "Varanasi, Uttar Pradesh",
    coordinates: { lat: 25.2677, lng: 82.9913 },
    rank: 5
  },
  {
    id: 6,
    name: "Manipal Academy of Higher Education",
    location: "Manipal, Karnataka",
    coordinates: { lat: 13.3524, lng: 74.7937 },
    rank: 6
  },
  {
    id: 7,
    name: "Amrita Vishwa Vidyapeetham",
    location: "Coimbatore, Tamil Nadu",
    coordinates: { lat: 10.9026, lng: 76.9019 },
    rank: 7
  },
  {
    id: 8,
    name: "Vellore Institute of Technology",
    location: "Vellore, Tamil Nadu",
    coordinates: { lat: 12.9692, lng: 79.1559 },
    rank: 8
  },
  {
    id: 9,
    name: "Aligarh Muslim University",
    location: "Aligarh, Uttar Pradesh",
    coordinates: { lat: 27.9150, lng: 78.0777 },
    rank: 9
  },
  {
    id: 10,
    name: "University of Hyderabad",
    location: "Hyderabad, Telangana",
    coordinates: { lat: 17.4617, lng: 78.3340 },
    rank: 10
  },
  {
    id: 11,
    name: "University of Delhi",
    location: "Delhi",
    coordinates: { lat: 28.6889, lng: 77.3178 },
    rank: 11
  },
  {
    id: 12,
    name: "Savitribai Phule Pune University",
    location: "Pune, Maharashtra",
    coordinates: { lat: 18.5567, lng: 73.8233 },
    rank: 12
  },
  {
    id: 13,
    name: "Calcutta University",
    location: "Kolkata, West Bengal",
    coordinates: { lat: 22.5771, lng: 88.3665 },
    rank: 13
  },
  {
    id: 14,
    name: "Anna University",
    location: "Chennai, Tamil Nadu",
    coordinates: { lat: 13.0108, lng: 80.2339 },
    rank: 14
  },
  {
    id: 15,
    name: "Bharathiar University",
    location: "Coimbatore, Tamil Nadu",
    coordinates: { lat: 11.0376, lng: 77.0083 },
    rank: 15
  },
  {
    id: 16,
    name: "Mahatma Gandhi University",
    location: "Kottayam, Kerala",
    coordinates: { lat: 9.5457, lng: 76.5462 },
    rank: 16
  },
  {
    id: 17,
    name: "Jamia Hamdard",
    location: "New Delhi",
    coordinates: { lat: 28.5639, lng: 77.2636 },
    rank: 17
  },
  {
    id: 18,
    name: "Siksha 'O' Anusandhan University",
    location: "Bhubaneswar, Odisha",
    coordinates: { lat: 20.2537, lng: 85.8001 },
    rank: 18
  },
  {
    id: 19,
    name: "Alagappa University",
    location: "Karaikudi, Tamil Nadu",
    coordinates: { lat: 10.5126, lng: 78.8182 },
    rank: 19
  },
  {
    id: 20,
    name: "Tezpur University",
    location: "Tezpur, Assam",
    coordinates: { lat: 26.6319, lng: 92.8283 },
    rank: 20
  },
  {
    id: 50,
    name: "Indian Institute of Technology Delhi",
    location: "New Delhi",
    coordinates: { lat: 28.5456, lng: 77.1926 },
    rank: 50
  },
  {
    id: 51,
    name: "Indian Institute of Technology Bombay",
    location: "Mumbai, Maharashtra",
    coordinates: { lat: 19.1334, lng: 72.9133 },
    rank: 51
  },
  {
    id: 52,
    name: "Indian Institute of Technology Madras",
    location: "Chennai, Tamil Nadu",
    coordinates: { lat: 12.9914, lng: 80.2336 },
    rank: 52
  },
  {
    id: 100,
    name: "Central University of Tamil Nadu",
    location: "Thiruvarur, Tamil Nadu",
    coordinates: { lat: 10.7667, lng: 79.1333 },
    rank: 100
  },
  {
    id: 150,
    name: "Dr. Harisingh Gour Vishwavidyalaya",
    location: "Sagar, Madhya Pradesh",
    coordinates: { lat: 23.8346, lng: 78.7456 },
    rank: 150
  },
  {
    id: 200,
    name: "Tamil Nadu Agricultural University",
    location: "Coimbatore, Tamil Nadu",
    coordinates: { lat: 11.0134, lng: 76.9382 },
    rank: 200
  }
];

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log("Connected to MongoDB");

    // Clear existing universities
    const University = mongoose.model(
      "University",
      new mongoose.Schema({
        id: { type: Number, required: true, unique: true },
        name: { type: String, required: true },
        location: { type: String, required: true },
        coordinates: {
          lat: { type: Number, required: true },
          lng: { type: Number, required: true },
        },
        rank: { type: Number },
      })
    );

    await University.deleteMany({});
    console.log("Cleared existing universities");

    // Insert new universities
    await University.insertMany(universities);
    console.log("Inserted universities");

    mongoose.connection.close();
    console.log("Disconnected from MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });