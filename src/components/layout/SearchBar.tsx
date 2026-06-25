"use client";

import { useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (val: string) => void;
  onSearch?: () => void;
}

export default function SearchBar({ value, onChange, onSearch }: SearchBarProps) {
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [listingType, setListingType] = useState("sale"); // sale | rent | lease
  const [priceRange, setPriceRange] = useState(0);
  const [beds, setBeds] = useState("Any");
  const [baths, setBaths] = useState("Any");
  const [homeType, setHomeType] = useState("Any");

  return (
    <div className="w-full max-w-3xl font-sans">
      {/* ── MAIN SEARCH BAR ROW (BOX STYLE) ── */}
      <div className="flex items-center gap-3 w-full">
        <div className="flex-1 h-14 flex items-center bg-white border border-[#0E292F]/20 rounded-sm pl-5 pr-2 group focus-within:border-[#0E292F] focus-within:shadow-[0_0_0_1px_#0E292F] transition-all duration-300">
          <div className="flex-1 relative flex items-center">
            <span className="absolute left-0 text-gray-400 group-focus-within:text-[#0E292F] transition-colors">
              <Search size={18} strokeWidth={2.5} />
            </span>
            <input 
              type="text" 
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder="Search location or keywords..." 
              className="w-full pl-8 pr-4 py-3 bg-transparent text-sm text-[#0E292F] placeholder-gray-400 focus:outline-none"
            />
          </div>

          {/* Box Style Desktop Search Button */}
          <div className="hidden md:block shrink-0 pl-2">
            <button
              onClick={onSearch}
              type="button"
              className="h-10 px-7 inline-flex items-center justify-center rounded-sm bg-[#0E292F] text-white hover:bg-[#1D3F48] transition-all duration-300 font-sans text-xs font-bold tracking-widest uppercase"
            >
              Search
            </button>
          </div>
        </div>

        {/* Box Style Mobile Filter Toggle Button */}
        <button
          onClick={() => setIsMobileFilterOpen(true)}
          type="button"
          className="md:hidden flex h-14 w-14 shrink-0 items-center justify-center bg-white border border-[#0E292F]/20 rounded-sm text-[#0E292F] hover:bg-gray-50 active:scale-95 transition-all shadow-sm"
        >
          <SlidersHorizontal size={20} strokeWidth={2.25} />
        </button>
      </div>

      {/* ── MOBILE FILTER DRAWER OVERLAY (BOX STRUCTURE) ── */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 md:hidden bg-black/40 backdrop-blur-sm flex flex-col justify-end">
          {/* Backdrop Click Dismiss */}
          <div className="flex-1" onClick={() => setIsMobileFilterOpen(false)} />

          {/* Filter Sheet Container - Box Top Corners */}
          <div className="bg-white rounded-t-md w-full max-h-[92vh] flex flex-col animate-in slide-in-from-bottom duration-300">
            
            {/* Header Control Field - Rectangular Input Grid */}
            <div className="p-5 flex items-center gap-3 border-b border-gray-100 shrink-0">
              <div className="flex-1 h-11 bg-gray-50 border border-gray-200 rounded-sm flex items-center px-4 gap-2">
                <Search size={16} className="text-gray-400" />
                <input 
                  type="text" 
                  value={value}
                  onChange={(e) => onChange(e.target.value)}
                  placeholder="Location" 
                  className="bg-transparent text-sm text-[#0E292F] focus:outline-none w-full placeholder-gray-500 font-medium"
                />
              </div>
              <button 
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-11 h-11 flex items-center justify-center rounded-sm bg-gray-50 border border-gray-200 text-gray-700 active:scale-90 transition-transform"
              >
                <X size={18} strokeWidth={2.5} />
              </button>
            </div>

            {/* Scrollable Configuration Items Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 text-[#0E292F]">
              
              {/* Box Segmented Filter Grid */}
              <div className="border border-gray-200 p-1 bg-gray-50 rounded-sm flex items-center w-full">
                {["sale", "rent", "lease"].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setListingType(type)}
                    className={`flex-1 text-center py-2 text-xs font-bold capitalize transition-all rounded-sm ${
                      listingType === type 
                        ? "bg-[#0E292F] text-white shadow-sm" 
                        : "text-gray-600 hover:text-[#0E292F]"
                    }`}
                  >
                    For {type}
                  </button>
                ))}
              </div>

              {/* Slider Controls with Box Elements */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">Price Range</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gray-50 border border-gray-200 rounded-sm p-3 text-center">
                    <span className="text-[10px] block text-gray-400 font-bold uppercase tracking-wider mb-0.5">Min Price</span>
                    <span className="text-xs font-bold text-gray-700">₦0</span>
                  </div>
                  <div className="bg-gray-50 border border-gray-200 rounded-sm p-3 text-center">
                    <span className="text-[10px] block text-gray-400 font-bold uppercase tracking-wider mb-0.5">Max Price</span>
                    <span className="text-xs font-bold text-[#0E292F]">₦500,000,000+</span>
                  </div>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="500000000" 
                  className="w-full accent-[#0E292F] h-1.5 bg-gray-200 rounded-none cursor-pointer mt-2"
                />
              </div>

              {/* Box Block Selector Matrices: Beds */}
              <div className="space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">Beds</h3>
                <div className="grid grid-cols-6 border border-gray-200 rounded-sm overflow-hidden text-center text-xs font-bold h-11 items-center bg-white">
                  {["Any", "1", "2", "3", "4", "5+"].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setBeds(num)}
                      className={`h-full flex items-center justify-center border-r last:border-r-0 border-gray-200 transition-colors ${
                        beds === num ? "bg-[#0E292F] text-white" : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>

              {/* Box Block Selector Matrices: Baths */}
              <div className="space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">Baths</h3>
                <div className="grid grid-cols-7 border border-gray-200 rounded-sm overflow-hidden text-center text-xs font-bold h-11 items-center bg-white">
                  {["Any", "1", "2", "3", "4", "5", "6+"].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setBaths(num)}
                      className={`h-full flex items-center justify-center border-r last:border-r-0 border-gray-200 transition-colors ${
                        baths === num ? "bg-[#0E292F] text-white" : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>

              {/* Property Type Block Cards Grid */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">Home Type</h3>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: "Any", label: "Any" },
                    { id: "Studio", label: "Studio Apartment" },
                    { id: "Apartment", label: "Apartment" },
                    { id: "Detached", label: "Detached" },
                    { id: "Semi", label: "Semi-Detached" },
                    { id: "Terrace", label: "Terrace" },
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setHomeType(item.id)}
                      className={`p-3.5 border text-center flex flex-col items-center justify-center min-h-[64px] rounded-sm transition-all ${
                        homeType === item.id 
                          ? "border-[#0E292F] bg-[#0E292F] font-bold text-white" 
                          : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      <span className="text-[11px] tracking-tight font-bold leading-tight">{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Bottom Actions Footer Area (Sharp Box Actions) */}
            <div className="p-4 bg-white border-t border-gray-100 flex items-center gap-3 shrink-0 pb-6">
              <button
                type="button"
                onClick={() => {
                  setListingType("sale");
                  setBeds("Any");
                  setBaths("Any");
                  setHomeType("Any");
                }}
                className="flex-1 h-12 rounded-sm border border-gray-300 text-gray-700 font-bold text-xs uppercase tracking-wider hover:bg-gray-50 transition-colors"
              >
                Reset
              </button>
              <button
                type="button"
                onClick={() => {
                  if (onSearch) onSearch();
                  setIsMobileFilterOpen(false);
                }}
                className="flex-1 h-12 rounded-sm bg-[#0E292F] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#1D3F48] shadow-sm transition-colors"
              >
                Search
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}