"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, BedDouble, Bath, MapPin } from "lucide-react";

const listings = [
  {
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200&auto=format&fit=crop",
    status: "For Sale",
    location: "Ikoyi, Lagos",
    type: "Detached Duplex",
    beds: 5,
    baths: 6,
    priceNGN: "₦850,000,000",
    priceUSD: "≈ $540,000",
  },
  {
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop",
    status: "For Sale",
    location: "Lekki Phase 1, Lagos",
    type: "Waterfront Villa",
    beds: 4,
    baths: 5,
    priceNGN: "₦620,000,000",
    priceUSD: "≈ $395,000",
  },
  {
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200&auto=format&fit=crop",
    status: "For Rent",
    location: "Victoria Island, Lagos",
    type: "Serviced Apartment",
    beds: 3,
    baths: 3,
    priceNGN: "₦18,000,000 / yr",
    priceUSD: "≈ $11,500 / yr",
  },
  {
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
    status: "For Sale",
    location: "Maitama, Abuja",
    type: "Luxury Bungalow",
    beds: 4,
    baths: 4,
    priceNGN: "₦480,000,000",
    priceUSD: "≈ $305,000",
  },
  {
    image:
      "https://images.unsplash.com/photo-1571055107559-3e67626fa8be?q=80&w=1200&auto=format&fit=crop",
    status: "Sold",
    location: "Old GRA, Port Harcourt",
    type: "Family Residence",
    beds: 5,
    baths: 5,
    priceNGN: "₦310,000,000",
    priceUSD: "≈ $197,000",
  },
  {
    image:
      "https://images.unsplash.com/photo-1600210492486-715a3ca7b5cb?q=80&w=1200&auto=format&fit=crop",
    status: "For Sale",
    location: "Banana Island, Lagos",
    type: "Penthouse Apartment",
    beds: 4,
    baths: 5,
    priceNGN: "₦1,200,000,000",
    priceUSD: "≈ $765,000",
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

export default function FeaturedListingsSection() {
  return (
    <section className="w-full py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        {/* Heading */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          className="max-w-2xl mx-auto text-center mb-16 md:mb-20"
        >
          <span className="text-[11px] font-bold tracking-[0.25em] text-[#3D7188] uppercase mb-4 block">
            Curated for the Discerning Buyer
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-normal text-[#0E292F] tracking-tighter mb-5">
            Current Featured Listings
          </h2>
          <p className="text-base md:text-lg text-[#0E292F]/60 font-light leading-relaxed">
            Hand-selected from Vivar&rsquo;s current portfolio. Every listing is
            verified, every detail is confirmed.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {listings.map((item, idx) => (
            <motion.div
              key={item.location + item.type}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={fadeUp}
              transition={{ delay: (idx % 3) * 0.08 }}
              className="group flex flex-col rounded-2xl overflow-hidden border border-[#0E292F]/[0.06] bg-white
                shadow-[0_8px_30px_rgb(0,0,0,0.03)] hover:shadow-[0_20px_50px_rgb(0,0,0,0.08)] transition-shadow duration-500"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={item.image}
                  alt={`${item.type} in ${item.location}`}
                  className={`w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05] ${item.status === "Sold" && "opacity-55"}`}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                {/* Status badge */}
                <span
                  className={`absolute top-4 left-4 px-3 py-1.5 rounded-[6px] text-[10px] font-bold tracking-[0.15em] uppercase
                    ${item.status === "Sold" ? "bg-white/80 text-[#0E292F]/50" : "bg-[#3D7188] text-white"}`}
                >
                  {item.status}
                </span>

                {/* Location */}
                <div className="absolute bottom-4 left-4 flex items-center gap-1.5 text-white text-xs font-medium tracking-wide">
                  <MapPin size={13} strokeWidth={2} />
                  {item.location}
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col gap-4 p-6">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-lg font-semibold text-[#0E292F] tracking-tight">
                    {item.type}
                  </h3>
                  <div className="flex items-center gap-3 text-[#0E292F]/50 shrink-0 mt-1">
                    <span className="flex items-center gap-1 text-xs">
                      <BedDouble size={14} /> {item.beds}
                    </span>
                    <span className="flex items-center gap-1 text-xs">
                      <Bath size={14} /> {item.baths}
                    </span>
                  </div>
                </div>

                <div className="flex items-baseline gap-2">
                  <span className="text-xl font-semibold text-[#0E292F] font-serif">
                    {item.priceNGN}
                  </span>
                  <span className="text-xs text-[#0E292F]/40">
                    {item.priceUSD}
                  </span>
                </div>

                <div className="flex items-center gap-3 pt-2 border-t border-[#0E292F]/[0.06]">
                  <a
                    href="/properties"
                    className="flex-1 text-center text-[11px] font-bold tracking-[0.15em] uppercase text-[#0E292F]
                      border border-[#0E292F]/15 rounded-[8px] py-3 hover:bg-[#0E292F] hover:text-white hover:border-[#0E292F]
                      transition-colors duration-300"
                  >
                    View Details
                  </a>
                  <a
                    href="/contact"
                    className="flex-1 flex items-center justify-center gap-1.5 text-center text-[11px] font-bold tracking-[0.15em] uppercase
                      text-white bg-[#3D7188] rounded-[8px] py-3 hover:bg-[#0E292F] transition-colors duration-300"
                  >
                    Enquire Now
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={fadeUp}
          className="flex justify-center mt-16"
        >
          <a
            href="/properties"
            className="inline-flex items-center gap-6 pl-6 pr-2 py-2 rounded-[8px] bg-[#0E292F] text-white
              hover:bg-white hover:text-[#0E292F] border border-[#0E292F] transition-all duration-300 shadow-xl group
              text-[11px] font-bold tracking-widest uppercase whitespace-nowrap"
          >
            <span>View All Properties</span>
            <div
              className="flex items-center justify-center w-9 h-9 rounded-[6px] bg-white text-[#0E292F]
              group-hover:bg-[#0E292F] group-hover:text-white transition-all duration-300"
            >
              <ArrowUpRight size={15} strokeWidth={2.5} />
            </div>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
