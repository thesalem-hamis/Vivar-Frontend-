// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { getBlogBySlug, getPublishedBlogs } from "@/lib/supabase/admin";
// import {
//   ArrowLeft,
//   ArrowRight,
//   ArrowUpRight,
//   ChevronLeft,
//   Loader2,
// } from "lucide-react";
// import DOMPurify from "dompurify";
// import { Helmet } from "react-helmet-async";
// import { motion } from "framer-motion";
// import Footer from "@/components/layout/Footer";
// import PageNavbar from "@/components/layout/PageNavbar";

// export default function BlogDetailPage() {
//   const { slug } = useParams<{ slug: string }>();
//   const [blogs, setBlogs] = useState<any[]>([]);
//   const navigate = useNavigate();
//   const [blog, setBlog] = useState<any>(null);
//   const [loading, setLoading] = useState(true);
//   const [mLoading, setMLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     if (!slug) return;
//     getBlogBySlug(slug)
//       .then(setBlog)
//       .catch((e) => setError(e.message || "Post not found"))
//       .finally(() => setLoading(false));
//   }, [slug]);

//   useEffect(() => {
//     getPublishedBlogs()
//       .then(setBlogs)
//       .finally(() => setMLoading(false));
//   }, []);

//   const cleanHtml = DOMPurify.sanitize(blog?.body_html, {
//     ADD_TAGS: ["iframe"],
//   });

//   if (loading)
//     return (
//       <div className="min-h-screen bg-white flex items-center justify-center">
//         <Loader2 className="w-6 h-6 animate-spin text-neutral-400" />
//       </div>
//     );

//   if (error || !blog)
//     return (
//       <div className="min-h-screen bg-white flex items-center justify-center px-6">
//         <div className="text-center max-w-sm">
//           <h2 className="font-serif text-2xl font-bold text-[#0E292F] mb-2">
//             Post not found
//           </h2>
//           <p className="text-sm text-neutral-500 mb-6">{error}</p>
//           <button
//             onClick={() => navigate("/blog")}
//             className="inline-flex items-center gap-2 text-sm font-semibold text-[#0E292F] underline underline-offset-2"
//           >
//             <ArrowLeft className="w-4 h-4" /> Back to Blog
//           </button>
//         </div>
//       </div>
//     );

//   return (
//     <>
//       <Helmet>
//         <title>
//           {blog?.title ? `${blog.title} | Vivar Realtors` : "Loading Blog..."}
//         </title>
//         <meta
//           name="description"
//           content={blog?.description || "Read our latest real estate updates."}
//         />
//         <meta name="keyword" content={blog?.keyword} />
//         <meta property="og:title" content={blog?.title} />
//         <meta property="og:image" content={blog?.image_url} />
//       </Helmet>
//       <div className="min-h-screen bg-white text-[#0E292F] font-sans">
//         <PageNavbar />
//         <section className="relative w-full h-[60vh] min-h-[440px] max-h-[600px] bg-[#0E292F] overflow-hidden flex items-end">
//           {/* Core Widescreen Corporate Image Canvas */}
//           <img
//             src={blog?.image_url}
//             alt="Vivar Realty Corporate Executive Team Portfolio"
//             className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none z-0"
//           />

//           {/* Dynamic Shadow Veil for Clean Typography Legibility */}
//           <div className="absolute inset-0 bg-black/40 mix-blend-multiply pointer-events-none z-0" />
//           <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none z-0" />

//           {/* ── LOWER HERO TEXT TRACK ── */}
//           <div className="relative z-10 w-full max-w-[90rem] mx-auto px-6 sm:px-10 lg:px-16 pb-12 sm:pb-16 flex flex-col items-start text-white">
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
//               className="max-w-4xl"
//             >
//               {/* Header Content */}
//               <h1 className="font-serif font-light text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight mb-4 drop-shadow-md">
//                 {blog.title}
//               </h1>

//               {/* Short Subheadline */}
//               <p className="text-white/80 font-sans font-light text-sm sm:text-base md:text-lg leading-relaxed max-w-3xl drop-shadow-sm">
//                 {blog.sub_title}
//               </p>
//               <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#3D7188] mb-4">
//                 {new Date(blog.created_at).toLocaleDateString("en-US", {
//                   month: "long",
//                   day: "numeric",
//                   year: "numeric",
//                 })}
//               </p>
//             </motion.div>
//           </div>
//         </section>
//         <div className="px-6 md:px-16 py-5">
//           <a
//             href="/blog"
//             className="flex items-center text-blue-500 hover:text-blue-700"
//           >
//             <ChevronLeft className="size-5" />
//             Back to Blog
//           </a>
//         </div>
//         <div className="grid lg:grid-cols-3 mx-auto px-6 md:px-16 py-12">
//           <article className="max-w-3xl lg:col-span-2">
//             <div
//               className="text-[15px] leading-relaxed text-[#0E292F]/80 whitespace-pre-line"
//               dangerouslySetInnerHTML={{ __html: cleanHtml }}
//             />

