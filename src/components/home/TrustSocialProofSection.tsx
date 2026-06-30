"use client";

import React from "react";
import { motion } from "framer-motion";

// Brand Marquee Image Imports
import abbeyImg from "@/assets/abbey.png";
import abImg from "@/assets/AB.png";
import accessImg from "@/assets/access.png";
import cadwellImg from "@/assets/cadwell.png";
import fbnImg from "@/assets/fbn.png";

interface Partner {
  name: string;
  image: string | any;
  slug: string;
}

const partners: Partner[] = [
  { name: "ABBEY MORTGAGE BANK", image: abbeyImg, slug: "abbey" },
  { name: "ACCESS BANK", image: accessImg, slug: "access" },
  { name: "CADWELL", image: cadwellImg, slug: "cadwell" },
  { name: "FIRST BANK", image: fbnImg, slug: "fbn" },
  { name: "AB PROPERTIES", image: abImg, slug: "ab" },
];

// Duplicate items to ensure a seamless looping effect across the screen width
const marqueeItems: Partner[] = [...partners, ...partners, ...partners, ...partners];

export default function TrustMarqueeSection(): React.JSX.Element {
  return (
    <section className="w-full bg-[#f9fafb] overflow-hidden">
      
      {/* ── PREMIUM EDITORIAL HEADER BLOCK ── */}
      <div className="w-full bg-white pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-6 lg:px-16 flex flex-col items-start justify-between gap-6">
          {/* Main Statement Heading */}
          <div className="max-w-2xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-normal text-[#0E292F] tracking-tighter leading-[1.05]">
              Nigeria's Most Trusted <br className="hidden sm:inline" />
              Real Estate Partner
            </h1>
          </div>
        </div>
      </div>

      {/* ── FULL-WIDTH EDGE-TO-EDGE MARQUEE STRIP ── */}
      <div className="w-full bg-white relative flex items-center h-28 overflow-hidden z-10 py-4">
        
        {/* Soft Contrast Tint Track */}
        <div className="absolute inset-0 bg-[#0E292F]/[0.01] pointer-events-none" />

        {/* Viewport Side Gradient Faders */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-white via-white/80 to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-white via-white/80 to-transparent z-20 pointer-events-none" />

        <motion.div
          className="flex items-center gap-10 md:gap-14 shrink-0 pl-12 z-10"
          animate={{ x: [0, "-25%"] }}
          transition={{
            ease: "linear",
            duration: 22,
            repeat: Infinity,
          }}
        >
          {marqueeItems.map((partner, index) => {
            const imgSrc = partner.image?.src ? partner.image.src : partner.image;
            const isAbbey = partner.slug === "abbey";
            
            return (
              <div
                key={`${partner.name}-${index}`}
                className="flex items-center shrink-0 select-none whitespace-nowrap group"
              >
                {/* ── UNIFORM OUTER BOX ── */}
                <div className="h-16 w-32 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                  <img 
                    src={imgSrc} 
                    alt={`${partner.name} Logo`} 
                    className={`h-full w-full object-contain object-center transition-all ${
                      isAbbey 
                        ? "max-h-[75%] max-w-[85%]" // Slightly pads Abbey so it doesn't look overwhelming
                        : "max-h-[100%] max-w-[100%] scale-110" // Scales up all other logos inside the frame
                    }`}
                    loading="lazy"
                  />
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>

    </section>
  );
}