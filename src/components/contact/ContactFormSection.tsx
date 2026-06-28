import { motion } from "framer-motion";
import { Landmark, Building2, ShieldCheck, Globe } from "lucide-react";

interface Partner {
  name: string;
  icon: React.ComponentType<{
    size?: number;
    strokeWidth?: number;
    className?: string;
  }>;
}

const partners: Partner[] = [
  { name: "ABBEY MORTGAGE BANK", icon: Landmark },
  { name: "WESTFIELD CONSULTING", icon: Building2 },
  { name: "GOVERNMENT AGENCIES", icon: ShieldCheck },
  { name: "INTERNATIONAL PARTNERS", icon: Globe },
];

const marqueeItems: Partner[] = [
  ...partners,
  ...partners,
  ...partners,
  ...partners,
];

const ContactFormSection = () => {
  return (
    <section className="w-full bg-[#0E292F] py-10 gap-10 text-white  overflow-hidden">
      {/* Elevated Header Section */}
      <div className="max-w-3xl mx-auto text-center px-6 flex flex-col items-center space-y-3">
        <h2 className="text-2xl sm:text-3xl font-serif tracking-tight text-white/90">
          Trusted by Exceptional Brands{" "}
          <span className="italic font-light text-white/70">
            around the world
          </span>
        </h2>
      </div>

      {/* Marquee Ticker Track */}
      <div className="w-full relative flex items-center h-24 overflow-hidden z-10">
        {/* Subtle Contrast Tint Track Line */}
        <div className="absolute inset-x-0 h-[1px] bg-white/[0.04] pointer-events-none" />

        {/* Viewport Side Gradient Faders (Updated for Dark Teal canvas) */}
        <div className="absolute left-0 top-0 bottom-0 w-20 md:w-40 bg-gradient-to-r from-[#0E292F] via-[#0E292F]/80 to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 md:w-40 bg-gradient-to-l from-[#0E292F] via-[#0E292F]/80 to-transparent z-20 pointer-events-none" />

        <motion.div
          className="flex items-center gap-16 md:gap-24 shrink-0 pl-12 z-10"
          animate={{ x: [0, "-25%"] }}
          transition={{
            ease: "linear",
            duration: 28,
            repeat: Infinity,
          }}
        >
          {marqueeItems.map((partner, index) => {
            const Icon = partner.icon;
            return (
              <div
                key={`${partner.name}-${index}`}
                className="flex items-center gap-5 shrink-0 select-none whitespace-nowrap group"
              >
                {/* Translucent Dark Tile Asset Container */}
                <div className="p-2.5 rounded-none bg-white/[0.03] border border-white/[0.06] text-white/40 group-hover:text-teal-400 group-hover:border-teal-500/30 group-hover:bg-white/[0.05] transition-all duration-300 shadow-inner">
                  <Icon size={20} strokeWidth={1.25} />
                </div>

                <span className="text-xs md:text-sm font-bold tracking-[0.2em] text-white/60 uppercase transition-colors duration-300 group-hover:text-white">
                  {partner.name}
                </span>

                <span className="text-white/10 text-lg font-light ml-4 md:ml-6 select-none">
                  /
                </span>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default ContactFormSection;
