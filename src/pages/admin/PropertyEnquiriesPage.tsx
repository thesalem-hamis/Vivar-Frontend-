import { useEffect, useState, useCallback } from "react";
import {
  getAllPropertyEnquiries,
  deletePropertyEnquiry,
} from "@/lib/supabase/admin";
import { 
  Trash2, 
  Loader2, 
  Building2, 
  Mail, 
  Phone, 
  X, 
  Home, 
  Clock, 
  User,
  MessageSquare,
  Hash,
  ChevronRight,
  AlertCircle
} from "lucide-react";

export default function PropertyEnquiriesPage() {
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState<any | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null);
  const [selectedEnquiry, setSelectedEnquiry] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      showToast("Enquiry deleted successfully");
      setDeleteTarget(null);
    } catch {
      showToast("Failed to delete enquiry", false);
    } finally {
      setDeleting(false);
    }
  };

  const openModal = (enquiry: any) => {
    setSelectedEnquiry(enquiry);
    setIsModalOpen(true);
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    // Small delay to allow exit animation
    setTimeout(() => {
      setSelectedEnquiry(null);
      document.body.style.overflow = 'unset';
    }, 200);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return `Today at ${date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      })}`;
    } else if (diffDays === 1) {
      return `Yesterday at ${date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      })}`;
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else {
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    }
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Toast Notification */}
      {toast && (
        <div
          className={`fixed top-5 right-5 z-50 px-5 py-3 rounded-xl text-sm font-medium shadow-lg flex items-center gap-2 ${
            toast.ok 
              ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white" 
              : "bg-gradient-to-r from-red-600 to-rose-600 text-white"
          }`}
          style={{
            animation: 'slideInRight 0.3s ease-out'
          }}
        >
          {toast.ok ? (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <AlertCircle className="w-4 h-4" />
          )}
          {toast.msg}
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0E292F] tracking-tight">
            Property Enquiries
          </h1>
          <p className="text-sm text-neutral-500 mt-0.5">
            Messages sent from individual property listing pages
          </p>
        </div>
        {!loading && (
          <div className="flex items-center gap-2 px-3 py-1.5 bg-neutral-100 rounded-lg">
            <Hash className="w-4 h-4 text-neutral-500" />
            <span className="text-sm font-medium text-neutral-700">
              {enquiries.length} {enquiries.length === 1 ? 'enquiry' : 'enquiries'}
            </span>
          </div>
        )}
      </div>

      {/* Enquiries List */}
      <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden shadow-sm">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-3">
            <Loader2 className="w-8 h-8 animate-spin text-[#0E292F]" />
            <p className="text-sm text-neutral-500">Loading enquiries...</p>
          </div>
        ) : enquiries.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-neutral-400">
            <div className="w-16 h-16 rounded-2xl bg-neutral-100 flex items-center justify-center mb-4">
              <Building2 className="w-8 h-8 opacity-40" />
            </div>
            <p className="text-sm font-medium text-neutral-600">No property enquiries yet</p>
            <p className="text-xs text-neutral-400 mt-1">Enquiries will appear here when users contact you</p>
          </div>
        ) : (
          <div className="divide-y divide-neutral-100">
            {enquiries.map((enq) => (
              <div
                key={enq.id}
                onClick={() => openModal(enq)}
                className="group w-full text-left px-6 py-4 hover:bg-gradient-to-r hover:from-neutral-50 hover:to-transparent transition-all duration-200 cursor-pointer"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0 space-y-2">
                    {/* Property Badge */}
                    {enq.property_title && (
                      <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full bg-gradient-to-r from-[#0E292F]/10 to-[#0E292F]/5 text-[#0E292F] border border-[#0E292F]/10">
                        <Home className="w-3 h-3" />
                        {enq.property_title}
                      </div>
                    )}
                    
                    {/* Name and Time */}
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-[#0E292F] text-sm group-hover:text-[#0E292F]/80 transition-colors">
                          {enq.first_name} {enq.last_name}
                        </p>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="flex items-center gap-1 text-xs text-neutral-500">
                            <Mail className="w-3 h-3" />
                            {enq.email}
                          </span>
                          {enq.phone && (
                            <span className="flex items-center gap-1 text-xs text-neutral-500">
                              <Phone className="w-3 h-3" />
                              {enq.phone}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] text-neutral-400 whitespace-nowrap">
                          {formatDate(enq.created_at)}
                        </span>
                        <ChevronRight className="w-4 h-4 text-neutral-300 group-hover:text-[#0E292F] transition-colors" />
                      </div>
                    </div>

                    {/* Message Preview */}
                    <p className="text-sm text-neutral-600 leading-relaxed line-clamp-2 bg-neutral-50 rounded-lg p-3 group-hover:bg-white transition-colors">
                      {enq.message}
                    </p>
                  </div>

                  {/* Delete Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setDeleteTarget(enq);
                    }}
                    className="p-2 rounded-lg hover:bg-red-50 text-neutral-400 hover:text-red-600 transition-all opacity-0 group-hover:opacity-100 shrink-0"
                    title="Delete enquiry"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Full Details Modal */}
      {isModalOpen && selectedEnquiry && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            style={{ animation: 'fadeIn 0.2s ease-out' }}
          />
          
          {/* Modal */}
          <div 
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden"
            style={{ animation: 'scaleIn 0.3s ease-out' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="relative bg-gradient-to-r from-[#0E292F] to-[#1a3a42] px-6 py-5">
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 p-2 rounded-lg hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5 text-white/80 hover:text-white" />
              </button>
              
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-white/60 text-xs font-medium uppercase tracking-wider">
                  <MessageSquare className="w-3.5 h-3.5" />
                  Property Enquiry
                </div>
                <h2 className="text-xl font-bold text-white">
                  {selectedEnquiry.first_name} {selectedEnquiry.last_name}
                </h2>
                {selectedEnquiry.property_title && (
                  <div className="flex items-center gap-2 mt-2">
                    <div className="px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
                      <div className="flex items-center gap-1.5 text-xs text-white/90">
                        <Home className="w-3 h-3" />
                        {selectedEnquiry.property_title}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Modal Content */}
            <div className="overflow-y-auto max-h-[calc(90vh-200px)]">
              <div className="p-6 space-y-6">
                {/* Contact Information Card */}
                <div className="bg-gradient-to-br from-neutral-50 to-neutral-100/50 rounded-xl p-5 border border-neutral-200">
                  <h3 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-4">
                    Contact Information
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center shrink-0">
                        <User className="w-5 h-5 text-[#0E292F]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[11px] font-medium text-neutral-500 uppercase tracking-wider">Full Name</p>
                        <p className="text-sm font-semibold text-neutral-900 mt-0.5">
                          {selectedEnquiry.first_name} {selectedEnquiry.last_name}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center shrink-0">
                        <Mail className="w-5 h-5 text-[#0E292F]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[11px] font-medium text-neutral-500 uppercase tracking-wider">Email Address</p>
                        <a 
                          href={`mailto:${selectedEnquiry.email}`}
                          className="text-sm font-medium text-[#0E292F] hover:underline mt-0.5 block break-all"
                        >
                          {selectedEnquiry.email}
                        </a>
                      </div>
                    </div>

                    {selectedEnquiry.phone && (
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center shrink-0">
                          <Phone className="w-5 h-5 text-[#0E292F]" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[11px] font-medium text-neutral-500 uppercase tracking-wider">Phone Number</p>
                          <a 
                            href={`tel:${selectedEnquiry.phone}`}
                            className="text-sm font-medium text-[#0E292F] hover:underline mt-0.5 block"
                          >
                            {selectedEnquiry.phone}
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Message Card */}
                <div>
                  <h3 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-3">
                    Message
                  </h3>
                  <div className="bg-neutral-50 rounded-xl p-5 border border-neutral-200">
                    <p className="text-sm text-neutral-700 leading-relaxed whitespace-pre-wrap">
                      {selectedEnquiry.message}
                    </p>
                  </div>
                </div>

                {/* Timestamp */}
                <div className="flex items-center gap-3 pt-2 border-t border-neutral-100">
                  <div className="w-8 h-8 rounded-lg bg-neutral-100 flex items-center justify-center">
                    <Clock className="w-4 h-4 text-neutral-500" />
                  </div>
                  <div>
                    <p className="text-[11px] font-medium text-neutral-500 uppercase tracking-wider">Submitted</p>
                    <p className="text-sm text-neutral-700">
                      {new Date(selectedEnquiry.created_at).toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                      {" at "}
                      {new Date(selectedEnquiry.created_at).toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-neutral-200 bg-neutral-50/80 backdrop-blur-sm flex items-center justify-between">
              <button
                onClick={closeModal}
                className="px-4 py-2 text-sm font-medium text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors"
              >
                Close
              </button>
              <div className="flex items-center gap-2">
                <a
                  href={`mailto:${selectedEnquiry.email}`}
                  className="px-4 py-2 text-sm font-medium bg-[#0E292F] text-white rounded-lg hover:bg-[#1a3a42] transition-colors inline-flex items-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  Reply via Email
                </a>
                <button
                  onClick={() => {
                    setDeleteTarget(selectedEnquiry);
                    closeModal();
                  }}
                  className="px-4 py-2 text-sm font-medium bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors inline-flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setDeleteTarget(null)} />
          <div 
            className="relative bg-white rounded-2xl shadow-xl w-full max-w-sm p-6"
            style={{ animation: 'scaleIn 0.3s ease-out' }}
          >
            <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center mb-4">
              <AlertCircle className="w-6 h-6 text-red-600" />
            </div>
            <h3 className="text-lg font-semibold text-neutral-900 mb-2">
              Delete Enquiry?
            </h3>
            <p className="text-sm text-neutral-600 mb-2">
              This will permanently delete the enquiry from{" "}
              <strong className="text-neutral-900">
                {deleteTarget.first_name} {deleteTarget.last_name}
              </strong>
              .
            </p>
            <p className="text-xs text-neutral-500 mb-6">
              This action cannot be undone.
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
                {deleting && <Loader2 className="w-4 h-4 animate-spin" />}
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Global styles for animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(100%);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
}