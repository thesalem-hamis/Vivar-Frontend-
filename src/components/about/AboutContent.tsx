"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const NARRATIVE_DATA = [
  {
    id: "section-1",
    // tag: "01 / Origin & Purpose",
    title: "The Vision.",
    description:
      "Vivar Realty was born from a simple but powerful observation: too many high-value real estate transactions in Nigeria were being handled without the professionalism the stakes demanded. Buyers were misled. Investors were underserved. Diaspora clients were exposed to risk. The founders of Vivar set out to change that — not by being louder, but by being more rigorous.",
  },
  {
    id: "section-2",
    // tag: "02 / Capability Spectrum",
    title: "The Expertise.",
    description:
      "The Vivar team has worked with governments, international agencies, banks, and private clients across Nigeria. Expert valuations, appraisals for mergers and refinancing, insurance assessments, residential brokerage — the full spectrum of what serious real estate demands.",
  },
  {
    id: "section-3",
    // tag: "03 / Operational Oath",
    title: "The Commitment.",
    description:
      "Vivar's promise is not 'we will find you a property.' It is 'we will find you the right property, handle every detail, and never leave you guessing.' That means transparent pricing, verified listings, clear timelines, and a team that is reachable when it matters.",
  },
  {
    id: "section-4",
    // tag: "04 / Market Benchmark",
    title: "The Standard.",
    description:
      "Vivar Realty has been trusted by some of Africa's most respected institutions. That trust is not taken lightly. Every new client receives the same standard of attention — because in this business, reputation is built one transaction at a time.",
  },
];

