"use client";

import { ArrowUpRight } from "lucide-react";

interface ListingItem {
  id: string;
  name: string;
  description: string;
  location: string;
  image: string;
}

interface BestCardProps {
  item: ListingItem;
}

export default function BestCard({ item }: BestCardProps) {
  return (
    <a
      href={`/properties/${item.id}`}
      className="relative flex-none w-[280px] sm:w-[320px] lg:w-[340px] aspect-[3/4] 
        rounded-[24px] overflow-hidden group cursor-pointer block no-underline shadow-sm"
    >
      {/* Property Image */}
      <img
        src={item.image}
        alt={item.name}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
      />

      {/* Vignette Blur Overlays */}
      <div 
        className="absolute inset-x-0 bottom-0 h-2/5 backdrop-blur-[6px] pointer-events-none"
        style={{
          maskImage: "linear-gradient(to top, black 40%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to top, black 40%, transparent 100%)"
        }}
      />
      <div 
        className="absolute inset-0 bg-gradient-to-t from-[#0E292F]/95 via-[#0E292F]/60 to-transparent mix-blend-multiply transition-opacity duration-300 group-hover:opacity-90"
      />

      {/* Content Area */}
      <div className="absolute bottom-0 inset-x-0 p-5 sm:p-6 flex flex-col gap-1 z-10 text-left">
        <h3 className="text-white text-lg sm:text-xl font-serif font-light tracking-tight leading-tight group-hover:text-white/80 transition-colors duration-300">
          {item.name}
        </h3>
        
        <p className="text-white/80 text-[12px] sm:text-[13px] font-sans font-light leading-relaxed line-clamp-2 max-w-[92%]">
          {item.description}
        </p>

        {/* Location Row - Clean Squared Action Layout */}
        <div className="flex items-center justify-between mt-2 pt-3 border-t border-white/10">
          <span className="text-[9px] font-medium tracking-[0.15em] uppercase text-white font-sans">
            {item.location}
          </span>
          <div className="w-7 h-7 rounded-[6px] border border-white/30 flex items-center justify-center bg-white/10
            group-hover:bg-white group-hover:border-white transition-all duration-300 overflow-hidden">
            <ArrowUpRight 
              size={13} 
              strokeWidth={2.5} 
              className="text-white group-hover:text-[#0E292F] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" 
            />
          </div>
        </div>
      </div>
    </a>
  );
}