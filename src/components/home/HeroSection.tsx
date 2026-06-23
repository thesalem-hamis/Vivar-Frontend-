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
import { ChevronDown, ArrowUpRight, X } from "lucide-react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";

import LOGO_MAIN from "../../assets/logo_white.png";
// import HERO_VIDEO from "../../assets/mainhero.mp4";
import HERO_IMAGE from "../../assets/ikoyi-main.jpg";

const investDropdown = [
  { label: "Properties", sub: "Explore our property portfolio" },
  { label: "Projects", sub: "Active development projects" },
  { label: "Invest with Us", sub: "Partnership & investment options" },
];

export default function HeroSection() {
  const [scrolled, setScrolled] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileDropOpen, setMobileDropOpen] = useState(false);

  const dropRef = useRef<HTMLDivElement>(null);
  const h1Ref = useRef<HTMLHeadingElement>(null);

  // Hook into viewport scroll progress
  const { scrollY } = useScroll();

  // Map scroll progress to a premium light-up / pop-out effect
  const textOpacity = useTransform(scrollY, [0, 250], [0.85, 1]);
  const textFilter = useTransform(
    scrollY,
    [0, 250],
    ["brightness(1) contrast(1)", "brightness(1.25) contrast(1.05)"],
  );
  const textScale = useTransform(scrollY, [0, 300], [1, 1.015]);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";

    const onScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Dropdown Auto-closer
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropRef.current && !dropRef.current.contains(e.target as Node))
        setDropOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Document Layout Scroll Lock for Drawer
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Framer Motion staggered orchestration variants for entrance reveal
  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.12, delayChildren: 0.2 },
    },
  };

  // const itemVariants = {
  //   hidden: { opacity: 0, y: 30 },
  //   visible: {
  //     opacity: 1,
  //     y: 0,
  //     transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] },
  //   },
  // };

  // const textRowVariants = {
  //   hidden: { opacity: 0, y: 25 },
  //   visible: {
  //     opacity: 1,
  //     y: 0,
  //     transition: { duration: 0.75, ease: [0.25, 1, 0.5, 1], delay: 0.6 },
  //   },
  // };

  return (
    <>
      {/* ── FIXED BACKDROP CANVAS ── */}
      <div className="bg-white min-h-screen w-full relative flex items-start justify-center font-sans overflow-x-hidden selection:bg-[#D4E9B9] selection:text-[#0E292F]">
        {/* Deep Forest Green Gradient Layer under the Glass */}
        <div className="absolute inset-0 bg-white pointer-events-none z-0" />

        {/* Frosted Translucent Dark Glass Overlay Panel Frame */}
        <div className="absolute inset-0 bg-white pointer-events-none z-0" />

        {/* ── TRANSFORM FLUID OVERLAY CONTAINER ── */}
        <div
          className={`
            relative z-10 w-full overflow-hidden flex flex-col justify-start bg-[#040c0e] shadow-2xl
            transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] origin-top will-change-[transform,border-radius]
            ${
              scrolled
                ? "scale-100 mt-0 rounded-none min-h-screen"
                : "scale-[0.96] md:scale-[0.98] mt-2 md:mt-3 rounded-[16px] md:rounded-[20px] min-h-[98vh]"
            }
          `}
        >
          {/* Core Cinematic Video Background */}
          {/* <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none z-0"
            src={HERO_VIDEO}
          /> */}
          <img
            className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none z-0"
            src={HERO_IMAGE}
          />

          {/* Dynamic Rich Overlays over Video Canvas */}
          <div className="absolute inset-0 bg-black/20 mix-blend-multiply pointer-events-none z-0" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0E292F]/60 via-[#1D3F48]/10 to-transparent pointer-events-none z-0" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none z-0" />

          {/* ── NAV BAR ── */}
          <nav className="relative z-20 w-full px-6 md:px-12 py-5 flex items-center justify-between gap-4">
            {/* Mobile/Desktop Nav Pill Wrap */}
            <div
              className={`
                flex items-center justify-between w-full md:w-auto
                transition-all duration-300
                md:bg-transparent md:border-0 md:px-0 md:py-0 md:rounded-none md:shadow-none md:backdrop-blur-none
                ${
                  scrolled
                    ? "bg-[#0E292F]/95 border border-white/20 shadow-lg backdrop-blur-md rounded-[18px] px-4 py-2"
                    : "bg-[#0E292F]/40 border border-white/10 backdrop-blur-sm rounded-[18px] px-4 py-2"
                }
              `}
            >
              <a href="/" className="flex items-center">
                <img
                  src={LOGO_MAIN}
                  alt="Logo"
                  className="h-14 sm:h-16 md:h-20 lg:h-24 w-auto object-contain transition-all duration-300 brightness-0 invert"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              </a>

              {/* Mobile Hamburger Drawer Trigger */}
              <button
                onClick={() => setMobileOpen(true)}
                className="md:hidden flex items-center justify-center w-11 h-11 rounded-xl
                  bg-white/20 hover:bg-white/30 transition-colors ml-4"
                aria-label="Open menu"
              >
                <div className="flex flex-col gap-1.5 w-4">
                  <span className="h-[2px] w-full bg-white rounded-full" />
                  <span className="h-[2px] w-full bg-white rounded-full" />
                </div>
              </button>
            </div>

            {/* Desktop Navigation Links Pill Menu Container */}
            <div className="hidden md:flex items-center p-1.5 rounded-[14px] bg-[#F5F5F5] border border-white/20 shadow-xl ml-auto">
              <div className="flex items-center gap-1 px-4">
                <NavLink href="/">Home</NavLink>
                <NavLink href="/about">About</NavLink>

                {/* Main Link Dropdown */}
                <div ref={dropRef} className="relative">
                  <button
                    onClick={() => setDropOpen((o) => !o)}
                    className="flex items-center gap-1.5 px-3 py-2.5 rounded-[6px] transition-colors
                      duration-200 text-xs font-bold tracking-widest uppercase whitespace-nowrap
                      text-black/90 hover:bg-black/8"
                  >
                    Invest with Us
                    <motion.span
                      animate={{ rotate: dropOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown size={13} strokeWidth={2.5} />
                    </motion.span>
                  </button>

                  <AnimatePresence>
                    {dropOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -8, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -8, scale: 0.97 }}
                        transition={{ duration: 0.18, ease: "easeOut" }}
                        className="absolute top-full right-0 mt-4 w-72 bg-[#0E292F] border border-white/20
                          rounded-[12px] backdrop-blur-xl shadow-2xl overflow-hidden z-50"
                      >
                        {investDropdown.map((item) => (
                          <a
                            key={item.label}
                            href="#"
                            onClick={() => setDropOpen(false)}
                            className="flex items-start justify-between gap-3 px-4 py-3.5
                              hover:bg-white/10 transition-colors duration-150 group
                              border-b border-white/10 last:border-0"
                          >
                            <div>
                              <p className="text-white text-sm font-semibold tracking-tight">
                                {item.label}
                              </p>
                              <p className="text-white/60 text-xs mt-0.5 font-normal normal-case tracking-normal">
                                {item.sub}
                              </p>
                            </div>
                            <ArrowUpRight
                              size={15}
                              className="text-white/40 group-hover:text-white mt-0.5 shrink-0 transition-colors"
                            />
                          </a>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <a
                href="/contact"
                className="px-6 py-3.5 rounded-[10px] bg-[#0E292F] hover:bg-[#1D3F48]
                  transition-colors duration-200 text-white text-[11px] font-bold tracking-widest uppercase whitespace-nowrap"
              >
                Work With Us
              </a>
            </div>
          </nav>

          {/* ── HERO CONTENT WRAPPER ── */}
          <div className="relative z-10 flex-1 pt-12 pb-14 px-6 md:px-12 lg:px-16 w-full flex flex-col justify-end">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="max-w-[1440px] w-full mx-auto flex flex-col items-start"
            >
              {/* Scaled-down primary title to optimize hierarchy */}
              <motion.h1
                ref={h1Ref}
                style={{
                  opacity: textOpacity,
                  filter: textFilter,
                  scale: textScale,
                }}
                className="w-full font-serif font-light text-white mb-8 text-left
                  text-[2.2rem] sm:text-[2.8rem] md:text-[3.4rem] lg:text-[3.8rem] xl:text-[4.2rem]
                  leading-[1.1] tracking-tight max-w-[95%] will-change-[transform,opacity,filter]"
              >
                <motion.span
                  // variants={itemVariants}
                  className="block select-none"
                >
                  Lagos Real Estate.
                </motion.span>
                <motion.span
                  // variants={itemVariants}
                  className="block select-none"
                >
                  Intelligently Curated.
                </motion.span>
              </motion.h1>

              {/* Sub-Headline Text Row */}
              <motion.div
                // variants={textRowVariants}
                className="w-full flex flex-col lg:flex-row lg:items-end justify-between gap-8 pt-2"
              >
                {/* Subtitle Paragraph description */}
                <div className="w-full max-w-2xl">
                  <p className="text-white/90 text-sm sm:text-base md:text-[1.05rem] lg:text-[1.1rem] leading-relaxed font-light tracking-wide">
                    We unravel complex property markets with data intelligence,
                    local compliance, and verified premium portfolios for
                    seamless high-yield asset acquisitions.
                  </p>
                </div>

                {/* Sharp and Precise Premium Action Button */}
                <div className="shrink-0 self-start lg:self-end">
                  <a
                    href="/portfolio"
                    className="inline-flex items-center gap-6 sm:gap-10 pl-5 pr-2 py-2 rounded-[8px] bg-white text-[#0E292F] hover:bg-[#0E292F] hover:text-white border border-white transition-all duration-300 shadow-xl group font-sans text-[10px] sm:text-[11px] font-bold tracking-widest uppercase whitespace-nowrap"
                  >
                    <span>Discover Our Platform</span>
                    <div className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-[6px] bg-[#0E292F] text-white group-hover:bg-white group-hover:text-[#0E292F] transition-all duration-300">
                      <ArrowUpRight size={15} strokeWidth={2.5} />
                    </div>
                  </a>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── MOBILE DRAWER CONTAINER ── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-[65] bg-black/60 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />

            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 32, stiffness: 290 }}
              className="fixed bottom-0 left-0 right-0 z-[70] flex flex-col
                bg-[#0E292F] border-t border-white/20
                rounded-t-[24px] max-h-[92vh] overflow-hidden"
            >
              <div className="flex justify-center pt-4 pb-2 shrink-0">
                <div className="w-10 h-1 rounded-full bg-white/30" />
              </div>

              <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 shrink-0">
                <a href="/" onClick={() => setMobileOpen(false)}>
                  <img
                    src={LOGO_MAIN}
                    alt="Logo"
                    className="h-12 w-auto object-contain brightness-0 invert"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                </a>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2 rounded-[8px] bg-white/10 border border-white/20"
                >
                  <X size={17} className="text-white" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-6 py-6 flex flex-col">
                {["Home", "About"].map((label) => (
                  <a
                    key={label}
                    href={label === "Home" ? "/" : `/${label.toLowerCase()}`}
                    onClick={() => setMobileOpen(false)}
                    className="block py-5 text-white/90 text-2xl font-bold tracking-tight
                      border-b border-white/10 hover:text-white transition-colors"
                  >
                    {label}
                  </a>
                ))}

                <div>
                  <button
                    onClick={() => setMobileDropOpen((o) => !o)}
                    className="w-full flex items-center justify-between py-5 text-white/90
                      text-2xl font-bold tracking-tight border-b border-white/10"
                  >
                    <span>Invest with Us</span>
                    <motion.span
                      animate={{ rotate: mobileDropOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown
                        size={20}
                        strokeWidth={2}
                        className="text-white/60"
                      />
                    </motion.span>
                  </button>
                  <AnimatePresence>
                    {mobileDropOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="overflow-hidden bg-white/5 rounded-b-[8px]"
                      >
                        {investDropdown.map((item) => (
                          <a
                            key={item.label}
                            href="#"
                            onClick={() => setMobileOpen(false)}
                            className="flex items-center justify-between px-4 py-4
                              border-b border-white/10 last:border-0 group"
                          >
                            <div>
                              <p className="text-white text-base font-semibold">
                                {item.label}
                              </p>
                              <p className="text-white/60 text-sm mt-0.5">
                                {item.sub}
                              </p>
                            </div>
                            <ArrowUpRight
                              size={16}
                              className="text-white/40 group-hover:text-white transition-colors"
                            />
                          </a>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <a
                  href="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="block py-5 text-white/90 text-2xl font-bold tracking-tight
                    border-b border-white/10 hover:text-white transition-colors"
                >
                  Contact Us
                </a>
              </div>

              <div className="px-6 pb-8 pt-4 shrink-0">
                <a
                  href="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-4
                    bg-white hover:bg-white/90 transition-colors text-[#0E292F]
                    rounded-[12px] font-bold text-sm tracking-wider uppercase shadow-lg"
                >
                  Work With Us
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

// NavLink Helper
function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className="px-3 py-2.5 rounded-[6px] transition-colors duration-200
        text-xs font-bold tracking-widest uppercase whitespace-nowrap
        text-black hover:bg-black/8"
    >
      {children}
    </a>
  );
}
