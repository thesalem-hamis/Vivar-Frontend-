import { useState } from "react";
import { submitEnquiry } from "@/lib/supabase/admin";
import { motion } from "framer-motion";
import { ArrowUpRight, CheckCircle2, Loader2 } from "lucide-react";

const PROPERTY_TYPES = [
  "Apartment",
  "Duplex",
  "Terrace",
  "Detached House",
  "Land",
  "Commercial",
  "Short Let",
];

const inputCls =
  "w-full px-4 py-3 border border-[#0E292F]/12 text-[13px] text-[#0E292F] placeholder-[#0E292F]/30 focus:outline-none focus:border-[#3D7188] focus:ring-1 focus:ring-[#3D7188]/15 transition-colors bg-white";

export default function EnquiryPage() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    message: "",
    property_type: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      await submitEnquiry(form);
      setDone(true);
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#0E292F] font-sans">
      {/* Hero */}
      <div className="border-b border-[#0E292F]/8 py-16 px-6">
        <div className="max-w-2xl mx-auto">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#3D7188] mb-3">
            Get in Touch
          </p>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-[#0E292F] tracking-tight">
            Quick Enquiry
          </h1>
          <p className="mt-3 text-sm text-[#0E292F]/60 max-w-md">
            Have a question or need a consultation? Fill in the form below and
            our team will get back to you shortly.
          </p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-12">
        {done ? (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center text-center py-16 gap-4"
          >
            <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center">
              <CheckCircle2 className="w-7 h-7 text-green-600" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-[#0E292F]">
              Enquiry received!
            </h2>
            <p className="text-sm text-[#0E292F]/60 max-w-sm">
              Thank you for reaching out. A member of the Vivar Realty team will
              contact you within 24 hours.
            </p>
            <button
              onClick={() => {
                setDone(false);
                setForm({ name: "", phone: "", message: "", property_type: "" });
              }}
              className="mt-2 text-xs font-bold uppercase tracking-widest text-[#3D7188] underline underline-offset-2"
            >
              Submit another
            </button>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-[9px] font-bold uppercase tracking-[0.14em] text-[#0E292F]/60 mb-1.5">
                Full Name *
              </label>
              <input
                required
                value={form.name}
                onChange={(e) =>
                  setForm((f) => ({ ...f, name: e.target.value }))
                }
                placeholder="Your full name"
                className={inputCls}
              />
            </div>

            <div>
              <label className="block text-[9px] font-bold uppercase tracking-[0.14em] text-[#0E292F]/60 mb-1.5">
                Phone Number *
              </label>
              <input
                required
                type="tel"
                value={form.phone}
                onChange={(e) =>
                  setForm((f) => ({ ...f, phone: e.target.value }))
                }
                placeholder="+234 800 000 0000"
                className={inputCls}
              />
            </div>

            <div>
              <label className="block text-[9px] font-bold uppercase tracking-[0.14em] text-[#0E292F]/60 mb-1.5">
                Property Type
              </label>
              <select
                value={form.property_type}
                onChange={(e) =>
                  setForm((f) => ({ ...f, property_type: e.target.value }))
                }
                className={`${inputCls} appearance-none`}
              >
                <option value="">Select a property type</option>
                {PROPERTY_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[9px] font-bold uppercase tracking-[0.14em] text-[#0E292F]/60 mb-1.5">
                Message *
              </label>
              <textarea
                required
                rows={5}
                value={form.message}
                onChange={(e) =>
                  setForm((f) => ({ ...f, message: e.target.value }))
                }
                placeholder="Tell us what you're looking for…"
                className={`${inputCls} resize-none`}
              />
            </div>

            {error && (
              <p className="text-sm text-red-600 font-medium">{error}</p>
            )}

            <motion.button
              type="submit"
              disabled={submitting}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center justify-between w-full pl-5 pr-1.5 py-1.5 rounded-[8px] bg-[#0E292F] text-white hover:bg-white hover:text-[#0E292F] border border-[#0E292F] transition-all duration-300 group font-sans text-[10px] font-bold tracking-widest uppercase disabled:opacity-50"
            >
              <span className="w-full text-center pr-2">
                {submitting ? "Sending…" : "Send Enquiry"}
              </span>
              <div className="flex items-center justify-center w-7 h-7 rounded-[6px] bg-white text-[#0E292F] group-hover:bg-[#0E292F] group-hover:text-white transition-all duration-300 shrink-0">
                {submitting ? (
                  <Loader2 className="w-[13px] h-[13px] animate-spin" />
                ) : (
                  <ArrowUpRight size={13} strokeWidth={2.5} />
                )}
              </div>
            </motion.button>
          </form>
        )}
      </div>
    </div>
  );
}
