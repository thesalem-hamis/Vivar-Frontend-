import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPublishedBlogs } from "@/lib/supabase/admin";
import { ArrowRight, ArrowUpRight, FileText, Loader2 } from "lucide-react";
import DOMPurify from "dompurify";
import { motion } from "framer-motion";
import TEAM_HERO_IMAGE from "@/assets/ikoyi-main.jpg";
import Footer from "@/components/layout/Footer";
import PageNavbar from "@/components/layout/PageNavbar";

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getPublishedBlogs()
      .then(setBlogs)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-white text-[#0E292F] font-sans">
      {/* Hero */}
      <PageNavbar />
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
              The Vivar Blog
            </h1>

            {/* Short Subheadline */}
            <p className="text-white/80 font-sans font-light text-sm sm:text-base md:text-lg leading-relaxed max-w-3xl drop-shadow-sm">
              Market insights, investment guides, and real estate news from the
              Vivar Realty team.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {[1, 2, 3].map((idx) => (
              <div key={idx} className="flex flex-col gap-5 animate-pulse">
                {/* Image & Category Badge Skeleton */}
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-200">
                  {/* Category Badge Placeholder */}
                  <div className="absolute top-4 left-4 h-6 w-20 rounded-[6px] bg-slate-300/80" />
                </div>

                {/* Content Skeleton */}
                <div className="flex flex-col gap-3">
                  {/* Date Placeholder */}
                  <div className="h-3 w-24 rounded bg-slate-200" />

                  {/* Title Placeholders (2 lines for realism) */}
                  <div className="flex flex-col gap-2">
                    <div className="h-5 w-11/12 rounded bg-slate-200" />
                    <div className="h-5 w-2/3 rounded bg-slate-200" />
                  </div>

                  {/* Teaser Paragraph Placeholders (3 lines) */}
                  <div className="flex flex-col gap-1.5 mt-1">
                    <div className="h-3.5 w-full rounded bg-slate-100" />
                    <div className="h-3.5 w-full rounded bg-slate-100" />
                    <div className="h-3.5 w-4/5 rounded bg-slate-100" />
                  </div>

                  {/* "Read More" Link Placeholder */}
                  <div className="h-3.5 w-28 rounded bg-slate-200 mt-2" />
                </div>
              </div>
            ))}
          </div>
        ) : blogs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-neutral-400">
            <FileText className="w-12 h-12 mb-4 opacity-30" />
            <p className="text-sm font-medium">No posts published yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {blogs.slice(0, 4).map((a, idx) => {
              const cleanHtml = DOMPurify.sanitize(a.body_html, {
                FORBID_TAGS: ["img"],
              });
              const plainText = cleanHtml.replace(/<[^>]*>/g, " ");

              const first50Words = plainText
                .trim()
                .split(/\s+/)
                .slice(0, 50)
                .join(" ");
              const teaserText =
                plainText.split(/\s+/).length > 50
                  ? `${first50Words}...`
                  : first50Words;
              return (
                <motion.a
                  key={a.title}
                  href={`/blog/${a.slug}`}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-60px" }}
                  // variants={fadeUp}
                  transition={{ delay: idx * 0.1 }}
                  className="group flex flex-col gap-5"
                >
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                    <img
                      src={a.image_url}
                      alt={a.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                      loading="lazy"
                    />
                    <span
                      className="absolute top-4 left-4 px-3 py-1.5 rounded-[6px] text-[10px] font-bold tracking-[0.15em] uppercase
                  bg-white/90 text-[#0E292F]"
                    >
                      {a.category}
                    </span>
                  </div>

                  <div className="flex flex-col gap-3">
                    <span className="text-[11px] font-bold tracking-[0.2em] text-[#3D7188] uppercase">
                      {new Date(a.created_at).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                    <h3 className="text-xl font-semibold text-[#0E292F] tracking-tight leading-snug group-hover:text-[#3D7188] transition-colors duration-300">
                      {a.title}
                    </h3>
                    <p className="text-sm text-[#0E292F]/55 font-light leading-relaxed">
                      {teaserText}
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-bold tracking-[0.2em] uppercase text-[#0E292F] mt-1">
                      Read More
                      <ArrowRight
                        size={13}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </span>
                  </div>
                </motion.a>
              );
            })}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
