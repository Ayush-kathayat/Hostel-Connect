// HomePage.tsx
import React, { useState, useEffect } from "react";
import { UserRole, City, Hostel, UserProfile } from "./types";
import { Building, MapPin, IndianRupee, Camera } from "lucide-react";
import Navbar from "@/components/Navbar";

// Mock data
const POPULAR_CITIES: City[] = [
  { id: 1, name: "Mumbai", imageUrl: "/api/placeholder/300/200" },
  { id: 2, name: "Delhi", imageUrl: "/api/placeholder/300/200" },
  { id: 3, name: "Bangalore", imageUrl: "/api/placeholder/300/200" },
  { id: 4, name: "Hyderabad", imageUrl: "/api/placeholder/300/200" },
  { id: 5, name: "Chennai", imageUrl: "/api/placeholder/300/200" },
  { id: 6, name: "Kolkata", imageUrl: "/api/placeholder/300/200" },
  { id: 7, name: "Pune", imageUrl: "/api/placeholder/300/200" },
  { id: 8, name: "Ahmedabad", imageUrl: "/api/placeholder/300/200" },
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
  {
    id: 1,
    name: "Sunshine Hostel",
    cityId: 1,
    address: "123 Main Street, Mumbai",
    price: 8000,
    amenities: ["WiFi", "AC", "Laundry"],
    rating: 4.2,
    imageUrl: "/api/placeholder/400/300",
  },
  {
    id: 2,
    name: "Green Meadows PG",
    cityId: 1,
    address: "45 Park Avenue, Mumbai",
    price: 7500,
    amenities: ["WiFi", "Food", "Security"],
    rating: 3.8,
    imageUrl: "/api/placeholder/400/300",
  },
  {
    id: 3,
    name: "Delhi Student Hub",
    cityId: 2,
    address: "78 University Road, Delhi",
    price: 9000,
    amenities: ["WiFi", "AC", "Food", "Gym"],
    rating: 4.5,
    imageUrl: "/api/placeholder/400/300",
  },
  {
    id: 4,
    name: "College Court PG",
    cityId: 2,
    address: "25 College Street, Delhi",
    price: 7800,
    amenities: ["WiFi", "Security", "Study Room"],
    rating: 4.0,
    imageUrl: "/api/placeholder/400/300",
  },
];

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
