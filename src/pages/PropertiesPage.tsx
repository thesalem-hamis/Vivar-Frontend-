// "use client";

// import { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import PageNavbar from "@/components/layout/PageNavbar";
// import PropertyCard from "@/components/layout/PropertyCard";
// import SearchBar from "@/components/layout/SearchBar";
// import SidebarFilters from "@/components/layout/SideBarFilter";

// import HERO_BG_IMAGE from "@/assets/ikoyi-main.jpg";
// import { getPublicProperties } from "@/lib/supabase/admin";

// const CATEGORIES = [
//   { name: "All Properties" },
//   { name: "Residential" },
//   { name: "Apartment" },
//   { name: "Fully Detached Duplex" },
//   { name: "Penthouse" },
//   { name: "Residential Land" },
//   { name: "Commercial" },
//   { name: "Commercial Land" },
//   { name: "Office" }
// ];

// const CITIES = ["Lekki", "Banana Island", "Ikoyi", "Victoria Island"];

// // ── LUXURY SKELETON SHIMMER CARD COMPONENT ──
// function PropertyCardSkeleton() {
//   return (
//     <div className="w-full bg-white border border-stone-100 rounded-sm overflow-hidden shadow-sm flex flex-col h-[420px] animate-pulse">
//       {/* Image Block */}
//       <div className="w-full h-[240px] bg-stone-200 relative overflow-hidden">
//         <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shimmer_1.5s_infinite]" />
//       </div>
//       {/* Content Stack */}
//       <div className="p-5 flex-1 flex flex-col justify-between">
//         <div className="space-y-3">
//           <div className="h-4 bg-stone-200 rounded-sm w-1/3" />
//           <div className="h-6 bg-stone-200 rounded-sm w-3/4" />
//           <div className="h-4 bg-stone-200 rounded-sm w-5/6" />
//         </div>
//         <div className="pt-4 border-t border-stone-100 flex justify-between items-center">
//           <div className="h-5 bg-stone-200 rounded-sm w-2/5" />
//           <div className="h-4 bg-stone-200 rounded-sm w-1/4" />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default function PropertiesListingPage() {
//   const [properties, setProperties] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedType, setSelectedType] = useState("All Properties");
//   const [searchValue, setSearchValue] = useState("");

//   useEffect(() => {
//     const loadProperties = async () => {
//       try {
//         const data = await getPublicProperties();
//         setProperties(data || []);
//       } catch (error) {
//         console.error("Failed to load properties:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     loadProperties();
//   }, []);

//   const filteredProperties = properties.filter((property) => {
//     // Filter by category/type
//     if (selectedType !== "All Properties") {
//       const propertyType = property.listing_type || property.type || property.category || "";
//       const matchesCategory =
//         propertyType.toLowerCase() === selectedType.toLowerCase() ||
//         property.category?.toLowerCase() === selectedType.toLowerCase();
//       if (!matchesCategory) return false;
//     }

//     // Filter by search query (location, property type, apartment names, etc.)
//     if (searchValue.trim()) {
//       const searchLower = searchValue.toLowerCase().trim();
//       const searchTerms = searchLower.split(/\s+/);

//       const searchableText = [
//         property.title,
//         property.address,
//         property.city,
//         property.state,
//         property.category,
//         property.listing_type,
//         property.type,
//         ...(property.tags || []),
//         ...(property.amenities || [])
//       ].filter(Boolean).join(" ").toLowerCase();

//       // Check if all search terms match
//       const matchesSearch = searchTerms.every(term => searchableText.includes(term));
//       if (!matchesSearch) return false;
//     }

//     return true;
//   });

//   return (
//     <div className="min-h-screen bg-white text-[#0E292F] font-sans antialiased">
//       <PageNavbar />

//       {/* ── PANORAMIC HERO OVERLAY CONTAINER ── */}
//       <header className="relative w-full h-[60vh] min-h-[440px] max-h-[600px] bg-[#0E292F] overflow-hidden flex items-end">

