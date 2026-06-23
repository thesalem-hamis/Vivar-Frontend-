interface PreviewData {
  title?: string;
  description?: string;
  propertyType?: string;
  propertySubType?: string;
  purpose?: string;
  price?: string;
  currency?: string;
  paymentPeriod?: string;
  bedrooms?: string;
  bathrooms?: string;
  floorAreaSqm?: string;
  localityArea?: string;
  state?: string;
  isServiced?: boolean;
  hasBq?: boolean;
  isFeatured?: boolean;
  images?: string[];
}

const PERIOD_LABELS: Record<string, string> = {
  PER_ANNUM: "/yr",
  PER_MONTH: "/mo",
  PER_NIGHT: "/night",
  OUTRIGHT: "",
};

const PURPOSE_COLORS: Record<string, string> = {
  FOR_SALE: "bg-[#0E292F] text-white",
  FOR_RENT: "bg-[#3D7188] text-white",
  SHORT_LET: "bg-amber-700 text-white",
  JOINT_VENTURE: "bg-violet-800 text-white",
};

const PURPOSE_LABELS: Record<string, string> = {
  FOR_SALE: "For Sale",
  FOR_RENT: "For Rent",
  SHORT_LET: "Short Let",
  JOINT_VENTURE: "Joint Venture",
};

