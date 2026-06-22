"use client";

import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, ArrowUpRight, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import LOGO_MAIN from "../../assets/logo_white.png";

const investDropdown = [
  { label: "Properties", sub: "Explore our property portfolio", to: "/properties" },
  { label: "Projects", sub: "Active development projects", to: "#" },
  { label: "Invest with Us", sub: "Partnership & investment options", to: "#" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileDropOpen, setMobileDropOpen] = useState(false);

  const dropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
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

  return (
    <>
      {/* ── GLOBAL STICKY HEADER CONTAINER ── */}
      <header className="fixed top-0 left-0 right-0 z-50 w-full px-6 md:px-12 py-4 transition-all duration-300 pointer-events-none">
        <div className="max-w-[1440px] mx-auto w-full flex items-center justify-between gap-4 pointer-events-auto">
          
          {/* Logo / Mobile Wrapper */}
          <div
            className={`
              flex items-center justify-between w-full md:w-auto
              transition-all duration-500 ease-out
              md:bg-transparent md:border-0 md:px-0 md:py-0 md:rounded-none md:shadow-none md:backdrop-blur-none
              ${
                scrolled
                  ? "bg-[#0E292F]/95 border border-white/20 shadow-xl backdrop-blur-md rounded-[18px] px-5 py-2.5"
                  : "bg-[#0E292F]/40 border border-white/10 backdrop-blur-sm rounded-[18px] px-4 py-2"
              }
            `}
          >
            <a href="/" className="flex items-center">
              <img
                src={LOGO_MAIN}
                alt="Logo"
                className="h-12 sm:h-14 md:h-16 w-auto object-contain transition-all duration-300 brightness-0 invert"
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

          {/* Desktop Navigation Menu Container */}
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
                          href={item.to}
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
        </div>
      </header>

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
                <Link to="/" onClick={() => setMobileOpen(false)}>
                  <img
                    src={LOGO_MAIN}
                    alt="Logo"
                    className="h-12 w-auto object-contain brightness-0 invert"
                  />
                </Link>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2 rounded-[8px] bg-white/10 border border-white/20"
                >
                  <X size={17} className="text-white" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-6 py-6 flex flex-col">
                {["Home", "About"].map((label) => (
                  <Link
                    key={label}
                    to={label === "Home" ? "/" : `/${label.toLowerCase()}`}
                    onClick={() => setMobileOpen(false)}
                    className="block py-5 text-white/90 text-2xl font-bold tracking-tight
                      border-b border-white/10 hover:text-white transition-colors"
                  >
                    {label}
                  </Link>
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
                      <ChevronDown size={20} className="text-white/60" />
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
                          <Link
                            key={item.label}
                            to={item.to}
                            onClick={() => setMobileOpen(false)}
                            className="flex items-center justify-between px-4 py-4
                              border-b border-white/10 last:border-0 group"
                          >
                            <div>
                              <p className="text-white text-base font-semibold">{item.label}</p>
                              <p className="text-white/60 text-sm mt-0.5">{item.sub}</p>
                            </div>
                            <ArrowUpRight size={16} className="text-white/40 group-hover:text-white transition-colors" />
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <Link
                  to="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="block py-5 text-white/90 text-2xl font-bold tracking-tight
                    border-b border-white/10 hover:text-white transition-colors"
                >
                  Contact Us
                </Link>
              </div>

              <div className="px-6 pb-8 pt-4 shrink-0">
                <Link
                  to="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-4
                    bg-white hover:bg-white/90 transition-colors text-[#0E292F]
                    rounded-[12px] font-bold text-sm tracking-wider uppercase shadow-lg"
                >
                  Work With Us
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
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