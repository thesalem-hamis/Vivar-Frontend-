"use client";

import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MapPin,
  BedDouble,
  Bath,
  Maximize,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function PropertyCard({ property }: { property: any }) {
  const navigate = useNavigate();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const images =
    property.property_images && property.property_images.length > 0
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

  const handleClick = () => {
    navigate(`/properties/${property.id}`);
  };

  return (
    <div className="group bg-white rounded-2xl border border-gray-200 p-3.5 shadow-[0_2px_15px_rgba(0,0,0,0.01)] hover:shadow-[0_12px_35px_rgba(14,41,47,0.07)] transition-all duration-400 flex flex-col gap-4 font-sans cursor-pointer">
      {/* ── MULTI-SCROLL IMAGE CAROUSEL LAYER ── */}
      <div className="relative aspect-[1.75/1] w-full overflow-hidden rounded-xl bg-gray-50 group/carousel">
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex w-full h-full overflow-x-auto snap-x snap-mandatory scrollbar-none"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {displayImages.map((imgUrl: string, idx: number) => (
            <div
              key={idx}
              className="w-full h-full shrink-0 snap-start snap-always"
            >
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
              onClick={() =>
                scrollToIndex(
                  Math.min(displayImages.length - 1, activeIndex + 1),
                )
              }
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
      <div
        onClick={handleClick}
        className="px-0.5 space-y-3.5 flex-1 flex flex-col justify-between"
      >
        <div className="space-y-1.5">
          <h4 className="text-2xl font-sans font-bold text-gray-900 tracking-tight">
            ₦{formatPrice(property.price)}
          </h4>

          <div className="items-center gap-1 text-[17px] mb-2 text-gray-900 font-bold tracking-wide font-sans">
            <span className="line-clamp-1">{property.title}</span>
          </div>

          <div className="flex items-center gap-1 text-[11px] text-gray-500 font-normal leading-relaxed line-clamp-2 pt-0.5 font-sans">
            <MapPin size={11} className="shrink-0 text-[#3D7188]" />
            <span className="line-clamp-1">
              {[property.address, property.city, property.state]
                .filter(Boolean)
                .join(", ")}
            </span>
          </div>
        </div>

        {/* Footer Action Tray */}
        <div className="flex items-end justify-between gap-4 border-t border-gray-100 pt-3">
          <div className="flex items-center gap-2 font-sans">
            <div className="h-6 px-2 inline-flex items-center gap-1 text-[12px] font-bold text-gray-900">
              <BedDouble size={12} className="text-[#3D7188]" />
              <span>{property.bedrooms} Bed</span>
            </div>

            <div className="h-6 px-2 inline-flex items-center gap-1 text-[12px] font-bold text-gray-900">
              <Bath size={12} className="text-[#3D7188]" />
              <span>{property.bathrooms} Bath</span>
            </div>
            {/* <div className="h-6 px-2 inline-flex items-center gap-1 text-[10px] font-bold text-gray-900">
              <Maximize size={10} className="text-[#3D7188]" />
              <span>{property.area_sqft || property.area_sqm} sqft</span>
            </div> */}
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              handleClick();
            }}
            className="h-8 px-3 bg-[#0E292F] text-white text-[10px] font-bold uppercase tracking-wider rounded hover:bg-[#0E292F]/90 transition-colors"
          >
            View
          </button>
        </div>
      </div>
    </div>
  );
}

// "use client";

// import { useRef, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import { MapPin, BedDouble, Bath, Maximize, ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";

// export default function PropertyCard({ property }: { property: any }) {
//   const navigate = useNavigate();
//   const scrollContainerRef = useRef<HTMLDivElement>(null);
//   const [activeIndex, setActiveIndex] = useState(0);

//   const images =
//     property.property_images && property.property_images.length > 0
//       ? property.property_images.map((img: any) => img.url)
//       : [];

//   const formatPrice = (num: number) => num.toLocaleString();

//   const handleScroll = () => {
//     if (!scrollContainerRef.current) return;
//     const { scrollLeft, clientWidth } = scrollContainerRef.current;
//     setActiveIndex(Math.round(scrollLeft / clientWidth));
//   };

//   const scrollToIndex = (index: number) => {
//     if (!scrollContainerRef.current) return;
//     scrollContainerRef.current.scrollTo({
//       left: index * scrollContainerRef.current.clientWidth,
//       behavior: "smooth",
//     });
//   };

//   const displayImages = images.length > 0 ? images : ["/placeholder.jpg"];

//   const handleClick = () => navigate(`/properties/${property.id}`);

//   return (
//     <motion.div
//       onClick={handleClick}
//       initial={{ opacity: 0, y: 16 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
//       whileHover={{ y: -3 }}
//       className="group bg-white rounded-2xl border border-stone-200/60 overflow-hidden shadow-[0_2px_12px_rgba(14,41,47,0.04)] hover:shadow-[0_16px_48px_rgba(14,41,47,0.10)] transition-all duration-500 flex flex-col cursor-pointer"
//     >
//       {/* ── IMAGE CAROUSEL ── */}
//       <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#F5F5F5] group/carousel shrink-0">
//         <div
//           ref={scrollContainerRef}
//           onScroll={handleScroll}
//           className="flex w-full h-full overflow-x-auto snap-x snap-mandatory scrollbar-none"
//           style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
//         >
//           {displayImages.map((imgUrl: string, idx: number) => (
//             <div key={idx} className="w-full h-full shrink-0 snap-start snap-always">
//               <img
//                 src={imgUrl}
//                 alt={`${property.title} view ${idx + 1}`}
//                 className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
//               />
//             </div>
//           ))}
//         </div>

