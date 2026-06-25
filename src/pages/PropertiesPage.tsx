// import { useEffect, useState, useCallback } from "react";
// import { useNavigate } from "react-router-dom";
// import { supabase } from "@/lib/supabase/client";
// import { trackPropertyView } from "@/lib/trackPageView";
// import { PropertyCard } from "@/components/layout/Card";
// import {
//   Search, Home, Filter, X
// } from "lucide-react";

// type PropertyType = "sale" | "rent";

// const propertyTypes: { value: PropertyType | "all"; label: string }[] = [
//   { value: "all", label: "All Real Estate" },
//   { value: "sale", label: "For Sale" },
//   { value: "rent", label: "For Rent" },
// ];

// export default function PropertiesListingPage() {
//   const navigate = useNavigate();
//   const [properties, setProperties] = useState<any[]>([]);
//   const [filtered, setFiltered] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedType, setSelectedType] = useState<PropertyType | "all">("all");
//   const [showFilters, setShowFilters] = useState(false);

//   const fetchProperties = useCallback(async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       const { data, error: fetchError } = await supabase
//         .from("properties")
//         .select("*, property_images(*)")
//         .eq("status", "available")
//         .order("created_at", { ascending: false });

//       if (fetchError) throw fetchError;

//       const mapped = (data || []).map((p: any) => ({
//         ...p,
//         type: p.listing_type || "sale",
//         location: [p.address, p.city, p.state].filter(Boolean).join(", ") || p.city || "Unknown",
//         area: p.area_sqft || 0,
//         images: (p.property_images || []).map((img: any) => img.url),
//         createdAt: p.created_at,
//       }));

//       setProperties(mapped);
//       setFiltered(mapped);
//     } catch (err: any) {
//       setError(err.message || "Unable to load properties");
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchProperties();
//   }, [fetchProperties]);

//   useEffect(() => {
//     const channel = supabase
//       .channel("public-properties")
//       .on(
//         "postgres_changes",
//         { event: "*", schema: "public", table: "properties" },
//         () => {
//           fetchProperties();
//         }
//       )
//       .subscribe();

//     return () => {
//       supabase.removeChannel(channel);
//     };
//   }, [fetchProperties]);

//   useEffect(() => {
//     let result = properties;

//     if (selectedType !== "all") {
//       result = result.filter((p) => p.type === selectedType);
//     }

//     if (searchQuery.trim()) {
//       const q = searchQuery.toLowerCase();
//       result = result.filter(
//         (p) =>
//           (p.title || "").toLowerCase().includes(q) ||
//           (p.location || "").toLowerCase().includes(q) ||
//           (p.description || "").toLowerCase().includes(q)
//       );
//     }

//     setFiltered(result);
//   }, [searchQuery, selectedType, properties]);

//   const clearFilters = () => {
//     setSearchQuery("");
//     setSelectedType("all");
//   };

//   const openDetails = (property: any) => {
//     trackPropertyView(property.id);
//     navigate(`/properties/${property.id}`);
//   };

//   const hasActiveFilters = searchQuery.trim() !== "" || selectedType !== "all";

//   const formatPrice = (price: any) => {
//     const num = Number(price);
//     return isNaN(num) ? "0" : num.toLocaleString();
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50/50">
//         <div className="text-center">
//           <div className="w-10 h-10 rounded-full border-2 border-emerald-600/10 border-t-emerald-600 animate-spin mx-auto" />
//           <p className="mt-4 text-xs font-semibold text-gray-500 tracking-wider uppercase">Loading Properties...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50/30 text-gray-900 antialiased selection:bg-emerald-50">
//       {/* Enhanced Search & Filter Header */}
//       <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-b border-slate-700/50 overflow-hidden">
//         {/* Decorative Elements */}
//         <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-full blur-3xl" />
//         <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-blue-500/10 to-purple-500/10 rounded-full blur-3xl" />
        
//         <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
//           <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
//             <div className="space-y-2">
//               <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-white/90 text-xs font-medium">
//                 <Home className="w-3.5 h-3.5" />
//                 Premium Real Estate
//               </div>
//               <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
//                 Our Collections
//               </h1>
//               <p className="text-sm text-white/60 max-w-lg">
//                 Discover exceptional properties tailored to your lifestyle. Browse through our curated selection of premium listings.
//               </p>
//             </div>

