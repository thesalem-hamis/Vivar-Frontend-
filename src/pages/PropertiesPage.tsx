"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import PageNavbar from "@/components/layout/PageNavbar";
import PropertyCard from "@/components/layout/PropertyCard";
import SearchBar from "@/components/layout/SearchBar";
import SidebarFilters from "@/components/layout/SideBarFilter";

import HERO_BG_IMAGE from "@/assets/ikoyi-main.jpg";
import { getPublicProperties } from "@/lib/supabase/admin";

const CATEGORIES = [
  { name: "All Properties" },
  { name: "Residential" },
  { name: "Apartment" },
  { name: "Fully Detached Duplex" },
  { name: "Penthouse" },
  { name: "Residential Land" },
  { name: "Commercial" },
  { name: "Commercial Land" },
  { name: "Office" }
];

const CITIES = ["Lekki", "Banana Island", "Ikoyi", "Victoria Island"];

export default function PropertiesListingPage() {
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState("All Properties");
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    const loadProperties = async () => {
      try {
        const data = await getPublicProperties();
        setProperties(data || []);
      } catch (error) {
        console.error("Failed to load properties:", error);
      } finally {
        setLoading(false);
      }
    };
    loadProperties();
  }, []);

  const filteredProperties = properties.filter((property) => {
    // Filter by category/type
    if (selectedType !== "All Properties") {
      const propertyType = property.listing_type || property.type || property.category || "";
      const matchesCategory = 
        propertyType.toLowerCase() === selectedType.toLowerCase() ||
        property.category?.toLowerCase() === selectedType.toLowerCase();
      if (!matchesCategory) return false;
    }

    // Filter by search query (location, property type, apartment names, etc.)
    if (searchValue.trim()) {
      const searchLower = searchValue.toLowerCase().trim();
      const searchTerms = searchLower.split(/\s+/);
      
      const searchableText = [
        property.title,
        property.address,
        property.city,
        property.state,
        property.category,
        property.listing_type,
        property.type,
        ...(property.tags || []),
        ...(property.amenities || [])
      ].filter(Boolean).join(" ").toLowerCase();

      // Check if all search terms match
      const matchesSearch = searchTerms.every(term => searchableText.includes(term));
      if (!matchesSearch) return false;
    }

    return true;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-white text-[#0E292F] font-sans antialiased">
        <PageNavbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-[#0E292F] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-sm text-gray-600">Loading properties...</p>
          </div>
        </div>
      </div>
    );
  }

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
            {filteredProperties.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-gray-500 text-sm">No properties match your filters.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredProperties.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            )}
          </section>

        </div>
      </main>
    </div>
  );
}