//         {/* Core Widescreen Dynamic Background Image Canvas */}
//         <img
//           src={HERO_BG_IMAGE}
//           alt="Featured Luxury Real Estate Listings Portfolio"
//           className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none z-0 object-center"
//         />

//         {/* Dynamic Shadow Veil for Clean Typography Legibility */}
//         <div className="absolute inset-0 bg-black/40 mix-blend-multiply pointer-events-none z-0" />
//         <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none z-0" />

//         {/* ── LOWER HERO TEXT TRACK ── */}
//         <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 pb-16 sm:pb-20 flex flex-col items-start text-white">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
//             className="max-w-4xl"
//           >
//             {/* Header Content */}
//             <h1 className="font-serif font-light text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight mb-4 drop-shadow-md">
//               Our Featured Listings
//             </h1>

//             {/* Short Subheadline Description Block */}
//             <p className="text-white/80 font-sans font-light text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl drop-shadow-sm">
//               Explore a curated selection of premium properties across Lagos’ most sought-after neighbourhoods.
//             </p>
//           </motion.div>
//         </div>
//       </header>

//       {/* Integrated Search Container */}
//       <section className="bg-white pt-12 pb-4">
//         <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16">
//           <SearchBar value={searchValue} onChange={setSearchValue} />
//         </div>
//       </section>

//       {/* Hierarchy Meta Data Path */}
//       <section className="bg-white py-2 font-sans">
//         <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16">
//           <div className="flex flex-col gap-1 border-b border-gray-100 pb-3">
//             <nav className="text-[11px] font-bold text-[#0E292F] tracking-wide">
//               <a href="/" className="hover:underline transition-all">Home</a>
//               <span className="text-black font-normal mx-1.5">›</span>
//               <span className="text-gray-400 font-medium">Listings</span>
//             </nav>
//             <h2 className="font-serif text-3xl font-bold text-gray-900 tracking-tight pt-1">
//               Listings
//             </h2>
//           </div>

//           <div className="flex items-center justify-between pt-4 pb-2">
//             <span className="h-7 px-4 inline-flex items-center rounded-sm bg-[#0E292F] text-white text-[10px] font-bold uppercase tracking-wider">
//               Listings
//             </span>
//             <div className="flex items-center gap-2 text-xs font-semibold text-[#0E292F]">
//               <span className="text-gray-400 font-normal">Sort By:</span>
//               <select className="bg-transparent border-none focus:ring-0 cursor-pointer uppercase text-[11px] font-bold">
//                 <option>Default Order</option>
//                 <option>Price: High to Low</option>
//               </select>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Symmetrical Dual Column Block Structure */}
//       <main className="bg-white max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 py-4">
//         <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">

//           {/* Box sidebar elements on the Left */}
//           <SidebarFilters
//             selectedType={selectedType}
//             setSelectedType={setSelectedType}
//             categories={CATEGORIES}
//             cities={CITIES}
//           />

