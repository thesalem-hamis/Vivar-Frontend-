"use client";

import React, { useEffect, useRef } from "react";
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
    quote: "We'd been scammed once before with a fake title, so we were extra cautious. Vivar's team ran a full land verification and Certificate of Occupancy check before we signed anything. Total peace of mind.",
    name: "Grace M.",
    role: "Landlord & Property Owner, Lagos",
  },
  {
    quote: "Relocating a family of five from Port Harcourt to Abuja felt overwhelming until we spoke to Vivar. They shortlisted homes that actually matched our budget and school-run needs, not just whatever was available.",
    name: "Tunde B.",
    role: "Relocating Homeowner, Abuja",
  },
  {
    quote: "As a first-time buyer I didn't understand agency fees, survey plans, or escrow. Vivar broke it all down in plain language and never rushed me into a decision. I closed on my first home last month.",
    name: "Oluwaseun T.",
    role: "First-Time Homeowner, Abuja",
  },
];

const duplicatedTop = [...topRowTestimonials, ...topRowTestimonials, ...topRowTestimonials];
const duplicatedBottom = [...bottomRowTestimonials, ...bottomRowTestimonials, ...bottomRowTestimonials];

export default function FUITestimonialWithSlide(): React.JSX.Element {
  return (
    <section className="w-full bg-white py-16 md:py-28 overflow-hidden relative font-sans">

      {/* ── INLINE STYLE INJECTION (hide scrollbars) ── */}
      <style dangerouslySetInnerHTML={{__html: `
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
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
          className="flex flex-col gap-6 relative w-full"
          style={{
            maskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)'
          }}
        >
          <ScrollingRow items={duplicatedTop} direction="left" speed={0.4} />
          <ScrollingRow items={duplicatedBottom} direction="right" speed={0.4} />
        </div>
      </div>
    </section>
  );
}

/**
 * Auto-scrolling row that also supports manual dragging (mouse),
 * touch swiping, and trackpad scrolling. Auto-scroll pauses while
 * the user is interacting, and resumes seamlessly afterward.
 */
function ScrollingRow({
  items,
  direction,
  speed = 0.4,
}: {
  items: Testimonial[];
  direction: "left" | "right";
  speed?: number;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const isPausedRef = useRef(false);
  const isDraggingRef = useRef(false);
  const dragStartX = useRef(0);
  const dragStartScroll = useRef(0);
  const rafRef = useRef<number | undefined>(undefined);

  // Keeps the scroll position within the middle duplicate set so the
  // loop never visibly "jumps" — content is tripled to allow this.
  const normalizeScroll = () => {
    const el = trackRef.current;
    if (!el) return;
    const third = el.scrollWidth / 3;
    if (third <= 0) return;
    if (el.scrollLeft >= third * 2) {
      el.scrollLeft -= third;
    } else if (el.scrollLeft <= 0.5) {
      el.scrollLeft += third;
    }
  };

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    // Start inside the middle duplicate set
    el.scrollLeft = el.scrollWidth / 3;

    const dirSign = direction === "left" ? 1 : -1;

    const tick = () => {
      if (!isPausedRef.current && !isDraggingRef.current && el) {
        el.scrollLeft += speed * dirSign;
        normalizeScroll();
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [direction, speed]);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = trackRef.current;
    if (!el) return;
    isDraggingRef.current = true;
    dragStartX.current = e.clientX;
    dragStartScroll.current = el.scrollLeft;
    el.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    const el = trackRef.current;
    if (!el) return;
    const dx = e.clientX - dragStartX.current;
    el.scrollLeft = dragStartScroll.current - dx;
  };

  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    const el = trackRef.current;
    if (el) {
      try {
        el.releasePointerCapture(e.pointerId);
      } catch {
        // no-op
      }
    }
  };

  return (
    <div
      ref={trackRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerLeave={endDrag}
      onPointerCancel={endDrag}
      onMouseEnter={() => (isPausedRef.current = true)}
      onMouseLeave={() => (isPausedRef.current = false)}
      onScroll={normalizeScroll}
      style={{ touchAction: "pan-x" }}
      className="flex gap-6 w-full overflow-x-auto scrollbar-hide px-4 cursor-grab active:cursor-grabbing select-none"
    >
      {items.map((t, idx) => (
        <TestimonialCard key={idx} testimonial={t} />
      ))}
    </div>
  );
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <MagicCard
      className="flex flex-col bg-slate-50/50 border-2 border-[#0E292F] rounded-2xl p-6 md:p-8 w-[320px] sm:w-[420px] md:w-[500px] h-full justify-between shrink-0 shadow-[0_4px_25px_rgba(14,41,47,0.01)] hover:shadow-[0_12px_35px_rgba(14,41,47,0.04)] hover:border-[#3D7188] transition-all duration-300 ease-out select-none font-sans"
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