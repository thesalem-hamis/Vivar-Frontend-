import { useState } from "react";
import {
  NIGERIAN_STATES,
  PURPOSE_LABELS,
  PROPERTY_TYPE_LABELS,
  SUB_TYPES_BY_TYPE,
  SUB_TYPE_LABELS,
  type Purpose,
  type PropertyType,
  type PropertySubType,
  type PropertySearchFilters,
} from "@/types/property.types";

// ── Inline SVGs (no lucide) ──────────────────────────────────────────────────
const CloseSVG = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
    <path
      d="M18 6L6 18M6 6l12 12"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
  </svg>
);
const ChevronSVG = ({ open }: { open: boolean }) => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    style={{
      transform: open ? "rotate(180deg)" : "none",
      transition: "transform .2s",
    }}
  >
    <path
      d="M6 9l6 6 6-6"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const ResetSVG = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
    <path
      d="M3 12a9 9 0 1018 0 9 9 0 00-18 0"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeDasharray="4 3"
    />
    <path
      d="M3 4v8h8"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// ── Accordion section ─────────────────────────────────────────────────────────
function Section({
  title,
  children,
  defaultOpen = true,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-gray-100 pb-5 mb-5 last:border-0 last:mb-0 last:pb-0">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center justify-between w-full mb-3 group"
      >
        <span className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#0E292F]">
          {title}
        </span>
        <span className="text-gray-400 group-hover:text-[#0E292F] transition-colors">
          <ChevronSVG open={open} />
        </span>
      </button>
      {open && <div>{children}</div>}
    </div>
  );
}

// ── Price range slider (visual, dual) ─────────────────────────────────────────
const PRICE_STEPS = [
  { label: "Any", value: "" },
  { label: "₦5M", value: "5000000" },
  { label: "₦10M", value: "10000000" },
  { label: "₦25M", value: "25000000" },
  { label: "₦50M", value: "50000000" },
  { label: "₦100M", value: "100000000" },
  { label: "₦200M", value: "200000000" },
  { label: "₦500M", value: "500000000" },
  { label: "₦1B+", value: "1000000000" },
];

// ── Main Sidebar ──────────────────────────────────────────────────────────────
interface FilterSidebarProps {
  filters: PropertySearchFilters;
  activeFilterCount: number;
  updateFilter: (key: string, value: string | null) => void;
  clearAllFilters: () => void;
  onClose?: () => void; // mobile drawer close
}

