import { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import {
  propertyApi,
  formatPrice,
  formatNaira,
} from "@/lib/api/services/property.api";
import type { Property } from "../../types/property.types";
import {
  PURPOSE_LABELS,
  SUB_TYPE_LABELS,
  PROPERTY_TYPE_LABELS,
} from "../../types/property.types";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { PropertyCard } from "@/components/property/PropertiesCard";

// ── Inline SVGs (zero lucide-react) ──────────────────────────────────────────
const BedSVG = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path
      d="M3 20v-8m0 0h18v8M3 12V8a2 2 0 012-2h14a2 2 0 012 2v4"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <rect
      x="6.5"
      y="10"
      width="4"
      height="2.5"
      rx="0.75"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <rect
      x="13.5"
      y="10"
      width="4"
      height="2.5"
      rx="0.75"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <path
      d="M3 16h18"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
    />
  </svg>
);
const BathSVG = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path
      d="M4 12h16v2.5A5.5 5.5 0 0114.5 20h-5A5.5 5.5 0 014 14.5V12z"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinejoin="round"
    />
    <path
      d="M4 12V8a2 2 0 014 0v4M7.5 20.5v1.5M16.5 20.5v1.5"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
    />
  </svg>
);
const AreaSVG = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <rect
      x="3"
      y="3"
      width="18"
      height="18"
      rx="2"
      stroke="currentColor"
      strokeWidth="1.75"
    />
    <path
      d="M3 8h2M3 13h2M8 3v2M13 3v2"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
    />
  </svg>
);
const PinSVG = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path
      d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
      stroke="currentColor"
      strokeWidth="1.75"
    />
    <circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.75" />
  </svg>
);
const VerifiedSVG = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path
      d="M12 2.5L4 6v6c0 5.5 3.4 9.3 8 10.5 4.6-1.2 8-5 8-10.5V6L12 2.5z"
      fill="#0E292F"
      fillOpacity="0.1"
      stroke="#0E292F"
      strokeWidth="1.75"
      strokeLinejoin="round"
    />
    <path
      d="M8.5 12l2.5 2.5 5-5"
      stroke="#0E292F"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const HeartSVG = ({ filled }: { filled: boolean }) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill={filled ? "currentColor" : "none"}
  >
    <path
      d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
      stroke="currentColor"
      strokeWidth="1.75"
    />
  </svg>
);
const ShareSVG = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <circle cx="18" cy="5" r="3" stroke="currentColor" strokeWidth="1.75" />
    <circle cx="6" cy="12" r="3" stroke="currentColor" strokeWidth="1.75" />
    <circle cx="18" cy="19" r="3" stroke="currentColor" strokeWidth="1.75" />
    <path
      d="M8.59 13.51l6.83 3.98M15.41 6.51L8.59 10.49"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
    />
  </svg>
);
const ArrowSVG = ({ dir }: { dir: "left" | "right" }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path
      d={dir === "left" ? "M15 18l-6-6 6-6" : "M9 18l6-6-6-6"}
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const CheckSVG = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
    <path
      d="M5 12l5 5L19 7"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const EyeSVG = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
    <path
      d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z"
      stroke="currentColor"
      strokeWidth="1.75"
    />
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.75" />
  </svg>
);
const SpinnerSVG = () => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    className="animate-spin"
  >
    <circle
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="3"
      strokeOpacity="0.2"
    />
    <path
      d="M12 2a10 10 0 0110 10"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
    />
  </svg>
);

// ── Image pool (same as PropertyCard) ─────────────────────────────────────────
const TYPE_IMAGES: Record<string, string[]> = {
  HOUSE: [
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?q=80&w=1400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1400&auto=format&fit=crop",
  ],
  FLAT_APARTMENT: [
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600210492486-715a3ca7b5cb?q=80&w=1400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1571055107559-3e67626fa8be?q=80&w=1400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1400&auto=format&fit=crop",
  ],
  COMMERCIAL: [
    "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1400&auto=format&fit=crop",
  ],
  LAND: [
    "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=1400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=1400&auto=format&fit=crop",
  ],
  EVENT_CENTRE: [
    "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=1400&auto=format&fit=crop",
  ],
};

