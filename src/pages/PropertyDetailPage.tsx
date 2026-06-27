// import { useEffect, useState, useCallback } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { supabase } from "@/lib/supabase/client";
// import { trackPropertyView } from "@/lib/trackPageView";
// import {
//   MapPin, BedDouble, Bath, Maximize, Home, ArrowLeft,
//   Phone, Mail, Clock, Loader2, ChevronLeft, ChevronRight, X
// } from "lucide-react";

// export default function PropertyDetailPage() {
//   const { id } = useParams<{ id: string }>();
//   const navigate = useNavigate();
//   const [property, setProperty] = useState<any>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [lightboxOpen, setLightboxOpen] = useState(false);

//   const fetchProperty = useCallback(async () => {
//     if (!id) return;
//     try {
//       setLoading(true);
//       setError(null);
//       const { data, error: fetchError } = await supabase
//         .from("properties")
//         .select("*, property_images(*)")
//         .eq("id", id)
//         .single();

//       if (fetchError) throw fetchError;

//       const mapped = {
//         ...data,
//         type: data.listing_type || "sale",
//         location: [data.address, data.city, data.state].filter(Boolean).join(", ") || data.city || "Unknown",
//         area: data.area_sqft || 0,
//         images: (data.property_images || []).map((img: any) => img.url),
//         createdAt: data.created_at,
//       };

//       setProperty(mapped);
//       trackPropertyView(mapped.id);
//     } catch (err: any) {
//       setError(err.message || "Unable to load property");
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   }, [id]);

//   useEffect(() => {
//     fetchProperty();
//   }, [fetchProperty]);

//   // Lock body scroll when lightbox is open
//   useEffect(() => {
//     if (lightboxOpen) {
//       document.body.style.overflow = 'hidden';
//     } else {
//       document.body.style.overflow = '';
//     }
//     return () => {
//       document.body.style.overflow = '';
//     };
//   }, [lightboxOpen]);

//   const formatPrice = (price: any) => {
//     const num = Number(price);
//     return isNaN(num) ? "0" : num.toLocaleString();
//   };

//   const handlePrevImage = (e: React.MouseEvent) => {
//     e.stopPropagation();
//     setCurrentImageIndex(prev => prev === 0 ? property.images.length - 1 : prev - 1);
//   };

//   const handleNextImage = (e: React.MouseEvent) => {
//     e.stopPropagation();
//     setCurrentImageIndex(prev => prev === property.images.length - 1 ? 0 : prev + 1);
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-white">
//         <div className="text-center">
//           <Loader2 className="w-8 h-8 animate-spin text-neutral-400 mx-auto" />
//           <p className="mt-4 text-sm text-neutral-500">Loading property...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error || !property) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-white">
//         <div className="text-center max-w-md px-6">
//           <Home className="w-12 h-12 text-neutral-300 mx-auto mb-4" />
//           <h2 className="text-xl font-semibold text-neutral-900 mb-2">Property Not Found</h2>
//           <p className="text-sm text-neutral-500 mb-6">
//             {error || "This property is no longer available or doesn't exist."}
//           </p>
//           <button
//             onClick={() => navigate("/properties")}
//             className="inline-flex items-center gap-2 px-5 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white rounded-lg text-sm font-medium transition-colors"
//           >
//             <ArrowLeft className="w-4 h-4" />
//             Back to listings
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-white">
//       {/* Navigation Bar */}
//       <div className="border-b border-neutral-200 bg-white">
//         <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
//           <button
//             onClick={() => navigate("/properties")}
//             className="inline-flex items-center gap-2 text-sm text-neutral-600 hover:text-neutral-900 transition-colors"
//           >
//             <ArrowLeft className="w-4 h-4" />
//             Back to listings
//           </button>
//           <div className="flex items-center gap-2">
//             <span className="px-3 py-1 text-xs font-medium bg-emerald-50 text-emerald-700 rounded-full">
//               Available
//             </span>
//             <span className="px-3 py-1 text-xs font-medium bg-neutral-100 text-neutral-700 rounded-full">
//               {property.type === "sale" ? "For Sale" : property.type === "rent" ? "For Rent" : "Commercial"}
//             </span>
//           </div>
//         </div>
//       </div>

//       <div className="max-w-5xl mx-auto px-6 py-8">
//         {/* Compact Image Gallery */}
//         <div className="relative h-72 sm:h-80 rounded-lg overflow-hidden bg-neutral-100 mb-8 group cursor-pointer" onClick={() => setLightboxOpen(true)}>
//           {property.images?.length > 0 ? (
//             <>
//               <img
//                 src={property.images[currentImageIndex]}
//                 alt={property.title}
//                 className="w-full h-full object-contain"
//               />
              
//               {/* Hover overlay */}
//               <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
//                 <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 backdrop-blur-sm rounded-lg px-4 py-2 text-sm font-medium text-neutral-900 shadow-lg">
//                   Click to view full image
//                 </div>
//               </div>

//               {property.images.length > 1 && (
//                 <>
//                   {/* Navigation Arrows */}
//                   <button
//                     onClick={handlePrevImage}
//                     className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/95 hover:bg-white shadow-md flex items-center justify-center transition-colors opacity-0 group-hover:opacity-100"
//                   >
//                     <ChevronLeft className="w-4 h-4 text-neutral-700" />
//                   </button>
//                   <button
//                     onClick={handleNextImage}
//                     className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/95 hover:bg-white shadow-md flex items-center justify-center transition-colors opacity-0 group-hover:opacity-100"
//                   >
//                     <ChevronRight className="w-4 h-4 text-neutral-700" />
//                   </button>
                  
//                   {/* Counter */}
//                   <div className="absolute bottom-3 right-3 px-2.5 py-1 bg-white/95 rounded-md text-xs font-medium text-neutral-700 shadow-sm">
//                     {currentImageIndex + 1}/{property.images.length}
//                   </div>
                  
//                   {/* Dots */}
//                   <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
//                     {property.images.map((_: string, i: number) => (
//                       <button
//                         key={i}
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           setCurrentImageIndex(i);
//                         }}
//                         className={`h-1.5 rounded-full transition-all ${
//                           i === currentImageIndex ? "w-5 bg-white shadow-sm" : "w-1.5 bg-white/70"
//                         }`}
//                       />
//                     ))}
//                   </div>
//                 </>
//               )}
//             </>
//           ) : (
//             <div className="w-full h-full flex items-center justify-center bg-neutral-50">
//               <div className="text-center">
//                 <Home className="w-10 h-10 text-neutral-300 mx-auto mb-2" />
//                 <p className="text-sm text-neutral-400">No images</p>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Title & Price */}
//         <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-6 pb-6 border-b border-neutral-100">
//           <div className="flex-1">
//             <h1 className="text-xl sm:text-2xl font-semibold text-neutral-900 mb-1.5">
//               {property.title}
//             </h1>
//             <div className="flex items-center gap-1.5 text-sm text-neutral-500">
//               <MapPin className="w-3.5 h-3.5" />
//               <span>{property.location || "Location not specified"}</span>
//             </div>
//           </div>
//           <div className="sm:text-right">
//             <p className="text-xl sm:text-2xl font-semibold text-neutral-900">
//               ₦{formatPrice(property.price)}
//             </p>
//             {property.type === "rent" && (
//               <p className="text-xs text-neutral-500 mt-0.5">per annum</p>
//             )}
//           </div>
//         </div>

//         {/* Property Details */}
//         <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
//           <div className="border border-neutral-200 rounded-lg p-3.5">
//             <BedDouble className="w-4 h-4 text-neutral-400 mb-1.5" />
//             <p className="text-lg font-semibold text-neutral-900">{property.bedrooms || 0}</p>
//             <p className="text-xs text-neutral-500 font-medium">Bedrooms</p>
//           </div>
//           <div className="border border-neutral-200 rounded-lg p-3.5">
//             <Bath className="w-4 h-4 text-neutral-400 mb-1.5" />
//             <p className="text-lg font-semibold text-neutral-900">{property.bathrooms || 0}</p>
//             <p className="text-xs text-neutral-500 font-medium">Bathrooms</p>
//           </div>
//           <div className="border border-neutral-200 rounded-lg p-3.5">
//             <Maximize className="w-4 h-4 text-neutral-400 mb-1.5" />
//             <p className="text-lg font-semibold text-neutral-900">
//               {property.area ? property.area.toLocaleString() : "—"}
//             </p>
//             <p className="text-xs text-neutral-500 font-medium">Sqft</p>
//           </div>
//           <div className="border border-neutral-200 rounded-lg p-3.5">
//             <Home className="w-4 h-4 text-neutral-400 mb-1.5" />
//             <p className="text-lg font-semibold text-neutral-900 capitalize">
//               {property.property_type || property.type}
//             </p>
//             <p className="text-xs text-neutral-500 font-medium">Type</p>
//           </div>
//         </div>

