"use client";

import { motion } from "framer-motion";
import { Home, TrendingUp, Globe2, ArrowUpRight } from "lucide-react";

const paths = [
  {
    tag: "FOR BUYERS",
    icon: Home,
    title: "Find Your Property",
    body: "Browse verified premium listings in Ikoyi, Lekki, Victoria Island, Abuja, and Port Harcourt.",
    cta: "View Properties",
    href: "/properties",
  },
  {
    tag: "FOR INVESTORS",
    icon: TrendingUp,
    title: "Grow Your Wealth",
    body: "Off-plan opportunities, rental yield strategies, and expert valuations; built for serious investors.",
    cta: "Explore Investment Opportunities",
    href: "/invest",
  },
  {
    tag: "FROM ABROAD",
    icon: Globe2,
    title: "Own Property in Nigeria",
    body: "A trusted, transparent process for Nigerians in the UK, US, and Canada investing back home.",
    cta: "The Diaspora Path",
    href: "/invest",
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

export default function HowWeHelpSection() {
  return (
    <section className="w-full py-24 md:py-32 bg-[#f9fafb]">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        {/* Heading */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          className="max-w-3xl mx-auto text-center mb-16 md:mb-20"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-normal text-[#0E292F] tracking-tighter mb-5">
            Whatever Brings You Here,{" "}
            <span className="italic font-serif text-[#3D7188]">
              We Handle It
            </span>{" "}
            with Excellence.
          </h2>
          <p className="text-base md:text-lg text-[#0E292F]/60 font-light leading-relaxed">
            Buying. Selling. Investing. Three paths. One standard of service.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-0 border-t border-l border-[#0E292F]/10">
          {paths.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.a
                key={item.tag}
                href={item.href}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                variants={fadeUp}
                transition={{ delay: idx * 0.1 }}
                className="group relative flex flex-col justify-between gap-8 p-10 min-h-[340px] border-r border-b border-[#0E292F]/10
                  hover:bg-[#0E292F] transition-colors duration-500 ease-in-out"
              >
                <div className="flex flex-col gap-6">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold tracking-[0.2em] text-[#3D7188] uppercase group-hover:text-[#3D7188]/80 transition-colors duration-500">
                      {item.tag}
                    </span>
                    <div
                      className="flex items-center justify-center w-11 h-11 rounded-[10px] border border-[#0E292F]/10
                      text-[#0E292F] group-hover:border-white/15 group-hover:text-white transition-colors duration-500"
                    >
                      <Icon size={18} strokeWidth={1.75} />
                    </div>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-normal text-[#0E292F] tracking-tight group-hover:text-white transition-colors duration-500">
                    {item.title}
                  </h3>
                  <p className="text-sm md:text-base text-[#0E292F]/60 font-light leading-relaxed group-hover:text-white/70 transition-colors duration-500 max-w-[280px]">
                    {item.body}
                  </p>
                </div>

                <div
                  className="flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] uppercase
                  text-[#0E292F] group-hover:text-white transition-colors duration-500"
                >
                  {item.cta}
                  <ArrowUpRight
                    size={14}
                    className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </div>

                {/* Decorative corner accent on hover */}
                <div className="absolute top-8 right-8 w-4 h-4 border-t border-r border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
