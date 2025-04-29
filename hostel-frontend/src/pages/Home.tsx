import { searchUniversities, University } from "@/data/universities";
import Footer from "@/components/Footer";
import React, { useState, useEffect, useCallback } from "react";
import { UserRole, type City, type Hostel, type UserProfile } from "./types";
import { Building, MapPin, IndianRupee, Camera } from "lucide-react";
import Navbar from "@/components/Navbar";
import { MOCK_HOSTELS } from "@/data/hostels";
import GoogleMap from "@/components/GoogleMap";
import { toast } from "@/components/ui/use-toast";
import { debounce } from "lodash";
import { useNavigate } from "react-router-dom";

const POPULAR_CITIES: City[] = [
  { id: 1, name: "Mumbai", imageUrl: "/City photos/Mumbai.jpeg", coordinates: { lat: 19.0760, lng: 72.8777 } },
  { id: 2, name: "Delhi", imageUrl: "/City photos/Delhi.webp", coordinates: { lat: 28.7041, lng: 77.1025 } },
  { id: 3, name: "Bangalore", imageUrl: "/City photos/Banglore.webp", coordinates: { lat: 12.9716, lng: 77.5946 } },
  { id: 4, name: "Hyderabad", imageUrl: "/City photos/hydrebad.jpeg", coordinates: { lat: 17.3850, lng: 78.4867 } },
  { id: 5, name: "Chennai", imageUrl: "/City photos/Chennai.jpeg", coordinates: { lat: 13.0827, lng: 80.2707 } },
  { id: 6, name: "Kolkata", imageUrl: "/City photos/Kolkata.png", coordinates: { lat: 22.5726, lng: 88.3639 } },
  { id: 7, name: "Pune", imageUrl: "/City photos/Pune'.jpeg", coordinates: { lat: 18.5204, lng: 73.8567 } },
  { id: 8, name: "Ahmedabad", imageUrl: "/City photos/ahmedabad.webp", coordinates: { lat: 23.0225, lng: 72.5714 } },
];

const MOCK_USER: UserProfile = {
  id: 1,
  name: "John Doe",
  email: "john@example.com",
  role: UserRole.STUDENT,
  userType: "student",
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
      coordinates: { lat: 28.7045, lng: 77.1020 }, // Added for demo
    },
  ],
};

