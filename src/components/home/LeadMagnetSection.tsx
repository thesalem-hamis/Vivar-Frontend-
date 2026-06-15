"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { motion } from "framer-motion";
import {
  Check,
  ArrowUpRight,
  MapPin,
  FileCheck2,
  ShieldAlert,
  Globe2,
  BarChart3,
} from "lucide-react";

// Import your custom background image here
import leadMagnetBg from "../../assets/ikoyi-main.jpg"; 

const bullets = [
  {
    icon: BarChart3,
    text: "The top 5 premium locations in Lagos ranked by investment return",
  },
  {
    icon: MapPin,
    text: "Current price per sqm benchmarks for Ikoyi, Lekki, and Victoria Island",
  },
  {
    icon: FileCheck2,
    text: "Step-by-step legal checklist for safe property acquisition in Nigeria",
  },
  {
    icon: Globe2,
    text: "The diaspora buyer’s remote purchase guide, what to expect, step by step",
  },
  {
    icon: ShieldAlert,
    text: "Red flags: 7 signs of a fraudulent listing and how to verify before you commit",
  },
];

export default function LeadMagnetSection() {
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [submitted, setSubmitted] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const leftContentRef = useRef<HTMLDivElement>(null);
  const rightContentRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  // Intersection Observer for GSAP triggering
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry?.isIntersecting) setInView(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // GSAP Orchestration matching the AboutSection rhythm
  useEffect(() => {
    if (!inView) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out", duration: 1.4 } });
      
      tl.fromTo(leftContentRef.current,
        { y: 40, opacity: 0, filter: "blur(10px)" },
        { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.5 }
      )
      .fromTo(rightContentRef.current,
        { y: 50, opacity: 0, scale: 0.95, rotate: -1 },
        { y: 0, opacity: 1, scale: 1, rotate: 0, duration: 1.6 },
        "-=1.1"
      );
    });
    return () => ctx.revert();
  }, [inView]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-12 md:py-16 lg:py-20 bg-[#030a08] text-white overflow-hidden flex items-center justify-center min-h-[auto] font-sans"
    >
      {/* ── BACKGROUND IMAGE LAYER ── */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-40 pointer-events-none select-none"
        style={{ backgroundImage: `url(${leadMagnetBg})` }}
      />

      {/* ── REFINED COBALT/GREEN GLASS OVERLAYS (Lightened Gradient Mix) ── */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: "radial-gradient(circle at center, rgba(3,10,8,0.1) 0%, rgba(3,10,8,0.85) 100%)",
        }}
      />
      <div
        className="absolute inset-0 z-[1] backdrop-blur-[6px] pointer-events-none"
        style={{
          background: "linear-gradient(135deg, rgba(4,28,22,0.35) 0%, rgba(3,10,8,0.05) 50%, rgba(4,28,22,0.35) 100%)",
        }}
      />

      {/* Soft Ambient Light core */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-white/[0.015] blur-[110px] pointer-events-none z-[1]" />

      {/* ── CONTENT CORE ── */}
      <div className="relative z-10 max-w-7xl w-full mx-auto px-6 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          
          {/* Left — Copy & Form */}
          <div 
            ref={leftContentRef} 
            className="flex flex-col gap-4 opacity-0 [will-change:transform,opacity]"
          >
            <div>
              <span className="text-[11px] font-bold tracking-[0.25em] text-white/50 uppercase mb-2 block font-sans">
                Free Resource
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-light text-white tracking-tight leading-[1.2] mb-3">
                The Lagos Premium Property
                <br />
                Investment Guide 2025
              </h2>
              <p className="text-white/60 text-sm font-light leading-relaxed max-w-lg font-sans">
                Everything you need to know before buying or investing in
                premium Lagos real estate; locations, pricing benchmarks, ROI
                data, legal checklist, and a diaspora buying guide. Free, for a
                limited time.
              </p>
            </div>

            {/* Bullet Points - Reduced gap */}
            <ul className="flex flex-col gap-2.5 font-sans">
              {bullets.map((b) => {
                const Icon = b.icon;
                return (
                  <li
                    key={b.text}
                    className="flex items-start gap-3 text-xs text-white/75 font-light leading-relaxed group"
                  >
                    <span className="flex items-center justify-center w-6 h-6 rounded-none bg-white/[0.05] border border-white/10 shrink-0 mt-0.5 transition-colors group-hover:border-white/40">
                      <Icon size={11} className="text-white" />
                    </span>
                    <span className="transition-colors group-hover:text-white">{b.text}</span>
                  </li>
                );
              })}
            </ul>

            {/* Form - Reduced padding and spacing */}
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-3 max-w-lg mt-2 p-5 bg-emerald-950/20 border border-white/10 backdrop-blur-xl rounded-none shadow-2xl font-sans"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  name="name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className="w-full bg-white/[0.03] border border-white/10 focus:border-white/30 focus:bg-white/[0.05] rounded-none
                    px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition-all"
                />
                <input
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  className="w-full bg-white/[0.03] border border-white/10 focus:border-white/30 focus:bg-white/[0.05] rounded-none
                    px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition-all"
                />
              </div>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Phone Number (optional)"
                className="w-full bg-white/[0.03] border border-white/10 focus:border-white/30 focus:bg-white/[0.05] rounded-none
                  px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition-all"
              />

              <motion.button
                type="submit"
                whileHover={{ scale: 1.01, backgroundColor: "#ffffff", color: "#030a08" }}
                whileTap={{ scale: 0.99 }}
                transition={{ duration: 0.2 }}
                className="inline-flex items-center justify-center gap-3 mt-1 px-6 py-3.5 rounded-none border border-white bg-transparent text-white
                  text-[10px] font-bold tracking-[0.2em] uppercase cursor-pointer select-none font-sans"
              >
                {submitted ? (
                  <>
                    <Check size={13} strokeWidth={2.5} /> Guide On Its Way
                  </>
                ) : (
                  <>
                    Send Me the Free Guide
                    <ArrowUpRight size={13} strokeWidth={2.5} />
                  </>
                )}
              </motion.button>

              <p className="text-[10px] text-white/40 font-light leading-relaxed">
                &ldquo;No spam. No pressure. Your details are safe with us.
                We&rsquo;ll send your guide within minutes.&rdquo; &mdash; Vivar
                Realty Team
              </p>
            </form>
          </div>

          {/* Right — Guide Mockup */}
          <div 
            ref={rightContentRef} 
            className="relative flex items-center justify-center opacity-0 [will-change:transform,opacity]"
          >
            <motion.div 
              animate={{ y: [0, -4, 0] }}
              transition={{
                repeat: Infinity,
                duration: 6,
                ease: "easeInOut"
              }}
              whileHover={{ 
                scale: 1.02,
                borderColor: "rgba(255, 255, 255, 0.25)",
                boxShadow: "0 30px 70px -15px rgba(255, 255, 255, 0.05)"
              }}
              className="relative w-full max-w-sm aspect-[3/4] p-1 bg-white/[0.03] border border-white/10 backdrop-blur-xl shadow-2xl transition-all duration-500 rounded-none"
            >
              {/* Internal Cover Content Layout */}
              <div
                className="relative w-full h-full bg-gradient-to-br from-[#0a1411] to-[#030a08]
                border border-white/10 overflow-hidden flex flex-col justify-between p-6 sm:p-8"
              >
                {/* Fine Structural Grid Texture */}
                <div
                  className="absolute inset-0 opacity-[0.03] pointer-events-none"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
                    backgroundSize: "20px 20px",
                  }}
                />
                
                <div className="relative z-10 flex items-center justify-between font-sans">
                  <span className="text-[9px] font-bold tracking-[0.25em] text-white/60 uppercase">
                    Vivar Realty
                  </span>
                  <span className="text-[9px] font-bold tracking-[0.25em] text-white/30 uppercase">
                    2025
                  </span>
                </div>

                <div className="relative z-10 flex flex-col gap-3">
                  <span className="text-[10px] font-bold tracking-[0.25em] text-white/40 uppercase font-sans">
                    The Investment Guide
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-serif font-light text-white leading-[1.2] tracking-tight">
                    Lagos Premium
                    <br />
                    Property Investment
                  </h3>
                  <div className="h-px w-12 bg-white/20" />
                  <p className="text-[10px] text-white/40 font-light leading-relaxed max-w-[220px] font-sans">
                    Locations &middot; Pricing Benchmarks &middot; ROI Data
                    &middot; Legal Checklist &middot; Diaspora Guide
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}


