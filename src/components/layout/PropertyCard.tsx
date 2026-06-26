// "use client";

import { useRef, useState } from "react";
import { MapPin, BedDouble, Bath, Maximize, ChevronLeft, ChevronRight } from "lucide-react";

export default function PropertyCard({ property }: { property: any }) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const images = property.property_images && property.property_images.length > 0
    ? property.property_images.map((img: any) => img.url)
    : [];

  const formatPrice = (num: number) => {
    return num.toLocaleString();
  };

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, clientWidth } = scrollContainerRef.current;
    const index = Math.round(scrollLeft / clientWidth);
    setActiveIndex(index);
  };

  const scrollToIndex = (index: number) => {
    if (!scrollContainerRef.current) return;
    const clientWidth = scrollContainerRef.current.clientWidth;
    scrollContainerRef.current.scrollTo({
      left: index * clientWidth,
      behavior: "smooth",
    });
  };

  const displayImages = images.length > 0 ? images : ["/placeholder.jpg"];

  return (
    <div className="group bg-white rounded-2xl border border-gray-200 p-3.5 shadow-[0_2px_15px_rgba(0,0,0,0.01)] hover:shadow-[0_12px_35px_rgba(14,41,47,0.07)] transition-all duration-400 flex flex-col gap-4 font-sans">
      
      {/* ── MULTI-SCROLL IMAGE CAROUSEL LAYER ── */}
      <div className="relative aspect-[1.75/1] w-full overflow-hidden rounded-xl bg-gray-50 group/carousel">
        <div 
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex w-full h-full overflow-x-auto snap-x snap-mandatory scrollbar-none"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {displayImages.map((imgUrl: string, idx: number) => (
            <div key={idx} className="w-full h-full shrink-0 snap-start snap-always">
              <img
                src={imgUrl}
                alt={`${property.title} view ${idx + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />

        <div className="absolute top-2.5 left-2.5 z-10 flex flex-wrap gap-1.5 max-w-[80%] font-sans">
          <span className="bg-[#0E292F]/95 backdrop-blur-sm text-white text-[8px] font-bold uppercase tracking-wider px-2 py-1 rounded-[4px]">
            {property.listing_type || property.type}
          </span>
        </div>

        {displayImages.length > 1 && (
          <>
            <button 
              onClick={() => scrollToIndex(Math.max(0, activeIndex - 1))}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white/80 text-gray-800 flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-opacity shadow-sm disabled:opacity-0 z-10"
              disabled={activeIndex === 0}
            >
              <ChevronLeft size={14} strokeWidth={2.5} />
            </button>
            <button 
              onClick={() => scrollToIndex(Math.min(displayImages.length - 1, activeIndex + 1))}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white/80 text-gray-800 flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-opacity shadow-sm disabled:opacity-0 z-10"
              disabled={activeIndex === displayImages.length - 1}
            >
              <ChevronRight size={14} strokeWidth={2.5} />
            </button>
          </>
        )}

        {displayImages.length > 1 && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1 z-10">
            {displayImages.map((_: string, idx: number) => (
              <button
                key={idx}
                onClick={() => scrollToIndex(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${activeIndex === idx ? "bg-white w-3.5" : "bg-white/50 w-1.5"}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* ── METADATA & CONTENT AREA ── */}
      <div className="px-0.5 space-y-3.5 flex-1 flex flex-col justify-between">
        
        <div className="space-y-1.5">
          <h4 className="text-2xl font-sans font-bold text-gray-900 tracking-tight">
            ₦{formatPrice(property.price)}
          </h4>

          <div className="flex items-center gap-1 text-[11px] text-gray-900 font-bold tracking-wide font-sans">
            <MapPin size={11} className="shrink-0 text-[#3D7188]" />
            <span className="line-clamp-1">
              {[property.address, property.city, property.state].filter(Boolean).join(", ")}
            </span>
          </div>

          <p className="text-[11px] text-gray-500 font-normal leading-relaxed line-clamp-2 pt-0.5 font-sans">
            {property.title}
          </p>
        </div>

        {/* Footer Action Tray */}
        <div className="flex items-end justify-between gap-4 border-t border-gray-100 pt-3">
          
          <div className="flex items-center gap-2 font-sans">
            <div className="h-6 px-2 inline-flex items-center gap-1 rounded bg-gray-50 text-[10px] font-bold text-gray-900 border border-gray-200">
              <BedDouble size={10} className="text-[#3D7188]" />
              <span>{property.bedrooms} Bed</span>
            </div>
            <div className="h-6 px-2 inline-flex items-center gap-1 rounded bg-gray-50 text-[10px] font-bold text-gray-900 border border-gray-200">
              <Bath size={10} className="text-[#3D7188]" />
              <span>{property.bathrooms} Bath</span>
            </div>
            <div className="h-6 px-2 inline-flex items-center gap-1 rounded bg-gray-50 text-[10px] font-bold text-gray-900 border border-gray-200">
              <Maximize size={10} className="text-[#3D7188]" />
              <span>{property.area_sqft || property.area_sqm} sqft</span>
            </div>
          </div>

          <button className="h-8 px-3 bg-[#0E292F] text-white text-[10px] font-bold uppercase tracking-wider rounded hover:bg-[#0E292F]/90 transition-colors">
            View
          </button>
        </div>
      </div>
    </div>
  );
}