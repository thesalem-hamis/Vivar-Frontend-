import {
  PURPOSE_LABELS,
  PROPERTY_TYPE_LABELS,
  SUB_TYPE_LABELS,
  NIGERIAN_STATES,
  type Purpose,
  type PropertyType,
  type PropertySubType,
  type PropertySearchFilters,
} from "@/types/property.types";

const PRICE_MAP: Record<string, string> = {
  "5000000": "₦5M",
  "10000000": "₦10M",
  "25000000": "₦25M",
  "50000000": "₦50M",
  "100000000": "₦100M",
  "200000000": "₦200M",
  "500000000": "₦500M",
  "1000000000": "₦1B+",
};

const CloseSVG = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
    <path
      d="M18 6L6 18M6 6l12 12"
      stroke="currentColor"
      strokeWidth="2.8"
      strokeLinecap="round"
    />
  </svg>
);

interface Pill {
  label: string;
  filterKey: string;
  filterValue: string | null;
}

interface ActiveFilterPillsProps {
  filters: PropertySearchFilters;
  updateFilter: (key: string, value: string | null) => void;
  clearAllFilters: () => void;
  totalResults?: number;
}

export function ActiveFilterPills({
  filters,
  updateFilter,
  clearAllFilters,
  totalResults,
}: ActiveFilterPillsProps) {
  const pills: Pill[] = [];

  if (filters.purpose)
    pills.push({
      label: PURPOSE_LABELS[filters.purpose as Purpose],
      filterKey: "purpose",
      filterValue: null,
    });
  if (filters.propertyType)
    pills.push({
      label: PROPERTY_TYPE_LABELS[filters.propertyType as PropertyType],
      filterKey: "type",
      filterValue: null,
    });
  if (filters.propertySubType)
    pills.push({
      label: SUB_TYPE_LABELS[filters.propertySubType as PropertySubType],
      filterKey: "subtype",
      filterValue: null,
    });
  if (filters.state)
    pills.push({ label: filters.state, filterKey: "state", filterValue: null });
  if (filters.localityArea)
    pills.push({
      label: filters.localityArea,
      filterKey: "area",
      filterValue: null,
    });
  if (filters.bedrooms)
    pills.push({
      label: `${filters.bedrooms}+ Beds`,
      filterKey: "beds",
      filterValue: null,
    });
  if (filters.minPrice)
    pills.push({
      label: `From ${PRICE_MAP[filters.minPrice] ?? filters.minPrice}`,
      filterKey: "minPrice",
      filterValue: null,
    });
  if (filters.maxPrice)
    pills.push({
      label: `Up to ${PRICE_MAP[filters.maxPrice] ?? filters.maxPrice}`,
      filterKey: "maxPrice",
      filterValue: null,
    });
  if (filters.isServiced)
    pills.push({ label: "Serviced", filterKey: "serviced", filterValue: null });
  if (filters.hasBq)
    pills.push({ label: "Has BQ", filterKey: "bq", filterValue: null });

  if (pills.length === 0 && !filters.searchQuery) return null;

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {/* Result count */}
      {totalResults !== undefined && (
        <span className="text-[12px] font-semibold text-gray-500 mr-1 shrink-0">
          {totalResults.toLocaleString()}{" "}
          {totalResults === 1 ? "result" : "results"}
        </span>
      )}

      {/* Search query pill */}
      {filters.searchQuery && (
        <span className="flex items-center gap-1.5 pl-3 pr-2 py-1.5 rounded-full bg-[#0E292F]/8 border border-[#0E292F]/15 text-[11px] font-semibold text-[#0E292F]">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
            <circle
              cx="10.5"
              cy="10.5"
              r="7"
              stroke="currentColor"
              strokeWidth="2.2"
            />
            <path
              d="M21 21L15.8 15.8"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
          </svg>
          &ldquo;{filters.searchQuery}&rdquo;
          <button
            onClick={() => updateFilter("q", null)}
            className="ml-0.5 text-[#0E292F]/50 hover:text-[#0E292F] transition-colors"
          >
            <CloseSVG />
          </button>
        </span>
      )}

      {/* Filter pills */}
      {pills.map((pill) => (
        <button
          key={pill.filterKey}
          type="button"
          onClick={() => updateFilter(pill.filterKey, pill.filterValue)}
          className="flex items-center gap-1.5 pl-3 pr-2 py-1.5 rounded-full bg-[#3D7188]/10 border border-[#3D7188]/25 text-[11px] font-semibold text-[#0E292F] hover:bg-[#0E292F] hover:text-white hover:border-[#0E292F] transition-all duration-200 group"
        >
          {pill.label}
          <span className="text-[#3D7188] group-hover:text-white/70 transition-colors">
            <CloseSVG />
          </span>
        </button>
      ))}

      {/* Clear all */}
      {pills.length > 1 && (
        <button
          onClick={clearAllFilters}
          className="text-[11px] font-semibold text-gray-400 hover:text-red-500 transition-colors underline underline-offset-2 ml-1"
        >
          Clear all
        </button>
      )}
    </div>
  );
}
