import axios from "axios";
import type {
  Property,
  PropertySearchFilters,
  SearchResult,
} from "../../../types/property.types";
import { api } from "../axios";

const BASE =
  (import.meta as any).env?.VITE_API_URL ?? "http://localhost:3000/api";

function buildParams(filters: PropertySearchFilters): URLSearchParams {
  const p = new URLSearchParams();
  const entries = Object.entries(filters) as [string, unknown][];
  entries.forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== "") {
      p.set(k, String(v));
    }
  });
  return p;
}

export const propertyApi = {
  search: async (
    filters: PropertySearchFilters = {},
  ): Promise<SearchResult> => {
    const { data } = await api.get<{
      success: boolean;
      data: Property[];
      meta: SearchResult["meta"];
    }>(`/properties/search?${buildParams(filters)}`);
    return { data: data.data, meta: data.meta };
  },

  getFeatured: async (): Promise<Property[]> => {
    const { data } = await api.get<{ success: boolean; data: Property[] }>(
      "/properties/featured",
    );
    return data.data ?? [];
  },

  getById: async (id: string): Promise<Property> => {
    const { data } = await api.get<{ success: boolean; data: Property }>(
      `/properties/${id}`,
    );
    return data.data;
  },
};

export function formatNaira(amount: number | string): string {
  const n = Number(amount);
  if (n >= 1_000_000_000) return `₦${(n / 1_000_000_000).toFixed(1)}B`;
  if (n >= 1_000_000) return `₦${(n / 1_000_000).toFixed(0)}M`;
  if (n >= 1_000) return `₦${(n / 1_000).toFixed(0)}K`;
  return `₦${n.toLocaleString()}`;
}

export function formatUSD(amount: number | string): string {
  return `$${Number(amount).toLocaleString()}`;
}

export function formatPrice(pricing: Property["pricing"] | undefined): string {
  if (!pricing) return "Price on request";
  const price =
    pricing.currency === "NGN"
      ? formatNaira(pricing.price)
      : formatUSD(pricing.price);
  const suffix: Record<string, string> = {
    PER_ANNUM: "/yr",
    PER_MONTH: "/mo",
    PER_NIGHT: "/night",
    OUTRIGHT: "",
  };
  return `${price}${suffix[pricing.paymentPeriod] ?? ""}`;
}
