// "use client";

// import { useState, useEffect, useRef } from "react";
// import { ChevronDown, ArrowUpRight, X } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";

// import LOGO_MAIN from "../../assets/logo_white.png";
// import HERO_VIDEO from "../../assets/mainhero.mp4";

// const investDropdown = [
//   { label: "Properties",      sub: "Explore our property portfolio" },
//   { label: "Projects",        sub: "Active development projects" },
//   { label: "Invest with Us",  sub: "Partnership & investment options" },
// ];

// export default function HeroSection() {
//   const [scrolled, setScrolled]               = useState(false);
//   const [dropOpen, setDropOpen]               = useState(false);
//   const [mobileOpen, setMobileOpen]           = useState(false);
//   const [mobileDropOpen, setMobileDropOpen]   = useState(false);
//   const dropRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const onScroll = () => setScrolled(window.scrollY > 20);
//     window.addEventListener("scroll", onScroll, { passive: true });
//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);

//   useEffect(() => {
//     const handler = (e: MouseEvent) => {
//       if (dropRef.current && !dropRef.current.contains(e.target as Node))
//         setDropOpen(false);
//     };
//     document.addEventListener("mousedown", handler);
//     return () => document.removeEventListener("mousedown", handler);
//   }, []);

//   useEffect(() => {
//     document.body.style.overflow = mobileOpen ? "hidden" : "";
//     return () => { document.body.style.overflow = ""; };
//   }, [mobileOpen]);

//   return (
//     <>
//       {/* ── HERO CONTAINER ── */}
//       <section className="relative overflow-hidden min-h-screen w-full flex flex-col justify-start font-sans">

//         {/* Video Background */}
//         <video
//           autoPlay loop muted playsInline
//           className="absolute inset-0 w-full h-full object-cover"
//           src={HERO_VIDEO}
//         />

//         {/* Overlays */}
//         <div className="absolute inset-0 bg-black/20 mix-blend-multiply pointer-events-none" />
//         <div className="absolute inset-0 bg-gradient-to-b from-[#0E292F]/60 via-[#1D3F48]/25 to-transparent pointer-events-none" />
//         <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />

//         {/* ── NAV BAR ── */}
//         <nav className="relative z-20 w-full px-6 md:px-12 py-6 flex items-center justify-between gap-4">

//           {/* Mobile Pill Wrapper */}
//           <div
//             className={`
//               flex items-center justify-between w-full md:w-auto
//               transition-all duration-300
//               md:bg-transparent md:border-0 md:px-0 md:py-0 md:rounded-none md:shadow-none md:backdrop-blur-none
//               ${scrolled
//                 ? "bg-[#0E292F]/95 border border-white/20 shadow-lg backdrop-blur-md rounded-[18px] px-4 py-2"
//                 : "bg-[#0E292F]/50 border border-white/15 backdrop-blur-sm rounded-[18px] px-4 py-2"}
//             `}
//           >
//             <a href="/" className="flex items-center">
//               <img
//                 src={LOGO_MAIN}
//                 alt="Logo"
//                 className="h-12 md:h-24 lg:h-28 w-auto object-contain transition-all duration-300 brightness-0 invert"
//                 onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
//               />
//             </a>

//             {/* Mobile Hamburger */}
//             <button
//               onClick={() => setMobileOpen(true)}
//               className="md:hidden flex items-center justify-center w-10 h-10 rounded-xl
//                 bg-white/20 hover:bg-white/30 transition-colors ml-3"
//               aria-label="Open menu"
//             >
//               <div className="flex flex-col gap-1.5 w-4">
//                 <span className="h-[2px] w-full bg-white rounded-full" />
//                 <span className="h-[2px] w-full bg-white rounded-full" />
//               </div>
//             </button>
//           </div>

//           {/* Desktop Nav Links Pill Container */}
//           <div className="hidden md:flex items-center p-1.5 rounded-[14px] bg-[#F5F5F5] border border-white/20 shadow-xl ml-auto">

//             <div className="flex items-center gap-1 px-4">
//               <NavLink href="/">Home</NavLink>
//               <NavLink href="/about">About</NavLink>