//             {/* Search & Filters */}
//             <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
//               <div className="relative flex-1 sm:w-80">
//                 <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
//                 <input
//                   type="text"
//                   placeholder="Search properties, locations..."
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-white/30 focus:bg-white/15 focus:ring-2 focus:ring-white/20 transition-all"
//                 />
//               </div>

//               <button
//                 onClick={() => setShowFilters((v) => !v)}
//                 className={`shrink-0 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border text-sm font-semibold transition-all duration-200 ${
//                   showFilters || hasActiveFilters
//                     ? "border-white bg-white text-slate-900 shadow-lg"
//                     : "border-white/20 text-white hover:border-white/40 hover:bg-white/10"
//                 }`}
//               >
//                 <Filter className="w-4 h-4" />
//                 <span>Filters</span>
//                 {hasActiveFilters && (
//                   <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-white text-[10px] font-bold">
//                     {(selectedType !== "all" ? 1 : 0) + (searchQuery.trim() ? 1 : 0)}
//                   </span>
//                 )}
//               </button>
//             </div>
//           </div>

//           {/* Filter Chips */}
//           {showFilters && (
//             <div className="mt-6 pt-6 border-t border-white/10 flex flex-wrap items-center gap-2.5 animate-in fade-in slide-in-from-top-2 duration-300">
//               {propertyTypes.map((type) => (
//                 <button
//                   key={type.value}
//                   onClick={() => setSelectedType(type.value)}
//                   className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all duration-200 ${
//                     selectedType === type.value
//                       ? "bg-white text-slate-900 shadow-lg border-white"
//                       : "bg-white/5 text-white/80 border-white/10 hover:bg-white/10 hover:border-white/20"
//                   }`}
//                 >
//                   {type.label}
//                 </button>
//               ))}
//               {hasActiveFilters && (
//                 <button
//                   onClick={clearFilters}
//                   className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white/60 hover:text-white transition-colors ml-auto"
//                 >
//                   <X className="w-3.5 h-3.5" />
//                   Clear all
//                 </button>
//               )}
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Main Grid Frame */}
//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
//         {error && (
//           <div className="mb-8 p-4 bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-xl text-sm font-medium text-red-700 flex items-center gap-3">
//             <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
//             {error}. Retrying connection...
//           </div>
//         )}

//         {filtered.length === 0 ? (
//           <div className="bg-white rounded-3xl border-2 border-dashed border-gray-200 p-16 text-center max-w-2xl mx-auto">
//             <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center mx-auto mb-6">
//               <Home className="w-10 h-10 text-gray-300" />
//             </div>
//             <h3 className="text-lg font-bold text-gray-900 mb-2">No properties found</h3>
//             <p className="text-sm text-gray-500 mb-6 max-w-sm mx-auto">
//               We couldn't find any properties matching your criteria. Try adjusting your search or filters.
//             </p>
//             {hasActiveFilters && (
//               <button
//                 onClick={clearFilters}
//                 className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-sm font-semibold transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
//               >
//                 <X className="w-4 h-4" />
//                 Clear all filters
//               </button>
//             )}
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
//             {filtered.map((property, index) => (
//               <div
//                 key={property.id}
//                 className="animate-in fade-in slide-in-from-bottom-4 duration-500"
//                 style={{ animationDelay: `${index * 50}ms` }}
//               >
//                 <PropertyCard
//                   property={property}
//                   onClick={() => openDetails(property)}
//                   formatPrice={formatPrice}
//                 />
//               </div>
//             ))}
//           </div>
//         )}
//       </main>
//     </div>
//   );
// }



"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import PageNavbar from "@/components/layout/PageNavbar";
import PropertyCard from "@/components/layout/PropertyCard";
import SearchBar from "@/components/layout/SearchBar";
import SidebarFilters from "@/components/layout/SideBarFilter";

import HERO_BG_IMAGE from "@/assets/ikoyi-main.jpg";

