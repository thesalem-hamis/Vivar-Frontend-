"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function AboutHero() {
  return (
    <div className="bg-[#061113] min-h-screen w-full relative flex items-start justify-center font-sans overflow-x-hidden">
      {/* Gradient base */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#061417] via-[#0b2227] to-[#040e10] pointer-events-none z-0" />

      <div className="relative z-10 w-full min-h-screen flex flex-col justify-start bg-[#0E292F]">
        {/* Background image */}
        <img
          src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=2000&auto=format&fit=crop"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none z-0"
        />

        {/* Overlays */}
        <div className="absolute inset-0 bg-[#0E292F]/70 mix-blend-multiply pointer-events-none z-0" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0E292F]/80 via-[#0E292F]/40 to-[#040c0e] pointer-events-none z-0" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent pointer-events-none z-0" />

        {/* Nav */}
        <Navbar />

        {/* Content */}
        <div className="relative z-10 flex-1 flex flex-col justify-center px-6 md:px-12 lg:px-16 pb-24 pt-12">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="max-w-[1440px] w-full mx-auto flex flex-col items-start gap-6"
          >
            <span className="text-[11px] font-bold tracking-[0.25em] text-[#3D7188] uppercase">
              The Team Behind the Transactions
            </span>
            <h1
              className="font-sans font-normal text-white text-left max-w-[90%]
              text-[2.6rem] sm:text-[3.5rem] md:text-[4.5rem] lg:text-[5.5rem]
              leading-[1.08] tracking-tight"
            >
              Built on Expertise.
              <br />
              Driven by Results.
              <br />
              <span className="italic font-serif text-white/70">
                Accountable at Every Step.
              </span>
            </h1>
            <p className="text-white/80 text-sm sm:text-base md:text-[1.15rem] leading-relaxed font-light tracking-wide max-w-2xl mt-2">
              Vivar Realty was not built overnight. It was built through years
              of high-stakes transactions, deep market knowledge, and a
              commitment to the kind of service that premium clients deserve and
              rarely find.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
