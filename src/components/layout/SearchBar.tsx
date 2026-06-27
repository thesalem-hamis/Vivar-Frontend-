// "use client";

// import { useState } from "react";
// import { Search, SlidersHorizontal, X } from "lucide-react";

// interface SearchBarProps {
//   value: string;
//   onChange: (val: string) => void;
//   onSearch?: () => void;
// }

// export default function SearchBar({ value, onChange, onSearch }: SearchBarProps) {
//   const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
//   const [listingType, setListingType] = useState("sale"); // sale | rent | lease
//   const [beds, setBeds] = useState("Any");
//   const [baths, setBaths] = useState("Any");
//   const [homeType, setHomeType] = useState("Any");

//   return (
//     <div className="w-full max-w-3xl font-sans">
//       {/* ── MAIN SEARCH BAR ROW (BOX STYLE) ── */}
//       <div className="flex items-center gap-3 w-full">
//         <div className="flex-1 h-14 flex items-center bg-white border border-[#0E292F]/20 rounded-sm pl-5 pr-2 group focus-within:border-[#0E292F] focus-within:shadow-[0_0_0_1px_#0E292F] transition-all duration-300">
//           <div className="flex-1 relative flex items-center">
//             <span className="absolute left-0 text-gray-400 group-focus-within:text-[#0E292F] transition-colors">
//               <Search size={18} strokeWidth={2.5} />
//             </span>
//             <input 
//               type="text" 
//               value={value}
//               onChange={(e) => onChange(e.target.value)}
//               placeholder="Search location or keywords..." 
//               className="w-full pl-8 pr-4 py-3 bg-transparent text-sm text-[#0E292F] placeholder-gray-400 focus:outline-none"
//             />
//           </div>

//           {/* Box Style Desktop Search Button */}
//           <div className="hidden md:block shrink-0 pl-2">
//             <button
//               onClick={onSearch}
//               type="button"
//               className="h-10 px-7 inline-flex items-center justify-center rounded-sm bg-[#0E292F] text-white hover:bg-[#1D3F48] transition-all duration-300 font-sans text-xs font-bold tracking-widest uppercase"
//             >
//               Search
//             </button>
//           </div>
//         </div>

//         {/* Box Style Mobile Filter Toggle Button */}
//         <button
//           onClick={() => setIsMobileFilterOpen(true)}
//           type="button"
//           className="md:hidden flex h-14 w-14 shrink-0 items-center justify-center bg-white border border-[#0E292F]/20 rounded-sm text-[#0E292F] hover:bg-gray-50 active:scale-95 transition-all shadow-sm"
//         >
//           <SlidersHorizontal size={20} strokeWidth={2.25} />
//         </button>
//       </div>

//       {/* ── MOBILE FILTER DRAWER OVERLAY (BOX STRUCTURE) ── */}
//       {isMobileFilterOpen && (
//         <div className="fixed inset-0 z-50 md:hidden bg-black/40 backdrop-blur-sm flex flex-col justify-end">
//           {/* Backdrop Click Dismiss */}
//           <div className="flex-1" onClick={() => setIsMobileFilterOpen(false)} />

//           {/* Filter Sheet Container - Box Top Corners */}
//           <div className="bg-white rounded-t-md w-full max-h-[92vh] flex flex-col animate-in slide-in-from-bottom duration-300">
            
//             {/* Header Control Field - Rectangular Input Grid */}
//             <div className="p-5 flex items-center gap-3 border-b border-gray-100 shrink-0">
//               <div className="flex-1 h-11 bg-gray-50 border border-gray-200 rounded-sm flex items-center px-4 gap-2">
//                 <Search size={16} className="text-gray-400" />
//                 <input 
//                   type="text" 
//                   value={value}
//                   onChange={(e) => onChange(e.target.value)}
//                   placeholder="Location" 
//                   className="bg-transparent text-sm text-[#0E292F] focus:outline-none w-full placeholder-gray-500 font-medium"
//                 />
//               </div>
//               <button 
//                 onClick={() => setIsMobileFilterOpen(false)}
//                 className="w-11 h-11 flex items-center justify-center rounded-sm bg-gray-50 border border-gray-200 text-gray-700 active:scale-90 transition-transform"
//               >
//                 <X size={18} strokeWidth={2.5} />
//               </button>
//             </div>

//             {/* Scrollable Configuration Items Body */}
//             <div className="flex-1 overflow-y-auto p-6 space-y-6 text-[#0E292F]">
              
