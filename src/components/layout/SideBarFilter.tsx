// "use client";

// import { ChevronLeft, ChevronRight } from "lucide-react";

// interface SidebarFiltersProps {
//   selectedType: string;
//   setSelectedType: (type: string) => void;
//   categories: { name: string; count?: number }[];
//   cities: string[];
// }

// export default function SidebarFilters({ selectedType, setSelectedType, categories, cities }: SidebarFiltersProps) {
//   return (
//     <aside className="hidden lg:block lg:col-span-1 lg:sticky lg:top-12 space-y-6">
      
//       {/* ── BOX 1: FEATURED LISTINGS ── */}
//       <div className="bg-white p-5 border border-[#1D3F48]/20 rounded-sm">
//         <h2 className="text-lg font-serif font-bold text-[#0E292F] mb-4 tracking-tight">
//           Featured Listings
//         </h2>
//         <div className="relative aspect-[1.15/1] w-full overflow-hidden bg-gray-50 group border border-[#1D3F48]/10 rounded-2xl">
//           <img 
//             src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80" 
//             className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700" 
//             alt="Premium Preview"
//           />
//           <div className="absolute top-3 left-3 bg-[#0E292F] text-white text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-sm">
//             For Sale
//           </div>
          
//           {/* Symmetrical Premium Box Action Navigation Arrows */}
//           <button className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 bg-[#0E292F] hover:bg-[#1D3F48] text-white flex items-center justify-center rounded-r-sm transition-colors z-10">
//             <ChevronLeft size={14} strokeWidth={2.5} />
//           </button>
//           <button className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-8 bg-[#0E292F] hover:bg-[#1D3F48] text-white flex items-center justify-center rounded-l-sm transition-colors z-10">
//             <ChevronRight size={14} strokeWidth={2.5} />
//           </button>

//           {/* Text Overlay Gradient Veil */}
//           <div className="absolute inset-0 bg-gradient-to-t from-[#0E292F]/95 via-[#0E292F]/20 to-transparent p-4 flex flex-col justify-end pointer-events-none">
//             <p className="text-white text-xs font-sans font-bold tracking-wide">From ₦1,600,000,000</p>
//             <p className="text-white/80 text-[10px] font-sans uppercase font-bold tracking-wider mt-0.5">Ikoyi</p>
//           </div>
//         </div>
//       </div>

//       {/* ── BOX 2: PROPERTY TYPE NESTED TREE ── */}
//       <div className="bg-white p-5 border border-[#1D3F48]/20 rounded-sm font-sans">
//         <h2 className="text-lg font-serif font-bold text-[#0E292F] mb-4 tracking-tight">
//           Property Type
//         </h2>
//         <div className="space-y-4 text-xs font-semibold">
          
//           {/* Residential Tree Node */}
//           <div className="space-y-2">
//             <span className="text-[#0E292F] font-bold uppercase tracking-wider text-[11px] block">› Residential</span>
//             <div className="pl-3 flex flex-col gap-2.5 text-[#0E292F] font-medium border-l border-[#1D3F48]/20 ml-1.5 mt-1">
//               {categories.slice(1, 5).map((cat) => (
//                 <button 
//                   key={cat.name} 
//                   onClick={() => setSelectedType(cat.name)}
//                   className={`text-left hover:text-[#0E292F] transition-colors flex items-center gap-1.5 group ${
//                     selectedType === cat.name ? "text-[#0E292F] font-bold" : ""
//                   }`}
//                 >
//                   <span className={`text-gray-300 group-hover:text-[#0E292F] transition-colors ${
//                     selectedType === cat.name ? "text-[#0E292F]" : ""
//                   }`}>›</span> 
//                   {cat.name}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Commercial Tree Node */}
//           <div className="space-y-2 pt-2 border-t border-gray-100">
//             <span className="text-[#0E292F] font-bold uppercase tracking-wider text-[11px] block">› Commercial</span>
//             <div className="pl-3 flex flex-col gap-2.5 text-[#0E292F] font-medium border-l border-[#1D3F48]/20 ml-1.5 mt-1">
//               <button className="text-left hover:text-[#0E292F] transition-colors flex items-center gap-1.5 group">
//                 <span className="text-gray-300 group-hover:text-[#0E292F] transition-colors">›</span> Commercial Land
//               </button>
//               <button className="text-left hover:text-[#0E292F] transition-colors flex items-center gap-1.5 group">
//                 <span className="text-gray-300 group-hover:text-[#0E292F] transition-colors">›</span> Office
//               </button>
//             </div>
//           </div>

//         </div>
//       </div>

