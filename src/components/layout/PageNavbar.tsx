"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronRight, ChevronDown, ArrowUpRight, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import LOGO_DEFAULT from "../../assets/logo_main.png";   // shown when NOT scrolled
import LOGO_SCROLLED from "../../assets/logo_white.png"; // shown when scrolled (dark bg)

const investDropdown = [
  { label: "Properties", sub: "Explore our property portfolio" },
  { label: "Projects", sub: "Active development projects" },
  { label: "Invest with Us", sub: "Partnership & investment options" },
];

export default function PageNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [investOpen, setInvestOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setInvestOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    setInvestOpen(false);
  };

  return (
    <div ref={containerRef} className="fixed top-4 left-0 right-0 z-50 w-full px-4 font-sans pointer-events-none">
      <div className="max-w-[500px] sm:max-w-[560px] mx-auto relative pointer-events-auto">

        {/* ── ENHANCED & TALLER CAPSULE BAR ── */}
        <div
          className={`
            w-full rounded-[22px] px-4 py-3 flex items-center justify-between shadow-xl transition-all duration-500 ease-out
            ${scrolled
              ? "bg-[#0E292F]/95 border border-white/20 backdrop-blur-md"
              : "bg-white border border-neutral-100"
            }
          `}
        >
          {/* Logo — Expanded sizes */}
          <a href="/" className="pl-1 flex items-center justify-center transition-opacity hover:opacity-90">
            <AnimatePresence mode="wait">
              {scrolled ? (
                <motion.img
                  key="logo-scrolled"
                  src={LOGO_SCROLLED}
                  alt="Vivar Logo"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="h-12 sm:h-14 w-auto object-contain"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                />
              ) : (
                <motion.img
                  key="logo-default"
                  src={LOGO_DEFAULT}
                  alt="Vivar Logo"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="h-12 sm:h-14 w-auto object-contain"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                />
              )}
            </AnimatePresence>
          </a>

          {/* Hamburger Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`
              flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-200 active:scale-95
              ${scrolled
                ? "bg-white/20 hover:bg-white/30"
                : "bg-[#0E292F] hover:bg-[#143941]"
              }
            `}
            aria-label="Toggle Navigation Menu"
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close-icon"
                  initial={{ opacity: 0, scale: 0.6, rotate: -45 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.6, rotate: 45 }}
                  transition={{ duration: 0.15 }}
                >
                  <X size={18} strokeWidth={2.5} className="text-white" />
                </motion.div>
              ) : (
                <motion.div
                  key="burger-icon"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.15 }}
                  className="flex flex-col gap-1.5 w-4 items-center justify-center"
                >
                  <span className="h-[2px] w-full bg-white rounded-full" />
                  <span className="h-[2px] w-full bg-white rounded-full" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>

        {/* ── DROPDOWN MENU WITH EXACT ORDERING ── */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -12, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.97 }}
              transition={{ duration: 0.22, ease: [0.25, 1, 0.5, 1] }}
              className="absolute top-full left-0 right-0 mt-3 bg-white rounded-[24px] shadow-2xl border border-neutral-100 overflow-hidden p-3.5 flex flex-col gap-1 origin-top z-50"
            >
              <div className="flex flex-col">

                {/* 1. Home Link */}
                <a
                  href="/"
                  onClick={handleClose}
                  className="flex items-center justify-between px-4 py-4 rounded-xl hover:bg-neutral-50 group transition-colors duration-150"
                >
                  <span className="text-neutral-800 font-medium text-[15px] tracking-tight group-hover:text-[#0E292F] transition-colors">
                    Home
                  </span>
                  <ChevronRight
                    size={15}
                    className="text-neutral-400 group-hover:text-[#0E292F] group-hover:translate-x-0.5 transition-all"
                  />
                </a>

                {/* 2. About Link */}
                <a
                  href="/about"
                  onClick={handleClose}
                  className="flex items-center justify-between px-4 py-4 rounded-xl hover:bg-neutral-50 group transition-colors duration-150"
                >
                  <span className="text-neutral-800 font-medium text-[15px] tracking-tight group-hover:text-[#0E292F] transition-colors">
                    About
                  </span>
                  <ChevronRight
                    size={15}
                    className="text-neutral-400 group-hover:text-[#0E292F] group-hover:translate-x-0.5 transition-all"
                  />
                </a>

                {/* 3. Invest with Us Menu Accordion */}
                <div>
                  <button
                    onClick={() => setInvestOpen((o) => !o)}
                    className="w-full flex items-center justify-between px-4 py-4 rounded-xl hover:bg-neutral-50 group transition-colors duration-150"
                  >
                    <span className="text-neutral-800 font-medium text-[15px] tracking-tight group-hover:text-[#0E292F] transition-colors">
                      Invest with Us
                    </span>
                    <motion.span
                      animate={{ rotate: investOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown
                        size={15}
                        className="text-neutral-400 group-hover:text-[#0E292F] transition-colors"
                      />
                    </motion.span>
                  </button>

                  <AnimatePresence>
                    {investOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.22, ease: "easeInOut" }}
                        className="overflow-hidden mx-2 mb-2 rounded-[14px] bg-neutral-50 border border-neutral-100"
                      >
                        {investDropdown.map((item) => (
                          <a
                            key={item.label}
                            href="#"
                            onClick={handleClose}
                            className="flex items-start justify-between gap-3 px-4 py-3.5
                              hover:bg-neutral-100 transition-colors duration-150 group
                              border-b border-neutral-100 last:border-0"
                          >
                            <div>
                              <p className="text-neutral-800 text-sm font-semibold tracking-tight">
                                {item.label}
                              </p>
                              <p className="text-neutral-500 text-xs mt-0.5 font-normal">
                                {item.sub}
                              </p>
                            </div>
                            <ArrowUpRight
                              size={14}
                              className="text-neutral-400 group-hover:text-[#0E292F] mt-0.5 shrink-0 transition-colors"
                            />
                          </a>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* 4. Contact Link */}
                <a
                  href="/contact"
                  onClick={handleClose}
                  className="flex items-center justify-between px-4 py-4 rounded-xl hover:bg-neutral-50 group transition-colors duration-150"
                >
                  <span className="text-neutral-800 font-medium text-[15px] tracking-tight group-hover:text-[#0E292F] transition-colors">
                    Contact
                  </span>
                  <ChevronRight
                    size={15}
                    className="text-neutral-400 group-hover:text-[#0E292F] group-hover:translate-x-0.5 transition-all"
                  />
                </a>

              </div>

              {/* Master Premium CTA Button */}
              <a
                href="/contact"
                onClick={handleClose}
                className="w-full mt-2 py-4 rounded-[14px] bg-[#0E292F] hover:bg-[#143941] text-white text-center font-bold text-xs tracking-widest uppercase transition-colors shadow-md block"
              >
                Work With Us
              </a>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}