"use client";

import { useState } from "react";
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
    text: "The diaspora buyer\u2019s remote purchase guide, what to expect, step by step",
  },
  {
    icon: ShieldAlert,
    text: "Red flags: 7 signs of a fraudulent listing and how to verify before you commit",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function LeadMagnetSection() {
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="relative w-full py-24 md:py-32 bg-[#0E292F] overflow-hidden">
      {/* Ambient gradient washes */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0E292F] via-[#0E292F] to-[#1D3F48] pointer-events-none" />
      <div className="absolute -top-1/3 -right-1/4 w-[600px] h-[600px] rounded-full bg-[#3D7188]/10 blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left — Copy & Form */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="flex flex-col gap-8"
          >
            <div>
              <span className="text-[11px] font-bold tracking-[0.25em] text-[#3D7188] uppercase mb-4 block">
                Free Resource
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal text-white tracking-tight leading-[1.1] mb-5">
                The Lagos Premium Property
                <br />
                Investment Guide&nbsp;2025
              </h2>
              <p className="text-white/60 text-base font-light leading-relaxed max-w-lg">
                Everything you need to know before buying or investing in
                premium Lagos real estate; locations, pricing benchmarks, ROI
                data, legal checklist, and a diaspora buying guide. Free, for a
                limited time.
              </p>
            </div>

            <ul className="flex flex-col gap-3.5">
              {bullets.map((b) => {
                const Icon = b.icon;
                return (
                  <li
                    key={b.text}
                    className="flex items-start gap-3 text-sm text-white/75 font-light leading-relaxed"
                  >
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-white/[0.06] border border-white/10 shrink-0 mt-0.5">
                      <Icon size={13} className="text-[#D4E9B9]" />
                    </span>
                    {b.text}
                  </li>
                );
              })}
            </ul>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-4 max-w-lg mt-2"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  name="name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className="w-full bg-white/[0.04] border border-white/10 focus:border-[#3D7188] rounded-[10px]
                    px-4 py-3.5 text-sm text-white placeholder:text-white/35 outline-none transition-colors"
                />
                <input
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  className="w-full bg-white/[0.04] border border-white/10 focus:border-[#3D7188] rounded-[10px]
                    px-4 py-3.5 text-sm text-white placeholder:text-white/35 outline-none transition-colors"
                />
              </div>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Phone Number (optional)"
                className="w-full bg-white/[0.04] border border-white/10 focus:border-[#3D7188] rounded-[10px]
                  px-4 py-3.5 text-sm text-white placeholder:text-white/35 outline-none transition-colors"
              />

              <button
                type="submit"
                className="inline-flex items-center justify-center gap-3 mt-1 px-8 py-4 rounded-[10px] bg-white text-[#0E292F]
                  hover:bg-[#3D7188] hover:text-white transition-colors duration-300 text-[11px] font-bold tracking-[0.2em] uppercase"
              >
                {submitted ? (
                  <>
                    <Check size={15} strokeWidth={2.5} /> Guide On Its Way
                  </>
                ) : (
                  <>
                    Send Me the Free Guide
                    <ArrowUpRight size={15} strokeWidth={2.5} />
                  </>
                )}
              </button>

              <p className="text-xs text-white/40 font-light leading-relaxed">
                &ldquo;No spam. No pressure. Your details are safe with us.
                We&rsquo;ll send your guide within minutes.&rdquo; &mdash; Vivar
                Realty Team
              </p>
            </form>
          </motion.div>

          {/* Right — Guide Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, rotate: -2 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex items-center justify-center"
          >
            <div className="relative w-full max-w-sm aspect-[3/4]">
              {/* Back card */}
              <div className="absolute inset-0 translate-x-6 translate-y-6 rounded-2xl bg-[#3D7188]/30 rotate-3" />
              {/* Main cover */}
              <div
                className="relative w-full h-full rounded-2xl bg-gradient-to-br from-[#1D3F48] to-[#0E292F]
                border border-white/10 shadow-2xl overflow-hidden flex flex-col justify-between p-8 sm:p-10"
              >
                {/* Grid texture */}
                <div
                  className="absolute inset-0 opacity-[0.07] pointer-events-none"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
                    backgroundSize: "24px 24px",
                  }}
                />
                <div className="relative z-10 flex items-center justify-between">
                  <span className="text-[10px] font-bold tracking-[0.25em] text-[#D4E9B9] uppercase">
                    Vivar Realty
                  </span>
                  <span className="text-[10px] font-bold tracking-[0.25em] text-white/40 uppercase">
                    2025
                  </span>
                </div>

                <div className="relative z-10 flex flex-col gap-4">
                  <span className="text-[11px] font-bold tracking-[0.25em] text-[#3D7188] uppercase">
                    The Investment Guide
                  </span>
                  <h3 className="text-3xl sm:text-4xl font-normal text-white leading-[1.1] tracking-tight font-serif">
                    Lagos Premium
                    <br />
                    Property Investment
                  </h3>
                  <div className="h-px w-16 bg-white/20 mt-2" />
                  <p className="text-xs text-white/50 font-light leading-relaxed max-w-[220px]">
                    Locations &middot; Pricing Benchmarks &middot; ROI Data
                    &middot; Legal Checklist &middot; Diaspora Guide
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
