"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import LOGO_MARK from "../../assets/logo_white.png";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function ClosingCTASection() {
  return (
    <section className="relative w-full py-28 md:py-40 bg-[#0E292F] overflow-hidden flex items-center justify-center">
      {/* Watermark logo */}
      <img
        src={LOGO_MARK}
        alt=""
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
          w-[140%] sm:w-[90%] md:w-[60%] max-w-[900px] object-contain opacity-[0.04] brightness-0 invert pointer-events-none select-none"
      />

      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center flex flex-col items-center gap-8">
        <motion.span
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          // variants={fadeUp}
          className="text-[11px] font-bold tracking-[0.25em] text-[#3D7188] uppercase"
        >
          Your Next Move
        </motion.span>

        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          // variants={fadeUp}
          transition={{ delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl font-normal text-white tracking-tight leading-[1.1]"
        >
          Your next property is waiting.
          <br />
          <span className="italic font-serif text-white/70">
            The only step left is the conversation.
          </span>
        </motion.h2>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          // variants={fadeUp}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center gap-4 mt-2"
        >
          <a
            href="/contact"
            className="inline-flex items-center gap-6 pl-6 pr-2 py-2 rounded-[8px] bg-white text-[#0E292F]
              hover:bg-[#3D7188] hover:text-white border border-white transition-all duration-300 shadow-xl group
              text-[11px] font-bold tracking-widest uppercase whitespace-nowrap"
          >
            <span>Book a Free Consultation</span>
            <div
              className="flex items-center justify-center w-9 h-9 rounded-[6px] bg-[#0E292F] text-white
              group-hover:bg-white group-hover:text-[#3D7188] transition-all duration-300"
            >
              <ArrowUpRight size={15} strokeWidth={2.5} />
            </div>
          </a>

          <a
            href="/properties"
            className="inline-flex items-center gap-2 px-7 py-4 rounded-[8px] border border-white/25 text-white
              hover:border-white hover:bg-white/[0.06] transition-all duration-300
              text-[11px] font-bold tracking-widest uppercase whitespace-nowrap"
          >
            Browse Properties
          </a>
        </motion.div>
      </div>
    </section>
  );
}