//         {/* Gradient veil */}
//         <div className="absolute inset-0 bg-gradient-to-t from-[#0E292F]/50 via-transparent to-transparent pointer-events-none" />

//         {/* Listing type badge */}
//         <div className="absolute top-3.5 left-3.5 z-10">
//           <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-[#0E292F]/90 backdrop-blur-sm text-white text-[9px] font-black uppercase tracking-[0.12em]">
//             {property.listing_type || property.type}
//           </span>
//         </div>

//         {/* Price overlay — bottom left */}
//         <div className="absolute bottom-3.5 left-3.5 z-10">
//           <p className="text-white text-xl font-black tracking-tight drop-shadow-md leading-none">
//             ₦{formatPrice(property.price)}
//           </p>
//           {(property.area_sqft || property.area_sqm) && (
//             <p className="text-white/70 text-[10px] font-semibold mt-0.5 tracking-wide">
//               {property.area_sqft || property.area_sqm} sqft
//             </p>
//           )}
//         </div>

//         {/* Carousel arrows */}
//         {displayImages.length > 1 && (
//           <>
//             <button
//               onClick={(e) => { e.stopPropagation(); scrollToIndex(Math.max(0, activeIndex - 1)); }}
//               disabled={activeIndex === 0}
//               className="absolute left-2.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white/85 backdrop-blur-sm text-[#0E292F] flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-all duration-200 shadow-sm disabled:opacity-0 z-10 hover:bg-white"
//             >
//               <ChevronLeft size={14} strokeWidth={2.5} />
//             </button>
//             <button
//               onClick={(e) => { e.stopPropagation(); scrollToIndex(Math.min(displayImages.length - 1, activeIndex + 1)); }}
//               disabled={activeIndex === displayImages.length - 1}
//               className="absolute right-2.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white/85 backdrop-blur-sm text-[#0E292F] flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-all duration-200 shadow-sm disabled:opacity-0 z-10 hover:bg-white"
//             >
//               <ChevronRight size={14} strokeWidth={2.5} />
//             </button>
//           </>
//         )}

//         {/* Dot indicators */}
//         {displayImages.length > 1 && (
//           <div className="absolute bottom-3.5 right-3.5 flex items-center gap-1 z-10">
//             {displayImages.map((_: string, idx: number) => (
//               <button
//                 key={idx}
//                 onClick={(e) => { e.stopPropagation(); scrollToIndex(idx); }}
//                 className={`h-1 rounded-full transition-all duration-300 ${
//                   activeIndex === idx ? "bg-white w-4" : "bg-white/40 w-1.5"
//                 }`}
//               />
//             ))}
//           </div>
//         )}
//       </div>

//       {/* ── CONTENT ── */}
//       <div className="p-5 flex flex-col gap-4 flex-1">

//         {/* Location + title */}
//         <div className="space-y-1.5">
//           <div className="flex items-center gap-1.5 text-[#3D7188]">
//             <MapPin size={10} className="shrink-0" />
//             <span className="text-[10px] font-bold uppercase tracking-[0.1em] line-clamp-1">
//               {[property.city, property.state].filter(Boolean).join(", ")}
//             </span>
//           </div>
//           <p className="text-[13px] text-[#0E292F] font-medium leading-snug line-clamp-2 opacity-70">
//             {property.title}
//           </p>
//         </div>

//         {/* Divider */}
//         <div className="h-px bg-stone-100" />

//         {/* Specs + CTA */}
//         <div className="flex items-center justify-between gap-3">
//           <div className="flex items-center gap-2">
//             {property.bedrooms != null && (
//               <div className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-[#F5F5F5] text-[#0E292F] text-[10px] font-bold border border-stone-200/60">
//                 <BedDouble size={9} className="text-[#3D7188]" />
//                 <span>{property.bedrooms}</span>
//               </div>
//             )}
//             {property.bathrooms != null && (
//               <div className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-[#F5F5F5] text-[#0E292F] text-[10px] font-bold border border-stone-200/60">
//                 <Bath size={9} className="text-[#3D7188]" />
//                 <span>{property.bathrooms}</span>
//               </div>
//             )}
//             {(property.area_sqft || property.area_sqm) && (
//               <div className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-[#F5F5F5] text-[#0E292F] text-[10px] font-bold border border-stone-200/60">
//                 <Maximize size={9} className="text-[#3D7188]" />
//                 <span>{property.area_sqft || property.area_sqm}</span>
//               </div>
//             )}
//           </div>

//           {/* CTA — the signature button pattern */}
//           <motion.button
//             onClick={(e) => { e.stopPropagation(); handleClick(); }}
//             whileHover={{ scale: 1.02 }}
//             whileTap={{ scale: 0.97 }}
//             className="inline-flex items-center gap-3 pl-4 pr-1.5 py-1.5 rounded-[10px] bg-[#0E292F] text-white transition-all duration-300 shadow-md group/btn font-sans text-[9px] font-black tracking-widest uppercase whitespace-nowrap"
//           >
//             <span className="group-hover/btn:translate-x-0.5 transition-transform duration-300">View</span>
//             <div className="flex items-center justify-center w-6 h-6 rounded-[6px] bg-white/15 group-hover/btn:bg-white/25 transition-all duration-300">
//               <ArrowUpRight size={12} strokeWidth={2.5} className="group-hover/btn:rotate-45 transition-transform duration-300" />
//             </div>
//           </motion.button>
//         </div>

//       </div>
//     </motion.div>
//   );
// }
