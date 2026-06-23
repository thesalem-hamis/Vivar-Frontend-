import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { propertyApi } from "../lib/api/services/property.api";
import type {
  Property,
  PropertySearchFilters,
  SearchResult,
  Purpose,
  PropertyType,
  PropertySubType,
  SortOption,
} from "../types/property.types";

const LIMIT = 12;

// ─── Read filters from URLSearchParams ───────────────────────────────────────

function readFilters(sp: URLSearchParams): PropertySearchFilters {
  return {
    searchQuery: sp.get("q") ?? "",
    purpose: (sp.get("purpose") as Purpose) ?? "",
    propertyType: (sp.get("type") as PropertyType) ?? "",
    propertySubType: (sp.get("subtype") as PropertySubType) ?? "",
    bedrooms: sp.get("beds") ?? "",
    state: sp.get("state") ?? "",
    localityArea: sp.get("area") ?? "",
    minPrice: sp.get("minPrice") ?? "",
    maxPrice: sp.get("maxPrice") ?? "",
    isServiced: sp.get("serviced") === "true" ? true : undefined,
    hasBq: sp.get("bq") === "true" ? true : undefined,
    page: Number(sp.get("page") ?? 1),
    limit: LIMIT,
    sort: (sp.get("sort") as SortOption) ?? "newest",
  };
}

// ─── Count active non-page filters ───────────────────────────────────────────

function countActive(f: PropertySearchFilters): number {
  return [
    f.purpose,
    f.propertyType,
    f.propertySubType,
    f.bedrooms,
    f.state,
    f.localityArea,
    f.minPrice || f.maxPrice,
    f.isServiced,
    f.hasBq,
  ].filter(Boolean).length;
}

// ─── Hook ────────────────────────────────────────────────────────────────────

export interface UsePropertySearchReturn {
  results: SearchResult | null;
  featured: Property[];
  loading: boolean;
  error: string | null;
  filters: PropertySearchFilters;
  activeFilterCount: number;
  updateFilter: (key: string, value: string | null) => void;
  clearAllFilters: () => void;
  goToPage: (page: number) => void;
}

export function usePropertySearch(): UsePropertySearchReturn {
  const [searchParams, setSearchParams] = useSearchParams();
  const [results, setResults] = useState<SearchResult | null>(null);
  const [featured, setFeatured] = useState<Property[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();

  const filters = useMemo(() => readFilters(searchParams), [searchParams]);
  const activeFilterCount = useMemo(() => countActive(filters), [filters]);

  // Fetch featured once on mount
  useEffect(() => {
    propertyApi
      .getFeatured()
      .then(setFeatured)
      .catch(() => {}); // silent — featured is supplemental
  }, []);

  // Fetch search results whenever filters change
  useEffect(() => {
    clearTimeout(debounceRef.current);
    const delay = filters.searchQuery ? 420 : 0;

    debounceRef.current = setTimeout(async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await propertyApi.search(filters);
        setResults(res);
      } catch {
        setError(
          "Unable to load properties. Please check your connection and try again.",
        );
        setResults(null);
      } finally {
        setLoading(false);
      }
    }, delay);

    return () => clearTimeout(debounceRef.current);
  }, [searchParams]); // intentionally keyed on searchParams, not filters object

  // ── Mutators ─────────────────────────────────────────────────────────────

  const updateFilter = useCallback(
    (key: string, value: string | null) => {
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          if (value !== null && value !== "") {
            next.set(key, value);
          } else {
            next.delete(key);
          }
          // Reset to page 1 on any filter change (except page itself)
          if (key !== "page") next.delete("page");
          return next;
        },
        { replace: true },
      );
    },
    [setSearchParams],
  );

  const clearAllFilters = useCallback(() => {
    // Preserve text search query if any
    const q = searchParams.get("q");
    setSearchParams(q ? { q } : {}, { replace: true });
  }, [searchParams, setSearchParams]);

  const goToPage = useCallback(
    (page: number) => updateFilter("page", String(page)),
    [updateFilter],
  );

  return {
    results,
    featured,
    loading,
    error,
    filters,
    activeFilterCount,
    updateFilter,
    clearAllFilters,
    goToPage,
  };
}
