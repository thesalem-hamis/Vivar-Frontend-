import { useEffect, useState, useCallback, useRef } from "react";
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
} from "lucide-react";

const inputCls =
  "w-full px-3 py-2.5 border border-neutral-200 rounded-lg text-sm text-neutral-800 placeholder-neutral-400 focus:outline-none focus:border-[#0E292F] focus:ring-1 focus:ring-[#0E292F]/10 bg-white";

const emptyForm = {
  title: "",
  body: "",
  image_url: "",
  cta_label: "",
  cta_url: "",
};

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ ...emptyForm });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [uploadingImage, setUploadingImage] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<any | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const showToast = (msg: string, ok = true) => {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 3000);
  };

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

  useEffect(() => { fetchBlogs(); }, [fetchBlogs]);

  const openCreate = () => {
    setEditId(null);
    setForm({ ...emptyForm });
    setImageFile(null);
    setImagePreview("");
    setShowModal(true);
  };

  const openEdit = (blog: any) => {
    setEditId(blog.id);
    setForm({
      title: blog.title || "",
      body: blog.body || "",
      image_url: blog.image_url || "",
      cta_label: blog.cta_label || "",
      cta_url: blog.cta_url || "",
    });
    setImageFile(null);
    setImagePreview(blog.image_url || "");
    setShowModal(true);
  };

  const handleImagePick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      let image_url = form.image_url;

      if (imageFile) {
        setUploadingImage(true);
        image_url = await uploadBlogImage(imageFile);
        setUploadingImage(false);
      }

      const payload = { ...form, image_url, published: true };

      if (editId) {
        const updated = await updateBlog(editId, payload);
        setBlogs((prev) => prev.map((b) => (b.id === editId ? updated : b)));
        showToast("Blog updated");
      } else {
        const created = await createBlog(payload);
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

  return (
    <div className="space-y-6 font-sans">
      {toast && (
        <div className={`fixed top-5 right-5 z-50 px-4 py-3 rounded-lg text-sm font-medium shadow-lg text-white ${toast.ok ? "bg-[#0E292F]" : "bg-red-600"}`}>
          {toast.msg}
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0E292F] tracking-tight">Blog Posts</h1>
          <p className="text-sm text-neutral-500 mt-0.5">Create and manage blog content</p>
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
            <button onClick={openCreate} className="mt-4 text-xs font-semibold text-[#0E292F] underline underline-offset-2">
              Create your first post
            </button>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-neutral-100 bg-neutral-50">
                <th className="text-left px-5 py-3 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Title</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-neutral-500 uppercase tracking-wider hidden md:table-cell">CTA</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Status</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-neutral-500 uppercase tracking-wider hidden sm:table-cell">Date</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {blogs.map((blog) => (
                <tr key={blog.id} className="hover:bg-neutral-50 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      {blog.image_url ? (
                        <img src={blog.image_url} alt="" className="w-10 h-10 rounded-lg object-cover shrink-0 border border-neutral-100" />
                      ) : (
                        <div className="w-10 h-10 rounded-lg bg-neutral-100 flex items-center justify-center shrink-0">
                          <FileText className="w-4 h-4 text-neutral-400" />
                        </div>
                      )}
                      <p className="font-semibold text-[#0E292F] line-clamp-1">{blog.title}</p>
                    </div>
                  </td>
                  <td className="px-5 py-4 hidden md:table-cell">
                    {blog.cta_label
                      ? <span className="text-xs text-neutral-500">{blog.cta_label}</span>
                      : <span className="text-xs text-neutral-300">—</span>
                    }
                  </td>
                  <td className="px-5 py-4">
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-green-50 text-green-700">
                      <Eye className="w-3 h-3" /> Published
                    </span>
                  </td>
                  <td className="px-5 py-4 text-xs text-neutral-400 hidden sm:table-cell">
                    {new Date(blog.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2 justify-end">
                      <button onClick={() => openEdit(blog)} className="p-1.5 rounded-md hover:bg-neutral-100 text-neutral-500 hover:text-[#0E292F] transition-colors">
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => setDeleteTarget(blog)} className="p-1.5 rounded-md hover:bg-red-50 text-neutral-400 hover:text-red-600 transition-colors">
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
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100">
              <h2 className="text-base font-semibold text-[#0E292F]">
                {editId ? "Edit Post" : "New Blog Post"}
              </h2>
              <button onClick={() => setShowModal(false)} className="p-1.5 rounded-lg hover:bg-neutral-100 transition-colors">
                <X className="w-4 h-4 text-neutral-500" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* Title */}
              <div>
                <label className="block text-xs font-semibold text-neutral-600 uppercase tracking-wider mb-1.5">Title *</label>
                <input
                  required
                  value={form.title}
                  onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                  placeholder="Post title"
                  className={inputCls}
                />
              </div>

              {/* Cover Image — file picker */}
              <div>
                <label className="block text-xs font-semibold text-neutral-600 uppercase tracking-wider mb-1.5">Cover Image</label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImagePick}
                />
                {imagePreview ? (
                  <div className="relative">
                    <img src={imagePreview} alt="" className="w-full h-40 object-cover rounded-xl border border-neutral-200" />
                    <button
                      type="button"
                      onClick={() => { setImageFile(null); setImagePreview(""); setForm((f) => ({ ...f, image_url: "" })); }}
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
                    className="w-full h-32 border-2 border-dashed border-neutral-200 rounded-xl flex flex-col items-center justify-center gap-2 hover:border-[#0E292F]/30 hover:bg-neutral-50 transition-all"
                  >
                    <ImagePlus className="w-6 h-6 text-neutral-400" />
                    <span className="text-xs font-medium text-neutral-500">Click to upload cover image</span>
                    <span className="text-[11px] text-neutral-400">JPG, PNG, WEBP</span>
                  </button>
                )}
              </div>

              {/* Body */}
              <div>
                <label className="block text-xs font-semibold text-neutral-600 uppercase tracking-wider mb-1.5">Body *</label>
                <textarea
                  required
                  rows={8}
                  value={form.body}
                  onChange={(e) => setForm((f) => ({ ...f, body: e.target.value }))}
                  placeholder="Write your blog post content here..."
                  className={`${inputCls} resize-none`}
                />
              </div>

              {/* CTA */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-600 uppercase tracking-wider mb-1.5">CTA Label</label>
                  <input
                    value={form.cta_label}
                    onChange={(e) => setForm((f) => ({ ...f, cta_label: e.target.value }))}
                    placeholder="e.g. Learn More"
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-600 uppercase tracking-wider mb-1.5">CTA URL</label>
                  <input
                    value={form.cta_url}
                    onChange={(e) => setForm((f) => ({ ...f, cta_url: e.target.value }))}
                    placeholder="https://..."
                    className={inputCls}
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
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
                  {(submitting || uploadingImage) && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  {uploadingImage ? "Uploading image…" : submitting ? "Publishing…" : editId ? "Save Changes" : "Publish Post"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirm */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6">
            <h3 className="text-base font-semibold text-[#0E292F] mb-2">Delete post?</h3>
            <p className="text-sm text-neutral-500 mb-5">"{deleteTarget.title}" will be permanently removed.</p>
            <div className="flex gap-3 justify-end">
              <button onClick={() => setDeleteTarget(null)} className="h-9 px-4 text-sm font-medium border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors">
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