// "use client";

// import { useEffect, useRef, useState } from "react";
// import gsap from "gsap";
// import { motion } from "framer-motion";
// import {
//   Check,
//   ArrowUpRight,
//   MapPin,
//   FileCheck2,
//   ShieldAlert,
//   Globe2,
//   BarChart3,
// } from "lucide-react";
// import { DottedMap } from "@/components/ui/dotted-map";
// import type { Marker } from "@/components/ui/dotted-map";

// // Import your custom background image here
// import leadMagnetBg from "../../assets/ikoyi-main.jpg"; 

// const bullets = [
//   {
//     icon: BarChart3,
//     text: "The top 5 premium locations in Lagos ranked by investment return",
//   },
//   {
//     icon: MapPin,
//     text: "Current price per sqm benchmarks for Ikoyi, Lekki, and Victoria Island",
//   },
//   {
//     icon: FileCheck2,
//     text: "Step-by-step legal checklist for safe property acquisition in Nigeria",
//   },
//   {
//     icon: Globe2,
//     text: "The diaspora buyer’s remote purchase guide, what to expect, step by step",
//   },
//   {
//     icon: ShieldAlert,
//     text: "Red flags: 7 signs of a fraudulent listing and how to verify before you commit",
//   },
// ];

// const markers: Marker[] = [
//   {
//     lat: 6.5244,  // Lagos, Nigeria
//     lng: 3.3792,
//     size: 0.3,
//   },
//   {
//     lat: 6.4550,  // Ikoyi
//     lng: 3.4350,
//     size: 0.3,
//   },
//   {
//     lat: 6.4500,  // Victoria Island
//     lng: 3.4200,
//     size: 0.3,
//   },
//   {
//     lat: 6.5000,  // Lekki
//     lng: 3.6000,
//     size: 0.3,
//   },
// ];

