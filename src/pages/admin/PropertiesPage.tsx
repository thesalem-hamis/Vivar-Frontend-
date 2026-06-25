import { useEffect, useState, useCallback, useMemo } from "react";
import {
  getAllProperties,
  createProperty,
  deleteProperty,
  updateProperty,
  uploadPropertyImages,
} from "@/lib/supabase/admin";
import { subscribeToProperties } from "@/lib/supabase/realtime";
import {
  Search, Trash2, Plus, MapPin, BedDouble, Bath, Maximize,
  X, Upload, Image as ImageIcon, RefreshCw, Eye,
  Edit, Grid3x3, List, Check, ChevronDown,
} from "lucide-react";

import emptyStateImg from "@/assets/svg.png";

// ─── Types ─────────────────────────────────────────────────────────────────

interface Toast {
  id: string;
  message: string;
  type: "success" | "error";
}

interface PropertyFormData {
  title: string;
  description: string;
  price: string;
  type: string;
  bedrooms: string;
  bathrooms: string;
  area: string;
  address: string;
  city: string;
  state: string;
  country: string;
  imageFiles: File[];
}

const initialFormData: PropertyFormData = {
  title: "", description: "", price: "", type: "sale",
  bedrooms: "", bathrooms: "", area: "",
  address: "", city: "", state: "", country: "Nigeria",
  imageFiles: [],
};

// ─── Shimmer ───────────────────────────────────────────────────────────────

const ShimmerBlock = ({ className = "" }: { className?: string }) => (
  <div className={`bg-[#ECEAE4]/60 rounded-md animate-pulse ${className}`} />
);

const ShimmerCard = () => (
  <div className="bg-white border border-[#E5E7EB] rounded-xl overflow-hidden font-sans">
    <ShimmerBlock className="h-48 rounded-none" />
    <div className="p-4 space-y-3">
      <ShimmerBlock className="h-4 w-3/4" />
      <ShimmerBlock className="h-3 w-1/2" />
      <div className="flex gap-2 pt-2">
        {[1,2,3].map(i => <ShimmerBlock key={i} className="h-3 w-12" />)}
      </div>
    </div>
  </div>
);

