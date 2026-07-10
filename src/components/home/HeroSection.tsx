"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { supabase } from "@/lib/supabase/client";
import { Loader2, Check } from "lucide-react";

import HERO_VIDEO from "../../assets/mainhero.mp4";

const headingVariants: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.2,
    },
  },
};

const letterVariants: Variants = {
  hidden: { opacity: 0, y: 12, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      damping: 14,
      stiffness: 100,
    },
  },
};

export default function HeroSection() {
  const [scrolled, setScrolled] = useState(false);
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const h1Ref = useRef<HTMLHeadingElement>(null);

  const { scrollY } = useScroll();
  const textOpacity = useTransform(scrollY, [0, 250], [0.85, 1]);
  const textFilter = useTransform(
    scrollY,
    [0, 250],
    ["brightness(1) contrast(1)", "brightness(1.25) contrast(1.05)"],
  );
  const textScale = useTransform(scrollY, [0, 300], [1, 1.015]);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || submitting) {
      setError("Please enter your email");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      const { error: submitError } = await supabase
        .from("leads")
        .insert({
          name: email.split("@")[0] || "User",
          email: email.trim(),
          phone: null,
        });

      if (submitError) throw submitError;

      setSubmitted(true);
      setEmail(""); // Clear immediately
      setTimeout(() => setSubmitted(false), 2000);
    } catch (err: any) {
      setError(err.message || "Failed to sign up. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
  };

  const line1Words = "Nigeria's Premier Choice".split(" ");
  const line2Words = "for Elite Real Estate".split(" ");

  return (
    <div className="bg-white min-h-screen w-full relative flex items-start justify-center font-sans overflow-x-hidden selection:bg-[#D4E9B9] selection:text-[#0E292F]">
      <div className="absolute inset-0 bg-white pointer-events-none z-0" />

      <div
        className={`relative z-10 w-full overflow-hidden flex flex-col justify-between bg-[#040c0e] shadow-2xl transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] origin-top will-change-[transform,border-radius] ${
          scrolled
            ? "scale-100 mt-0 rounded-none min-h-screen"
            : "scale-[0.96] md:scale-[0.98] mt-2 md:mt-3 rounded-[16px] md:rounded-[20px] min-h-[98vh]"
        }`}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none z-0"
        >
          <source src={HERO_VIDEO} type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-black/25 mix-blend-multiply pointer-events-none z-0" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/10 to-transparent pointer-events-none z-0" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none z-0" />

        <div className="relative z-10 flex-1 pt-28 md:pt-36 pb-14 px-6 md:px-12 lg:px-16 w-full flex flex-col justify-end">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-[1440px] w-full mx-auto flex flex-col items-start"
          >
            <motion.h1
              ref={h1Ref}
              style={{ opacity: textOpacity, filter: textFilter, scale: textScale }}
              className="w-full font-serif font-light text-white mb-6 text-left text-[2rem] sm:text-[2.8rem] md:text-[3.6rem] lg:text-[4.4rem] leading-[1.2] md:leading-[1.15] tracking-tight max-w-full md:max-w-2xl lg:max-w-4xl drop-shadow-md"
              variants={headingVariants}
              initial="hidden"
              animate="visible"
            >
              <span className="block mb-1 md:mb-0">
                {line1Words.map((word, wIdx) => (
                  <span key={`l1-w-${wIdx}`} className="inline-block whitespace-nowrap mr-[0.25em]">
                    {word.split("").map((char, cIdx) => (
                      <motion.span key={`l1-c-${cIdx}`} variants={letterVariants} className="inline-block">
                        {char}
                      </motion.span>
                    ))}
                  </span>
                ))}
              </span>
              <span className="md:block">
                {line2Words.map((word, wIdx) => (
                  <span key={`l2-w-${wIdx}`} className="inline-block whitespace-nowrap mr-[0.25em]">
                    {word.split("").map((char, cIdx) => (
                      <motion.span key={`l2-c-${cIdx}`} variants={letterVariants} className="inline-block">
                        {char}
                      </motion.span>
                    ))}
                  </span>
                ))}
              </span>
            </motion.h1>

            <div className="w-full max-w-xl flex flex-col gap-6 pt-1">
              <p className="text-white text-base md:text-[1.05rem] leading-relaxed font-light tracking-wide drop-shadow-sm opacity-90">
                With us, it's easy to find your future home and build legacy wealth through ultra-premium assets.
              </p>

              <form 
                onSubmit={handleSubmit}
                className="flex items-center bg-white p-1.5 rounded-[10px] w-full max-w-md shadow-xl border border-white"
              >
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-transparent px-4 py-2 text-[#0E292F] placeholder:text-[#0E292F]/50 outline-none text-[12px] sm:text-[13px] font-medium"
                />
                
                <motion.button
                  type="submit"
                  disabled={submitting || submitted}
                  className="relative overflow-hidden flex items-center justify-center px-6 py-3 rounded-[8px] bg-[#0E292F] text-white font-sans text-[10px] sm:text-[11px] font-bold tracking-widest uppercase whitespace-nowrap disabled:opacity-60"
                  whileHover={submitting ? {} : "hover"}
                  whileTap={submitting ? {} : { scale: 0.98 }}
                  variants={{
                    hover: {
                      backgroundColor: "#13353c",
                      scale: 1.03,
                      transition: { duration: 0.3, ease: "easeOut" }
                    }
                  }}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {submitting ? (
                      <>
                        <Loader2 size={13} className="animate-spin" /> Sending...
                      </>
                    ) : submitted ? (
                      <>
                        <Check size={13} /> Signed Up
                      </>
                    ) : (
                      "Sign up"
                    )}
                  </span>

                  <motion.div
                    className="absolute top-0 bottom-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-20px]"
                    style={{ left: "-100%", width: "50%" }}
                    variants={{
                      hover: {
                        left: "150%",
                        transition: { duration: 0.8, ease: "easeInOut" }
                      }
                    }}
                  />
                </motion.button>
              </form>

              {error && (
                <p className="text-red-400 text-xs">{error}</p>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}