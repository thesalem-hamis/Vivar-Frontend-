import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    id: "01",
    question: "How does Vivar ensure the legitimacy of property titles?",
    answer:
      "We subject every listing to a rigorous multi-layer verification process. Our legal team cross-references documents directly with the land registry authorities, ensuring clean titles, zero encumbrances, and absolute peace of mind before any transaction proceeds.",
  },
  {
    id: "02",
    question:
      "Can I securely manage property acquisitions remotely from the diaspora?",
    answer:
      "Absolutely. We offer comprehensive end-to-end support for overseas clients. This includes high-definition virtual walk-throughs, secure digital document verification, legal representation by proxy, and structured milestone updates throughout the acquisition.",
  },
  {
    id: "03",
    question:
      "What criteria do you use to identify high-yield investment properties?",
    answer:
      "Our investment consultancy relies on predictive structural analysis, historical rental yields, infrastructural growth projections, and upcoming regional developments. We prioritize asset appreciation and consistent cash flow potential.",
  },
  {
    id: "04",
    question: "Do you offer flexible payment plans for off-plan real estate?",
    answer:
      "Yes, our off-plan and pre-construction sales typically feature milestone-based payment structures tailored to the project's timeline. This allows investors to lock in introductory pricing with an initial deposit and distribute the balance over the construction phase.",
  },
  {
    id: "05",
    question: "How long does a typical property valuation take?",
    answer:
      "Standard residential and investment appraisals are completed within 3 to 5 business days. Complex institutional or government-grade valuation reporting may take longer, depending on the scope and size of the real estate portfolio.",
  },
];

const leftColumnVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (custom: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: custom,
      ease: [0.215, 0.61, 0.355, 1.0] as const,
    },
  }),
};

const accordionItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (custom: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: custom * 0.05,
      ease: [0.25, 0.1, 0.25, 1.0] as const,
    },
  }),
};

export default function ContactFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full min-h-screen bg-white text-gray-900 px-6 py-16 md:px-16 md:py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start overflow-hidden">
      {/* Left Column: Content */}
      <motion.div
        className="flex flex-col items-start space-y-6 lg:max-w-xl lg:sticky lg:top-24"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.span
          custom={0}
          variants={leftColumnVariants}
          className="text-xs uppercase tracking-[0.2em] text-teal-600 font-semibold"
        >
          QUESTIONS & ANSWERS
        </motion.span>

        <motion.h2
          custom={0.1}
          variants={leftColumnVariants}
          className="text-4xl sm:text-5xl lg:text-6xl font-serif tracking-tight leading-tight text-gray-900"
        >
          Frequently asked <br />
          <span className="italic font-light text-teal-700">questions</span>
        </motion.h2>

        <motion.p
          custom={0.2}
          variants={leftColumnVariants}
          className="text-gray-500 text-base md:text-lg max-w-sm leading-relaxed"
        >
          Can't find the answer you are looking for? Reach out to our dedicated
          support and brokerage advisory team anytime.
        </motion.p>

        {/* <motion.button
          custom={0.3}
          variants={leftColumnVariants}
          className="group relative rounded-full px-7 py-3 border border-gray-300 text-gray-700 font-medium text-sm transition-colors duration-300 hover:bg-teal-600 hover:border-teal-600 hover:text-white"
        >
          Contact Support
        </motion.button> */}
      </motion.div>

      {/* Right Column: Accordion FAQ List */}
      <motion.div
        className="w-full flex flex-col self-stretch justify-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;

          return (
            <motion.div
              key={faq.id}
              custom={index}
              variants={accordionItemVariants}
              className="border-b border-gray-100"
            >
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full text-left py-6 flex items-center justify-between group transition-colors duration-200 hover:bg-gray-50/80 px-2 rounded-xl focus:outline-none"
                aria-expanded={isOpen}
              >
                <div className="flex items-center space-x-4 md:space-x-6">
                  <span
                    className={`text-xs md:text-sm font-mono font-medium transition-colors duration-300 ${
                      isOpen ? "text-teal-600" : "text-gray-400"
                    }`}
                  >
                    {faq.id}
                  </span>
                  <span
                    className={`text-base md:text-lg font-semibold transition-colors duration-300 pr-4 ${
                      isOpen
                        ? "text-gray-900"
                        : "text-gray-700 group-hover:text-gray-900"
                    }`}
                  >
                    {faq.question}
                  </span>
                </div>

                <div className="text-gray-400 group-hover:text-teal-600 transition-colors duration-200 ml-4 flex-shrink-0">
                  {isOpen ? (
                    <Minus className="w-5 h-5 text-teal-600" />
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
                      transition: {
                        height: { duration: 0.25, ease: "easeInOut" },
                        opacity: { duration: 0.2, delay: 0.05 },
                      },
                    }}
                    exit={{
                      height: 0,
                      opacity: 0,
                      transition: {
                        height: { duration: 0.25, ease: "easeInOut" },
                        opacity: { duration: 0.15 },
                      },
                    }}
                    className="overflow-hidden"
                  >
                    <div className="pl-8 md:pl-12 pr-4 pt-1 pb-6 text-gray-500 text-sm md:text-base leading-relaxed max-w-xl">
                      {faq.answer}
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
