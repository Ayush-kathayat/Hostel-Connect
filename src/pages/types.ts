// Type definitions
export enum UserRole {
  STUDENT = "student",
  HOSTEL_OWNER = "hostel_owner",
}

export interface City {
  id: number;
  name: string;
  imageUrl: string;
}

export interface Hostel {
  id: number;
  name: string;
  cityId: number;
  address: string;
  state?: string;
  pincode?: string;
  nearbyUniversity?: string;
  description?: string;
  price: number;
  pricePerMonth?: number;
  roomTypes?: string;
  amenities: string[] | string;
  contactNumber?: string;
  contactEmail?: string;
  rating?: number;
  imageUrl: string;
  images?: string[];
  status?: string;
}

export interface UserProfile {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  userType?: "student" | "hostelProvider";
  hostels: Hostel[];
}
