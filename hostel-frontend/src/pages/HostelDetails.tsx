import React, { useState, useEffect } from "react";
import { useLocation, useParams, Link } from "react-router-dom";
import { MapPin, IndianRupee, Camera, Building } from "lucide-react";
import GoogleMap from "@/components/GoogleMap";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Hostel, University } from "./types";

const HostelDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const { hostel, university }: { hostel?: Hostel; university?: University } = location.state || {};
  const [distance, setDistance] = useState<string | null>(null);

  useEffect(() => {
    if (hostel?.coordinates && university?.coordinates) {
      const service = new google.maps.DistanceMatrixService();
      service.getDistanceMatrix(
        {
          origins: [{ lat: hostel.coordinates.lat, lng: hostel.coordinates.lng }],
          destinations: [{ lat: university.coordinates.lat, lng: university.coordinates.lng }],
          travelMode: google.maps.TravelMode.DRIVING,
        },
        (response, status) => {
          if (status === "OK" && response?.rows[0]?.elements[0]?.distance) {
            setDistance(response.rows[0].elements[0].distance.text);
          } else {
            console.error("Distance Matrix error:", status);
            setDistance("Not available");
          }
        }
      );
    }
  }, [hostel, university]);

  if (!hostel || !university) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto p-4">
          <h2 className="text-2xl font-bold mb-4">Error</h2>
          <p className="text-red-500">Hostel or university data not found.</p>
          <Link to="/" className="text-blue-500 hover:underline">
            Back to Home
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">{hostel.name}</h2>
        <div className="bg-white rounded-lg shadow-md p-6">
          {/* Map at the Top */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">Location of {university.name}</h3>
            {university.coordinates ? (
              <GoogleMap
                lat={university.coordinates.lat}
                lng={university.coordinates.lng}
                zoom={15}
                name={university.name}
              />
            ) : (
              <p className="text-red-500">No coordinates available for {university.name}.</p>
            )}
          </div>

          {/* Details and Images Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Details on the Left */}
            <div>
              <h3 className="text-xl font-semibold mb-2">Hostel Details</h3>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <MapPin size={16} className="text-gray-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-gray-600">{hostel.address}</p>
                    <p className="text-gray-600">
                      {hostel.state}, {hostel.pincode}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Building size={16} className="text-gray-500 flex-shrink-0" />
                  <p className="text-gray-600">{hostel.nearbyUniversity || "N/A"}</p>
                </div>
                <div className="flex items-center gap-2">
                  <IndianRupee size={16} className="text-gray-500 flex-shrink-0" />
                  <p className="text-gray-600">₹{hostel.pricePerMonth}/month</p>
                </div>
                <div className="flex items-center gap-2">
                  <Camera size={16} className="text-gray-500 flex-shrink-0" />
                  <p className="text-gray-600">{hostel.images?.length || 1} Photos</p>
                </div>
                <div>
                  <p className="text-gray-600">
                    Distance to {university.name}: {distance || "Calculating..."}
                  </p>
                </div>
              </div>
              <div className="mt-4">
                <h4 className="font-semibold">Description</h4>
                <p className="text-gray-600">{hostel.description}</p>
              </div>
              <div className="mt-4">
                <h4 className="font-semibold">Amenities</h4>
                <div className="flex flex-wrap gap-2 mt-2">
                  {Array.isArray(hostel.amenities) ? (
                    hostel.amenities.map((amenity, index) => (
                      <span key={index} className="bg-gray-100 px-2 py-1 rounded-full text-xs">
                        {amenity}
                      </span>
                    ))
                  ) : (
                    <span className="bg-gray-100 px-2 py-1 rounded-full text-xs">{hostel.amenities}</span>
                  )}
                </div>
              </div>
              <div className="mt-6">
                <Link to="/" className="bg-gray-200 py-2 px-4 rounded hover:bg-gray-300">
                  Back to Search
                </Link>
              </div>
            </div>

            {/* Images on the Bottom Right */}
            <div className="md:mt-0">
              <h3 className="text-xl font-semibold mb-2">Images</h3>
              <div className="grid grid-cols-3 gap-2 h-64">
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
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HostelDetails;