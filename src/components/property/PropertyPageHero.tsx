"use client";

import { motion } from "framer-motion";

// Replace with your team portrait asset matching the reference layout
import TEAM_HERO_IMAGE from "../../assets/ikoyi-main.jpg";

export default function PropertyPageHero() {
  return (
    <div className="w-full bg-white font-sans selection:bg-[#D4E9B9] selection:text-[#0E292F]">
      
      {/* ── PANORAMIC HERO OVERLAY CONTAINER ── */}
      <section className="relative w-full h-[60vh] min-h-[440px] max-h-[600px] bg-[#0E292F] overflow-hidden flex items-end">
        
        {/* Core Widescreen Corporate Image Canvas */}
        <img
          src={TEAM_HERO_IMAGE}
          alt="Vivar Realty Corporate Executive Team Portfolio"
          className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none z-0"
        />

        {/* Dynamic Shadow Veil for Clean Typography Legibility */}
        <div className="absolute inset-0 bg-black/40 mix-blend-multiply pointer-events-none z-0" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none z-0" />      

        {/* ── LOWER HERO TEXT TRACK ── */}
        <div className="relative z-10 w-full max-w-[90rem] mx-auto px-6 sm:px-10 lg:px-16 pb-12 sm:pb-16 flex flex-col items-start text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
            className="max-w-4xl"
          >
            {/* Header Content */}
            <h1 className="font-serif font-light text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight mb-4 drop-shadow-md">
              Curated Luxury Listings
            </h1>
            
            {/* Short Subheadline */}
            <p className="text-white/80 font-sans font-light text-sm sm:text-base md:text-lg leading-relaxed max-w-3xl drop-shadow-sm">
              Premium properties across Lagos' most prestigious addresses — Ikoyi, Banana Island, Victoria Island, and Lekki.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}