export interface Property {
  id: string;
  title: string;
  area: string;
  city: string;
  location: string;
  type: string;
  price: number;
  currency: "NGN" | "USD";
  beds: number;
  baths: number;
  sqm: number;
  status: "For Sale" | "For Rent" | "Sold" | "Off-Plan";
  featured: boolean;
  image: string;
  agent: string;
  agentInitials: string;
  listedDate: string;
  description: string;
}

export const mockProperties: Property[] = [
  {
    id: "1",
    title: "Luxury Waterfront Duplex",
    area: "Ikoyi",
    city: "Lagos",
    location: "Ikoyi, Lagos",
    type: "Detached Duplex",
    price: 850000000,
    currency: "NGN",
    beds: 5,
    baths: 6,
    sqm: 450,
    status: "For Sale",
    featured: true,
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=400&auto=format&fit=crop",
    agent: "Amara Johnson",
    agentInitials: "AJ",
    listedDate: "2026-06-15",
    description:
      "A stunning waterfront property in the heart of Ikoyi, offering unobstructed lagoon views and premium finishes throughout.",
  },
  {
    id: "2",
    title: "Modern Serviced Apartment",
    area: "Victoria Island",
    city: "Lagos",
    location: "Victoria Island, Lagos",
    type: "Serviced Apartment",
    price: 18000000,
    currency: "NGN",
    beds: 3,
    baths: 3,
    sqm: 180,
    status: "For Rent",
    featured: false,
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=400&auto=format&fit=crop",
    agent: "Kemi Adeyemi",
    agentInitials: "KA",
    listedDate: "2026-06-18",
    description:
      "Fully serviced 3-bedroom apartment in the commercial heart of Victoria Island, ideal for corporate tenants.",
  },
  {
    id: "3",
    title: "Penthouse Suite",
    area: "Banana Island",
    city: "Lagos",
    location: "Banana Island, Lagos",
    type: "Penthouse",
    price: 1200000000,
    currency: "NGN",
    beds: 4,
    baths: 5,
    sqm: 520,
    status: "For Sale",
    featured: true,
    image:
      "https://images.unsplash.com/photo-1600210492486-715a3ca7b5cb?q=80&w=400&auto=format&fit=crop",
    agent: "Chidi Obi",
    agentInitials: "CO",
    listedDate: "2026-06-10",
    description:
      "An extraordinary penthouse on one of Nigeria's most exclusive addresses, featuring panoramic views and private rooftop terrace.",
  },
  {
    id: "4",
    title: "Executive Family Residence",
    area: "Lekki Phase 1",
    city: "Lagos",
    location: "Lekki Phase 1, Lagos",
    type: "Semi-Detached Duplex",
    price: 620000000,
    currency: "NGN",
    beds: 4,
    baths: 5,
    sqm: 380,
    status: "For Sale",
    featured: false,
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=400&auto=format&fit=crop",
    agent: "Ngozi Eze",
    agentInitials: "NE",
    listedDate: "2026-06-20",
    description:
      "Premium family home in the sought-after Lekki Phase 1 corridor, with excellent access to schools, retail, and the Lagos waterfront.",
  },
  {
    id: "5",
    title: "Luxury Bungalow",
    area: "Maitama",
    city: "Abuja",
    location: "Maitama, Abuja",
    type: "Detached Bungalow",
    price: 480000000,
    currency: "NGN",
    beds: 4,
    baths: 4,
    sqm: 320,
    status: "Sold",
    featured: false,
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=400&auto=format&fit=crop",
    agent: "Emeka Adeyemi",
    agentInitials: "EA",
    listedDate: "2026-05-28",
    description:
      "Elegant single-storey residence in Maitama — Abuja's premier residential district — sold after just 12 days on market.",
  },
  {
    id: "6",
    title: "Off-Plan Development Unit",
    area: "Lekki Phase 2",
    city: "Lagos",
    location: "Lekki Phase 2, Lagos",
    type: "Apartment",
    price: 95000000,
    currency: "NGN",
    beds: 2,
    baths: 2,
    sqm: 110,
    status: "Off-Plan",
    featured: false,
    image:
      "https://images.unsplash.com/photo-1571055107559-3e67626fa8be?q=80&w=400&auto=format&fit=crop",
    agent: "Amara Johnson",
    agentInitials: "AJ",
    listedDate: "2026-06-01",
    description:
      "Early-access unit in a premium gated development. Completion Q3 2027. Typical appreciation of 20–30% projected at completion.",
  },
  {
    id: "7",
    title: "Waterfront Villa",
    area: "Old GRA",
    city: "Port Harcourt",
    location: "Old GRA, Port Harcourt",
    type: "Detached Villa",
    price: 310000000,
    currency: "NGN",
    beds: 5,
    baths: 5,
    sqm: 400,
    status: "For Sale",
    featured: false,
    image:
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?q=80&w=400&auto=format&fit=crop",
    agent: "Kemi Adeyemi",
    agentInitials: "KA",
    listedDate: "2026-06-12",
    description:
      "Spacious villa in the prestigious Old GRA, Port Harcourt. Features a private pool, 3-car garage, and BQ.",
  },
  {
    id: "8",
    title: "Smart Studio Apartment",
    area: "Yaba",
    city: "Lagos",
    location: "Yaba, Lagos",
    type: "Studio",
    price: 4500000,
    currency: "NGN",
    beds: 1,
    baths: 1,
    sqm: 45,
    status: "For Rent",
    featured: false,
    image:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=400&auto=format&fit=crop",
    agent: "Ngozi Eze",
    agentInitials: "NE",
    listedDate: "2026-06-22",
    description:
      "Contemporary furnished studio in the heart of Yaba's tech and creative district. Ideal for young professionals.",
  },
];

export const statusColors: Record<string, string> = {
  "For Sale": "bg-[#0E292F]/10 text-[#0E292F]",
  "For Rent": "bg-blue-50 text-blue-700",
  Sold: "bg-gray-100 text-gray-500",
  "Off-Plan": "bg-amber-50 text-amber-700",
};

export const formatPrice = (price: number, currency: string) => {
  if (currency === "NGN") {
    return `₦${(price / 1_000_000).toFixed(0)}M`;
  }
  return `$${price.toLocaleString()}`;
};
