import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPublishedBlogs } from "@/lib/supabase/admin";
import { ArrowUpRight, FileText, Loader2 } from "lucide-react";

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
      <div className="border-b border-[#0E292F]/8 py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#3D7188] mb-3">
            Insights & Updates
          </p>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-[#0E292F] tracking-tight">
            The Vivar Blog
          </h1>
          <p className="mt-3 text-sm text-[#0E292F]/60 max-w-md">
            Market insights, investment guides, and real estate news from the
            Vivar Realty team.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12">
        {loading ? (
          <div className="flex items-center justify-center py-24">
            <Loader2 className="w-6 h-6 animate-spin text-neutral-400" />
          </div>
        ) : blogs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-neutral-400">
            <FileText className="w-12 h-12 mb-4 opacity-30" />
            <p className="text-sm font-medium">No posts published yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <article
                key={blog.id}
                onClick={() => navigate(`/blog/${blog.slug}`)}
                className="group cursor-pointer bg-white border border-[#0E292F]/8 rounded-2xl overflow-hidden hover:shadow-md transition-all duration-300"
              >
                {blog.image_url ? (
                  <div className="h-48 overflow-hidden bg-neutral-100">
                    <img
                      src={blog.image_url}
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                    />
                  </div>
                ) : (
                  <div className="h-48 bg-[#0E292F]/5 flex items-center justify-center">
                    <FileText className="w-10 h-10 text-[#0E292F]/20" />
                  </div>
                )}
                <div className="p-5">
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#3D7188] mb-2">
                    {new Date(blog.created_at).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                  <h2 className="font-serif text-[17px] font-bold text-[#0E292F] leading-snug mb-2 line-clamp-2">
                    {blog.title}
                  </h2>
                  <p className="text-[13px] text-[#0E292F]/60 leading-relaxed line-clamp-3">
                    {blog.body}
                  </p>
                  <div className="mt-4 inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.1em] text-[#0E292F] group-hover:text-[#3D7188] transition-colors">
                    Read more <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