const ShimmerGrid = () => (
  <div className="font-sans">
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-[#E5E7EB] border border-[#E5E7EB] rounded-xl overflow-hidden">
      {[1,2,3,4].map(i => (
        <div key={i} className="bg-white p-5 space-y-3">
          <ShimmerBlock className="h-3 w-20" />
          <ShimmerBlock className="h-8 w-16" />
        </div>
      ))}
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
      {[1,2,3,4,5,6].map(i => <ShimmerCard key={i} />)}
    </div>
  </div>
);

// ─── Empty State ───────────────────────────────────────────────────────────

const PropertiesEmptyState = ({
  filtered, onAdd,
}: { filtered: boolean; onAdd: () => void }) => (
  <div className="bg-white border border-dashed border-[#E5E7EB] rounded-xl py-16 px-6 text-center font-sans">
    <div className="w-16 h-16 mx-auto flex items-center justify-center mb-5 select-none pointer-events-none">
      <img
        src={emptyStateImg}
        alt="Empty state placeholder"
        className="w-full h-full object-contain mix-blend-multiply opacity-80"
      />
    </div>
    <h3 className="text-2xl font-bold text-[#0E292F] tracking-tight font-sans">
      {filtered ? "No matching listings" : "No listings yet"}
    </h3>
    <p className="text-sm text-[#6B6B66] mt-2 max-w-sm mx-auto font-sans">
      {filtered
        ? "Try clearing your search or adjusting the filters."
        : "Add your first property listing to get started."}
    </p>
    {!filtered && (
      <button
        onClick={onAdd}
        className="mt-6 inline-flex items-center gap-1.5 h-9 px-4 bg-[#0E292F] text-white text-sm font-medium rounded-md hover:bg-[#0E292F]/90 transition-all font-sans"
      >
        <Plus className="w-3.5 h-3.5" /> Add property
      </button>
    )}
  </div>
);

// ─── Toast ─────────────────────────────────────────────────────────────────

const ToastNotification = ({
  toast, onClose,
}: { toast: Toast; onClose: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-5 right-5 z-50 flex items-center gap-3 bg-white border border-[#E5E7EB] shadow-sm rounded-lg px-4 py-3 min-w-[280px] animate-in slide-in-from-bottom-2 font-sans">
      <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
        toast.type === "success" ? "bg-[#F3F4F6] text-[#0E292F]" : "bg-[#FEF2F2] text-[#DC2626]"
      }`}>
        {toast.type === "success" ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
      </div>
      <p className="flex-1 text-sm text-[#0E292F] font-sans">{toast.message}</p>
      <button onClick={onClose} className="text-[#9CA3AF] hover:text-[#0E292F]">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

// ─── Success Modal ─────────────────────────────────────────────────────────

const SuccessModal = ({ onClose }: { onClose: () => void }) => (
  <div className="fixed inset-0 z-50 bg-[#0E292F]/40 backdrop-blur-sm flex items-center justify-center p-4 font-sans">
    <div className="bg-white rounded-2xl max-w-sm w-full p-8 text-center border border-[#E5E7EB]">
      <div className="w-14 h-14 mx-auto rounded-full bg-[#F3F4F6] flex items-center justify-center mb-5">
        <Check className="w-6 h-6 text-[#0E292F]" strokeWidth={2} />
      </div>
      <h3 className="text-2xl font-bold text-[#0E292F] tracking-tight font-sans">
        Property published
      </h3>
      <p className="text-sm text-[#6B6B66] mt-2 font-sans">
        Your listing is now live and visible to potential buyers.
      </p>
      <button
        onClick={onClose}
        className="mt-6 w-full h-10 bg-[#0E292F] text-white text-sm rounded-md hover:bg-[#0E292F]/90 transition-colors font-sans"
      >
        Continue
      </button>
    </div>
  </div>
);

// ─── Delete Confirm Modal ──────────────────────────────────────────────────

const DeleteConfirmModal = ({
  propertyTitle,
  onCancel,
  onConfirm,
  deleting,
}: {
  propertyTitle: string;
  onCancel: () => void;
  onConfirm: () => void;
  deleting: boolean;
}) => (
  <div className="fixed inset-0 z-50 bg-[#0E292F]/40 backdrop-blur-sm flex items-center justify-center p-4 font-sans">
    <div className="bg-white rounded-2xl max-w-sm w-full p-6 border border-[#E5E7EB] shadow-xl">
      <div className="w-10 h-10 mx-auto rounded-full bg-[#FEF2F2] flex items-center justify-center mb-4">
        <Trash2 className="w-4.5 h-4.5 text-[#DC2626]" />
      </div>
      <h3 className="text-base font-bold text-[#0E292F] text-center tracking-tight font-sans">
        Delete listing?
      </h3>
      <p className="text-sm text-[#6B6B66] text-center mt-1.5 font-sans leading-relaxed">
        <span className="font-semibold text-[#0E292F]">"{propertyTitle}"</span> will be permanently removed. This cannot be undone.
      </p>
      <div className="flex gap-2.5 mt-6">
        <button
          type="button"
          onClick={onCancel}
          disabled={deleting}
          className="flex-1 h-10 border border-[#E5E7EB] bg-white text-sm font-medium text-[#0E292F] rounded-md hover:bg-[#F3F4F6] transition-colors font-sans disabled:opacity-50"
        >
          Go back
        </button>
        <button
          type="button"
          onClick={onConfirm}
          disabled={deleting}
          className="flex-1 h-10 bg-[#DC2626] text-white text-sm font-medium rounded-md hover:bg-[#B91C1C] transition-colors font-sans disabled:opacity-50 inline-flex items-center justify-center gap-1.5"
        >
          {deleting
            ? <><RefreshCw className="w-3.5 h-3.5 animate-spin" /> Deleting…</>
            : "Delete listing"
          }
        </button>
      </div>
    </div>
  </div>
);

// ─── Badge helpers ─────────────────────────────────────────────────────────

const statusStyles: Record<string, string> = {
  available: "bg-[#F3F4F6] text-[#0E292F] border-[#E5E7EB]",
  pending:   "bg-[#FFFBEB] text-[#B45309] border-[#FEF3C7]",
  sold:      "bg-[#FEF2F2] text-[#DC2626] border-[#FECACA]",
  rented:    "bg-[#FFF7ED] text-[#C2410C] border-[#FED7AA]",
};

const typeStyles: Record<string, string> = {
  sale: "bg-white/95 text-[#0E292F] border-white",
  rent: "bg-white/95 text-[#0E292F] border-white",
  commercial: "bg-white/95 text-[#0E292F] border-white",
  land: "bg-white/95 text-[#0E292F] border-white",
};

const getStyle = (map: Record<string, string>, key: string) =>
  map[key] ?? "bg-[#F3F4F6] text-[#6B6B66] border-[#E5E7EB]";

// ─── Shared form primitives ────────────────────────────────────────────────

const inputCls =
  "px-3.5 h-10 border border-[#E5E7EB] rounded-md text-sm text-[#0E292F] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#0E292F] focus:ring-2 focus:ring-[#0E292F]/10 transition-all bg-white w-full font-sans";

const SectionLabel = ({ label }: { label: string }) => (
  <p className="text-[10px] uppercase tracking-[0.18em] text-[#9CA3AF] mb-3 font-sans font-bold">
    {label}
  </p>
);

const Field = ({
  label, required, children, className = "",
}: {
  label: string; required?: boolean; children: React.ReactNode; className?: string;
}) => (
  <div className={className}>
    <label className="block text-[11px] uppercase tracking-[0.14em] text-[#6B6B66] mb-1.5 font-sans font-semibold">
      {label}{required && <span className="text-[#DC2626] ml-0.5">*</span>}
    </label>
    {children}
  </div>
);

// ─── Main Component ────────────────────────────────────────────────────────

export default function PropertiesPage() {
  const [properties, setProperties]             = useState<any[]>([]);
  const [loading, setLoading]                   = useState(true);
  const [error, setError]                       = useState<string | null>(null);
  const [searchQuery, setSearchQuery]           = useState("");
  const [showModal, setShowModal]               = useState(false);
  const [formData, setFormData]                 = useState<PropertyFormData>(initialFormData);
  const [submitting, setSubmitting]             = useState(false);
  const [selectedType, setSelectedType]         = useState("all");
  const [selectedStatus, setSelectedStatus]     = useState("all");
  const [viewMode, setViewMode]                 = useState<"grid" | "list">("grid");
  const [toasts, setToasts]                     = useState<Toast[]>([]);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Delete modal state
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; title: string } | null>(null);
  const [deleting, setDeleting]         = useState(false);

  // Edit modal state
  const [showEditModal, setShowEditModal]       = useState(false);
  const [editingProperty, setEditingProperty]   = useState<any>(null);
  const [editFormData, setEditFormData]         = useState<PropertyFormData>(initialFormData);
  const [updating, setUpdating]                 = useState(false);

  // View modal state
  const [showViewModal, setShowViewModal]       = useState(false);
  const [viewingProperty, setViewingProperty]   = useState<any>(null);

  const addToast = (message: string, type: "success" | "error") => {
    const id = Math.random().toString(36).substring(7);
    setToasts((prev) => [...prev, { id, message, type }]);
  };

  const removeToast = (id: string) =>
    setToasts((prev) => prev.filter((t) => t.id !== id));

  const fetchProperties = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getAllProperties();
      const mapped = (data || []).map((p: any) => ({
        ...p,
        type: p.listing_type || "sale",
      }));
      setProperties(mapped);
    } catch (err: any) {
      setError(err.message || "Failed to load properties");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchProperties(); }, [fetchProperties]);

  useEffect(() => {
    const unsubscribe = subscribeToProperties(
      (p) => setProperties((prev) => [{ ...p, type: p.listing_type || "sale" }, ...prev]),
      (p) => setProperties((prev) => prev.map((x) => x.id === p.id ? { ...p, type: p.listing_type || "sale" } : x)),
      ({ id }) => setProperties((prev) => prev.filter((p) => p.id !== id)),
    );
    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const property = await createProperty({
        title:       formData.title,
        description: formData.description,
        price:       parseFloat(formData.price),
        type:        formData.type,
        bedrooms:    parseInt(formData.bedrooms) || 0,
        bathrooms:   parseInt(formData.bathrooms) || 0,
        area_sqft:   formData.area ? parseFloat(formData.area) : undefined,
        latitude:    6.5244,
        longitude:   3.3792,
        address:     formData.address,
        city:        formData.city,
        state:       formData.state,
        country:     formData.country,
      });
      if (formData.imageFiles.length > 0) {
        await uploadPropertyImages(property.id, formData.imageFiles, 0);
      }
      setShowModal(false);
      setFormData(initialFormData);
      setShowSuccessModal(true);
      fetchProperties();
    } catch (err: any) {
      addToast(err.message || "Failed to create property", "error");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await deleteProperty(deleteTarget.id);
      setProperties((prev) => prev.filter((p) => p.id !== deleteTarget.id));
      addToast("Property deleted", "success");
      setDeleteTarget(null);
    } catch {
      addToast("Failed to delete property", "error");
    } finally {
      setDeleting(false);
    }
  };

  const openViewModal = (property: any) => {
    setViewingProperty(property);
    setShowViewModal(true);
  };

  const openEditModal = (property: any) => {
    setEditingProperty(property);
    setEditFormData({
      title: property.title || "",
      description: property.description || "",
      price: property.price?.toString() || "",
      type: property.listing_type || "sale",
      bedrooms: property.bedrooms?.toString() || "",
      bathrooms: property.bathrooms?.toString() || "",
      area: property.area_sqft?.toString() || "",
      address: property.address || "",
      city: property.city || "",
      state: property.state || "",
      country: property.country || "Nigeria",
      imageFiles: [],
    });
    setShowEditModal(true);
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProperty) return;
    setUpdating(true);
    try {
      await updateProperty(editingProperty.id, {
        title: editFormData.title,
        description: editFormData.description,
        price: parseFloat(editFormData.price),
        listing_type: editFormData.type,
        bedrooms: parseInt(editFormData.bedrooms) || 0,
        bathrooms: parseInt(editFormData.bathrooms) || 0,
        area_sqft: editFormData.area ? parseFloat(editFormData.area) : undefined,
        address: editFormData.address,
        city: editFormData.city,
        state: editFormData.state,
        country: editFormData.country,
        status: editingProperty.status,
      });
      setShowEditModal(false);
      setEditingProperty(null);
      setEditFormData(initialFormData);
      addToast("Property updated successfully", "success");
      fetchProperties();
    } catch (err: any) {
      addToast(err.message || "Failed to update property", "error");
    } finally {
      setUpdating(false);
    }
  };

  const filteredProperties = properties.filter((p) => {
    if (selectedType !== "all" && p.type !== selectedType) return false;
    if (selectedStatus !== "all" && p.status !== selectedStatus) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        (p.title   || "").toLowerCase().includes(q) ||
        (p.city    || "").toLowerCase().includes(q) ||
        (p.address || "").toLowerCase().includes(q)
      );
    }
    return true;
  });

  const stats = useMemo(() => ({
    total:       properties.length,
    available:   properties.filter((p) => p.status === "available").length,
    forSale:     properties.filter((p) => p.type === "sale").length,
    forRent:     properties.filter((p) => p.type === "rent").length,
    commercial:  properties.filter((p) => p.type === "commercial").length,
    land:        properties.filter((p) => p.type === "land").length,
  }), [properties]);

  const isFiltered = !!searchQuery || selectedType !== "all" || selectedStatus !== "all";

  // ── Loading ──
  if (loading) {
    return (
      <div className="space-y-8 font-sans">
        <div className="space-y-3">
          <ShimmerBlock className="h-3 w-24" />
          <ShimmerBlock className="h-10 w-64" />
        </div>
        <ShimmerGrid />
      </div>
    );
  }

  // ── Error ──
  if (error) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center font-sans">
        <div className="text-center max-w-sm">
          <div className="w-12 h-12 mx-auto rounded-full bg-[#FEF2F2] flex items-center justify-center mb-4">
            <X className="w-5 h-5 text-[#DC2626]" />
          </div>
          <h2 className="text-2xl font-bold text-[#0E292F] tracking-tight font-sans">Failed to load</h2>
          <p className="text-sm text-[#6B6B66] mt-2 font-sans">{error}</p>
          <button
            onClick={fetchProperties}
            className="mt-5 inline-flex items-center gap-2 h-9 px-4 bg-[#0E292F] text-white text-sm rounded-md hover:bg-[#0E292F]/90 transition-colors font-sans"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 font-sans antialiased selection:bg-[#0E292F]/10">

      {/* Toasts */}
      {toasts.map((toast) => (
        <ToastNotification key={toast.id} toast={toast} onClose={() => removeToast(toast.id)} />
      ))}

      {showSuccessModal && <SuccessModal onClose={() => setShowSuccessModal(false)} />}

      {/* Delete Confirm Modal */}
      {deleteTarget && (
        <DeleteConfirmModal
          propertyTitle={deleteTarget.title}
          onCancel={() => setDeleteTarget(null)}
          onConfirm={handleDeleteConfirm}
          deleting={deleting}
        />
      )}

      {/* ── Header ── */}
      <header className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
        <div>
          <p className="text-[10px] uppercase tracking-[0.18em] text-[#9CA3AF] font-bold">Listings</p>
          <h1 className="text-2xl lg:text-3xl font-bold tracking-tight text-gray-800 mt-1 font-sans">Properties</h1>
          <p className="text-xs text-[#6B6B66] mt-1 font-sans">Manage all your active listings.</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={fetchProperties}
            className="inline-flex items-center gap-1.5 h-8 px-3 border border-[#E5E7EB] bg-white text-xs text-gray-700 rounded-md hover:bg-[#F3F4F6] transition-colors font-sans"
          >
            <RefreshCw className="w-3 h-3" /> Refresh
          </button>
          <button
            onClick={() => setShowModal(true)}
            className="inline-flex items-center gap-1.5 h-8 px-3.5 bg-[#0E292F] text-white text-xs font-medium rounded-md hover:bg-[#0E292F]/90 transition-all font-sans"
          >
            <Plus className="w-3 h-3" /> Add listing
          </button>
        </div>
      </header>

      {/* ── Stats ── */}
      <section className="grid grid-cols-2 lg:grid-cols-6 border border-[#E5E7EB] rounded-xl overflow-hidden bg-white shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
        {[
          { label: "Total",       value: stats.total,      sub: "All listings" },
          { label: "Available",   value: stats.available,  sub: "Ready to view" },
          { label: "For sale",    value: stats.forSale,    sub: "Sale listings" },
          { label: "For rent",    value: stats.forRent,    sub: "Rental listings" },
          { label: "Commercial",  value: stats.commercial, sub: "Commercial" },
          { label: "Land",        value: stats.land,       sub: "Land plots" },
        ].map(({ label, value, sub }, index) => (
          <div
            key={label}
            className={`py-4 px-4 bg-white font-sans ${index !== 5 ? "border-r border-[#E5E7EB]" : ""} ${index >= 2 ? "max-sm:border-t max-sm:border-[#E5E7EB]" : ""}`}
          >
            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider font-sans">{label}</p>
            <p className="text-2xl font-bold text-gray-800 mt-1 tracking-tight font-sans">{value}</p>
            <p className="text-[10px] text-[#A3A3A3] mt-1 font-sans">{sub}</p>
          </div>
        ))}
      </section>

      {/* ── Filters ── */}
      <div className="flex flex-col lg:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
          <input
            type="text"
            placeholder="Search by title, city, or address…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 h-9 border border-[#E5E7EB] rounded-md text-sm text-[#0E292F] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#0E292F] focus:ring-2 focus:ring-[#0E292F]/10 transition-all bg-white font-sans"
          />
        </div>
        <div className="flex gap-2">
            <div className="relative">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="appearance-none pl-3.5 pr-8 h-9 border border-[#E5E7EB] rounded-md text-xs bg-white text-gray-700 focus:outline-none focus:border-[#0E292F] cursor-pointer font-sans"
            >
              <option value="all">All types</option>
              <option value="sale">For sale</option>
              <option value="rent">For rent</option>
              <option value="commercial">Commercial</option>
              <option value="land">Land</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-[#9CA3AF] pointer-events-none" />
          </div>
          <div className="relative">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="appearance-none pl-3.5 pr-8 h-9 border border-[#E5E7EB] rounded-md text-xs bg-white text-gray-700 focus:outline-none focus:border-[#0E292F] cursor-pointer font-sans"
            >
              <option value="all">All statuses</option>
              <option value="available">Available</option>
              <option value="pending">Pending</option>
              <option value="sold">Sold</option>
              <option value="rented">Rented</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-[#9CA3AF] pointer-events-none" />
          </div>
          <div className="flex border border-[#E5E7EB] rounded-md overflow-hidden bg-white">
            <button
              onClick={() => setViewMode("grid")}
              className={`px-2.5 h-9 transition-colors ${viewMode === "grid" ? "bg-[#0E292F] text-white" : "text-[#9CA3AF] hover:text-[#0E292F]"}`}
            >
              <Grid3x3 className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`px-2.5 h-9 transition-colors ${viewMode === "list" ? "bg-[#0E292F] text-white" : "text-[#9CA3AF] hover:text-[#0E292F]"}`}
            >
              <List className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {filteredProperties.length > 0 && (
        <p className="text-[10px] uppercase tracking-[0.14em] text-[#9CA3AF] font-semibold font-sans">
          Showing {filteredProperties.length} of {properties.length} listings
        </p>
      )}

      {/* ── Empty State ── */}
      {filteredProperties.length === 0 && (
        <PropertiesEmptyState filtered={isFiltered} onAdd={() => setShowModal(true)} />
      )}

      {/* ── Grid View ── */}
      {filteredProperties.length > 0 && viewMode === "grid" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredProperties.map((property) => (
            <article
              key={property.id}
              className="group bg-white border border-[#E5E7EB] rounded-xl overflow-hidden hover:border-[#0E292F]/20 hover:shadow-[0_4px_16px_-8px_rgba(14,41,47,0.06)] transition-all font-sans"
            >
              <div className="relative h-48 bg-[#F3F4F6] overflow-hidden">
                {property.property_images?.[0]?.url ? (
                  <img
                    src={property.property_images[0].url}
                    alt={property.title}
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <ImageIcon className="w-7 h-7 text-[#9CA3AF]" strokeWidth={1.5} />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E292F]/60 via-transparent to-transparent" />
                <div className="absolute top-3 left-3 flex gap-1.5">
                  <span className={`px-2 py-0.5 text-[10px] uppercase tracking-wide font-semibold border rounded-full ${getStyle(statusStyles, property.status)}`}>
                    {property.status}
                  </span>
                  <span className={`px-2 py-0.5 text-[10px] uppercase tracking-wide font-semibold border rounded-full ${getStyle(typeStyles, property.type)}`}>
                    {property.type === "sale" ? "For sale" : property.type === "rent" ? "For rent" : property.type === "commercial" ? "Commercial" : property.type === "land" ? "Land" : property.type}
                  </span>
                </div>
                <div className="absolute bottom-3 left-3 right-3">
                  <p className="text-xl font-bold text-white tracking-tight drop-shadow font-sans">
                    ₦{Number(property.price).toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="p-4">
                <h3 className="text-base font-bold text-[#0E292F] tracking-tight leading-tight line-clamp-1 font-sans">
                  {property.title}
                </h3>
                <p className="flex items-center gap-1 text-xs text-[#6B6B66] mt-1 truncate font-sans">
                  <MapPin className="w-3 h-3 shrink-0 text-[#9CA3AF]" />
                  {[property.address, property.city, property.state].filter(Boolean).join(", ") || "—"}
                </p>
                <div className="flex items-center justify-between mt-3.5 pt-3.5 border-t border-[#E5E7EB]">
                  <div className="flex items-center gap-2.5 text-xs text-[#6B6B66] font-sans">
                    <span className="inline-flex items-center gap-1">
                      <BedDouble className="w-3.5 h-3.5 text-[#9CA3AF]" /> {property.bedrooms}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Bath className="w-3.5 h-3.5 text-[#9CA3AF]" /> {property.bathrooms}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Maximize className="w-3.5 h-3.5 text-[#9CA3AF]" /> {property.area_sqft ?? "—"}
                    </span>
                  </div>
                  <div className="flex items-center gap-0.5">
                    <button
                      onClick={() => openViewModal(property)}
                      className="p-1.5 rounded-md text-[#9CA3AF] hover:text-[#0E292F] hover:bg-[#F3F4F6] transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => openEditModal(property)}
                      className="p-1.5 rounded-md text-[#9CA3AF] hover:text-[#0E292F] hover:bg-[#F3F4F6] transition-colors"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setDeleteTarget({ id: property.id, title: property.title })}
                      className="p-1.5 rounded-md text-[#9CA3AF] hover:text-[#DC2626] hover:bg-[#FEF2F2] transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* ── List View ── */}
      {filteredProperties.length > 0 && viewMode === "list" && (
        <div className="bg-white border border-[#E5E7EB] rounded-xl overflow-hidden font-sans shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#E5E7EB] bg-[#FAFAFA]">
                {["Property", "Type", "Status", "Price", "Details", ""].map((h) => (
                  <th key={h} className="text-left text-[10px] uppercase tracking-[0.14em] text-[#9CA3AF] font-bold px-4 py-2.5 font-sans">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E7EB]">
              {filteredProperties.map((property) => (
                <tr key={property.id} className="hover:bg-[#FAFAFA] transition-colors">
                  <td className="px-4 py-2.5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-md bg-[#F3F4F6] overflow-hidden shrink-0">
                        {property.property_images?.[0]?.url
                          ? <img src={property.property_images[0].url} alt="" className="w-full h-full object-cover" />
                          : <div className="w-full h-full flex items-center justify-center"><ImageIcon className="w-3.5 h-3.5 text-[#9CA3AF]" /></div>
                        }
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-[#0E292F] truncate font-sans">{property.title}</p>
                        <p className="text-xs text-[#9CA3AF] font-sans">{property.city || "—"}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-2.5">
                    <span className={`px-2 py-0.5 text-[10px] uppercase tracking-wide border font-semibold rounded-full ${getStyle(typeStyles, property.type)}`}>
                      {property.type}
                    </span>
                  </td>
                  <td className="px-4 py-2.5">
                    <span className={`px-2 py-0.5 text-[10px] uppercase tracking-wide border font-semibold rounded-full ${getStyle(statusStyles, property.status)}`}>
                      {property.status}
                    </span>
                  </td>
                  <td className="px-4 py-2.5 text-sm font-bold text-[#0E292F] font-sans">
                    ₦{Number(property.price).toLocaleString()}
                  </td>
                  <td className="px-4 py-2.5 text-xs text-[#6B6B66] font-sans">
                    {property.bedrooms} bd · {property.bathrooms} ba · {property.area_sqft ?? "—"} sqft
                  </td>
                  <td className="px-4 py-2.5">
                    <div className="flex items-center justify-end gap-0.5">
                      <button
                        onClick={() => openViewModal(property)}
                        className="p-1.5 rounded-md text-[#9CA3AF] hover:text-[#0E292F] hover:bg-[#F3F4F6]"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => openEditModal(property)}
                        className="p-1.5 rounded-md text-[#9CA3AF] hover:text-[#0E292F] hover:bg-[#F3F4F6]"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setDeleteTarget({ id: property.id, title: property.title })}
                        className="p-1.5 rounded-md text-[#9CA3AF] hover:text-[#DC2626] hover:bg-[#FEF2F2]"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ── View Property Modal ── */}
      {showViewModal && viewingProperty && (
        <div className="fixed inset-0 z-50 bg-[#0E292F]/40 backdrop-blur-sm flex items-center justify-center p-4 font-sans">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[92vh] flex flex-col border border-[#E5E7EB] shadow-2xl">
            {/* Modal header */}
            <div className="flex items-start justify-between px-7 py-5 border-b border-[#E5E7EB] shrink-0">
              <div>
                <p className="text-[10px] uppercase tracking-[0.18em] text-[#9CA3AF] font-bold">Viewing</p>
                <h2 className="text-2xl font-bold text-[#0E292F] tracking-tight mt-0.5 font-sans">{viewingProperty.title}</h2>
                <p className="text-xs text-[#6B6B66] mt-1 font-sans">Property details and information</p>
              </div>
              <button
                type="button"
                onClick={() => { setShowViewModal(false); setViewingProperty(null); }}
                className="w-8 h-8 rounded-md border border-[#E5E7EB] bg-white hover:bg-[#F3F4F6] flex items-center justify-center text-[#6B6B66] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="overflow-y-auto px-7 py-6 flex-1">
              {/* Image gallery */}
              {viewingProperty.property_images && viewingProperty.property_images.length > 0 && (
                <div className="mb-6">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {viewingProperty.property_images.map((img: any, idx: number) => (
                      <div key={img.id || idx} className={`relative rounded-xl overflow-hidden ${idx === 0 ? 'col-span-2 md:col-span-2 md:row-span-2' : ''}`}>
                        <img
                          src={img.url}
                          alt={`${viewingProperty.title} - ${idx + 1}`}
                          className="w-full h-full object-cover"
                          style={{ minHeight: idx === 0 ? '300px' : '150px' }}
                        />
                        {idx === 0 && (
                          <div className="absolute top-2 left-2">
                            <span className="px-2 py-1 bg-[#0E292F] text-white text-[10px] uppercase tracking-wider font-semibold rounded-md">Primary</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Price and status badges */}
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className="text-3xl font-bold text-[#0E292F] tracking-tight font-sans">
                  ₦{Number(viewingProperty.price).toLocaleString()}
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold border capitalize ${getStyle(statusStyles, viewingProperty.status)}`}>
                  {viewingProperty.status}
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold border capitalize ${getStyle(typeStyles, viewingProperty.type)}`}>
                  {viewingProperty.type === "sale" ? "For Sale" : viewingProperty.type === "rent" ? "For Rent" : viewingProperty.type === "commercial" ? "Commercial" : viewingProperty.type === "land" ? "Land" : viewingProperty.type}
                </span>
              </div>

              {/* Description */}
              {viewingProperty.description && (
                <div className="mb-6">
                  <SectionLabel label="Description" />
                  <p className="text-sm text-[#6B6B66] leading-relaxed font-sans whitespace-pre-wrap">
                    {viewingProperty.description}
                  </p>
                </div>
              )}

              {/* Two column layout for details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Location */}
                <div>
                  <SectionLabel label="Location" />
                  <div className="bg-[#F9FAFB] rounded-xl p-4 border border-[#E5E7EB]">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-[#0E292F] shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-semibold text-[#0E292F] font-sans">
                          {[viewingProperty.address, viewingProperty.city, viewingProperty.state, viewingProperty.country].filter(Boolean).join(", ") || "—"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Property specs */}
                <div>
                  <SectionLabel label="Property details" />
                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-[#F9FAFB] rounded-xl p-3 border border-[#E5E7EB] text-center">
                      <BedDouble className="w-5 h-5 text-[#0E292F] mx-auto mb-1.5" />
                      <p className="text-lg font-bold text-[#0E292F] font-sans">{viewingProperty.bedrooms}</p>
                      <p className="text-[10px] uppercase tracking-wider text-[#9CA3AF] font-semibold">Bedrooms</p>
                    </div>
                    <div className="bg-[#F9FAFB] rounded-xl p-3 border border-[#E5E7EB] text-center">
                      <Bath className="w-5 h-5 text-[#0E292F] mx-auto mb-1.5" />
                      <p className="text-lg font-bold text-[#0E292F] font-sans">{viewingProperty.bathrooms}</p>
                      <p className="text-[10px] uppercase tracking-wider text-[#9CA3AF] font-semibold">Bathrooms</p>
                    </div>
                    <div className="bg-[#F9FAFB] rounded-xl p-3 border border-[#E5E7EB] text-center">
                      <Maximize className="w-5 h-5 text-[#0E292F] mx-auto mb-1.5" />
                      <p className="text-lg font-bold text-[#0E292F] font-sans">{viewingProperty.area_sqft || "—"}</p>
                      <p className="text-[10px] uppercase tracking-wider text-[#9CA3AF] font-semibold">Sqft</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional info */}
              <div className="mt-6 pt-6 border-t border-[#E5E7EB]">
                <SectionLabel label="Additional information" />
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-[#9CA3AF] font-semibold mb-1">Property ID</p>
                    <p className="text-xs text-[#6B6B66] font-mono font-sans">{viewingProperty.id}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-[#9CA3AF] font-semibold mb-1">Listed on</p>
                    <p className="text-xs text-[#6B6B66] font-sans">
                      {viewingProperty.created_at ? new Date(viewingProperty.created_at).toLocaleDateString('en-NG', { year: 'numeric', month: 'short', day: 'numeric' }) : "—"}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-[#9CA3AF] font-semibold mb-1">Last updated</p>
                    <p className="text-xs text-[#6B6B66] font-sans">
                      {viewingProperty.updated_at ? new Date(viewingProperty.updated_at).toLocaleDateString('en-NG', { year: 'numeric', month: 'short', day: 'numeric' }) : "—"}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-[#9CA3AF] font-semibold mb-1">Images</p>
                    <p className="text-xs text-[#6B6B66] font-sans">{viewingProperty.property_images?.length || 0} photos</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal footer */}
            <div className="px-7 py-4 border-t border-[#E5E7EB] bg-gray-50/50 flex items-center justify-end gap-3 shrink-0">
              <button
                type="button"
                onClick={() => { setShowViewModal(false); setViewingProperty(null); }}
                className="h-10 px-4 border border-[#E5E7EB] bg-white text-sm font-medium text-[#0E292F] rounded-md hover:bg-gray-50 transition-colors font-sans"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => { setShowViewModal(false); setViewingProperty(null); openEditModal(viewingProperty); }}
                className="h-10 px-5 bg-[#0E292F] text-white text-sm font-medium rounded-md hover:bg-[#0E292F]/90 transition-colors font-sans inline-flex items-center gap-2"
              >
                <Edit className="w-3.5 h-3.5" />
                Edit listing
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Edit Property Modal ── */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 bg-[#0E292F]/40 backdrop-blur-sm flex items-center justify-center p-4 font-sans">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[92vh] flex flex-col border border-[#E5E7EB] shadow-2xl">
            {/* Modal header */}
            <div className="flex items-start justify-between px-7 py-5 border-b border-[#E5E7EB] shrink-0">
              <div>
                <p className="text-[10px] uppercase tracking-[0.18em] text-[#9CA3AF] font-bold">Edit</p>
                <h2 className="text-2xl font-bold text-[#0E292F] tracking-tight mt-0.5 font-sans">Update listing</h2>
                <p className="text-xs text-[#6B6B66] mt-1 font-sans">Modify the property details below.</p>
              </div>
              <button
                type="button"
                onClick={() => { setShowEditModal(false); setEditingProperty(null); setEditFormData(initialFormData); }}
                className="w-8 h-8 rounded-md border border-[#E5E7EB] bg-white hover:bg-[#F3F4F6] flex items-center justify-center text-[#6B6B66] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="flex flex-col flex-1 min-h-0">
              <div className="overflow-y-auto px-7 py-6 space-y-7 flex-1">

                {/* ── Basic Info ── */}
                <div>
                  <SectionLabel label="Basic info" />
                  <div className="space-y-4">
                    <Field label="Listing title" required>
                      <input
                        type="text" required placeholder="e.g. Luxury Penthouse with Ocean View"
                        value={editFormData.title}
                        onChange={(e) => setEditFormData({ ...editFormData, title: e.target.value })}
                        className={inputCls}
                      />
                    </Field>
                    <Field label="Description">
                      <textarea
                        rows={3} placeholder="Write a compelling description of the property…"
                        value={editFormData.description}
                        onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value })}
                        className={`${inputCls} h-auto py-2.5 resize-none`}
                      />
                    </Field>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Field label="Price (₦)" required>
                        <div className="relative">
                          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-[#9CA3AF] font-semibold pointer-events-none select-none font-sans">₦</span>
                          <input
                            type="number" required min="0" placeholder="0"
                            value={editFormData.price}
                            onChange={(e) => setEditFormData({ ...editFormData, price: e.target.value })}
                            className={`${inputCls} pl-8`}
                          />
                        </div>
                      </Field>
                      <Field label="Listing type" required>
                        <div className="grid grid-cols-2 gap-2">
                          {[
                            { value: "sale", label: "For Sale", icon: "💰", desc: "Sell property" },
                            { value: "rent", label: "For Rent", icon: "🔑", desc: "Lease property" },
                            { value: "commercial", label: "Commercial", icon: "🏢", desc: "Business space" },
                            { value: "land", label: "Land", icon: "🌳", desc: "Plot of land" },
                          ].map(({ value, label, icon, desc }) => (
                            <button
                              key={value}
                              type="button"
                              onClick={() => setEditFormData({ ...editFormData, type: value })}
                              className={`relative flex flex-col items-center justify-center p-3.5 rounded-xl border-2 transition-all duration-200 font-sans ${
                                editFormData.type === value
                                  ? "border-[#0E292F] bg-[#0E292F] text-white shadow-lg shadow-[#0E292F]/10 scale-[1.02]"
                                  : "border-[#E5E7EB] bg-white text-[#6B6B66] hover:border-[#0E292F]/20 hover:bg-[#F9FAFB] hover:scale-[1.01]"
                              }`}
                            >
                              <span className="text-2xl mb-1.5">{icon}</span>
                              <span className={`text-xs font-bold tracking-tight ${editFormData.type === value ? "text-white" : "text-[#0E292F]"}`}>
                                {label}
                              </span>
                              <span className={`text-[10px] mt-0.5 font-medium ${editFormData.type === value ? "text-white/70" : "text-[#9CA3AF]"}`}>
                                {desc}
                              </span>
                              {editFormData.type === value && (
                                <div className="absolute top-2 right-2 w-5 h-5 bg-white rounded-full flex items-center justify-center">
                                  <Check className="w-3 h-3 text-[#0E292F]" strokeWidth={3} />
                                </div>
                              )}
                            </button>
                          ))}
                        </div>
                      </Field>
                    </div>
                  </div>
                </div>

                {/* ── Location ── */}
                <div>
                  <SectionLabel label="Location" />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="Street address" className="sm:col-span-2">
                      <input
                        type="text" placeholder="123 Marina Drive"
                        value={editFormData.address}
                        onChange={(e) => setEditFormData({ ...editFormData, address: e.target.value })}
                        className={inputCls}
                      />
                    </Field>
                    <Field label="City">
                      <input
                        type="text" placeholder="Lagos"
                        value={editFormData.city}
                        onChange={(e) => setEditFormData({ ...editFormData, city: e.target.value })}
                        className={inputCls}
                      />
                    </Field>
                    <Field label="State">
                      <input
                        type="text" placeholder="Lagos State"
                        value={editFormData.state}
                        onChange={(e) => setEditFormData({ ...editFormData, state: e.target.value })}
                        className={inputCls}
                      />
                    </Field>
                    <Field label="Country">
                      <input
                        type="text" placeholder="Nigeria"
                        value={editFormData.country}
                        onChange={(e) => setEditFormData({ ...editFormData, country: e.target.value })}
                        className={inputCls}
                      />
                    </Field>
                  </div>
                </div>

                {/* ── Property Details ── */}
                <div>
                  <SectionLabel label="Property details" />
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <Field label="Bedrooms">
                      <div className="relative">
                        <BedDouble className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
                        <input
                          type="number" min="0" placeholder="3"
                          value={editFormData.bedrooms}
                          onChange={(e) => setEditFormData({ ...editFormData, bedrooms: e.target.value })}
                          className={`${inputCls} pl-9`}
                        />
                      </div>
                    </Field>
                    <Field label="Bathrooms">
                      <div className="relative">
                        <Bath className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
                        <input
                          type="number" min="0" placeholder="2"
                          value={editFormData.bathrooms}
                          onChange={(e) => setEditFormData({ ...editFormData, bathrooms: e.target.value })}
                          className={`${inputCls} pl-9`}
                        />
                      </div>
                    </Field>
                    <Field label="Area (sqft)">
                      <div className="relative">
                        <Maximize className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
                        <input
                          type="number" min="0" placeholder="1500"
                          value={editFormData.area}
                          onChange={(e) => setEditFormData({ ...editFormData, area: e.target.value })}
                          className={`${inputCls} pl-9`}
                        />
                      </div>
                    </Field>
                  </div>
                </div>

              </div>

              {/* Modal footer */}
              <div className="px-7 py-4 border-t border-[#E5E7EB] bg-gray-50/50 flex items-center justify-end gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => { setShowEditModal(false); setEditingProperty(null); setEditFormData(initialFormData); }}
                  className="h-10 px-4 border border-[#E5E7EB] bg-white text-sm font-medium text-[#0E292F] rounded-md hover:bg-gray-50 transition-colors font-sans"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={updating}
                  className="h-10 px-5 bg-[#0E292F] text-white text-sm font-medium rounded-md hover:bg-[#0E292F]/90 transition-colors font-sans disabled:opacity-50 inline-flex items-center gap-2"
                >
                  {updating
                    ? <><RefreshCw className="w-3.5 h-3.5 animate-spin" /> Updating…</>
                    : "Save changes"
                  }
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Add Property Modal ── */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-[#0E292F]/40 backdrop-blur-sm flex items-center justify-center p-4 font-sans">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[92vh] flex flex-col border border-[#E5E7EB] shadow-2xl">

            {/* Modal header */}
            <div className="flex items-start justify-between px-7 py-5 border-b border-[#E5E7EB] shrink-0">
              <div>
                <p className="text-[10px] uppercase tracking-[0.18em] text-[#9CA3AF] font-bold">Create</p>
                <h2 className="text-2xl font-bold text-[#0E292F] tracking-tight mt-0.5 font-sans">New listing</h2>
                <p className="text-xs text-[#6B6B66] mt-1 font-sans">Fill in the details to publish a property.</p>
              </div>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="w-8 h-8 rounded-md border border-[#E5E7EB] bg-white hover:bg-[#F3F4F6] flex items-center justify-center text-[#6B6B66] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col flex-1 min-h-0">
              <div className="overflow-y-auto px-7 py-6 space-y-7 flex-1">

                {/* ── Basic Info ── */}
                <div>
                  <SectionLabel label="Basic info" />
                  <div className="space-y-4">
                    <Field label="Listing title" required>
                      <input
                        type="text" required placeholder="e.g. Luxury Penthouse with Ocean View"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className={inputCls}
                      />
                    </Field>
                    <Field label="Description">
                      <textarea
                        rows={3} placeholder="Write a compelling description of the property…"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className={`${inputCls} h-auto py-2.5 resize-none`}
                      />
                    </Field>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Field label="Price (₦)" required>
                        <div className="relative">
                          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-[#9CA3AF] font-semibold pointer-events-none select-none font-sans">₦</span>
                          <input
                            type="number" required min="0" placeholder="0"
                            value={formData.price}
                            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                            className={`${inputCls} pl-8`}
                          />
                        </div>
                      </Field>
                      <Field label="Listing type" required>
                        <div className="grid grid-cols-2 gap-2">
                          {[
                            { value: "sale", label: "For Sale", icon: "💰", desc: "Sell property" },
                            { value: "rent", label: "For Rent", icon: "🔑", desc: "Lease property" },
                            { value: "commercial", label: "Commercial", icon: "🏢", desc: "Business space" },
                            { value: "land", label: "Land", icon: "🌳", desc: "Plot of land" },
                          ].map(({ value, label, icon, desc }) => (
                            <button
                              key={value}
                              type="button"
                              onClick={() => setFormData({ ...formData, type: value })}
                              className={`relative flex flex-col items-center justify-center p-3.5 rounded-xl border-2 transition-all duration-200 font-sans ${
                                formData.type === value
                                  ? "border-[#0E292F] bg-[#0E292F] text-white shadow-lg shadow-[#0E292F]/10 scale-[1.02]"
                                  : "border-[#E5E7EB] bg-white text-[#6B6B66] hover:border-[#0E292F]/20 hover:bg-[#F9FAFB] hover:scale-[1.01]"
                              }`}
                            >
                              <span className="text-2xl mb-1.5">{icon}</span>
                              <span className={`text-xs font-bold tracking-tight ${formData.type === value ? "text-white" : "text-[#0E292F]"}`}>
                                {label}
                              </span>
                              <span className={`text-[10px] mt-0.5 font-medium ${formData.type === value ? "text-white/70" : "text-[#9CA3AF]"}`}>
                                {desc}
                              </span>
                              {formData.type === value && (
                                <div className="absolute top-2 right-2 w-5 h-5 bg-white rounded-full flex items-center justify-center">
                                  <Check className="w-3 h-3 text-[#0E292F]" strokeWidth={3} />
                                </div>
                              )}
                            </button>
                          ))}
                        </div>
                      </Field>
                    </div>
                  </div>
                </div>

                {/* ── Location ── */}
                <div>
                  <SectionLabel label="Location" />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="Street address" className="sm:col-span-2">
                      <input
                        type="text" placeholder="123 Marina Drive"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        className={inputCls}
                      />
                    </Field>
                    <Field label="City">
                      <input
                        type="text" placeholder="Lagos"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className={inputCls}
                      />
                    </Field>
                    <Field label="State">
                      <input
                        type="text" placeholder="Lagos State"
                        value={formData.state}
                        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                        className={inputCls}
                      />
                    </Field>
                    <Field label="Country">
                      <input
                        type="text" placeholder="Nigeria"
                        value={formData.country}
                        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                        className={inputCls}
                      />
                    </Field>
                  </div>
                </div>

                {/* ── Property Details ── */}
                <div>
                  <SectionLabel label="Property details" />
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <Field label="Bedrooms">
                      <div className="relative">
                        <BedDouble className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
                        <input
                          type="number" min="0" placeholder="3"
                          value={formData.bedrooms}
                          onChange={(e) => setFormData({ ...formData, bedrooms: e.target.value })}
                          className={`${inputCls} pl-9`}
                        />
                      </div>
                    </Field>
                    <Field label="Bathrooms">
                      <div className="relative">
                        <Bath className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
                        <input
                          type="number" min="0" placeholder="2"
                          value={formData.bathrooms}
                          onChange={(e) => setFormData({ ...formData, bathrooms: e.target.value })}
                          className={`${inputCls} pl-9`}
                        />
                      </div>
                    </Field>
                    <Field label="Area (sqft)">
                      <div className="relative">
                        <Maximize className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
                        <input
                          type="number" min="0" placeholder="1500"
                          value={formData.area}
                          onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                          className={`${inputCls} pl-9`}
                        />
                      </div>
                    </Field>
                  </div>
                </div>

                {/* ── Images ── */}
                <div>
                  <SectionLabel label="Property images" />
                  <label className="group cursor-pointer block">
                    <div className="w-full py-8 px-4 border-2 border-dashed border-[#E5E7EB] rounded-xl text-center hover:border-[#0E292F]/30 hover:bg-[#F9FAFB] transition-all duration-200">
                      <div className="w-11 h-11 mx-auto rounded-xl bg-[#F3F4F6] flex items-center justify-center mb-3 group-hover:bg-[#E5E7EB] transition-colors">
                        <Upload className="w-5 h-5 text-[#6B6B66]" />
                      </div>
                      <p className="text-sm font-semibold text-[#0E292F] font-sans">
                        {formData.imageFiles.length > 0
                          ? `${formData.imageFiles.length} file${formData.imageFiles.length > 1 ? "s" : ""} selected`
                          : "Click to upload images"}
                      </p>
                      <p className="text-xs text-[#9CA3AF] mt-1 font-sans">JPG, PNG, WebP — select multiple at once</p>
                    </div>
                    <input
                      type="file" multiple accept="image/*"
                      onChange={(e) => {
                        const newFiles = Array.from(e.target.files || []);
                        if (newFiles.length > 0) {
                          setFormData((prev) => ({ ...prev, imageFiles: [...prev.imageFiles, ...newFiles] }));
                        }
                        e.target.value = "";
                      }}
                      className="hidden"
                    />
                  </label>

                  {formData.imageFiles.length > 0 && (
                    <div className="flex gap-2 mt-3 flex-wrap">
                      {formData.imageFiles.map((file, i) => (
                        <div
                          key={`${file.name}-${i}`}
                          className="relative w-16 h-16 rounded-lg bg-[#F3F4F6] overflow-hidden border border-[#E5E7EB] group/img"
                        >
                          <img src={URL.createObjectURL(file)} alt="" className="w-full h-full object-cover" />
                          <button
                            type="button"
                            onClick={() => setFormData((prev) => ({ ...prev, imageFiles: prev.imageFiles.filter((_, idx) => idx !== i) }))}
                            className="absolute top-0.5 right-0.5 w-5 h-5 rounded-full bg-[#0E292F] text-white flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity hover:bg-[#DC2626]"
                          >
                            <X className="w-2.5 h-2.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

              </div>

              {/* Modal footer */}
              <div className="px-7 py-4 border-t border-[#E5E7EB] bg-gray-50/50 flex items-center justify-end gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="h-10 px-4 border border-[#E5E7EB] bg-white text-sm font-medium text-[#0E292F] rounded-md hover:bg-gray-50 transition-colors font-sans"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="h-10 px-5 bg-[#0E292F] text-white text-sm font-medium rounded-md hover:bg-[#0E292F]/90 transition-colors font-sans disabled:opacity-50 inline-flex items-center gap-2"
                >
                  {submitting
                    ? <><RefreshCw className="w-3.5 h-3.5 animate-spin" /> Publishing…</>
                    : "Publish listing"
                  }
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}