//         {/* Location Map */}
//         {property.map_embed && (
//           <div className="mb-6">
//             <h2 className="text-sm font-semibold text-neutral-900 uppercase tracking-wider mb-2.5">
//               Location
//             </h2>
//             <div className="rounded-lg overflow-hidden border border-neutral-200">
//               <iframe
//                 src={property.map_embed}
//                 width="100%"
//                 height="300"
//                 style={{ border: 0 }}
//                 allowFullScreen
//                 loading="lazy"
//                 referrerPolicy="no-referrer-when-downgrade"
//                 title="Property location map"
//               />
//             </div>
//           </div>
//         )}

//         {/* Description */}
//         {property.description && (
//           <div className="mb-6">
//             <h2 className="text-sm font-semibold text-neutral-900 uppercase tracking-wider mb-2.5">
//               Description
//             </h2>
//             <p className="text-sm text-neutral-600 leading-relaxed">{property.description}</p>
//           </div>
//         )}

//         {/* Meta Info */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
//           <div className="group relative bg-gradient-to-br from-neutral-50 to-white border border-neutral-200 rounded-lg p-4 hover:border-neutral-300 hover:shadow-md transition-all duration-300 overflow-hidden">
//             <div className="relative z-10">
//               <div className="flex items-center gap-2 mb-2">
//                 <div className="w-7 h-7 rounded-md bg-neutral-900 flex items-center justify-center">
//                   <Home className="w-3.5 h-3.5 text-white" />
//                 </div>
//                 <p className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider">Property Type</p>
//               </div>
//               <p className="text-sm font-bold text-neutral-900 capitalize tracking-tight">
//                 {property.property_type || property.type}
//               </p>
//             </div>
//             <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-neutral-100/50 to-transparent rounded-full -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-500" />
//           </div>

//           <div className="group relative bg-gradient-to-br from-neutral-50 to-white border border-neutral-200 rounded-lg p-4 hover:border-neutral-300 hover:shadow-md transition-all duration-300 overflow-hidden">
//             <div className="relative z-10">
//               <div className="flex items-center gap-2 mb-2">
//                 <div className="w-7 h-7 rounded-md bg-neutral-900 flex items-center justify-center">
//                   <Clock className="w-3.5 h-3.5 text-white" />
//                 </div>
//                 <p className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider">Listed On</p>
//               </div>
//               <p className="text-sm font-bold text-neutral-900 tracking-tight">
//                 {property.createdAt
//                   ? new Date(property.createdAt).toLocaleDateString("en-US", {
//                       month: "long",
//                       day: "numeric",
//                       year: "numeric",
//                     })
//                   : "Recently"}
//               </p>
//             </div>
//             <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-neutral-100/50 to-transparent rounded-full -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-500" />
//           </div>
//         </div>

//         {/* Contact */}
//         <div className="bg-neutral-900 rounded-lg p-5 sm:p-6">
//           <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
//             <div>
//               <h2 className="text-base font-semibold text-white mb-1">Interested in this property?</h2>
//               <p className="text-sm text-neutral-400">Contact our team for more information.</p>
//             </div>
//             <div className="flex gap-2.5 w-full sm:w-auto">
//               <a
//                 href="tel:+2348092949777"
//                 className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2 bg-white text-neutral-900 rounded-md text-sm font-medium hover:bg-neutral-100 transition-colors"
//               >
//                 <Phone className="w-3.5 h-3.5" />
//                 Call
//               </a>
//               <button className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2 border border-neutral-600 text-white rounded-md text-sm font-medium hover:border-neutral-400 transition-colors">
//                 <Mail className="w-3.5 h-3.5" />
//                 Message
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Lightbox */}
//       {lightboxOpen && (
//         <div 
//           className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center"
//           onClick={() => setLightboxOpen(false)}
//         >
//           {/* Close button */}
//           <button
//             onClick={() => setLightboxOpen(false)}
//             className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
//           >
//             <X className="w-5 h-5 text-white" />
//           </button>

//           {/* Image counter */}
//           <div className="absolute top-4 left-4 px-3 py-1.5 bg-white/10 rounded-md text-sm font-medium text-white backdrop-blur-sm">
//             {currentImageIndex + 1} / {property.images.length}
//           </div>

//           {/* Navigation arrows */}
//           {property.images.length > 1 && (
//             <>
//               <button
//                 onClick={handlePrevImage}
//                 className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
//               >
//                 <ChevronLeft className="w-6 h-6 text-white" />
//               </button>
//               <button
//                 onClick={handleNextImage}
//                 className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
//               >
//                 <ChevronRight className="w-6 h-6 text-white" />
//               </button>
//             </>
//           )}

//           {/* Main image */}
//           <div className="w-full h-full max-w-7xl max-h-[90vh] mx-auto p-4 flex items-center justify-center">
//             <img
//               src={property.images[currentImageIndex]}
//               alt={property.title}
//               className="max-w-full max-h-full object-contain"
//               onClick={(e) => e.stopPropagation()}
//             />
//           </div>

//           {/* Thumbnail strip */}
//           {property.images.length > 1 && (
//             <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 overflow-x-auto max-w-[90vw] px-4 py-2">
//               {property.images.map((img: string, i: number) => (
//                 <button
//                   key={i}
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     setCurrentImageIndex(i);
//                   }}
//                   className={`flex-shrink-0 w-16 h-12 rounded-md overflow-hidden border-2 transition-all ${
//                     i === currentImageIndex ? "border-white opacity-100" : "border-transparent opacity-60 hover:opacity-80"
//                   }`}
//                 >
//                   <img src={img} alt="" className="w-full h-full object-cover" />
//                 </button>
//               ))}
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }



"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase/client";
import { trackPropertyView } from "@/lib/trackPageView";
import logoMain from "@/assets/logo_main.png";

import {
  ArrowLeft, Bookmark, CheckCircle2, XCircle, X, ChevronLeft, ChevronRight,
  Phone, Shield, Droplets, Video, Trash2, Milestone, AlertCircle,
  Building2, Trees, Clock, Network, Zap, MapPin, Share2, Heart,
  Eye, Images, ChevronDown, BedDouble, Bath, Maximize2, ArrowUpRight, Loader2,
} from "lucide-react";
import { FaWhatsapp, FaRegComment, FaRegStar } from "react-icons/fa6";

