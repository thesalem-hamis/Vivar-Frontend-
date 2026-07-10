"use client";

import { useState } from "react";
import { ChevronDown, ArrowUpRight, Check, Loader2 } from "lucide-react";
import { PhoneInput } from "react-international-phone";
import { motion } from "framer-motion";
import { submitEnquiry } from "@/lib/supabase/admin";
import "react-international-phone/style.css";

const PROPERTY_TYPES = [
  "Apartment",
  "Duplex",
  "Terrace",
  "Detached House",
  "Land",
  "Commercial",
  "Short Let",
];

const PropertyInquiry = () => {
  const [form, setForm] = useState({ 
    name: "", 
    phone: "", 
    message: "",
    property_type: "" 
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    // Basic validation
    if (!form.name || !form.phone || !form.message) {
      setError("Please fill in all required fields");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      await submitEnquiry({
        name: form.name,
        phone: form.phone,
        message: form.message,
        property_type: form.property_type || undefined,
      });

      setSubmitted(true);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setSubmitted(false);
        setForm({ name: "", phone: "", message: "", property_type: "" });
      }, 3000);
    } catch (err: any) {
      console.error("Error submitting enquiry:", err);
      setError(err.message || "Failed to submit enquiry. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section 
      className="relative w-full min-h-[600px] flex items-center overflow-hidden bg-cover bg-center bg-gray-900"
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
          
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-sm">
              <p className="text-xs text-red-600">{error}</p>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-[9px] font-bold uppercase tracking-[0.12em] text-black mb-1.5">
                Full Name *
              </label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="w-full px-3 py-2.5 border border-[#0E292F]/12 text-[13px] text-[#0E292F] placeholder-[#0E292F]/25 focus:outline-none focus:border-[#3D7188] transition-colors bg-white"
              />
            </div>

            <div>
              <label className="block text-[9px] font-bold uppercase tracking-[0.12em] text-black mb-1.5">
                Phone Number *
              </label>
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

            <div>
              <label className="block text-[9px] font-bold uppercase tracking-[0.12em] text-black mb-1.5">
                Property Type
              </label>
              <div className="relative">
                <select
                  name="property_type"
                  value={form.property_type}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 border border-[#0E292F]/12 text-[13px] text-[#0E292F] focus:outline-none focus:border-[#3D7188] transition-colors bg-white appearance-none cursor-pointer"
                >
                  <option value="">Select Property Type</option>
                  {PROPERTY_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#0E292F]/40 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-[9px] font-bold uppercase tracking-[0.12em] text-black mb-1.5">
                Message *
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={4}
                placeholder="Tell us what you're looking for..."
                className="w-full px-3 py-2.5 border border-[#0E292F]/12 text-[13px] text-[#0E292F] placeholder-[#0E292F]/25 focus:outline-none focus:border-[#3D7188] transition-colors bg-white resize-none"
              />
            </div>

            <motion.button
              whileHover={{ 
                scale: submitting ? 1 : 1.01, 
                backgroundColor: submitting ? "#0E292F" : "#ffffff", 
                color: submitting ? "#ffffff" : "#0E292F",
                borderColor: "#0E292F" 
              }}
              whileTap={{ scale: submitting ? 1 : 0.99 }}
              onClick={handleSubmit}
              disabled={submitting || submitted}
              className="w-full mt-2 inline-flex items-center justify-center gap-3 px-6 py-4 bg-[#0E292F] text-white border border-[#0E292F] text-[10px] font-bold tracking-[0.2em] uppercase cursor-pointer select-none disabled:opacity-60 transition-colors duration-300"
            >
              {submitting ? (
                <>
                  <Loader2 size={13} strokeWidth={2.5} className="animate-spin" /> 
                  Sending...
                </>
              ) : submitted ? (
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

            {submitted && (
              <p className="text-xs text-green-600 text-center mt-2">
                Thank you! We'll get back to you shortly.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PropertyInquiry;