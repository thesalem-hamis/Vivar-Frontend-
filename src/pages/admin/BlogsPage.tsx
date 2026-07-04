import { useEffect, useState, useCallback, useRef, useMemo } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import LinkExtension from "@tiptap/extension-link";
import ImageExtension from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import {
  getAllBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
  uploadBlogImage,
} from "@/lib/supabase/admin";
import {
  Plus,
  Pencil,
  Trash2,
  Eye,
  X,
  Loader2,
  FileText,
  ImagePlus,
  Search,
} from "lucide-react";
import EditorToolbar from "@/components/admin/EditToolbar";

const inputCls =
  "w-full px-3 py-2.5 border border-neutral-200 rounded-lg text-sm text-neutral-800 placeholder-neutral-400 focus:outline-none focus:border-[#0E292F] focus:ring-1 focus:ring-[#0E292F]/10 bg-white";

const labelCls =
  "block text-xs font-semibold text-neutral-600 uppercase tracking-wider mb-1.5";

const emptyForm = {
  title: "",
  slug: "",
  body_html: "",
  image_url: "",
  cta_label: "",
  cta_url: "",
  meta_title: "",
  meta_description: "",
  focus_keyword: "",
};

const slugify = (s: string) =>
  s
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

// Rough reading-time / word-count estimate from HTML string
function textStats(html: string) {
  const text = html
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  const words = text ? text.split(" ").length : 0;
  const minutes = Math.max(1, Math.round(words / 200));
  return { words, minutes };
}

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState<"content" | "seo">("content");
  const [form, setForm] = useState({ ...emptyForm });
  const [slugTouched, setSlugTouched] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingInlineImage, setUploadingInlineImage] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<any | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const showToast = (msg: string, ok = true) => {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 3000);
  };

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [2, 3, 4] } }),
      Underline,
      LinkExtension.configure({ openOnClick: false, autolink: true }),
      ImageExtension.configure({
        HTMLAttributes: { class: "rounded-lg max-w-full h-auto my-4" },
      }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Placeholder.configure({ placeholder: "Start writing your post…" }),
    ],
    content: "",
    editorProps: {
      attributes: {
        class:
          "prose prose-neutral max-w-none px-4 py-4 min-h-[320px] focus:outline-none prose-headings:text-[#0E292F] prose-a:text-[#3D7188]",
      },
    },
    onUpdate: ({ editor }) => {
      setForm((f) => ({ ...f, body_html: editor.getHTML() }));
    },
  });

  const stats = useMemo(() => textStats(form.body_html), [form.body_html]);

  const fetchBlogs = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getAllBlogs();
      setBlogs(data);
    } catch {
      showToast("Failed to load blogs", false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  const resetFormState = (values: typeof emptyForm) => {
    setForm(values);
    editor?.commands.setContent(values.body_html || "");
  };

  const openCreate = () => {
    setEditId(null);
    setSlugTouched(false);
    setActiveTab("content");
    resetFormState({ ...emptyForm });
    setImageFile(null);
    setImagePreview("");
    setShowModal(true);
  };

  const openEdit = (blog: any) => {
    setEditId(blog.id);
    setSlugTouched(true);
    setActiveTab("content");
    resetFormState({
      title: blog.title || "",
      slug: blog.slug || slugify(blog.title || ""),
      body_html: blog.body_html || blog.body || "",
      image_url: blog.image_url || "",
      cta_label: blog.cta_label || "",
      cta_url: blog.cta_url || "",
      meta_title: blog.meta_title || "",
      meta_description: blog.meta_description || "",
      focus_keyword: blog.focus_keyword || "",
    });
    setImageFile(null);
    setImagePreview(blog.image_url || "");
    setShowModal(true);
  };

  const handleTitleChange = (value: string) => {
    setForm((f) => ({
      ...f,
      title: value,
      slug: slugTouched ? f.slug : slugify(value),
    }));
  };

  const handleImagePick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  // Upload an image chosen from the toolbar and insert it into the doc at the cursor
  const handleInsertInlineImage = async (file: File) => {
    if (!editor) return;
    try {
      setUploadingInlineImage(true);
      const url = await uploadBlogImage(file);
      editor.chain().focus().setImage({ src: url, alt: "" }).run();
    } catch {
      showToast("Image upload failed", false);
    } finally {
      setUploadingInlineImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!editor || editor.isEmpty) {
      showToast("Post body can't be empty", false);
      setActiveTab("content");
      return;
    }

    setSubmitting(true);
    try {
      let image_url = form.image_url;

      if (imageFile) {
        setUploadingImage(true);
        image_url = await uploadBlogImage(imageFile);
        setUploadingImage(false);
      }

      const payload = {
        title: form.title,
        slug: form.slug || slugify(form.title),
        body_html: editor.getHTML(), // <-- sent to backend as an HTML string
        image_url,
        cta_label: form.cta_label,
        cta_url: form.cta_url,
        meta_title: form.meta_title || form.title,
        meta_description: form.meta_description,
        focus_keyword: form.focus_keyword,
        reading_time_minutes: stats.minutes,
        published: true,
      };

      if (editId) {
        const updated = await updateBlog(editId, payload);
        setBlogs((prev) => prev.map((b) => (b.id === editId ? updated : b)));
        showToast("Blog updated");
      } else {
        const created = await createBlog({
          ...payload,
          body: payload.body_html,
        });
        setBlogs((prev) => [created, ...prev]);
        showToast("Blog published");
      }
      setShowModal(false);
    } catch (err: any) {
      setUploadingImage(false);
      showToast(err.message || "Failed to save blog", false);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await deleteBlog(deleteTarget.id);
      setBlogs((prev) => prev.filter((b) => b.id !== deleteTarget.id));
      showToast("Blog deleted");
      setDeleteTarget(null);
    } catch {
      showToast("Failed to delete", false);
    } finally {
      setDeleting(false);
    }
  };

  const metaTitleLen = (form.meta_title || form.title).length;
  const metaDescLen = form.meta_description.length;

  return (
    <div className="space-y-6 font-sans">
      {toast && (
        <div
          className={`fixed top-5 right-5 z-50 px-4 py-3 rounded-lg text-sm font-medium shadow-lg text-white ${toast.ok ? "bg-[#0E292F]" : "bg-red-600"}`}
        >
          {toast.msg}
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0E292F] tracking-tight">
            Blog Posts
          </h1>
          <p className="text-sm text-neutral-500 mt-0.5">
            Create and manage blog content
          </p>
        </div>
        <button
          onClick={openCreate}
          className="inline-flex items-center gap-2 h-9 px-4 bg-[#0E292F] text-white text-sm font-medium rounded-lg hover:bg-[#163a42] transition-colors"
        >
          <Plus className="w-4 h-4" /> New Post
        </button>
      </div>

      {/* Table */}
      <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="w-6 h-6 animate-spin text-neutral-400" />
          </div>
        ) : blogs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-neutral-400">
            <FileText className="w-10 h-10 mb-3 opacity-40" />
            <p className="text-sm font-medium">No blog posts yet</p>
            <button
              onClick={openCreate}
              className="mt-4 text-xs font-semibold text-[#0E292F] underline underline-offset-2"
            >
              Create your first post
            </button>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-neutral-100 bg-neutral-50">
                <th className="text-left px-5 py-3 text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-neutral-500 uppercase tracking-wider hidden md:table-cell">
                  CTA
                </th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-neutral-500 uppercase tracking-wider hidden sm:table-cell">
                  Date
                </th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {blogs.map((blog) => (
                <tr
                  key={blog.id}
                  className="hover:bg-neutral-50 transition-colors"
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      {blog.image_url ? (
                        <img
                          src={blog.image_url}
                          alt=""
                          className="w-10 h-10 rounded-lg object-cover shrink-0 border border-neutral-100"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-lg bg-neutral-100 flex items-center justify-center shrink-0">
                          <FileText className="w-4 h-4 text-neutral-400" />
                        </div>
                      )}
                      <div>
                        <p className="font-semibold text-[#0E292F] line-clamp-1">
                          {blog.title}
                        </p>
                        {blog.slug && (
                          <p className="text-[11px] text-neutral-400">
                            /{blog.slug}
                          </p>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 hidden md:table-cell">
                    {blog.cta_label ? (
                      <span className="text-xs text-neutral-500">
                        {blog.cta_label}
                      </span>
                    ) : (
                      <span className="text-xs text-neutral-300">—</span>
                    )}
                  </td>
                  <td className="px-5 py-4">
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-green-50 text-green-700">
                      <Eye className="w-3 h-3" /> Published
                    </span>
                  </td>
                  <td className="px-5 py-4 text-xs text-neutral-400 hidden sm:table-cell">
                    {new Date(blog.created_at).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2 justify-end">
                      <button
                        onClick={() => openEdit(blog)}
                        className="p-1.5 rounded-md hover:bg-neutral-100 text-neutral-500 hover:text-[#0E292F] transition-colors"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setDeleteTarget(blog)}
                        className="p-1.5 rounded-md hover:bg-red-50 text-neutral-400 hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Create/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[92vh] flex flex-col">
            {/* Modal header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100 shrink-0">
              <h2 className="text-base font-semibold text-[#0E292F]">
                {editId ? "Edit Post" : "New Blog Post"}
              </h2>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowPreview(true)}
                  className="text-xs font-medium text-neutral-500 hover:text-[#0E292F] px-2.5 py-1.5 rounded-md hover:bg-neutral-100 inline-flex items-center gap-1.5"
                >
                  <Eye className="w-3.5 h-3.5" /> Preview
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-1.5 rounded-lg hover:bg-neutral-100 transition-colors"
                >
                  <X className="w-4 h-4 text-neutral-500" />
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex items-center gap-1 px-6 pt-3 border-b border-neutral-100 shrink-0">
              {(["content", "seo"] as const).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`px-3.5 py-2 text-sm font-medium rounded-t-lg border-b-2 -mb-px transition-colors ${
                    activeTab === tab
                      ? "border-[#0E292F] text-[#0E292F]"
                      : "border-transparent text-neutral-400 hover:text-neutral-600"
                  }`}
                >
                  {tab === "content" ? "Content" : "SEO & Metadata"}
                </button>
              ))}
            </div>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col flex-1 min-h-0"
            >
              <div className="p-6 space-y-4 overflow-y-auto flex-1">
                {activeTab === "content" && (
                  <>
                    {/* Title */}
                    <div>
                      <label className={labelCls}>Title *</label>
                      <input
                        required
                        value={form.title}
                        onChange={(e) => handleTitleChange(e.target.value)}
                        placeholder="Post title"
                        className={`${inputCls} text-base font-semibold`}
                      />
                    </div>

                    {/* Slug */}
                    <div>
                      <label className={labelCls}>URL Slug</label>
                      <div className="flex items-center gap-1 text-sm">
                        <span className="text-neutral-400">/blog/</span>
                        <input
                          value={form.slug}
                          onChange={(e) => {
                            setSlugTouched(true);
                            setForm((f) => ({
                              ...f,
                              slug: slugify(e.target.value),
                            }));
                          }}
                          placeholder="post-url-slug"
                          className={`${inputCls} flex-1`}
                        />
                      </div>
                    </div>

                    {/* Header / cover image */}
                    <div>
                      <label className={labelCls}>Header Image</label>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImagePick}
                      />
                      {imagePreview ? (
                        <div className="relative">
                          <img
                            src={imagePreview}
                            alt=""
                            className="w-full h-44 object-cover rounded-xl border border-neutral-200"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              setImageFile(null);
                              setImagePreview("");
                              setForm((f) => ({ ...f, image_url: "" }));
                            }}
                            className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/50 flex items-center justify-center hover:bg-black/70 transition-colors"
                          >
                            <X className="w-3.5 h-3.5 text-white" />
                          </button>
                          <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="absolute bottom-2 right-2 text-[10px] font-bold uppercase tracking-wider bg-white/90 text-[#0E292F] px-2.5 py-1 rounded-md hover:bg-white transition-colors"
                          >
                            Change
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="w-full h-36 border-2 border-dashed border-neutral-200 rounded-xl flex flex-col items-center justify-center gap-2 hover:border-[#0E292F]/30 hover:bg-neutral-50 transition-all"
                        >
                          <ImagePlus className="w-6 h-6 text-neutral-400" />
                          <span className="text-xs font-medium text-neutral-500">
                            Click to upload header image
                          </span>
                          <span className="text-[11px] text-neutral-400">
                            JPG, PNG, WEBP — shown at top of post & as the link
                            preview thumbnail
                          </span>
                        </button>
                      )}
                    </div>

                    {/* Rich text editor */}
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className={labelCls + " mb-0"}>Body *</label>
                        <span className="text-[11px] text-neutral-400">
                          {stats.words} words · ~{stats.minutes} min read
                        </span>
                      </div>
                      <div className="rounded-lg border border-neutral-200 overflow-hidden">
                        <EditorToolbar
                          editor={editor}
                          onInsertImage={handleInsertInlineImage}
                          uploadingInlineImage={uploadingInlineImage}
                        />
                        <div className="bg-white max-h-[420px] overflow-y-auto">
                          <EditorContent editor={editor} />
                        </div>
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className={labelCls}>CTA Label</label>
                        <input
                          value={form.cta_label}
                          onChange={(e) =>
                            setForm((f) => ({
                              ...f,
                              cta_label: e.target.value,
                            }))
                          }
                          placeholder="e.g. Learn More"
                          className={inputCls}
                        />
                      </div>
                      <div>
                        <label className={labelCls}>CTA URL</label>
                        <input
                          value={form.cta_url}
                          onChange={(e) =>
                            setForm((f) => ({ ...f, cta_url: e.target.value }))
                          }
                          placeholder="https://..."
                          className={inputCls}
                        />
                      </div>
                    </div>
                  </>
                )}

                {activeTab === "seo" && (
                  <>
                    <div className="bg-neutral-50 border border-neutral-100 rounded-xl p-4">
                      <p className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider mb-2">
                        Google preview
                      </p>
                      <p className="text-[#1a0dab] text-base leading-tight truncate">
                        {form.meta_title || form.title || "Post title"}
                      </p>
                      <p className="text-[#006621] text-xs mt-0.5">
                        yoursite.com/blog/{form.slug || "post-slug"}
                      </p>
                      <p className="text-sm text-neutral-600 mt-1 line-clamp-2">
                        {form.meta_description ||
                          "Add a meta description so search engines know how to describe this post."}
                      </p>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className={labelCls + " mb-0"}>Meta Title</label>
                        <span
                          className={`text-[11px] ${metaTitleLen > 60 ? "text-red-500" : "text-neutral-400"}`}
                        >
                          {metaTitleLen}/60
                        </span>
                      </div>
                      <input
                        value={form.meta_title}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, meta_title: e.target.value }))
                        }
                        placeholder={
                          form.title || "Defaults to post title if left blank"
                        }
                        className={inputCls}
                      />
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className={labelCls + " mb-0"}>
                          Meta Description
                        </label>
                        <span
                          className={`text-[11px] ${metaDescLen > 160 ? "text-red-500" : "text-neutral-400"}`}
                        >
                          {metaDescLen}/160
                        </span>
                      </div>
                      <textarea
                        rows={3}
                        value={form.meta_description}
                        onChange={(e) =>
                          setForm((f) => ({
                            ...f,
                            meta_description: e.target.value,
                          }))
                        }
                        placeholder="A short, compelling summary shown in search results (aim for 150–160 characters)"
                        className={`${inputCls} resize-none`}
                      />
                    </div>

                    <div>
                      <label className={labelCls}>Focus Keyword</label>
                      <div className="relative">
                        <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          value={form.focus_keyword}
                          onChange={(e) =>
                            setForm((f) => ({
                              ...f,
                              focus_keyword: e.target.value,
                            }))
                          }
                          placeholder="e.g. luxury real estate Lagos"
                          className={`${inputCls} pl-8`}
                        />
                      </div>
                      <p className="text-[11px] text-neutral-400 mt-1.5">
                        Main term this post should rank for. Used for your own
                        reference and can be reused in structured data.
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-xs text-neutral-500 bg-neutral-50 border border-neutral-100 rounded-lg p-3">
                      <div>
                        Reading time:{" "}
                        <span className="font-semibold text-neutral-700">
                          ~{stats.minutes} min
                        </span>
                      </div>
                      <div>
                        Word count:{" "}
                        <span className="font-semibold text-neutral-700">
                          {stats.words}
                        </span>
                      </div>
                    </div>
                  </>
                )}
              </div>

              <div className="flex justify-end gap-3 px-6 py-4 border-t border-neutral-100 shrink-0">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="h-9 px-4 text-sm font-medium text-neutral-600 border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="h-9 px-5 text-sm font-medium bg-[#0E292F] text-white rounded-lg hover:bg-[#163a42] transition-colors disabled:opacity-50 inline-flex items-center gap-2"
                >
                  {(submitting || uploadingImage) && (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  )}
                  {uploadingImage
                    ? "Uploading image…"
                    : submitting
                      ? "Publishing…"
                      : editId
                        ? "Save Changes"
                        : "Publish Post"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Live preview modal — approximates how visitors will see the rendered HTML */}
      {showPreview && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100 sticky top-0 bg-white">
              <h3 className="text-sm font-semibold text-[#0E292F]">
                Visitor preview
              </h3>
              <button
                onClick={() => setShowPreview(false)}
                className="p-1.5 rounded-lg hover:bg-neutral-100"
              >
                <X className="w-4 h-4 text-neutral-500" />
              </button>
            </div>
            <article className="p-6">
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt=""
                  className="w-full h-56 object-cover rounded-xl mb-5"
                />
              )}
              <h1 className="text-2xl font-bold text-[#0E292F] mb-2">
                {form.title || "Untitled post"}
              </h1>
              <p className="text-xs text-neutral-400 mb-5">
                ~{stats.minutes} min read
              </p>
              <div
                className="prose prose-neutral max-w-none prose-headings:text-[#0E292F] prose-a:text-[#3D7188]"
                // This is exactly how the public blog page should render body_html from the backend
                dangerouslySetInnerHTML={{ __html: form.body_html }}
              />
              {form.cta_label && form.cta_url && (
                <a
                  href={form.cta_url}
                  className="inline-block mt-6 px-5 py-2.5 bg-[#0E292F] text-white text-sm font-medium rounded-lg"
                >
                  {form.cta_label}
                </a>
              )}
            </article>
          </div>
        </div>
      )}

      {/* Delete Confirm */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6">
            <h3 className="text-base font-semibold text-[#0E292F] mb-2">
              Delete post?
            </h3>
            <p className="text-sm text-neutral-500 mb-5">
              "{deleteTarget.title}" will be permanently removed.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setDeleteTarget(null)}
                className="h-9 px-4 text-sm font-medium border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="h-9 px-4 text-sm font-medium bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 inline-flex items-center gap-2"
              >
                {deleting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
