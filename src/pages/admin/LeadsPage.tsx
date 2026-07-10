import { useEffect, useState, useCallback } from "react";
import { getAllLeads, deleteLead } from "@/lib/supabase/admin";
import { supabase } from "@/lib/supabase/client";
import { Trash2, Loader2, Users, Mail, CheckCircle2, RefreshCw } from "lucide-react";

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

  const fetch = useCallback(async (showLoader = true) => {
    try {
      if (showLoader) setLoading(true);
      const data = await getAllLeads();
      setLeads(data);
    } catch {
      showToast("Failed to load leads", false);
    } finally {
      if (showLoader) setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetch();

    const channel = supabase
      .channel('leads_changes')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'leads' },
        (payload) => {
          setLeads((prev) => [payload.new as any, ...prev]);
          showToast("New lead received!");
        }
      )
      .on(
        'postgres_changes',
        { event: 'DELETE', schema: 'public', table: 'leads' },
        (payload) => {
          setLeads((prev) => prev.filter((l) => l.id !== payload.old.id));
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
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

  return (
    <div className="space-y-6 font-sans">
      {toast && (
        <div
          className={`fixed top-5 right-5 z-50 px-4 py-2.5 rounded-lg text-sm font-medium shadow-lg text-white flex items-center gap-2 ${
            toast.ok ? "bg-[#0E292F]" : "bg-red-600"
          }`}
        >
          {toast.ok ? <CheckCircle2 className="w-4 h-4" /> : <Trash2 className="w-4 h-4" />}
          {toast.msg}
        </div>
      )}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0E292F] tracking-tight">
            Guide Leads
          </h1>
          <p className="text-sm text-neutral-500 mt-0.5">
            Users who requested the Lagos Investment Guide
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => fetch(true)}
            className="p-2 rounded-lg hover:bg-neutral-100 transition-colors text-neutral-500 hover:text-[#0E292F]"
            title="Refresh leads"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-2 px-4 py-2 bg-[#0E292F]/5 rounded-xl border border-[#0E292F]/10">
            <Users className="w-4 h-4 text-[#0E292F]/60" />
            <span className="text-sm font-semibold text-[#0E292F]">
              {leads.length} {leads.length === 1 ? 'Lead' : 'Leads'}
            </span>
          </div>
        </div>
      </div>

      <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden shadow-sm">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-3">
            <Loader2 className="w-8 h-8 animate-spin text-[#0E292F]" />
            <p className="text-sm text-neutral-500">Loading leads...</p>
          </div>
        ) : leads.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-neutral-400">
            <div className="w-16 h-16 rounded-2xl bg-neutral-100 flex items-center justify-center mb-4">
              <Users className="w-8 h-8 opacity-40" />
            </div>
            <p className="text-sm font-medium text-neutral-600">No leads yet</p>
            <p className="text-xs text-neutral-400 mt-1">Leads will appear here when users sign up</p>
          </div>
        ) : (
          <div className="divide-y divide-neutral-100">
            {leads.map((lead) => (
              <div
                key={lead.id}
                className="group flex items-center justify-between px-5 py-3 hover:bg-neutral-50 transition-colors"
              >
                <div className="flex items-center gap-4 min-w-0 flex-1">
                  <div className="w-9 h-9 rounded-lg bg-[#0E292F]/5 flex items-center justify-center shrink-0">
                    <span className="text-xs font-bold text-[#0E292F]/60 uppercase">
                      {lead.name?.charAt(0) || "?"}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-[#0E292F] truncate">
                      {lead.name}
                    </p>
                    <span className="flex items-center gap-1.5 text-xs text-neutral-500 mt-0.5">
                      <Mail className="w-3 h-3" />
                      {lead.email}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-[11px] text-neutral-400 hidden sm:block">
                    {new Date(lead.created_at).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                  <button
                    onClick={() => setDeleteTarget(lead)}
                    className="p-1.5 rounded-md hover:bg-red-50 text-neutral-400 hover:text-red-600 transition-all opacity-0 group-hover:opacity-100"
                    title="Delete lead"
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
            <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center mb-4">
              <Trash2 className="w-5 h-5 text-red-600" />
            </div>
            <h3 className="text-base font-semibold text-[#0E292F] mb-2">Delete lead?</h3>
            <p className="text-sm text-neutral-500 mb-5">
              Lead from <strong className="text-[#0E292F]">{deleteTarget.name}</strong> will be permanently removed.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteTarget(null)}
                className="flex-1 h-10 text-sm font-medium border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="flex-1 h-10 text-sm font-medium bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 inline-flex items-center justify-center gap-2"
              >
                {deleting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}