// HomePage.tsx
import React, { useState, useEffect } from "react";
import { UserRole, City, Hostel, UserProfile } from "./types";
import { Building, MapPin, IndianRupee, Camera } from "lucide-react";
import Navbar from "@/components/Navbar";

// Mock data
const POPULAR_CITIES: City[] = [
  { id: 1, name: "Mumbai", imageUrl: "/public/City photos/Mumbai.jpeg" },
  { id: 2, name: "Delhi", imageUrl: "/public/City photos/Delhi.webp" },
  { id: 3, name: "Bangalore", imageUrl: "/public/City photos/Banglore.webp" },
  { id: 4, name: "Hyderabad", imageUrl: "/public/City photos/hydrebad.jpeg" },
  { id: 5, name: "Chennai", imageUrl: "/public/City photos/Chennai.jpeg" },
  { id: 6, name: "Kolkata", imageUrl: "/public/City photos/Kolkata.png" },
  { id: 7, name: "Pune", imageUrl: "/public/City photos/Pune'.jpeg" },
  { id: 8, name: "Ahmedabad", imageUrl: "/public/City photos/ahmedabad.webp" },
];

const UNIVERSITIES = [
  {
    id: 1,
    name: "Delhi University",
    city: "Delhi",
    imageUrl: "/api/placeholder/300/200",
  },
  {
    id: 2,
    name: "Mumbai University",
    city: "Mumbai",
    imageUrl: "/api/placeholder/300/200",
  },
  {
    id: 3,
    name: "IIT Bombay",
    city: "Mumbai",
    imageUrl: "/api/placeholder/300/200",
  },
  {
    id: 4,
    name: "IIT Delhi",
    city: "Delhi",
    imageUrl: "/api/placeholder/300/200",
  },
  {
    id: 5,
    name: "University of Hyderabad",
    city: "Hyderabad",
    imageUrl: "/api/placeholder/300/200",
  },
  {
    id: 6,
    name: "Anna University",
    city: "Chennai",
    imageUrl: "/api/placeholder/300/200",
  },
  {
    id: 7,
    name: "Jadavpur University",
    city: "Kolkata",
    imageUrl: "/api/placeholder/300/200",
  },
  {
    id: 8,
    name: "Pune University",
    city: "Pune",
    imageUrl: "/api/placeholder/300/200",
  },
];

