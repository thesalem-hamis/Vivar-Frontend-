import React from "react";
import { motion } from "framer-motion";
import { Landmark, Building2, ShieldCheck, Globe } from "lucide-react";

import logoImg from "../../assets/logo_main.png";

interface Partner {
  name: string;
  icon: React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>;
}

const partners: Partner[] = [
  { name: "ABBEY MORTGAGE BANK", icon: Landmark },
  { name: "WESTFIELD CONSULTING", icon: Building2 },
  { name: "GOVERNMENT AGENCIES", icon: ShieldCheck },
  { name: "INTERNATIONAL PARTNERS", icon: Globe },
];

const marqueeItems: Partner[] = [...partners, ...partners, ...partners, ...partners];

export default function TrustMarqueeSection(): React.JSX.Element {
  return (
    <section className="w-full bg-[#f9fafb] overflow-hidden">
      
      {/* ── PREMIUM EDITORIAL HEADER BLOCK ── */}
      <div className="w-full bg-white pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-6 lg:px-16 flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
          
          {/* Main Statement Heading */}
          <div className="max-w-2xl">
            <span className="text-[11px] font-bold tracking-[0.25em] text-[#3D7188] uppercase mb-3 block">
              Institutional Trust
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-normal text-[#0E292F] tracking-tighter leading-[1.05]">
              Nigeria's Most Trusted <br className="hidden sm:inline" />
              Real Estate Partner
            </h1>
          </div>

          {/* Minimal Isolated Brand Badge — Hidden on mobile */}
          <div className="hidden sm:flex items-center gap-4 bg-[#f9fafb] border border-[#0E292F]/[0.06] py-3 px-5 shrink-0 rounded-none self-stretch md:self-auto justify-center">
            <div className="h-10 w-10 flex items-center justify-center shrink-0 relative">
              <img
                src={logoImg}
                alt="Vivar Realty Logo"
                className="h-full w-full object-contain scale-125"
                loading="eager"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-black tracking-tight text-[#0E292F]">Vivar Realty</span>
            </div>
          </div>

        </div>
      </div>

      {/* ── FULL-WIDTH EDGE-TO-EDGE MARQUEE STRIP (NO BORDERS) ── */}
      <div className="w-full bg-white relative flex items-center h-20 overflow-hidden z-10">
        
        {/* Soft Contrast Tint Track */}
        <div className="absolute inset-0 bg-[#0E292F]/[0.01] pointer-events-none" />

        {/* Viewport Side Gradient Faders */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-white via-white/80 to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-white via-white/80 to-transparent z-20 pointer-events-none" />

        <motion.div
          className="flex items-center gap-16 md:gap-24 shrink-0 pl-12 z-10"
          animate={{ x: [0, "-25%"] }}
          transition={{
            ease: "linear",
            duration: 28,
            repeat: Infinity,
          }}
        >
          {marqueeItems.map((partner, index) => {
            const Icon = partner.icon;
            return (
              <div
                key={`${partner.name}-${index}`}
                className="flex items-center gap-5 shrink-0 select-none whitespace-nowrap group"
              >
                <div className="p-2 rounded-none bg-[#f9fafb] border border-[#0E292F]/[0.04] text-[#0E292F]/40 group-hover:text-[#3D7188] group-hover:border-[#3D7188]/20 transition-all duration-300">
                  <Icon size={18} strokeWidth={1.5} />
                </div>
                <span className="text-sm md:text-base font-bold tracking-[0.18em] text-[#0E292F]/70 uppercase transition-colors duration-300 group-hover:text-[#0E292F]">
                  {partner.name}
                </span>
                <span className="text-[#0E292F]/15 text-lg font-light ml-4 md:ml-6 select-none">/</span>
              </div>
            );
          })}
        </motion.div>
      </div>

    </section>
  );
}