//             {blog.cta_label && blog.cta_url && (
//               <div className="mt-10 pt-8 border-t border-[#0E292F]/8">
//                 <a
//                   href={blog.cta_url}
//                   target="_blank"
//                   rel="noreferrer"
//                   className="inline-flex items-center justify-between pl-5 pr-1.5 py-1.5 rounded-[8px] bg-[#0E292F] text-white hover:bg-white hover:text-[#0E292F] border border-[#0E292F] transition-all duration-300 group font-sans text-[10px] font-bold tracking-widest uppercase"
//                 >
//                   <span className="pr-3">{blog.cta_label}</span>
//                   <div className="flex items-center justify-center w-7 h-7 rounded-[6px] bg-white text-[#0E292F] group-hover:bg-[#0E292F] group-hover:text-white transition-all duration-300">
//                     <ArrowUpRight size={13} strokeWidth={2.5} />
//                   </div>
//                 </a>
//               </div>
//             )}
//           </article>
//           <article className="grid gap-6 lg:gap-8">
//             <h3 className="font-semibold text-3xl">You might also Like</h3>
//             {mLoading ? (
//               <>
//                 {[1, 2, 3].map((idx) => (
//                   <div key={idx} className="flex flex-col gap-5 animate-pulse">
//                     {/* Image & Category Badge Skeleton */}
//                     <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-200">
//                       {/* Category Badge Placeholder */}
//                       <div className="absolute top-4 left-4 h-6 w-20 rounded-[6px] bg-slate-300/80" />
//                       {/* Content Skeleton */}
//                       <div className="flex flex-col gap-3">
//                         {/* Date Placeholder */}
//                         <div className="h-3 w-24 rounded bg-slate-200" />

//                         {/* Title Placeholders (2 lines for realism) */}
//                         <div className="flex flex-col gap-2">
//                           <div className="h-5 w-11/12 rounded bg-slate-200" />
//                           <div className="h-5 w-2/3 rounded bg-slate-200" />
//                         </div>

//                         {/* Teaser Paragraph Placeholders (3 lines) */}
//                         <div className="flex flex-col gap-1.5 mt-1">
//                           <div className="h-3.5 w-full rounded bg-slate-100" />
//                           <div className="h-3.5 w-full rounded bg-slate-100" />
//                           <div className="h-3.5 w-4/5 rounded bg-slate-100" />
//                         </div>

//                         {/* "Read More" Link Placeholder */}
//                         <div className="h-3.5 w-28 rounded bg-slate-200 mt-2" />
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </>
//             ) : (
//               <>
//                 {blogs.slice(0, 4).map((a, idx) => {
//                   const cleanHtml = DOMPurify.sanitize(a.body_html, {
//                     FORBID_TAGS: ["img"],
//                   });
//                   const plainText = cleanHtml.replace(/<[^>]*>/g, " ");

//                   const first50Words = plainText
//                     .trim()
//                     .split(/\s+/)
//                     .slice(0, 50)
//                     .join(" ");
//                   const teaserText =
//                     plainText.split(/\s+/).length > 50
//                       ? `${first50Words}...`
//                       : first50Words;
//                   return (
//                     <motion.a
//                       key={a.title}
//                       href={`/blog/${a.slug}`}
//                       initial="hidden"
//                       whileInView="visible"
//                       viewport={{ once: true, margin: "-60px" }}
//                       // variants={fadeUp}
//                       transition={{ delay: idx * 0.1 }}
//                       className="group relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-slate-900 shadow-sm hover:shadow-lg transition-shadow duration-300"
//                     >
//                       {/* 1. The Background Image */}
//                       <img
//                         src={a.image_url}
//                         alt={a.title}
//                         className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
//                         loading="lazy"
//                       />

//                       {/* 2. The Gradient Overlay (Crucial for text legibility) */}
//                       <div className="absolute inset-0 bg-gradient-to-t from-[#0E292F]/90 via-[#0E292F]/40 to-transparent transition-opacity duration-300 group-hover:from-[#0E292F]/95" />

//                       {/* 3. Category Badge (Top Left) */}
//                       <span className="absolute top-4 left-4 px-3 py-1.5 rounded-[6px] text-[10px] font-bold tracking-[0.15em] uppercase bg-white text-[#0E292F] shadow-xs">
//                         {a.category}
//                       </span>

//                       {/* 4. Text Content Wrapper (Overlayed on bottom) */}
//                       <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col gap-2.5 z-10">
//                         {/* Date */}
//                         <span className="text-[10px] font-bold tracking-[0.2em] text-[#3D7188] uppercase">
//                           {new Date(a.created_at).toLocaleDateString("en-US", {
//                             month: "long",
//                             day: "numeric",
//                             year: "numeric",
//                           })}
//                         </span>

