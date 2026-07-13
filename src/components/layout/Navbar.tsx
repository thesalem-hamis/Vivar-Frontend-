"use client";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import LOGO_MAIN from "../../assets/logo_white.png";
import LOGO_BLACK from "../../assets/logo_main.png";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
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
                className={`h-12 sm:h-14 md:h-20 lg:h-24 w-auto object-contain transition-all duration-300 brightness-0 invert`}
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
              <NavLink href="/properties">Properties</NavLink>
              <NavLink href="/blog">Blog</NavLink>
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
              className="fixed inset-0 z-[65] bg-black/40 backdrop-blur-xs"
              onClick={() => setMobileOpen(false)}
            />

            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 260 }}
              className="fixed bottom-0 left-0 right-0 z-[70] flex flex-col
                bg-[#F5F5F5] border-t border-[#0E292F]/10
                rounded-t-[24px] max-h-[92vh] overflow-hidden"
            >
              {/* Top Drag Indicator Line */}
              <div className="flex justify-center pt-4 pb-2 shrink-0">
                <div className="w-10 h-1 rounded-full bg-[#0E292F]/20" />
              </div>

              {/* Drawer Brand / Header Row */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-[#0E292F]/5 shrink-0">
                <Link to="/" onClick={() => setMobileOpen(false)}>
                  <img
                    src={LOGO_BLACK}
                    alt="Logo Dark"
                    className="h-12 w-auto object-contain"
                  />
                </Link>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2 rounded-[8px] bg-[#0E292F]/5 border border-[#0E292F]/10"
                >
                  <X size={17} className="text-[#0E292F]" />
                </button>
              </div>

              {/* Drawer Links Area */}
              <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col">
                {["Home", "About", "Properties", "Blog" ].map((label) => (
                  <Link
                    key={label}
                    to={label === "Home" ? "/" : `/${label.toLowerCase()}`}
                    onClick={() => setMobileOpen(false)}
                    className="block py-5 text-[#0E292F]/90 text-2xl font-bold tracking-tight
                      border-b border-[#0E292F]/10 hover:text-[#0E292F] transition-colors"
                  >
                    {label}
                  </Link>
                ))}

                {/* <Link
                  to="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="block py-5 text-[#0E292F]/90 text-2xl font-bold tracking-tight
                    border-b border-[#0E292F]/10 hover:text-[#0E292F] transition-colors"
                >
                  Contact Us
                </Link> */}
              </div>

              {/* Action Button CTA Row */}
              <div className="px-6 pb-8 pt-4 shrink-0">
                <Link
                  to="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-4
                    bg-[#1D3F48] hover:bg-[#0E292F] transition-colors text-white
                    rounded-[12px] font-bold text-sm tracking-wider uppercase shadow-md"
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