const StudentHome: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCity, setSelectedCity] = useState<number | null>(null);
  const [selectedUniversity, setSelectedUniversity] = useState<string | null>(null);
  const [selectedCityCoords, setSelectedCityCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [selectedUniversityCoords, setSelectedUniversityCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [selectedPopularCityCoords, setSelectedPopularCityCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [hostelsToShow, setHostelsToShow] = useState<Hostel[]>([]);
  const [activeTab, setActiveTab] = useState<"cities" | "universities">("cities");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [universities, setUniversities] = useState<University[]>([]);
  const [filteredUniversities, setFilteredUniversities] = useState<University[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchLoading, setSearchLoading] = useState<boolean>(false);

  // Fetch universities on mount
  useEffect(() => {
    const loadUniversities = async () => {
      setLoading(true);
      try {
        const data = await searchUniversities("");
        console.log("Initial universities loaded:", data);
        if (data.length > 0) {
          setUniversities(data);
          setFilteredUniversities(data.slice(0, 12));
        } else {
          toast({
            title: "Error",
            description: "No universities found in the database.",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error("Error loading universities:", error);
        toast({
          title: "Error",
          description: "Failed to load universities. Please try again.",
          variant: "destructive",
        });
      }
      setLoading(false);
    };
    loadUniversities();
  }, []);

  // Debounced search handler
  const handleSearch = useCallback(
    debounce(async (query: string) => {
      setSearchLoading(true);
      try {
        console.log("Searching for:", query);
        const results = await searchUniversities(query);
        console.log("Search results:", results);
        setFilteredUniversities(results.slice(0, 12));
        setUniversities((prev) => {
          const newUniversities = [...prev, ...results.filter((r) => !prev.some((p) => p.name === r.name))];
          console.log("Updated universities state:", newUniversities);
          return newUniversities;
        });
        if (results.length === 0 && query) {
          toast({
            title: "No Results",
            description: `No universities found for "${query}". Try a different search term.`,
            variant: "default",
          });
        }
      } catch (error) {
        console.error("Search error:", error);
        toast({
          title: "Error",
          description: "Failed to search universities. Please try again.",
          variant: "destructive",
        });
      }
      setSearchLoading(false);
    }, 500),
    []
  );

  // Update search query and trigger search
  useEffect(() => {
    handleSearch(searchQuery);
  }, [searchQuery, handleSearch]);

  const handleCitySelect = (cityId: number) => {
    setSelectedCity(cityId);
    setSelectedUniversity(null);
    setSelectedUniversityCoords(null);
    setSelectedPopularCityCoords(null);
    const city = POPULAR_CITIES.find((c) => c.id === cityId);
    if (city && city.coordinates) {
      setSelectedCityCoords(city.coordinates);
    }
    setActiveTab("cities");

    const filteredHostels = MOCK_HOSTELS.filter((hostel) => hostel.cityId === cityId);
    setHostelsToShow(filteredHostels);
  };

  const handleUniversitySelect = (universityName: string) => {
    setSelectedUniversity(universityName);
    setSelectedCity(null);
    setSelectedCityCoords(null);
    setSelectedPopularCityCoords(null);
    console.log("Selecting university:", universityName);
    const university = filteredUniversities.find((uni) => uni.name === universityName);
    console.log("Found university in filteredUniversities:", university);
    if (university && university.coordinates) {
      console.log("Setting university coords:", university.coordinates);
      setSelectedUniversityCoords(university.coordinates);
    } else {
      console.warn("No coordinates found for university:", universityName);
      setSelectedUniversityCoords(null);
      toast({
        title: "Error",
        description: "No coordinates available for this university.",
        variant: "destructive",
      });
    }
    setActiveTab("universities");

    const stateName = university?.state;
    const cityId = POPULAR_CITIES.find((city) => city.name === stateName || city.name.includes(stateName))?.id;
    const filteredHostels = cityId ? MOCK_HOSTELS.filter((hostel) => hostel.cityId === cityId) : MOCK_HOSTELS.slice(0, 5);
    setHostelsToShow(filteredHostels);
  };

  const handleCityClick = (lat: number, lng: number, cityId: number) => {
    setSelectedPopularCityCoords({ lat, lng });
    setSelectedCityCoords(null);
    setSelectedUniversityCoords(null);
    handleCitySelect(cityId);
  };

  const resetSelection = () => {
    setSelectedCity(null);
    setSelectedUniversity(null);
    setSelectedCityCoords(null);
    setSelectedUniversityCoords(null);
    setSelectedPopularCityCoords(null);
    setHostelsToShow([]);
    setActiveTab("cities");
    setSearchQuery("");
  };

  const handleViewDetails = (hostel: Hostel) => {
    const university = filteredUniversities.find((uni) => uni.name === selectedUniversity);
    navigate(`/hostel/${hostel.id}`, { state: { hostel, university } });
  };

  if (loading) return <div>Loading universities...</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Find Your Perfect Hostel</h2>

        <div className="mb-8">
          <div className="bg-blue-50 p-6 rounded-lg">
            <div className="space-y-8">
              {/* Search Sections */}
              {!selectedCity && !selectedUniversity ? (
                <>
                  {/* Search by Cities Section */}
                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-blue-700">Search by Cities</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {POPULAR_CITIES.map((city) => (
                        <div
                          key={city.id}
                          className="bg-white rounded-lg overflow-hidden shadow-md cursor-pointer hover:shadow-lg transition-shadow"
                          onClick={() => handleCitySelect(city.id)}
                        >
                          <img
                            src={city.imageUrl || "/placeholder.svg"}
                            alt={city.name}
                            className="w-full h-40 object-cover"
                          />
                          <div className="p-4">
                            <h3 className="font-bold text-lg">{city.name}</h3>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Search by Universities Section */}
                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-blue-700">Search by Universities</h3>
                    <div className="mb-4">
                      <input
                        type="text"
                        placeholder="Search universities by name..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full p-2 rounded-lg shadow-md bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    {searchLoading ? (
                      <div className="text-center">Loading results...</div>
                    ) : filteredUniversities.length > 0 ? (
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {filteredUniversities.map((university) => (
                          <div
                            key={university.name}
                            className="bg-white rounded-lg overflow-hidden shadow-md cursor-pointer hover:shadow-lg transition-shadow"
                            onClick={() => handleUniversitySelect(university.name)}
                          >
                            <div className="p-4">
                              <h3 className="font-bold text-lg">{university.name}</h3>
                              <p className="text-gray-600 text-sm">{university.state}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center text-gray-600">
                        No universities found. Try a different search term.
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <div className="text-center py-4">
                  <p className="text-lg text-blue-700">
                    {activeTab === "cities" && selectedCity
                      ? `Showing hostels in ${POPULAR_CITIES.find((city) => city.id === selectedCity)?.name}`
                      : `Showing hostels near ${selectedUniversity}`}
                  </p>
                  {/* Map for selected city */}
                  {selectedCityCoords && (
                    <div className="mt-6">
                      <GoogleMap
                        lat={selectedCityCoords.lat}
                        lng={selectedCityCoords.lng}
                        zoom={10}
                        name={POPULAR_CITIES.find((city) => city.id === selectedCity)?.name}
                      />
                    </div>
                  )}
                  {/* Map for selected university */}
                  {selectedUniversityCoords && (
                    <div className="mt-6">
                      <GoogleMap
                        lat={selectedUniversityCoords.lat}
                        lng={selectedUniversityCoords.lng}
                        zoom={15}
                        name={selectedUniversity}
                      />
                    </div>
                  )}
                  {!selectedCityCoords && !selectedUniversityCoords && (
                    <div className="mt-6 text-red-500">
                      No coordinates available to display the map.
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {hostelsToShow.length > 0 && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">
              {activeTab === "cities" && selectedCity
                ? `Hostels in ${POPULAR_CITIES.find((city) => city.id === selectedCity)?.name}`
                : activeTab === "universities" && selectedUniversity
                ? `Hostels near ${selectedUniversity}`
                : "Matching Hostels"}
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
                  src={hostel.imageUrl || "/placeholder.svg"}
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
                  <p className="font-semibold text-lg mt-2">₹{hostel.price}/month</p>
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
                  <button
                    className="mt-4 bg-blue-500 text-white py-2 px-4 rounded w-full hover:bg-blue-600"
                    onClick={() => handleViewDetails(hostel)}
                  >
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
  const [activeTab, setActiveTab] = useState<"dashboard" | "addNew">("dashboard");

  return (
    <div className="container mx-auto p-4">
      <div className="bg-blue-50 p-6 rounded-lg mb-6">
        <h2 className="text-2xl font-bold mb-2">Welcome to your Hostel Dashboard</h2>
        <p className="text-gray-600 mb-4">Manage your listed properties and check performance metrics</p>
        <div className="flex gap-3">
          <button
            className={`py-2 px-6 rounded ${activeTab === "dashboard" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}`}
            onClick={() => setActiveTab("dashboard")}
          >
            Dashboard
          </button>
          <button
            className={`py-2 px-6 rounded ${activeTab === "addNew" ? "bg-green-500 text-white" : "bg-gray-200 text-gray-700"}`}
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
                            src={hostel.imageUrl || "/placeholder.svg"}
                            alt={hostel.name}
                            className="w-full h-full object-cover rounded"
                          />
                        </div>
                        {hostel.images &&
                          hostel.images.slice(0, 2).map((img, idx) => (
                            <div key={idx} className="col-span-1">
                              <img
                                src={img || "/placeholder.svg"}
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
                            hostel.status === "Active" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {hostel.status || "Pending"}
                        </span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 mb-3">
                        <div className="flex items-start gap-2">
                          <MapPin size={16} className="text-gray-500 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-gray-600 text-sm">{hostel.address}</p>
                            <p className="text-gray-600 text-sm">{hostel.state}, {hostel.pincode}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Building size={16} className="text-gray-500 flex-shrink-0" />
                          <p className="text-gray-600 text-sm">{hostel.nearbyUniversity || "N/A"}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <IndianRupee size={16} className="text-gray-500 flex-shrink-0" />
                          <p className="text-gray-600">₹{hostel.pricePerMonth}/month</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Camera size={16} className="text-gray-500 flex-shrink-0" />
                          <p className="text-gray-600 text-sm">{hostel.images?.length || 1} Photos</p>
                        </div>
                      </div>
                      <div className="mb-3">
                        <span className="font-semibold text-sm block mb-1">Amenities:</span>
                        <div className="flex flex-wrap gap-2">
                          {Array.isArray(hostel.amenities) ? (
                            hostel.amenities.map((amenity, index) => (
                              <span key={index} className="bg-gray-100 px-2 py-1 rounded-full text-xs">
                                {amenity}
                              </span>
                            ))
                          ) : (
                            <span className="text-gray-600 text-sm">{hostel.amenities}</span>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2 mt-4">
                        <button className="bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-600">Edit</button>
                        <button className="bg-gray-200 py-1 px-4 rounded hover:bg-gray-300">View Inquiries</button>
                        <button className="bg-gray-200 py-1 px-4 rounded hover:bg-gray-300">Manage Photos</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
                <p className="text-center text-gray-600">
                  You don't have any hostels listed yet. Click "Add New Hostel" to get started!
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
              <button className="mt-2 bg-purple-500 text-white py-1 px-3 rounded text-sm">Upgrade</button>
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
          <p className="text-gray-600 mb-4">Fill in the details below to list your new hostel property</p>
          <div className="p-4 bg-blue-50 rounded-lg mb-6">
            <p className="text-center">
              The full hostel listing form will be displayed here, identical to the PostHostel component's form.
            </p>
            <p className="text-center text-sm text-gray-600 mt-2">
              This includes fields for basic information, location, room details, amenities, pricing, and photo uploads.
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
  const currentUser = MOCK_USER;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main>
        {currentUser.role === UserRole.STUDENT || currentUser.userType === "student" ? (
          <StudentHome />
        ) : (
          <OwnerHome hostels={currentUser.hostels} />
        )}
      </main>
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default HomePage;