//               {/* Box Segmented Filter Grid */}
//               <div className="border border-gray-200 p-1 bg-gray-50 rounded-sm flex items-center w-full">
//                 {["sale", "rent", "lease"].map((type) => (
//                   <button
//                     key={type}
//                     type="button"
//                     onClick={() => setListingType(type)}
//                     className={`flex-1 text-center py-2 text-xs font-bold capitalize transition-all rounded-sm ${
//                       listingType === type 
//                         ? "bg-[#0E292F] text-white shadow-sm" 
//                         : "text-gray-600 hover:text-[#0E292F]"
//                     }`}
//                   >
//                     For {type}
//                   </button>
//                 ))}
//               </div>

//               {/* Slider Controls with Box Elements */}
//               <div className="space-y-3">
//                 <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">Price Range</h3>
//                 <div className="grid grid-cols-2 gap-3">
//                   <div className="bg-gray-50 border border-gray-200 rounded-sm p-3 text-center">
//                     <span className="text-[10px] block text-gray-400 font-bold uppercase tracking-wider mb-0.5">Min Price</span>
//                     <span className="text-xs font-bold text-gray-700">₦0</span>
//                   </div>
//                   <div className="bg-gray-50 border border-gray-200 rounded-sm p-3 text-center">
//                     <span className="text-[10px] block text-gray-400 font-bold uppercase tracking-wider mb-0.5">Max Price</span>
//                     <span className="text-xs font-bold text-[#0E292F]">₦500,000,000+</span>
//                   </div>
//                 </div>
//                 <input 
//                   type="range" 
//                   min="0" 
//                   max="500000000" 
//                   className="w-full accent-[#0E292F] h-1.5 bg-gray-200 rounded-none cursor-pointer mt-2"
//                 />
//               </div>

//               {/* Box Block Selector Matrices: Beds */}
//               <div className="space-y-2">
//                 <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">Beds</h3>
//                 <div className="grid grid-cols-6 border border-gray-200 rounded-sm overflow-hidden text-center text-xs font-bold h-11 items-center bg-white">
//                   {["Any", "1", "2", "3", "4", "5+"].map((num) => (
//                     <button
//                       key={num}
//                       type="button"
//                       onClick={() => setBeds(num)}
//                       className={`h-full flex items-center justify-center border-r last:border-r-0 border-gray-200 transition-colors ${
//                         beds === num ? "bg-[#0E292F] text-white" : "text-gray-600 hover:bg-gray-50"
//                       }`}
//                     >
//                       {num}
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               {/* Box Block Selector Matrices: Baths */}
//               <div className="space-y-2">
//                 <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">Baths</h3>
//                 <div className="grid grid-cols-7 border border-gray-200 rounded-sm overflow-hidden text-center text-xs font-bold h-11 items-center bg-white">
//                   {["Any", "1", "2", "3", "4", "5", "6+"].map((num) => (
//                     <button
//                       key={num}
//                       type="button"
//                       onClick={() => setBaths(num)}
//                       className={`h-full flex items-center justify-center border-r last:border-r-0 border-gray-200 transition-colors ${
//                         baths === num ? "bg-[#0E292F] text-white" : "text-gray-600 hover:bg-gray-50"
//                       }`}
//                     >
//                       {num}
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               {/* Property Type Block Cards Grid */}
//               <div className="space-y-3">
//                 <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">Home Type</h3>
//                 <div className="grid grid-cols-3 gap-2">
//                   {[
//                     { id: "Any", label: "Any" },
//                     { id: "Studio", label: "Studio Apartment" },
//                     { id: "Apartment", label: "Apartment" },
//                     { id: "Detached", label: "Detached" },
//                     { id: "Semi", label: "Semi-Detached" },
//                     { id: "Terrace", label: "Terrace" },
//                   ].map((item) => (
//                     <button
//                       key={item.id}
//                       type="button"
//                       onClick={() => setHomeType(item.id)}
//                       className={`p-3.5 border text-center flex flex-col items-center justify-center min-h-[64px] rounded-sm transition-all ${
//                         homeType === item.id 
//                           ? "border-[#0E292F] bg-[#0E292F] font-bold text-white" 
//                           : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
//                       }`}
//                     >
//                       <span className="text-[11px] tracking-tight font-bold leading-tight">{item.label}</span>
//                     </button>
//                   ))}
//                 </div>
//               </div>

//             </div>

