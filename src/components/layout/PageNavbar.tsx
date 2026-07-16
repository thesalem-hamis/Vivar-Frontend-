"use client";

import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import LOGO_DEFAULT from "../../assets/logo_main.png";
import LOGO_SCROLLED from "../../assets/logo_white.png";

export default function PageNavbar({ darkHero = false }: { darkHero?: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div
      ref={containerRef}
      className="fixed top-4 left-0 right-0 z-50 w-full px-4 font-sans pointer-events-none"
    >
      <div className="max-w-[440px] sm:max-w-[490px] mx-auto relative pointer-events-auto">
        <div
          className={`
            w-full rounded-[18px] px-4 py-2.5 flex items-center justify-between shadow-xl transition-all duration-500 ease-out
            ${
              scrolled || darkHero
                ? "bg-[#0E292F]/95 border border-white/20 backdrop-blur-md"
                : "bg-white border border-neutral-100"
            }
          `}
        >
          <Link
            to="/"
            onClick={handleClose}
            className="pl-0.5 flex items-center justify-center transition-opacity hover:opacity-90"
          >
            <AnimatePresence mode="wait">
              {scrolled || darkHero ? (
                <motion.img
                  key="logo-scrolled"
                  src={LOGO_SCROLLED}
                  alt="Vivar Logo"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="h-10 sm:h-11 w-auto object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
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
                  className="h-10 sm:h-11 w-auto object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              )}
            </AnimatePresence>
          </Link>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`
              flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-200 active:scale-95
              ${
                scrolled || darkHero
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
                  <X size={16} strokeWidth={2.5} className="text-white" />
                </motion.div>
              ) : (
                <motion.div
                  key="burger-icon"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.15 }}
                  className="flex flex-col gap-1 w-3.5 items-center justify-center"
                >
                  <span className="h-[2px] w-full bg-white rounded-full" />
                  <span className="h-[2px] w-full bg-white rounded-full" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.22, ease: [0.25, 1, 0.5, 1] }}
              className="absolute top-full left-0 right-0 mt-2 bg-white rounded-[20px] shadow-2xl border border-neutral-100 overflow-hidden p-2.5 flex flex-col gap-0.5 origin-top z-50"
            >
              <div className="flex flex-col">
                <Link
                  to="/"
                  onClick={handleClose}
                  className="flex items-center justify-between px-3.5 py-3 rounded-lg hover:bg-neutral-50 group transition-colors duration-150"
                >
                  <span className="text-neutral-800 font-medium text-[14px] tracking-tight group-hover:text-[#0E292F] transition-colors">
                    Home
                  </span>
                  <ChevronRight size={14} className="text-neutral-400 group-hover:text-[#0E292F] group-hover:translate-x-0.5 transition-all" />
                </Link>
                <Link
                  to="/about"
                  onClick={handleClose}
                  className="flex items-center justify-between px-3.5 py-3 rounded-lg hover:bg-neutral-50 group transition-colors duration-150"
                >
                  <span className="text-neutral-800 font-medium text-[14px] tracking-tight group-hover:text-[#0E292F] transition-colors">
                    About
                  </span>
                  <ChevronRight size={14} className="text-neutral-400 group-hover:text-[#0E292F] group-hover:translate-x-0.5 transition-all" />
                </Link>
                <Link
                  to="/properties"
                  onClick={handleClose}
                  className="flex items-center justify-between px-3.5 py-3 rounded-lg hover:bg-neutral-50 group transition-colors duration-150"
                >
                  <span className="text-neutral-800 font-medium text-[14px] tracking-tight group-hover:text-[#0E292F] transition-colors">
                    Properties
                  </span>
                  <ChevronRight size={14} className="text-neutral-400 group-hover:text-[#0E292F] group-hover:translate-x-0.5 transition-all" />
                </Link>
                <Link
                  to="/blog"
                  onClick={handleClose}
                  className="flex items-center justify-between px-3.5 py-3 rounded-lg hover:bg-neutral-50 group transition-colors duration-150"
                >
                  <span className="text-neutral-800 font-medium text-[14px] tracking-tight group-hover:text-[#0E292F] transition-colors">
                    Blog
                  </span>
                  <ChevronRight size={14} className="text-neutral-400 group-hover:text-[#0E292F] group-hover:translate-x-0.5 transition-all" />
                </Link>
              </div>

              <Link
                to="/contact"
                onClick={handleClose}
                className="w-full mt-1.5 py-3 rounded-[10px] bg-[#0E292F] hover:bg-[#143941] text-white text-center font-bold text-[11px] tracking-widest uppercase transition-colors shadow-md block"
              >
                Work With Us
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}