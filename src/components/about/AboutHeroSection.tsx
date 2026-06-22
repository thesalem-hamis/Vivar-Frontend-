"use client";

import { motion } from "framer-motion";

// Replace with your team portrait asset matching the reference layout
import TEAM_HERO_IMAGE from "../../assets/ikoyi-main.jpg";

export default function AboutHeroSection() {
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
              About Vivar Realty
            </h1>
            
            {/* Short Subheadline */}
            <p className="text-white/80 font-sans font-light text-sm sm:text-base md:text-lg leading-relaxed max-w-3xl drop-shadow-sm">
              Offering utmost values to our clients with different and better standards of luxury real estate operations in Lagos, Abuja, and around the world.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── TRUST-BUILDING INTRO STATEMENT BLOCK ── */}
      <section className="w-full bg-white pt-16 pb-20 px-6 sm:px-10 lg:px-16">
        <div className="max-w-[90rem] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Eyebrow Accent Label */}
          <div className="lg:col-span-3 flex items-center gap-3 pt-1">
            <div className="w-8 h-[2px] bg-[#0E292F]" />
            <span className="text-[#0E292F] text-xs font-bold tracking-widest uppercase font-sans">
              About Us
            </span>
          </div>

          {/* Detailed Editorial Trust Content Block */}
          <div className="lg:col-span-9 flex flex-col gap-6">
            <h2 className="font-serif font-light text-[#0E292F] text-2xl sm:text-3xl md:text-4xl lg:text-[2.6rem] leading-tight tracking-tight">
              Built on Expertise. Driven by Results. <br className="hidden md:inline" />
              Accountable at Every Step.
            </h2>
            <p className="text-[#0E292F]/70 font-serif font-light text-base sm:text-lg md:text-[1.15rem] leading-relaxed max-w-4xl">
              Vivar Realty was not built overnight. It was built through years of high-stakes 
              transactions, deep market knowledge, and a commitment to the kind of service 
              that premium clients deserve and rarely find.
            </p>
          </div>

        </div>
      </section>

    </div>
  );
}