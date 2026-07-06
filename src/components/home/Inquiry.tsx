// import React, { useState } from "react";
// import { toast } from "react-hot-toast";
// import { CheckCircle, ArrowRight, Loader2 } from "lucide-react";
// import { motion } from "framer-motion";
// import { PhoneInput } from "react-international-phone";
// import "react-international-phone/style.css";

// const Inquiry = () => {
//   const [phone, setPhone] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     // Simulate API call
//     await new Promise((resolve) => setTimeout(resolve, 1500));

//     toast.success("Inquiry submitted successfully!");
//     setIsSubmitting(false);
    
//     // Reset form
//     e.currentTarget.reset();
//     setPhone("");
//   };

//   return (
//     <section className="min-h-screen bg-[#F4F6F6] py-20 px-6 flex items-center justify-center">
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         viewport={{ once: true }}
//         transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
//         className="w-full max-w-xl bg-white/40 backdrop-blur-xl border border-white/60 p-8 md:p-12 shadow-2xl"
//       >
//         <h2 className="text-3xl font-serif text-[#0E292F] mb-3">Got an Inquiry?</h2>
//         <p className="mb-10 text-[#0E292F]/70 font-light leading-relaxed">
//           Have a question about a property, partnership, or our services? 
//           Fill out the form below and our team will get back to you promptly.
//         </p>

//         <form onSubmit={handleSubmit} className="space-y-5">
//           {/* Names */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <input type="text" placeholder="First Name" required className="bg-white/50 border border-[#0E292F]/10 p-3 outline-none focus:border-[#0E292F]/40 transition placeholder:text-[#0E292F]/30" />
//             <input type="text" placeholder="Last Name" required className="bg-white/50 border border-[#0E292F]/10 p-3 outline-none focus:border-[#0E292F]/40 transition placeholder:text-[#0E292F]/30" />
//           </div>

//           {/* Email */}
//           <input type="email" placeholder="Email Address" required className="w-full bg-white/50 border border-[#0E292F]/10 p-3 outline-none focus:border-[#0E292F]/40 transition placeholder:text-[#0E292F]/30" />

//           {/* Phone */}
//           <div className="bg-white/50 border border-[#0E292F]/10 p-1.5 focus-within:border-[#0E292F]/40 transition">
//             <PhoneInput
//               defaultCountry="ng"
//               value={phone}
//               onChange={setPhone}
//               inputClassName="!w-full !bg-transparent !border-none !text-[#0E292F] !outline-none"
//               countrySelectorStyleProps={{ buttonClassName: "!bg-transparent !h-[30px]" }}
//             />
//           </div>

//           {/* Selects */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <select className="bg-white/50 border border-[#0E292F]/10 p-3 text-[#0E292F]/50 outline-none focus:border-[#0E292F]/40">
//               <option value="">Inquiry Type</option>
//               <option value="Buying">Buying</option>
//               <option value="Selling">Selling</option>
//             </select>
//             <select className="bg-white/50 border border-[#0E292F]/10 p-3 text-[#0E292F]/50 outline-none focus:border-[#0E292F]/40">
//               <option value="">Property Type</option>
//               <option value="Apartment">Apartment</option>
//               <option value="Duplex">Duplex</option>
//             </select>
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             disabled={isSubmitting}
//             className="w-full flex justify-center items-center gap-3 bg-[#0E292F] text-white py-4 font-medium hover:bg-[#0E292F]/90 transition-all duration-300 disabled:opacity-70 group"
//           >
//             {isSubmitting ? (
//               <Loader2 className="animate-spin" size={18} />
//             ) : (
//               <>
//                 Submit Inquiry
//                 <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
//               </>
//             )}
//           </button>
//         </form>
//       </motion.div>
//     </section>
//   );
// };

// export default Inquiry;


"use client";

import { useState } from "react";
import { ChevronDown, ArrowUpRight, Check } from "lucide-react";
import { PhoneInput } from "react-international-phone";
import { motion } from "framer-motion";
import "react-international-phone/style.css";
// Import background image from specified path
// import heroBg from "@/assets/hero.jpg"; 