export function FilterSidebar({
  filters,
  activeFilterCount,
  updateFilter,
  clearAllFilters,
  onClose,
}: FilterSidebarProps) {
  // Sub-types available for the currently selected property type
  const subTypeOptions = filters.propertyType
    ? (SUB_TYPES_BY_TYPE[filters.propertyType as PropertyType] ?? [])
    : [];

  // Bedroom options
  const bedOptions = ["1", "2", "3", "4", "5", "6+"];

  // Amenity booleans
  const amenityToggles = [
    { key: "isServiced", label: "Serviced Property" },
    { key: "hasBq", label: "Has BQ (Boys' Quarters)" },
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 shrink-0">
        <div className="flex items-center gap-2">
          <h3 className="text-[14px] font-bold text-[#0E292F]">Filters</h3>
          {activeFilterCount > 0 && (
            <span className="text-[10px] font-bold bg-[#0E292F] text-white px-2 py-0.5 rounded-full">
              {activeFilterCount}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {activeFilterCount > 0 && (
            <button
              onClick={clearAllFilters}
              className="flex items-center gap-1 text-[11px] font-semibold text-[#3D7188] hover:text-[#0E292F] transition-colors"
            >
              <ResetSVG /> Reset all
            </button>
          )}
          {onClose && (
            <button
              onClick={onClose}
              className="lg:hidden flex items-center justify-center w-7 h-7 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-500 transition-colors"
            >
              <CloseSVG />
            </button>
          )}
        </div>
      </div>

      {/* Scrollable filters */}
      <div className="flex-1 overflow-y-auto pr-1 space-y-0">
        {/* Purpose */}
        <Section title="Listing Type">
          <div className="grid grid-cols-2 gap-1.5">
            {(Object.entries(PURPOSE_LABELS) as [Purpose, string][]).map(
              ([val, label]) => {
                const active = filters.purpose === val;
                return (
                  <button
                    key={val}
                    type="button"
                    onClick={() => updateFilter("purpose", active ? null : val)}
                    className={`px-3 py-2 rounded-xl text-[12px] font-semibold text-left transition-all duration-200 border
                    ${
                      active
                        ? "bg-[#0E292F] text-white border-[#0E292F]"
                        : "bg-gray-50 text-gray-600 border-gray-200 hover:border-[#0E292F]/40 hover:bg-[#0E292F]/5"
                    }`}
                  >
                    {label}
                  </button>
                );
              },
            )}
          </div>
        </Section>

        {/* Property type */}
        <Section title="Property Type">
          <div className="space-y-1">
            {(
              Object.entries(PROPERTY_TYPE_LABELS) as [PropertyType, string][]
            ).map(([val, label]) => {
              const active = filters.propertyType === val;
              return (
                <button
                  key={val}
                  type="button"
                  onClick={() => {
                    updateFilter("type", active ? null : val);
                    updateFilter("subtype", null);
                  }}
                  className={`flex items-center justify-between w-full px-3 py-2.5 rounded-xl text-[12px] font-semibold text-left transition-all duration-200
                    ${
                      active
                        ? "bg-[#0E292F] text-white"
                        : "text-gray-600 hover:bg-gray-50 hover:text-[#0E292F]"
                    }`}
                >
                  <span>{label}</span>
                  {active && (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M5 12l5 5L19 7"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </button>
              );
            })}
          </div>

          {/* Sub-type (conditional) */}
          {subTypeOptions.length > 0 && (
            <div className="mt-3 pt-3 border-t border-gray-100">
              <p className="text-[10px] font-bold tracking-wider text-gray-400 uppercase mb-2">
                Sub-type
              </p>
              <div className="space-y-1">
                {subTypeOptions.map((val) => {
                  const active = filters.propertySubType === val;
                  return (
                    <button
                      key={val}
                      type="button"
                      onClick={() =>
                        updateFilter("subtype", active ? null : val)
                      }
                      className={`flex items-center gap-2 w-full px-3 py-2 rounded-xl text-[11px] font-medium text-left transition-all
                        ${active ? "bg-[#3D7188]/15 text-[#0E292F] font-semibold" : "text-gray-500 hover:bg-gray-50 hover:text-[#0E292F]"}`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full shrink-0 ${active ? "bg-[#3D7188]" : "bg-gray-300"}`}
                      />
                      {SUB_TYPE_LABELS[val as PropertySubType]}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </Section>

        {/* Location */}
        <Section title="Location">
          <div className="space-y-2.5">
            <div>
              <label className="text-[10px] font-bold tracking-wider text-gray-400 uppercase mb-1 block">
                State
              </label>
              <div className="relative">
                <select
                  value={filters.state ?? ""}
                  onChange={(e) =>
                    updateFilter("state", e.target.value || null)
                  }
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-[12px] text-[#0E292F] outline-none appearance-none focus:border-[#0E292F] transition-colors pr-8"
                >
                  <option value="">All States</option>
                  {NIGERIAN_STATES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                >
                  <path
                    d="M6 9l6 6 6-6"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>
            <div>
              <label className="text-[10px] font-bold tracking-wider text-gray-400 uppercase mb-1 block">
                Area / Locality
              </label>
              <input
                type="text"
                value={filters.localityArea ?? ""}
                onChange={(e) => updateFilter("area", e.target.value || null)}
                placeholder="e.g. Ikoyi, Lekki Phase 1"
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-[12px] text-[#0E292F] placeholder:text-gray-300 outline-none focus:border-[#0E292F] transition-colors"
              />
            </div>
          </div>
        </Section>

        {/* Price */}
        <Section title="Price Range">
          <div className="space-y-2.5">
            <div>
              <label className="text-[10px] font-bold tracking-wider text-gray-400 uppercase mb-1 block">
                Min Price
              </label>
              <div className="relative">
                <select
                  value={filters.minPrice ?? ""}
                  onChange={(e) =>
                    updateFilter("minPrice", e.target.value || null)
                  }
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-[12px] text-[#0E292F] outline-none appearance-none focus:border-[#0E292F] transition-colors pr-8"
                >
                  {PRICE_STEPS.map((p) => (
                    <option key={p.value} value={p.value}>
                      {p.label}
                    </option>
                  ))}
                </select>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                >
                  <path
                    d="M6 9l6 6 6-6"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>
            <div>
              <label className="text-[10px] font-bold tracking-wider text-gray-400 uppercase mb-1 block">
                Max Price
              </label>
              <div className="relative">
                <select
                  value={filters.maxPrice ?? ""}
                  onChange={(e) =>
                    updateFilter("maxPrice", e.target.value || null)
                  }
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-[12px] text-[#0E292F] outline-none appearance-none focus:border-[#0E292F] transition-colors pr-8"
                >
                  {PRICE_STEPS.map((p) => (
                    <option key={p.value} value={p.value}>
                      {p.label}
                    </option>
                  ))}
                </select>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                >
                  <path
                    d="M6 9l6 6 6-6"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        </Section>

        {/* Bedrooms */}
        <Section title="Bedrooms">
          <div className="flex flex-wrap gap-1.5">
            {bedOptions.map((b) => {
              const val = b === "6+" ? "6" : b;
              const active = filters.bedrooms === val;
              return (
                <button
                  key={b}
                  type="button"
                  onClick={() => updateFilter("beds", active ? null : val)}
                  className={`w-10 h-10 rounded-xl text-[12px] font-bold border transition-all duration-200
                    ${
                      active
                        ? "bg-[#0E292F] text-white border-[#0E292F]"
                        : "bg-gray-50 text-gray-600 border-gray-200 hover:border-[#0E292F]/40"
                    }`}
                >
                  {b}
                </button>
              );
            })}
          </div>
        </Section>

        {/* Amenities */}
        <Section title="Amenities" defaultOpen={false}>
          <div className="space-y-2.5">
            {amenityToggles.map(({ key, label }) => {
              const active =
                key === "isServiced" ? filters.isServiced : filters.hasBq;
              return (
                <label
                  key={key}
                  className="flex items-center justify-between gap-3 cursor-pointer"
                >
                  <span className="text-[12px] font-medium text-gray-700">
                    {label}
                  </span>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={!!active}
                    onClick={() =>
                      updateFilter(
                        key === "isServiced" ? "serviced" : "bq",
                        active ? null : "true",
                      )
                    }
                    className={`relative w-10 h-[22px] rounded-full transition-colors duration-300 shrink-0
                      ${active ? "bg-[#0E292F]" : "bg-gray-200"}`}
                  >
                    <span
                      className={`absolute top-0.5 left-0.5 w-[18px] h-[18px] bg-white rounded-full shadow-sm transition-transform duration-300
                      ${active ? "translate-x-[18px]" : "translate-x-0"}`}
                    />
                  </button>
                </label>
              );
            })}
          </div>
        </Section>
      </div>
    </div>
  );
}
