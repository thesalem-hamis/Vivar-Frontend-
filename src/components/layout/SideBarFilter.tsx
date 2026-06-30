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