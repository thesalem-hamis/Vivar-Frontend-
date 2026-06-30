"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import lekki from "@/assets/lekki.jpg";
import ikoyi from "@/assets/ikoyi-main.jpg";
import banana from "@/assets/banna.jpg";
import vi from "@/assets/vi.jpg";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface LocationCard {
  name: string;
  slug: string;
  gridClass: string;
  bgImage: string | any;
}

export default function Locations() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!headingRef.current) return;
    const targets = headingRef.current.querySelectorAll(".gsap-word");
    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.05,
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, clientWidth } = scrollContainerRef.current;
    const index = Math.round(scrollLeft / (clientWidth * 0.75));
    setActiveIndex(Math.min(Math.max(index, 0), 2));
  };

  const locations: LocationCard[] = [
    { name: "Banana Island", slug: "banana-island", gridClass: "h-[450px] md:h-[620px]", bgImage: banana },
    { name: "Ikoyi",         slug: "ikoyi",         gridClass: "h-[215px] md:h-[298px]", bgImage: ikoyi  },
    { name: "Victoria Island", slug: "vi",           gridClass: "h-[215px] md:h-[298px]", bgImage: vi    },
    { name: "Lekki",         slug: "lekki",          gridClass: "h-[450px] md:h-[620px]", bgImage: lekki },
  ];

  const headlineParts = [
    { text: "Explore Our Most", italic: false },
    { text: "Popular Areas",    italic: false },
  ];

  const containerVariants = {
    hidden: {},
    animate: { transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden:   { opacity: 0, y: 30 },
    animate:  { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <section
      ref={sectionRef}
      className="w-full pt-16 pb-20 md:pt-20 md:pb-32 relative overflow-hidden min-h-screen"
      style={{
        /* ── BASE COLOUR ── */
        backgroundColor: "#F5F5F5",
      }}
    >
      {/* ── DASHED GRID BACKGROUND (full section fill) ── */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, #e7e5e4 1px, transparent 1px),
            linear-gradient(to bottom, #e7e5e4 1px, transparent 1px)
          `,
          backgroundSize: "20px 20px",
          backgroundPosition: "0 0, 0 0",
          maskImage: `
            repeating-linear-gradient(to right, black 0px, black 3px, transparent 3px, transparent 8px),
            repeating-linear-gradient(to bottom, black 0px, black 3px, transparent 3px, transparent 8px),
            radial-gradient(ellipse 80% 80% at 0% 100%, #000 50%, transparent 90%)
          `,
          WebkitMaskImage: `
            repeating-linear-gradient(to right, black 0px, black 3px, transparent 3px, transparent 8px),
            repeating-linear-gradient(to bottom, black 0px, black 3px, transparent 3px, transparent 8px),
            radial-gradient(ellipse 80% 80% at 0% 100%, #000 50%, transparent 90%)
          `,
          maskComposite: "intersect",
          WebkitMaskComposite: "source-in",
        }}
      />

      {/* ── CONTENT WRAPPER ── */}
      <div className="relative z-10 w-full">

        {/* ── HEADER ── */}
        <div className="w-full max-w-[96vw] mx-auto px-4 sm:px-6 lg:px-8 mb-10 md:mb-16">
          <div className="max-w-3xl flex flex-col items-center text-center mx-auto gap-2.5">
            <h1
              ref={headingRef}
              className="text-3xl sm:text-4xl md:text-5xl font-normal tracking-[-0.02em] text-[#0E292F] leading-[1.15] select-none font-serif"
            >
              {headlineParts.map((part, pIdx) =>
                part.text.split(" ").map((word, wIdx) => (
                  <span key={`${pIdx}-${wIdx}`} className="inline-block overflow-hidden py-0.5 mr-[0.22em]">
                    <span className="gsap-word inline-block origin-bottom-left font-normal text-[#0E292F]">
                      {word}
                    </span>
                  </span>
                ))
              )}
            </h1>
            <p className="text-sm md:text-base text-[#1D3F48]/70 font-sans font-normal tracking-wide max-w-xl">
              See what these areas have to offer and buy your perfect home.
            </p>
          </div>
        </div>

        {/* ── MOSAIC GRID ── */}
        <div className="w-full max-w-[96vw] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            variants={containerVariants}
            initial="hidden"
            whileInView="animate"
            viewport={{ once: true, amount: 0.05 }}
            className="flex md:grid md:grid-cols-3 gap-4 md:gap-6 overflow-x-auto md:overflow-visible snap-x snap-mandatory items-stretch scrollbar-none"
            style={{ scrollbarWidth: "none" }}
          >
            {/* Col 1 — Banana Island */}
            <div className="flex flex-col w-[82vw] md:w-full shrink-0 snap-start">
              <LocationItem card={locations[0]} variants={itemVariants} />
            </div>

            {/* Col 2 — Ikoyi + VI stacked */}
            <div className="flex flex-col gap-4 md:gap-6 justify-between w-[82vw] md:w-full shrink-0 snap-start">
              <LocationItem card={locations[1]} variants={itemVariants} />
              <LocationItem card={locations[2]} variants={itemVariants} />
            </div>

            {/* Col 3 — Lekki */}
            <div className="flex flex-col w-[82vw] md:w-full shrink-0 snap-start pr-4 md:pr-0">
              <LocationItem card={locations[3]} variants={itemVariants} />
            </div>
          </motion.div>

          {/* Mobile dots */}
          <div className="flex md:hidden justify-center items-center gap-2 mt-6">
            {[0, 1, 2].map((idx) => (
              <div
                key={idx}
                className={`h-2 rounded-full transition-all duration-300 ${
                  activeIndex === idx ? "w-6 bg-[#0E292F]" : "w-2 bg-[#0E292F]/20"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function LocationItem({ card, variants }: { card: LocationCard; variants: any }) {
  const imageSrc = card.bgImage?.src ? card.bgImage.src : card.bgImage;

  return (
    <motion.a
      href={`/locations/${card.slug}`}
      variants={variants}
      className={`
        group relative flex flex-col justify-end items-start overflow-hidden w-full
        rounded-[24px] cursor-pointer select-none no-underline
        transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
        hover:shadow-2xl
        ${card.gridClass}
      `}
    >
      {/* ── IMAGE — full opacity so you can actually see it ── */}
      <div className="absolute inset-0 z-0">
        <img
          src={imageSrc}
          alt={card.name}
          className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-[1.03]"
        />
      </div>

      {/* ── DARK GLASS OVERLAY — hover state is the default ── */}
      <div
        className="absolute inset-0 z-10 transition-all duration-500 group-hover:opacity-60"
        style={{
          background: "linear-gradient(160deg, rgba(10,20,22,0.22) 0%, rgba(14,41,47,0.34) 100%)",
          backdropFilter: "blur(1px)",
          WebkitBackdropFilter: "blur(1px)",
        }}
      />

      {/* ── BOTTOM GRADIENT for text legibility ── */}
      <div className="absolute inset-0 z-[15] bg-gradient-to-t from-black/65 via-black/5 to-transparent group-hover:from-black/50 transition-all duration-500" />

      {/* ── HOVER SHINE ── */}
      <div className="absolute inset-0 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none overflow-hidden rounded-[24px]">
        <div className="absolute top-0 -inset-full h-full w-1/2 z-50 block transform -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shine" />
      </div>

      {/* ── LABEL ── */}
      <div className="relative z-30 p-6 sm:p-8 w-full transform translate-y-1 group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
        <h3 className="text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight text-white leading-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.4)]">
          {card.name}
        </h3>
      </div>

      <style>{`
        @keyframes shine { 100% { left: 125%; } }
        .animate-shine { animation: shine 0.85s cubic-bezier(0.16,1,0.3,1) forwards; }
      `}</style>
    </motion.a>
  );
}