"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Phone, Mail } from "lucide-react";
import { FaFacebook, FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa";

import LOGO_MAIN from "../../assets/logo_white.png";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Properties", href: "/properties" },
  { label: "Projects", href: "/projects" },
  { label: "Invest with Vivar", href: "/invest" },
  { label: "Insights", href: "/insights" },
  { label: "Book a Consultation", href: "/contact" },
];

const locations = [
  "Ikoyi",
  "Lekki",
  "Victoria Island",
  "Abuja",
  "Port Harcourt",
  "Diaspora Properties",
];

const socials = [
  {
    icon: FaInstagram,
    label: "Instagram",
    href: "https://instagram.com/vivar_realty",
  },
  { icon: FaFacebook, label: "Facebook", href: "#" },
  { icon: FaYoutube, label: "YouTube", href: "#" },
  { icon: FaTiktok, label: "TikTok", href: "#" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setEmail("");
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <footer className="relative bg-[#0E292F] text-white">
      {/* Subtle dashed grid texture, consistent with brand-statement section */}
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-[0.06]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #ffffff 1px, transparent 1px),
            linear-gradient(to bottom, #ffffff 1px, transparent 1px)
          `,
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-16 py-20 md:py-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8"
        >
          {/* Column 1 — Brand & Newsletter */}
          <div className="flex flex-col gap-6 lg:col-span-1 sm:col-span-2 lg:max-w-xs">
            <a href="/">
              <img
                src={LOGO_MAIN}
                alt="Vivar Realty"
                className="h-16 w-auto object-contain brightness-0 invert"
              />
            </a>
            <p className="text-sm font-light italic tracking-tight text-white/70 font-serif">
              Real Estate, Refined for You.
            </p>

            <div className="flex flex-col gap-3 mt-2">
              <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#3D7188]">
                Stay Informed
              </p>
              <p className="text-sm text-white/60 leading-relaxed font-light">
                Get exclusive listings and market insights in your inbox.
              </p>
              <form
                onSubmit={handleSubmit}
                className="flex items-center gap-2 mt-1"
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="w-full bg-transparent border-b border-white/25 focus:border-[#3D7188]
                    text-sm text-white placeholder:text-white/40 py-2 outline-none transition-colors"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="flex items-center justify-center w-9 h-9 shrink-0 rounded-[6px]
                    bg-white text-[#0E292F] hover:bg-[#3D7188] hover:text-white transition-colors duration-300"
                >
                  <ArrowUpRight size={15} strokeWidth={2.5} />
                </button>
              </form>
              {submitted && (
                <p className="text-xs text-[#D4E9B9]">
                  You're on the list — thank you.
                </p>
              )}
            </div>
          </div>

          {/* Column 2 — Quick Links */}
          <div className="flex flex-col gap-4">
            <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#3D7188]">
              Quick Links
            </p>
            <ul className="flex flex-col gap-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-white/70 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Popular Locations */}
          <div className="flex flex-col gap-4">
            <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#3D7188]">
              Popular Locations
            </p>
            <ul className="flex flex-col gap-3">
              {locations.map((loc) => (
                <li key={loc}>
                  <a
                    href="/properties"
                    className="text-sm text-white/70 hover:text-white transition-colors duration-200"
                  >
                    {loc}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 — Connect */}
          <div className="flex flex-col gap-4">
            <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#3D7188]">
              Connect
            </p>
            <div className="flex items-center gap-2.5">
              {socials.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex items-center justify-center w-10 h-10 rounded-[8px] border border-white/15
                    text-white/70 hover:text-[#0E292F] hover:bg-white hover:border-white transition-all duration-300"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
            <div className="flex flex-col gap-3 mt-2">
              <a
                href="tel:+2349062036699"
                className="flex items-center gap-2.5 text-sm text-white/70 hover:text-white transition-colors"
              >
                <Phone size={14} className="text-[#3D7188]" />
                +234 906 203 6699
              </a>
              <a
                href="mailto:info@vivar.com.ng"
                className="flex items-center gap-2.5 text-sm text-white/70 hover:text-white transition-colors"
              >
                <Mail size={14} className="text-[#3D7188]" />
                info@vivar.com.ng
              </a>
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40 text-center sm:text-left">
            © 2026 Vivar Realty Limited · RC 771396
          </p>
          <div className="flex items-center gap-6 text-xs text-white/40">
            <a
              href="/privacy"
              className="hover:text-white/80 transition-colors"
            >
              Privacy Policy
            </a>
            <a href="/terms" className="hover:text-white/80 transition-colors">
              Terms &amp; Conditions
            </a>
            <a
              href="/sitemap"
              className="hover:text-white/80 transition-colors"
            >
              Site Map
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
