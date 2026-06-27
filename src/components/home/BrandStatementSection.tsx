// "use client";

// import { useRef } from "react";
// import { motion, useScroll, useTransform, useSpring } from "framer-motion";

// export default function BrandStatementSection() {
//   const targetRef = useRef<HTMLDivElement>(null);
  
//   const { scrollYProgress } = useScroll({
//     target: targetRef,
//     offset: ["start start", "end end"]
//   });

//   const smoothProgress = useSpring(scrollYProgress, {
//     stiffness: 38,
//     damping: 24, 
//     mass: 0.8,
//   });

//   const x = useTransform(smoothProgress, [0.15, 1], ["0%", "-40%"]);

//   const pieces = [
//     {
//       id: "01",
//       title: "Verified Listings Only",
//       body: "Built on uncompromising care, Vivar Realty delivers pre-vetted listings and expert property valuations to eliminate transactional vulnerability across high-end assets."
//     },
//     {
//       id: "02",
//       title: "Premium Placement",
//       body: "We safely guide private clients and institutional funds through strategic real estate acquisitions across the core zones of Ikoyi, Lekki, and major metropolitan hubs."
//     },
//     {
//       id: "03",
//       title: "Absolute Transparency",
//       body: "Bridging international portfolios seamlessly across the UK, US, and Canada with total legal compliance. Where the stakes are high, Vivar ensures absolute safety."
//     }
//   ];

//   const stats = [
//     { value: "20+", label: "Years Experience" },
//     { value: "500+", label: "Properties Sold" },
//     { value: "3", label: "Key Cities" },
//     { value: "Govt.", label: "International Clients" },
//     { value: "Diaspora", label: "Friendly Process" },
//     { value: "100%", label: "Transparent Process" },
//   ];

//   const headingLines = [
//     "Not Just an Agent.",
//     "A Trusted Partner in Every Transaction."
//   ];

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: { staggerChildren: 0.12, delayChildren: 0.1 }
//     }
//   };

//   // const wordVariants = {
//   //   hidden: { opacity: 0, y: 20 },
//   //   visible: {
//   //     opacity: 1,
//   //     y: 0,
//   //     transition: { duration: 0.65, ease: [0.215, 0.61, 0.355, 1] }
//   //   }
//   // };

//   // const mobileParagraphVariants = {
//   //   hidden: { opacity: 0, y: 24 },
//   //   visible: {
//   //     opacity: 1,
//   //     y: 0,
//   //     transition: { duration: 0.7, ease: [0.215, 0.61, 0.355, 1] }
//   //   }
//   // };

//   const statVariants = {
//     hidden: { opacity: 0, y: 15 },
//     visible: (delay: number) => ({
//       opacity: 1,
//       y: 0,
//       transition: { duration: 0.5, delay: delay * 0.06 }
//     })
//   };

//   return (
//     <div ref={targetRef} className="relative min-h-screen md:h-[260vh] bg-[#f9fafb]">
      
//       {/* Dashed Center Fade Grid Background */}
//       <div
//         className="absolute inset-0 z-0 pointer-events-none"
//         style={{
//           backgroundImage: `
//             linear-gradient(to right, #e7e5e4 1px, transparent 1px),
//             linear-gradient(to bottom, #e7e5e4 1px, transparent 1px)
//           `,
//           backgroundSize: "20px 20px",
//           backgroundPosition: "0 0, 0 0",
//           maskImage: `
//             repeating-linear-gradient(to right, black 0px, black 3px, transparent 3px, transparent 8px),
//             repeating-linear-gradient(to bottom, black 0px, black 3px, transparent 3px, transparent 8px),
//             radial-gradient(ellipse 60% 60% at 50% 50%, #000 30%, transparent 70%)
//           `,
//           WebkitMaskImage: `
//             repeating-linear-gradient(to right, black 0px, black 3px, transparent 3px, transparent 8px),
//             repeating-linear-gradient(to bottom, black 0px, black 3px, transparent 3px, transparent 8px),
//             radial-gradient(ellipse 60% 60% at 50% 50%, #000 30%, transparent 70%)
//           `,
//           maskComposite: "intersect",
//           WebkitMaskComposite: "source-in",
//         }}
//       />

