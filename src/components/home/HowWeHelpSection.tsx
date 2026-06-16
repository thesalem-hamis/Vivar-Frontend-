// "use client";

// import { motion } from "framer-motion";
// import { Home, TrendingUp, Globe2, ArrowUpRight } from "lucide-react";

// const paths = [
//   {
//     tag: "FOR BUYERS",
//     icon: Home,
//     title: "Find Your Property",
//     body: "Browse verified premium listings in Ikoyi, Lekki, Victoria Island, Abuja, and Port Harcourt.",
//     cta: "View Properties",
//     href: "/properties",
//   },
//   {
//     tag: "FOR INVESTORS",
//     icon: TrendingUp,
//     title: "Grow Your Wealth",
//     body: "Off-plan opportunities, rental yield strategies, and expert valuations; built for serious investors.",
//     cta: "Explore Investment Opportunities",
//     href: "/invest",
//   },
//   {
//     tag: "FROM ABROAD",
//     icon: Globe2,
//     title: "Own Property in Nigeria",
//     body: "A trusted, transparent process for Nigerians in the UK, US, and Canada investing back home.",
//     cta: "The Diaspora Path",
//     href: "/invest",
//   },
// ];

// const fadeUp = {
//   hidden: { opacity: 0, y: 28 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
//   },
// };

// export default function HowWeHelpSection() {
//   return (
//     <section className="w-full py-24 md:py-32 bg-[#f9fafb]">
//       <div className="max-w-7xl mx-auto px-6 lg:px-16">
//         {/* Heading */}
//         <motion.div
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true, margin: "-100px" }}
//           variants={fadeUp}
//           className="max-w-3xl mx-auto text-center mb-16 md:mb-20"
//         >
//           <h2 className="text-4xl sm:text-5xl lg:text-6xl font-normal text-[#0E292F] tracking-tighter mb-5">
//             Whatever Brings You Here,{" "}
//             <span className="italic font-serif text-[#3D7188]">
//               We Handle It
//             </span>{" "}
//             with Excellence.
//           </h2>
//           <p className="text-base md:text-lg text-[#0E292F]/60 font-light leading-relaxed">
//             Buying. Selling. Investing. Three paths. One standard of service.
//           </p>
//         </motion.div>

//         {/* Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-0 border-t border-l border-[#0E292F]/10">
//           {paths.map((item, idx) => {
//             const Icon = item.icon;
//             return (
//               <motion.a
//                 key={item.tag}
//                 href={item.href}
//                 initial="hidden"
//                 whileInView="visible"
//                 viewport={{ once: true, margin: "-80px" }}
//                 variants={fadeUp}
//                 transition={{ delay: idx * 0.1 }}
//                 className="group relative flex flex-col justify-between gap-8 p-10 min-h-[340px] border-r border-b border-[#0E292F]/10
//                   hover:bg-[#0E292F] transition-colors duration-500 ease-in-out"
//               >
//                 <div className="flex flex-col gap-6">
//                   <div className="flex items-center justify-between">
//                     <span className="text-[11px] font-bold tracking-[0.2em] text-[#3D7188] uppercase group-hover:text-[#3D7188]/80 transition-colors duration-500">
//                       {item.tag}
//                     </span>
//                     <div
//                       className="flex items-center justify-center w-11 h-11 rounded-[10px] border border-[#0E292F]/10
//                       text-[#0E292F] group-hover:border-white/15 group-hover:text-white transition-colors duration-500"
//                     >
//                       <Icon size={18} strokeWidth={1.75} />
//                     </div>
//                   </div>
//                   <h3 className="text-2xl md:text-3xl font-normal text-[#0E292F] tracking-tight group-hover:text-white transition-colors duration-500">
//                     {item.title}
//                   </h3>
//                   <p className="text-sm md:text-base text-[#0E292F]/60 font-light leading-relaxed group-hover:text-white/70 transition-colors duration-500 max-w-[280px]">
//                     {item.body}
//                   </p>
//                 </div>

//                 <div
//                   className="flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] uppercase
//                   text-[#0E292F] group-hover:text-white transition-colors duration-500"
//                 >
//                   {item.cta}
//                   <ArrowUpRight
//                     size={14}
//                     className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
//                   />
//                 </div>

//                 {/* Decorative corner accent on hover */}
//                 <div className="absolute top-8 right-8 w-4 h-4 border-t border-r border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
//               </motion.a>
//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// }

"use client";