function getImages(p: Property): string[] {
  const pool = TYPE_IMAGES[p.propertyType] ?? TYPE_IMAGES.HOUSE;
  const seed = parseInt(p.id.replace(/\D/g, "").slice(-2) || "0", 10);
  // Return 4-5 images rotated from pool
  return [0, 1, 2, 3].map((i) => pool[(seed + i) % pool.length]);
}

// ── Amenity label map ─────────────────────────────────────────────────────────
const AMENITY_LABELS: Record<string, string> = {
  SWIMMING_POOL: "Swimming Pool",
  GATED_ESTATE: "Gated Estate",
  UNIFORMED_SECURITY: "24/7 Security",
  FITTED_KITCHEN: "Fitted Kitchen",
  CCTV: "CCTV Surveillance",
  AMPLE_PARKING: "Ample Parking",
  WATER_TREATMENT_PLANT: "Water Treatment",
};

const POWER_LABELS: Record<string, string> = {
  TWENTY_FOUR_HOURS: "24-Hour Power",
  TWELVE_HOURS: "12-Hour Power",
  SOLAR_INVERTER: "Solar / Inverter Backup",
  PUBLIC_POWER_ONLY: "Public Grid Only",
};

const FURNISH_LABELS: Record<string, string> = {
  FURNISHED: "Fully Furnished",
  SEMI_FURNISHED: "Semi-Furnished",
  UNFURNISHED: "Unfurnished",
};

const CONDITION_LABELS: Record<string, string> = {
  BRAND_NEW: "Brand New",
  NEWLY_BUILT: "Newly Built",
  RENOVATED: "Recently Renovated",
  FAIR_CONDITION: "Fair Condition",
};

const PURPOSE_BADGE: Record<string, string> = {
  FOR_SALE: "bg-[#0E292F] text-white",
  FOR_RENT: "bg-[#3D7188] text-white",
  SHORT_LET: "bg-amber-800 text-white",
  JOINT_VENTURE: "bg-violet-800 text-white",
};

