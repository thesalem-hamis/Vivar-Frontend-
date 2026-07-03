import { useEffect, useState, useCallback } from "react";
import { getAllLeads, deleteLead } from "@/lib/supabase/admin";
import { Trash2, Loader2, Users, Mail, Phone, CheckCircle2 } from "lucide-react";

export default function LeadsPage() {
  const [leads, setLeads] = useState<any[]>([]);
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
      const data = await getAllLeads();
      setLeads(data);
    } catch {
      showToast("Failed to load leads", false);
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
      await deleteLead(deleteTarget.id);
      setLeads((prev) => prev.filter((l) => l.id !== deleteTarget.id));
      showToast("Lead deleted");
      setDeleteTarget(null);
    } catch {
      showToast("Failed to delete", false);
    } finally {
      setDeleting(false);
    }
  };

  const mailchimpSynced = leads.filter((l) => l.mailchimp_synced).length;

  return (
    <div className="space-y-6 font-sans">
      {toast && (
        <div
          className={`fixed top-5 right-5 z-50 px-4 py-3 rounded-lg text-sm font-medium shadow-lg text-white ${toast.ok ? "bg-[#0E292F]" : "bg-red-600"}`}
        >
          {toast.msg}
        </div>
      )}

      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#0E292F] tracking-tight">
            Guide Leads
          </h1>
          <p className="text-sm text-neutral-500 mt-0.5">
            Users who requested the Lagos Investment Guide
          </p>
        </div>
        <div className="flex gap-3">
          <div className="bg-white border border-neutral-200 rounded-xl px-4 py-3 text-center">
            <p className="text-2xl font-bold text-[#0E292F]">{leads.length}</p>
            <p className="text-[11px] text-neutral-500 font-medium">Total</p>
          </div>
          <div className="bg-white border border-neutral-200 rounded-xl px-4 py-3 text-center">
            <p className="text-2xl font-bold text-green-600">{mailchimpSynced}</p>
            <p className="text-[11px] text-neutral-500 font-medium">Synced</p>
          </div>
        </div>
      </div>

      <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="w-6 h-6 animate-spin text-neutral-400" />
          </div>
        ) : leads.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-neutral-400">
            <Users className="w-10 h-10 mb-3 opacity-40" />
            <p className="text-sm font-medium">No leads yet</p>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-neutral-100 bg-neutral-50">
                <th className="text-left px-5 py-3 text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-neutral-500 uppercase tracking-wider hidden sm:table-cell">
                  Email
                </th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-neutral-500 uppercase tracking-wider hidden md:table-cell">
                  Phone
                </th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                  MailChimp
                </th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-neutral-500 uppercase tracking-wider hidden sm:table-cell">
                  Date
                </th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {leads.map((lead) => (
                <tr
                  key={lead.id}
                  className="hover:bg-neutral-50 transition-colors"
                >
                  <td className="px-5 py-3.5 font-medium text-[#0E292F]">
                    {lead.name}
                  </td>
                  <td className="px-5 py-3.5 hidden sm:table-cell">
                    <span className="flex items-center gap-1.5 text-neutral-600">
                      <Mail className="w-3 h-3 text-neutral-400" />
                      {lead.email}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 hidden md:table-cell">
                    {lead.phone ? (
                      <span className="flex items-center gap-1.5 text-neutral-600">
                        <Phone className="w-3 h-3 text-neutral-400" />
                        {lead.phone}
                      </span>
                    ) : (
                      <span className="text-neutral-300">—</span>
                    )}
                  </td>
                  <td className="px-5 py-3.5">
                    {lead.mailchimp_synced ? (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-green-700 bg-green-50 px-2 py-0.5 rounded-full">
                        <CheckCircle2 className="w-3 h-3" /> Synced
                      </span>
                    ) : (
                      <span className="text-xs text-neutral-400 font-medium">
                        Pending
                      </span>
                    )}
                  </td>
                  <td className="px-5 py-3.5 text-xs text-neutral-400 hidden sm:table-cell">
                    {new Date(lead.created_at).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-5 py-3.5">
                    <button
                      onClick={() => setDeleteTarget(lead)}
                      className="p-1.5 rounded-md hover:bg-red-50 text-neutral-400 hover:text-red-600 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6">
            <h3 className="text-base font-semibold text-[#0E292F] mb-2">
              Delete lead?
            </h3>
            <p className="text-sm text-neutral-500 mb-5">
              Lead from <strong>{deleteTarget.name}</strong> will be permanently
              removed.
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