// export default function LeadMagnetSection() {
//   const [form, setForm] = useState({ name: "", email: "", phone: "" });
//   const [submitted, setSubmitted] = useState(false);

//   const sectionRef = useRef<HTMLElement>(null);
//   const leftContentRef = useRef<HTMLDivElement>(null);
//   const rightContentRef = useRef<HTMLDivElement>(null);
//   const [inView, setInView] = useState(false);

//   // Intersection Observer for GSAP triggering
//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => { if (entry?.isIntersecting) setInView(true); },
//       { threshold: 0.1 }
//     );
//     if (sectionRef.current) observer.observe(sectionRef.current);
//     return () => observer.disconnect();
//   }, []);

//   // GSAP Orchestration
//   useEffect(() => {
//     if (!inView) return;
//     const ctx = gsap.context(() => {
//       const tl = gsap.timeline({ defaults: { ease: "power4.out", duration: 1.4 } });
      
//       tl.fromTo(leftContentRef.current,
//         { y: 40, opacity: 0, filter: "blur(10px)" },
//         { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.5 }
//       )
//       .fromTo(rightContentRef.current,
//         { y: 50, opacity: 0, scale: 0.95, rotate: -1 },
//         { y: 0, opacity: 1, scale: 1, rotate: 0, duration: 1.6 },
//         "-=1.1"
//       );
//     });
//     return () => ctx.revert();
//   }, [inView]);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     setSubmitted(true);
//   };

