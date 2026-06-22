import React, { useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';

// Lightweight Count-Up Component
function CountUp({ to, duration = 1.5 }: { to: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    const startValue = 0;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      
      // Ease out quad formula
      const easeProgress = progress * (2 - progress);
      
      setCount(Math.floor(easeProgress * (to - startValue) + startValue));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [to, duration, isInView]);

  return <span ref={ref}>{count.toLocaleString()}</span>;
}

export default function Authoritybar() {
  return (
    <section className="w-full relative flex items-center justify-center px-6 py-20 md:px-16 md:py-24 overflow-hidden select-none">
      
      {/* ── DARK/BLACK DASHED TOP FADE MESH GRID ── */}
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-[0.07]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0, 0, 0, 0.4) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 0, 0, 0.4) 1px, transparent 1px)
          `,
          backgroundSize: "24px 24px",
          backgroundPosition: "center center",
          maskImage: `
            repeating-linear-gradient(
              to right,
              black 0px,
              black 4px,
              transparent 4px,
              transparent 10px
            ),
            repeating-linear-gradient(
              to bottom,
              black 0px,
              black 4px,
              transparent 4px,
              transparent 10px
            ),
            radial-gradient(ellipse 80% 70% at 50% 0%, #000 50%, transparent 100%)
          `,
          WebkitMaskImage: `
            repeating-linear-gradient(
              to right,
              black 0px,
              black 4px,
              transparent 4px,
              transparent 10px
            ),
            repeating-linear-gradient(
              to bottom,
              black 0px,
              black 4px,
              transparent 4px,
              transparent 10px
            ),
            radial-gradient(ellipse 80% 70% at 50% 0%, #000 50%, transparent 100%)
          `,
          maskComposite: "intersect",
          WebkitMaskComposite: "source-in",
        }}
      />

      {/* ── CONTENT CONTAINER ── */}
      <div className="w-full max-w-7xl mx-auto relative z-10">
        
        {/* UPPER ROW: MAIN PROMINENT CHRONICLE METRICS WITH COUNT UP */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 items-start text-center md:text-left">
          
          {/* Stat 1: Years */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col space-y-2"
          >
            <span className="text-5xl sm:text-6xl font-serif font-light text-black tracking-tight">
              <CountUp to={20} />+ 
              <span className="text-xs font-sans uppercase font-mono text-black/40 tracking-widest block mt-2">
                Years Market Presence
              </span>
            </span>
            <p className="text-black/60 text-sm max-w-xs leading-relaxed font-light mx-auto md:mx-0">
              Over two decades driving premium, high-tier real estate placement across Nigeria’s hyper-strategic modern residential hubs.
            </p>
          </motion.div>

          {/* Stat 2: Agency Engagements */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col space-y-2"
          >
            <span className="text-5xl sm:text-6xl font-serif font-light text-black tracking-tight">
              <CountUp to={140} />+ 
              <span className="text-xs font-sans uppercase font-mono text-black/40 tracking-widest block mt-2">
                Agency Engagements
              </span>
            </span>
            <p className="text-black/60 text-sm max-w-xs leading-relaxed font-light mx-auto md:mx-0">
              Trusted framework operator spanning direct consultative partnerships with domestic government and international agencies.
            </p>
          </motion.div>

          {/* Stat 3: Total Transactions */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col space-y-2"
          >
            <span className="text-5xl sm:text-6xl font-serif font-light text-black tracking-tight">
              <CountUp to={3200} />+ 
              <span className="text-xs font-sans uppercase font-mono text-black/40 tracking-widest block mt-2">
                Properties Transacted
              </span>
            </span>
            <p className="text-black/60 text-sm max-w-xs leading-relaxed font-light mx-auto md:mx-0">
              Vast historical footprint of premium properties successfully managed, valued, and completely closed from search to signature.
            </p>
          </motion.div>

        </div>

      </div>
    </section>
  );
}