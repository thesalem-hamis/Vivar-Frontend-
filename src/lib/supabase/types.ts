export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          first_name: string
          last_name: string
          phone: string | null
          avatar_url: string | null
          role: "user" | "admin" | "agent"
          is_verified: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          first_name: string
          last_name: string
          phone?: string | null
          avatar_url?: string | null
          role?: "user" | "admin" | "agent"
          is_verified?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          first_name?: string
          last_name?: string
          phone?: string | null
          avatar_url?: string | null
          role?: "user" | "admin" | "agent"
          is_verified?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      properties: {
        Row: {
          id: string
          title: string
          description: string | null
          price: number
          location: string
          type: "sale" | "rent"
          status: "available" | "sold" | "rented"
          bedrooms: number
          bathrooms: number
          area: number
          images: string[]
          owner_id: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          price: number
          location: string
          type: "sale" | "rent"
          status?: "available" | "sold" | "rented"
          bedrooms: number
          bathrooms: number
          area: number
          images?: string[]
          owner_id: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          price?: number
          location?: string
          type?: "sale" | "rent"
          status?: "available" | "sold" | "rented"
          bedrooms?: number
          bathrooms?: number
          area?: number
          images?: string[]
          owner_id?: string
          created_at?: string
          updated_at?: string
        }
      }
      bookings: {
        Row: {
          id: string
          user_id: string
          property_id: string
          date: string
          time: string
          status: "pending" | "confirmed" | "cancelled" | "completed"
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          property_id: string
          date: string
          time: string
          status?: "pending" | "confirmed" | "cancelled" | "completed"
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          property_id?: string
          date?: string
          time?: string
          status?: "pending" | "confirmed" | "cancelled" | "completed"
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      reviews: {
        Row: {
          id: string
          user_id: string
          agent_id: string
          property_id: string
          rating: number
          comment: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          agent_id: string
          property_id: string
          rating: number
          comment: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          agent_id?: string
          property_id?: string
          rating?: number
          comment?: string
          created_at?: string
          updated_at?: string
        }
      }
      admin_users: {
        Row: {
          user_id: string
        }
        Insert: {
          user_id: string
        }
        Update: {
          user_id?: string
        }
      }
      property_images: {
        Row: {
          id: string
          property_id: string
          url: string
          file_path: string
          is_primary: boolean
          order_index: number
          created_at: string
        }
        Insert: {
          id?: string
          property_id: string
          url: string
          file_path: string
          is_primary?: boolean
          order_index?: number
          created_at?: string
        }
        Update: {
          id?: string
          property_id?: string
          url?: string
          file_path?: string
          is_primary?: boolean
          order_index?: number
          created_at?: string
        }
      }
    }
  }
}

export type Profile = Database["public"]["Tables"]["profiles"]["Row"]
export type ProfileInsert = Database["public"]["Tables"]["profiles"]["Insert"]
export type ProfileUpdate = Database["public"]["Tables"]["profiles"]["Update"]

export type Property = Database["public"]["Tables"]["properties"]["Row"]
export type PropertyInsert = Database["public"]["Tables"]["properties"]["Insert"]
export type PropertyUpdate = Database["public"]["Tables"]["properties"]["Update"]

export type Booking = Database["public"]["Tables"]["bookings"]["Row"]
export type BookingInsert = Database["public"]["Tables"]["bookings"]["Insert"]
export type BookingUpdate = Database["public"]["Tables"]["bookings"]["Update"]

export type Review = Database["public"]["Tables"]["reviews"]["Row"]
export type ReviewInsert = Database["public"]["Tables"]["reviews"]["Insert"]
export type ReviewUpdate = Database["public"]["Tables"]["reviews"]["Update"]