import { useEffect, useRef } from "react";
import { ArrowUpRight, Compass, BarChart3, Globe2 } from "lucide-react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HowWeHelpSection() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!headingRef.current) return;

    const targets = headingRef.current.querySelectorAll(".gsap-word");

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.06,
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

  const cards = [
    {
      id: "01.",
      tag: "FOR BUYERS",
      title: "Find Your Property",
      oneLiner: "Browse verified premium listings in Ikoyi, Lekki, Victoria Island, Abuja, and Port Harcourt.",
      cta: "View Properties",
      icon: Compass,
      bgClass: "bg-[#1D3F48]",
      tagColor: "text-[#4F90AD]",
      lineColor: "border-white/10",
      href: "/properties",
    },
    {
      id: "02.",
      tag: "FOR INVESTORS",
      title: "Grow Your Wealth",
      oneLiner: "Off-plan opportunities, rental yield strategies, and expert valuations — built for serious investors.",
      cta: "Explore Investment Opportunities",
      icon: BarChart3,
      bgClass: "bg-[#3D7188]",
      tagColor: "text-[#0E292F]",
      lineColor: "border-white/10",
      href: "/invest",
    },
    {
      id: "03.",
      tag: "FROM ABROAD",
      title: "Own Property in Nigeria",
      oneLiner: "A trusted, transparent process for Nigerians in the UK, US, and Canada investing back home.",
      cta: "The Diaspora Path",
      icon: Globe2,
      bgClass: "bg-[#0E292F]",
      tagColor: "text-[#3D7188]",
      lineColor: "border-white/10",
      href: "/invest",
    },
  ];

  const headingText = "Whatever Brings You Here, We Handle It with Excellence.";

  const containerVariants = {
    hidden: {},
    animate: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  // const cardVariants = {
  //   hidden: { 
  //     opacity: 0, 
  //     y: 60 
  //   },
  //   animate: { 
  //     opacity: 1, 
  //     y: 0,
  //     transition: {
  //       duration: 0.85,
  //       ease: [0.16, 1, 0.3, 1],
  //     }
  //   },
  // };

  return (
    <section 
      ref={containerRef}
      className="w-full pt-24 pb-32 md:pb-48 relative overflow-hidden min-h-screen flex flex-col justify-between bg-white"
    >
      
      {/* ── GREEN TOP-RIGHT FADE RADIAL GRID SYSTEM ── */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(29, 63, 72, 0.15) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(29, 63, 72, 0.15) 1px, transparent 1px)
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

      {/* ── BALANCED EDITORIAL HEADER FRAME ── */}
      <div className="relative z-10 w-full max-w-[96vw] mx-auto px-4 sm:px-6 lg:px-8 mb-6 md:mb-8">
        <div className="max-w-3xl flex flex-col gap-3">
          
          {/* GSAP Controlled Refined H1 Header */}
          <h1 
            ref={headingRef}
            className="text-3xl sm:text-4xl md:text-5xl font-normal tracking-[-0.03em] text-[#0E292F] leading-[1.15] select-none"
          >
            {headingText.split(" ").map((word, wordIdx) => (
              <span key={wordIdx} className="inline-block overflow-hidden py-0.5 mr-[0.22em]">
                <span className="gsap-word inline-block origin-bottom-left">
                  {word}
                </span>
              </span>
            ))}
          </h1>
          
          {/* Maintained on desktop and mobile */}
          <p className="text-xs sm:text-sm text-[#1D3F48]/70 font-normal tracking-wide mt-1 block">
            Buying. Selling. Investing. Three paths. One standard of service.
          </p>
        </div>
      </div>

      {/* ── CANVAS GRID CONTAINER ── */}
      <div className="relative z-10 w-full md:max-w-[96vw] mx-auto md:px-4 sm:px-6 lg:px-8 ">
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="animate"
          viewport={{ once: true, amount: 0.1 }}
          className="flex flex-col md:grid md:grid-cols-3 gap-0 bg-transparent rounded-none"
        >
          {cards.map((card, idx) => {
            const IconComponent = card.icon;
            
            return (
              <motion.a
                key={idx}
                href={card.href}
                // variants={cardVariants}
                className={`
                  group relative 
                  w-full h-[62vh] md:h-[500px] 
                  ${card.bgClass} text-white 
                  p-8 sm:p-12 
                  flex flex-col justify-between 
                  transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] 
                  hover:z-30 hover:backdrop-blur-md hover:!bg-white/10 
                  border border-transparent hover:border-[#1D3F48]
                  rounded-none cursor-pointer select-none
                  no-underline
                `}
              >
                
                {/* Top Control Block */}
                <div className="flex justify-between items-start w-full">
                  <div className="p-3 bg-white/[0.05] group-hover:bg-[#0E292F]/[0.04] border border-white/10 group-hover:border-[#0E292F]/10 text-white group-hover:text-[#0E292F] transition-all duration-500">
                    <IconComponent className="w-5 h-5 stroke-[1.25]" />
                  </div>
                  <span className="text-xs font-mono tracking-tighter text-white/30 group-hover:text-[#0E292F]/40 select-none transition-colors duration-500">
                    {card.id}
                  </span>
                </div>

                {/* Bottom Architectural Typographic Structure */}
                <div className="flex flex-col gap-5 mt-auto">
                  <div className="flex flex-col gap-2">
                    <span className={`text-[10px] font-bold tracking-[0.16em] ${card.tagColor} group-hover:text-[#0E292F]/80 uppercase transition-colors duration-500`}>
                      {card.tag}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-light tracking-tight text-white group-hover:text-[#0E292F] transition-colors duration-500">
                      {card.title}
                    </h3>
                    <p className="text-[14px] sm:text-[15px] text-white/80 group-hover:text-[#0E292F]/90 font-normal leading-[1.6] tracking-normal mt-1 transition-all duration-500">
                      {card.oneLiner}
                    </p>
                  </div>

                  {/* Connected Router Link State */}
                  <div className={`flex items-center justify-between pt-4 border-t ${card.lineColor} group-hover:border-[#0E292F]/10 transition-colors duration-500`}>
                    <span className="text-xs font-semibold tracking-wider text-white group-hover:text-[#0E292F] uppercase transition-colors duration-500">
                      {card.cta}
                    </span>
                    <div className="text-white group-hover:text-[#0E292F] transition-colors duration-500">
                      <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                    </div>
                  </div>
                </div>

              </motion.a>
            );
          })}
        </motion.div>
      </div>

    </section>
  );
}