const MOCK_PROPERTIES = [
  {
    id: "prop-1",
    title: "8 Units of 4 Bedroom Fully Furnished Apartments",
    location: "Ikoyi Parkview Estate, Lagos",
    price: 3800000000,
    beds: 4,
    baths: 5,
    area_sqm: 1950,
    listing_type: "sale",
    category: "Premium Apartments",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "prop-2",
    title: "Modern 3 Bedroom Penthouse with Ocean View",
    location: "Banana Island Road, Lagos",
    price: 420000000,
    beds: 3,
    baths: 4,
    area_sqm: 450,
    listing_type: "sale",
    category: "Luxury Penthouses",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
  }
];

const CATEGORIES = [
  { name: "All Properties" },
  { name: "Apartment" },
  { name: "Fully Detached Duplex" },
  { name: "Penthouse" },
  { name: "Residential Land" }
];

const CITIES = ["Lekki", "Banana Island", "Ikoyi", "Victoria Island"];

export default function PropertiesListingPage() {
  const [selectedType, setSelectedType] = useState("All Properties");
  const [searchValue, setSearchValue] = useState("");

  return (
    <div className="min-h-screen bg-white text-[#0E292F] font-sans antialiased">
      <PageNavbar />

      {/* ── PANORAMIC HERO OVERLAY CONTAINER ── */}
      <header className="relative w-full h-[60vh] min-h-[440px] max-h-[600px] bg-[#0E292F] overflow-hidden flex items-end">
        
        {/* Core Widescreen Dynamic Background Image Canvas */}
        <img
          src={HERO_BG_IMAGE}
          alt="Featured Luxury Real Estate Listings Portfolio"
          className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none z-0 object-center"
        />

        {/* Dynamic Shadow Veil for Clean Typography Legibility */}
        <div className="absolute inset-0 bg-black/40 mix-blend-multiply pointer-events-none z-0" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none z-0" />      

        {/* ── LOWER HERO TEXT TRACK ── */}
        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 pb-16 sm:pb-20 flex flex-col items-start text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
            className="max-w-4xl"
          >
            {/* Header Content */}
            <h1 className="font-serif font-light text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight mb-4 drop-shadow-md">
              Our Featured Listings
            </h1>
            
            {/* Short Subheadline Description Block */}
            <p className="text-white/80 font-sans font-light text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl drop-shadow-sm">
              Explore a curated selection of premium properties across Lagos’ most sought-after neighbourhoods.
            </p>
          </motion.div>
        </div>
      </header>

      {/* Integrated Search Container - Maintained position exactly as before */}
      <section className="bg-white pt-12 pb-4">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16">
          <SearchBar value={searchValue} onChange={setSearchValue} />
        </div>
      </section>

      {/* Hierarchy Meta Data Path - All content fully put back */}
      <section className="bg-white py-2 font-sans">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16">
          <div className="flex flex-col gap-1 border-b border-gray-100 pb-3">
            <nav className="text-[11px] font-bold text-[#0E292F] tracking-wide">
              <a href="/" className="hover:underline transition-all">Home</a> 
              <span className="text-black font-normal mx-1.5">›</span> 
              <span className="text-gray-400 font-medium">Listings</span>
            </nav>
            <h2 className="font-serif text-3xl font-bold text-gray-900 tracking-tight pt-1">
              Listings
            </h2>
          </div>

          <div className="flex items-center justify-between pt-4 pb-2">
            {/* Dark Blue Shade Dynamic Header Label Override */}
            <span className="h-7 px-4 inline-flex items-center rounded-sm bg-[#0E292F] text-white text-[10px] font-bold uppercase tracking-wider">
              Listings
            </span>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#0E292F]">
              <span className="text-gray-400 font-normal">Sort By:</span>
              <select className="bg-transparent border-none focus:ring-0 cursor-pointer uppercase text-[11px] font-bold">
                <option>Default Order</option>
                <option>Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Symmetrical Dual Column Block Structure */}
      <main className="bg-white max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 py-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          
          {/* Box sidebar elements on the Left */}
          <SidebarFilters 
            selectedType={selectedType} 
            setSelectedType={setSelectedType} 
            categories={CATEGORIES} 
            cities={CITIES} 
          />

          {/* Cards flow neatly on the Right */}
          <section className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {MOCK_PROPERTIES.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}