import axios from "axios";

export interface University {
  name: string;
  state: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

// Fetch universities from the backend
export const fetchUniversities = async (): Promise<University[]> => {
  try {
    const response = await axios.get("https://hostel-connect-backend.onrender.com/api/universities");
    console.log("Fetched universities:", response.data.length);
    return response.data;
  } catch (error) {
    console.error("Error fetching universities:", error);
    throw error;
  }
};

// Search universities by name or state
export const searchUniversities = async (query: string): Promise<University[]> => {
  try {
    const trimmedQuery = query.trim();
    const response = await axios.get(
      `https://hostel-connect-backend.onrender.com/api/universities/search?q=${encodeURIComponent(trimmedQuery)}`
    );
    console.log(`Search query: "${trimmedQuery}", Found: ${response.data.length} universities`);
    return response.data;
  } catch (error) {
    console.error("Error searching universities:", error);
    throw error;
  }
};

// Calculate distance between two coordinates using the Haversine formula (in km)
export const calculateDistance = (
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number => {
  const R = 6371;
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLng = (lng2 - lng1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return distance;
};

// Get hostels near a university within a specific radius (in km)
export const getHostelsNearUniversity = async (
  universityName: string,
  hostels: any[],
  radiusKm: number = 10
): Promise<any[]> => {
  const universities = await fetchUniversities();
  const university = universities.find((u) => u.name === universityName);
  if (!university) return [];

  return hostels.filter((hostel) => {
    const hostelCoords = hostel.coordinates
      ? { lat: hostel.coordinates.lat, lng: hostel.coordinates.lng }
      : null;

    if (!hostelCoords) return false;

    const distance = calculateDistance(
      university.coordinates.lat,
      university.coordinates.lng,
      hostelCoords.lat,
      hostelCoords.lng
    );

    hostel.distance = `${distance.toFixed(1)} km`;

    return distance <= radiusKm;
  });
};