export default function PropertyDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [property, setProperty]                   = useState<any>(null);
  const [loading, setLoading]                     = useState(true);
  const [error, setError]                         = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen]           = useState(false);
  const [descExpanded, setDescExpanded]           = useState(false);
  const [submitting, setSubmitting]               = useState(false);
  const [form, setForm] = useState({ firstName: "", email: "", phone: "", message: "" });

  const touchStartX = useRef<number | null>(null);
  const touchEndX   = useRef<number | null>(null);

  const fetchProperty = useCallback(async () => {
    if (!id) return;
    try {
      setLoading(true); setError(null);
      const { data, error: fetchError } = await supabase
        .from("properties").select("*, property_images(*)").eq("id", id).single();
      if (fetchError) throw fetchError;
      setProperty({
        ...data,
        type:         data.listing_type    || "sale",
        title:        data.title           || "Premium Property Asset",
        description:  data.description     || "No description provided for this listing.",
        price:        data.price           || 0,
        area:         data.area_sqft       || 0,
        beds:         data.bedrooms        || 0,
        baths:        data.bathrooms       || 0,
        floors:       data.floors          || "—",
        yearBuilt:    data.year_built      || "—",
        pricePerSqm:  data.price_per_sqm   || "—",
        listingId:    data.listing_id || data.id?.substring(0, 8).toUpperCase() || "N/A",
        durationText: data.listing_duration || "3 Months",
        state:        data.state    || "Lagos",
        lga:          data.lga      || "Ibeju-Lekki",
        city:         data.city     || "Ikoyi",
        address:      data.address  || "12a Aso Street, Parkview Estate, Ikoyi",
        lat:          data.latitude  || 6.4550,
        lng:          data.longitude || 3.4322,
        agentName:    data.agent_name  || "Vivar Agent",
        agentJoined:  data.agent_since || "Joined recently",
        agentPhone:   data.agent_phone || "+2348137478998",
        images:       (data.property_images || []).map((img: any) => img.url),
      });
      trackPropertyView(data.id);
    } catch (err: any) {
      setError(err.message || "Unable to load property metadata");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => { fetchProperty(); }, [fetchProperty]);
  useEffect(() => {
    document.body.style.overflow = lightboxOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lightboxOpen]);

  const formatPrice = (p: any) => { const n = Number(p); return isNaN(n) ? "0" : n.toLocaleString(); };

  const handleNext = () => {
    if (!property?.images?.length) return;
    setCurrentImageIndex(i => (i === property.images.length - 1 ? 0 : i + 1));
  };
  const handlePrev = () => {
    if (!property?.images?.length) return;
    setCurrentImageIndex(i => (i === 0 ? property.images.length - 1 : i - 1));
  };
  const onTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.targetTouches[0].clientX; };
  const onTouchMove  = (e: React.TouchEvent) => { touchEndX.current   = e.targetTouches[0].clientX; };
  const onTouchEnd   = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const diff = touchStartX.current - touchEndX.current;
    if (diff >  40) handleNext();
    if (diff < -40) handlePrev();
    touchStartX.current = null; touchEndX.current = null;
  };

  const docs = property?.documentation || [
    { name: "Registered Survey",       available: true  },
    { name: "Deed of Assignment",      available: true  },
    { name: "C of O",                  available: true  },
    { name: "Governor's Consent",      available: false },
  ];

  const features = property?.features || [
    { name: "24hrs Electricity",           icon: <Zap      className="w-3.5 h-3.5 text-[#3D7188]" /> },
    { name: "24hrs Security",              icon: <Shield   className="w-3.5 h-3.5 text-[#3D7188]" /> },
    { name: "Borehole",                    icon: <Droplets className="w-3.5 h-3.5 text-[#3D7188]" /> },
    { name: "CCTV",                        icon: <Video    className="w-3.5 h-3.5 text-[#3D7188]" /> },
    { name: "Waste disposal & management", icon: <Trash2   className="w-3.5 h-3.5 text-[#3D7188]" /> },
    { name: "Tennis Court",                icon: <Milestone className="w-3.5 h-3.5 text-[#3D7188]" /> },
    { name: "Security House",              icon: <Shield   className="w-3.5 h-3.5 text-[#3D7188]" /> },
    { name: "Green area / Garden",         icon: <Milestone className="w-3.5 h-3.5 text-[#3D7188]" /> },
    { name: "Golf Court",                  icon: <Milestone className="w-3.5 h-3.5 text-[#3D7188]" /> },
    { name: "Call to Access / ID pass",    icon: <Shield   className="w-3.5 h-3.5 text-[#3D7188]" /> },
  ];

  /* ── LOADING ── */
  if (loading) return (
    <div className="min-h-screen bg-white antialiased pt-[72px] font-inter">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex w-full gap-0.5 animate-pulse" style={{ height: 420 }}>
          <div className="flex-1 bg-[#F5F5F5]" />
          <div className="w-[340px] grid grid-cols-2 grid-rows-2 gap-0.5 shrink-0">
            {[1,2,3,4].map(i => <div key={i} className="bg-[#F5F5F5]" />)}
          </div>
        </div>
      </div>
    </div>
  );

  /* ── ERROR ── */
  if (error || !property) return (
    <div className="min-h-screen bg-white antialiased pt-[72px] font-inter">
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center max-w-md px-6 py-8">
          <div className="w-px h-12 bg-[#3D7188]/40 mx-auto mb-6" />
          <h2 className="font-serif text-[20px] font-bold text-[#0E292F] mb-2">Property Offline</h2>
          <p className="text-[12px] text-[#0E292F]/40 mb-8">{error || "Listing data unavailable."}</p>
          <motion.button
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
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
  const placeholder = "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80";
  const mainImg     = imageList[0] ?? placeholder;
  const gridImgs    = [imageList[1], imageList[2], imageList[3], imageList[4]];

  const TRUNCATE_AT = 280;
  const longDesc    = (property.description || "").length > TRUNCATE_AT;
  const displayDesc = longDesc && !descExpanded
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
              <button onClick={() => navigate("/")} className="hover:text-[#3D7188] transition-colors">{property.state}</button>
              <ChevronRight className="w-3 h-3 text-[#0E292F]/25" />
              <button onClick={() => navigate("/properties")} className="hover:text-[#3D7188] transition-colors">{property.lga}</button>
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

      {/* ══════════════════════════════════════════
          GALLERY
      ══════════════════════════════════════════ */}

      {/* DESKTOP — 50/50 split, no border radius */}
      <div className="hidden sm:flex w-full gap-0.5 overflow-hidden" style={{ height: 420 }}>

        {/* Left — main image */}
        <div
          className="relative flex-1 overflow-hidden cursor-pointer group bg-[#F5F5F5]"
          onClick={() => { setCurrentImageIndex(0); setLightboxOpen(true); }}
        >
          <img
            src={mainImg} alt={property.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 backdrop-blur-0 group-hover:backdrop-blur-[1px] transition-all duration-300" />

          {/* Status tag */}
          <div className="absolute top-4 left-4">
            <span className="inline-flex items-center gap-1.5 bg-white text-[#0E292F] text-[9px] font-bold uppercase tracking-[0.12em] px-2.5 py-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0E9F6E]" />
              {property.type === "rent" ? "For Rent" : "For Sale"}
            </span>
          </div>

          {/* Prev/Next arrows */}
          {imageList.length > 1 && (
            <>
              <button
                onClick={e => { e.stopPropagation(); handlePrev(); }}
                className="absolute left-0 top-1/2 -translate-y-1/2 w-9 h-9 bg-[#0E292F]/70 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={e => { e.stopPropagation(); handleNext(); }}
                className="absolute right-0 top-1/2 -translate-y-1/2 w-9 h-9 bg-[#0E292F]/70 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </>
          )}
        </div>

        {/* Right — 2×2 grid */}
        <div className="w-[340px] grid grid-cols-2 grid-rows-2 gap-0.5 shrink-0">
          {[0,1,2,3].map(i => {
            const src    = gridImgs[i];
            const isLast = i === 3;
            return (
              <div
                key={i}
                className="relative overflow-hidden bg-[#F5F5F5] cursor-pointer group"
                onClick={() => { setCurrentImageIndex(i + 1); setLightboxOpen(true); }}
              >
                {src
                  ? <img src={src} alt="" className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.04]" />
                  : <div className="absolute inset-0 bg-[#EBEBEB] flex items-center justify-center">
                      <Images className="w-5 h-5 text-[#0E292F]/20" />
                    </div>
                }
                {/* Photo count on last cell */}
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

      {/* MOBILE — full-bleed swiper, no border radius */}
      <div
        className="sm:hidden relative w-full bg-[#0E292F] overflow-hidden touch-pan-y"
        style={{ height: 300 }}
        onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}
      >
        {imageList.length > 0 ? (
          <>
            <img src={imageList[currentImageIndex]} alt=""
              className="absolute inset-0 w-full h-full object-cover pointer-events-none" />
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
            <button onClick={() => navigate("/properties")}
              className="absolute top-10 left-4 w-9 h-9 bg-white/15 border border-white/20 flex items-center justify-center">
              <ArrowLeft className="w-4 h-4 text-white" />
            </button>
            <Images className="w-8 h-8" />
            <span className="text-xs font-bold uppercase tracking-widest">No images available</span>
          </div>
        )}
      </div>

      {/* ══════════════════════════════════════════
          BODY
      ══════════════════════════════════════════ */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-16 w-full">

        {/* Thumbnail strip */}
        <div className="hidden sm:flex items-center gap-5 py-4 border-b border-[#0E292F]/6 mb-6">
          <div className="flex gap-2">
            {imageList.slice(0, 3).map((src: string, i: number) => (
              <button
                key={i}
                onClick={() => { setCurrentImageIndex(i); setLightboxOpen(true); }}
                className={`w-[72px] h-14 overflow-hidden border shrink-0 relative group transition-all rounded-lg ${
                  currentImageIndex === i ? "border-[#0E292F]" : "border-[#0E292F]/12 hover:border-[#0E292F]/30"
                }`}
              >
                <img src={src} alt="" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
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

          {/* ── LEFT ── */}
          <div className="lg:col-span-7 space-y-8">

            {/* Price block */}
            <div className="mt-5 sm:mt-0">
              <p className="text-[8px] font-bold uppercase tracking-[0.18em] text-[#3D7188] mb-2">
                {property.type === "rent" ? "Annual Rent" : "Asking Price"}
              </p>
              <div className="text-[32px] sm:text-[38px] font-serif font-bold text-black tracking-tight leading-none mb-3">
                ₦{formatPrice(property.price)}
              </div>

              <h1 className="text-[16px] sm:text-[19px] font-bold text-black leading-snug mb-3">
                {property.title}
              </h1>

              {/* Bed/Bath/Size row */}
              {(property.beds > 0 || property.baths > 0 || property.area > 0) && (
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[12px] text-[#0E292F]/80 mb-3 font-medium">
                  {property.beds > 0 && (
                    <span className="flex items-center gap-1.5">
                      <BedDouble className="w-3.5 h-3.5 text-[#3D7188]" strokeWidth={1.75} />
                      {property.beds} Beds
                    </span>
                  )}
                  {property.baths > 0 && (
                    <span className="flex items-center gap-1.5">
                      <Bath className="w-3.5 h-3.5 text-[#3D7188]" strokeWidth={1.75} />
                      {property.baths} Baths
                    </span>
                  )}
                  {property.area > 0 && (
                    <span className="flex items-center gap-1.5">
                      <Maximize2 className="w-3.5 h-3.5 text-[#3D7188]" strokeWidth={1.75} />
                      {property.area.toLocaleString()} sq.ft
                    </span>
                  )}
                </div>
              )}

              {/* Location row */}
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

              {/* For Sale badge + contact */}
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.1em] text-[#0E9F6E]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0E9F6E]" />
                  {property.type === "rent" ? "For Rent" : "For Sale"}
                </span>
                <span className="text-[#0E292F]/15">|</span>
                <a href={`tel:${property.agentPhone}`}
                  className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#0E292F]/90 hover:text-[#0E292F] transition-colors">
                  <Phone className="w-3.5 h-3.5 text-[#3D7188]" />
                  {property.agentPhone}
                </a>
                <a
                  href={`https://wa.me/${property.agentPhone.replace(/\+/g, "")}`}
                  target="_blank" rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#0E9F6E] hover:opacity-80 transition-opacity"
                >
                  <FaWhatsapp className="w-3.5 h-3.5" />
                  Chat on WhatsApp
                </a>
              </div>
            </div>

            {/* About */}
            <div className="border-t border-[#0E292F]/6 pt-7">
              <h2 className="font-serif text-[22px] font-bold text-[#0E292F] tracking-tight mb-4">
                About the Property
              </h2>
              <p className="text-[14px] text-[#0E292F]/80 leading-relaxed whitespace-pre-line">
                {displayDesc}
              </p>
              {longDesc && (
                <button
                  onClick={() => setDescExpanded(v => !v)}
                  className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-bold text-[#3D7188] hover:text-[#0E292F] border-b border-[#3D7188]/30 hover:border-[#0E292F]/40 transition-colors pb-0.5"
                >
                  {descExpanded ? "Show less" : "Read more"}
                  <ChevronDown className={`w-3 h-3 transition-transform ${descExpanded ? "rotate-180" : ""}`} />
                </button>
              )}
            </div>

            {/* Spec grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2 border-t border-[#0E292F]/6">
              {[
                { label: "Property type", value: property.category || "Land"    },
                { label: "Floors",        value: property.floors                },
                { label: "Year built",    value: property.yearBuilt             },
                { label: "Price/sqm",     value: property.pricePerSqm !== "—"
                    ? `₦${Number(property.pricePerSqm).toLocaleString()}` : "—" },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-[#0E292F]/30 mb-1.5">{label}</p>
                  <p className="text-[14px] font-bold text-black">{value}</p>
                </div>
              ))}
            </div>

            {/* About card: metadata + docs + amenities */}
            <div className="bg-white border border-[#0E292F]/8 divide-y divide-[#0E292F]/5 rounded-2xl overflow-hidden">

              {/* Metadata grid */}
              <div className="p-6 sm:p-8">
                <div className="grid grid-cols-2 gap-y-7 gap-x-6">
                  {[
                    { Icon: Building2, value: property.category || "Land",             label: "Property Type"   },
                    { Icon: Trees,     value: `${property.area.toLocaleString()} SQM`, label: "Land Size"       },
                    { Icon: Clock,     value: property.durationText,                   label: "on Listing"      },
                    { Icon: Network,   value: property.listingId,                      label: "Listing ID"      },
                  ].map(({ Icon, value, label }) => (
                    <div key={label} className="flex items-start gap-3.5">
                      <div className="w-9 h-9 bg-[#F5F5F5] border border-[#0E292F]/8 flex items-center justify-center shrink-0 rounded-lg">
                        <Icon className="w-4 h-4 text-[#3D7188]" strokeWidth={1.5} />
                      </div>
                      <div>
                        <p className="text-[14px] font-bold text-black leading-tight mb-0.5">{value}</p>
                        <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#0E292F]/30">{label}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Documentation */}
              <div className="p-6 sm:p-8">
                <h2 className="font-serif text-[18px] font-bold text-[#0E292F] tracking-tight mb-5">
                  Documentation Status
                </h2>
                <div className="space-y-4">
                  {docs.map((doc: { name: string; available: boolean }) => (
                    <div key={doc.name} className="flex items-center gap-3.5">
                      <div className={`w-8 h-8 border flex items-center justify-center shrink-0 rounded-lg ${
                        doc.available ? "bg-[#F0FBF6] border-[#0E9F6E]/15" : "bg-[#FEF2F2] border-red-100"
                      }`}>
                        {doc.available
                          ? <CheckCircle2 className="w-3.5 h-3.5 text-[#0E9F6E]" />
                          : <AlertCircle  className="w-3.5 h-3.5 text-red-400" />
                        }
                      </div>
                      <div>
                        <p className="text-[13px] font-bold text-black">{doc.name}</p>
                        <p className={`text-[10px] font-bold uppercase tracking-[0.08em] mt-0.5 ${
                          doc.available ? "text-[#0E9F6E]" : "text-red-400"
                        }`}>
                          {doc.available ? "Available" : "Not Available"}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Amenities */}
              <div className="p-6 sm:p-8">
                <h2 className="font-serif text-[18px] font-bold text-[#0E292F] tracking-tight mb-5">
                  What's Special?
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-0">
                  {features.map((feat: { name: string; icon?: React.ReactNode }, i: number) => (
                    <div
                      key={feat.name}
                      className={`flex items-center gap-3 py-3 border-b border-[#0E292F]/5 ${
                        i % 2 === 0 ? "sm:pr-6 sm:border-r sm:border-[#0E292F]/5" : "sm:pl-6"
                      }`}
                    >
                      <div className="w-7 h-7 bg-[#F5F5F5] border border-[#0E292F]/6 flex items-center justify-center shrink-0 rounded-lg">
                        {feat.icon}
                      </div>
                      <span className="text-[12px] font-medium text-[#0E292F]/80">{feat.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* ── RIGHT STICKY RAIL ── */}
          <aside className="lg:col-span-5 lg:sticky lg:top-14 space-y-4">

            {/* Agent contact card */}
            <div className="bg-white border border-[#0E292F]/8 overflow-hidden rounded-2xl">

              {/* Agent header */}
              <div className="flex items-center gap-3 p-5 border-b border-[#0E292F]/6">
                <div className="w-10 h-10 rounded-xl overflow-hidden bg-[#F5F5F5] border border-[#0E292F]/10 flex items-center justify-center shrink-0">
                  <img
                    src={logoMain}
                    alt="Vivar Realty"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>

              {/* Contact form */}
              <div className="p-5 space-y-3">
                <div>
                  <label className="block text-[9px] font-bold uppercase tracking-[0.12em] text-black mb-1.5">First name *</label>
                  <input
                    value={form.firstName}
                    onChange={e => setForm(f => ({ ...f, firstName: e.target.value }))}
                    placeholder="First name"
                    className="w-full px-3 py-2.5 border border-[#0E292F]/12 text-[13px] text-[#0E292F] placeholder-[#0E292F]/25 focus:outline-none focus:border-[#3D7188] focus:ring-1 focus:ring-[#3D7188]/15 transition-colors bg-white"
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-bold uppercase tracking-[0.12em] text-black mb-1.5">Email *</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    placeholder="Your email address"
                    className="w-full px-3 py-2.5 border border-[#0E292F]/12 text-[13px] text-[#0E292F] placeholder-[#0E292F]/25 focus:outline-none focus:border-[#3D7188] focus:ring-1 focus:ring-[#3D7188]/15 transition-colors bg-white"
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-bold uppercase tracking-[0.12em] text-black mb-1.5">Phone number</label>
                  <div className="flex gap-2">
                    <div className="flex items-center gap-1.5 px-3 py-2.5 border border-[#0E292F]/12 text-[12px] text-[#0E292F]/60 shrink-0 bg-[#F5F5F5]">
                      <span className="text-base leading-none">🇳🇬</span>
                      <span className="text-[10px] font-bold">+234</span>
                      <ChevronDown className="w-3 h-3 text-[#0E292F]/30" />
                    </div>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                      placeholder="080 0000 0000"
                      className="flex-1 px-3 py-2.5 border border-[#0E292F]/12 text-[13px] text-[#0E292F] placeholder-[#0E292F]/25 focus:outline-none focus:border-[#3D7188] focus:ring-1 focus:ring-[#3D7188]/15 transition-colors bg-white"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[9px] font-bold uppercase tracking-[0.12em] text-black mb-1.5">Message *</label>
                  <textarea
                    rows={3}
                    value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    placeholder="Ask the agent for more information about this property…"
                    className="w-full px-3 py-2.5 border border-[#0E292F]/12 text-[13px] text-[#0E292F] placeholder-[#0E292F]/25 focus:outline-none focus:border-[#3D7188] focus:ring-1 focus:ring-[#3D7188]/15 transition-colors resize-none bg-white"
                  />
                </div>

                {/* Send message — dark button */}
                <div className="pt-1">
                  <motion.button
                    whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}
                    disabled={submitting}
                    onClick={() => {
                      setSubmitting(true);
                      setTimeout(() => setSubmitting(false), 2000);
                    }}
                    className="inline-flex items-center w-full justify-between pl-5 pr-1.5 py-1.5 rounded-[8px] bg-[#0E292F] text-white hover:bg-white hover:text-[#0E292F] border border-[#0E292F] transition-all duration-300 group font-sans text-[10px] font-bold tracking-widest uppercase whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="w-full text-center pr-2">
                      {submitting ? "Sending…" : "Send a Message"}
                    </span>
                    <div className="flex items-center justify-center w-7 h-7 rounded-[6px] bg-white text-[#0E292F] group-hover:bg-[#0E292F] group-hover:text-white transition-all duration-300 shrink-0">
                      {submitting
                        ? <Loader2 className="w-[13px] h-[13px] animate-spin" />
                        : <ArrowUpRight size={13} strokeWidth={2.5} />
                      }
                    </div>
                  </motion.button>
                </div>

                {/* Call now — white/outlined button */}
                <div>
                  <motion.a
                    href={`tel:${property.agentPhone}`}
                    whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center w-full justify-between pl-5 pr-1.5 py-1.5 rounded-[8px] bg-white text-[#0E292F] hover:bg-[#0E292F] hover:text-white border border-[#0E292F] transition-all duration-300 group font-sans text-[10px] font-bold tracking-widest uppercase whitespace-nowrap"
                  >
                    <span className="w-full text-center pr-2 flex items-center justify-center gap-2">
                      <Phone className="w-3.5 h-3.5" />
                      Call Now
                    </span>
                    <div className="flex items-center justify-center w-7 h-7 rounded-[6px] bg-[#0E292F] text-white group-hover:bg-white group-hover:text-[#0E292F] transition-all duration-300 shrink-0">
                      <ArrowUpRight size={13} strokeWidth={2.5} />
                    </div>
                  </motion.a>
                </div>

              </div>
            </div>

            {/* Map card */}
            <MapCard property={property} />

          </aside>
        </div>
      </div>

      {/* ── LIGHTBOX ── */}
      {lightboxOpen && imageList.length > 0 && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(14, 41, 47, 0.55)", backdropFilter: "blur(20px) saturate(1.4)", WebkitBackdropFilter: "blur(20px) saturate(1.4)" }}
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

          <div className="relative w-full max-w-5xl max-h-[84vh]" onClick={e => e.stopPropagation()}>
            <img src={imageList[currentImageIndex]} alt=""
              className="w-full max-h-[84vh] object-contain" />
          </div>

          {imageList.length > 1 && (
            <>
              <button
                onClick={e => { e.stopPropagation(); handlePrev(); }}
                className="absolute left-5 top-1/2 -translate-y-1/2 w-11 h-11 bg-white/15 hover:bg-white/25 backdrop-blur-sm flex items-center justify-center transition-colors z-50"
              >
                <ChevronLeft className="w-5 h-5 text-white" />
              </button>
              <button
                onClick={e => { e.stopPropagation(); handleNext(); }}
                className="absolute right-5 top-1/2 -translate-y-1/2 w-11 h-11 bg-white/15 hover:bg-white/25 backdrop-blur-sm flex items-center justify-center transition-colors z-50"
              >
                <ChevronRight className="w-5 h-5 text-white" />
              </button>
            </>
          )}

          {/* Thumbnail strip */}
          {imageList.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 overflow-x-auto max-w-[90vw] px-4">
              {imageList.map((src: string, i: number) => (
                <button
                  key={i}
                  onClick={e => { e.stopPropagation(); setCurrentImageIndex(i); }}
                  className={`flex-shrink-0 w-14 h-10 overflow-hidden border-2 transition-all rounded-lg ${
                    i === currentImageIndex ? "border-white opacity-100" : "border-transparent opacity-40 hover:opacity-70"
                  }`}
                >
                  <img src={src} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ── MAP CARD ── */
function MapCard({ property }: { property: any }) {
  const address = property.address || "12a Aso Street, Parkview Estate, Ikoyi";
  const lat = property.lat || 6.4550;
  const lng = property.lng || 3.4322;

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
          src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY&q=${embedQuery}&zoom=15`}
        />
      </div>
      <div className="px-5 py-4 flex items-start justify-between gap-3">
        <div>
          <p className="text-[8px] font-bold uppercase tracking-[0.16em] text-[#3D7188] mb-1">Location</p>
          <p className="font-serif text-[13px] font-bold text-[#0E292F] tracking-tight leading-snug">{property.city}, {property.state}</p>
          <p className="text-[11px] text-[#0E292F]/35 font-medium mt-0.5 leading-snug">{address}</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
          onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`, "_blank")}
          className="inline-flex items-center justify-between pl-3 pr-1 py-1 rounded-[8px] bg-[#0E292F] text-white hover:bg-white hover:text-[#0E292F] border border-[#0E292F] group/map font-sans text-[8px] font-bold tracking-widest uppercase whitespace-nowrap shrink-0 mt-0.5 transition-all duration-300"
        >
          <span className="pr-2 group-hover/map:translate-x-0.5 transition-transform duration-300">Map</span>
          <div className="flex items-center justify-center w-6 h-6 rounded-[5px] bg-white text-[#0E292F] group-hover/map:bg-[#0E292F] group-hover/map:text-white transition-all duration-300">
            <ArrowUpRight size={11} strokeWidth={2.5} className="group-hover/map:rotate-45 transition-transform duration-300" />
          </div>
        </motion.button>
      </div>
    </div>
  );
}
// "use client";

// import { useEffect, useState, useCallback, useRef } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import { supabase } from "@/lib/supabase/client";
// import { trackPropertyView } from "@/lib/trackPageView";

// import {
//   ArrowLeft, Bookmark, CheckCircle2, XCircle, X, ChevronRight, ChevronLeft,
//   Phone, Shield, Droplets, Video, Trash2, Milestone, AlertCircle,
//   Building2, Trees, Clock, Network, Zap, ArrowUpRight,
// } from "lucide-react";
// import { FaWhatsapp, FaRegComment, FaRegStar } from "react-icons/fa6";

// import PageNavbar from "@/components/layout/PageNavbar";

// export default function PropertyDetailPage() {
//   const { id } = useParams<{ id: string }>();
//   const navigate = useNavigate();
//   const [property, setProperty] = useState<any>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [lightboxOpen, setLightboxOpen] = useState(false);

//   const touchStartX = useRef<number | null>(null);
//   const touchEndX = useRef<number | null>(null);

//   const fetchProperty = useCallback(async () => {
//     if (!id) return;
//     try {
//       setLoading(true);
//       setError(null);
//       const { data, error: fetchError } = await supabase
//         .from("properties")
//         .select("*, property_images(*)")
//         .eq("id", id)
//         .single();
//       if (fetchError) throw fetchError;
//       const mapped = {
//         ...data,
//         type: data.listing_type || "sale",
//         title: data.title || "Premium Property Asset",
//         description: data.description || "No description provided for this listing.",
//         price: data.price || 0,
//         area: data.area_sqft || 0,
//         listingId: data.listing_id || data.id?.substring(0, 8).toUpperCase() || "N/A",
//         durationText: data.listing_duration || "3 Months",
//         state: data.state || "Lagos",
//         lga: data.lga || "Ibeju-Lekki",
//         city: data.city || "Lakowe",
//         address: data.address || "Lakowe, Lagos",
//         lat: data.latitude || 6.4281,
//         lng: data.longitude || 3.4219,
//         agentPhone: data.agent_phone || "+2348137478998",
//         images: (data.property_images || []).map((img: any) => img.url),
//       };
//       setProperty(mapped);
//       trackPropertyView(mapped.id);
//     } catch (err: any) {
//       setError(err.message || "Unable to load property metadata");
//     } finally {
//       setLoading(false);
//     }
//   }, [id]);

//   useEffect(() => { fetchProperty(); }, [fetchProperty]);
//   useEffect(() => {
//     document.body.style.overflow = lightboxOpen ? "hidden" : "";
//     return () => { document.body.style.overflow = ""; };
//   }, [lightboxOpen]);

//   const formatPrice = (price: any) => {
//     const num = Number(price);
//     return isNaN(num) ? "0" : num.toLocaleString();
//   };

//   const handleNextImage = () => {
//     if (!property?.images?.length) return;
//     setCurrentImageIndex((prev) => (prev === property.images.length - 1 ? 0 : prev + 1));
//   };
//   const handlePrevImage = () => {
//     if (!property?.images?.length) return;
//     setCurrentImageIndex((prev) => (prev === 0 ? property.images.length - 1 : prev - 1));
//   };
//   const handleTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.targetTouches[0].clientX; };
//   const handleTouchMove  = (e: React.TouchEvent) => { touchEndX.current   = e.targetTouches[0].clientX; };
//   const handleTouchEnd   = () => {
//     if (!touchStartX.current || !touchEndX.current) return;
//     const diff = touchStartX.current - touchEndX.current;
//     if (diff >  40) handleNextImage();
//     if (diff < -40) handlePrevImage();
//     touchStartX.current = null;
//     touchEndX.current   = null;
//   };

//   const docs = property?.documentation || [
//     { name: "Registered Survey",  available: true  },
//     { name: "Deed of Assignment", available: true  },
//     { name: "C of O",             available: true  },
//     { name: "Governor's Consent", available: false },
//   ];

//   const features = property?.features || [
//     { name: "24hrs Electricity",           icon: <Zap     className="w-3.5 h-3.5 text-[#3D7188]" /> },
//     { name: "24hrs Security",              icon: <Shield  className="w-3.5 h-3.5 text-[#3D7188]" /> },
//     { name: "Borehole",                    icon: <Droplets className="w-3.5 h-3.5 text-[#3D7188]" /> },
//     { name: "CCTV",                        icon: <Video   className="w-3.5 h-3.5 text-[#3D7188]" /> },
//     { name: "Waste Management",            icon: <Trash2  className="w-3.5 h-3.5 text-[#3D7188]" /> },
//     { name: "Tennis Court",                icon: <Milestone className="w-3.5 h-3.5 text-[#3D7188]" /> },
//     { name: "Security House",              icon: <Shield  className="w-3.5 h-3.5 text-[#3D7188]" /> },
//     { name: "Green Area / Garden",         icon: <Trees   className="w-3.5 h-3.5 text-[#3D7188]" /> },
//     { name: "Golf Court",                  icon: <Milestone className="w-3.5 h-3.5 text-[#3D7188]" /> },
//     { name: "Call-to-Access / ID Pass",    icon: <Shield  className="w-3.5 h-3.5 text-[#3D7188]" /> },
//   ];

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-[#F5F5F5] antialiased pt-[72px] font-inter">
//         <PageNavbar />
//         <div className="max-w-6xl mx-auto px-4 py-6">
//           <div className="hidden sm:grid grid-cols-12 gap-3.5" style={{ height: 450 }}>
//             <div className="col-span-8 bg-stone-200 rounded-2xl animate-pulse" />
//             <div className="col-span-4 flex flex-col gap-3.5">
//               <div className="bg-stone-200 rounded-2xl animate-pulse" style={{ flex: "1 1 0" }} />
//               <div className="bg-stone-200 rounded-2xl animate-pulse" style={{ flex: "1 1 0" }} />
//             </div>
//           </div>
//           <div className="mt-6 grid grid-cols-12 gap-6">
//             <div className="col-span-7 space-y-4">
//               <div className="h-10 bg-stone-200 rounded-xl animate-pulse w-1/2" />
//               <div className="h-4 bg-stone-200 rounded animate-pulse w-3/4" />
//               <div className="h-48 bg-stone-200 rounded-2xl animate-pulse" />
//             </div>
//             <div className="col-span-5 h-60 bg-stone-200 rounded-2xl animate-pulse" />
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (error || !property) {
//     return (
//       <div className="min-h-screen bg-[#F5F5F5] antialiased text-stone-900 pt-[72px]">
//         <PageNavbar />
//         <div className="min-h-[60vh] flex items-center justify-center px-6">
//           <div className="text-center max-w-md bg-white rounded-2xl border border-stone-200/60 p-10 shadow-sm">
//             <div className="w-12 h-12 mx-auto mb-5 rounded-2xl bg-[#F5F5F5] flex items-center justify-center">
//               <XCircle className="w-6 h-6 text-stone-300" />
//             </div>
//             <h2 className="text-lg font-black text-[#0E292F] tracking-tight mb-2">Property Offline</h2>
//             <p className="text-sm text-stone-400 mb-7 font-medium">{error || "Listing data unavailable."}</p>
//             <motion.button
//               onClick={() => navigate("/properties")}
//               whileHover={{ scale: 1.02 }}
//               whileTap={{ scale: 0.97 }}
//               className="inline-flex items-center gap-5 pl-5 pr-2 py-2 rounded-[10px] bg-[#0E292F] text-white text-[10px] font-black tracking-widest uppercase shadow-md group"
//             >
//               <span className="group-hover:translate-x-0.5 transition-transform duration-300">Back to Listings</span>
//               <div className="flex items-center justify-center w-7 h-7 rounded-[6px] bg-white/15 group-hover:bg-white/25 transition-all">
//                 <ArrowLeft size={12} strokeWidth={2.5} />
//               </div>
//             </motion.button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   const imageList: string[] = property.images || [];
//   const globalPlaceholder = "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80";
//   const mainImg = imageList[0] ?? globalPlaceholder;
//   const thumb1  = imageList[1] ?? null;
//   const thumb2  = imageList[2] ?? null;

//   return (
//     <div className="min-h-screen bg-[#F5F5F5] antialiased text-[#0E292F] flex flex-col pt-0 sm:pt-[72px] font-inter selection:bg-[#0E292F]/10">
//       <PageNavbar />

//       {/* ── BREADCRUMB BAR ── */}
//       <div className="w-full hidden sm:block bg-white border-b border-stone-200/60">
//         <div className="max-w-6xl mx-auto px-4 py-3.5 flex items-center justify-between">
//           {/* Left — back + crumbs */}
//           <div className="flex items-center gap-3">
//             <button
//               onClick={() => navigate("/properties")}
//               className="inline-flex items-center justify-center w-8 h-8 rounded-xl bg-[#F5F5F5] border border-stone-200/60 hover:bg-stone-100 hover:border-stone-300 transition-all shrink-0"
//             >
//               <ArrowLeft className="w-4 h-4 text-[#0E292F]" />
//             </button>
//             <nav className="flex items-center gap-1.5 text-[10px] font-bold tracking-[0.08em] uppercase">
//               <button onClick={() => navigate("/")} className="text-[#3D7188] hover:text-[#0E292F] transition-colors">
//                 {property.state}
//               </button>
//               <span className="text-stone-300">›</span>
//               <button onClick={() => navigate("/properties")} className="text-[#3D7188] hover:text-[#0E292F] transition-colors">
//                 {property.lga}
//               </button>
//               <span className="text-stone-300">›</span>
//               <span className="text-[#0E292F]">{property.city}</span>
//               <span className="text-stone-300">›</span>
//               <span className="text-[#0E292F]/40 font-normal normal-case tracking-normal">Listing Details</span>
//             </nav>
//           </div>

//           {/* Right — actions */}
//           <div className="flex items-center gap-1">
//             {[
//               { icon: <Bookmark className="w-3.5 h-3.5" />, label: "Save" },
//               { icon: <FaRegStar className="w-3.5 h-3.5" />, label: "Review" },
//               { icon: <FaRegComment className="w-3.5 h-3.5" />, label: "Comment" },
//             ].map(({ icon, label }) => (
//               <button
//                 key={label}
//                 className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-bold text-[#0E292F]/60 hover:text-[#0E292F] hover:bg-[#F5F5F5] transition-all"
//               >
//                 {icon}
//                 {label}
//               </button>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* ── MAIN CONTENT ── */}
//       <div className="max-w-6xl mx-auto px-4 pb-16 w-full flex-grow">

//         {/* ── GALLERY ── */}
//         <div className="mb-6 w-full pt-5">

//           {/* DESKTOP */}
//           <div className="hidden sm:grid grid-cols-12 gap-3 w-full" style={{ height: 460 }}>

//             {/* Main image */}
//             <div
//               className="col-span-8 relative rounded-2xl overflow-hidden bg-stone-200 cursor-pointer group"
//               onClick={() => { setCurrentImageIndex(0); setLightboxOpen(true); }}
//             >
//               <img
//                 src={mainImg}
//                 alt={property.title}
//                 className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
//               />
//               <div className="absolute inset-0 bg-black/0 group-hover:bg-black/8 transition-colors duration-300" />
//               {/* Photo count pill */}
//               {imageList.length > 1 && (
//                 <div className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#0E292F]/80 backdrop-blur-md rounded-lg border border-white/10 z-10">
//                   <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                     <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
//                   </svg>
//                   <span className="text-white text-[10px] font-black tracking-wide">{imageList.length} Photos</span>
//                 </div>
//               )}
//             </div>

//             {/* Right thumbs */}
//             <div className="col-span-4 flex flex-col gap-3" style={{ height: 460 }}>
//               {[thumb1, thumb2].map((thumb, i) => (
//                 <div
//                   key={i}
//                   className="relative rounded-2xl overflow-hidden bg-[#F5F5F5] cursor-pointer group border border-stone-200/40"
//                   style={{ flex: "1 1 0", minHeight: 0 }}
//                   onClick={() => { setCurrentImageIndex(i + 1); setLightboxOpen(true); }}
//                 >
//                   {thumb ? (
//                     <>
//                       <img src={thumb} alt="" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]" />
//                       <div className="absolute inset-0 bg-black/0 group-hover:bg-black/8 transition-colors duration-300" />
//                       {i === 1 && imageList.length > 3 && (
//                         <div className="absolute inset-0 bg-[#0E292F]/50 backdrop-blur-[2px] flex items-center justify-center">
//                           <div className="text-center">
//                             <p className="text-white text-2xl font-black">+{imageList.length - 3}</p>
//                             <p className="text-white/70 text-[10px] font-bold uppercase tracking-wider mt-0.5">more photos</p>
//                           </div>
//                         </div>
//                       )}
//                     </>
//                   ) : (
//                     <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#F5F5F5] border border-dashed border-stone-200 rounded-2xl">
//                       <span className="text-xl mb-1">📷</span>
//                       <p className="text-[10px] font-bold text-stone-400">{i === 0 ? "Interior" : "Exterior"} view pending</p>
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* MOBILE */}
//           <div
//             className="sm:hidden relative w-screen -mx-4 bg-stone-200 touch-pan-y overflow-hidden"
//             style={{ height: 320 }}
//             onTouchStart={handleTouchStart}
//             onTouchMove={handleTouchMove}
//             onTouchEnd={handleTouchEnd}
//           >
//             {imageList.length > 0 ? (
//               <>
//                 <img src={imageList[currentImageIndex]} alt="" className="absolute inset-0 w-full h-full object-cover pointer-events-none" />
//                 <div className="absolute inset-0 bg-gradient-to-t from-[#0E292F]/50 to-transparent pointer-events-none" />
//                 <button
//                   onClick={() => navigate("/properties")}
//                   className="absolute top-12 left-4 z-10 flex items-center justify-center w-9 h-9 rounded-xl bg-[#0E292F]/60 backdrop-blur-sm border border-white/20"
//                 >
//                   <ArrowLeft className="w-4 h-4 text-white" />
//                 </button>
//                 <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
//                   {imageList.map((_, idx) => (
//                     <div key={idx} className={`h-1 rounded-full transition-all duration-300 ${idx === currentImageIndex ? "bg-white w-4" : "bg-white/40 w-1.5"}`} />
//                   ))}
//                 </div>
//                 <div className="absolute bottom-3 right-3 bg-[#0E292F]/60 backdrop-blur-sm px-2.5 py-1 rounded-lg border border-white/10">
//                   <span className="text-white text-[10px] font-black">{currentImageIndex + 1}/{imageList.length}</span>
//                 </div>
//               </>
//             ) : (
//               <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-stone-400 bg-[#F5F5F5]">
//                 <button onClick={() => navigate("/properties")} className="absolute top-12 left-4 z-10 w-9 h-9 rounded-xl bg-[#0E292F]/20 flex items-center justify-center">
//                   <ArrowLeft className="w-4 h-4 text-[#0E292F]" />
//                 </button>
//                 <span className="text-2xl">📷</span>
//                 <span className="text-xs font-semibold">Image Portfolio Pending</span>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* ── SPLIT LAYOUT ── */}
//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

//           {/* ── LEFT COLUMN ── */}
//           <div className="lg:col-span-7 space-y-5">

//             {/* Price block */}
//             <div className="bg-white rounded-2xl border border-stone-200/60 p-6 space-y-4">
//               {/* Status pill */}
//               <div className="flex items-center gap-2">
//                 <span className="w-2 h-2 rounded-full bg-[#0E9F6E]" />
//                 <span className="text-[10px] font-black uppercase tracking-[0.12em] text-[#0E292F]/60">
//                   {property.type === "rent" ? "For Rent" : "For Sale"} · Direct to Seller's Agent
//                 </span>
//               </div>

//               {/* Price */}
//               <div>
//                 <h1 className="text-3xl sm:text-4xl font-black text-[#0E292F] tracking-tight leading-none">
//                   ₦{formatPrice(property.price)}
//                 </h1>
//                 {property.area > 0 && (
//                   <p className="text-[#3D7188] font-bold text-sm tracking-wide mt-1.5">
//                     {property.area.toLocaleString()} SQM
//                   </p>
//                 )}
//               </div>

//               {/* Contact CTAs */}
//               <div className="flex flex-wrap gap-3 pt-1">
//                 <motion.a
//                   href={`tel:${property.agentPhone}`}
//                   whileHover={{ scale: 1.02 }}
//                   whileTap={{ scale: 0.97 }}
//                   className="inline-flex items-center gap-5 pl-5 pr-2 py-2 rounded-[10px] bg-[#0E292F] text-white text-[10px] font-black tracking-widest uppercase shadow-md group/btn"
//                 >
//                   <span className="inline-flex items-center gap-2 group-hover/btn:translate-x-0.5 transition-transform duration-300">
//                     <Phone className="w-3.5 h-3.5" /> Call Agent
//                   </span>
//                   <div className="flex items-center justify-center w-7 h-7 rounded-[6px] bg-white/15 group-hover/btn:bg-white/25 transition-all">
//                     <ArrowUpRight size={12} strokeWidth={2.5} className="group-hover/btn:rotate-45 transition-transform duration-300" />
//                   </div>
//                 </motion.a>

//                 <motion.a
//                   href={`https://wa.me/${property.agentPhone.replace(/\+/g, "")}`}
//                   target="_blank"
//                   rel="noreferrer"
//                   whileHover={{ scale: 1.02 }}
//                   whileTap={{ scale: 0.97 }}
//                   className="inline-flex items-center gap-5 pl-5 pr-2 py-2 rounded-[10px] bg-white border border-stone-200/60 text-[#0E292F] text-[10px] font-black tracking-widest uppercase shadow-sm group/btn hover:border-[#3D7188] transition-all"
//                 >
//                   <span className="inline-flex items-center gap-2 group-hover/btn:translate-x-0.5 transition-transform duration-300">
//                     <FaWhatsapp className="w-3.5 h-3.5 text-[#0E9F6E]" /> WhatsApp
//                   </span>
//                   <div className="flex items-center justify-center w-7 h-7 rounded-[6px] bg-[#F5F5F5] group-hover/btn:bg-stone-100 transition-all">
//                     <ArrowUpRight size={12} strokeWidth={2.5} className="group-hover/btn:rotate-45 transition-transform duration-300" />
//                   </div>
//                 </motion.a>
//               </div>
//             </div>

//             {/* About + Docs + Amenities */}
//             <div className="bg-white rounded-2xl border border-stone-200/60 overflow-hidden divide-y divide-stone-100">

//               {/* About */}
//               <div className="p-6 sm:p-8">
//                 <h2 className="text-[11px] font-black uppercase tracking-[0.14em] text-[#3D7188] mb-4">About This Property</h2>
//                 <p className="text-[14px] sm:text-[15px] font-medium text-[#0E292F]/60 leading-relaxed mb-8 whitespace-pre-line">
//                   {property.description}
//                 </p>
//                 <div className="grid grid-cols-2 gap-6">
//                   {[
//                     { Icon: Building2, value: property.category || "Land",             label: "Property Type" },
//                     { Icon: Trees,     value: `${property.area.toLocaleString()} SQM`, label: "Land Size"     },
//                     { Icon: Clock,     value: property.durationText,                   label: "Listing Duration" },
//                     { Icon: Network,   value: property.listingId,                      label: "Listing ID"    },
//                   ].map(({ Icon, value, label }) => (
//                     <div key={label} className="flex items-start gap-3.5">
//                       <div className="w-9 h-9 rounded-xl bg-[#F5F5F5] flex items-center justify-center shrink-0">
//                         <Icon className="w-4 h-4 text-[#3D7188] stroke-[1.75]" />
//                       </div>
//                       <div className="min-w-0">
//                         <p className="text-[15px] sm:text-[16px] font-black text-[#0E292F] tracking-tight truncate">{value}</p>
//                         <p className="text-[11px] font-medium text-[#0E292F]/40 mt-0.5">{label}</p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Documentation */}
//               <div className="p-6 sm:p-8">
//                 <h2 className="text-[11px] font-black uppercase tracking-[0.14em] text-[#3D7188] mb-5">Documentation Status</h2>
//                 <div className="space-y-4">
//                   {docs.map((doc: { name: string; available: boolean }) => (
//                     <div key={doc.name} className="flex items-center gap-3.5">
//                       <div className={`w-8 h-8 rounded-xl border flex items-center justify-center shrink-0 ${
//                         doc.available ? "bg-green-50 border-green-100" : "bg-red-50 border-red-100"
//                       }`}>
//                         {doc.available
//                           ? <CheckCircle2 className="w-4 h-4 text-[#0E9F6E]" />
//                           : <AlertCircle  className="w-4 h-4 text-[#E02424]" />
//                         }
//                       </div>
//                       <div>
//                         <span className="text-[14px] sm:text-[15px] font-bold text-[#0E292F] block">{doc.name}</span>
//                         <span className={`text-[11px] font-bold mt-0.5 block ${doc.available ? "text-[#0E9F6E]" : "text-[#E02424]"}`}>
//                           {doc.available ? "Available" : "Not Available"}
//                         </span>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Amenities */}
//               <div className="p-6 sm:p-8">
//                 <h2 className="text-[11px] font-black uppercase tracking-[0.14em] text-[#3D7188] mb-5">What's Special?</h2>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//                   {features.map((feat: { name: string; icon?: React.ReactNode }) => (
//                     <div key={feat.name} className="flex items-center gap-3 py-1">
//                       <div className="w-7 h-7 rounded-lg bg-[#F5F5F5] border border-stone-200/60 flex items-center justify-center shrink-0">
//                         {feat.icon || <span className="text-[#3D7188] text-xs">✦</span>}
//                       </div>
//                       <span className="text-[13px] font-semibold text-[#0E292F]/70">{feat.name}</span>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* ── RIGHT SIDEBAR ── */}
//           <aside className="lg:col-span-5 lg:sticky lg:top-[90px]">
//             <MapCard property={property} />
//           </aside>

//         </div>
//       </div>

//       {/* ── LIGHTBOX ── */}
//       {lightboxOpen && imageList.length > 0 && (
//         <div
//           className="fixed inset-0 z-50 bg-[#0E292F]/90 backdrop-blur-lg flex items-center justify-center p-4"
//           onClick={() => setLightboxOpen(false)}
//         >
//           <button
//             onClick={() => setLightboxOpen(false)}
//             className="absolute top-5 right-5 p-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all z-50 border border-white/10"
//           >
//             <X className="w-5 h-5" />
//           </button>

//           <div className="relative w-full max-w-4xl max-h-[80vh]" onClick={(e) => e.stopPropagation()}>
//             <img
//               src={imageList[currentImageIndex]}
//               alt=""
//               className="w-full h-full max-h-[80vh] object-contain rounded-2xl shadow-2xl"
//             />
//             {imageList.length > 1 && (
//               <>
//                 <button
//                   onClick={handlePrevImage}
//                   className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl border border-white/10 transition-all"
//                 >
//                   <ChevronLeft className="w-5 h-5" />
//                 </button>
//                 <button
//                   onClick={handleNextImage}
//                   className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl border border-white/10 transition-all"
//                 >
//                   <ChevronRight className="w-5 h-5" />
//                 </button>
//               </>
//             )}
//             <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-[#0E292F]/60 backdrop-blur-sm px-3 py-1.5 rounded-lg">
//               <span className="text-white text-[11px] font-black">{currentImageIndex + 1} / {imageList.length}</span>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// // ── MAP CARD ──
// function MapCard({ property }: { property: any }) {
//   const staticMapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${property.lat},${property.lng}&zoom=15&size=750x260&scale=2&maptype=roadmap&sensor=false&style=feature:administrative|element:labels.text.fill|color:0x444444&style=feature:landscape|element:all|color:0xf2f2f2&style=feature:poi|element:all|visibility:off&style=feature:road|element:all|saturation:-100|lightness:45&style=feature:road.highway|element:all|visibility:simplified&style=feature:road.arterial|element:labels.icon|visibility:off&style=feature:transit|element:all|visibility:off&style=feature:water|element:all|color:0xcde2e6|visibility:on`;

//   return (
//     <div className="bg-white border border-stone-200/60 rounded-2xl overflow-hidden shadow-[0_2px_12px_rgba(14,41,47,0.04)] font-inter">
//       {/* Map */}
//       <div className="w-full h-[160px] bg-[#F5F5F5] relative overflow-hidden group">
//         <div
//           className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-[1.01]"
//           style={{ backgroundImage: `url('${staticMapUrl}')` }}
//         />
//         {/* Pin */}
//         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none">
//           <div className="absolute inset-0 w-11 h-11 -translate-x-1/2 -translate-y-1/2 bg-[#3D7188]/20 rounded-full animate-ping" style={{ animationDuration: "2500ms", left: "50%", top: "50%" }} />
//           <div className="w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center">
//             <div className="w-[18px] h-[18px] bg-[#3D7188] rounded-full" />
//           </div>
//         </div>
//       </div>

//       {/* Location label */}
//       <div className="px-5 py-4 border-b border-stone-100">
//         <p className="text-[13px] font-bold text-[#0E292F] leading-tight">
//           {property.address || `${property.city}, ${property.state}`}
//         </p>
//         <p className="text-[11px] text-[#3D7188] font-medium mt-0.5">{property.city}, {property.state}</p>
//       </div>

//       {/* Actions */}
//       <div className="p-5 space-y-3">
//         <motion.button
//           onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${property.lat},${property.lng}`, "_blank")}
//           whileHover={{ scale: 1.02 }}
//           whileTap={{ scale: 0.97 }}
//           className="w-full inline-flex items-center justify-between gap-3 pl-5 pr-2 py-2.5 rounded-[10px] bg-[#0E292F] text-white text-[10px] font-black tracking-widest uppercase shadow-md group/btn"
//         >
//           <span className="group-hover/btn:translate-x-0.5 transition-transform duration-300">View on Google Maps</span>
//           <div className="flex items-center justify-center w-8 h-8 rounded-[6px] bg-white/15 group-hover/btn:bg-white/25 transition-all">
//             <ArrowUpRight size={13} strokeWidth={2.5} className="group-hover/btn:rotate-45 transition-transform duration-300" />
//           </div>
//         </motion.button>

//         <motion.a
//           href={`tel:${property.agentPhone}`}
//           whileHover={{ scale: 1.01 }}
//           whileTap={{ scale: 0.98 }}
//           className="w-full inline-flex items-center justify-between gap-3 pl-5 pr-2 py-2.5 rounded-[10px] bg-white border border-stone-200/60 text-[#0E292F] text-[10px] font-black tracking-widest uppercase hover:border-[#3D7188] transition-all group/btn"
//         >
//           <span className="inline-flex items-center gap-2 group-hover/btn:translate-x-0.5 transition-transform duration-300">
//             <Phone className="w-3.5 h-3.5 text-[#3D7188]" /> {property.agentPhone}
//           </span>
//           <div className="flex items-center justify-center w-8 h-8 rounded-[6px] bg-[#F5F5F5] group-hover/btn:bg-stone-100 transition-all">
//             <ArrowUpRight size={13} strokeWidth={2.5} className="group-hover/btn:rotate-45 transition-transform duration-300" />
//           </div>
//         </motion.a>
//       </div>

//       {/* Agent note */}
//       <div className="px-5 pb-5">
//         <p className="text-[10px] font-medium text-[#0E292F]/30 leading-relaxed">
//           Listed by Vivar Realty · Direct to seller's agent · Verified listing
//         </p>
//       </div>
//     </div>
//   );
// }