//       {/* Main Structural Frame */}
//       <div className="relative md:sticky md:top-0 min-h-screen w-full flex flex-col justify-center overflow-x-hidden md:overflow-hidden z-10 px-6 sm:px-10 md:px-16 lg:px-24 py-12 md:py-20">
        
//         {/* Editorial Masthead with Reveal Word Animation */}
//         <div className="w-full max-w-7xl mx-auto mb-10 md:mb-6">
//           <motion.h1 
//             variants={containerVariants}
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true, margin: "-100px" }}
//             className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-serif font-light leading-[1.15] tracking-tight text-[#0E292F] max-w-5xl select-none"
//           >
//             {headingLines.map((line, lineIdx) => (
//               <span key={lineIdx} className="block overflow-hidden py-1">
//                 {line.split(" ").map((word, wordIdx) => (
//                   <motion.span
//                     key={`${lineIdx}-${wordIdx}`}
//                     // variants={wordVariants}
//                     className="inline-block mr-[0.25em]"
//                   >
//                     {word}
//                   </motion.span>
//                 ))}
//               </span>
//             ))}
//           </motion.h1>
//         </div>

//         {/* Desktop Horizontal Canvas */}
//         <div className="hidden md:flex flex-1 w-full max-w-7xl mx-auto items-center relative my-8">
//           <motion.div style={{ x }} className="flex gap-40 items-center pl-2">
//             {pieces.map((item, idx) => (
//               <div 
//                 key={idx}
//                 className={`w-[440px] shrink-0 flex flex-col gap-4 whitespace-normal text-left items-start pt-12 transition-all duration-700 ${
//                   idx % 2 === 1 ? "translate-y-6" : "-translate-y-4"
//                 }`}
//               >
//                 <div className="text-5xl font-light tracking-tighter text-[#1D3F48]/20 font-serif leading-none">
//                   {item.id}
//                 </div>
//                 <h3 className="text-[10px] font-bold tracking-[0.15em] text-[#0E292F] uppercase font-sans">
//                   {item.title}
//                 </h3>
//                 <p className="text-base text-black font-light leading-relaxed tracking-wide font-sans">
//                   {item.body}
//                 </p>
//               </div>
//             ))}
//           </motion.div>
//         </div>

//         {/* Mobile Layout */}
//         <div className="flex md:hidden flex-col gap-10 mt-2 max-w-xl">
//           {pieces.map((item, idx) => (
//             <motion.div 
//               key={idx} 
//               // variants={mobileParagraphVariants}
//               initial="hidden"
//               whileInView="visible"
//               viewport={{ once: true, margin: "-60px" }}
//               className="flex flex-col gap-2.5 text-left"
//             >
//               <div className="flex items-baseline gap-2.5">
//                 <span className="text-xl font-light font-serif text-[#3D7188]/50 tabular-nums">
//                   {item.id}
//                 </span>
//                 <h3 className="text-[11px] font-bold tracking-[0.12em] text-[#0E292F] uppercase font-sans">
//                   {item.title}
//                 </h3>
//               </div>
//               <p className="text-[15px] text-black/90 font-light leading-[1.65] tracking-normal font-sans">
//                 {item.body}
//               </p>
//             </motion.div>
//           ))}
//         </div>

