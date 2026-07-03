import { useEffect, useState, useCallback } from "react";
import {
  getAllPropertyEnquiries,
  deletePropertyEnquiry,
} from "@/lib/supabase/admin";
import { Trash2, Loader2, Building2, Mail, Phone } from "lucide-react";

export default function PropertyEnquiriesPage() {
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState<any | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null);

  const showToast = (msg: string, ok = true) => {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 3000);
  };

  const fetch = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getAllPropertyEnquiries();
      setEnquiries(data);
    } catch {
      showToast("Failed to load enquiries", false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await deletePropertyEnquiry(deleteTarget.id);
      setEnquiries((prev) => prev.filter((e) => e.id !== deleteTarget.id));
      showToast("Enquiry deleted");
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
        <div
          className={`fixed top-5 right-5 z-50 px-4 py-3 rounded-lg text-sm font-medium shadow-lg text-white ${toast.ok ? "bg-[#0E292F]" : "bg-red-600"}`}
        >
          {toast.msg}
        </div>
      )}

      <div>
        <h1 className="text-2xl font-bold text-[#0E292F] tracking-tight">
          Property Enquiries
        </h1>
        <p className="text-sm text-neutral-500 mt-0.5">
          Messages sent from individual property listing pages
        </p>
      </div>

      <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="w-6 h-6 animate-spin text-neutral-400" />
          </div>
        ) : enquiries.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-neutral-400">
            <Building2 className="w-10 h-10 mb-3 opacity-40" />
            <p className="text-sm font-medium">No property enquiries yet</p>
          </div>
        ) : (
          <div className="divide-y divide-neutral-100">
            {enquiries.map((enq) => (
              <div
                key={enq.id}
                className="px-5 py-4 hover:bg-neutral-50 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0 space-y-1.5">
                    {/* Property badge */}
                    {enq.property_title && (
                      <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full bg-[#0E292F]/8 text-[#0E292F]">
                        <Building2 className="w-3 h-3" />
                        {enq.property_title}
                      </div>
                    )}
                    <p className="font-semibold text-[#0E292F] text-sm">
                      {enq.first_name}
                    </p>
                    <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-500">
                      <span className="flex items-center gap-1">
                        <Mail className="w-3 h-3" />
                        {enq.email}
                      </span>
                      {enq.phone && (
                        <span className="flex items-center gap-1">
                          <Phone className="w-3 h-3" />
                          {enq.phone}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-neutral-600 leading-relaxed">
                      {enq.message}
                    </p>
                    <p className="text-[11px] text-neutral-400">
                      {new Date(enq.created_at).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                  <button
                    onClick={() => setDeleteTarget(enq)}
                    className="p-1.5 rounded-md hover:bg-red-50 text-neutral-400 hover:text-red-600 transition-colors shrink-0"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6">
            <h3 className="text-base font-semibold text-[#0E292F] mb-2">
              Delete enquiry?
            </h3>
            <p className="text-sm text-neutral-500 mb-5">
              Enquiry from <strong>{deleteTarget.first_name}</strong> will be
              permanently removed.
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
