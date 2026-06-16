"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const listings = [
  {
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200&auto=format&fit=crop",
    name: "Eko Pearl",
    description: "This 3 bedroom luxury apartment offers elevated waterfront living within a prestigious residential...",
    location: "Lekki Phase 1, Lagos",
  },
  {
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop",
    name: "Cuddle by Cadwell",
    description: "Cuddle is an ongoing luxury residential development located in one of the most prestigious neighborhoods in...",
    location: "Victoria Island, Lagos",
  },
  {
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200&auto=format&fit=crop",
    name: "Solis Residence",
    description: "Step into refined luxury in this modern fully detached home located in the prestigious Pinnock Beach Estate...",
    location: "Lekki, Lagos",
  },
  {
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
    name: "4 Bourdillon",
    description: "Step into the epitome of luxury — every detail of this residence speaks to uncompromising quality...",
    location: "Ikoyi, Lagos",
  },
];

// const fadeUp = {
//   hidden: { opacity: 0, y: 28 },
//   visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
// };

export default function FeaturedListingsSection() {
  const trackRef = useRef<HTMLDivElement>(null);

  return (
    <section className="w-full py-24 md:py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">

        {/* Heading */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          // variants={fadeUp}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12"
        >
          <div>
            <span className="text-[11px] font-bold tracking-[0.25em] text-[#3D7188] uppercase mb-3 block">
              Curated for the Discerning Buyer
            </span>
            <h2 className="text-4xl sm:text-5xl font-normal text-[#0E292F] tracking-[-0.04em] leading-[1.1]">
              Current Featured<br />Listings
            </h2>
          </div>
          <a
            href="/properties"
            className="inline-flex items-center gap-4 pl-5 pr-2 py-2 rounded-[8px] bg-[#0E292F] text-white
              hover:bg-white hover:text-[#0E292F] border border-[#0E292F] transition-all duration-300 group
              text-[10px] font-bold tracking-widest uppercase whitespace-nowrap self-start sm:self-auto"
          >
            <span>View All Properties</span>
            <div className="flex items-center justify-center w-8 h-8 rounded-[6px] bg-white text-[#0E292F]
              group-hover:bg-[#0E292F] group-hover:text-white transition-all duration-300">
              <ArrowUpRight size={14} strokeWidth={2.5} />
            </div>
          </a>
        </motion.div>
      </div>

      {/* Horizontal scroll track */}
      <div
        ref={trackRef}
        className="flex gap-4 overflow-x-auto scrollbar-none px-6 lg:px-16 pb-4"
        style={{ WebkitOverflowScrolling: "touch", scrollSnapType: "x mandatory" }}
      >
        {listings.map((item, idx) => (
          <motion.a
            key={idx}
            href="/properties"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            // variants={fadeUp}
            transition={{ delay: idx * 0.07 }}
            style={{ scrollSnapAlign: "start" }}
            className="relative flex-none w-[72vw] sm:w-[44vw] lg:w-[30vw] xl:w-[26vw]
              aspect-[3/4] rounded-2xl overflow-hidden group cursor-pointer block no-underline"
          >
            {/* Photo */}
            <img
              src={item.image}
              alt={item.name}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            />

            {/* Dark gradient from bottom */}
            <div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(to top, #0E292F 0%, rgba(14,41,47,0.7) 38%, rgba(14,41,47,0.15) 62%, transparent 100%)",
              }}
            />

            {/* Bottom text block */}
            <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col gap-2">
              <h3 className="text-white text-xl font-semibold tracking-tight leading-tight">
                {item.name}
              </h3>
              <p className="text-white/65 text-[13px] font-light leading-[1.55] line-clamp-2">
                {item.description}
              </p>

              {/* Location + arrow row */}
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/10">
                <span className="text-[10px] font-medium tracking-[0.12em] uppercase text-white/45">
                  {item.location}
                </span>
                <div className="w-7 h-7 rounded-full border border-white/20 flex items-center justify-center
                  group-hover:bg-white group-hover:border-white transition-all duration-300">
                  <ArrowUpRight size={13} strokeWidth={2} className="text-white group-hover:text-[#0E292F] transition-colors duration-300" />
                </div>
              </div>
            </div>
          </motion.a>
        ))}

        {/* trailing space */}
        <div className="flex-none w-6 lg:w-16" />
      </div>
    </section>
  );
}