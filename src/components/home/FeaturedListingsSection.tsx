"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import BestCard from "@/components/layout/BestCard";
import { useEffect, useState } from "react";
import { getFeaturedProperties } from "@/lib/supabase/admin";

export default function FeaturedListingsSection() {
  const [listings, setListings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const data = await getFeaturedProperties();
        // Ensure unique listings by ID
        const uniqueListings = data?.filter(
          (item: any, index: number, self: any[]) =>
            index === self.findIndex((t: any) => t.id === item.id)
        ) || [];
        setListings(uniqueListings);
        console.log("Featured listings fetched:", uniqueListings.length, uniqueListings.map((l: any) => l.id));
      } catch (error) {
        console.error("Failed to fetch featured properties:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeatured();
  }, []);

  // Only loop if there are enough items to warrant infinite scroll
  // If 3 or fewer items, just show them without looping
  const shouldLoop = listings.length > 3;
  const displayListings = shouldLoop ? [...listings, ...listings] : listings;

  if (loading) {
    return (
      <section className="w-full py-20 md:py-28 bg-[#f9fafb] overflow-hidden flex flex-col items-center">
        <div className="max-w-3xl mx-auto px-6 text-center mb-12 md:mb-14">
          <h2 className="text-3xl sm:text-4xl font-serif font-light text-[#0E292F] tracking-tight leading-tight mb-4">
            Current Featured Listings
          </h2>
          <p className="text-sm text-black/60 font-light leading-relaxed max-w-lg mx-auto font-sans">
            Loading featured properties...
          </p>
        </div>
      </section>
    );
  }

  if (listings.length === 0) {
    return null;
  }

  return (
    <section className="w-full py-20 md:py-28 bg-[#f9fafb] overflow-hidden flex flex-col items-center">
      <div className="max-w-3xl mx-auto px-6 text-center mb-12 md:mb-14">
        <h2 className="text-3xl sm:text-4xl font-serif font-light text-[#0E292F] tracking-tight leading-tight mb-4">
          Current Featured Listings
        </h2>
        <p className="text-sm text-black/60 font-light leading-relaxed max-w-lg mx-auto font-sans">
          A handpicked selection of premium architectural masterpieces and high performing real estate assets across premier zones.
        </p>
      </div>

      {/* Marquee Container */}
      <div className="relative w-full overflow-hidden flex items-center mb-16">
        <div className="absolute inset-y-0 left-0 w-4 md:w-8 bg-gradient-to-r from-[#f9fafb]/80 to-transparent z-20 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-4 md:w-8 bg-gradient-to-l from-[#f9fafb]/80 to-transparent z-20 pointer-events-none" />

        {shouldLoop ? (
          // Infinite marquee for 4+ items
          <motion.div
            className="flex gap-6 shrink-0 px-2"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              ease: "linear",
              duration: 35,
              repeat: Infinity,
            }}
            whileHover={{ animationPlayState: "paused" }}
          >
            {displayListings.map((item, idx) => (
              <BestCard key={`${item.id}-${idx}`} item={item} />
            ))}
          </motion.div>
        ) : (
          // Static centered display for 1-3 items
          <div className="flex gap-6 justify-center w-full px-2">
            {displayListings.map((item) => (
              <BestCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>

      <a
        href="/properties"
        className="inline-flex items-center gap-6 pl-15 pr-5.5 py-2.5 rounded-[8px] bg-[#f9fafb] text-[#0E292F]
          hover:bg-[#0E292F] hover:text-white hover: border border-[#0E292F] transition-all duration-300 group
          text-[11px] font-bold tracking-[0.18em] uppercase whitespace-nowrap shadow-sm"
      >
        <span>See all our listings</span>
        <div className="flex items-center justify-center w-9 h-9 rounded-[6px] bg-[#0E292F] text-white
          group-hover:bg-[#f9fafb] group-hover:text-[#0E292F] transition-all duration-300 overflow-hidden">
          <ArrowUpRight 
            size={15} 
            strokeWidth={2.5} 
            className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" 
          />
        </div>
      </a>
    </section>
  );
}