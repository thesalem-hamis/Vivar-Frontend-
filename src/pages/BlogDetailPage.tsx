import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getBlogBySlug } from "@/lib/supabase/admin";
import { ArrowLeft, ArrowUpRight, Loader2 } from "lucide-react";

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
    <div className="min-h-screen bg-white text-[#0E292F] font-sans">
      {/* Top bar */}
      <div className="border-b border-[#0E292F]/8 sticky top-0 bg-white z-30">
        <div className="max-w-3xl mx-auto px-6 h-12 flex items-center">
          <button
            onClick={() => navigate("/blog")}
            className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.08em] text-[#0E292F]/60 hover:text-[#0E292F] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> All Posts
          </button>
        </div>
      </div>

      <article className="max-w-3xl mx-auto px-6 py-12">
        <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#3D7188] mb-4">
          {new Date(blog.created_at).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </p>

        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#0E292F] tracking-tight leading-snug mb-6">
          {blog.title}
        </h1>

        {blog.image_url && (
          <div className="rounded-2xl overflow-hidden mb-8 border border-[#0E292F]/6">
            <img
              src={blog.image_url}
              alt={blog.title}
              className="w-full max-h-[420px] object-cover"
            />
          </div>
        )}

        <div className="text-[15px] leading-relaxed text-[#0E292F]/80 whitespace-pre-line">
          {blog.body}
        </div>

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
  );
}