//         {/* Stats Section - Desktop */}
//         <div className="hidden md:block w-full max-w-7xl mx-auto mt-16 pt-12 border-t border-gray-200/60">
//           <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-y-10 gap-x-8 text-center justify-center items-center">
//             {stats.map((stat, idx) => (
//               <motion.div
//                 key={idx}
//                 custom={idx}
//                 variants={statVariants}
//                 initial="hidden"
//                 whileInView="visible"
//                 viewport={{ once: true }}
//                 className="flex flex-col items-center justify-center gap-1.5 cursor-pointer group"
//               >
//                 <span className="text-3xl md:text-4xl font-light tracking-tight text-[#0E292F] font-sans group-hover:text-[#3D7188] transition-colors duration-300">
//                   {stat.value}
//                 </span>
//                 <span className="text-[10px] font-medium tracking-wider text-[#3D7188] uppercase leading-tight max-w-[130px] font-sans">
//                   {stat.label}
//                 </span>
//               </motion.div>
//             ))}
//           </div>
//         </div>

//         {/* Stats Section - Mobile */}
//         <div className="md:hidden w-full mt-14 pt-8 border-t border-gray-200/60">
//           <div className="grid grid-cols-2 gap-y-8 gap-x-6 text-center">
//             {stats.map((stat, idx) => (
//               <motion.div
//                 key={idx}
//                 custom={idx}
//                 variants={statVariants}
//                 initial="hidden"
//                 whileInView="visible"
//                 viewport={{ once: true }}
//                 className="flex flex-col items-center gap-1"
//               >
//                 <span className="text-2xl font-light tracking-tight text-[#0E292F] font-sans">
//                   {stat.value}
//                 </span>
//                 <span className="text-[9px] font-medium tracking-wider text-[#3D7188] uppercase font-sans">
//                   {stat.label}
//                 </span>
//               </motion.div>
//             ))}
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// }


// "use client";

// import { useRef } from "react";
// import { motion, useScroll, useTransform, useSpring } from "framer-motion";
// import { cn } from "@/lib/utils";
// import { GridPattern } from "@/components/ui/grid-pattern";

// export default function BrandStatementSection() {
//   const containerRef = useRef<HTMLDivElement>(null);

//   // Track scroll timeline over the entire section container
//   const { scrollYProgress } = useScroll({
//     target: containerRef,
//     offset: ["start start", "end end"],
//   });

//   // Smooth out the progress tracking slightly for a premium feel
//   const smoothProgress = useSpring(scrollYProgress, {
//     stiffness: 50,
//     damping: 28,
//     mass: 0.5,
//   });

//   const pieces = [
//     {
//       id: "01",
//       title: "Verified Listings Only",
//       body: "Built on uncompromising care, Vivar Realty delivers pre-vetted listings and expert property valuations to eliminate transactional vulnerability across high-end assets."
//     },
//     {
//       id: "02",
//       title: "Premium Placement",
//       body: "We safely guide private clients and institutional funds through strategic real estate acquisitions across the core zones of Ikoyi, Lekki, and major metropolitan hubs."
//     },
//     {
//       id: "03",
//       title: "Absolute Transparency",
//       body: "Bridging international portfolios seamlessly across the UK, US, and Canada with total legal compliance. Where the stakes are high, Vivar ensures absolute safety."
//     }
//   ];

//   // ── EXCLUSIVE SLIDE-DECK SCROLL TIMELINES ──
//   const opacity1 = useTransform(smoothProgress, [0, 0.05, 0.28, 0.33], [1, 1, 1, 0]);
//   const y1 = useTransform(smoothProgress, [0, 0.28, 0.33], [0, 0, -40]);

//   const opacity2 = useTransform(smoothProgress, [0.28, 0.33, 0.61, 0.66], [0, 1, 1, 0]);
//   const y2 = useTransform(smoothProgress, [0.28, 0.33, 0.61, 0.66], [40, 0, 0, -40]);

//   const opacity3 = useTransform(smoothProgress, [0.61, 0.66, 0.95, 1], [0, 1, 1, 1]);
//   const y3 = useTransform(smoothProgress, [0.61, 0.66], [40, 0]);

//   const slideTransforms = [
//     { opacity: opacity1, y: y1 },
//     { opacity: opacity2, y: y2 },
//     { opacity: opacity3, y: y3 }
//   ];

