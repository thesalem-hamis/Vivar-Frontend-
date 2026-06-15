"use client";

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ArrowUpRight } from 'lucide-react';

interface CategoryItem {
  id: number;
  title: string;
  description: string;
  bgImage: string;
  link: string;
}

const categories: CategoryItem[] = [
  {
    id: 1,
    title: 'Top Rentals of the Week',
    description: 'The finest rental homes across Lagos, curated weekly.',
    bgImage: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2070&auto=format&fit=crop',
    link: '#',
  },
  {
    id: 2,
    title: 'Off-Plan Properties',
    description: 'Buy early. Build wealth before completion.',
    bgImage: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=2074&auto=format&fit=crop',
    link: '#',
  },
  {
    id: 3,
    title: 'Commercial Properties',
    description: 'Grade A commercial spaces across Lagos Island.',
    bgImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop',
    link: '#',
  },
  {
    id: 4,
    title: 'Landed Opportunities',
    description: 'Prime land for sale in Lagos\' most valuable locations.',
    bgImage: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2073&auto=format&fit=crop',
    link: '#',
  },
];

export default function PropertyCategory() {
  const sectionRef = useRef<HTMLElement>(null);
  const rowRefs = useRef<HTMLAnchorElement[]>([]);
  const [inView, setInView] = useState(false);

  // Intersection Observer for programmatic entry triggering
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry?.isIntersecting) setInView(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // GSAP animation cascade for the categories list
  useEffect(() => {
    if (!inView) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        rowRefs.current,
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.15,
          ease: "power4.out",
        }
      );
    });
    return () => ctx.revert();
  }, [inView]);

  return (
    <section 
      ref={sectionRef}
      className="w-full max-w-7xl mx-auto px-0 md:px-6 lg:px-12 py-12 md:py-16 lg:py-20 font-sans"
    >
      {/* ── HEADER CONTAINER ── */}
      <div className="mb-8 md:mb-12 px-6 md:px-0">
        <span className="text-[11px] font-bold tracking-[0.25em] text-[#030a08]/40 uppercase mb-2 block font-sans">
          Curated Portfolios
        </span>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-light text-[#030a08] tracking-tight">
          Explore Properties by Category
        </h1>
      </div>

      {/* ── STACKED LAYOUT (Premium Square Dividers) ── */}
      <div className="flex flex-col gap-[1px] bg-white/20 border-y border-neutral-200 overflow-hidden shadow-sm">
        {categories.map((category, index) => (
          <a
            key={category.id}
            href={category.link}
            ref={(el) => { if (el) rowRefs.current[index] = el; }}
            className="group relative flex items-center justify-between min-h-[140px] md:min-h-[160px] lg:min-h-[180px] px-6 md:px-16 overflow-hidden transition-all duration-500 opacity-0 [will-change:transform,opacity]"
          >
            {/* Background Image Layer with Fine Tuned Dark Overlay */}
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-[1.02]"
              style={{ 
                backgroundImage: `linear-gradient(rgba(3, 10, 8, 0.55), rgba(3, 10, 8, 0.65)), url(${category.bgImage})` 
              }}
            />

            {/* Micro Structural Grid Overlay lines visible on hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500 pointer-events-none"
              style={{
                backgroundImage: "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
                backgroundSize: "30px 30px",
              }}
            />

            {/* Text Contents */}
            <div className="relative z-10 flex flex-col gap-2 pr-4 text-white">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-serif font-light tracking-wide transition-all duration-300 group-hover:translate-x-1">
                {category.title}
              </h2>
              <p className="text-xs md:text-sm text-white/70 font-light max-w-2xl font-sans transition-all duration-300 group-hover:translate-x-1 group-hover:text-white/90">
                {category.description}
              </p>
            </div>

            {/* Outlined Custom Action Arrow - Rectilinear Transitions */}
            <div className="relative z-10 flex items-center justify-center w-10 h-10 md:w-12 md:h-12 border border-white/40 rounded-none text-white transition-all duration-300 group-hover:bg-white group-hover:text-[#030a08] group-hover:border-white shrink-0">
              <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5 stroke-[1.5]" />
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}