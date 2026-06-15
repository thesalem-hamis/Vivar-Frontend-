"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, ArrowRight } from "lucide-react";

const articles = [
  {
    image:
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?q=80&w=1200&auto=format&fit=crop",
    category: "Buying Guide",
    title: "How to Buy Property in Ikoyi, Lagos. The Complete Guide",
    teaser:
      "Everything a serious buyer needs to know about pricing, due diligence, and timelines before making an offer in Ikoyi.",
    date: "June 2026",
  },
  {
    image:
      "https://images.unsplash.com/photo-1518684079-3c830dcef090?q=80&w=1200&auto=format&fit=crop",
    category: "Market Report",
    title: "Lekki Phase 1 vs Lekki Phase 2: The Better Investment in 2026?",
    teaser:
      "A side-by-side look at pricing trends, infrastructure, and appreciation potential across both corridors.",
    date: "May 2026",
  },
  {
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop",
    category: "Diaspora Guide",
    title: "How to Buy Nigerian Property from the UK; Step by Step",
    teaser:
      "A practical, remote-friendly walkthrough for diaspora clients investing back home without setting foot in Lagos.",
    date: "May 2026",
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

export default function InsightsPreviewSection() {
  return (
    <section className="w-full py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          className="max-w-2xl mx-auto text-center mb-16 md:mb-20"
        >
          <span className="text-[11px] font-bold tracking-[0.25em] text-[#3D7188] uppercase mb-4 block">
            The Vivar Intelligence
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-normal text-[#0E292F] tracking-tighter mb-5">
            Insights from the Property Market
          </h2>
          <p className="text-base md:text-lg text-[#0E292F]/60 font-light leading-relaxed">
            Expert perspectives on Nigerian real estate &mdash; market
            movements, investment strategies, and buying guides.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {articles.map((a, idx) => (
            <motion.a
              key={a.title}
              href="/insights"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={fadeUp}
              transition={{ delay: idx * 0.1 }}
              className="group flex flex-col gap-5"
            >
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                <img
                  src={a.image}
                  alt={a.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                  loading="lazy"
                />
                <span
                  className="absolute top-4 left-4 px-3 py-1.5 rounded-[6px] text-[10px] font-bold tracking-[0.15em] uppercase
                  bg-white/90 text-[#0E292F]"
                >
                  {a.category}
                </span>
              </div>

              <div className="flex flex-col gap-3">
                <span className="text-[11px] font-bold tracking-[0.2em] text-[#3D7188] uppercase">
                  {a.date}
                </span>
                <h3 className="text-xl font-semibold text-[#0E292F] tracking-tight leading-snug group-hover:text-[#3D7188] transition-colors duration-300">
                  {a.title}
                </h3>
                <p className="text-sm text-[#0E292F]/55 font-light leading-relaxed">
                  {a.teaser}
                </p>
                <span className="inline-flex items-center gap-1.5 text-[11px] font-bold tracking-[0.2em] uppercase text-[#0E292F] mt-1">
                  Read More
                  <ArrowRight
                    size={13}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </span>
              </div>
            </motion.a>
          ))}
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={fadeUp}
          className="flex justify-center mt-16"
        >
          <a
            href="/insights"
            className="inline-flex items-center gap-6 pl-6 pr-2 py-2 rounded-[8px] bg-transparent text-[#0E292F]
              hover:bg-[#0E292F] hover:text-white border border-[#0E292F] transition-all duration-300 group
              text-[11px] font-bold tracking-widest uppercase whitespace-nowrap"
          >
            <span>View All Insights</span>
            <div
              className="flex items-center justify-center w-9 h-9 rounded-[6px] bg-[#0E292F] text-white
              group-hover:bg-white group-hover:text-[#0E292F] transition-all duration-300"
            >
              <ArrowUpRight size={15} strokeWidth={2.5} />
            </div>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