//   return (
//     /* Pinning window space for presentation flow timeline */
//     <div ref={containerRef} className="relative w-full h-[400vh] bg-white">
      
//       {/* ── STICKY BACKDROP ENGINE WITH DASHED GRID ── */}
//       <div className="sticky top-0 h-screen w-full overflow-hidden z-0 pointer-events-none">
//         <GridPattern
//           width={30}
//           height={30}
//           x={-1}
//           y={-1}
//           strokeDasharray={"4 2"}
//           className={cn(
//             "[mask-image:radial-gradient(450px_circle_at_center,white,transparent)] opacity-70"
//           )}
//         />
//       </div>

//       {/* ── STICKY INTERACTIVE VIEWPORT INTERFACE ── */}
//       <div className="absolute inset-0 sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden px-6 sm:px-10 md:px-16 lg:px-24 z-10 pointer-events-none">
        
//         {/* Luxury Top Separator Line */}
//         <div className="absolute top-0 left-0 w-full h-[1px] bg-black/5 z-20" />

//         {/* ── POWERPOINT SLIDE CONTAINER STACK ── */}
//         <div className="w-full max-w-7xl mx-auto relative flex items-center justify-center">
          
//           {pieces.map((item, idx) => (
//             <motion.div
//               key={idx}
//               style={{ 
//                 opacity: slideTransforms[idx].opacity, 
//                 y: slideTransforms[idx].y 
//               }}
//               className="absolute w-full grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 lg:gap-20 items-center md:items-start"
//             >
//               {/* Left Column: Dark Green Index Tracker + Increased Title Weights */}
//               <div className="md:col-span-5 flex flex-col items-start gap-2 text-left">
//                 <span className="text-sm font-sans font-semibold text-[#0E292F] tracking-wider tabular-nums">
//                   {item.id}
//                 </span>
//                 <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif font-light text-black tracking-tight leading-[1.15]">
//                   {item.title}
//                 </h3>
//               </div>

//               {/* Right Column: Large Poppins Typographic Body */}
//               <div className="md:col-span-7 text-left">
//                 <p className="text-xl sm:text-2xl md:text-3xl lg:text-[35px] xl:text-[38px] font-poppins font-light text-black leading-[1.4] tracking-wide">
//                   {item.body}
//                 </p>
//               </div>
//             </motion.div>
//           ))}

//         </div>

//       </div>
//     </div>
//   );
// }