export default function AboutContent() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero word reveal
      const heroWords = heroRef.current?.querySelectorAll<HTMLSpanElement>(".hero-word");
      if (heroWords?.length) {
        gsap.fromTo(
          heroWords,
          { opacity: 0, y: 35, rotateX: -20 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.85,
            stagger: 0.07,
            ease: "power4.out",
            scrollTrigger: {
              trigger: heroRef.current,
              start: "top 85%",
              once: true,
            },
          }
        );
      }

      // Narrative block word reveals
      const sections = containerRef.current?.querySelectorAll(".narrative-block");
      sections?.forEach((section) => {
        const words = section.querySelectorAll<HTMLSpanElement>(".word");
        if (words?.length) {
          gsap.fromTo(
            words,
            { opacity: 0, y: 35, rotateX: -20 },
            {
              opacity: 1,
              y: 0,
              rotateX: 0,
              duration: 0.85,
              stagger: 0.06,
              ease: "power4.out",
              scrollTrigger: {
                trigger: section,
                start: "top 85%",
                once: true,
              },
            }
          );
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen w-full relative bg-white" ref={containerRef}>
      {/* ── DASHED TOP-RIGHT FADE GRID ── */}
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
            radial-gradient(ellipse 80% 80% at 100% 0%, #000 50%, transparent 90%)
          `,
          WebkitMaskImage: `
            repeating-linear-gradient(to right, black 0px, black 3px, transparent 3px, transparent 8px),
            repeating-linear-gradient(to bottom, black 0px, black 3px, transparent 3px, transparent 8px),
            radial-gradient(ellipse 80% 80% at 100% 0%, #000 50%, transparent 90%)
          `,
          maskComposite: "intersect",
          WebkitMaskComposite: "source-in",
        }}
      />

      {/* ── HERO INTRO BLOCK ── */}
      {/* <section
        ref={heroRef}
        className="relative z-10 w-full max-w-[90rem] mx-auto px-6 sm:px-10 lg:px-16 pt-24 pb-20 md:pt-32 md:pb-28"
        style={{ perspective: "1000px" }}
      >
        
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="block text-xs font-bold uppercase tracking-[0.2em] text-[#0E292F]/40 mb-5 font-mono"
        >
          About Us
        </motion.span>

      
        <h1 className="font-serif font-light text-4xl sm:text-5xl md:text-6xl lg:text-[4rem] leading-[1.08] tracking-[-0.02em] text-[#0E292F] max-w-3xl select-none mb-8">
          {"Built on Expertise. Driven by Results. Accountable at Every Step.".split(" ").map((word, i) => (
            <span key={i} className="hero-word inline-block opacity-0 mr-[0.22em] last:mr-0">
              {word}
            </span>
          ))}
        </h1>

      
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: [0.215, 0.61, 0.355, 1] }}
          className="font-serif font-light text-lg sm:text-xl text-[#0E292F]/60 leading-relaxed max-w-2xl"
        >
          Vivar Realty was not built overnight. It was built through years of high-stakes
          transactions, deep market knowledge, and a commitment to the kind of service that
          premium clients deserve and rarely find.
        </motion.p>
      </section> */}

      {/* ── ALTERNATING TIMELINE ── */}
      <section className="relative z-10 w-full max-w-5xl mx-auto px-6 sm:px-10 lg:px-16 pb-32">

        {/* Central vertical spine */}
        <div className="absolute left-1/2 top-0 bottom-0 w-[1px] -translate-x-1/2 bg-gradient-to-b from-[#0E292F]/25 via-[#0E292F]/10 to-transparent hidden md:block" />
        {/* Mobile left spine */}
        <div className="absolute left-6 sm:left-10 top-0 bottom-0 w-[1px] bg-gradient-to-b from-[#0E292F]/20 via-[#0E292F]/10 to-transparent md:hidden" />

        <div className="flex flex-col gap-14 md:gap-20">
          {NARRATIVE_DATA.map((block, idx) => {
            const isEven = idx % 2 === 0;
            const titleWords = block.title.split(" ");

            return (
              <div
                key={block.id}
                className={`narrative-block relative flex flex-col md:flex-row w-full items-center ${
                  isEven ? "md:flex-row" : "md:flex-row-reverse"
                }`}
                style={{ perspective: "1000px" }}
              >
                {/* ── CONTENT BLOCK ── */}
                <motion.div
                  initial={{ opacity: 0, x: isEven ? -28 : 28, y: 10 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.65, ease: [0.215, 0.610, 0.355, 1.000] }}
                  className={`group w-full md:w-1/2 pl-12 md:pl-0 flex flex-col ${
                    isEven
                      ? "md:items-end md:text-right md:pr-14"
                      : "md:items-start md:text-left md:pl-14"
                  }`}
                >
                  {/* <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-[#0E292F]/35 mb-2 transition-colors duration-500 group-hover:text-[#0E292F]/70">
                    {block.tag}
                  </span> */}

                  <h3
                    className="font-serif font-light text-2xl sm:text-3xl md:text-[2.25rem] leading-[1.1] tracking-tight text-[#0E292F] select-none mb-3"
                  >
                    {titleWords.map((word, i) => (
                      <span key={i} className="word inline-block opacity-0 mr-[0.22em] last:mr-0">
                        {word}
                      </span>
                    ))}
                  </h3>

                  <p className="font-serif font-light text-base sm:text-lg text-[#0E292F]/60 leading-relaxed max-w-sm transition-colors duration-500 group-hover:text-[#0E292F]/85">
                    {block.description}
                  </p>
                </motion.div>

                {/* ── CENTER DOT ── */}
                {/* Mobile dot (left spine) */}
                <div className="absolute left-6 sm:left-10 top-1.5 md:hidden -translate-x-1/2 z-10">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.4 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="w-3 h-3 rounded-full bg-[#0E292F] border-[3px] border-white ring-1 ring-[#0E292F]/20 shadow-sm"
                  />
                </div>
                {/* Desktop dot (center spine) */}
                <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 items-center justify-center">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.4 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="w-3 h-3 rounded-full bg-[#0E292F] border-[3px] border-white ring-1 ring-[#0E292F]/20 shadow-sm"
                  />
                </div>

                {/* ── SPACER (opposite half) ── */}
                <div className="hidden md:block w-1/2" />
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}