//       {/* ── BOX 3: CITIES ACCORDION ── */}
//       <div className="bg-white p-5 border border-[#1D3F48]/20 rounded-sm font-sans">
//         <h2 className="text-lg font-serif font-bold text-[#0E292F] mb-4 tracking-tight">
//           Cities
//         </h2>
//         <div className="flex flex-col gap-2.5 text-xs font-medium text-[#0E292F]">
//           {cities.map((city) => (
//             <button key={city} className="text-left hover:text-[#0E292F] transition-colors flex items-center gap-1.5 group font-semibold">
//               <span className="text-gray-300 group-hover:text-[#0E292F] transition-colors">›</span> {city}
//             </button>
//           ))}
//         </div>
//       </div>

//     </aside>
//   );
// }

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface SidebarFiltersProps {
  selectedType: string;
  setSelectedType: (type: string) => void;
  categories: { name: string; count?: number }[];
  cities: string[];
}

export default function SidebarFilters({
  selectedType,
  setSelectedType,
  categories,
  cities,
}: SidebarFiltersProps) {
  const [isResidentialOpen, setIsResidentialOpen] = useState(true);
  const [isCommercialOpen, setIsCommercialOpen] = useState(true);

  return (
    <aside className="hidden lg:flex lg:col-span-1 flex-col gap-6 lg:sticky lg:top-12 font-sans text-[#0E292F]">
      
      {/* ── PROPERTY TYPE FILTER ── */}
      <div className="bg-white rounded-xl border border-stone-200/60 overflow-hidden shadow-sm p-5 flex flex-col gap-4">
        <div className="border-b border-stone-100 pb-3">
          <h2 className="text-[15px] font-bold">Property Type</h2>
        </div>
        
        <div className="space-y-1">
          <button
            onClick={() => setSelectedType("All Properties")}
            className={`w-full text-left px-4 py-3 rounded-lg text-[11px] font-bold transition-all duration-200 flex items-center justify-between ${
              selectedType === "All Properties"
                ? "bg-[#1D3F48] text-white"
                : "text-[#0E292F] hover:bg-[#F5F5F5]"
            }`}
          >
            <span>All Properties</span>
          </button>

          {/* Residential Section */}
          <div className="pt-1">
            <button
              onClick={() => setIsResidentialOpen(!isResidentialOpen)}
              className="w-full flex items-center justify-between px-4 py-2.5 rounded-lg text-[12px] font-black text-[#1D3F48] hover:bg-[#F5F5F5] transition-all"
            >
              <span>Residential</span>
              <motion.div animate={{ rotate: isResidentialOpen ? 180 : 0 }}>
                <ChevronDown size={12} strokeWidth={2.5} />
              </motion.div>
            </button>
            <AnimatePresence initial={false}>
              {isResidentialOpen && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                  <div className="pl-8 py-1 flex flex-col gap-1">
                    {["Mansion", "Terrace", "Apartment", "Fully Detached Duplex", "Penthouse", "Residential Land"].map((cat) => (
                      <button key={cat} onClick={() => setSelectedType(cat)} className="text-left text-[11px] font-medium text-stone-500 hover:text-[#0E292F]">
                        › {cat}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Commercial Section */}
          <div>
            <button
              onClick={() => setIsCommercialOpen(!isCommercialOpen)}
              className="w-full flex items-center justify-between px-4 py-2.5 rounded-lg text-[13px] font-black text-[#1D3F48] hover:bg-[#F5F5F5] transition-all"
            >
              <span>Commercial</span>
              <motion.div animate={{ rotate: isCommercialOpen ? 180 : 0 }}>
                <ChevronDown size={12} strokeWidth={2.5} />
              </motion.div>
            </button>
            <AnimatePresence initial={false}>
              {isCommercialOpen && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                  <div className="pl-8 py-1 flex flex-col gap-1">
                    {["Commercial Land", "Office"].map((cat) => (
                      <button key={cat} onClick={() => setSelectedType(cat)} className="text-left text-[11px] font-medium text-stone-500 hover:text-[#0E292F]">
                        › {cat}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* ── CITIES FILTER ── */}
      <div className="bg-white rounded-xl border border-stone-200/60 overflow-hidden shadow-sm p-5 flex flex-col gap-4">
        <div className="border-b border-stone-100 pb-3">
          <h2 className="text-[15px] font-bold">Cities</h2>
        </div>
        
        <div className="flex flex-col gap-2 pl-4">
          {cities.map((city) => (
            <button
              key={city}
              onClick={() => setSelectedType(city)}
              className={`text-left text-[11px] font-medium transition-colors ${
                selectedType === city ? "text-[#1D3F48] font-bold" : "text-stone-500 hover:text-[#0E292F]"
              }`}
            >
              › {city}
            </button>
          ))}
        </div>
      </div>
      
    </aside>
  );
}