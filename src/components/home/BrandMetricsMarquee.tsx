"use client";


export function BrandMetricsGrid() {
  const metrics = [
    { value: "20+", label: "Years Experience", description: "Two decades of uncompromised market mastery and strategic advisory." },
    { value: "500+", label: "Properties Sold", description: "High-value premium assets placed securely into trusted private hands." },
    { value: "3", label: "Key Capital Cities", description: "Direct transactional gateways across key global metropolitan hubs." },
    { value: "Govt.", label: "& International Clients", description: "The preferred advisory partner for corporate and institutional funds." },
    { value: "Diaspora", label: "Friendly Process", description: "Seamless investment bridges engineered for absolute security from anywhere." },
    { value: "100%", label: "Transparent Process", description: "Eliminating vulnerability with strict compliance and legal safety." },
  ];

  return (
    <section className="w-full py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        
        {/* Header Section */}
        <div className="mb-20">
          <h2 className="text-5xl md:text-7xl font-normal text-[#0E292F] tracking-tighter">
            Authority through<br />
            <span className="italic font-serif text-[#3D7188]">Precision.</span>
          </h2>
        </div>

        {/* The Glass Deck */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-l border-[#0E292F]/10">
          {metrics.map((item, idx) => (
            <div
              key={idx}
              className="group relative p-10 border-r border-b border-[#0E292F]/10 hover:bg-[#0E292F] transition-colors duration-500 ease-in-out"
            >
              {/* Number identity */}
              <div className="text-5xl font-light text-[#0E292F] group-hover:text-white transition-colors duration-500 font-serif mb-8">
                {item.value}
              </div>

              {/* Text Content */}
              <div className="flex flex-col gap-3">
                <h3 className="text-xs font-bold tracking-[0.2em] text-[#3D7188] uppercase group-hover:text-[#3D7188]/70 transition-colors duration-500">
                  {item.label}
                </h3>
                <p className="text-sm text-[#0E292F]/60 group-hover:text-white/70 font-light leading-relaxed transition-colors duration-500 max-w-[240px]">
                  {item.description}
                </p>
              </div>

              {/* Decorative corner accent on hover */}
              <div className="absolute top-8 right-8 w-4 h-4 border-t border-r border-[#0E292F]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}