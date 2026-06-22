// ─── Enums (mirror Prisma schema) ────────────────────────────────────────────

export type Purpose = "FOR_RENT" | "FOR_SALE" | "SHORT_LET" | "JOINT_VENTURE";
export type PropertyType =
  | "HOUSE"
  | "FLAT_APARTMENT"
  | "COMMERCIAL"
  | "LAND"
  | "EVENT_CENTRE";
export type PropertySubType =
  | "DETACHED_DUPLEX"
  | "SEMI_DETACHED_DUPLEX"
  | "TERRACED_DUPLEX"
  | "BUNGALOW"
  | "MANSION"
  | "MINI_FLAT"
  | "SELF_CONTAIN"
  | "PENTHOUSE"
  | "MAISONETTE"
  | "STUDIO"
  | "OFFICE_SPACE"
  | "SHOP"
  | "WAREHOUSE"
  | "PLAZA"
  | "FILLING_STATION";
export type Currency = "NGN" | "USD";
export type PaymentPeriod =
  | "PER_ANNUM"
  | "PER_MONTH"
  | "PER_NIGHT"
  | "OUTRIGHT";
export type FurnishingStatus = "FURNISHED" | "SEMI_FURNISHED" | "UNFURNISHED";
export type Condition =
  | "BRAND_NEW"
  | "NEWLY_BUILT"
  | "RENOVATED"
  | "FAIR_CONDITION";
export type PowerSupply =
  | "TWENTY_FOUR_HOURS"
  | "TWELVE_HOURS"
  | "SOLAR_INVERTER"
  | "PUBLIC_POWER_ONLY";
export type AmenityType =
  | "WATER_TREATMENT_PLANT"
  | "SWIMMING_POOL"
  | "GATED_ESTATE"
  | "UNIFORMED_SECURITY"
  | "FITTED_KITCHEN"
  | "CCTV"
  | "AMPLE_PARKING";

// ─── Related Models ───────────────────────────────────────────────────────────

export interface PropertyLocation {
  id: string;
  propertyId: string;
  state: string;
  lga: string;
  localityArea: string;
  estateName?: string;
  streetAddress?: string;
  latitude?: number;
  longitude?: number;
}

export interface PropertyPricing {
  id: string;
  propertyId: string;
  currency: Currency;
  price: string | number; // Prisma Decimal → string
  paymentPeriod: PaymentPeriod;
  serviceCharge?: string | number;
  agencyFeePercentage?: string | number;
  legalFeePercentage?: string | number;
  cautionFee?: string | number;
}

export interface PropertyAmenities {
  id: string;
  propertyId: string;
  isServiced: boolean;
  hasBq: boolean;
  powerSupply?: PowerSupply;
  amenityList: AmenityType[];
}

// ─── Core Property ────────────────────────────────────────────────────────────

export interface Property {
  id: string;
  title: string;
  description?: string;
  propertyType: PropertyType;
  propertySubType: PropertySubType;
  purpose: Purpose;
  bedrooms?: number;
  bathrooms?: number;
  floorAreaSqm?: string | number;
  isVerified: boolean;
  isActive: boolean;
  isFeatured: boolean;
  viewsCount: number;
  furnishingStatus?: FurnishingStatus;
  condition?: Condition;
  location?: PropertyLocation;
  pricing?: PropertyPricing;
  amenities?: PropertyAmenities;
  createdAt: string;
  updatedAt: string;
}

// ─── API Response ─────────────────────────────────────────────────────────────

export interface SearchMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface SearchResult {
  data: Property[];
  meta: SearchMeta;
}

// ─── Filter State ─────────────────────────────────────────────────────────────

export interface PropertySearchFilters {
  searchQuery?: string;
  purpose?: Purpose | "";
  propertyType?: PropertyType | "";
  propertySubType?: PropertySubType | "";
  bedrooms?: string;
  state?: string;
  localityArea?: string;
  minPrice?: string;
  maxPrice?: string;
  isServiced?: boolean;
  hasBq?: boolean;
  page?: number;
  limit?: number;
  sort?: SortOption;
}

export type SortOption = "newest" | "price_asc" | "price_desc" | "most_viewed";

// ─── Label Maps (shared across components) ────────────────────────────────────

export const PURPOSE_LABELS: Record<Purpose, string> = {
  FOR_SALE: "For Sale",
  FOR_RENT: "For Rent",
  SHORT_LET: "Short Let",
  JOINT_VENTURE: "Joint Venture",
};

export const PROPERTY_TYPE_LABELS: Record<PropertyType, string> = {
  HOUSE: "House",
  FLAT_APARTMENT: "Flat / Apartment",
  COMMERCIAL: "Commercial",
  LAND: "Land",
  EVENT_CENTRE: "Event Centre",
};

export const SUB_TYPE_LABELS: Record<PropertySubType, string> = {
  DETACHED_DUPLEX: "Detached Duplex",
  SEMI_DETACHED_DUPLEX: "Semi-Detached Duplex",
  TERRACED_DUPLEX: "Terraced Duplex",
  BUNGALOW: "Bungalow",
  MANSION: "Mansion",
  MINI_FLAT: "Mini Flat",
  SELF_CONTAIN: "Self Contain",
  PENTHOUSE: "Penthouse",
  MAISONETTE: "Maisonette",
  STUDIO: "Studio",
  OFFICE_SPACE: "Office Space",
  SHOP: "Shop",
  WAREHOUSE: "Warehouse",
  PLAZA: "Plaza",
  FILLING_STATION: "Filling Station",
};

export const SUB_TYPES_BY_TYPE: Partial<
  Record<PropertyType, PropertySubType[]>
> = {
  HOUSE: [
    "DETACHED_DUPLEX",
    "SEMI_DETACHED_DUPLEX",
    "TERRACED_DUPLEX",
    "BUNGALOW",
    "MANSION",
  ],
  FLAT_APARTMENT: [
    "MINI_FLAT",
    "SELF_CONTAIN",
    "PENTHOUSE",
    "MAISONETTE",
    "STUDIO",
  ],
  COMMERCIAL: ["OFFICE_SPACE", "SHOP", "WAREHOUSE", "PLAZA", "FILLING_STATION"],
};

export const NIGERIAN_STATES = [
  "Lagos",
  "Abuja",
  "Rivers",
  "Ogun",
  "Oyo",
  "Kano",
  "Kaduna",
  "Anambra",
  "Edo",
  "Delta",
  "Imo",
  "Enugu",
  "Cross River",
  "Kwara",
  "Bayelsa",
  "Borno",
  "Plateau",
];

export const SORT_LABELS: Record<SortOption, string> = {
  newest: "Newest First",
  price_asc: "Price: Low → High",
  price_desc: "Price: High → Low",
  most_viewed: "Most Viewed",
};