// ── Image Gallery ─────────────────────────────────────────────────────────────
function Gallery({ images }: { images: string[] }) {
  const [current, setCurrent] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  const prev = () => setCurrent((c) => (c - 1 + images.length) % images.length);
  const next = () => setCurrent((c) => (c + 1) % images.length);

  useEffect(() => {
    if (!lightbox) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
      if (e.key === "Escape") setLightbox(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightbox]);

  return (
    <>
      <div className="grid grid-cols-4 grid-rows-2 gap-2 rounded-2xl overflow-hidden h-[420px] md:h-[500px]">
        {/* Main image */}
        <div
          className="col-span-4 md:col-span-3 row-span-2 relative group cursor-pointer"
          onClick={() => setLightbox(true)}
        >
          <img
            src={images[current]}
            alt=""
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          {/* Arrows on main */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm text-white flex items-center justify-center hover:bg-black/50 transition-colors opacity-0 group-hover:opacity-100"
          >
            <ArrowSVG dir="left" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm text-white flex items-center justify-center hover:bg-black/50 transition-colors opacity-0 group-hover:opacity-100"
          >
            <ArrowSVG dir="right" />
          </button>
          {/* Counter */}
          <div className="absolute bottom-3 right-3 bg-black/40 backdrop-blur-sm text-white text-[11px] font-bold px-2.5 py-1 rounded-full">
            {current + 1} / {images.length}
          </div>
        </div>

        {/* Thumbnails */}
        {images.slice(0, 2).map((img, i) => (
          <div
            key={i}
            className={`hidden md:block col-span-1 row-span-1 relative cursor-pointer group overflow-hidden ${i === 1 ? "relative" : ""}`}
            onClick={() => {
              setCurrent(i + 1);
              setLightbox(false);
            }}
          >
            <img
              src={images[(current + i + 1) % images.length]}
              alt=""
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {i === 1 && images.length > 3 && (
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  setLightbox(true);
                }}
                className="absolute inset-0 bg-black/50 flex items-center justify-center cursor-pointer"
              >
                <span className="text-white font-bold text-[15px]">
                  +{images.length - 3} more
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Thumbnail strip */}
      <div className="flex gap-2 mt-2 overflow-x-auto pb-1">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-16 h-12 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${current === i ? "border-[#0E292F]" : "border-transparent opacity-60 hover:opacity-100"}`}
          >
            <img src={img} alt="" className="w-full h-full object-cover" />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={() => setLightbox(false)}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors z-10"
          >
            <ArrowSVG dir="left" />
          </button>
          <img
            src={images[current]}
            alt=""
            className="max-w-[90vw] max-h-[90vh] object-contain rounded-xl"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors z-10"
          >
            <ArrowSVG dir="right" />
          </button>
          <button
            onClick={() => setLightbox(false)}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 text-white text-xl flex items-center justify-center hover:bg-white/20 transition-colors z-10"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path
                d="M18 6L6 18M6 6l12 12"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
          <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/50 text-[12px]">
            {current + 1} / {images.length}
          </p>
        </div>
      )}
    </>
  );
}

// ── Enquiry Form ──────────────────────────────────────────────────────────────
function EnquiryForm({ propertyTitle }: { propertyTitle: string }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: `I'm interested in "${propertyTitle}". Please get in touch.`,
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800)); // Demo delay
    setSubmitted(true);
    setLoading(false);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center gap-3">
        <div className="w-14 h-14 rounded-full bg-[#D4E9B9] flex items-center justify-center">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M5 12l5 5L19 7"
              stroke="#0E292F"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h4 className="text-[15px] font-bold text-[#0E292F]">Enquiry Sent!</h4>
        <p className="text-[13px] text-gray-400 max-w-xs">
          A Vivar advisor will reach out within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      <input
        required
        value={form.name}
        onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
        placeholder="Full Name"
        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-[13px] text-[#0E292F] placeholder:text-gray-300 outline-none focus:border-[#0E292F] focus:bg-white transition-all"
      />
      <input
        required
        type="email"
        value={form.email}
        onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
        placeholder="Email Address"
        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-[13px] text-[#0E292F] placeholder:text-gray-300 outline-none focus:border-[#0E292F] focus:bg-white transition-all"
      />
      <input
        value={form.phone}
        onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
        placeholder="Phone Number"
        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-[13px] text-[#0E292F] placeholder:text-gray-300 outline-none focus:border-[#0E292F] focus:bg-white transition-all"
      />
      <textarea
        value={form.message}
        onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
        rows={3}
        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-[13px] text-[#0E292F] placeholder:text-gray-300 outline-none focus:border-[#0E292F] focus:bg-white transition-all resize-none"
      />
      <button
        type="submit"
        disabled={loading}
        className="w-full py-3.5 rounded-xl bg-[#0E292F] text-white text-[13px] font-bold hover:bg-[#1D3F48] transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <SpinnerSVG /> Sending…
          </>
        ) : (
          "Send Enquiry"
        )}
      </button>
      <p className="text-[10px] text-gray-400 text-center">
        No spam. We'll only contact you about this property.
      </p>
    </form>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function PropertyDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const [property, setProperty] = useState<Property | null>(null);
  const [similar, setSimilar] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [liked, setLiked] = useState(false);
  const [copied, setCopied] = useState(false);
  const stickyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const load = async () => {
      setLoading(true);
      try {
        const [prop, featured] = await Promise.all([
          propertyApi.getById(id!),
          propertyApi.getFeatured(),
        ]);
        setProperty(prop);
        setSimilar(featured.filter((f: Property) => f.id !== id).slice(0, 3));
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  // ── Loading ──────────────────────────────────────────────────────────────
  if (loading)
    return (
      <div className="min-h-screen bg-[#f4f6f8] flex flex-col">
        <div className="bg-[#0E292F]">
          <Navbar />
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <SpinnerSVG />
            <p className="text-[13px] text-gray-400">Loading property…</p>
          </div>
        </div>
      </div>
    );

  // ── Error ─────────────────────────────────────────────────────────────────
  if (error || !property)
    return (
      <div className="min-h-screen bg-[#f4f6f8] flex flex-col">
        <div className="bg-[#0E292F]">
          <Navbar />
        </div>
        <div className="flex-1 flex items-center justify-center flex-col gap-4 px-6 text-center">
          <p className="text-[18px] font-bold text-[#0E292F]">
            Property not found
          </p>
          <p className="text-[13px] text-gray-400">
            It may have been removed or the link is incorrect.
          </p>
          <Link
            to="/properties"
            className="px-6 py-3 rounded-xl bg-[#0E292F] text-white text-[13px] font-semibold hover:bg-[#1D3F48] transition-colors"
          >
            Browse All Properties
          </Link>
        </div>
      </div>
    );

  const images = getImages(property);
  const loc = property.location;
  const price = property.pricing;
  const amen = property.amenities;

  return (
    <div className="min-h-screen bg-[#f4f6f8] flex flex-col font-sans">
      {/* Navbar */}
      <div className="bg-[#0E292F]">
        <Navbar />
      </div>

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-2 text-[12px] text-gray-400">
          <Link to="/" className="hover:text-[#0E292F] transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link
            to="/properties"
            className="hover:text-[#0E292F] transition-colors"
          >
            Properties
          </Link>
          <span>/</span>
          <span className="text-[#0E292F] font-semibold truncate max-w-[200px] sm:max-w-none">
            {property.title}
          </span>
        </div>
      </div>

      <div className="flex-1 max-w-[1280px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-12 gap-8">
          {/* ── LEFT / MAIN ── */}
          <div className="col-span-12 lg:col-span-8 space-y-6">
            {/* Gallery */}
            <Gallery images={images} />

            {/* Title + Meta */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8">
              <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    {property.purpose && (
                      <span
                        className={`text-[10px] font-bold tracking-[0.15em] uppercase px-3 py-1 rounded-full ${PURPOSE_BADGE[property.purpose] ?? "bg-gray-800 text-white"}`}
                      >
                        {PURPOSE_LABELS[property.purpose]}
                      </span>
                    )}
                    {property.isFeatured && (
                      <span className="text-[10px] font-bold tracking-[0.15em] uppercase px-3 py-1 rounded-full bg-[#D4E9B9] text-[#0E292F]">
                        ✦ Featured
                      </span>
                    )}
                    {property.isVerified && (
                      <span className="flex items-center gap-1.5 text-[10px] font-bold tracking-[0.15em] uppercase text-[#0E292F]">
                        <VerifiedSVG /> Verified
                      </span>
                    )}
                  </div>

                  <h1 className="text-2xl sm:text-3xl font-bold text-[#0E292F] tracking-tight leading-snug">
                    {property.title}
                  </h1>

                  {loc && (
                    <div className="flex items-center gap-1.5 mt-2 text-[13px] text-gray-500">
                      <PinSVG />
                      {[loc.estateName, loc.localityArea, loc.state]
                        .filter(Boolean)
                        .join(", ")}
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => setLiked(!liked)}
                    className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl border text-[12px] font-semibold transition-all
                      ${liked ? "bg-red-50 border-red-200 text-red-500" : "border-gray-200 text-gray-500 hover:bg-gray-50"}`}
                  >
                    <HeartSVG filled={liked} />
                    <span className="hidden sm:inline">
                      {liked ? "Saved" : "Save"}
                    </span>
                  </button>
                  <button
                    onClick={handleShare}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-gray-200 text-gray-500 text-[12px] font-semibold hover:bg-gray-50 transition-colors"
                  >
                    <ShareSVG />
                    <span className="hidden sm:inline">
                      {copied ? "Copied!" : "Share"}
                    </span>
                  </button>
                </div>
              </div>

              {/* Key stats strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-5 border-y border-gray-100">
                {property.bedrooms != null && (
                  <div className="flex flex-col items-center gap-2 text-center">
                    <div className="w-10 h-10 rounded-xl bg-[#0E292F]/5 flex items-center justify-center text-[#0E292F]">
                      <BedSVG />
                    </div>
                    <div>
                      <p className="text-[18px] font-bold text-[#0E292F] leading-none">
                        {property.bedrooms}
                      </p>
                      <p className="text-[11px] text-gray-400 mt-0.5">
                        Bedrooms
                      </p>
                    </div>
                  </div>
                )}
                {property.bathrooms != null && (
                  <div className="flex flex-col items-center gap-2 text-center">
                    <div className="w-10 h-10 rounded-xl bg-[#0E292F]/5 flex items-center justify-center text-[#0E292F]">
                      <BathSVG />
                    </div>
                    <div>
                      <p className="text-[18px] font-bold text-[#0E292F] leading-none">
                        {property.bathrooms}
                      </p>
                      <p className="text-[11px] text-gray-400 mt-0.5">
                        Bathrooms
                      </p>
                    </div>
                  </div>
                )}
                {property.floorAreaSqm != null && (
                  <div className="flex flex-col items-center gap-2 text-center">
                    <div className="w-10 h-10 rounded-xl bg-[#0E292F]/5 flex items-center justify-center text-[#0E292F]">
                      <AreaSVG />
                    </div>
                    <div>
                      <p className="text-[18px] font-bold text-[#0E292F] leading-none">
                        {Number(property.floorAreaSqm).toFixed(0)}
                      </p>
                      <p className="text-[11px] text-gray-400 mt-0.5">
                        m² Floor Area
                      </p>
                    </div>
                  </div>
                )}
                {property.viewsCount > 0 && (
                  <div className="flex flex-col items-center gap-2 text-center">
                    <div className="w-10 h-10 rounded-xl bg-[#0E292F]/5 flex items-center justify-center text-[#0E292F]">
                      <EyeSVG />
                    </div>
                    <div>
                      <p className="text-[18px] font-bold text-[#0E292F] leading-none">
                        {property.viewsCount}
                      </p>
                      <p className="text-[11px] text-gray-400 mt-0.5">Views</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Description */}
              {property.description && (
                <div className="mt-6">
                  <h2 className="text-[14px] font-bold text-[#0E292F] mb-3">
                    About This Property
                  </h2>
                  <p className="text-[14px] text-gray-600 leading-[1.8] whitespace-pre-line">
                    {property.description}
                  </p>
                </div>
              )}
            </div>

            {/* Property Details Grid */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8">
              <h2 className="text-[14px] font-bold text-[#0E292F] mb-5">
                Property Details
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-5 gap-x-4">
                {[
                  {
                    label: "Property Type",
                    value: PROPERTY_TYPE_LABELS[property.propertyType],
                  },
                  {
                    label: "Sub-Type",
                    value: SUB_TYPE_LABELS[property.propertySubType],
                  },
                  { label: "Purpose", value: PURPOSE_LABELS[property.purpose] },
                  {
                    label: "Condition",
                    value: property.condition
                      ? CONDITION_LABELS[property.condition]
                      : null,
                  },
                  {
                    label: "Furnishing",
                    value: property.furnishingStatus
                      ? FURNISH_LABELS[property.furnishingStatus]
                      : null,
                  },
                  { label: "State", value: loc?.state },
                  { label: "LGA", value: loc?.lga },
                  { label: "Locality", value: loc?.localityArea },
                  { label: "Estate", value: loc?.estateName },
                  {
                    label: "Power Supply",
                    value: amen?.powerSupply
                      ? POWER_LABELS[amen.powerSupply]
                      : null,
                  },
                  {
                    label: "Serviced",
                    value: amen ? (amen.isServiced ? "Yes" : "No") : null,
                  },
                  {
                    label: "BQ",
                    value: amen
                      ? amen.hasBq
                        ? "Included"
                        : "Not included"
                      : null,
                  },
                ]
                  .filter((r) => r.value)
                  .map((row) => (
                    <div key={row.label}>
                      <p className="text-[10px] font-bold tracking-[0.12em] text-gray-400 uppercase mb-0.5">
                        {row.label}
                      </p>
                      <p className="text-[13px] font-semibold text-[#0E292F]">
                        {row.value}
                      </p>
                    </div>
                  ))}
              </div>
            </div>

            {/* Amenities */}
            {amen && amen.amenityList.length > 0 && (
              <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8">
                <h2 className="text-[14px] font-bold text-[#0E292F] mb-5">
                  Amenities & Features
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {amen.amenityList.map((a) => (
                    <div
                      key={a}
                      className="flex items-center gap-2.5 bg-[#0E292F]/[0.03] border border-[#0E292F]/8 rounded-xl px-4 py-3"
                    >
                      <span className="text-[#3D7188] shrink-0">
                        <CheckSVG />
                      </span>
                      <span className="text-[12px] font-semibold text-[#0E292F]">
                        {AMENITY_LABELS[a] ?? a}
                      </span>
                    </div>
                  ))}
                  {amen.isServiced && (
                    <div className="flex items-center gap-2.5 bg-[#3D7188]/8 border border-[#3D7188]/20 rounded-xl px-4 py-3">
                      <span className="text-[#3D7188] shrink-0">
                        <CheckSVG />
                      </span>
                      <span className="text-[12px] font-semibold text-[#0E292F]">
                        Fully Serviced
                      </span>
                    </div>
                  )}
                  {amen.hasBq && (
                    <div className="flex items-center gap-2.5 bg-[#0E292F]/[0.03] border border-[#0E292F]/8 rounded-xl px-4 py-3">
                      <span className="text-[#3D7188] shrink-0">
                        <CheckSVG />
                      </span>
                      <span className="text-[12px] font-semibold text-[#0E292F]">
                        BQ Included
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Location Map placeholder */}
            {loc?.latitude && loc?.longitude && (
              <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8">
                <h2 className="text-[14px] font-bold text-[#0E292F] mb-4">
                  Location
                </h2>
                <div className="aspect-[16/6] rounded-xl bg-[#0E292F]/5 border border-[#0E292F]/10 flex items-center justify-center overflow-hidden">
                  {/* Map embed placeholder — swap for actual Google Maps or Leaflet */}
                  <div className="flex flex-col items-center gap-2 text-[#0E292F]/30">
                    <PinSVG />
                    <p className="text-[12px] font-medium">
                      {loc.localityArea}, {loc.state}
                    </p>
                    <p className="text-[10px]">
                      {loc.latitude?.toFixed(4)}, {loc.longitude?.toFixed(4)}
                    </p>
                  </div>
                </div>
                {loc.streetAddress && (
                  <p className="text-[12px] text-gray-400 mt-3 flex items-center gap-1.5">
                    <PinSVG />{" "}
                    <span className="text-gray-500 font-medium">
                      {loc.streetAddress}
                    </span>
                  </p>
                )}
              </div>
            )}

            {/* Similar Properties */}
            {similar.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-[18px] font-bold text-[#0E292F]">
                    Similar Properties
                  </h2>
                  <Link
                    to="/properties"
                    className="text-[12px] font-semibold text-[#3D7188] hover:text-[#0E292F] transition-colors"
                  >
                    View all →
                  </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {similar.map((p) => (
                    <PropertyCard key={p.id} property={p} layout="grid" />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ── RIGHT SIDEBAR ── */}
          <div className="col-span-12 lg:col-span-4" ref={stickyRef}>
            <div className="space-y-4 lg:sticky lg:top-6">
              {/* Price card */}
              <div className="bg-[#0E292F] rounded-2xl p-6 text-white">
                <p className="text-[11px] font-bold tracking-[0.15em] text-white/50 uppercase mb-1">
                  {PURPOSE_LABELS[property.purpose]} Price
                </p>
                <p className="text-[32px] font-bold leading-none tracking-tight font-serif mb-1">
                  {formatPrice(price)}
                </p>
                {price?.paymentPeriod && price.paymentPeriod !== "OUTRIGHT" && (
                  <p className="text-[11px] text-white/50">
                    {price.paymentPeriod === "PER_ANNUM"
                      ? "Per annum"
                      : price.paymentPeriod === "PER_MONTH"
                        ? "Per month"
                        : "Per night"}
                  </p>
                )}

                {/* Fee breakdown */}
                {price &&
                  (Number(price.serviceCharge) > 0 ||
                    Number(price.agencyFeePercentage) > 0 ||
                    Number(price.legalFeePercentage) > 0 ||
                    Number(price.cautionFee) > 0) && (
                    <div className="mt-4 pt-4 border-t border-white/10 space-y-2">
                      <p className="text-[10px] font-bold tracking-wider text-white/40 uppercase">
                        Additional Fees
                      </p>
                      {Number(price.serviceCharge) > 0 && (
                        <div className="flex justify-between text-[12px]">
                          <span className="text-white/60">Service Charge</span>
                          <span className="text-white font-semibold">
                            {formatNaira(price.serviceCharge!)}
                          </span>
                        </div>
                      )}
                      {Number(price.agencyFeePercentage) > 0 && (
                        <div className="flex justify-between text-[12px]">
                          <span className="text-white/60">Agency Fee</span>
                          <span className="text-white font-semibold">
                            {Number(price.agencyFeePercentage)}%
                          </span>
                        </div>
                      )}
                      {Number(price.legalFeePercentage) > 0 && (
                        <div className="flex justify-between text-[12px]">
                          <span className="text-white/60">Legal Fee</span>
                          <span className="text-white font-semibold">
                            {Number(price.legalFeePercentage)}%
                          </span>
                        </div>
                      )}
                      {Number(price.cautionFee) > 0 && (
                        <div className="flex justify-between text-[12px]">
                          <span className="text-white/60">Caution Fee</span>
                          <span className="text-white font-semibold">
                            {formatNaira(price.cautionFee!)}
                          </span>
                        </div>
                      )}
                    </div>
                  )}
              </div>

              {/* Enquiry form */}
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <h3 className="text-[14px] font-bold text-[#0E292F] mb-1">
                  Book a Viewing
                </h3>
                <p className="text-[12px] text-gray-400 mb-4">
                  Speak with a Vivar advisor about this property.
                </p>
                <EnquiryForm propertyTitle={property.title} />
              </div>

              {/* Vivar trust badges */}
              <div className="bg-[#f9fafb] rounded-2xl border border-gray-100 p-5 space-y-3">
                <p className="text-[11px] font-bold tracking-[0.15em] text-gray-400 uppercase">
                  Why Vivar?
                </p>
                {[
                  "Every listing is pre-verified by our team",
                  "Full legal compliance and documentation support",
                  "Trusted by 500+ buyers across Nigeria & the diaspora",
                  "No hidden fees — total transparency guaranteed",
                ].map((t) => (
                  <div key={t} className="flex items-start gap-2.5">
                    <span className="w-4 h-4 rounded-full bg-[#0E292F] flex items-center justify-center shrink-0 mt-0.5">
                      <CheckSVG />
                    </span>
                    <span className="text-[12px] text-gray-600 leading-relaxed">
                      {t}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
