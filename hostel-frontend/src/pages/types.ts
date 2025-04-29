export enum UserRole {
  STUDENT = "student",
  OWNER = "owner",
}

export interface City {
  id: number;
  name: string;
  imageUrl: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface Hostel {
  id: number;
  name: string;
  cityId: number;
  address: string;
  state: string;
  pincode: string;
  nearbyUniversity?: string;
  description: string;
  price: number;
  pricePerMonth: number;
  roomTypes: string;
  amenities: string[];
  contactNumber: string;
  contactEmail: string;
  rating: number;
  imageUrl: string;
  images?: string[];
  status: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface UserProfile {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  userType: string;
  hostels: Hostel[];
}

export interface University {
  name: string;
  state: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}