//               {/* Dropdown */}
//               <div ref={dropRef} className="relative">
//                 <button
//                   onClick={() => setDropOpen((o) => !o)}
//                   className="flex items-center gap-1.5 px-3 py-2.5 rounded-[6px] transition-colors
//                     duration-200 text-xs font-bold tracking-widest uppercase whitespace-nowrap
//                     text-black/90 hover:bg-black/8"
//                 >
//                   Invest with Us
//                   <motion.span animate={{ rotate: dropOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
//                     <ChevronDown size={13} strokeWidth={2.5} />
//                   </motion.span>
//                 </button>

//                 <AnimatePresence>
//                   {dropOpen && (
//                     <motion.div
//                       initial={{ opacity: 0, y: -8, scale: 0.97 }}
//                       animate={{ opacity: 1, y: 0, scale: 1 }}
//                       exit={{ opacity: 0, y: -8, scale: 0.97 }}
//                       transition={{ duration: 0.18, ease: "easeOut" }}
//                       className="absolute top-full right-0 mt-4 w-72 bg-[#0E292F] border border-white/20
//                         rounded-[12px] backdrop-blur-xl shadow-2xl overflow-hidden z-50"
//                     >
//                       {investDropdown.map((item) => (
//                         <a
//                           key={item.label} href="#"
//                           onClick={() => setDropOpen(false)}
//                           className="flex items-start justify-between gap-3 px-4 py-3.5
//                             hover:bg-white/10 transition-colors duration-150 group
//                             border-b border-white/10 last:border-0"
//                         >
//                           <div>
//                             <p className="text-white text-sm font-semibold tracking-tight">{item.label}</p>
//                             <p className="text-white/60 text-xs mt-0.5 font-normal normal-case tracking-normal">{item.sub}</p>
//                           </div>
//                           <ArrowUpRight size={15} className="text-white/40 group-hover:text-white mt-0.5 shrink-0 transition-colors" />
//                         </a>
//                       ))}
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               </div>
//             </div>

//             <a
//               href="/contact"
//               className="px-6 py-3.5 rounded-[10px] bg-[#0E292F] hover:bg-[#1D3F48]
//                 transition-colors duration-200 text-white text-[11px] font-bold tracking-widest uppercase whitespace-nowrap"
//             >
//               Work With Us
//             </a>
//           </div>
//         </nav>

//         {/* ── HERO CONTENT ── */}
//         <div className="relative z-10 flex-1 pt-16 md:pt-24 lg:pt-28 pb-16 px-6 md:px-12 lg:px-16 w-full">
//           <div className="max-w-[1440px] w-full mx-auto flex flex-col items-start">

//             {/* Expanded H1 Headline with precise tight bottom gap */}
//             <motion.h1
//               initial={{ opacity: 0, y: 24 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.65, ease: "easeOut" }}
//               className="w-full font-sans font-normal text-white mb-4 md:mb-25 text-left
//                 text-[3.5rem] md:text-[4rem] lg:text-[5rem] xl:text-[6rem]
//                 leading-[1.02] tracking-tight max-w-[95%] md:mt-[-100px]"
//             >
//               Lagos Real Estate.<br />
//               Intelligently Curated.
//             </motion.h1>

//             {/* Inline Layout Content Wrapper (p tag & Button on same line) */}
//             <div className="w-full flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12 md:mb-16 lg:mb-20">

//               {/* Subtitle Paragraph */}
//               <div className="w-full max-w-2xl">
//                 <motion.p
//                   initial={{ opacity: 0, y: 16 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
//                   className="text-white/95 text-base md:text-[1.2rem] lg:text-[1.25rem] leading-relaxed font-light tracking-wide"
//                 >
//                   We unravel complex property markets with data intelligence, local compliance, and verified premium portfolios for seamless high-yield asset acquisitions.
//                 </motion.p>
//               </div>