//             {/* Bottom Actions Footer Area (Sharp Box Actions) */}
//             <div className="p-4 bg-white border-t border-gray-100 flex items-center gap-3 shrink-0 pb-6">
//               <button
//                 type="button"
//                 onClick={() => {
//                   setListingType("sale");
//                   setBeds("Any");
//                   setBaths("Any");
//                   setHomeType("Any");
//                 }}
//                 className="flex-1 h-12 rounded-sm border border-gray-300 text-gray-700 font-bold text-xs uppercase tracking-wider hover:bg-gray-50 transition-colors"
//               >
//                 Reset
//               </button>
//               <button
//                 type="button"
//                 onClick={() => {
//                   if (onSearch) onSearch();
//                   setIsMobileFilterOpen(false);
//                 }}
//                 className="flex-1 h-12 rounded-sm bg-[#0E292F] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#1D3F48] shadow-sm transition-colors"
//               >
//                 Search
//               </button>
//             </div>

//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SlidersHorizontal, X, ChevronDown, Search, ArrowRight } from "lucide-react";

interface SearchBarProps {
  onSearch?: (filters: { dealType: string | null; location: string | null; homeType: string | null; beds: string | null }) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileAccordion, setMobileAccordion] = useState<string | null>(null);
  
  // Core Selection States
  const [dealType, setDealType] = useState<string | null>(null);
  const [location, setLocation] = useState<string | null>(null);
  const [homeType, setHomeType] = useState<string | null>(null);
  const [beds, setBeds] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  const toggleAccordion = (name: string) => {
    setMobileAccordion(mobileAccordion === name ? null : name);
  };

  const handleSelect = (setter: (val: string) => void, val: string) => {
    setter(val);
    setActiveDropdown(null);
  };

  const handleSearchTrigger = () => {
    if (onSearch) {
      onSearch({ dealType, location, homeType, beds });
    }
  };

  const getMobileSummary = () => {
    if (!location && !homeType && !dealType && !beds) {
      return "Select Location, Type, Category...";
    }
    const parts = [];
    if (location) parts.push(location);
    if (homeType) parts.push(homeType);
    if (dealType) parts.push(dealType);
    if (beds) parts.push(`${beds} Beds`);
    return parts.join(" • ");
  };

  return (
    <div className="w-full font-sans mx-auto" ref={containerRef}>
      
      {/* ── DESKTOP PILL LAYOUT (Dark Stone Gray Border) ── */}
      <div className="hidden lg:flex items-center bg-white rounded-full p-2 pl-8 w-full max-w-5xl mx-auto shadow-[0_25px_60px_-15px_rgba(29,63,72,0.06)] border-[3px] border-stone-100 relative">
        <div className="grid grid-cols-4 flex-1 items-center divide-x divide-stone-100 text-left pr-4">
          
          {/* Category Dropdown */}
          <div className="relative cursor-pointer pr-4 select-none group" onClick={() => toggleDropdown("deal")}>
            <span className="block text-[11px] font-bold text-[#1D3F48] tracking-tight mb-0.5">Category</span>
            <div className="flex items-center justify-between">
              <span className={`text-[14px] font-semibold capitalize transition-colors ${dealType ? "text-stone-900 font-bold" : "text-stone-500 group-hover:text-stone-800"}`}>
                {dealType || "Select Category"}
              </span>
              <ChevronDown size={14} className="text-stone-400 group-hover:text-[#1D3F48] transition-colors" />
            </div>
            <AnimatePresence>
              {activeDropdown === "deal" && (
                <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 15 }} className="absolute left-0 top-[110%] mt-2 z-40 bg-white border border-stone-100 shadow-xl rounded-xl p-1.5 min-w-[160px] space-y-0.5">
                  {["Rent", "Sale"].map((opt) => (
                    <button key={opt} onClick={() => handleSelect(setDealType, opt)} className={`w-full text-left px-3 py-2 text-[12px] font-medium rounded-lg capitalize transition-colors ${dealType === opt ? "bg-[#1D3F48] text-white" : "text-stone-600 hover:bg-stone-50"}`}>{opt}</button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Location Dropdown */}
          <div className="relative cursor-pointer px-6 select-none group" onClick={() => toggleDropdown("location")}>
            <span className="block text-[11px] font-bold text-[#1D3F48] tracking-tight mb-0.5">Location</span>
            <div className="flex items-center justify-between">
              <span className={`text-[14px] font-semibold capitalize transition-colors ${location ? "text-stone-900 font-bold" : "text-stone-500 group-hover:text-stone-800"}`}>
                {location || "Select Location"}
              </span>
              <ChevronDown size={14} className="text-stone-400 group-hover:text-[#1D3F48] transition-colors" />
            </div>
            <AnimatePresence>
              {activeDropdown === "location" && (
                <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 15 }} className="absolute left-4 top-[110%] mt-2 z-40 bg-white border border-stone-100 shadow-xl rounded-xl p-1.5 min-w-[180px] space-y-0.5">
                  {["ikoyi", "lekki", "banana island", "victoria island", "parkview"].map((opt) => (
                    <button key={opt} onClick={() => handleSelect(setLocation, opt)} className={`w-full text-left px-3 py-2 text-[12px] font-medium rounded-lg capitalize transition-colors ${location === opt ? "bg-[#1D3F48] text-white" : "text-stone-600 hover:bg-stone-50"}`}>{opt}</button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Type Dropdown */}
          <div className="relative cursor-pointer px-6 select-none group" onClick={() => toggleDropdown("type")}>
            <span className="block text-[11px] font-bold text-[#1D3F48] tracking-tight mb-0.5">Property Type</span>
            <div className="flex items-center justify-between">
              <span className={`text-[14px] font-semibold capitalize transition-colors ${homeType ? "text-stone-900 font-bold" : "text-stone-500 group-hover:text-stone-800"}`}>
                {homeType || "Select Type"}
              </span>
              <ChevronDown size={14} className="text-stone-400 group-hover:text-[#1D3F48] transition-colors" />
            </div>
            <AnimatePresence>
              {activeDropdown === "type" && (
                <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 15 }} className="absolute left-4 top-[110%] mt-2 z-40 bg-white border border-stone-100 shadow-xl rounded-xl p-1.5 min-w-[180px] space-y-0.5">
                  {["Apartment", "duplex", "mansion", "flat", "penthhouse", "land", "terrece", "office"].map((opt) => (
                    <button key={opt} onClick={() => handleSelect(setHomeType, opt)} className={`w-full text-left px-3 py-2 text-[12px] font-medium rounded-lg capitalize transition-colors ${homeType === opt ? "bg-[#1D3F48] text-white" : "text-stone-600 hover:bg-stone-50"}`}>{opt}</button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Bedroom Dropdown */}
          <div className="relative cursor-pointer pl-6 pr-2 select-none group" onClick={() => toggleDropdown("beds")}>
            <span className="block text-[11px] font-bold text-[#1D3F48] tracking-tight mb-0.5">Bedrooms</span>
            <div className="flex items-center justify-between">
              <span className={`text-[14px] font-semibold transition-colors ${beds ? "text-stone-900 font-bold" : "text-stone-500 group-hover:text-stone-800"}`}>
                {beds ? `${beds} Beds` : "Select Bedrooms"}
              </span>
              <ChevronDown size={14} className="text-stone-400 group-hover:text-[#1D3F48] transition-colors" />
            </div>
            <AnimatePresence>
              {activeDropdown === "beds" && (
                <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 15 }} className="absolute left-4 top-[110%] mt-2 z-40 bg-white border border-stone-100 shadow-xl rounded-xl p-1.5 min-w-[130px] space-y-0.5">
                  {["2", "3", "4", "5", "6"].map((num) => (
                    <button key={num} onClick={() => handleSelect(setBeds, num)} className={`w-full text-left px-3 py-2 text-[12px] font-medium rounded-lg transition-colors ${beds === num ? "bg-[#1D3F48] text-white" : "text-stone-600 hover:bg-stone-50"}`}>{num} Beds</button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

        {/* Teal Search Icon Button */}
        <motion.button 
          onClick={handleSearchTrigger}
          whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}
          className="w-14 h-14 rounded-full bg-[#1D3F48] hover:bg-[#152e35] flex items-center justify-center text-white shrink-0 shadow-md shadow-stone-900/10 transition-colors"
        >
          <Search size={22} strokeWidth={2.5} />
        </motion.button>
      </div>

      {/* ── MOBILE TRIGGER BAR ── */}
      <div className="lg:hidden w-full px-0 font-sans">
        <div 
          onClick={() => setIsMobileFilterOpen(true)}
          className="w-full h-14 bg-white border border-stone-200/90 rounded-full px-5 flex items-center justify-between shadow-[0_8px_30px_rgba(0,0,0,0.03)] cursor-pointer select-none"
        >
          <div className="flex items-center gap-3 text-left min-w-0 flex-1">
            <div className="w-8 h-8 rounded-full bg-[#1D3F48]/5 flex items-center justify-center text-[#1D3F48] shrink-0">
              <Search size={14} strokeWidth={2.5} />
            </div>
            <div className="flex flex-col min-w-0">
              <span className={`text-[12px] capitalize truncate ${(!location && !homeType && !dealType && !beds) ? "text-stone-500 font-semibold" : "text-stone-900 font-bold"}`}>
                {getMobileSummary()}
              </span>
            </div>
          </div>
          
          <div className="h-7 w-px bg-stone-200 mx-3 shrink-0" />
          
          <div className="flex items-center justify-center text-stone-500 shrink-0">
            <SlidersHorizontal size={14} strokeWidth={2.5} className="text-[#1D3F48]" />
          </div>
        </div>
      </div>

      {/* ── MOBILE ACCORDION CANVAS SHEET ── */}
      <AnimatePresence>
        {isMobileFilterOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 lg:hidden bg-stone-900/40 backdrop-blur-sm flex flex-col justify-end font-sans">
            <div className="flex-1" onClick={() => setIsMobileFilterOpen(false)} />
            <motion.div 
              initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              className="bg-white border-t border-stone-100 rounded-t-[28px] w-full max-h-[88vh] flex flex-col overflow-hidden shadow-2xl"
            >
              {/* Header block */}
              <div className="px-6 py-5 flex items-center justify-between border-b border-stone-100 shrink-0">
                <h3 className="text-[15px] font-bold text-stone-900 text-center w-full relative font-sans">
                  Search Parameters
                  <button onClick={() => setIsMobileFilterOpen(false)} className="absolute right-0 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center rounded-full bg-stone-100 text-stone-600">
                    <X size={13} strokeWidth={2.5} />
                  </button>
                </h3>
              </div>

              <div className="flex-1 overflow-y-auto px-6 py-2 divide-y divide-stone-100">
                
                {/* Category Block (Selecting changes to #3D7188) */}
                <div className="py-4">
                  <div onClick={() => toggleAccordion("deal")} className="flex items-center justify-between cursor-pointer select-none">
                    <span className="text-[13px] font-bold text-[#1D3F48]">Category</span>
                    <div className="flex items-center gap-1.5">
                      <span className={`text-[13px] capitalize ${dealType ? "text-stone-900 font-bold" : "text-stone-500"}`}>
                        {dealType || "Select Category"}
                      </span>
                      <ChevronDown size={14} className={`text-stone-400 transition-transform ${mobileAccordion === "deal" ? "rotate-180" : ""}`} />
                    </div>
                  </div>
                  {mobileAccordion === "deal" && (
                    <div className="mt-3 grid grid-cols-2 gap-2 p-1 bg-stone-50 rounded-xl">
                      {["Rent", "Sale"].map((opt) => (
                        <button key={opt} onClick={() => setDealType(opt)} className={`h-9 text-[12px] font-semibold rounded-lg capitalize transition-all ${dealType === opt ? "bg-[#3D7188] text-white" : "text-stone-600"}`}>{opt}</button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Location Block (Selecting changes to #3D7188) */}
                <div className="py-4">
                  <div onClick={() => toggleAccordion("location")} className="flex items-center justify-between cursor-pointer select-none">
                    <span className="text-[13px] font-bold text-[#1D3F48]">Location</span>
                    <div className="flex items-center gap-1.5">
                      <span className={`text-[13px] capitalize ${location ? "text-stone-900 font-bold" : "text-stone-500"}`}>
                        {location || "Select Location"}
                      </span>
                      <ChevronDown size={14} className={`text-stone-400 transition-transform ${mobileAccordion === "location" ? "rotate-180" : ""}`} />
                    </div>
                  </div>
                  {mobileAccordion === "location" && (
                    <div className="mt-3 space-y-1">
                      {["ikoyi", "lekki", "banana island", "victoria island", "parkview"].map((opt) => (
                        <button key={opt} onClick={() => setLocation(opt)} className={`w-full text-left h-10 px-4 text-[12px] font-semibold rounded-xl capitalize ${location === opt ? "bg-[#3D7188] text-white" : "bg-stone-50 text-stone-600"}`}>{opt}</button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Property Type Block (Selecting changes to #3D7188) */}
                <div className="py-4">
                  <div onClick={() => toggleAccordion("type")} className="flex items-center justify-between cursor-pointer select-none">
                    <span className="text-[13px] font-bold text-[#1D3F48]">Property Type</span>
                    <div className="flex items-center gap-1.5">
                      <span className={`text-[13px] capitalize ${homeType ? "text-stone-900 font-bold" : "text-stone-500"}`}>
                        {homeType || "Select Type"}
                      </span>
                      <ChevronDown size={14} className={`text-stone-400 transition-transform ${mobileAccordion === "type" ? "rotate-180" : ""}`} />
                    </div>
                  </div>
                  {mobileAccordion === "type" && (
                    <div className="mt-3 space-y-1">
                      {["Apartment", "duplex", "mansion", "flat", "penthhouse", "land", "terrece", "office"].map((opt) => (
                        <button key={opt} onClick={() => setHomeType(opt)} className={`w-full text-left h-10 px-4 text-[12px] font-semibold rounded-xl capitalize ${homeType === opt ? "bg-[#3D7188] text-white" : "bg-stone-50 text-stone-600"}`}>{opt}</button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Bedrooms Block (Selecting changes to #3D7188) */}
                <div className="py-4">
                  <div onClick={() => toggleAccordion("beds")} className="flex items-center justify-between cursor-pointer select-none">
                    <span className="text-[13px] font-bold text-[#1D3F48]">Bedrooms</span>
                    <div className="flex items-center gap-1.5">
                      <span className={`text-[13px] ${beds ? "text-stone-900 font-bold" : "text-stone-500"}`}>
                        {beds ? `${beds} Beds` : "Select Bedrooms"}
                      </span>
                      <ChevronDown size={14} className={`text-stone-400 transition-transform ${mobileAccordion === "beds" ? "rotate-180" : ""}`} />
                    </div>
                  </div>
                  {mobileAccordion === "beds" && (
                    <div className="mt-3 grid grid-cols-5 gap-1.5 p-1 bg-stone-50 rounded-xl">
                      {["2", "3", "4", "5", "6"].map((num) => (
                        <button key={num} onClick={() => setBeds(num)} className={`h-9 text-[12px] font-semibold rounded-lg transition-all ${beds === num ? "bg-[#3D7188] text-white" : "text-stone-600"}`}>{num}</button>
                      ))}
                    </div>
                  )}
                </div>

              </div>

              {/* ── SYMMETRICAL ACTION BUTTONS FOOTER ── */}
              <div className="p-4 bg-white border-t border-stone-100 pb-8 shrink-0">
                <div className="grid grid-cols-2 gap-3 w-full items-center">
                  
                  {/* Clear All Button */}
                  <motion.div initial="hidden" animate="visible" className="w-full pt-1">
                    <motion.button
                      type="button"
                      onClick={() => { setDealType(null); setLocation(null); setHomeType(null); setBeds(null); setMobileAccordion(null); }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full inline-flex items-center justify-center h-12 rounded-[10px] bg-white text-[#1D3F48] transition-all border border-stone-200 font-sans text-[10px] sm:text-[11px] font-bold tracking-widest uppercase whitespace-nowrap shadow-none"
                    >
                      <span>Clear All</span>
                    </motion.button>
                  </motion.div>

                  {/* Search Button */}
                  <motion.div initial="hidden" animate="visible" className="w-full pt-1">
                    <motion.button
                      type="button"
                      onClick={() => { handleSearchTrigger(); setIsMobileFilterOpen(false); }}
                      whileHover={{ scale: 1.02, y: -1, backgroundColor: "#152e35" }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full inline-flex items-center justify-between h-12 pl-5 pr-2 rounded-[10px] bg-[#1D3F48] text-white transition-all duration-300 shadow-none group font-sans text-[10px] sm:text-[11px] font-bold tracking-widest uppercase whitespace-nowrap border border-transparent"
                    >
                      <span className="group-hover:translate-x-1 transition-transform duration-300">
                        Search
                      </span>
                      <div className="flex items-center justify-center w-8 h-8 rounded-[6px] bg-white/10 text-white group-hover:bg-white group-hover:text-[#1D3F48] transition-all duration-300 shrink-0">
                        <ArrowRight size={14} strokeWidth={2.5} className="group-hover:translate-x-0.5 transition-transform duration-300" />
                      </div>
                    </motion.button>
                  </motion.div>

                </div>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}