//   return (
//     <section
//       ref={sectionRef}
//       className="relative w-full py-12 md:py-16 lg:py-20 bg-[#030a08] text-white overflow-hidden flex items-center justify-center min-h-[auto]"
//     >
//       {/* ── DOTTED MAP BACKGROUND ── */}
//       <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
//         <DottedMap markers={markers} color="#4F90AD" backgroundColor="#030a08" />
//       </div>

//       {/* ── REFINED COBALT/GREEN GLASS OVERLAYS ── */}
//       <div
//         className="absolute inset-0 z-[1] pointer-events-none"
//         style={{
//           background: "radial-gradient(circle at center, rgba(3,10,8,0.1) 0%, rgba(3,10,8,0.85) 100%)",
//         }}
//       />
//       <div
//         className="absolute inset-0 z-[1] backdrop-blur-[6px] pointer-events-none"
//         style={{
//           background: "linear-gradient(135deg, rgba(4,28,22,0.35) 0%, rgba(3,10,8,0.05) 50%, rgba(4,28,22,0.35) 100%)",
//         }}
//       />

//       {/* Soft Ambient Light core */}
//       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-white/[0.015] blur-[110px] pointer-events-none z-[1]" />

//       {/* ── CONTENT CORE ── */}
//       <div className="relative z-10 max-w-7xl w-full mx-auto px-6 lg:px-16">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          
//           {/* Left — Copy & Form */}
//           <div 
//             ref={leftContentRef} 
//             className="flex flex-col gap-4 opacity-0 [will-change:transform,opacity]"
//           >
//             <div>
//               <span className="text-[11px] font-bold tracking-[0.25em] text-white/50 uppercase mb-2 block">
//                 Free Resource
//               </span>
//               <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-[-0.04em] leading-[1.2] mb-3">
//                 The Lagos Premium Property
//                 <br />
//                 Investment Guide 2025
//               </h2>
//               <p className="text-white/60 text-sm font-light leading-relaxed max-w-lg">
//                 Everything you need to know before buying or investing in
//                 premium Lagos real estate; locations, pricing benchmarks, ROI
//                 data, legal checklist, and a diaspora buying guide. Free, for a
//                 limited time.
//               </p>
//             </div>

//             {/* Bullet Points */}
//             <ul className="flex flex-col gap-2.5">
//               {bullets.map((b) => {
//                 const Icon = b.icon;
//                 return (
//                   <li
//                     key={b.text}
//                     className="flex items-start gap-3 text-xs text-white/75 font-light leading-relaxed group"
//                   >
//                     <span className="flex items-center justify-center w-6 h-6 rounded-none bg-white/[0.05] border border-white/10 shrink-0 mt-0.5 transition-colors group-hover:border-white/40">
//                       <Icon size={11} className="text-white" />
//                     </span>
//                     <span className="transition-colors group-hover:text-white">{b.text}</span>
//                   </li>
//                 );
//               })}
//             </ul>

//             {/* Form */}
//             <form
//               onSubmit={handleSubmit}
//               className="flex flex-col gap-3 max-w-lg mt-2 p-5 bg-emerald-950/20 border border-white/10 backdrop-blur-xl rounded-none shadow-2xl"
//             >
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//                 <input
//                   name="name"
//                   required
//                   value={form.name}
//                   onChange={handleChange}
//                   placeholder="Full Name"
//                   className="w-full bg-white/[0.03] border border-white/10 focus:border-white/30 focus:bg-white/[0.05] rounded-none
//                     px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition-all"
//                 />
//                 <input
//                   name="email"
//                   type="email"
//                   required
//                   value={form.email}
//                   onChange={handleChange}
//                   placeholder="Email Address"
//                   className="w-full bg-white/[0.03] border border-white/10 focus:border-white/30 focus:bg-white/[0.05] rounded-none
//                     px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition-all"
//                 />
//               </div>
//               <input
//                 name="phone"
//                 value={form.phone}
//                 onChange={handleChange}
//                 placeholder="Phone Number (optional)"
//                 className="w-full bg-white/[0.03] border border-white/10 focus:border-white/30 focus:bg-white/[0.05] rounded-none
//                   px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition-all"
//               />

