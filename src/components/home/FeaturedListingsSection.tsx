"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import BestCard from "@/components/layout/BestCard";

const listings = [
  {
    id: "cuddle-cadwell",
    name: "Cuddle by Cadwell",
    description: "Cuddle is an ongoing luxury residential development located in one of the most prestigious neighborhoods in Ikoyi.",
    location: "Ikoyi, Lagos",
    image: "/properties/cuddle.jpg"
  },
  {
    id: "solis-residence",
    name: "Solis Residence",
    description: "Step into refined luxury in this modern fully detached home located in the prestigious Pinnock Beach Estate.",
    location: "Lekki, Lagos",
    image: "/properties/solis.jpg"
  },
  {
    id: "4-bourdillon",
    name: "4 Bourdillon",
    description: "Step into the epitome of luxury living at 4 Bourdillon, where every detail is crafted to offer a sophisticated lifestyle.",
    location: "Ikoyi, Lagos",
    image: "/properties/bourdillon.jpg"
  },
  {
    id: "azuri-towers",
    name: "Azuri Towers",
    description: "Azuri Towers is a landmark mixed-use luxury development located in the prestigious Marina District of Eko Atlantic.",
    location: "Eko Atlantic, Lagos",
    image: "/properties/azuri.jpg"
  },
  {
    id: "giovanni-vista",
    name: "The Giovanni Vista",
    description: "An architectural marvel offering sprawling penthouses with pristine panoramic ocean views.",
    location: "Victoria Island, Lagos",
    image: "/properties/giovanni.jpg"
  },
  {
    id: "pinnock-manor",
    name: "Pinnock Manor",
    description: "Exclusive contemporary villas crafted with structural precision, premium security systems, and private automation.",
    location: "Lekki Phase 1, Lagos",
    image: "/properties/pinnock.jpg"
  },
  {
    id: "banana-promenade",
    name: "Banana Promenade",
    description: "Ultra-premium waterfront mansions redefining baseline opulence with private boat docks and resort styling.",
    location: "Banana Island, Lagos",
    image: "/properties/banana.jpg"
  }
];

const infiniteLoopList = [...listings, ...listings];

export default function FeaturedListingsSection() {
  return (
    /* Stone White Section Background */
    <section className="w-full py-20 md:py-28 bg-[#f9fafb] overflow-hidden flex flex-col items-center">
      
      {/* Centered Typography Header */}
      <div className="max-w-3xl mx-auto px-6 text-center mb-12 md:mb-14">
        <h2 className="text-3xl sm:text-4xl font-serif font-light text-[#0E292F] tracking-tight leading-tight mb-4">
          Current Featured Listings
        </h2>
        <p className="text-sm text-black/60 font-light leading-relaxed max-w-lg mx-auto font-sans">
          A handpicked selection of premium architectural masterpieces and high performing real estate assets across premier zones.
        </p>
      </div>

      {/* Infinite Marquee Swiper Container */}
      <div className="relative w-full overflow-hidden flex items-center mb-16">
        
        {/* Subtle background-colored fade bounds */}
        <div className="absolute inset-y-0 left-0 w-4 md:w-8 bg-gradient-to-r from-[#f9fafb]/80 to-transparent z-20 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-4 md:w-8 bg-gradient-to-l from-[#f9fafb]/80 to-transparent z-20 pointer-events-none" />

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
          {infiniteLoopList.map((item, idx) => (
            <BestCard key={`${item.id}-${idx}`} item={item} />
          ))}
        </motion.div>
      </div>

      {/* Primary Link Button - Stone White base flipped to Green overlay on hover */}
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