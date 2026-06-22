import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X } from 'lucide-react';

// Hardcoded service items data
const services = [
  {
    id: '01',
    title: 'Residential Brokerage',
    description: "Buying and selling premium homes across Lagos, Abuja, and Port Harcourt. Every listing verified, every client guided from search to signature."
  },
  {
    id: '02',
    title: 'Investment Consultancy',
    description: "Identifying high-yield acquisition targets, assessing rental income potential, and supporting portfolio growth with expert market analysis."
  },
  {
    id: '03',
    title: 'Off-Plan & Project Sales',
    description: "Representing premium development projects at the pre-construction and under-construction stage — early access, best pricing, maximum appreciation potential."
  },
  {
    id: '04',
    title: 'Expert Valuations & Appraisals',
    description: "Professional valuations for mortgage applications, insurance, mergers, refinancing, litigation, and estate planning. Government and institutional-grade reporting."
  },
  {
    id: '05',
    title: 'Diaspora Property Advisory',
    description: "End-to-end support for Nigerians abroad — remote property search, virtual viewings, legal verification, and trusted management after purchase."
  }
];

// Framer Motion Variants for Left Column Staggered Entrance
const leftColumnVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (custom: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: custom,
      ease: [0.215, 0.610, 0.355, 1.000] // easeOutCubic
    }
  })
};

// Framer Motion Variants for Right Column Accordion Items Entrance
const accordionItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (custom: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: custom * 0.05,
      ease: 'easeOut'
    }
  })
};

export default function AboutWhatWeDo() {
  // First item open by default
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full min-h-screen bg-[#0A1F24] text-white px-6 py-16 md:px-16 md:py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center overflow-hidden">
      
      {/* Left Column: Content */}
      <motion.div 
        className="flex flex-col items-start space-y-6 lg:max-w-xl"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.span 
          custom={0}
          variants={leftColumnVariants}
          className="text-xs uppercase tracking-[0.2em] text-white/50 font-medium"
        >
          WHAT WE DO
        </motion.span>
        
        <motion.h2 
          custom={0.1}
          variants={leftColumnVariants}
          className="text-4xl sm:text-5xl lg:text-6xl font-serif tracking-tight leading-tight"
        >
          Crafting spaces <br />
          <span className="italic font-light text-white/90">that inspire</span>
        </motion.h2>
        
        <motion.p 
          custom={0.2}
          variants={leftColumnVariants}
          className="text-white/70 text-base md:text-lg max-w-sm leading-relaxed"
        >
          We are a full-service real estate firm specialising in premium residential, investment, and advisory services across Nigeria's most strategic locations.
        </motion.p>
        
        <motion.button 
          custom={0.3}
          variants={leftColumnVariants}
          className="group relative rounded-full px-7 py-3 border border-white/40 text-white font-medium text-sm transition-colors duration-300 hover:bg-white hover:text-[#0A1F24]"
        >
          Our Story
        </motion.button>
      </motion.div>

      {/* Right Column: Accordion Service List */}
      <motion.div 
        className="w-full flex flex-col self-stretch justify-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {services.map((service, index) => {
          const isOpen = openIndex === index;
          
          return (
            <motion.div
              key={service.id}
              custom={index}
              variants={accordionItemVariants}
              className="border-b border-white/10"
            >
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full text-left py-6 flex items-center justify-between group transition-colors duration-200 hover:bg-white/5 px-2 rounded-sm focus:outline-none"
                aria-expanded={isOpen}
              >
                <div className="flex items-center space-x-4 md:space-x-6">
                  <span className={`text-xs md:text-sm font-mono font-medium transition-colors duration-300 ${isOpen ? 'text-[#4ECDC4]' : 'text-white/50'}`}>
                    {service.id}
                  </span>
                  <span className={`text-lg md:text-xl font-medium transition-colors duration-300 ${isOpen ? 'text-white' : 'text-white/80 group-hover:text-white'}`}>
                    {service.title}
                  </span>
                </div>
                
                <div className="text-white/60 group-hover:text-white transition-colors duration-200 ml-4 flex-shrink-0">
                  {isOpen ? (
                    <X className="w-5 h-5" />
                  ) : (
                    <Plus className="w-5 h-5 transition-transform duration-300 group-hover:rotate-90" />
                  )}
                </div>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ 
                      height: "auto", 
                      opacity: 1,
                      transition: { height: { duration: 0.25, ease: "easeInOut" }, opacity: { duration: 0.2, delay: 0.05 } }
                    }}
                    exit={{ 
                      height: 0, 
                      opacity: 0,
                      transition: { height: { duration: 0.25, ease: "easeInOut" }, opacity: { duration: 0.15 } }
                    }}
                    className="overflow-hidden"
                  >
                    <div className="pl-8 md:pl-12 pr-4 pt-2 pb-6 text-white/60 text-sm leading-relaxed max-w-sm">
                      {service.description}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </motion.div>

    </section>
  );
}