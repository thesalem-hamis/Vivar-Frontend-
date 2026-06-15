"use client";

import { motion } from "framer-motion";
import { Star, Landmark, Building2, ShieldCheck, Globe } from "lucide-react";

const partners = [
  { name: "Abbey Mortgage Bank", label: "Mortgage Partner", icon: Landmark },
  { name: "Westfield Consulting", label: "Advisory Partner", icon: Building2 },
  {
    name: "Government Agencies",
    label: "Institutional Engagements",
    icon: ShieldCheck,
  },
  {
    name: "International Partners",
    label: "Diaspora & Cross-Border",
    icon: Globe,
  },
];

const testimonials = [
  {
    quote:
      "After trying two other agents who wasted six months of my time, Vivar found us the right apartment in Lekki in three weeks. The documentation was clean, the process was clear, and we never felt in the dark.",
    name: "Emmanuel O.",
    role: "Residential Buyer, Lagos",
  },
  {
    quote:
      "I was nervous about investing from London. I\u2019d heard too many horror stories. Vivar walked me through every step remotely. I now own a property in Ikoyi that\u2019s already generating rental income.",
    name: "Adaeze N.",
    role: "Diaspora Investor, London",
  },
  {
    quote:
      "Vivar identified an off-plan unit in Lekki before it went to market, handled every legal check, and gave us progress updates the whole way through. It closed exactly as promised, no surprises.",
    name: "Chinedu A.",
    role: "Property Investor, Lagos",
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

export default function TrustSocialProofSection() {
  return (
    <section className="w-full bg-[#f9fafb]">
      {/* Trusted By */}
      <div className="py-16 md:py-20 bg-white border-b border-[#0E292F]/[0.06]">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeUp}
            className="text-center text-[11px] font-bold tracking-[0.25em] text-[#0E292F]/40 uppercase mb-12"
          >
            Trusted by Some of Africa&rsquo;s Most Respected Institutions
          </motion.p>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeUp}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
          >
            {partners.map((p) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.name}
                  className="flex flex-col items-center justify-center gap-3 text-center px-4 py-8 rounded-2xl
                    border border-[#0E292F]/[0.06] hover:border-[#3D7188]/30 transition-colors duration-300"
                >
                  <Icon
                    size={26}
                    strokeWidth={1.5}
                    className="text-[#0E292F]/70"
                  />
                  <div>
                    <p className="text-sm font-semibold text-[#0E292F] tracking-tight">
                      {p.name}
                    </p>
                    <p className="text-[10px] font-bold tracking-[0.2em] text-[#3D7188] uppercase mt-1">
                      {p.label}
                    </p>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="max-w-2xl mx-auto text-center mb-16"
          >
            <span className="text-[11px] font-bold tracking-[0.25em] text-[#3D7188] uppercase mb-4 block">
              Social Proof
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-normal text-[#0E292F] tracking-tighter">
              What Our Clients Say
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {testimonials.map((t, idx) => (
              <motion.div
                key={t.name}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                variants={fadeUp}
                transition={{ delay: idx * 0.1 }}
                className="flex flex-col gap-6 bg-white border border-[#0E292F]/[0.06] rounded-2xl p-8
                  shadow-[0_8px_30px_rgb(0,0,0,0.02)]"
              >
                <div className="flex items-center gap-1 text-[#3D7188]">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      fill="currentColor"
                      strokeWidth={0}
                    />
                  ))}
                </div>
                <p className="text-[15px] text-[#0E292F]/80 font-light leading-relaxed">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="mt-auto pt-4 border-t border-[#0E292F]/[0.06]">
                  <p className="text-sm font-semibold text-[#0E292F] tracking-tight">
                    {t.name}
                  </p>
                  <p className="text-xs text-[#0E292F]/50 mt-0.5">{t.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
