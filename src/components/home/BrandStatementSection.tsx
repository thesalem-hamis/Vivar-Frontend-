import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export default function BrandStatementSection() {
  const targetRef = useRef<HTMLDivElement>(null);
  const [activeMobileIndex, setActiveMobileIndex] = useState(0);
  const mobileContainerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 38,
    damping: 22,
    mass: 0.8,
  });

  const x = useTransform(smoothProgress, [0, 1], ["0%", "-58%"]);

  const pieces = [
    {
      id: "01",
      title: "Verified Listings Only",
      body: "Built on uncompromising care, Vivar Realty delivers pre-vetted listings and expert property valuations to eliminate transactional vulnerability across high-end assets.",
    },
    {
      id: "02",
      title: "Premium Placement",
      body: "We safely guide private clients and institutional funds through strategic real estate acquisitions across the core zones of Ikoyi, Lekki, and major metropolitan hubs.",
    },
    {
      id: "03",
      title: "Absolute Transparency",
      body: "Bridging international portfolios seamlessly across the UK, US, and Canada with total legal compliance. Where the stakes are high, Vivar ensures absolute safety.",
    },
  ];

  const handleMobileScroll = () => {
    if (!mobileContainerRef.current) return;
    const { scrollLeft, clientWidth } = mobileContainerRef.current;
    const index = Math.round(scrollLeft / (clientWidth * 0.85 + 24));
    setActiveMobileIndex(Math.max(0, Math.min(index, pieces.length - 1)));
  };

  return (
    <div
      ref={targetRef}
      className="relative min-h-screen md:h-[240vh] bg-[#f9fafb]"
    >
      {/* ── DASHED CENTER FADE GRID BACKGROUND ── */}
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
            repeating-linear-gradient(
              to right,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            repeating-linear-gradient(
              to bottom,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            radial-gradient(ellipse 60% 60% at 50% 50%, #000 30%, transparent 70%)
          `,
          WebkitMaskImage: `
            repeating-linear-gradient(
              to right,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            repeating-linear-gradient(
              to bottom,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            radial-gradient(ellipse 60% 60% at 50% 50%, #000 30%, transparent 70%)
          `,
          maskComposite: "intersect",
          WebkitMaskComposite: "source-in",
        }}
      />

      {/* Main Structural Frame */}
      <div className="relative md:sticky md:top-0 min-h-screen w-full flex flex-col justify-center overflow-x-hidden md:overflow-hidden z-10 px-6 sm:px-10 md:px-16 lg:px-24 py-12 md:py-20">
        {/* Editorial Masthead */}
        <div className="w-full max-w-7xl mx-auto mb-6 md:mb-0">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-normal text-[#0E292F] tracking-[-0.05em] leading-[1.1] select-none">
            Not Just an Agent.
            <br />A Trusted Partner in Every Transaction.
          </h1>
        </div>

        {/* ── DESKTOP HORIZONTAL CANVAS ── */}
        <div className="hidden md:flex flex-1 w-full max-w-7xl mx-auto items-center relative my-12">
          <motion.div style={{ x }} className="flex gap-48 items-center pl-4">
            {/* The Anchor Quote Block (Light Weight & Italic) */}
            <div className="w-[380px] shrink-0 border-l border-[#0E292F]/30 pl-8 flex flex-col gap-3">
              <span className="text-[10px] font-light italic tracking-[0.2em] text-[#3D7188] uppercase block">
                Perspective
              </span>
              <p className="text-lg font-light italic tracking-tight text-[#0E292F] whitespace-normal leading-relaxed">
                We don&rsquo;t just match clients to properties. We protect your
                investment from first conversation to final signature.
              </p>
            </div>

            {/* Premium Text Tracks (Left-aligned typography layout) */}
            {pieces.map((item, idx) => (
              <div
                key={idx}
                className={`w-[440px] shrink-0 flex flex-col gap-4 whitespace-normal text-left items-start pt-12 ${
                  idx % 2 === 1 ? "translate-y-6" : "-translate-y-4"
                }`}
              >
                <div className="text-6xl font-extralight tracking-tighter text-[#1D3F48]/20 font-serif leading-none">
                  {item.id}
                </div>
                <h3 className="text-xs font-bold tracking-[0.15em] text-[#0E292F] uppercase">
                  {item.title}
                </h3>
                <p className="text-base lg:text-lg text-black font-normal leading-relaxed tracking-wide">
                  {item.body}
                </p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── HIGH-END LUXURY MOBILE LAYOUT ── */}
        <div className="flex md:hidden flex-col gap-8 mt-6">
          {/* Asymmetric Perspective Pull-Quote */}
          <div className="relative pl-4 max-w-md">
            <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#3D7188] to-transparent" />
            <span className="text-[9px] font-light italic tracking-[0.2em] text-[#3D7188] uppercase block mb-1">
              Perspective
            </span>
            <p className="text-sm font-light italic tracking-tight text-[#0E292F]/90 leading-relaxed">
              We don&rsquo;t just match clients to properties. We protect your
              investment from first conversation to final signature.
            </p>
          </div>

          {/* Premium Low-Profile Card Deck */}
          <div className="relative w-full">
            <div
              ref={mobileContainerRef}
              onScroll={handleMobileScroll}
              className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-none py-4 px-1"
              style={{ WebkitOverflowScrolling: "touch" }}
            >
              {pieces.map((item, idx) => (
                <div
                  key={idx}
                  className="w-[85vw] shrink-0 snap-start flex flex-col justify-between bg-white border border-[#0E292F]/[0.06] rounded-2xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.015)] relative overflow-hidden group"
                >
                  {/* Subtle tonal background layout shift per card */}
                  <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#0E292F]/0 via-[#3D7188]/20 to-[#0E292F]/0 opacity-70" />

                  <div className="flex flex-col gap-4">
                    {/* Header line containing ID and Text Title together */}
                    <div className="flex items-baseline gap-3">
                      <span className="text-2xl font-light font-serif text-[#3D7188]/40 tabular-nums">
                        {item.id}
                      </span>
                      <h3 className="text-xs font-bold tracking-[0.1em] text-[#0E292F] uppercase">
                        {item.title}
                      </h3>
                    </div>

                    <p className="text-[14px] text-black font-normal leading-[1.6] tracking-normal">
                      {item.body}
                    </p>
                  </div>
                </div>
              ))}
              <div className="w-2 shrink-0" />
            </div>
          </div>

          {/* Connected Step Line Navigation Control */}
          <div className="flex items-center gap-3 pl-1 mt-2">
            <div className="flex gap-1.5 items-center">
              {pieces.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-[3px] rounded-full transition-all duration-500 ease-out ${
                    activeMobileIndex === idx
                      ? "w-8 bg-[#0E292F]"
                      : "w-2 bg-[#0E292F]/10"
                  }`}
                />
              ))}
            </div>
            <div className="h-[1px] flex-1 bg-[#0E292F]/5" />
            <span className="text-[10px] font-mono tracking-widest text-[#0E292F]/40 select-none">
              0{activeMobileIndex + 1} / 0{pieces.length}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