//               {/* Premium Capsule Action Button (Aligned right beside text) */}
//               <motion.div
//                 initial={{ opacity: 0, y: 16 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.6, delay: 0.18, ease: "easeOut" }}
//                 className="shrink-0 self-start lg:self-end"
//               >
//                 <a
//                   href="/portfolio"
//                   className="flex items-center gap-8 pl-8 pr-6 py-4 rounded-[14px] bg-[#1a2325]/90 border border-white/10
//                     hover:bg-[#232f32] transition-all duration-300 shadow-xl group text-white text-xs font-bold tracking-widest uppercase whitespace-nowrap"
//                 >
//                   <span>Discover Our Platform</span>
//                   <div className="flex items-center justify-center w-8 h-8 rounded-[10px] bg-[#D4E9B9] text-[#0E292F] group-hover:scale-105 transition-transform duration-200">
//                     <ArrowUpRight size={16} strokeWidth={2.5} />
//                   </div>
//                 </a>
//               </motion.div>

//             </div>

//           </div>
//         </div>
//       </section>

//       {/* ── MOBILE DRAWER ── */}
//       <AnimatePresence>
//         {mobileOpen && (
//           <>
//             <motion.div
//               initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
//               transition={{ duration: 0.25 }}
//               className="fixed inset-0 z-[65] bg-black/50 backdrop-blur-sm"
//               onClick={() => setMobileOpen(false)}
//             />

//             <motion.div
//               initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
//               transition={{ type: "spring", damping: 32, stiffness: 290 }}
//               className="fixed bottom-0 left-0 right-0 z-[70] flex flex-col
//                 bg-[#0E292F] border-t border-white/20
//                 rounded-t-[28px] max-h-[92vh] overflow-hidden"
//             >
//               <div className="flex justify-center pt-4 pb-2 shrink-0">
//                 <div className="w-10 h-1 rounded-full bg-white/30" />
//               </div>

//               <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 shrink-0">
//                 <a href="/" onClick={() => setMobileOpen(false)}>
//                   <img
//                     src={LOGO_MAIN} alt="Logo"
//                     className="h-10 w-auto object-contain brightness-0 invert"
//                     onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
//                   />
//                 </a>
//                 <button
//                   onClick={() => setMobileOpen(false)}
//                   className="p-2 rounded-[8px] bg-white/10 border border-white/20"
//                 >
//                   <X size={17} className="text-white" />
//                 </button>
//               </div>

//               <div className="flex-1 overflow-y-auto px-6 py-6 flex flex-col">
//                 {["Home", "About"].map((label) => (
//                   <a
//                     key={label}
//                     href={label === "Home" ? "/" : `/${label.toLowerCase()}`}
//                     onClick={() => setMobileOpen(false)}
//                     className="block py-5 text-white/90 text-2xl font-bold tracking-tight
//                       border-b border-white/10 hover:text-white transition-colors"
//                   >
//                     {label}
//                   </a>
//                 ))}

//                 <div>
//                   <button
//                     onClick={() => setMobileDropOpen((o) => !o)}
//                     className="w-full flex items-center justify-between py-5 text-white/90
//                       text-2xl font-bold tracking-tight border-b border-white/10"
//                   >
//                     <span>Invest with Us</span>
//                     <motion.span animate={{ rotate: mobileDropOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
//                       <ChevronDown size={20} strokeWidth={2} className="text-white/60" />
//                     </motion.span>
//                   </button>
//                   <AnimatePresence>
//                     {mobileDropOpen && (
//                       <motion.div
//                         initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
//                         exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25, ease: "easeInOut" }}
//                         className="overflow-hidden bg-white/5 rounded-b-[8px]"
//                       >
//                         {investDropdown.map((item) => (
//                           <a
//                             key={item.label} href="#"
//                             onClick={() => setMobileOpen(false)}
//                             className="flex items-center justify-between px-4 py-4
//                               border-b border-white/10 last:border-0 group"
//                           >
//                             <div>
//                               <p className="text-white text-base font-semibold">{item.label}</p>
//                               <p className="text-white/60 text-sm mt-0.5">{item.sub}</p>
//                             </div>
//                             <ArrowUpRight size={16} className="text-white/40 group-hover:text-white transition-colors" />
//                           </a>
//                         ))}
//                       </motion.div>
//                     )}
//                   </AnimatePresence>
//                 </div>

//                 <a
//                   href="/contact"
//                   onClick={() => setMobileOpen(false)}
//                   className="block py-5 text-white/90 text-2xl font-bold tracking-tight
//                     border-b border-white/10 hover:text-white transition-colors"
//                 >
//                   Contact Us
//                 </a>
//               </div>

