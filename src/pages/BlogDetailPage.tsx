import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getBlogBySlug } from "@/lib/supabase/admin";
import { ArrowLeft, ArrowUpRight, Loader2 } from "lucide-react";
import DOMPurify from "dompurify";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";

export default function BlogDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [blog, setBlog] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;
    getBlogBySlug(slug)
      .then(setBlog)
      .catch((e) => setError(e.message || "Post not found"))
      .finally(() => setLoading(false));
  }, [slug]);

  const cleanHtml = DOMPurify.sanitize(blog?.body_html, {
    ADD_TAGS: ["iframe"],
  });

  if (loading)
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-neutral-400" />
      </div>
    );

  if (error || !blog)
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-6">
        <div className="text-center max-w-sm">
          <h2 className="font-serif text-2xl font-bold text-[#0E292F] mb-2">
            Post not found
          </h2>
          <p className="text-sm text-neutral-500 mb-6">{error}</p>
          <button
            onClick={() => navigate("/blog")}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#0E292F] underline underline-offset-2"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </button>
        </div>
      </div>
    );

  return (
    <>
      <Helmet>
        <title>
          {blog?.title ? `${blog.title} | Vivar Realtors` : "Loading Blog..."}
        </title>
        <meta
          name="description"
          content={blog?.description || "Read our latest real estate updates."}
        />
        <meta name="keyword" content={blog?.keyword} />
        <meta property="og:title" content={blog?.title} />
        <meta property="og:image" content={blog?.image_url} />
      </Helmet>
      <div className="min-h-screen bg-white text-[#0E292F] font-sans">
        <section className="relative w-full h-[60vh] min-h-[440px] max-h-[600px] bg-[#0E292F] overflow-hidden flex items-end">
          {/* Core Widescreen Corporate Image Canvas */}
          <img
            src={blog?.image_url}
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
                {blog.title}
              </h1>

              {/* Short Subheadline */}
              <p className="text-white/80 font-sans font-light text-sm sm:text-base md:text-lg leading-relaxed max-w-3xl drop-shadow-sm">
                Description is written here.
              </p>
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#3D7188] mb-4">
                {new Date(blog.created_at).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </motion.div>
          </div>
        </section>

        <article className="max-w-3xl mx-auto px-6 py-12">
          <div
            className="text-[15px] leading-relaxed text-[#0E292F]/80 whitespace-pre-line"
            dangerouslySetInnerHTML={{ __html: cleanHtml }}
          />

          {blog.cta_label && blog.cta_url && (
            <div className="mt-10 pt-8 border-t border-[#0E292F]/8">
              <a
                href={blog.cta_url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-between pl-5 pr-1.5 py-1.5 rounded-[8px] bg-[#0E292F] text-white hover:bg-white hover:text-[#0E292F] border border-[#0E292F] transition-all duration-300 group font-sans text-[10px] font-bold tracking-widest uppercase"
              >
                <span className="pr-3">{blog.cta_label}</span>
                <div className="flex items-center justify-center w-7 h-7 rounded-[6px] bg-white text-[#0E292F] group-hover:bg-[#0E292F] group-hover:text-white transition-all duration-300">
                  <ArrowUpRight size={13} strokeWidth={2.5} />
                </div>
              </a>
            </div>
          )}
        </article>
      </div>
    </>
  );
}
