"use client";

import React from "react";
import { Quote } from "lucide-react";
import { MagicCard } from "@/components/ui/magic-card";

interface Testimonial {
  quote: string;
  name: string;
  role: string;
}

const topRowTestimonials: Testimonial[] = [
  {
    quote: "After trying two other agents who wasted six months of my time, Vivar found us the right apartment in Lekki in three weeks. The documentation was clean and the process was clear.",
    name: "Emmanuel O.",
    role: "Residential Buyer, Lagos",
  },
  {
    quote: "I was nervous about investing from London. I'd heard too many horror stories. Vivar walked me through every step remotely. I now own a property in Ikoyi that's already generating returns.",
    name: "Adaeze N.",
    role: "Diaspora Investor, London",
  },
  {
    quote: "Vivar identified an off-plan unit in Lekki before it went to market, handled every legal check, and gave us progress updates the whole way through. It closed exactly as promised.",
    name: "Chinedu A.",
    role: "Property Investor, Lagos",
  },
];

const bottomRowTestimonials: Testimonial[] = [
  {
    quote: "Outstanding product—well-crafted, user-friendly, and exactly what I expected. The legal clearings and deep property verifications left absolutely zero blindspots.",
    name: "Skylar Rosser",
    role: "Product Manager, Orbit",
  },
  {
    quote: "Impressive service—high quality, simple to deal with, and exactly as promised. Customer care and transactional transparency was superb and very responsive.",
    name: "Anika Franci",
    role: "CEO & Co-Founder, Zendesk",
  },
  {
    quote: "Wonderful experience—high structural integrity, easy to operate, and exactly what I wanted. Support during the payment schedules was quick and incredibly helpful.",
    name: "Corey Franci",
    role: "Managing Director, ABC Corp",
  },
];

const duplicatedTop = [...topRowTestimonials, ...topRowTestimonials, ...topRowTestimonials];
const duplicatedBottom = [...bottomRowTestimonials, ...bottomRowTestimonials, ...bottomRowTestimonials];

export default function FUITestimonialWithSlide(): React.JSX.Element {
  return (
    <section className="w-full bg-white py-16 md:py-28 overflow-hidden relative font-sans">
      
      {/* ── INLINE ANIMATION INJECTION ── */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes inline-slide-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-50% - 12px)); }
        }
        @keyframes inline-slide-right {
          0% { transform: translateX(calc(-50% - 12px)); }
          100% { transform: translateX(0); }
        }
        .animate-inline-left {
          animation: inline-slide-left 45s linear infinite;
        }
        .animate-inline-right {
          animation: inline-slide-right 45s linear infinite;
        }
        .animate-inline-left:hover,
        .animate-inline-right:hover {
          animation-play-state: paused;
        }
      `}} />

      <div className="w-full mx-auto relative z-10">
        
        {/* ── CENTERED HEADER BLOCK ── */}
        <div className="w-full max-w-7xl mx-auto px-6 lg:px-16 mb-14 md:mb-20 text-center">
          <span className="text-xs font-semibold tracking-[0.2em] text-[#3D7188] uppercase mb-3 block opacity-80 font-sans">
            Testimonial
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-light text-[#0E292F] tracking-tight max-w-3xl mx-auto leading-tight md:leading-tight">
            Words of praise from others <br className="hidden md:inline" /> about our presence
          </h1>
        </div>

        {/* Dynamic Track Containers with Mask Gradients */}
        <div 
          className="flex flex-col gap-6 relative w-full overflow-hidden"
          style={{
            maskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)'
          }}
        >
          
          {/* TRACK 1: ANIMATING LEFT */}
          <div className="flex animate-inline-left gap-6 w-max px-4 cursor-pointer">
            {duplicatedTop.map((t, idx) => (
              <TestimonialCard key={`top-${idx}`} testimonial={t} />
            ))}
          </div>

          {/* TRACK 2: ANIMATING RIGHT */}
          <div className="flex animate-inline-right gap-6 w-max px-4 cursor-pointer">
            {duplicatedBottom.map((t, idx) => (
              <TestimonialCard key={`bottom-${idx}`} testimonial={t} />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <MagicCard 
      className="flex flex-col bg-slate-50/50 border-2 border-[#0E292F] rounded-2xl p-6 md:p-8 w-[320px] sm:w-[420px] md:w-[500px] h-full justify-between shadow-[0_4px_25px_rgba(14,41,47,0.01)] hover:shadow-[0_12px_35px_rgba(14,41,47,0.04)] hover:border-[#3D7188] transition-all duration-300 ease-out select-none font-sans"
      gradientColor="rgba(61, 113, 136, 0.08)"
    >
      <div>
        <Quote className="text-slate-300 transform rotate-180 mb-4" size={24} fill="currentColor" strokeWidth={0} />
        <p className="text-[14px] sm:text-[15px] text-slate-600 font-normal leading-relaxed tracking-wide text-pretty">
          {testimonial.quote}
        </p>
      </div>

      <div className="mt-6 pt-5 border-t border-[#0E292F]/[0.08] flex items-center gap-3">
        <div className="h-9 w-9 rounded-full bg-white border-2 border-[#0E292F]/20 flex items-center justify-center shrink-0 text-[#0E292F] font-semibold text-xs uppercase">
          {testimonial.name.slice(0, 2)}
        </div>
        <div className="flex flex-col">
          <p className="text-sm font-semibold text-[#0E292F] tracking-tight">
            {testimonial.name}
          </p>
          <p className="text-xs text-slate-400 font-light mt-0.5">
            {testimonial.role}
          </p>
        </div>
      </div>
    </MagicCard>
  );
}