"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export default function BrandStatementSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 35,
    damping: 26,
    mass: 0.6,
  });

  const pieces = [
    {
      title: "Verified Listings Only",
      body: "Built on uncompromising care, Vivar Realty delivers pre-vetted listings and expert property valuations to eliminate transactional vulnerability across high-end assets."
    },
    {
      title: "Premium Placement",
      body: "We safely guide private clients and institutional funds through strategic real estate acquisitions across the core zones of Ikoyi, Lekki, and major metropolitan hubs."
    },
    {
      title: "Absolute Transparency",
      body: "Bridging international portfolios seamlessly across the UK, US, and Canada with total legal compliance. Where the stakes are high, Vivar ensures absolute safety."
    }
  ];

  const stats = [
    { value: "20+", label: "Years Experience" },
    { value: "500+", label: "Properties Sold" },
    { value: "3", label: "Key Cities" },
    { value: "Govt.", label: "International Clients" },
    { value: "Diaspora", label: "Friendly Process" },
    { value: "100%", label: "Transparent Process" },
  ];

  // Slide timelines
  const opacity1 = useTransform(smoothProgress, [0, 0.05, 0.28, 0.33], [1, 1, 1, 0]);
  const y1 = useTransform(smoothProgress, [0, 0.28, 0.33], [0, 0, -40]);

  const opacity2 = useTransform(smoothProgress, [0.28, 0.33, 0.61, 0.66], [0, 1, 1, 0]);
  const y2 = useTransform(smoothProgress, [0.28, 0.33, 0.61, 0.66], [40, 0, 0, -40]);

  const opacity3 = useTransform(smoothProgress, [0.61, 0.66, 0.95, 1], [0, 1, 1, 1]);
  const y3 = useTransform(smoothProgress, [0.61, 0.66], [40, 0]);

  const slideTransforms = [
    { opacity: opacity1, y: y1 },
    { opacity: opacity2, y: y2 },
    { opacity: opacity3, y: y3 }
  ];

  const statVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: (delay: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: delay * 0.06 }
    })
  };

  return (
    <div ref={containerRef} className="relative w-full h-[400vh] bg-[#f9fafb]">
      
      {/* ── CUSTOM INLINE TOP LEFT FADE DASHED GRID ── */}
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
            radial-gradient(ellipse 80% 80% at 0% 0%, #000 50%, transparent 90%)
          `,
          WebkitMaskImage: `
            repeating-linear-gradient(to right, black 0px, black 3px, transparent 3px, transparent 8px),
            repeating-linear-gradient(to bottom, black 0px, black 3px, transparent 3px, transparent 8px),
            radial-gradient(ellipse 80% 80% at 0% 0%, #000 50%, transparent 90%)
          `,
          maskComposite: "intersect",
          WebkitMaskComposite: "source-in",
        }}
      />

      {/* ── STICKY INTERACTIVE VIEWPORT INTERFACE ── */}
      <div className="absolute inset-0 sticky top-0 h-screen w-full flex flex-col justify-between overflow-hidden px-6 sm:px-10 md:px-16 lg:px-24 pt-12 md:pt-20 md:pb-12 z-10 pointer-events-none">
        
        {/* Luxury Top Boundary Rule Line */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-stone-200/60 z-20" />

        {/* ── MAIN CONTENT LAYER (PADDED BOTTOM TO PUSH SLIDES UP AWAY FROM THE CREDENTIAL BANNER) ── */}
        <div className="flex-1 w-full max-w-7xl mx-auto relative flex items-center justify-center md:pb-32 pb-20">
          
          {pieces.map((item, idx) => (
            <motion.div
              key={idx}
              style={{ 
                opacity: slideTransforms[idx].opacity, 
                y: slideTransforms[idx].y 
              }}
              className="absolute w-full grid grid-cols-1 md:grid-cols-12 gap-y-6 md:gap-x-12 lg:gap-x-16 items-center md:items-start"
            >
              {/* Left Side: Elegant Header (No index numbers, translated slightly higher than the body copy) */}
              <div className="md:col-span-6 flex flex-col items-start text-left w-full md:-translate-y-8">
                <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-serif font-light text-black tracking-tight leading-[1.18] relative">
                  {item.title}
                </h3>
              </div>

              {/* Right Side: Body text matches baseline default positioning */}
              <div className="md:col-span-6 text-left flex items-center md:justify-end">
                <p className="text-lg sm:text-xl md:text-2xl lg:text-[25px] font-poppins font-light text-stone-600 leading-[1.55] tracking-wide max-w-[480px]">
                  {item.body}
                </p>
              </div>
            </motion.div>
          ))}

        </div>

        {/* ── FOOTER CANVAS: CREDENTIAL BANNER (LOCKED CONSTANT VISIBILITY ON ALL VIEWPORTS) ── */}
        <div className="w-screen relative left-1/2 right-1/2 -mx-[50vw] bg-[#0E292F] shrink-0 pt-10 pb-10 md:mt-0 mt-auto shadow-xl">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-16 lg:px-24 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-y-6 gap-x-8 text-center justify-center items-center">
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                custom={idx}
                variants={statVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="flex flex-col items-center justify-center gap-1.5 cursor-pointer group"
              >
                <span className="text-2xl md:text-3xl font-light tracking-tight text-white font-sans group-hover:text-stone-300 transition-colors duration-300 whitespace-nowrap">
                  {stat.value}
                </span>
                <span className="text-[9px] font-medium tracking-wider text-stone-300 uppercase leading-tight max-w-[130px] font-sans">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}