const SUB_TYPE_MAP: Record<string, string> = {
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

function formatDisplayPrice(
  price: string,
  currency: string,
  period: string,
): string {
  const n = Number(price);
  if (!n) return "Price on request";
  const sym = currency === "NGN" ? "₦" : "$";
  let formatted: string;
  if (n >= 1_000_000_000)
    formatted = `${sym}${(n / 1_000_000_000).toFixed(1)}B`;
  else if (n >= 1_000_000) formatted = `${sym}${(n / 1_000_000).toFixed(0)}M`;
  else formatted = `${sym}${n.toLocaleString()}`;
  return `${formatted}${PERIOD_LABELS[period] ?? ""}`;
}

export function PropertyPreview({ data }: { data: PreviewData }) {
  const coverImage = data.images?.[0];
  const hasLocation = data.localityArea || data.state;
  const hasPrice = data.price && data.price !== "0";

  return (
    <aside className="sticky top-6 flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-[12px] font-bold tracking-[0.1em] uppercase text-gray-400">
          Live Preview
        </h3>
        <span className="text-[10px] font-semibold text-[#3D7188] bg-[#3D7188]/10 px-2 py-0.5 rounded-full">
          Updates as you type
        </span>
      </div>

      {/* Card mock */}
      <div className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
        {/* Image */}
        <div className="relative aspect-[16/10] bg-gray-100 overflow-hidden">
          {coverImage ? (
            <img
              src={coverImage}
              alt=""
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center gap-2">
              {/* placeholder SVG */}
              <svg
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                className="text-gray-300"
              >
                <rect
                  x="2"
                  y="2"
                  width="20"
                  height="20"
                  rx="3"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <circle
                  cx="8"
                  cy="8"
                  r="2"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <path
                  d="M2 15l5-4 4 4 3-3 8 7"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
              <span className="text-[11px] text-gray-400">No image yet</span>
            </div>
          )}

          {/* Purpose badge */}
          {data.purpose && (
            <span
              className={`absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${PURPOSE_COLORS[data.purpose] ?? "bg-gray-800 text-white"}`}
            >
              {PURPOSE_LABELS[data.purpose] ?? data.purpose}
            </span>
          )}
          {data.isFeatured && (
            <span className="absolute top-3 right-3 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full bg-[#D4E9B9] text-[#0E292F]">
              ✦ Featured
            </span>
          )}
        </div>

        {/* Body */}
        <div className="p-4 space-y-3">
          {/* Title */}
          <div>
            <h4 className="text-[14px] font-bold text-[#0E292F] leading-snug line-clamp-2 min-h-[2.5rem]">
              {data.title || (
                <span className="text-gray-300 font-normal italic">
                  Property title will appear here
                </span>
              )}
            </h4>
            {data.propertySubType && (
              <p className="text-[11px] text-gray-400 mt-0.5">
                {SUB_TYPE_MAP[data.propertySubType] ?? data.propertySubType}
              </p>
            )}
          </div>

          {/* Location */}
          {hasLocation && (
            <div className="flex items-center gap-1.5">
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                className="text-[#3D7188] shrink-0"
              >
                <path
                  d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <circle
                  cx="12"
                  cy="9"
                  r="2.5"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
              <span className="text-[11px] text-gray-500">
                {[data.localityArea, data.state].filter(Boolean).join(", ")}
              </span>
            </div>
          )}

          {/* Chips */}
          <div className="flex flex-wrap items-center gap-2">
            {data.bedrooms && (
              <span className="text-[11px] text-gray-600 flex items-center gap-1">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M3 20v-8m0 0h18v8M3 12V8a2 2 0 012-2h14a2 2 0 012 2v4"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M3 16h18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
                {data.bedrooms} Beds
              </span>
            )}
            {data.bathrooms && (
              <span className="text-[11px] text-gray-600 flex items-center gap-1">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M4 12h16v2.5A5.5 5.5 0 0114.5 20h-5A5.5 5.5 0 014 14.5V12z"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
                {data.bathrooms} Baths
              </span>
            )}
            {data.floorAreaSqm && (
              <span className="text-[11px] text-gray-600">
                {data.floorAreaSqm} m²
              </span>
            )}
            {data.isServiced && (
              <span className="text-[10px] font-bold tracking-wider text-[#3D7188] bg-[#3D7188]/10 px-1.5 py-0.5 rounded-full uppercase">
                Serviced
              </span>
            )}
            {data.hasBq && (
              <span className="text-[10px] font-bold tracking-wider text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded-full uppercase">
                BQ
              </span>
            )}
          </div>

          {/* Description */}
          {data.description && (
            <p className="text-[11px] text-gray-400 leading-relaxed line-clamp-2">
              {data.description}
            </p>
          )}

          {/* Price */}
          <div className="pt-3 border-t border-gray-100">
            <p className="text-[20px] font-bold text-[#0E292F] leading-none font-serif">
              {hasPrice ? (
                formatDisplayPrice(
                  data.price!,
                  data.currency ?? "NGN",
                  data.paymentPeriod ?? "OUTRIGHT",
                )
              ) : (
                <span className="text-gray-300 text-[14px] font-normal italic">
                  Price not set
                </span>
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Completeness indicator */}
      <CompletionMeter data={data} />
    </aside>
  );
}

function CompletionMeter({ data }: { data: PreviewData }) {
  const fields = [
    { label: "Title", done: !!data.title },
    { label: "Type", done: !!data.propertyType },
    { label: "Purpose", done: !!data.purpose },
    { label: "Location", done: !!(data.localityArea && data.state) },
    { label: "Price", done: !!(data.price && data.price !== "0") },
    { label: "Bedrooms", done: !!data.bedrooms },
    { label: "Image", done: (data.images?.length ?? 0) > 0 },
    { label: "Description", done: (data.description?.length ?? 0) > 20 },
  ];

  const pct = Math.round(
    (fields.filter((f) => f.done).length / fields.length) * 100,
  );

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-4">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-[12px] font-bold text-[#0E292F]">
          Listing Completeness
        </h4>
        <span
          className={`text-[13px] font-bold ${pct === 100 ? "text-[#3D7188]" : "text-gray-500"}`}
        >
          {pct}%
        </span>
      </div>
      {/* Track */}
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden mb-3">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${pct}%`,
            background: pct === 100 ? "#3D7188" : "#0E292F",
          }}
        />
      </div>
      {/* Fields */}
      <div className="grid grid-cols-2 gap-1.5">
        {fields.map((f) => (
          <div key={f.label} className="flex items-center gap-1.5">
            <span
              className={`w-3.5 h-3.5 rounded-full flex items-center justify-center shrink-0 ${f.done ? "bg-[#0E292F]" : "bg-gray-100"}`}
            >
              {f.done && (
                <svg width="8" height="8" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M5 12l5 5L19 7"
                    stroke="white"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </span>
            <span
              className={`text-[10px] font-medium ${f.done ? "text-[#0E292F]" : "text-gray-400"}`}
            >
              {f.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
