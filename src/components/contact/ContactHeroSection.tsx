"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";

// Replace with your team portrait asset matching the reference layout
import TEAM_HERO_IMAGE from "../../assets/ikoyi-main.jpg";

export default function ContactHeroSection() {
  return (
    <div className="w-full bg-white font-sans selection:bg-[#D4E9B9] selection:text-[#0E292F]">
      {/* ── PANORAMIC HERO OVERLAY CONTAINER ── */}
      <section className="relative w-full h-[60vh] min-h-[440px] max-h-[600px] bg-[#0E292F] overflow-hidden flex items-end">
        {/* Core Widescreen Corporate Image Canvas */}
        <img
          src={TEAM_HERO_IMAGE}
          alt="Vivar Realty Corporate Executive Team Portfolio"
          className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none z-0"
        />

        {/* Dynamic Shadow Veil for Clean Typography Legibility */}
        <div className="absolute inset-0 bg-black/40 mix-blend-multiply pointer-events-none z-0" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none z-0" />

        {/* ── LOWER HERO TEXT TRACK ── */}
        <div className="relative z-10 w-full max-w-[90rem] mx-auto px-6 sm:px-10 lg:px-16 pb-12 sm:pb-16 flex flex-col items-start text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
            className="max-w-4xl"
          >
            {/* Header Content */}
            <h1 className="font-serif font-light text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight mb-4 drop-shadow-md">
              Contact Us
            </h1>

            {/* Short Subheadline */}
            <p className="text-white/80 font-sans font-light text-sm sm:text-base md:text-lg leading-relaxed max-w-3xl drop-shadow-sm">
              Have a question or want to work together? Drop us a line, and our
              team will get back to you as soon as possible
            </p>
          </motion.div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Left Column: Info & Details */}
            <div className="flex flex-col justify-center">
              {/* <div className="inline-flex items-center gap-2 text-xs font-medium text-teal-900 mb-4 w-fit">
                <Mail className="w-3.5 h-3.5 text-teal-800" />
                Contact
              </div> */}

              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-4">
                How can we help you today?
              </h1>

              <p className="text-lg text-gray-500 leading-relaxed mb-12 max-w-md">
                Our dedicated premium brokerage team is just a message or call
                away.
              </p>

              {/* Direct Contact Links */}
              <div className="space-y-6">
                {/* Email */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-teal-50 border border-teal-800/50 flex items-center justify-center text-teal-900 shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Email
                    </p>
                    <a
                      href="mailto:info@vivar.com"
                      className="text-base font-semibold text-gray-900 hover:text-teal-900 transition-colors"
                    >
                      info@vivar.com
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12  bg-teal-50 border border-teal-800/50 flex items-center justify-center text-teal-900 shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Phone
                    </p>
                    <a
                      href="tel:+18001234567"
                      className="text-base font-semibold text-gray-900 hover:text-teal-900 transition-colors"
                    >
                      +1 (800) 123-4567
                    </a>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12  bg-teal-50 border border-teal-800/50 flex items-center justify-center text-teal-900 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Location
                    </p>
                    <p className="text-base font-semibold text-gray-900">
                      Silicon Valley, CA 94043 United States
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Contact Form Card */}
            <div className="bg-[#F8FAF9] border border-gray-200 p-6 md:p-8">
              <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="first-name"
                      className="block text-sm font-semibold text-gray-800 mb-2"
                    >
                      First name*
                    </label>
                    <input
                      type="text"
                      id="first-name"
                      placeholder="Billy"
                      className="w-full px-4 py-3 bg-white border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-teal-800 focus:ring-2 focus:ring-teal-100 transition-all"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="last-name"
                      className="block text-sm font-semibold text-gray-800 mb-2"
                    >
                      Last name*
                    </label>
                    <input
                      type="text"
                      id="last-name"
                      placeholder="Jhons"
                      className="w-full px-4 py-3 bg-white border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-teal-800 focus:ring-2 focus:ring-teal-100 transition-all"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-gray-800 mb-2"
                  >
                    Work email*
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Enter email"
                    className="w-full px-4 py-3 bg-white border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-teal-800 focus:ring-2 focus:ring-teal-100 transition-all"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-semibold text-gray-800 mb-2"
                  >
                    Phone number*
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      id="phone"
                      placeholder="Enter phone number"
                      className="w-full px-4 py-3 bg-white border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-teal-800 focus:ring-2 focus:ring-teal-100 transition-all"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-semibold text-gray-800 mb-2"
                  >
                    Message*
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    placeholder="Enter a question, feedback, or suggestions..."
                    className="w-full px-4 py-3 bg-white border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-teal-800 focus:ring-2 focus:ring-teal-100 transition-all resize-none"
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center gap-6 pl-6 pr-2 py-2 rounded-[8px] bg-[#0E292F] text-white
              hover:bg-white hover:text-[#0E292F] border border-[#0E292F] transition-all duration-300 shadow-xl group
              text-[11px] font-bold tracking-widest uppercase whitespace-nowrap"
                >
                  <span>Submit</span>
                  <div className="flex items-center justify-center w-9 h-9 rounded-[6px] group-hover:bg-[#0E292F] text-[#0E292F] bg-white group-hover:text-white transition-all duration-300">
                    <Send size={15} strokeWidth={2.5} />
                  </div>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
