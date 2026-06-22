import type { Profile, Property, Booking, Review } from "./types";
import type { User, DashboardStats } from "@/lib/api";

export function mapProfileToUser(profile: Profile): User {
  return {
    id: profile.id,
    email: profile.email,
    firstName: profile.first_name,
    lastName: profile.last_name,
    phone: profile.phone ?? undefined,
    role: profile.role,
    isVerified: profile.is_verified,
    createdAt: profile.created_at,
    updatedAt: profile.updated_at,
  };
}

export function mapPropertyToUi(p: Property): typeof import("@/lib/api").Property {
  return {
    id: p.id,
    title: p.title,
    description: p.description,
    price: p.price,
    location: p.location,
    type: p.type,
    status: p.status,
    bedrooms: p.bedrooms,
    bathrooms: p.bathrooms,
    area: p.area,
    images: p.images,
    ownerId: p.owner_id,
    createdAt: p.created_at,
    updatedAt: p.updated_at,
  };
}

export function mapBookingToUi(b: Booking): typeof import("@/lib/api").Booking {
  return {
    id: b.id,
    userId: b.user_id,
    propertyId: b.property_id,
    date: b.date,
    time: b.time,
    status: b.status,
    notes: b.notes ?? undefined,
    createdAt: b.created_at,
    updatedAt: b.updated_at,
  };
}

export function mapReviewToUi(r: Review): typeof import("@/lib/api").Review {
  return {
    id: r.id,
    userId: r.user_id,
    agentId: r.agent_id,
    propertyId: r.property_id,
    rating: r.rating,
    comment: r.comment,
    createdAt: r.created_at,
    updatedAt: r.updated_at,
  };
}

export function mapDashboardStats(raw: {
  users: number;
  properties: number;
  bookings: number;
  reviews: number;
}): DashboardStats {
  return {
    users: raw.users,
    properties: raw.properties,
    bookings: raw.bookings,
    reviews: raw.reviews,
  };
}
