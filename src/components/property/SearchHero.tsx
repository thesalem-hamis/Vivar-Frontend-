import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SearchSVG = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <circle cx="10.5" cy="10.5" r="7" stroke="currentColor" strokeWidth="2" />
    <path
      d="M21 21L15.8 15.8"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const CloseSVG = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
    <path
      d="M18 6L6 18M6 6l12 12"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
  </svg>
);

const PinSVG = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
    <path
      d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
      stroke="currentColor"
      strokeWidth="2"
    />
    <circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="2" />
  </svg>
);

const QUICK_SEARCHES = [
  { label: "Ikoyi Duplexes", q: "duplex", area: "Ikoyi", purpose: "FOR_SALE" },
  {
    label: "Lekki Apartments",
    q: "apartment",
    area: "Lekki",
    purpose: "FOR_RENT",
  },
  { label: "VI Short Lets", q: "", area: "Victoria Is", purpose: "SHORT_LET" },
  { label: "Banana Island", q: "", area: "Banana Island", purpose: "FOR_SALE" },
  { label: "Abuja Luxury", q: "luxury", area: "Maitama", purpose: "FOR_SALE" },
  {
    label: "Off-Plan Investments",
    q: "off-plan",
    area: "",
    purpose: "FOR_SALE",
  },
];

interface SearchBarProps {
  initialQuery?: string;
  onSearch: (query: string) => void;
  compact?: boolean;
}

export function SearchBar({
  initialQuery = "",
  onSearch,
  compact = false,
}: SearchBarProps) {
  const [value, setValue] = useState(initialQuery);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setValue(initialQuery);
  }, [initialQuery]);

  const submit = () => onSearch(value.trim());

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") submit();
  };

  if (compact) {
    return (
      <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-4 py-2.5 focus-within:border-[#0E292F] focus-within:ring-2 focus-within:ring-[#0E292F]/8 transition-all w-full max-w-md">
        <span className="text-gray-400 shrink-0">
          <SearchSVG />
        </span>
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Search by location, type, keyword…"
          className="flex-1 text-[13px] text-[#0E292F] placeholder:text-gray-300 outline-none bg-transparent"
        />
        {value && (
          <button
            onClick={() => {
              setValue("");
              onSearch("");
            }}
            className="text-gray-300 hover:text-gray-500 transition-colors"
          >
            <CloseSVG />
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Main search input */}
      <div className="relative bg-white rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
        <div className="flex items-center gap-0">
          {/* Search icon */}
          <div className="pl-5 pr-3 text-[#3D7188] shrink-0">
            <SearchSVG />
          </div>

          {/* Input */}
          <input
            ref={inputRef}
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Search by location, property type, or keyword…"
            className="flex-1 py-4 text-[15px] text-[#0E292F] placeholder:text-gray-400 outline-none bg-transparent"
          />

          {/* Clear */}
          {value && (
            <button
              onClick={() => {
                setValue("");
                onSearch("");
              }}
              className="px-3 text-gray-300 hover:text-gray-500 transition-colors shrink-0"
            >
              <CloseSVG />
            </button>
          )}

          {/* Divider */}
          <div className="w-px h-8 bg-gray-200 shrink-0" />

          {/* CTA button */}
          <button
            onClick={submit}
            className="flex items-center gap-2 m-1.5 px-6 py-3 rounded-xl bg-[#0E292F] text-white text-[13px] font-bold hover:bg-[#1D3F48] active:scale-95 transition-all shrink-0"
          >
            <SearchSVG />
            <span className="hidden sm:inline">Search</span>
          </button>
        </div>
      </div>

      {/* Quick search tags */}
      <div className="flex flex-wrap items-center gap-2 mt-3">
        <span className="flex items-center gap-1 text-[11px] text-white/70 shrink-0">
          <PinSVG /> Popular:
        </span>
        {QUICK_SEARCHES.map((qs) => (
          <button
            key={qs.label}
            onClick={() => {
              setValue(qs.q);
              onSearch(qs.q);
            }}
            className="text-[11px] font-semibold text-white/80 bg-white/10 hover:bg-white/20 border border-white/15 px-3 py-1.5 rounded-full transition-all hover:text-white"
          >
            {qs.label}
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Hero wrapper (search page hero section) ──────────────────────────────────
interface SearchHeroProps {
  initialQuery?: string;
  onSearch: (query: string) => void;
  totalProperties?: number;
}

export function SearchHero({
  initialQuery,
  onSearch,
  totalProperties,
}: SearchHeroProps) {
  return (
    <div className="relative bg-[#0E292F] py-14 md:py-20 px-6 overflow-hidden">
      {/* Background texture */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      {/* Ambient glow */}
      <div className="absolute -top-1/2 -right-1/4 w-[600px] h-[600px] rounded-full bg-[#3D7188]/15 blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-1/3 -left-1/4 w-[400px] h-[400px] rounded-full bg-[#D4E9B9]/5 blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto">
        <p className="text-[11px] font-bold tracking-[0.25em] text-[#3D7188] uppercase mb-3 text-center">
          Property Search
        </p>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-normal text-white text-center tracking-tight leading-[1.1] mb-3">
          Find Your{" "}
          <span className="italic font-serif text-white/70">
            Perfect Property
          </span>
        </h1>
        {totalProperties !== undefined && (
          <p className="text-center text-white/50 text-sm mb-8">
            Searching across{" "}
            <span className="text-white/80 font-semibold">
              {totalProperties.toLocaleString()} verified listings
            </span>
          </p>
        )}
        <SearchBar initialQuery={initialQuery} onSearch={onSearch} />
      </div>
    </div>
  );
}