//               <div className="px-6 pb-8 pt-4 shrink-0">
//                 <a
//                   href="/contact"
//                   onClick={() => setMobileOpen(false)}
//                   className="flex items-center justify-center gap-2 w-full py-4
//                     bg-white hover:bg-white/90 transition-colors text-[#0E292F]
//                     rounded-[12px] font-bold text-sm tracking-wider uppercase shadow-lg"
//                 >
//                   Work With Us
//                 </a>
//               </div>
//             </motion.div>
//           </>
//         )}
//       </AnimatePresence>
//     </>
//   );
// }

// function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
//   return (
//     <a
//       href={href}
//       className="px-3 py-2.5 rounded-[6px] transition-colors duration-200
//         text-xs font-bold tracking-widest uppercase whitespace-nowrap
//         text-black hover:bg-black/8"
//     >
//       {children}
//     </a>
//   );
// }


"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";

// Replace with your actual video asset path
import HERO_VIDEO from "../../assets/mainhero.mp4";

const headingVariants: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04, // Slightly faster stagger for cleaner mobile rendering
      delayChildren: 0.2,
    },
  },
};

const letterVariants: Variants = {
  hidden: { opacity: 0, y: 12, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      damping: 14,
      stiffness: 100,
    },
  },
};

export default function HeroSection() {
  const [scrolled, setScrolled] = useState(false);
  const h1Ref = useRef<HTMLHeadingElement>(null);

  const { scrollY } = useScroll();
  const textOpacity = useTransform(scrollY, [0, 250], [0.85, 1]);
  const textFilter = useTransform(
    scrollY,
    [0, 250],
    ["brightness(1) contrast(1)", "brightness(1.25) contrast(1.05)"],
  );
  const textScale = useTransform(scrollY, [0, 300], [1, 1.015]);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
  };

  // Split lines into explicit array arrays of words to prevent mid-word line breaks
  const line1Words = "Nigeria's Premier Choice".split(" ");
  const line2Words = "for Elite Real Estate".split(" ");

  return (
    <div className="bg-white min-h-screen w-full relative flex items-start justify-center font-sans overflow-x-hidden selection:bg-[#D4E9B9] selection:text-[#0E292F]">
      <div className="absolute inset-0 bg-white pointer-events-none z-0" />

      <div
        className={`relative z-10 w-full overflow-hidden flex flex-col justify-between bg-[#040c0e] shadow-2xl transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] origin-top will-change-[transform,border-radius] ${
          scrolled
            ? "scale-100 mt-0 rounded-none min-h-screen"
            : "scale-[0.96] md:scale-[0.98] mt-2 md:mt-3 rounded-[16px] md:rounded-[20px] min-h-[98vh]"
        }`}
      >
        {/* Core Background Video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none z-0"
        >
          <source src={HERO_VIDEO} type="video/mp4" />
        </video>

        {/* Background Overlays */}
        <div className="absolute inset-0 bg-black/25 mix-blend-multiply pointer-events-none z-0" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/10 to-transparent pointer-events-none z-0" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none z-0" />

        <div className="relative z-10 flex-1 pt-28 md:pt-36 pb-14 px-6 md:px-12 lg:px-16 w-full flex flex-col justify-end">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-[1440px] w-full mx-auto flex flex-col items-start"
          >
            {/* Main Heading with Mobile Word-Wrap Fix */}
            <motion.h1
              ref={h1Ref}
              style={{ opacity: textOpacity, filter: textFilter, scale: textScale }}
              className="w-full font-serif font-light text-white mb-6 text-left text-[2rem] sm:text-[2.8rem] md:text-[3.6rem] lg:text-[4.4rem] leading-[1.2] md:leading-[1.15] tracking-tight max-w-full md:max-w-2xl lg:max-w-4xl drop-shadow-md"
              variants={headingVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Line 1 */}
              <span className="block mb-1 md:mb-0">
                {line1Words.map((word, wIdx) => (
                  <span key={`l1-w-${wIdx}`} className="inline-block whitespace-nowrap mr-[0.25em]">
                    {word.split("").map((char, cIdx) => (
                      <motion.span key={`l1-c-${cIdx}`} variants={letterVariants} className="inline-block">
                        {char}
                      </motion.span>
                    ))}
                  </span>
                ))}
              </span>

              {/* Line 2 */}
              <span className="md:block">
                {line2Words.map((word, wIdx) => (
                  <span key={`l2-w-${wIdx}`} className="inline-block whitespace-nowrap mr-[0.25em]">
                    {word.split("").map((char, cIdx) => (
                      <motion.span key={`l2-c-${cIdx}`} variants={letterVariants} className="inline-block">
                        {char}
                      </motion.span>
                    ))}
                  </span>
                ))}
              </span>
            </motion.h1>

            {/* Content Stacked Layout */}
            <div className="w-full max-w-xl flex flex-col gap-6 pt-1">
              <p className="text-white text-base md:text-[1.05rem] leading-relaxed font-light tracking-wide drop-shadow-sm opacity-90">
                With us, it’s easy to find your future home and build legacy wealth through ultra-premium assets.
              </p>

              {/* Signup Form */}
              <form 
                onSubmit={(e) => e.preventDefault()}
                className="flex items-center bg-white p-1.5 rounded-[10px] w-full max-w-md shadow-xl border border-white"
              >
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="flex-1 bg-transparent px-4 py-2 text-[#0E292F] placeholder:text-[#0E292F]/50 outline-none text-[12px] sm:text-[13px] font-medium"
                />
                
                <motion.button
                  type="submit"
                  className="relative overflow-hidden flex items-center justify-center px-6 py-3 rounded-[8px] bg-[#0E292F] text-white font-sans text-[10px] sm:text-[11px] font-bold tracking-widest uppercase whitespace-nowrap"
                  whileHover="hover"
                  whileTap={{ scale: 0.98 }}
                  variants={{
                    hover: {
                      backgroundColor: "#13353c",
                      scale: 1.03,
                      transition: { duration: 0.3, ease: "easeOut" }
                    }
                  }}
                >
                  <span className="relative z-10">Sign up</span>

                  <motion.div
                    className="absolute top-0 bottom-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-20px]"
                    style={{ left: "-100%", width: "50%" }}
                    variants={{
                      hover: {
                        left: "150%",
                        transition: { duration: 0.8, ease: "easeInOut" }
                      }
                    }}
                  />
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
// "use client";

// import { useState, useEffect, useRef } from "react";
// import { ArrowUpRight } from "lucide-react";
// import { motion, useScroll, useTransform, useSpring } from "framer-motion";

// // Update this path to point to your premium video clip asset
// import HERO_VIDEO from "@/assets/mainhero.mp4";

// export default function HeroSection() {
//   const [scrolled, setScrolled] = useState(false);
//   const containerRef = useRef<HTMLDivElement>(null);

//   const { scrollY } = useScroll();

//   // Smooth out fluid container scale transitions using springs
//   const rawScale = useTransform(scrollY, [0, 400], [1, 1.03]);
//   const containerScale = useSpring(rawScale, { stiffness: 100, damping: 30 });

//   useEffect(() => {
//     document.documentElement.style.scrollBehavior = "smooth";
//     const onScroll = () => setScrolled(window.scrollY > 10);
//     window.addEventListener("scroll", onScroll, { passive: true });
//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);

//   const titleLine1 = "Premium Asset Acquisition.";
//   const titleLine2 = "Institutional Standards.";

//   const containerVariants = {
//     hidden: {},
//     visible: {
//       transition: { staggerChildren: 0.04, delayChildren: 0.1 },
//     },
//   };

//   const letterVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { 
//       opacity: 1, 
//       y: 0,
//       transition: { type: "spring", stiffness: 70, damping: 14 }
//     },
//   };

//   const elementFadeUp = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.5 } }
//   };

//   return (
//     <div className="bg-white min-h-screen w-full relative flex items-start justify-center font-sans overflow-x-hidden selection:bg-[#D4E9B9] selection:text-[#0E292F]">
//       <div className="absolute inset-0 bg-white pointer-events-none z-0" />

//       {/* ── FLUID SCROLL-TO-FULLSCREEN CONTAINER ── */}
//       <motion.div
//         ref={containerRef}
//         style={{ scale: scrolled ? 1 : containerScale }}
//         className={`
//           relative z-10 overflow-hidden flex flex-col justify-between bg-[#040c0e] shadow-2xl
//           transition-all duration-1000 cubic-bezier(0.16, 1, 0.3, 1) origin-top will-change-[transform,border-radius]
//           ${
//             scrolled
//               ? "mt-0 rounded-none min-h-screen w-full mx-0"
//               : "mt-1.5 md:mt-3 rounded-[16px] md:rounded-[24px] min-h-[96vh] w-[calc(100%-12px)] md:w-[calc(100%-24px)] mx-1.5 md:mx-3"
//           }
//         `}
//       >
//         {/* Core Video Background */}
//         <div className="absolute inset-0 w-full h-full z-0 pointer-events-none overflow-hidden">
//           <video
//             className="absolute inset-0 w-full h-full object-cover select-none scale-105"
//             src={HERO_VIDEO}
//             autoPlay
//             loop
//             muted
//             playsInline
//           />
//           <div className="absolute inset-0 bg-black/20 mix-blend-multiply" />
//           <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-transparent" />
//           <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
//         </div>

//         {/* ── LOWER-ANCHORED HERO CONTENT WRAPPER ── */}
//         <div className="relative z-10 flex-1 pt-40 pb-6 md:pb-10 px-6 md:px-12 lg:px-16 w-full flex flex-col justify-end">
//           <div className="max-w-[1440px] w-full mx-auto flex flex-col items-start">
            
//             {/* Reduced Headline Font Scale */}
//             <motion.h1
//               variants={containerVariants}
//               initial="hidden"
//               animate="visible"
//               className="w-full font-serif font-light text-white mb-4 text-left
//                 text-[1.8rem] sm:text-[2.4rem] md:text-[3rem] lg:text-[3.3rem] xl:text-[3.6rem]
//                 leading-[1.1] tracking-tight max-w-[95%] drop-shadow-xl overflow-hidden"
//             >
//               <span className="block overflow-hidden pb-0.5">
//                 {titleLine1.split("").map((char, index) => (
//                   <motion.span key={index} variants={letterVariants} className="inline-block whitespace-pre">
//                     {char}
//                   </motion.span>
//                 ))}
//               </span>
//               <span className="block overflow-hidden font-light text-white/95">
//                 {titleLine2.split("").map((char, index) => (
//                   <motion.span key={index} variants={letterVariants} className="inline-block whitespace-pre">
//                     {char}
//                   </motion.span>
//                 ))}
//               </span>
//             </motion.h1>

//             {/* Sub-Headline & Action Content Block */}
//             <div className="w-full flex flex-col items-start gap-5 max-w-2xl">
              
//               <motion.p 
//                 variants={elementFadeUp}
//                 initial="hidden"
//                 animate="visible"
//                 className="text-white text-xs sm:text-sm md:text-[0.95rem] lg:text-[1rem] leading-relaxed font-semibold tracking-wide max-w-xl drop-shadow-md"
//               >
//                 Discover verified homes, land, commercial assets, and investment opportunities 
//                 across Ikoyi, Victoria Island, Banana Island, and Lekki.
//               </motion.p>

//               <motion.div 
//                 variants={elementFadeUp}
//                 initial="hidden"
//                 animate="visible"
//                 className="shrink-0 pt-1"
//               >
//                 <motion.a
//                   href="/portfolio"
//                   whileHover={{ scale: 1.02 }}
//                   whileTap={{ scale: 0.98 }}
//                   className="inline-flex items-center gap-8 pl-5 pr-2 py-2 rounded-[10px] bg-white text-[#0E292F] transition-all duration-300 shadow-2xl group font-sans text-[10px] sm:text-[11px] font-bold tracking-widest uppercase whitespace-nowrap border border-white"
//                 >
//                   <span className="group-hover:translate-x-1 transition-transform duration-300">Discover Our Platform</span>
//                   <div className="flex items-center justify-center w-8 h-8 rounded-[6px] bg-[#0E292F] text-white group-hover:bg-[#1d4f5b] transition-all duration-300">
//                     <ArrowUpRight size={14} strokeWidth={2.5} className="group-hover:rotate-45 transition-transform duration-300" />
//                   </div>
//                 </motion.a>
//               </motion.div>
//             </div>

//           </div>
//         </div>
//       </motion.div>
//     </div>
//   );
// }