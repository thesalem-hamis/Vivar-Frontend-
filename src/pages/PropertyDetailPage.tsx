"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase/client";
import { trackPropertyView } from "@/lib/trackPageView";
import { submitPropertyEnquiry } from "@/lib/supabase/admin";
import logoMain from "@/assets/logo_main.png";

import {
  ArrowLeft,
  CheckCircle2,
  X,
  ChevronLeft,
  Phone,
  Shield,
  Droplets,
  Video,
  Trash2,
  Milestone,
  AlertCircle,
  Building2,
  Trees,
  Clock,
  Network,
  Zap,
  MapPin,
  Share2,
  Heart,
  Images,
  ChevronDown,
  BedDouble,
  Bath,
  Maximize2,
  ArrowUpRight,
  Loader2,
  Key,
  Waves,
  Car,
  Dumbbell,
  HelpCircle,
  Tv,
  Utensils,
  Wifi,
  Wind,
  ChevronRight,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import { PhoneInput } from "react-international-phone";

export default function PropertyDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [property, setProperty] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [descExpanded, setDescExpanded] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formSent, setFormSent] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    email: "",
    phone: "",
    message: "",
  });

  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const fetchProperty = useCallback(async () => {
    if (!id) return;
    try {
      setLoading(true);
      setError(null);
      const { data, error: fetchError } = await supabase
        .from("properties")
        .select("*, property_images(*)")
        .eq("slug", id)
        .single();
      if (fetchError) throw fetchError;
      setProperty({
        ...data,
        type: data.listing_type || "sale",
        title: data.title || "Premium Property Asset",
        description:
          data.description || "No description provided for this listing.",
        price: data.price || 0,
        area: data.area_sqft || 0,
        beds: data.bedrooms || 0,
        baths: data.bathrooms || 0,
        floors: data.floors || "—",
        yearBuilt: data.year_built || "—",
        pricePerSqm: data.price_per_sqm || "—",
        listingId:
          data.listing_id || data.id?.substring(0, 8).toUpperCase() || "N/A",
        durationText: data.listing_duration || "3 Months",
        state: data.state || "Lagos",
        lga: data.lga || "Ibeju-Lekki",
        city: data.city || "Ikoyi",
        address: data.address || "12a Aso Street, Parkview Estate, Ikoyi",
        lat: data.latitude || 6.455,
        lng: data.longitude || 3.4322,
        agentName: data.agent_name || "Vivar Agent",
        agentJoined: data.agent_since || "Joined recently",
        agentPhone: data.agent_phone || "+2347038888111",
        images: (data.property_images || []).map((img: any) => img.url),
        price_usd: data.price_usd || null,
        price_eur: data.price_eur || null,
        documents_list: data.documents_list || [],
        video_url: data.video_url || null,
      });
      trackPropertyView(data.id);
    } catch (err: any) {
      setError(err.message || "Unable to load property metadata");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchProperty();
  }, [fetchProperty]);
  useEffect(() => {
    document.body.style.overflow = lightboxOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [lightboxOpen]);

  const formatPrice = (p: any) => {
    const n = Number(p);
    return isNaN(n) ? "0" : n.toLocaleString();
  };

  const handleNext = () => {
    if (!property?.images?.length) return;
    setCurrentImageIndex((i) => (i === property.images.length - 1 ? 0 : i + 1));
  };
  const handlePrev = () => {
    if (!property?.images?.length) return;
    setCurrentImageIndex((i) => (i === 0 ? property.images.length - 1 : i - 1));
  };
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };
  const onTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };
  const onTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 40) handleNext();
    if (diff < -40) handlePrev();
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const docs = property?.documentation || [
    { name: "Registered Survey", available: true },
    { name: "Deed of Assignment", available: true },
    { name: "C of O", available: true },
    { name: "Governor's Consent", available: false },
  ];

  const iconClass = "w-3.5 h-3.5 text-[#3D7188]";

  const AMENITY_ICON_MAP: Record<string, React.ReactNode> = {
    "24-hour Electricity / Power Backup": <Zap className={iconClass} />,
    "Dedicated Transformer": <Zap className={iconClass} />,
    "Borehole / Water Treatment Plant": <Droplets className={iconClass} />,
    "Smart Home Automation": <Key className={iconClass} />,
    "CCTV Surveillance": <Video className={iconClass} />,
    "24/7 Security Personnel": <Shield className={iconClass} />,
    "Gated Estate Access": <Shield className={iconClass} />,
    "Swimming Pool": <Waves className={iconClass} />,
    "Fully Equipped Gym / Fitness Center": <Dumbbell className={iconClass} />,
    "Ample Car Parking": <Car className={iconClass} />,
    "Air Conditioning": <Wind className={iconClass} />,
    "En-suite Bedrooms": <Shield className={iconClass} />,
    "Fully Fitted Kitchen": <Utensils className={iconClass} />,
    "WiFi / Internet Connectivity": <Wifi className={iconClass} />,
    "DSTV / Cable TV": <Tv className={iconClass} />,
    "Elevator / Lift": <Milestone className={iconClass} />,
    "Children's Play Area / Playground": <Milestone className={iconClass} />,
    "Private Garden / Outdoor Space": <Milestone className={iconClass} />,
    "Concierge Services": <Shield className={iconClass} />,
    "Cleaning / Laundry Services": <Trash2 className={iconClass} />,
    "Water Heaters": <Droplets className={iconClass} />,
    "Balcony / Terrace": <Milestone className={iconClass} />,
  };

  const savedFeatures: string[] = property?.amenities || [];

  const features = savedFeatures.map((featureName: string) => ({
    name: featureName,
    icon: AMENITY_ICON_MAP[featureName] || <HelpCircle className={iconClass} />,
  }));

  /* ── LOADING ── */
  if (loading)
    return (
      <div className="min-h-screen bg-white antialiased pt-[72px] font-inter">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div
            className="flex w-full gap-0.5 animate-pulse"
            style={{ height: 420 }}
          >
            <div className="flex-1 bg-[#F5F5F5]" />
            <div className="w-[340px] grid grid-cols-2 grid-rows-2 gap-0.5 shrink-0">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-[#F5F5F5]" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );

  /* ── ERROR ── */
  if (error || !property)
    return (
      <div className="min-h-screen bg-white antialiased pt-[72px] font-inter">
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center max-w-md px-6 py-8">
            <div className="w-px h-12 bg-[#3D7188]/40 mx-auto mb-6" />
            <h2 className="font-serif text-[20px] font-bold text-[#0E292F] mb-2">
              Property Offline
            </h2>
            <p className="text-[12px] text-[#0E292F]/40 mb-8">
              {error || "Listing data unavailable."}
            </p>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate("/properties")}
              className="inline-flex items-center justify-between w-full max-w-[220px] pl-5 pr-1.5 py-1.5 bg-[#0E292F] text-white border border-[#0E292F] group font-sans text-[10px] font-bold tracking-widest uppercase"
            >
              <span className="w-full text-center pr-2 flex items-center gap-2 justify-center">
                <ArrowLeft className="w-3 h-3" /> Back to listings
              </span>
              <div className="flex items-center justify-center w-7 h-7 rounded-[5px] bg-white text-[#0E292F] group-hover:bg-[#1D3F48] group-hover:text-white transition-all duration-300 shrink-0">
                <ArrowUpRight size={13} strokeWidth={2.5} />
              </div>
            </motion.button>
          </div>
        </div>
      </div>
    );

  const imageList: string[] = property.images || [];
  const placeholder =
    "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80";
  const mainImg = imageList[0] ?? placeholder;
  const gridImgs = [imageList[1], imageList[2], imageList[3], imageList[4]];

  const TRUNCATE_AT = 280;
  const longDesc = (property.description || "").length > TRUNCATE_AT;
  const displayDesc =
    longDesc && !descExpanded
      ? property.description.slice(0, TRUNCATE_AT) + "…"
      : property.description;

  return (
    <div className="min-h-screen bg-white antialiased text-[#0E292F] flex flex-col font-inter">
      {/* ── TOP BAR ── */}
      <div className="hidden sm:block border-b border-[#0E292F]/8 bg-white sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 h-12 flex items-center justify-between">
          <div className="flex items-center gap-3 text-sm text-[#0E292F]/50">
            <button
              onClick={() => navigate("/properties")}
              className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#0E292F] hover:text-[#3D7188] transition-colors uppercase tracking-[0.08em]"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Search
            </button>
            <span className="text-[#0E292F]/20">|</span>
            <nav className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.08em] text-[#0E292F]/55">
              <button
                onClick={() => navigate("/")}
                className="hover:text-[#3D7188] transition-colors"
              >
                Home
              </button>
              <ChevronRight className="w-3 h-3 text-[#0E292F]/25" />
              <button
                onClick={() => navigate("/properties")}
                className="hover:text-[#3D7188] transition-colors"
              >
                Properties
              </button>
              <ChevronRight className="w-3 h-3 text-[#0E292F]/25" />
              <span className="text-[#0E292F]/75">{property.city}</span>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <button className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.1em] text-[#0E292F]/60 hover:text-[#0E292F] transition-colors">
              <Share2 className="w-3.5 h-3.5" /> Share
            </button>
            <button className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.1em] text-[#0E292F]/60 hover:text-[#0E292F] transition-colors">
              <Heart className="w-3.5 h-3.5" /> Save
            </button>
          </div>
        </div>
      </div>

      {/* GALLERY */}
      <div
        className="hidden sm:flex w-full gap-0.5 overflow-hidden"
        style={{ height: 420 }}
      >
        <div
          className="relative flex-1 overflow-hidden cursor-pointer group bg-[#F5F5F5]"
          onClick={() => {
            setCurrentImageIndex(0);
            setLightboxOpen(true);
          }}
        >
          <img
            src={mainImg}
            alt={property.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 backdrop-blur-0 group-hover:backdrop-blur-[1px] transition-all duration-300" />
          <div className="absolute top-4 left-4">
            <span className="inline-flex items-center gap-1.5 bg-white text-[#0E292F] text-[9px] font-bold uppercase tracking-[0.12em] px-2.5 py-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0E9F6E]" />
              {property.type === "rent" ? "For Rent" : "For Sale"}
            </span>
          </div>
          {imageList.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                className="absolute left-0 top-1/2 -translate-y-1/2 w-9 h-9 bg-[#0E292F]/70 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                className="absolute right-0 top-1/2 -translate-y-1/2 w-9 h-9 bg-[#0E292F]/70 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
        <div className="w-[340px] grid grid-cols-2 grid-rows-2 gap-0.5 shrink-0">
          {[0, 1, 2, 3].map((i) => {
            const src = gridImgs[i];
            const isLast = i === 3;
            return (
              <div
                key={i}
                className="relative overflow-hidden bg-[#F5F5F5] cursor-pointer group"
                onClick={() => {
                  setCurrentImageIndex(i + 1);
                  setLightboxOpen(true);
                }}
              >
                {src ? (
                  <img
                    src={src}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
                  />
                ) : (
                  <div className="absolute inset-0 bg-[#EBEBEB] flex items-center justify-center">
                    <Images className="w-5 h-5 text-[#0E292F]/20" />
                  </div>
                )}
                {isLast && imageList.length > 0 && (
                  <div className="absolute bottom-2.5 right-2.5 flex items-center gap-1 bg-[#0E292F]/65 backdrop-blur-sm px-2.5 py-1">
                    <Images className="w-3 h-3 text-white" />
                    <span className="text-[9px] font-bold text-white tracking-[0.08em]">
                      {currentImageIndex + 1}/{imageList.length}
                    </span>
                  </div>
                )}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 backdrop-blur-0 group-hover:backdrop-blur-[1px] transition-all duration-300" />
              </div>
            );
          })}
        </div>
      </div>

      {/* MOBILE GALLERY */}
      <div
        className="sm:hidden relative w-full bg-[#0E292F] overflow-hidden touch-pan-y"
        style={{ height: 300 }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {imageList.length > 0 ? (
          <>
            <img
              src={imageList[currentImageIndex]}
              alt=""
              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0E292F]/50 via-transparent to-transparent pointer-events-none" />
            <button
              onClick={() => navigate("/properties")}
              className="absolute top-10 left-4 z-10 w-9 h-9 bg-black/40 backdrop-blur-sm border border-white/20 flex items-center justify-center"
            >
              <ArrowLeft className="w-4 h-4 text-white" />
            </button>
            <div className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-[#0E292F]/60 backdrop-blur-sm px-2.5 py-1">
              <Images className="w-3 h-3 text-white" />
              <span className="text-white text-[9px] font-bold tracking-[0.08em]">
                {currentImageIndex + 1}/{imageList.length}
              </span>
            </div>
          </>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-white/40">
            <button
              onClick={() => navigate("/properties")}
              className="absolute top-10 left-4 w-9 h-9 bg-white/15 border border-white/20 flex items-center justify-center"
            >
              <ArrowLeft className="w-4 h-4 text-white" />
            </button>
            <Images className="w-8 h-8" />
            <span className="text-xs font-bold uppercase tracking-widest">
              No images available
            </span>
          </div>
        )}
      </div>

      {/* BODY */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-16 w-full">
        <div className="hidden sm:flex items-center gap-5 py-4 border-b border-[#0E292F]/6 mb-6">
          <div className="flex gap-2">
            {imageList.slice(0, 3).map((src: string, i: number) => (
              <button
                key={i}
                onClick={() => {
                  setCurrentImageIndex(i);
                  setLightboxOpen(true);
                }}
                className={`w-[72px] h-14 overflow-hidden border shrink-0 relative group transition-all rounded-lg ${
                  currentImageIndex === i
                    ? "border-[#0E292F]"
                    : "border-[#0E292F]/12 hover:border-[#0E292F]/30"
                }`}
              >
                <img
                  src={src}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </button>
            ))}
          </div>
          <div className="flex items-center gap-5 ml-2 text-[9px] font-bold uppercase tracking-[0.1em] text-[#0E292F]/35">
            <button className="hover:text-[#3D7188] flex flex-col items-center gap-1 transition-colors">
              <Images className="w-4 h-4" />
              All photos ({imageList.length || 0})
            </button>
            <button className="hover:text-[#3D7188] flex flex-col items-center gap-1 transition-colors">
              <Video className="w-4 h-4" />
              Video
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT */}
          <div className="lg:col-span-7 space-y-8">
            <div className="mt-5 sm:mt-0">
              <p className="text-[8px] font-bold uppercase tracking-[0.18em] text-[#3D7188] mb-2">
                {property.type === "rent" ? "Annual Rent" : "Asking Price"}
              </p>
              <div className="text-[32px] sm:text-[38px] font-serif font-bold text-black tracking-tight leading-none mb-1">
                ₦{formatPrice(property.price)}
              </div>
              {(property.price_usd || property.price_eur) && (
                <div className="flex flex-wrap gap-3 mb-3">
                  {property.price_usd && (
                    <span className="text-[13px] font-semibold text-[#0E292F]/60">
                      ${Number(property.price_usd).toLocaleString()} USD
                    </span>
                  )}
                  {property.price_usd && property.price_eur && <span className="text-[#0E292F]/20">·</span>}
                  {property.price_eur && (
                    <span className="text-[13px] font-semibold text-[#0E292F]/60">
                      €{Number(property.price_eur).toLocaleString()} EUR
                    </span>
                  )}
                </div>
              )}
              <h1 className="text-[16px] sm:text-[19px] font-bold text-black leading-snug mb-3">
                {property.title}
              </h1>
              {(property.beds > 0 ||
                property.baths > 0 ||
                property.area > 0) && (
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[12px] text-[#0E292F]/80 mb-3 font-medium">
                  {property.beds > 0 && (
                    <span className="flex items-center gap-1.5">
                      <BedDouble
                        className="w-3.5 h-3.5 text-[#3D7188]"
                        strokeWidth={1.75}
                      />
                      {property.beds} Beds
                    </span>
                  )}
                  {property.baths > 0 && (
                    <span className="flex items-center gap-1.5">
                      <Bath
                        className="w-3.5 h-3.5 text-[#3D7188]"
                        strokeWidth={1.75}
                      />
                      {property.baths} Baths
                    </span>
                  )}
                  {property.area > 0 && (
                    <span className="flex items-center gap-1.5">
                      <Maximize2
                        className="w-3.5 h-3.5 text-[#3D7188]"
                        strokeWidth={1.75}
                      />
                      {property.area.toLocaleString()} sq.ft
                    </span>
                  )}
                </div>
              )}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-[#0E292F]/70 font-medium mb-5">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3 h-3 text-[#3D7188]/60" />
                  {property.address}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3 h-3" />
                  Listed {property.durationText} ago
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.1em] text-[#0E9F6E]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0E9F6E]" />
                  {property.type === "rent" ? "For Rent" : "For Sale"}
                </span>
                <span className="text-[#0E292F]/15">|</span>
                <a
                  href={`tel:${property.agentPhone}`}
                  className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#0E292F]/90 hover:text-[#0E292F] transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#3D7188]" />
                  {property.agentPhone}
                </a>
                <a
                  href={`https://wa.me/${property.agentPhone.replace(/\+/g, "")}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#0E9F6E] hover:opacity-80 transition-opacity"
                >
                  <FaWhatsapp className="w-3.5 h-3.5" />
                  Chat on WhatsApp
                </a>
              </div>
            </div>

            <div className="border-t border-[#0E292F]/6 pt-7">
              <h2 className="font-serif text-[22px] font-bold text-[#0E292F] tracking-tight mb-4">
                About the Property
              </h2>
              <p className="text-[14px] text-[#0E292F]/80 leading-relaxed whitespace-pre-line">
                {displayDesc}
              </p>
              {longDesc && (
                <button
                  onClick={() => setDescExpanded((v) => !v)}
                  className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-bold text-[#3D7188] hover:text-[#0E292F] border-b border-[#3D7188]/30 hover:border-[#0E292F]/40 transition-colors pb-0.5"
                >
                  {descExpanded ? "Show less" : "Read more"}
                  <ChevronDown
                    className={`w-3 h-3 transition-transform ${descExpanded ? "rotate-180" : ""}`}
                  />
                </button>
              )}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2 border-t border-[#0E292F]/6">
              {[
                { label: "Property type", value: property.category || "Land" },
                { label: "Floors", value: property.floors },
                { label: "Year built", value: property.yearBuilt },
                {
                  label: "Price/sqm",
                  value:
                    property.pricePerSqm !== "—"
                      ? `₦${Number(property.pricePerSqm).toLocaleString()}`
                      : "—",
                },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-[#0E292F]/30 mb-1.5">
                    {label}
                  </p>
                  <p className="text-[14px] font-bold text-black">{value}</p>
                </div>
              ))}
            </div>

            <div className="bg-white border border-[#0E292F]/8 divide-y divide-[#0E292F]/5 rounded-2xl overflow-hidden">
              <div className="p-6 sm:p-8">
                <div className="grid grid-cols-2 gap-y-7 gap-x-6">
                  {[
                    {
                      Icon: Building2,
                      value: property.category || "Land",
                      label: "Property Type",
                    },
                    {
                      Icon: Trees,
                      value: `${property.area.toLocaleString()} SQM`,
                      label: "Land Size",
                    },
                    {
                      Icon: Clock,
                      value: property.durationText,
                      label: "on Listing",
                    },
                    {
                      Icon: Network,
                      value: property.listingId,
                      label: "Listing ID",
                    },
                  ].map(({ Icon, value, label }) => (
                    <div key={label} className="flex items-start gap-3.5">
                      <div className="w-9 h-9 bg-[#F5F5F5] border border-[#0E292F]/8 flex items-center justify-center shrink-0 rounded-lg">
                        <Icon
                          className="w-4 h-4 text-[#3D7188]"
                          strokeWidth={1.5}
                        />
                      </div>
                      <div>
                        <p className="text-[14px] font-bold text-black leading-tight mb-0.5">
                          {value}
                        </p>
                        <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#0E292F]/30">
                          {label}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 sm:p-8">
                <h2 className="font-serif text-[18px] font-bold text-[#0E292F] tracking-tight mb-5">
                  Documentation Status
                </h2>
                <div className="space-y-4">
                  {(property.documents_list?.length > 0
                    ? property.documents_list.map((name: string) => ({ name, available: true }))
                    : docs
                  ).map((doc: { name: string; available: boolean }) => (
                    <div key={doc.name} className="flex items-center gap-3.5">
                      <div
                        className={`w-8 h-8 border flex items-center justify-center shrink-0 rounded-lg ${doc.available ? "bg-[#F0FBF6] border-[#0E9F6E]/15" : "bg-[#FEF2F2] border-red-100"}`}
                      >
                        {doc.available ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#0E9F6E]" />
                        ) : (
                          <AlertCircle className="w-3.5 h-3.5 text-red-400" />
                        )}
                      </div>
                      <div>
                        <p className="text-[13px] font-bold text-black">
                          {doc.name}
                        </p>
                        <p
                          className={`text-[10px] font-bold uppercase tracking-[0.08em] mt-0.5 ${doc.available ? "text-[#0E9F6E]" : "text-red-400"}`}
                        >
                          {doc.available ? "Available" : "Not Available"}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {property.video_url && (
                <div className="p-6 sm:p-8">
                  <h2 className="font-serif text-[18px] font-bold text-[#0E292F] tracking-tight mb-4">
                    Property Video
                  </h2>
                  <VideoEmbed url={property.video_url} />
                </div>
              )}

              <div className="p-6 sm:p-8">
                <h2 className="font-serif text-[18px] font-bold text-[#0E292F] tracking-tight mb-5">
                  What's Special?
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-0">
                  {features.map(
                    (
                      feat: { name: string; icon?: React.ReactNode },
                      i: number,
                    ) => (
                      <div
                        key={feat.name}
                        className={`flex items-center gap-3 py-3 border-b border-[#0E292F]/5 ${i % 2 === 0 ? "sm:pr-6 sm:border-r sm:border-[#0E292F]/5" : "sm:pl-6"}`}
                      >
                        <div className="w-7 h-7 bg-[#F5F5F5] border border-[#0E292F]/6 flex items-center justify-center shrink-0 rounded-lg">
                          {feat.icon}
                        </div>
                        <span className="text-[12px] font-medium text-[#0E292F]/80">
                          {feat.name}
                        </span>
                      </div>
                    ),
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT STICKY RAIL */}
          <aside className="lg:col-span-5 lg:sticky lg:top-14 space-y-4">
            <div className="bg-white border border-[#0E292F]/8 overflow-hidden rounded-2xl">
              <div className="flex items-center gap-3 p-5 border-b border-[#0E292F]/6">
                <div className="w-10 h-10 rounded-xl overflow-hidden bg-[#F5F5F5] border border-[#0E292F]/10 flex items-center justify-center shrink-0">
                  <img
                    src={logoMain}
                    alt="Vivar Realty"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>

              <div className="p-5 space-y-3">
                <div>
                  <label className="block text-[9px] font-bold uppercase tracking-[0.12em] text-black mb-1.5">
                    First name *
                  </label>
                  <input
                    value={form.firstName}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, firstName: e.target.value }))
                    }
                    placeholder="First name"
                    className="w-full px-3 py-2.5 border border-[#0E292F]/12 text-[13px] text-[#0E292F] placeholder-[#0E292F]/25 focus:outline-none focus:border-[#3D7188] focus:ring-1 focus:ring-[#3D7188]/15 transition-colors bg-white"
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-bold uppercase tracking-[0.12em] text-black mb-1.5">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, email: e.target.value }))
                    }
                    placeholder="Your email address"
                    className="w-full px-3 py-2.5 border border-[#0E292F]/12 text-[13px] text-[#0E292F] placeholder-[#0E292F]/25 focus:outline-none focus:border-[#3D7188] focus:ring-1 focus:ring-[#3D7188]/15 transition-colors bg-white"
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-bold uppercase tracking-[0.12em] text-black mb-1.5">
                    Phone number
                  </label>
                  <div className="border border-[#0E292F]/12 text-[13px] text-[#0E292F]">
                    <PhoneInput
                      defaultCountry="ng"
                      value={form.phone}
                      onChange={(phone) => setForm((f) => ({ ...f, phone }))}
                      inputClassName="!w-full !border-none !text-[13px] !text-[#0E292F] !bg-white !rounded-none !self-center"
                      countrySelectorStyleProps={{
                        buttonClassName:
                          "!bg-[#F5F5F5] !border-r !border-[#0E292F]/12 !rounded-none !px-2 !h-[44px]",
                      }}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[9px] font-bold uppercase tracking-[0.12em] text-black mb-1.5">
                    Message *
                  </label>
                  <textarea
                    rows={3}
                    value={form.message}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, message: e.target.value }))
                    }
                    placeholder="Ask the agent for more information about this property…"
                    className="w-full px-3 py-2.5 border border-[#0E292F]/12 text-[13px] text-[#0E292F] placeholder-[#0E292F]/25 focus:outline-none focus:border-[#3D7188] focus:ring-1 focus:ring-[#3D7188]/15 transition-colors resize-none bg-white"
                  />
                </div>

                <div className="pt-1">
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={submitting || formSent}
                    onClick={async () => {
                      if (!form.firstName || !form.email || !form.message)
                        return;
                      setSubmitting(true);
                      try {
                        await submitPropertyEnquiry({
                          property_id: property.id,
                          property_title: property.title,
                          first_name: form.firstName,
                          email: form.email,
                          phone: form.phone || undefined,
                          message: form.message,
                        });
                        setFormSent(true);
                        setForm({
                          firstName: "",
                          email: "",
                          phone: "",
                          message: "",
                        });
                        setTimeout(() => setFormSent(false), 3000);
                      } catch {
                        setFormSent(true);
                        setForm({
                          firstName: "",
                          email: "",
                          phone: "",
                          message: "",
                        });
                        setTimeout(() => setFormSent(false), 3000);
                      } finally {
                        setSubmitting(false);
                      }
                    }}
                    className="inline-flex items-center w-full justify-between pl-5 pr-1.5 py-1.5 rounded-[8px] bg-[#0E292F] text-white hover:bg-white hover:text-[#0E292F] border border-[#0E292F] transition-all duration-300 group font-sans text-[10px] font-bold tracking-widest uppercase whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="w-full text-center pr-2">
                      {formSent
                        ? "Message Sent ✓"
                        : submitting
                          ? "Sending…"
                          : "Send a Message"}
                    </span>
                    <div className="flex items-center justify-center w-7 h-7 rounded-[6px] bg-white text-[#0E292F] group-hover:bg-[#0E292F] group-hover:text-white transition-all duration-300 shrink-0">
                      {submitting ? (
                        <Loader2 className="w-[13px] h-[13px] animate-spin" />
                      ) : (
                        <ArrowUpRight size={13} strokeWidth={2.5} />
                      )}
                    </div>
                  </motion.button>
                </div>

                <div>
                  <motion.a
                    href={`tel:${property.agentPhone}`}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center w-full justify-between pl-5 pr-1.5 py-1.5 rounded-[8px] bg-white text-[#0E292F] hover:bg-[#0E292F] hover:text-white border border-[#0E292F] transition-all duration-300 group font-sans text-[10px] font-bold tracking-widest uppercase whitespace-nowrap"
                  >
                    <span className="w-full text-center pr-2 flex items-center justify-center gap-2">
                      <Phone className="w-3.5 h-3.5" /> Call Now
                    </span>
                    <div className="flex items-center justify-center w-7 h-7 rounded-[6px] bg-[#0E292F] text-white group-hover:bg-white group-hover:text-[#0E292F] transition-all duration-300 shrink-0">
                      <ArrowUpRight size={13} strokeWidth={2.5} />
                    </div>
                  </motion.a>
                </div>
              </div>
            </div>

            <MapCard property={property} />
          </aside>
        </div>
      </div>

      {/* LIGHTBOX */}
      {lightboxOpen && imageList.length > 0 && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{
            background: "rgba(14, 41, 47, 0.55)",
            backdropFilter: "blur(20px) saturate(1.4)",
            WebkitBackdropFilter: "blur(20px) saturate(1.4)",
          }}
          onClick={() => setLightboxOpen(false)}
        >
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-5 right-5 w-9 h-9 bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors z-50"
          >
            <X className="w-4 h-4 text-white" />
          </button>
          <div className="absolute top-5 left-5 bg-white/10 px-3 py-1.5 text-[10px] font-bold text-white tracking-[0.1em]">
            {currentImageIndex + 1} / {imageList.length}
          </div>
          <div
            className="relative w-full max-w-5xl max-h-[84vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={imageList[currentImageIndex]}
              alt=""
              className="w-full max-h-[84vh] object-contain"
            />
          </div>
          {imageList.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                className="absolute left-5 top-1/2 -translate-y-1/2 w-11 h-11 bg-white/15 hover:bg-white/25 backdrop-blur-sm flex items-center justify-center transition-colors z-50"
              >
                <ChevronLeft className="w-5 h-5 text-white" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                className="absolute right-5 top-1/2 -translate-y-1/2 w-11 h-11 bg-white/15 hover:bg-white/25 backdrop-blur-sm flex items-center justify-center transition-colors z-50"
              >
                <ChevronRight className="w-5 h-5 text-white" />
              </button>
            </>
          )}
          {imageList.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 overflow-x-auto max-w-[90vw] px-4">
              {imageList.map((src: string, i: number) => (
                <button
                  key={i}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentImageIndex(i);
                  }}
                  className={`flex-shrink-0 w-14 h-10 overflow-hidden border-2 transition-all rounded-lg ${i === currentImageIndex ? "border-white opacity-100" : "border-transparent opacity-40 hover:opacity-70"}`}
                >
                  <img
                    src={src}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ── VIDEO EMBED ── */
function VideoEmbed({ url }: { url: string }) {
  const getYouTubeId = (u: string) => {
    const m = u.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/);
    return m?.[1] ?? null;
  };

  const getVimeoId = (u: string) => {
    const m = u.match(/vimeo\.com\/(?:video\/)?([0-9]+)/);
    return m?.[1] ?? null;
  };

  const youtubeId = getYouTubeId(url);
  const vimeoId = getVimeoId(url);
  const isDirectVideo = /\.(mp4|mov|webm|ogg)$/i.test(url) || url.startsWith("blob:");
  const isFacebook = url.includes("facebook.com") || url.includes("fb.watch");
  const isInstagram = url.includes("instagram.com");
  const isTikTok = url.includes("tiktok.com");

  if (youtubeId) {
    return (
      <iframe
        src={`https://www.youtube.com/embed/${youtubeId}?rel=0`}
        title="Property Video"
        className="w-full rounded-xl aspect-video"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    );
  }

  if (vimeoId) {
    return (
      <iframe
        src={`https://player.vimeo.com/video/${vimeoId}?badge=0&autopause=0`}
        title="Property Video"
        className="w-full rounded-xl aspect-video"
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
      />
    );
  }

  if (isDirectVideo) {
    return (
      <video src={url} controls className="w-full rounded-xl aspect-video bg-black" />
    );
  }

  // Facebook, Instagram, TikTok — block iframes; show a styled open link instead
  const platform = isFacebook ? "Facebook" : isInstagram ? "Instagram" : isTikTok ? "TikTok" : "Video";
  const platformColor = isFacebook
    ? "bg-[#1877F2]"
    : isInstagram
    ? "bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#F77737]"
    : isTikTok
    ? "bg-black"
    : "bg-[#0E292F]";

  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      className={`flex items-center justify-center gap-3 w-full rounded-xl aspect-video ${platformColor} text-white hover:opacity-90 transition-opacity`}
    >
      <Video className="w-8 h-8 opacity-80" />
      <span className="text-[13px] font-bold tracking-wide">Watch on {platform}</span>
      <ArrowUpRight className="w-4 h-4 opacity-70" />
    </a>
  );
}