const MOCK_HOSTELS: Hostel[] = [
  // Mumbai
  { id: 1, name: "Marine Drive Hostel", cityId: 1, address: "123 Marine Drive, Mumbai", price: 8500, amenities: ["WiFi", "AC", "Laundry"], rating: 4.3, imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
  { id: 2, name: "Gateway Stay", cityId: 1, address: "456 Colaba Causeway, Mumbai", price: 9000, amenities: ["WiFi", "AC", "CCTV"], rating: 4.5, imageUrl: "https://images.unsplash.com/photo-1600585154203-d4314c5b25a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
  { id: 3, name: "Suburban Lodge", cityId: 1, address: "789 Andheri East, Mumbai", price: 7500, amenities: ["WiFi", "Breakfast", "Laundry"], rating: 4.1, imageUrl: "https://images.unsplash.com/photo-1527030280862-64139fba04ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
  { id: 4, name: "Versova Nest", cityId: 1, address: "101 Versova, Mumbai", price: 7800, amenities: ["WiFi", "AC", "Social Area"], rating: 4.4, imageUrl: "https://images.unsplash.com/photo-1597007510989-896dbb5c9c33?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
  { id: 5, name: "Juhu Beach Hostel", cityId: 1, address: "202 Juhu Tara Road, Mumbai", price: 8200, amenities: ["WiFi", "Breakfast", "Laundry"], rating: 4.2, imageUrl: "https://images.unsplash.com/photo-1600585154784-0c1f444bb7b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
  { id: 6, name: "Bandra Buzz", cityId: 1, address: "303 Bandra West, Mumbai", price: 9500, amenities: ["WiFi", "AC", "Private Rooms"], rating: 4.6, imageUrl: "https://images.unsplash.com/photo-1613470905607-dc319dc778fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
  { id: 7, name: "Borivali Comforts", cityId: 1, address: "404 Borivali West, Mumbai", price: 7300, amenities: ["WiFi", "Laundry", "Breakfast"], rating: 4.0, imageUrl: "https://images.unsplash.com/photo-1613929728574-50e1ed046b26?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
  { id: 8, name: "Kurla Co-Living", cityId: 1, address: "505 Kurla, Mumbai", price: 7200, amenities: ["WiFi", "AC", "CCTV"], rating: 4.1, imageUrl: "https://images.unsplash.com/photo-1600585154197-08830d4c4dc4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
  { id: 9, name: "Powai Stay", cityId: 1, address: "606 Hiranandani Gardens, Mumbai", price: 8700, amenities: ["WiFi", "Laundry", "Private Rooms"], rating: 4.3, imageUrl: "https://images.unsplash.com/photo-1613929727991-6a9efdd3c770?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
  { id: 10, name: "South Bombay Suites", cityId: 1, address: "707 Churchgate, Mumbai", price: 9800, amenities: ["WiFi", "AC", "Breakfast"], rating: 4.7, imageUrl: "https://images.unsplash.com/photo-1613470905810-5905dbad98a3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },

  // Delhi
  { id: 11, name: "Heritage Hostel", cityId: 2, address: "123 Connaught Place, Delhi", price: 7500, amenities: ["WiFi", "Laundry", "AC"], rating: 4.2, imageUrl: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
  { id: 12, name: "Dilli Darbar Stay", cityId: 2, address: "234 Karol Bagh, Delhi", price: 7700, amenities: ["WiFi", "Breakfast", "Social Area"], rating: 4.3, imageUrl: "https://images.unsplash.com/photo-1549921296-3a6b4e36de99?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
  { id: 13, name: "Red Fort Inn", cityId: 2, address: "345 Chandni Chowk, Delhi", price: 8200, amenities: ["WiFi", "AC", "Laundry"], rating: 4.5, imageUrl: "https://images.unsplash.com/photo-1558981359-65345bdb2395?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
  { id: 14, name: "Lotus Living", cityId: 2, address: "456 Lajpat Nagar, Delhi", price: 7800, amenities: ["WiFi", "Laundry", "Private Rooms"], rating: 4.1, imageUrl: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
  { id: 15, name: "Capital Comfort", cityId: 2, address: "567 Hauz Khas, Delhi", price: 8300, amenities: ["WiFi", "AC", "Breakfast"], rating: 4.4, imageUrl: "https://images.unsplash.com/photo-1573164574395-d0553b9d7d31?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
  { id: 16, name: "Safdarjung Stay", cityId: 2, address: "678 Safdarjung Enclave, Delhi", price: 7900, amenities: ["WiFi", "Laundry", "CCTV"], rating: 4.0, imageUrl: "https://images.unsplash.com/photo-1560347876-aeef00ee58a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
  { id: 17, name: "Janpath Junction", cityId: 2, address: "789 Janpath Road, Delhi", price: 8100, amenities: ["WiFi", "AC", "Laundry"], rating: 4.3, imageUrl: "https://images.unsplash.com/photo-1590402494683-2a63c3156a27?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
  { id: 18, name: "Urban Nomad", cityId: 2, address: "890 New Friends Colony, Delhi", price: 7400, amenities: ["WiFi", "Breakfast", "Laundry"], rating: 4.2, imageUrl: "https://images.unsplash.com/photo-1549921295-3a69d4d26326?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
  { id: 19, name: "Delhi Dreamers Hostel", cityId: 2, address: "901 Saket, Delhi", price: 7600, amenities: ["WiFi", "AC", "Private Rooms"], rating: 4.5, imageUrl: "https://images.unsplash.com/photo-1610402072877-9895f3e711d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
  { id: 20, name: "Metro Inn", cityId: 2, address: "1010 Dwarka, Delhi", price: 7200, amenities: ["WiFi", "Laundry", "CCTV"], rating: 4.1, imageUrl: "https://images.unsplash.com/photo-1614382047534-58e32e41ff63?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
  
      { id: 21, name: "Silicon Valley Hostel", cityId: 3, address: "123 MG Road, Bangalore", price: 8700, amenities: ["WiFi", "AC", "Laundry"], rating: 4.4, imageUrl: "https://images.unsplash.com/photo-1590490360182-c53aabb1e687?auto=format&fit=crop&w=800&q=60" },
      { id: 22, name: "Garden City Stay", cityId: 3, address: "234 Brigade Road, Bangalore", price: 8900, amenities: ["WiFi", "Breakfast", "Laundry"], rating: 4.5, imageUrl: "https://images.unsplash.com/photo-1556745757-8d76bdb6984b?auto=format&fit=crop&w=800&q=60" },
      { id: 23, name: "Koramangala Comforts", cityId: 3, address: "345 Koramangala, Bangalore", price: 8000, amenities: ["WiFi", "AC", "CCTV"], rating: 4.3, imageUrl: "https://images.unsplash.com/photo-1502673530728-f79b4cab31b1?auto=format&fit=crop&w=800&q=60" },
      { id: 24, name: "Indiranagar Inn", cityId: 3, address: "456 Indiranagar, Bangalore", price: 8300, amenities: ["WiFi", "Laundry", "Private Rooms"], rating: 4.2, imageUrl: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=60" },
      { id: 25, name: "Cubbon Comfort", cityId: 3, address: "567 Cubbon Park Area, Bangalore", price: 8600, amenities: ["WiFi", "AC", "Breakfast"], rating: 4.4, imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=60" },
      { id: 26, name: "Whitefield Stay", cityId: 3, address: "678 Whitefield, Bangalore", price: 8100, amenities: ["WiFi", "Laundry", "Social Area"], rating: 4.1, imageUrl: "https://images.unsplash.com/photo-1573497491208-6b1acb260507?auto=format&fit=crop&w=800&q=60" },
      { id: 27, name: "Electronic City Living", cityId: 3, address: "789 Electronic City, Bangalore", price: 7900, amenities: ["WiFi", "AC", "Breakfast"], rating: 4.0, imageUrl: "https://images.unsplash.com/photo-1618221229348-0e94f10d8e21?auto=format&fit=crop&w=800&q=60" },
      { id: 28, name: "BTM Residency", cityId: 3, address: "890 BTM Layout, Bangalore", price: 8500, amenities: ["WiFi", "Laundry", "Private Rooms"], rating: 4.3, imageUrl: "https://images.unsplash.com/photo-1559696782-1452159cf23b?auto=format&fit=crop&w=800&q=60" },
      { id: 29, name: "Bannerghatta Suites", cityId: 3, address: "901 Bannerghatta Road, Bangalore", price: 8200, amenities: ["WiFi", "AC", "CCTV"], rating: 4.2, imageUrl: "https://images.unsplash.com/photo-1576671081837-564dd7b46c37?auto=format&fit=crop&w=800&q=60" },
      { id: 30, name: "Hebbal Heights", cityId: 3, address: "1010 Hebbal, Bangalore", price: 8800, amenities: ["WiFi", "Breakfast", "Laundry"], rating: 4.5, imageUrl: "https://images.unsplash.com/photo-1600585154501-59dc5dfc2824?auto=format&fit=crop&w=800&q=60" },

        { id: 31, name: "Charminar Hostel", cityId: 4, address: "123 Charminar Road, Hyderabad", price: 7800, amenities: ["WiFi", "AC", "Laundry"], rating: 4.2, imageUrl: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&w=800&q=60" },
        { id: 32, name: "Hitech City Inn", cityId: 4, address: "234 Hitech City, Hyderabad", price: 8100, amenities: ["WiFi", "Breakfast", "CCTV"], rating: 4.4, imageUrl: "https://images.unsplash.com/photo-1551907234-40fac2f76025?auto=format&fit=crop&w=800&q=60" },
        { id: 33, name: "Banjara Hills Residency", cityId: 4, address: "345 Banjara Hills, Hyderabad", price: 8500, amenities: ["WiFi", "AC", "Laundry"], rating: 4.5, imageUrl: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=60" },
        { id: 34, name: "Gachibowli Stay", cityId: 4, address: "456 Gachibowli, Hyderabad", price: 7900, amenities: ["WiFi", "Laundry", "Private Rooms"], rating: 4.3, imageUrl: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=800&q=60" },
        { id: 35, name: "Begumpet Suites", cityId: 4, address: "567 Begumpet, Hyderabad", price: 8000, amenities: ["WiFi", "AC", "Breakfast"], rating: 4.1, imageUrl: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=60" },
        { id: 36, name: "Secunderabad Comforts", cityId: 4, address: "678 Secunderabad, Hyderabad", price: 7600, amenities: ["WiFi", "CCTV", "Laundry"], rating: 4.0, imageUrl: "https://images.unsplash.com/photo-1557164684-39a9335095d4?auto=format&fit=crop&w=800&q=60" },
        { id: 37, name: "Old City Hostel", cityId: 4, address: "789 Old City, Hyderabad", price: 7300, amenities: ["WiFi", "Breakfast", "Social Area"], rating: 4.2, imageUrl: "https://images.unsplash.com/photo-1618005198919-2f3840a3d0de?auto=format&fit=crop&w=800&q=60" },
        { id: 38, name: "Madhapur Residency", cityId: 4, address: "890 Madhapur, Hyderabad", price: 8200, amenities: ["WiFi", "AC", "Laundry"], rating: 4.5, imageUrl: "https://images.unsplash.com/photo-1578687336046-75c3f68e6782?auto=format&fit=crop&w=800&q=60" },
        { id: 39, name: "Kondapur Inn", cityId: 4, address: "901 Kondapur, Hyderabad", price: 7700, amenities: ["WiFi", "Laundry", "Breakfast"], rating: 4.3, imageUrl: "https://images.unsplash.com/photo-1600585154240-336d6ec2b59b?auto=format&fit=crop&w=800&q=60" },
        { id: 40, name: "Jubilee Hills Stay", cityId: 4, address: "1010 Jubilee Hills, Hyderabad", price: 8500, amenities: ["WiFi", "AC", "Private Rooms"], rating: 4.6, imageUrl: "https://images.unsplash.com/photo-1578898887943-3e9ad5a13d5d?auto=format&fit=crop&w=800&q=60" },

          { id: 41, name: "Marina Beach Hostel", cityId: 5, address: "123 Marina Beach Road, Chennai", price: 7900, amenities: ["WiFi", "AC", "Laundry"], rating: 4.3, imageUrl: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=800&q=60" },
          { id: 42, name: "T Nagar Stay", cityId: 5, address: "234 T Nagar, Chennai", price: 8100, amenities: ["WiFi", "Breakfast", "Laundry"], rating: 4.4, imageUrl: "https://images.unsplash.com/photo-1618221229348-0e94f10d8e21?auto=format&fit=crop&w=800&q=60" },
          { id: 43, name: "Guindy Residency", cityId: 5, address: "345 Guindy, Chennai", price: 7700, amenities: ["WiFi", "AC", "CCTV"], rating: 4.2, imageUrl: "https://images.unsplash.com/photo-1556742041-8121b99b3814?auto=format&fit=crop&w=800&q=60" },
          { id: 44, name: "Egmore Hostel", cityId: 5, address: "456 Egmore, Chennai", price: 8000, amenities: ["WiFi", "Laundry", "Private Rooms"], rating: 4.1, imageUrl: "https://images.unsplash.com/photo-1600585154501-59dc5dfc2824?auto=format&fit=crop&w=800&q=60" },
          { id: 45, name: "Adyar Suites", cityId: 5, address: "567 Adyar, Chennai", price: 8400, amenities: ["WiFi", "AC", "Breakfast"], rating: 4.5, imageUrl: "https://images.unsplash.com/photo-1578898887943-3e9ad5a13d5d?auto=format&fit=crop&w=800&q=60" },
          { id: 46, name: "Velachery Comforts", cityId: 5, address: "678 Velachery, Chennai", price: 7600, amenities: ["WiFi", "CCTV", "Laundry"], rating: 4.0, imageUrl: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=800&q=60" },
          { id: 47, name: "Besant Nagar Stay", cityId: 5, address: "789 Besant Nagar, Chennai", price: 8300, amenities: ["WiFi", "Breakfast", "Social Area"], rating: 4.3, imageUrl: "https://images.unsplash.com/photo-1556741533-f6acd647aa95?auto=format&fit=crop&w=800&q=60" },
          { id: 48, name: "Mylapore Inn", cityId: 5, address: "890 Mylapore, Chennai", price: 8000, amenities: ["WiFi", "AC", "Laundry"], rating: 4.2, imageUrl: "https://images.unsplash.com/photo-1553456558-aff63285bddb?auto=format&fit=crop&w=800&q=60" },
          { id: 49, name: "Kilpauk Hostel", cityId: 5, address: "901 Kilpauk, Chennai", price: 7700, amenities: ["WiFi", "Laundry", "Breakfast"], rating: 4.1, imageUrl: "https://images.unsplash.com/photo-1576671081837-564dd7b46c37?auto=format&fit=crop&w=800&q=60" },
          { id: 50, name: "Alwarpet Residency", cityId: 5, address: "1010 Alwarpet, Chennai", price: 8500, amenities: ["WiFi", "AC", "Private Rooms"], rating: 4.6, imageUrl: "https://images.unsplash.com/photo-1618221229573-0c5c99f17f3b?auto=format&fit=crop&w=800&q=60" },

            { id: 51, name: "Park Street Hostel", cityId: 6, address: "123 Park Street, Kolkata", price: 7200, amenities: ["WiFi", "AC", "Laundry"], rating: 4.3, imageUrl: "https://images.unsplash.com/photo-1590490360182-c7506f013b1f?auto=format&fit=crop&w=800&q=60" },
            { id: 52, name: "Howrah Comforts", cityId: 6, address: "234 Howrah, Kolkata", price: 7000, amenities: ["WiFi", "Breakfast", "Laundry"], rating: 4.1, imageUrl: "https://images.unsplash.com/photo-1582719200943-5f2b77e36c3d?auto=format&fit=crop&w=800&q=60" },
            { id: 53, name: "Salt Lake Hostel", cityId: 6, address: "345 Salt Lake, Kolkata", price: 7500, amenities: ["WiFi", "AC", "Social Area"], rating: 4.5, imageUrl: "https://images.unsplash.com/photo-1618221196123-7f8c064b2f29?auto=format&fit=crop&w=800&q=60" },
            { id: 54, name: "Garia Residency", cityId: 6, address: "456 Garia, Kolkata", price: 6800, amenities: ["WiFi", "Laundry", "Private Rooms"], rating: 4.0, imageUrl: "https://images.unsplash.com/photo-1560347876-aeef00ee58a1?auto=format&fit=crop&w=800&q=60" },
            { id: 55, name: "New Town Stay", cityId: 6, address: "567 New Town, Kolkata", price: 7900, amenities: ["WiFi", "AC", "Breakfast"], rating: 4.4, imageUrl: "https://images.unsplash.com/photo-1598205023796-2e8c87f5a9fa?auto=format&fit=crop&w=800&q=60" },
            { id: 56, name: "Dumdum Hostel", cityId: 6, address: "678 Dumdum, Kolkata", price: 7100, amenities: ["WiFi", "CCTV", "Laundry"], rating: 4.1, imageUrl: "https://images.unsplash.com/photo-1562183241-b937e95585b2?auto=format&fit=crop&w=800&q=60" },
            { id: 57, name: "Tollygunge Suites", cityId: 6, address: "789 Tollygunge, Kolkata", price: 7400, amenities: ["WiFi", "Breakfast", "Gym"], rating: 4.2, imageUrl: "https://images.unsplash.com/photo-1618221273832-83d5cb7c8e32?auto=format&fit=crop&w=800&q=60" },
            { id: 58, name: "Ballygunge Inn", cityId: 6, address: "890 Ballygunge, Kolkata", price: 8000, amenities: ["WiFi", "AC", "Laundry"], rating: 4.3, imageUrl: "https://images.unsplash.com/photo-1578898887943-3e9ad5a13d5d?auto=format&fit=crop&w=800&q=60" },
            { id: 59, name: "Behala Residency", cityId: 6, address: "901 Behala, Kolkata", price: 6900, amenities: ["WiFi", "Laundry", "CCTV"], rating: 4.0, imageUrl: "https://images.unsplash.com/photo-1618221229590-3f2a4f2db784?auto=format&fit=crop&w=800&q=60" },
            { id: 60, name: "College Street Hostel", cityId: 6, address: "1010 College Street, Kolkata", price: 7800, amenities: ["WiFi", "Breakfast", "AC"], rating: 4.5, imageUrl: "https://images.unsplash.com/photo-1556742400-b5d0594b3c25?auto=format&fit=crop&w=800&q=60" },

              { id: 61, name: "Koregaon Park Hostel", cityId: 7, address: "123 Koregaon Park, Pune", price: 8200, amenities: ["WiFi", "AC", "Laundry"], rating: 4.3, imageUrl: "https://images.unsplash.com/photo-1623084456000-efc05d4953ea?auto=format&fit=crop&w=800&q=60" },
              { id: 62, name: "Baner Comfort Stay", cityId: 7, address: "234 Baner Road, Pune", price: 8000, amenities: ["WiFi", "Breakfast", "Laundry"], rating: 4.2, imageUrl: "https://images.unsplash.com/photo-1600585154035-6390b5d7c43b?auto=format&fit=crop&w=800&q=60" },
              { id: 63, name: "Viman Nagar Residency", cityId: 7, address: "345 Viman Nagar, Pune", price: 7900, amenities: ["WiFi", "AC", "Social Area"], rating: 4.4, imageUrl: "https://images.unsplash.com/photo-1578894380068-f93f87fce048?auto=format&fit=crop&w=800&q=60" },
              { id: 64, name: "Kothrud Heights", cityId: 7, address: "456 Kothrud, Pune", price: 7700, amenities: ["WiFi", "Laundry", "Private Rooms"], rating: 4.1, imageUrl: "https://images.unsplash.com/photo-1592595896551-12c4d5c93ea6?auto=format&fit=crop&w=800&q=60" },
              { id: 65, name: "Hinjewadi Hub", cityId: 7, address: "567 Hinjewadi, Pune", price: 8400, amenities: ["WiFi", "AC", "Breakfast"], rating: 4.5, imageUrl: "https://images.unsplash.com/photo-1618221308472-b2433ed6f2d7?auto=format&fit=crop&w=800&q=60" },
              { id: 66, name: "Aundh Suites", cityId: 7, address: "678 Aundh, Pune", price: 8100, amenities: ["WiFi", "CCTV", "Laundry"], rating: 4.2, imageUrl: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=60" },
              { id: 67, name: "Pimple Saudagar Inn", cityId: 7, address: "789 Pimple Saudagar, Pune", price: 7800, amenities: ["WiFi", "Breakfast", "Gym"], rating: 4.0, imageUrl: "https://images.unsplash.com/photo-1560067174-d93105d6aee5?auto=format&fit=crop&w=800&q=60" },
              { id: 68, name: "Magarpatta Residency", cityId: 7, address: "890 Magarpatta, Pune", price: 8500, amenities: ["WiFi", "AC", "Laundry"], rating: 4.4, imageUrl: "https://images.unsplash.com/photo-1623084455535-ff24e7d3671a?auto=format&fit=crop&w=800&q=60" },
              { id: 69, name: "Swargate Stay", cityId: 7, address: "901 Swargate, Pune", price: 7600, amenities: ["WiFi", "Laundry", "CCTV"], rating: 4.1, imageUrl: "https://images.unsplash.com/photo-1618221273518-2aa1e7848158?auto=format&fit=crop&w=800&q=60" },
              { id: 70, name: "Deccan Hostel", cityId: 7, address: "1010 Deccan, Pune", price: 8300, amenities: ["WiFi", "Breakfast", "AC"], rating: 4.5, imageUrl: "https://images.unsplash.com/photo-1560448204-8aa5e4a60f38?auto=format&fit=crop&w=800&q=60" },

                { id: 71, name: "Sardar Patel Hostel", cityId: 8, address: "123 Sardar Patel Road, Ahmedabad", price: 7000, amenities: ["WiFi", "AC", "Laundry"], rating: 4.2, imageUrl: "https://images.unsplash.com/photo-1570763697228-91e3753de100?auto=format&fit=crop&w=800&q=60" },
                { id: 72, name: "Gandhi Nagar Hostel", cityId: 8, address: "234 Gandhi Nagar, Ahmedabad", price: 7200, amenities: ["WiFi", "Breakfast", "Laundry"], rating: 4.3, imageUrl: "https://images.unsplash.com/photo-1571345572132-b56d20a7a3fe?auto=format&fit=crop&w=800&q=60" },
                { id: 73, name: "Old City Residency", cityId: 8, address: "345 Old City Road, Ahmedabad", price: 7500, amenities: ["WiFi", "AC", "Social Area"], rating: 4.5, imageUrl: "https://images.unsplash.com/photo-1592762604748-2a4a7e3f8245?auto=format&fit=crop&w=800&q=60" },
                { id: 74, name: "Navrangpura Stay", cityId: 8, address: "456 Navrangpura, Ahmedabad", price: 7800, amenities: ["WiFi", "Laundry", "Private Rooms"], rating: 4.0, imageUrl: "https://images.unsplash.com/photo-1601088892255-b0fe4c6989fe?auto=format&fit=crop&w=800&q=60" },
                { id: 75, name: "Ellis Bridge Inn", cityId: 8, address: "567 Ellis Bridge, Ahmedabad", price: 8000, amenities: ["WiFi", "AC", "Breakfast"], rating: 4.4, imageUrl: "https://images.unsplash.com/photo-1618221273518-2aa1e7848158?auto=format&fit=crop&w=800&q=60" },
                { id: 76, name: "Vastrapur Hostel", cityId: 8, address: "678 Vastrapur, Ahmedabad", price: 8200, amenities: ["WiFi", "CCTV", "Laundry"], rating: 4.1, imageUrl: "https://images.unsplash.com/photo-1575883178747-c4133158a3a4?auto=format&fit=crop&w=800&q=60" },
                { id: 77, name: "Maninagar Stay", cityId: 8, address: "789 Maninagar, Ahmedabad", price: 7600, amenities: ["WiFi", "Breakfast", "Gym"], rating: 4.0, imageUrl: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=60" },
                { id: 78, name: "Prahlad Nagar Residency", cityId: 8, address: "890 Prahlad Nagar, Ahmedabad", price: 8300, amenities: ["WiFi", "AC", "Laundry"], rating: 4.4, imageUrl: "https://images.unsplash.com/photo-1618221308472-b2433ed6f2d7?auto=format&fit=crop&w=800&q=60" },
                { id: 79, name: "Sarkhej Residency", cityId: 8, address: "901 Sarkhej, Ahmedabad", price: 7500, amenities: ["WiFi", "Laundry", "CCTV"], rating: 4.3, imageUrl: "https://images.unsplash.com/photo-1578894380068-f93f87fce048?auto=format&fit=crop&w=800&q=60" },
                { id: 80, name: "CG Road Hostel", cityId: 8, address: "1010 CG Road, Ahmedabad", price: 7900, amenities: ["WiFi", "Breakfast", "AC"], rating: 4.2, imageUrl: "https://images.unsplash.com/photo-1618221273518-98bba15c4045?auto=format&fit=crop&w=800&q=60" }
              
            ]
            
        
        
      
    
  



const MOCK_USER: UserProfile = {
  id: 1,
  name: "John Doe",
  email: "john@example.com",
  role: UserRole.STUDENT, // Change to UserRole.HOSTEL_OWNER to test different view
  userType: "student", // Change to 'hostelProvider' to test different view
  hostels: [
    {
      id: 101,
      name: "John's Student Home",
      cityId: 2,
      address: "555 College Road, Delhi",
      state: "Delhi",
      pincode: "110001",
      nearbyUniversity: "Delhi University",
      description:
        "A comfortable hostel with all modern amenities for students. Located near Delhi University, perfect for students who need a peaceful environment for studies.",
      price: 9000,
      pricePerMonth: 9000,
      roomTypes: "double",
      amenities: ["WiFi", "AC", "Food", "24/7 Security"],
      contactNumber: "9876543210",
      contactEmail: "john@example.com",
      rating: 4.5,
      imageUrl: "/api/placeholder/400/300",
      images: [
        "/api/placeholder/400/300",
        "/api/placeholder/400/300",
        "/api/placeholder/400/300",
      ],
      status: "Active",
    },
  ],
};

const StudentHome: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState<number | null>(null);
  const [selectedUniversity, setSelectedUniversity] = useState<number | null>(
    null
  );
  const [hostelsToShow, setHostelsToShow] = useState<Hostel[]>([] as Hostel[]); // Explicitly type as Hostel[]
  const [activeTab, setActiveTab] = useState<"cities" | "universities">(
    "cities"
  );

  useEffect(() => {
    if (selectedCity) {
      // Filter hostels by selected city
      const filteredHostels = MOCK_HOSTELS.filter(
        (hostel) => hostel.cityId === selectedCity
      );
      setHostelsToShow(filteredHostels);
      setSelectedUniversity(null); // Clear university selection
    } else if (selectedUniversity) {
      // In a real app, this would filter hostels by university
      const university = UNIVERSITIES.find(
        (uni) => uni.id === selectedUniversity
      );
      if (university) {
        const cityId = POPULAR_CITIES.find(
          (city) => city.name === university.city
        )?.id;
        if (cityId) {
          const filteredHostels = MOCK_HOSTELS.filter(
            (hostel) => hostel.cityId === cityId
          );
          setHostelsToShow(filteredHostels);
        } else {
          setHostelsToShow([]); // No city found for university
        }
      } else {
        setHostelsToShow([]); // No university found
      }
    } else {
      setHostelsToShow([]);
    }
  }, [selectedCity, selectedUniversity]); // Depend on both state variables

  const handleCitySelect = (cityId: number) => {
    setSelectedCity(cityId);
    setSelectedUniversity(null);
    setActiveTab("cities");
  };

  const handleUniversitySelect = (universityId: number) => {
    setSelectedUniversity(universityId);
    setSelectedCity(null); // Clear city selection
    setActiveTab("universities");
  };

  const resetSelection = () => {
    setSelectedCity(null);
    setSelectedUniversity(null);
    setHostelsToShow([]);
    setActiveTab("cities"); // Reset to cities tab
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Find Your Perfect Hostel</h2>

        <div className="mb-8">
          <div className="bg-blue-50 p-6 rounded-lg">
            <div className="space-y-8">
              {/* Search by Cities Section */}
              <div>
                <h3 className="text-xl font-semibold mb-4 text-blue-700">
                  Search by Cities
                </h3>
                {/* Only show city list if no city or university is selected */}
                {!selectedCity && !selectedUniversity ? (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {POPULAR_CITIES.map((city) => (
                      <div
                        key={city.id}
                        className="bg-white rounded-lg overflow-hidden shadow-md cursor-pointer hover:shadow-lg transition-shadow"
                        onClick={() => handleCitySelect(city.id)}
                      >
                        <img
                          src={city.imageUrl}
                          alt={city.name}
                          className="w-full h-40 object-cover"
                        />
                        <div className="p-4">
                          <h3 className="font-bold text-lg">{city.name}</h3>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>

              {/* Search by Universities Section */}
              <div>
                <h3 className="text-xl font-semibold mb-4 text-blue-700">
                  Search by Universities
                </h3>
                {/* Removed the university listing grid as requested */}
              </div>
            </div>
          </div>
        </div>
      </div>

      {hostelsToShow.length > 0 && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">
              {activeTab === "cities" && selectedCity
                ? `Hostels in ${
                    POPULAR_CITIES.find((city) => city.id === selectedCity)
                      ?.name
                  }`
                : activeTab === "universities" && selectedUniversity
                ? `Hostels near ${
                    UNIVERSITIES.find((uni) => uni.id === selectedUniversity)
                      ?.name
                  }`
                : "Matching Hostels"}{" "}
              {/* Fallback text */}
            </h2>
            <button
              className="bg-gray-200 py-2 px-4 rounded hover:bg-gray-300"
              onClick={resetSelection}
            >
              Back to Search
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hostelsToShow.map((hostel) => (
              <div
                key={hostel.id}
                className="bg-white rounded-lg overflow-hidden shadow-md"
              >
                <img
                  src={hostel.imageUrl}
                  alt={hostel.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <div className="flex justify-between">
                    <h3 className="font-bold text-lg">{hostel.name}</h3>
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                      ★ {hostel.rating}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mt-1">{hostel.address}</p>
                  <p className="font-semibold text-lg mt-2">
                    ₹{hostel.price}/month
                  </p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {Array.isArray(hostel.amenities) ? (
                      hostel.amenities.map((amenity, index) => (
                        <span
                          key={index}
                          className="bg-gray-100 px-2 py-1 rounded-full text-xs"
                        >
                          {amenity}
                        </span>
                      ))
                    ) : (
                      <span className="bg-gray-100 px-2 py-1 rounded-full text-xs">
                        {hostel.amenities}
                      </span>
                    )}
                  </div>
                  <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded w-full hover:bg-blue-600">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const OwnerHome: React.FC<{ hostels: Hostel[] }> = ({ hostels }) => {
  const [activeTab, setActiveTab] = useState<"dashboard" | "addNew">(
    "dashboard"
  );

  return (
    <div className="container mx-auto p-4">
      <div className="bg-blue-50 p-6 rounded-lg mb-6">
        <h2 className="text-2xl font-bold mb-2">
          Welcome to your Hostel Dashboard
        </h2>
        <p className="text-gray-600 mb-4">
          Manage your listed properties and check performance metrics
        </p>
        <div className="flex gap-3">
          <button
            className={`py-2 px-6 rounded ${
              activeTab === "dashboard"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setActiveTab("dashboard")}
          >
            Dashboard
          </button>
          <button
            className={`py-2 px-6 rounded ${
              activeTab === "addNew"
                ? "bg-green-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setActiveTab("addNew")}
          >
            + Add New Hostel
          </button>
        </div>
      </div>

      {activeTab === "dashboard" ? (
        <>
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4">Your Listed Hostels</h3>

            {hostels.length > 0 ? (
              <div className="space-y-4">
                {hostels.map((hostel) => (
                  <div
                    key={hostel.id}
                    className="bg-white p-4 rounded-lg shadow flex flex-col md:flex-row gap-4"
                  >
                    <div className="md:w-1/3">
                      <div className="grid grid-cols-3 gap-2 h-48">
                        <div className="col-span-2 row-span-2">
                          <img
                            src={hostel.imageUrl}
                            alt={hostel.name}
                            className="w-full h-full object-cover rounded"
                          />
                        </div>
                        {hostel.images &&
                          hostel.images.slice(0, 2).map((img, idx) => (
                            <div key={idx} className="col-span-1">
                              <img
                                src={img}
                                alt={`${hostel.name} view ${idx + 1}`}
                                className="w-full h-full object-cover rounded"
                              />
                            </div>
                          ))}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between mb-2">
                        <h4 className="text-lg font-bold">{hostel.name}</h4>
                        <span
                          className={`px-3 py-1 rounded-full text-sm ${
                            hostel.status === "Active"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {hostel.status || "Pending"}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 mb-3">
                        <div className="flex items-start gap-2">
                          <MapPin
                            size={16}
                            className="text-gray-500 mt-0.5 flex-shrink-0"
                          />
                          <div>
                            <p className="text-gray-600 text-sm">
                              {hostel.address}
                            </p>
                            <p className="text-gray-600 text-sm">
                              {hostel.state}, {hostel.pincode}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Building
                            size={16}
                            className="text-gray-500 flex-shrink-0"
                          />
                          <p className="text-gray-600 text-sm">
                            Near {hostel.nearbyUniversity || "N/A"}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <IndianRupee
                            size={16}
                            className="text-gray-500 flex-shrink-0"
                          />
                          <p className="text-gray-600">
                            ₹{hostel.pricePerMonth}/month
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Camera
                            size={16}
                            className="text-gray-500 flex-shrink-0"
                          />
                          <p className="text-gray-600 text-sm">
                            {hostel.images?.length || 1} Photos
                          </p>
                        </div>
                      </div>

                      <div className="mb-3">
                        <span className="font-semibold text-sm block mb-1">
                          Amenities:
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {Array.isArray(hostel.amenities) ? (
                            hostel.amenities.map((amenity, index) => (
                              <span
                                key={index}
                                className="bg-gray-100 px-2 py-1 rounded-full text-xs"
                              >
                                {amenity}
                              </span>
                            ))
                          ) : (
                            <span className="text-gray-600 text-sm">
                              {hostel.amenities}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex gap-2 mt-4">
                        <button className="bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-600">
                          Edit
                        </button>
                        <button className="bg-gray-200 py-1 px-4 rounded hover:bg-gray-300">
                          View Inquiries
                        </button>
                        <button className="bg-gray-200 py-1 px-4 rounded hover:bg-gray-300">
                          Manage Photos
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
                <p className="text-center text-gray-600">
                  You don't have any hostels listed yet. Click "Add New Hostel"
                  to get started!
                </p>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-bold mb-2">Performance Stats</h4>
              <p>Profile views: 42</p>
              <p>Inquiries this month: 7</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <h4 className="font-bold mb-2">Subscription</h4>
              <p>Current plan: Basic</p>
              <button className="mt-2 bg-purple-500 text-white py-1 px-3 rounded text-sm">
                Upgrade
              </button>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-bold mb-2">Tips</h4>
              <p>Complete your profile to appear higher in search results!</p>
            </div>
          </div>
        </>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-bold mb-4 flex items-center">
            <Building className="mr-2 text-blue-600" size={20} />
            Add New Hostel
          </h3>
          <p className="text-gray-600 mb-4">
            Fill in the details below to list your new hostel property
          </p>

          <div className="p-4 bg-blue-50 rounded-lg mb-6">
            <p className="text-center">
              The full hostel listing form will be displayed here, identical to
              the PostHostel component's form.
            </p>
            <p className="text-center text-sm text-gray-600 mt-2">
              This includes fields for basic information, location, room
              details, amenities, pricing, and photo uploads.
            </p>
          </div>

          <button className="bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600 w-full">
            Continue to the Full Form
          </button>
        </div>
      )}
    </div>
  );
};

const HomePage: React.FC = () => {
  // In a real app, you would get this from authentication context
  const currentUser = MOCK_USER;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main>
        {currentUser.role === UserRole.STUDENT ||
        currentUser.userType === "student" ? (
          <StudentHome />
        ) : (
          <OwnerHome hostels={currentUser.hostels} />
        )}
      </main>
      <footer className="bg-gray-800 text-white p-6 mt-10">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-6 md:mb-0">
              <h3 className="text-xl font-bold mb-2">HostelFinder</h3>
              <p className="text-gray-400">
                Finding the perfect accommodation for students
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h4 className="font-bold mb-2">Quick Links</h4>
                <ul className="space-y-1">
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white">
                      Home
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white">
                      About Us
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white">
                      Contact
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-2">Resources</h4>
                <ul className="space-y-1">
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white">
                      FAQ
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white">
                      Blog
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white">
                      Privacy Policy
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-2">Connect</h4>
                <ul className="space-y-1">
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white">
                      Facebook
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white">
                      Twitter
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white">
                      Instagram
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-4 border-t border-gray-700 text-center text-gray-400">
            <p>© 2025 HostelFinder. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