//                         {/* Title */}
//                         <h3 className="text-xl font-semibold text-white tracking-tight leading-snug group-hover:text-slate-200 transition-colors duration-300 line-clamp-2">
//                           {a.title}
//                         </h3>

//                         {/* Teaser Paragraph */}
//                         <p className="text-xs text-white/70 font-light leading-relaxed line-clamp-2">
//                           {teaserText}
//                         </p>

//                         {/* Read More Link */}
//                         <span className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-[0.2em] uppercase text-white mt-1.5 group-hover:text-[#3D7188] transition-colors duration-300">
//                           Read More
//                           <ArrowRight
//                             size={12}
//                             className="transition-transform duration-300 group-hover:translate-x-1"
//                           />
//                         </span>
//                       </div>
//                     </motion.a>
//                   );
//                 })}
//               </>
//             )}
//           </article>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// }


"use client";

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getBlogBySlug } from "@/lib/supabase/admin";
import { ArrowLeft } from "lucide-react";
import { FaFacebook, FaTwitter, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import DOMPurify from "dompurify";
import Footer from "@/components/layout/Footer";
import PageNavbar from "@/components/layout/PageNavbar";
// Importing the constant fallback logo
import mainLogo from "@/assets/logo_main.png"; 

const BlogDetailSkeleton = () => (
  <div className="max-w-3xl mx-auto px-6 py-20 animate-pulse">
    <div className="h-10 w-3/4 bg-neutral-200 rounded-lg mb-8" />
    <div className="flex items-center gap-4 mb-12">
      <div className="w-12 h-12 rounded-full bg-neutral-200" />
      <div className="space-y-2">
        <div className="h-4 w-32 bg-neutral-200 rounded" />
        <div className="h-3 w-24 bg-neutral-100 rounded" />
      </div>
    </div>
    <div className="w-full aspect-[2/1] bg-neutral-200 rounded-2xl mb-12" />
    <div className="space-y-4">
      <div className="h-4 w-full bg-neutral-100 rounded" />
      <div className="h-4 w-full bg-neutral-100 rounded" />
      <div className="h-4 w-5/6 bg-neutral-100 rounded" />
    </div>
  </div>
);

export default function BlogDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [blog, setBlog] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    getBlogBySlug(slug)
      .then(setBlog)
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <BlogDetailSkeleton />;
  if (!blog) return <div className="text-center py-20">Post not found</div>;

  const cleanHtml = DOMPurify.sanitize(blog?.body_html);

  return (
    <div className="min-h-screen bg-white text-[#0E292F]">
      <PageNavbar />
      
      <main className="max-w-3xl mx-auto px-6 pt-30 pb-24">
        {/* Title & Metadata */}
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.1] mb-10 text-neutral-900">
          {blog.title}
        </h1>

        <div className="flex items-center justify-between mb-12 border-b border-neutral-100 pb-8">
          <div className="flex items-center gap-4">
            <img src={mainLogo} className="w-12 h-12 rounded-full bg-neutral-100 object-cover" alt={blog.author_name} />
            <div>
              <p className="text-sm font-bold text-neutral-900">{blog.author_name || "Vivar Realty"}</p>
              <p className="text-xs text-neutral-500">{new Date(blog.created_at).toLocaleDateString(undefined, { dateStyle: 'long' })}</p>
            </div>
          </div>
          
          <div className="flex gap-3">
            {[FaFacebook, FaTwitter, FaLinkedin, FaWhatsapp].map((Icon, i) => (
              <button key={i} className="p-2.5 rounded-full bg-neutral-50 text-neutral-600 hover:bg-[#0E292F] hover:text-white transition-all">
                <Icon size={16} />
              </button>
            ))}
          </div>
        </div>

        {/* Hero Image - Uses constant logo if blog.image_url is missing */}
        <div className="w-full aspect-[2/1] rounded-3xl overflow-hidden mb-12 shadow-xl bg-neutral-100 border border-neutral-200">
          <img 
            src={blog.image_url || mainLogo} 
            alt={blog.title} 
            className="w-full h-full object-cover" 
          />
        </div>

        {/* Content - Increased spacing and improved legibility */}
        <article 
          className="prose prose-neutral prose-lg max-w-none text-[#0E292F]/90 prose-headings:font-bold prose-a:text-[#3D7188]"
          dangerouslySetInnerHTML={{ __html: cleanHtml }} 
        />

        <div className="mt-20 pt-10 border-t border-neutral-100">
          <button 
            onClick={() => navigate("/blog")}
            className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-[#3D7188] hover:translate-x-[-5px] transition-transform"
          >
            <ArrowLeft size={16} /> Back to Blog
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
}