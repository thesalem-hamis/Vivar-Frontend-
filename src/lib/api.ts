import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  role: "user" | "admin" | "agent";
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  type: "sale" | "rent";
  status: "available" | "sold" | "rented";
  bedrooms: number;
  bathrooms: number;
  area: number;
  images: string[];
  ownerId: string;
  owner?: User;
  createdAt: string;
  updatedAt: string;
}

export interface Booking {
  id: string;
  userId: string;
  user?: User;
  propertyId: string;
  property?: Property;
  date: string;
  time: string;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  id: string;
  userId: string;
  user?: User;
  agentId: string;
  agent?: User;
  propertyId: string;
  property?: Property;
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
}

export interface DashboardStats {
  users: number;
  properties: number;
  bookings: number;
  reviews: number;
}

export const adminApi = {
  getStats: () => api.get<DashboardStats>("/admin/stats"),

  getUsers: () => api.get<User[]>("/admin/users"),
  getUser: (id: string) => api.get<User>(`/admin/users/${id}`),
  deleteUser: (id: string) => api.delete(`/admin/users/${id}`),

  getProperties: () => api.get<Property[]>("/admin/properties"),
  createProperty: (data: Partial<Property>) => api.post<Property>("/admin/properties", data),
  deleteProperty: (id: string) => api.delete(`/admin/properties/${id}`),

  getBookings: () => api.get<Booking[]>("/admin/bookings"),
  deleteBooking: (id: string) => api.delete(`/admin/bookings/${id}`),

  getReviews: () => api.get<Review[]>("/admin/reviews"),
  deleteReview: (id: string) => api.delete(`/admin/reviews/${id}`),
};