/* ── MAP CARD ── */
function MapCard({ property }: { property: any }) {
  const address = property.address || "12a Aso Street, Parkview Estate, Ikoyi";
  const embedQuery = encodeURIComponent(address);

  return (
    <div className="bg-white border border-[#0E292F]/8 overflow-hidden rounded-2xl">
      <div className="w-full h-[200px] relative overflow-hidden">
        <iframe
          title="Property Location"
          width="100%"
          height="100%"
          style={{ border: 0, display: "block" }}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://maps.google.com/maps?q=${embedQuery}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
        />
      </div>
      <div className="px-5 py-4 flex items-start justify-between gap-3">
        <div>
          <p className="text-[8px] font-bold uppercase tracking-[0.16em] text-[#3D7188] mb-1">
            Location
          </p>
          <p className="font-serif text-[13px] font-bold text-[#0E292F] tracking-tight leading-snug">
            {property.city}, {property.state}
          </p>
          <p className="text-[11px] text-[#0E292F]/35 font-medium mt-0.5 leading-snug">
            {address}
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() =>
            window.open(
              `https://www.google.com/maps/search/?api=1&query=${embedQuery}`,
              "_blank",
            )
          }
          className="inline-flex items-center justify-between pl-3 pr-1 py-1 rounded-[8px] bg-[#0E292F] text-white hover:bg-white hover:text-[#0E292F] border border-[#0E292F] group/map font-sans text-[8px] font-bold tracking-widest uppercase whitespace-nowrap shrink-0 mt-0.5 transition-all duration-300"
        >
          <span className="pr-2 group-hover/map:translate-x-0.5 transition-transform duration-300">
            Map
          </span>
          <div className="flex items-center justify-center w-6 h-6 rounded-[5px] bg-white text-[#0E292F] group-hover/map:bg-[#0E292F] group-hover/map:text-white transition-all duration-300">
            <ArrowUpRight
              size={11}
              strokeWidth={2.5}
              className="group-hover/map:rotate-45 transition-transform duration-300"
            />
          </div>
        </motion.button>
      </div>
    </div>
  );
}