//               <motion.button
//                 type="submit"
//                 whileHover={{ scale: 1.01, backgroundColor: "#ffffff", color: "#030a08" }}
//                 whileTap={{ scale: 0.99 }}
//                 transition={{ duration: 0.2 }}
//                 className="inline-flex items-center justify-center gap-3 mt-1 px-6 py-3.5 rounded-none border border-white bg-transparent text-white
//                   text-[10px] font-bold tracking-[0.2em] uppercase cursor-pointer select-none"
//               >
//                 {submitted ? (
//                   <>
//                     <Check size={13} strokeWidth={2.5} /> Guide On Its Way
//                   </>
//                 ) : (
//                   <>
//                     Send Me the Free Guide
//                     <ArrowUpRight size={13} strokeWidth={2.5} />
//                   </>
//                 )}
//               </motion.button>

//               <p className="text-[10px] text-white/40 font-light leading-relaxed">
//                 &ldquo;No spam. No pressure. Your details are safe with us.
//                 We&rsquo;ll send your guide within minutes.&rdquo; &mdash; Vivar
//                 Realty Team
//               </p>
//             </form>
//           </div>

//           {/* Right — Guide Mockup */}
//           <div 
//             ref={rightContentRef} 
//             className="relative flex items-center justify-center opacity-0 [will-change:transform,opacity]"
//           >
//             <motion.div 
//               animate={{ y: [0, -4, 0] }}
//               transition={{
//                 repeat: Infinity,
//                 duration: 6,
//                 ease: "easeInOut"
//               }}
//               whileHover={{ 
//                 scale: 1.02,
//                 borderColor: "rgba(255, 255, 255, 0.25)",
//                 boxShadow: "0 30px 70px -15px rgba(255, 255, 255, 0.05)"
//               }}
//               className="relative w-full max-w-sm aspect-[3/4] p-1 bg-white/[0.03] border border-white/10 backdrop-blur-xl shadow-2xl transition-all duration-500 rounded-none"
//             >
//               {/* Internal Cover Content Layout */}
//               <div
//                 className="relative w-full h-full bg-gradient-to-br from-[#0a1411] to-[#030a08]
//                 border border-white/10 overflow-hidden flex flex-col justify-between p-6 sm:p-8"
//               >
//                 {/* Fine Structural Grid Texture */}
//                 <div
//                   className="absolute inset-0 opacity-[0.03] pointer-events-none"
//                   style={{
//                     backgroundImage:
//                       "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
//                     backgroundSize: "20px 20px",
//                   }}
//                 />
                
//                 <div className="relative z-10 flex items-center justify-between">
//                   <span className="text-[9px] font-bold tracking-[0.25em] text-white/60 uppercase">
//                     Vivar Realty
//                   </span>
//                   <span className="text-[9px] font-bold tracking-[0.25em] text-white/30 uppercase">
//                     2025
//                   </span>
//                 </div>

//                 <div className="relative z-10 flex flex-col gap-3">
//                   <span className="text-[10px] font-bold tracking-[0.25em] text-white/40 uppercase">
//                     The Investment Guide
//                   </span>
//                   <h3 className="text-2xl sm:text-3xl font-normal text-white leading-[1.2] tracking-tight font-serif">
//                     Lagos Premium
//                     <br />
//                     Property Investment
//                   </h3>
//                   <div className="h-px w-12 bg-white/20" />
//                   <p className="text-[10px] text-white/40 font-light leading-relaxed max-w-[220px]">
//                     Locations &middot; Pricing Benchmarks &middot; ROI Data
//                     &middot; Legal Checklist &middot; Diaspora Guide
//                   </p>
//                 </div>
//               </div>
//             </motion.div>
//           </div>

//         </div>
//       </div>
//     </section>
//   );
// }