const PropertyInquiry = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", inquiryType: "", propertyType: "" });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  return (
    <section 
      className="relative w-full min-h-[600px] flex items-center overflow-hidden bg-cover bg-center"
    //   style={{ backgroundImage: `url(${heroBg.src})` }}
    >
      {/* Global Glass Overlay */}
      <div className="absolute inset-0 z-[1] bg-[#0E292F]/70 backdrop-blur-[8px]" />

      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 flex flex-col md:flex-row items-center justify-between gap-12 py-20">
        {/* Left Side: Text */}
        <div className="flex-1 text-white space-y-6">
          <h2 className="text-4xl md:text-5xl font-serif">
            Have a property type <br />
            <span className="italic font-light opacity-80">in mind?</span>
          </h2>
          <p className="text-white/70 max-w-md leading-relaxed">
            Fill the form to get in touch with us. Connect with our lead consultants for a private viewing or detailed breakdown of investment opportunities.
          </p>
        </div>

        {/* Right Side: Form */}
        <div className="w-full max-w-md bg-white p-6 shadow-xl rounded-sm">
          <h1 className="text-lg font-serif text-black mb-6">Got Any Inquiry?</h1>
          <div className="space-y-4">
            <div>
              <label className="block text-[9px] font-bold uppercase tracking-[0.12em] text-black mb-1.5">Full Name *</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="w-full px-3 py-2.5 border border-[#0E292F]/12 text-[13px] text-[#0E292F] placeholder-[#0E292F]/25 focus:outline-none focus:border-[#3D7188] transition-colors bg-white"
              />
            </div>

            <div>
              <label className="block text-[9px] font-bold uppercase tracking-[0.12em] text-black mb-1.5">Phone Number *</label>
              <div className="border border-[#0E292F]/12">
                <PhoneInput
                  defaultCountry="ng"
                  value={form.phone}
                  onChange={(phone) => setForm((f) => ({ ...f, phone }))}
                  inputClassName="!w-full !border-none !text-[13px] !text-[#0E292F] !bg-white !rounded-none"
                  countrySelectorStyleProps={{
                    buttonClassName: "!bg-[#F5F5F5] !border-r !border-[#0E292F]/12 !rounded-none !h-[44px]",
                  }}
                />
              </div>
            </div>

            <div className="relative">
              <label className="block text-[9px] font-bold uppercase tracking-[0.12em] text-black mb-1.5">Inquiry Type *</label>
              <select
                name="inquiryType"
                value={form.inquiryType}
                onChange={handleChange}
                className="w-full px-3 py-2.5 border border-[#0E292F]/12 text-[13px] text-[#0E292F] focus:outline-none focus:border-[#3D7188] transition-colors bg-white appearance-none cursor-pointer"
              >
                <option value="">Select Inquiry</option>
                <option value="buy">Buy</option>
                <option value="sell">Sell</option>
              </select>
              <ChevronDown className="absolute right-3 top-[34px] w-4 h-4 text-[#0E292F]/40 pointer-events-none" />
            </div>

            <div className="relative">
              <label className="block text-[9px] font-bold uppercase tracking-[0.12em] text-black mb-1.5">Property Type *</label>
              <select
                name="propertyType"
                value={form.propertyType}
                onChange={handleChange}
                className="w-full px-3 py-2.5 border border-[#0E292F]/12 text-[13px] text-[#0E292F] focus:outline-none focus:border-[#3D7188] transition-colors bg-white appearance-none cursor-pointer"
              >
                <option value="">Select Property</option>
                <option value="apartment">Apartment</option>
                <option value="duplex">Duplex</option>
                <option value="terrace">Terrace</option>
                <option value="flat">Flat</option>
                <option value="land">Land</option>
              </select>
              <ChevronDown className="absolute right-3 top-[34px] w-4 h-4 text-[#0E292F]/40 pointer-events-none" />
            </div>

            <motion.button
              whileHover={{ 
                scale: 1.01, 
                backgroundColor: "#ffffff", 
                color: "#0E292F",
                borderColor: "#0E292F" 
              }}
              whileTap={{ scale: 0.99 }}
              onClick={() => setSubmitted(true)}
              disabled={submitting || submitted}
              className="w-full mt-2 inline-flex items-center justify-center gap-3 px-6 py-4 bg-[#0E292F] text-white border border-[#0E292F] text-[10px] font-bold tracking-[0.2em] uppercase cursor-pointer select-none disabled:opacity-60 transition-colors duration-300"
            >
              {submitted ? (
                <>
                  <Check size={13} strokeWidth={2.5} /> Inquiry Sent
                </>
              ) : (
                <>
                  Send Inquiry
                  <ArrowUpRight size={13} strokeWidth={2.5} />
                </>
              )}
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PropertyInquiry;