//           {/* Cards flow neatly on the Right */}
//           <section className="lg:col-span-3">
//             {loading ? (
//               /* Render exactly 6 animated skeleton layout items while querying Supabase backend */
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 {Array.from({ length: 6 }).map((_, idx) => (
//                   <PropertyCardSkeleton key={idx} />
//                 ))}
//               </div>
//             ) : filteredProperties.length === 0 ? (
//               <div className="text-center py-16">
//                 <p className="text-gray-500 text-sm">No properties match your filters.</p>
//               </div>
//             ) : (
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 {filteredProperties.map((property) => (
//                   <PropertyCard key={property.id} property={property} />
//                 ))}
//               </div>
//             )}
//           </section>

//         </div>
//       </main>
//     </div>
//   );
// }

// "use client";

// import { useState, useEffect, useMemo } from "react";
// import { motion } from "framer-motion";
// import { ArrowUpRight } from "lucide-react";
// import PageNavbar from "@/components/layout/PageNavbar";
// import PropertyCard from "@/components/layout/PropertyCard";
// import SearchBar from "@/components/layout/SearchBar";
// import SidebarFilters from "@/components/layout/SideBarFilter";
// import PropertyPageHero from "@/components/property/PropertyPageHero";

// import FALLBACK_IMAGE from "@/assets/svg.png";
// import { getPublicProperties } from "@/lib/supabase/admin";

// interface Property {
//   id: string | number;
//   title?: string;
//   address?: string;
//   city?: string;
//   state?: string;
//   category?: string;
//   listing_type?: string;
//   type?: string;
//   price?: number;
//   tags?: string[];
//   amenities?: string[];
//   created_at?: string;
// }

// const CATEGORIES = [
//   { name: "All Properties" },
//   { name: "Residential" },
//   { name: "Apartment" },
//   { name: "Fully Detached Duplex" },
//   { name: "Penthouse" },
//   { name: "Residential Land" },
//   { name: "Commercial" },
//   { name: "Commercial Land" },
//   { name: "Office" },
// ];

// const CITIES = ["Lekki", "Banana Island", "Ikoyi", "Victoria Island"];

// const elementFadeUp = {
//   hidden: { opacity: 0, y: 15 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: { duration: 0.6, ease: [0.25, 1, 0.5, 1] }
//   }
// };

// function PropertyCardSkeleton() {
//   return (
//     <div className="w-full bg-white border border-stone-100 rounded-2xl overflow-hidden flex flex-col animate-pulse">
//       <div className="w-full aspect-[16/10] bg-stone-50 relative overflow-hidden">
//         <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-stone-100/30 to-transparent animate-[shimmer_1.8s_infinite]" />
//       </div>
//       <div className="p-5 flex flex-col gap-4">
//         <div className="space-y-2">
//           <div className="h-3 bg-stone-100 rounded w-1/4" />
//           <div className="h-5 bg-stone-100 rounded w-2/3" />
//           <div className="h-3 bg-stone-100 rounded w-5/6" />
//         </div>
//         <div className="h-px bg-stone-100" />
//         <div className="flex justify-between items-center">
//           <div className="flex gap-2">
//             <div className="h-6 w-12 bg-stone-100 rounded-md" />
//             <div className="h-6 w-12 bg-stone-100 rounded-md" />
//           </div>
//           <div className="h-8 w-20 bg-stone-100 rounded-[10px]" />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default function PropertiesListingPage() {
//   const [properties, setProperties] = useState<Property[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [selectedType, setSelectedType] = useState<string>("All Properties");
//   const [searchValue, setSearchValue] = useState<string>("");
//   const [sortBy, setSortBy] = useState<string>("Default Order");

//   useEffect(() => {
//     const loadProperties = async () => {
//       try {
//         const data = await getPublicProperties();
//         setProperties((data as Property[]) || []);
//       } catch (error) {
//         console.error("Failed to load properties:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     loadProperties();
//   }, []);

//   const filteredProperties = useMemo(() => {
//     let result = properties.filter((property) => {
//       if (selectedType !== "All Properties") {
//         const propertyType = property.listing_type || property.type || property.category || "";
//         const matchesCategory =
//           propertyType.toLowerCase() === selectedType.toLowerCase() ||
//           property.category?.toLowerCase() === selectedType.toLowerCase();
//         if (!matchesCategory) return false;
//       }
//       if (searchValue.trim()) {
//         const searchLower = searchValue.toLowerCase().trim();
//         const searchTerms = searchLower.split(/\s+/);
//         const searchableText = [
//           property.title,
//           property.address,
//           property.city,
//           property.state,
//           property.category,
//           property.listing_type,
//           property.type,
//           ...(property.tags || []),
//           ...(property.amenities || []),
//         ]
//           .filter(Boolean)
//           .join(" ")
//           .toLowerCase();
//         if (!searchTerms.every((term) => searchableText.includes(term))) return false;
//       }
//       return true;
//     });

//     if (sortBy === "Price: High to Low") {
//       result.sort((a, b) => (b.price || 0) - (a.price || 0));
//     } else if (sortBy === "Price: Low to High") {
//       result.sort((a, b) => (a.price || 0) - (b.price || 0));
//     } else if (sortBy === "Newest First") {
//       result.sort((a, b) => {
//         const dateA = a.created_at ? new Date(a.created_at).getTime() : 0;
//         const dateB = b.created_at ? new Date(b.created_at).getTime() : 0;
//         return dateB - dateA;
//       });
//     }

//     return result;
//   }, [properties, selectedType, searchValue, sortBy]);

//   return (
//     <div className="min-h-screen bg-white text-[#0E292F] font-sans antialiased relative overflow-x-hidden">

//       {/* ── CUSTOM REPEATING GRID MASK BACKGROUND ── */}
//       <div
//         className="absolute inset-0 z-0 pointer-events-none"
//         style={{
//           backgroundImage: `
//             linear-gradient(to right, #e7e5e4 1px, transparent 1px),
//             linear-gradient(to bottom, #e7e5e4 1px, transparent 1px)
//           `,
//           backgroundSize: "20px 20px",
//           backgroundPosition: "0 0, 0 0",
//           maskImage: `
//             repeating-linear-gradient(to right, black 0px, black 3px, transparent 3px, transparent 8px),
//             repeating-linear-gradient(to bottom, black 0px, black 3px, transparent 3px, transparent 8px),
//             radial-gradient(ellipse 80% 80% at 100% 0%, #000 50%, transparent 90%)
//           `,
//           WebkitMaskImage: `
//             repeating-linear-gradient(to right, black 0px, black 3px, transparent 3px, transparent 8px),
//             repeating-linear-gradient(to bottom, black 0px, black 3px, transparent 3px, transparent 8px),
//             radial-gradient(ellipse 80% 80% at 100% 0%, #000 50%, transparent 90%)
//           `,
//           maskComposite: "intersect",
//           WebkitMaskComposite: "source-in",
//         }}
//       />

//       <div className="relative z-10 flex flex-col min-h-screen">
//         <PageNavbar />

//         {/* ── HERO ── */}
//         <PropertyPageHero />

//         {/* ── SEARCH ── */}
//         <section className="border-b border-stone-100/60">
//           <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 py-10">
//             <SearchBar value={searchValue} onChange={setSearchValue} />
//           </div>
//         </section>

//         {/* ── BREADCRUMB + META ── */}
//         <section className="border-b border-stone-100/60">
//           <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 py-5">
//             <div className="flex items-center justify-between">
//               <div className="flex flex-col gap-1.5">
//                 <nav className="flex items-center gap-1.5 text-[10px] font-bold tracking-[0.1em] uppercase">
//                   <a href="/" className="text-[#3D7188] hover:text-[#0E292F] transition-colors">Home</a>
//                   <span className="text-stone-300">›</span>
//                   <span className="text-[#0E292F]">Listings</span>
//                 </nav>
//                 <div className="flex items-center gap-3">
//                   <h2 className="font-sans text-2xl font-bold text-[#0E292F] tracking-tight">
//                     All Listings
//                   </h2>
//                   {!loading && (
//                     <span className="inline-flex items-center px-2.5 py-0.5 rounded-md bg-[#0E292F] text-white text-[9px] font-black uppercase tracking-[0.12em]">
//                       {filteredProperties.length} properties
//                     </span>
//                   )}
//                 </div>
//               </div>

//               <div className="hidden sm:flex items-center gap-2 text-[11px] font-bold text-[#0E292F]">
//                 <span className="text-stone-400 font-medium">Sort:</span>
//                 <select
//                   value={sortBy}
//                   onChange={(e) => setSortBy(e.target.value)}
//                   className="bg-transparent border-none focus:ring-0 cursor-pointer text-[11px] font-black uppercase tracking-wider text-[#0E292F] focus:outline-none"
//                 >
//                   <option value="Default Order">Default Order</option>
//                   <option value="Price: High to Low">Price: High to Low</option>
//                   <option value="Price: Low to High">Price: Low to High</option>
//                   <option value="Newest First">Newest First</option>
//                 </select>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* ── MAIN GRID ── */}
//         <main className="max-w-[1440px] mx-auto w-full px-6 md:px-12 lg:px-16 pt-6 pb-16 flex-grow">
//           <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 items-start w-full">

//             {/* Sidebar Filters */}
//             <div className="lg:col-span-1 lg:order-last">
//               <SidebarFilters
//                 selectedType={selectedType}
//                 setSelectedType={setSelectedType}
//                 categories={CATEGORIES}
//                 cities={CITIES}
//               />
//             </div>

//             {/* Listings / Empty Fallback Column */}
//             <section className="lg:col-span-3 lg:order-first">
//               {loading ? (
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
//                   {Array.from({ length: 6 }).map((_, idx) => (
//                     <PropertyCardSkeleton key={idx} />
//                   ))}
//                 </div>
//               ) : filteredProperties.length === 0 ? (

//                 /* ── HIGHER POSITIONED FALLBACK STATE ── */
//                 <div className="flex flex-col items-center justify-center text-center pt-4 pb-12 px-6 w-full max-w-xl mx-auto lg:mt-2">
//                   <img
//                     src={FALLBACK_IMAGE.src || FALLBACK_IMAGE}
//                     alt="No properties uploaded"
//                     className="w-36 h-auto object-contain opacity-80 mb-6 select-none pointer-events-none"
//                   />

//                   <h3 className="font-sans text-xl font-bold text-[#0E292F] mb-2 tracking-tight">
//                     No property has been uploaded yet
//                   </h3>

//                   <p className="text-stone-400 font-sans text-xs max-w-xs mb-8 leading-relaxed">
//                     We are constantly expanding our portfolio with premium properties across Lagos. Explore our comprehensive guide in the meantime.
//                   </p>

//                   <motion.div
//                     // variants={elementFadeUp}
//                     initial="hidden"
//                     animate="visible"
//                     className="shrink-0 pt-1"
//                   >
//                     <motion.a
//                       href="/portfolio"
//                       whileHover={{ scale: 1.04, y: -2, backgroundColor: "#0E292F", color: "#FFFFFF" }}
//                       whileTap={{ scale: 0.98 }}
//                       className="inline-flex items-center gap-8 pl-5 pr-2 py-2 rounded-[10px] bg-white text-[#0E292F] transition-all duration-300 shadow-none group font-sans text-[10px] sm:text-[11px] font-bold tracking-widest uppercase whitespace-nowrap border border-stone-200"
//                     >
//                       <span className="group-hover:translate-x-1 transition-transform duration-300">
//                         Our Property Guide
//                       </span>
//                       <div className="flex items-center justify-center w-8 h-8 rounded-[6px] bg-[#0E292F] text-white group-hover:bg-white group-hover:text-[#0E292F] transition-all duration-300">
//                         <ArrowUpRight size={14} strokeWidth={2.5} className="group-hover:rotate-45 transition-transform duration-300" />
//                       </div>
//                     </motion.a>
//                   </motion.div>
//                 </div>

//               ) : (
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
//                   {filteredProperties.map((property, i) => (
//                     <motion.div
//                       key={property.id}
//                       initial={{ opacity: 0, y: 15 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ delay: i * 0.04, duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
//                     >
//                       <PropertyCard property={property} />
//                     </motion.div>
//                   ))}
//                 </div>
//               )}
//             </section>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import PageNavbar from "@/components/layout/PageNavbar";
import PropertyCard from "@/components/layout/PropertyCard";
import SearchBar from "@/components/layout/SearchBar";
import SidebarFilters from "@/components/layout/SideBarFilter";
import PropertyPageHero from "@/components/property/PropertyPageHero";

import FALLBACK_IMAGE from "@/assets/svg.png";
import {
  getPublicProperties,
  searchPublicProperties,
} from "@/lib/supabase/admin";

interface Property {
  id: string | number;
  title?: string;
  address?: string;
  city?: string;
  state?: string;
  category?: string;
  listing_type?: string;
  type?: string;
  price?: number;
  beds?: string | number;
  tags?: string[];
  amenities?: string[];
  created_at?: string;
}

const CATEGORIES = [
  { name: "All Properties" },
  { name: "Residential" },
  { name: "Apartment" },
  { name: "Fully Detached Duplex" },
  { name: "Penthouse" },
  { name: "Residential Land" },
  { name: "Commercial" },
  { name: "Commercial Land" },
  { name: "Office" },
];

const CITIES = ["Lekki", "Banana Island", "Ikoyi", "Victoria Island"];

function PropertyCardSkeleton() {
  return (
    <div className="w-full bg-white border border-stone-100 rounded-2xl overflow-hidden flex flex-col animate-pulse">
      <div className="w-full aspect-[16/10] bg-stone-50 relative overflow-hidden">
        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-stone-100/30 to-transparent animate-[shimmer_1.8s_infinite]" />
      </div>
      <div className="p-5 flex flex-col gap-4">
        <div className="space-y-2">
          <div className="h-3 bg-stone-100 rounded w-1/4" />
          <div className="h-5 bg-stone-100 rounded w-2/3" />
          <div className="h-3 bg-stone-100 rounded w-5/6" />
        </div>
        <div className="h-px bg-stone-100" />
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <div className="h-6 w-12 bg-stone-100 rounded-md" />
            <div className="h-6 w-12 bg-stone-100 rounded-md" />
          </div>
          <div className="h-8 w-20 bg-stone-100 rounded-[10px]" />
        </div>
      </div>
    </div>
  );
}

export default function PropertiesListingPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedType, setSelectedType] = useState<string>("All Properties");
  const [sortBy, setSortBy] = useState<string>("Default Order");

  // Multi-parameter Search / Bar States
  const [searchFilters, setSearchFilters] = useState<{
    dealType: string | null;
    location: string | null;
    homeType: string | null;
    beds: string | null;
  }>({
    dealType: null,
    location: null,
    homeType: null,
    beds: null,
  });

  useEffect(() => {
    const loadProperties = async () => {
      try {
        const data = await getPublicProperties();
        setProperties((data as Property[]) || []);
      } catch (error) {
        console.error("Failed to load properties:", error);
      } finally {
        setLoading(false);
      }
    };
    loadProperties();
  }, []);

  // Intercept SearchBar updates
  const handleSearchBarSubmit = async (filters: {
    dealType: string | null;
    location: string | null;
    homeType: string | null;
    beds: string | null;
  }) => {
    setSearchFilters(filters);
    try {
      setLoading(true);
      const data = await searchPublicProperties(
        filters.dealType as string,
        filters.location as string,
        filters.homeType as string,
        filters.beds as string,
      );
      setProperties((data as Property[]) || []);
    } catch (error) {
      console.error("Failed to load properties:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProperties = useMemo(() => {
    // let result = properties.filter((property) => {
    //   // 1. Sidebar Category Filters
    //   if (selectedType !== "All Properties") {
    //     const propertyType =
    //       property.listing_type || property.type || property.category || "";
    //     const matchesCategory =
    //       propertyType.toLowerCase() === selectedType.toLowerCase() ||
    //       property.category?.toLowerCase() === selectedType.toLowerCase();
    //     if (!matchesCategory) return false;
    //   }

    //   // 2. SearchBar Parameter - Category / Deal Type
    //   if (searchFilters.dealType) {
    //     const pType =
    //       property.listing_type || property.type || property.category || "";
    //     if (pType.toLowerCase() !== searchFilters.dealType.toLowerCase())
    //       return false;
    //   }

    //   // 3. SearchBar Parameter - Location / City
    //   if (searchFilters.location) {
    //     const pCity = property.city || property.address || "";
    //     if (!pCity.toLowerCase().includes(searchFilters.location.toLowerCase()))
    //       return false;
    //   }

    //   // 4. SearchBar Parameter - Home / Property Type
    //   if (searchFilters.homeType) {
    //     const pCategory = property.category || property.type || "";
    //     if (
    //       !pCategory
    //         .toLowerCase()
    //         .includes(searchFilters.homeType.toLowerCase())
    //     )
    //       return false;
    //   }

    //   // 5. SearchBar Parameter - Bedrooms
    //   if (searchFilters.beds) {
    //     const pBeds = property.beds ? String(property.beds) : "";
    //     if (pBeds !== searchFilters.beds) return false;
    //   }

    //   return true;
    // });
    let result = properties;

    // Handle Sorting States
    if (sortBy === "Price: High to Low") {
      result.sort((a, b) => (b.price || 0) - (a.price || 0));
    } else if (sortBy === "Price: Low to High") {
      result.sort((a, b) => (a.price || 0) - (b.price || 0));
    } else if (sortBy === "Newest First") {
      result.sort((a, b) => {
        const dateA = a.created_at ? new Date(a.created_at).getTime() : 0;
        const dateB = b.created_at ? new Date(b.created_at).getTime() : 0;
        return dateB - dateA;
      });
    }
    return result;
  }, [properties, selectedType, searchFilters, sortBy]);

  return (
    <div className="min-h-screen bg-white text-[#0E292F] font-sans antialiased relative overflow-x-hidden">
      {/* ── CUSTOM REPEATING GRID MASK BACKGROUND ── */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, #e7e5e4 1px, transparent 1px),
            linear-gradient(to bottom, #e7e5e4 1px, transparent 1px)
          `,
          backgroundSize: "20px 20px",
          backgroundPosition: "0 0, 0 0",
          maskImage: `
            repeating-linear-gradient(to right, black 0px, black 3px, transparent 3px, transparent 8px),
            repeating-linear-gradient(to bottom, black 0px, black 3px, transparent 3px, transparent 8px),
            radial-gradient(ellipse 80% 80% at 100% 0%, #000 50%, transparent 90%)
          `,
          WebkitMaskImage: `
            repeating-linear-gradient(to right, black 0px, black 3px, transparent 3px, transparent 8px),
            repeating-linear-gradient(to bottom, black 0px, black 3px, transparent 3px, transparent 8px),
            radial-gradient(ellipse 80% 80% at 100% 0%, #000 50%, transparent 90%)
          `,
          maskComposite: "intersect",
          WebkitMaskComposite: "source-in",
        }}
      />

      <div className="relative z-10 flex flex-col min-h-screen">
        <PageNavbar />

        {/* ── HERO ── */}
        <PropertyPageHero />

        {/* ── SEARCH ── */}
        <section className="border-b relative -top-8 border-stone-100/60">
          <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16">
            <SearchBar onSearch={handleSearchBarSubmit} />
          </div>
        </section>

        {/* ── BREADCRUMB + META ── */}
        <section className="border-b -m-t-16 border-stone-100/60">
          <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 py-5">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-1.5">
                <nav className="flex items-center gap-1.5 text-[10px] font-bold tracking-[0.1em] uppercase">
                  <a
                    href="/"
                    className="text-[#3D7188] hover:text-[#0E292F] transition-colors"
                  >
                    Home
                  </a>
                  <span className="text-stone-300">›</span>
                  <span className="text-[#0E292F]">Listings</span>
                </nav>
                <div className="flex items-center gap-3">
                  <h2 className="font-sans text-2xl font-bold text-[#0E292F] tracking-tight">
                    All Listings
                  </h2>
                  {!loading && (
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#0E292F]/[0.06] text-[#0E292F] text-[10px] font-bold tracking-wider uppercase border border-stone-200 ring-1 ring-[#0E292F]/5 select-none">
                      <span className="text-sm">
                        {filteredProperties.length}
                      </span>
                      <span>Properties</span>
                    </span>
                  )}
                </div>
              </div>

              <div className="hidden sm:flex items-center gap-2 text-[11px] font-bold text-[#0E292F]">
                <span className="text-stone-400 font-medium">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent border-none focus:ring-0 cursor-pointer text-[11px] font-black uppercase tracking-wider text-[#0E292F] focus:outline-none"
                >
                  <option value="Default Order">Default Order</option>
                  <option value="Price: High to Low">Price: High to Low</option>
                  <option value="Price: Low to High">Price: Low to High</option>
                  <option value="Newest First">Newest First</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* ── MAIN GRID ── */}
        <main className="max-w-[1440px] mx-auto w-full px-6 md:px-12 lg:px-16 pt-6 pb-16 flex-grow">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 items-start w-full">
            {/* Sidebar Filters */}
            <div className="lg:col-span-1 lg:order-last">
              <SidebarFilters
                selectedType={selectedType}
                setSelectedType={setSelectedType}
                categories={CATEGORIES}
                cities={CITIES}
              />
            </div>

            {/* Listings / Empty Fallback Column */}
            <section className="lg:col-span-3 lg:order-first">
              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
                  {Array.from({ length: 6 }).map((_, idx) => (
                    <PropertyCardSkeleton key={idx} />
                  ))}
                </div>
              ) : filteredProperties.length === 0 ? (
                /* ── HIGHER POSITIONED FALLBACK STATE ── */
                <div className="flex flex-col items-center justify-center text-center pt-4 pb-12 px-6 w-full max-w-xl mx-auto lg:mt-2">
                  <img
                    src={FALLBACK_IMAGE.src || FALLBACK_IMAGE}
                    alt="No properties uploaded"
                    className="w-36 h-auto object-contain opacity-80 mb-6 select-none pointer-events-none"
                  />

                  <h3 className="font-sans text-xl font-bold text-[#0E292F] mb-2 tracking-tight">
                    No Matches Found
                  </h3>

                  <p className="text-stone-400 font-sans text-xs max-w-xs mb-8 leading-relaxed">
                    We couldn't find any properties matching your exact search.
                    Explore our comprehensive guide in the meantime.
                  </p>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="shrink-0 pt-1"
                  >
                    <motion.a
                      href="/portfolio"
                      whileHover={{
                        scale: 1.04,
                        y: -2,
                        backgroundColor: "#0E292F",
                        color: "#FFFFFF",
                      }}
                      whileTap={{ scale: 0.98 }}
                      className="inline-flex items-center gap-8 pl-5 pr-2 py-2 rounded-[10px] bg-white text-[#0E292F] transition-all duration-300 shadow-none group font-sans text-[10px] sm:text-[11px] font-bold tracking-widest uppercase whitespace-nowrap border border-stone-200"
                    >
                      <span className="group-hover:translate-x-1 transition-transform duration-300">
                        Our Property Guide
                      </span>
                      <div className="flex items-center justify-center w-8 h-8 rounded-[6px] bg-[#0E292F] text-white group-hover:bg-white group-hover:text-[#0E292F] transition-all duration-300">
                        <ArrowUpRight
                          size={14}
                          strokeWidth={2.5}
                          className="group-hover:rotate-45 transition-transform duration-300"
                        />
                      </div>
                    </motion.a>
                  </motion.div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
                  {filteredProperties.map((property, i) => (
                    <motion.div
                      key={property.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: i * 0.04,
                        duration: 0.4,
                        ease: [0.25, 1, 0.5, 1],
                      }}
                    >
                      <PropertyCard property={property} />
                    </motion.div>
                  ))}
                </div>
              )}
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
