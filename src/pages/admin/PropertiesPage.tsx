import { useEffect, useState, useCallback, useMemo } from "react";
import {
  getAllProperties,
  createProperty,
  deleteProperty,
  uploadPropertyImages,
} from "@/lib/supabase/admin";
import { subscribeToProperties } from "@/lib/supabase/realtime";
import {
  Search,
  Trash2,
  Plus,
  MapPin,
  BedDouble,
  Bath,
  Maximize,
  X,
  Upload,
  Image as ImageIcon,
  RefreshCw,
  Building2,
  Eye,
  Edit,
  Grid3x3,
  List,
  TrendingUp,
  CheckCircle2,
  Tag,
  Sparkles,
  PartyPopper,
  Check,
} from "lucide-react";

// Toast Notification Component
interface Toast {
  id: string;
  message: string;
  type: "success" | "error";
}

const ToastNotification = ({ toast, onClose }: { toast: Toast; onClose: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed top-6 right-6 z-[100] animate-slide-in ${
        toast.type === "success" ? "bg-emerald-50 border-emerald-200" : "bg-red-50 border-red-200"
      } border-2 rounded-2xl p-4 shadow-2xl backdrop-blur-sm max-w-md`}
    >
      <div className="flex items-start gap-3">
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
            toast.type === "success" ? "bg-emerald-100" : "bg-red-100"
          }`}
        >
          {toast.type === "success" ? (
            <Check className="w-5 h-5 text-emerald-600" />
          ) : (
            <X className="w-5 h-5 text-red-600" />
          )}
        </div>
        <div className="flex-1">
          <h4 className={`text-sm font-semibold ${toast.type === "success" ? "text-emerald-900" : "text-red-900"}`}>
            {toast.type === "success" ? "Success!" : "Error"}
          </h4>
          <p className={`text-sm mt-1 ${toast.type === "success" ? "text-emerald-700" : "text-red-700"}`}>
            {toast.message}
          </p>
        </div>
        <button
          onClick={onClose}
          className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 ${
            toast.type === "success" ? "text-emerald-500 hover:bg-emerald-100" : "text-red-500 hover:bg-red-100"
          }`}
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

// Success Modal Component
const SuccessModal = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-[100] flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 text-center border border-white/20">
        <div className="relative mb-6">
          <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-200">
            <Check className="w-12 h-12 text-white" />
          </div>
          <div className="absolute top-0 right-0 -translate-y-2 translate-x-2">
            <PartyPopper className="w-10 h-10 text-amber-400" />
          </div>
          <div className="absolute top-0 left-0 -translate-y-2 -translate-x-2">
            <Sparkles className="w-10 h-10 text-amber-400" />
          </div>
        </div>
        <h3 className="text-2xl font-bold text-slate-900 mb-2">Property Created!</h3>
        <p className="text-slate-600 mb-2">Your property listing has been successfully published.</p>
        <p className="text-sm text-slate-400 mb-6">It's now live and visible to potential buyers</p>
        
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="flex -space-x-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 border-2 border-white flex items-center justify-center text-white text-xs font-bold">
                ✓
              </div>
            ))}
          </div>
          <span className="text-xs text-slate-400 ml-2">Property is now searchable</span>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3.5 bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-2xl text-sm font-bold hover:from-slate-800 hover:to-slate-700 transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

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
  title: "",
  description: "",
  price: "",
  type: "sale",
  bedrooms: "",
  bathrooms: "",
  area: "",
  address: "",
  city: "",
  state: "",
  country: "Nigeria",
  imageFiles: [],
};

export default function PropertiesPage() {
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState<PropertyFormData>(initialFormData);
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const addToast = (message: string, type: "success" | "error") => {
    const id = Math.random().toString(36).substring(7);
    setToasts((prev) => [...prev, { id, message, type }]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const fetchProperties = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getAllProperties();
      const mapped = (data || []).map((p: any) => ({
        ...p,
        type: p.listing_type || p.property_type || "sale",
      }));
      setProperties(mapped);
    } catch (err: any) {
      setError(err.message || "Failed to load properties");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  useEffect(() => {
    const unsubscribe = subscribeToProperties(
      (property) => {
        setProperties((prev) => [
          { ...property, type: property.listing_type || property.property_type || "sale" },
          ...prev,
        ]);
      },
      (property) => {
        setProperties((prev) =>
          prev.map((p) =>
            p.id === property.id
              ? { ...property, type: property.listing_type || property.property_type || "sale" }
              : p
          )
        );
      },
      ({ id }) => {
        setProperties((prev) => prev.filter((p) => p.id !== id));
      }
    );
    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const property = await createProperty({
        title: formData.title,
        description: formData.description,
        price: parseFloat(formData.price),
        type: formData.type,
        bedrooms: parseInt(formData.bedrooms) || 0,
        bathrooms: parseInt(formData.bathrooms) || 0,
        area_sqft: formData.area ? parseFloat(formData.area) : undefined,
        latitude: 6.5244,
        longitude: 3.3792,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        country: formData.country,
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
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this property?")) return;
    setDeletingId(id);
    try {
      await deleteProperty(id);
      setProperties((prev) => prev.filter((p) => p.id !== id));
      addToast("Property deleted successfully", "success");
    } catch (err: any) {
      addToast("Failed to delete property", "error");
      console.error(err);
    } finally {
      setDeletingId(null);
    }
  };

  const filteredProperties = properties.filter((property) => {
    if (selectedType !== "all" && property.type !== selectedType) return false;
    if (selectedStatus !== "all" && property.status !== selectedStatus) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const title = (property.title || "").toLowerCase();
      const city = (property.city || "").toLowerCase();
      const address = (property.address || "").toLowerCase();
      return title.includes(q) || city.includes(q) || address.includes(q);
    }
    return true;
  });

  const stats = useMemo(() => {
    const available = properties.filter((p) => p.status === "available").length;
    const forSale = properties.filter((p) => p.type === "sale").length;
    const forRent = properties.filter((p) => p.type === "rent").length;
    return { available, forSale, forRent };
  }, [properties]);

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      available: "bg-emerald-50 text-emerald-700 border-emerald-200",
      pending: "bg-yellow-50 text-yellow-700 border-yellow-200",
      sold: "bg-red-50 text-red-700 border-red-200",
      rented: "bg-amber-50 text-amber-700 border-amber-200",
    };
    return styles[status] || "bg-slate-50 text-slate-700 border-slate-200";
  };

  const getTypeBadge = (type: string) => {
    const styles: Record<string, string> = {
      sale: "bg-blue-50 text-blue-700 border-blue-200",
      rent: "bg-purple-50 text-purple-700 border-purple-200",
    };
    return styles[type] || "bg-slate-50 text-slate-700 border-slate-200";
  };

  if (loading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full border-4 border-slate-200 border-t-slate-900 animate-spin mx-auto" />
          <p className="mt-4 text-slate-600 font-medium">Loading properties...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="bg-gradient-to-br from-red-50 to-red-100 border border-red-200 rounded-2xl p-8 max-w-md text-center shadow-lg">
          <div className="w-14 h-14 rounded-full bg-red-200 flex items-center justify-center mx-auto mb-4">
            <X className="w-7 h-7 text-red-600" />
          </div>
          <h3 className="text-lg font-semibold text-red-900 mb-2">Error Loading Properties</h3>
          <p className="text-sm text-red-600 mb-4">{error}</p>
          <button
            onClick={fetchProperties}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-red-600 text-white rounded-xl text-sm font-medium hover:bg-red-700 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6 p-6">
      {/* Toast Notifications */}
      {toasts.map((toast) => (
        <ToastNotification
          key={toast.id}
          toast={toast}
          onClose={() => removeToast(toast.id)}
        />
      ))}

      {/* Success Modal */}
      {showSuccessModal && (
        <SuccessModal onClose={() => setShowSuccessModal(false)} />
      )}

      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl p-8 text-white shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-emerald-500/20 to-teal-500/20 rounded-full blur-3xl" />
        <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
                <Building2 className="w-5 h-5" />
              </div>
              <span className="text-sm font-medium text-white/70">Property Management</span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight">Properties</h1>
            <p className="mt-2 text-white/70">Manage all property listings on the platform.</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={fetchProperties}
              className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white text-sm font-medium transition-all duration-200"
              title="Refresh"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button
              onClick={() => setShowModal(true)}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white text-slate-900 text-sm font-semibold hover:bg-white/90 transition-all duration-200 shadow-lg hover:-translate-y-0.5"
            >
              <Plus className="w-5 h-5" />
              Add Property
            </button>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
              <Building2 className="w-5 h-5 text-slate-700" />
            </div>
            <TrendingUp className="w-4 h-4 text-slate-400" />
          </div>
          <p className="text-2xl font-bold text-slate-900">{properties.length}</p>
          <p className="text-xs text-slate-500 mt-1">Total Properties</p>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-slate-900">{stats.available}</p>
          <p className="text-xs text-slate-500 mt-1">Available</p>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
              <Tag className="w-5 h-5 text-blue-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-slate-900">{stats.forSale}</p>
          <p className="text-xs text-slate-500 mt-1">For Sale</p>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
              <Tag className="w-5 h-5 text-purple-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-slate-900">{stats.forRent}</p>
          <p className="text-xs text-slate-500 mt-1">For Rent</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by title, city, or address..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-300"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)}
              className="px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 bg-white">
              <option value="all">All Types</option>
              <option value="sale">For Sale</option>
              <option value="rent">For Rent</option>
            </select>
            <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 bg-white">
              <option value="all">All Status</option>
              <option value="available">Available</option>
              <option value="pending">Pending</option>
              <option value="sold">Sold</option>
              <option value="rented">Rented</option>
            </select>
            <div className="flex rounded-xl border border-slate-200 overflow-hidden">
              <button onClick={() => setViewMode("grid")}
                className={`p-2.5 transition-colors ${viewMode === "grid" ? "bg-slate-900 text-white" : "bg-white text-slate-600 hover:bg-slate-50"}`}>
                <Grid3x3 className="w-4 h-4" />
              </button>
              <button onClick={() => setViewMode("list")}
                className={`p-2.5 transition-colors ${viewMode === "list" ? "bg-slate-900 text-white" : "bg-white text-slate-600 hover:bg-slate-50"}`}>
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Result count */}
      {filteredProperties.length > 0 && (
        <div className="flex items-center justify-between px-1">
          <p className="text-sm text-slate-500">
            Showing <span className="font-semibold text-slate-900">{filteredProperties.length}</span> of{" "}
            <span className="font-semibold text-slate-900">{properties.length}</span> properties
          </p>
        </div>
      )}

      {/* Properties Grid / List */}
      {filteredProperties.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-16 text-center">
          <div className="w-20 h-20 mx-auto rounded-2xl bg-slate-100 flex items-center justify-center mb-6">
            <Building2 className="w-10 h-10 text-slate-400" />
          </div>
          <h3 className="text-xl font-semibold text-slate-900 mb-2">No properties found</h3>
          <p className="text-slate-500 mb-6">
            {searchQuery || selectedType !== "all" || selectedStatus !== "all"
              ? "Try adjusting your search or filters"
              : "Get started by adding your first property listing"}
          </p>
          {!searchQuery && selectedType === "all" && selectedStatus === "all" && (
            <button onClick={() => setShowModal(true)}
              className="inline-flex items-center gap-2 px-5 py-3 bg-slate-900 text-white rounded-xl text-sm font-semibold hover:bg-slate-800 transition-colors">
              <Plus className="w-5 h-5" /> Add Your First Property
            </button>
          )}
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredProperties.map((property) => (
            <div key={property.id}
              className="group bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="relative h-52 bg-slate-100 overflow-hidden">
                {property.property_images?.[0]?.url ? (
                  <img src={property.property_images[0].url} alt={property.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">
                    <ImageIcon className="w-16 h-16 text-slate-300" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute top-3 right-3">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border backdrop-blur-sm capitalize ${getStatusBadge(property.status)}`}>
                    {property.status}
                  </span>
                </div>
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border backdrop-blur-sm ${getTypeBadge(property.type)}`}>
                    {property.type === "sale" ? "For Sale" : "For Rent"}
                  </span>
                  <span className="text-white font-bold text-lg drop-shadow-lg">
                    ₦{Number(property.price).toLocaleString()}
                  </span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-slate-900 text-lg mb-2 line-clamp-1">{property.title}</h3>
                <div className="flex items-center gap-1.5 text-sm text-slate-500 mb-4">
                  <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                  <span className="line-clamp-1">
                    {[property.address, property.city, property.state].filter(Boolean).join(", ") || "—"}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm text-slate-500 mb-4 pb-4 border-b border-slate-100">
                  <span className="flex items-center gap-1.5"><BedDouble className="w-4 h-4 text-slate-400" /><span className="font-medium text-slate-700">{property.bedrooms}</span></span>
                  <span className="flex items-center gap-1.5"><Bath className="w-4 h-4 text-slate-400" /><span className="font-medium text-slate-700">{property.bathrooms}</span></span>
                  <span className="flex items-center gap-1.5"><Maximize className="w-4 h-4 text-slate-400" /><span className="font-medium text-slate-700">{property.area_sqft || "—"}</span><span className="text-xs text-slate-400">sqft</span></span>
                </div>
                <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-2 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"><Eye className="w-4 h-4" /></button>
                  <button className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"><Edit className="w-4 h-4" /></button>
                  <button onClick={() => handleDelete(property.id)} disabled={deletingId === property.id}
                    className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50">
                    {deletingId === property.id ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/80">
                  <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Property</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Type</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Price</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Details</th>
                  <th className="text-right px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredProperties.map((property) => (
                  <tr key={property.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-slate-100 overflow-hidden shrink-0 flex items-center justify-center">
                          {property.property_images?.[0]?.url ? (
                            <img src={property.property_images[0].url} alt="" className="w-full h-full object-cover" />
                          ) : (<Building2 className="w-6 h-6 text-slate-400" />)}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-900">{property.title}</p>
                          <p className="text-xs text-slate-500">{property.city || "—"}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4"><span className={`px-2.5 py-1 rounded-full text-xs font-semibold border capitalize ${getTypeBadge(property.type)}`}>{property.type}</span></td>
                    <td className="px-6 py-4"><span className={`px-2.5 py-1 rounded-full text-xs font-semibold border capitalize ${getStatusBadge(property.status)}`}>{property.status}</span></td>
                    <td className="px-6 py-4 font-semibold text-slate-900">₦{Number(property.price).toLocaleString()}</td>
                    <td className="px-6 py-4 text-sm text-slate-500">{property.bedrooms} beds · {property.bathrooms} baths · {property.area_sqft || "—"} sqft</td>
                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50"
                          onClick={() => handleDelete(property.id)} disabled={deletingId === property.id}>
                          {deletingId === property.id ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add Property Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[92vh] overflow-hidden flex flex-col border border-white/20">
            <div className="relative bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 px-8 py-6 flex items-center justify-between shrink-0">
              <div className="relative flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center shadow-lg">
                  <Plus className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white tracking-tight">Create New Listing</h3>
                  <p className="text-white/60 text-sm mt-0.5">Add a stunning property to your portfolio</p>
                </div>
              </div>
              <button onClick={() => setShowModal(false)}
                className="relative w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center transition-all duration-200 hover:rotate-90">
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
              <div className="p-8 space-y-8">
                {/* Basic Info */}
                <div>
                  <div className="flex items-center gap-2 mb-5">
                    <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center"><Building2 className="w-4 h-4 text-blue-600" /></div>
                    <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Basic Information</h4>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Property Title <span className="text-red-500">*</span></label>
                      <input type="text" required placeholder="e.g. Luxury Penthouse with Ocean View" value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all duration-200" />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Description</label>
                      <textarea rows={4} placeholder="Write a compelling description..." value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all duration-200 resize-none" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Price <span className="text-red-500">*</span></label>
                      <div className="relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-1">
                          <span className="text-slate-500 font-bold text-sm">₦</span>
                          <span className="w-px h-4 bg-slate-200" />
                        </div>
                        <input type="number" required min="0" placeholder="250,000" value={formData.price}
                          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                          className="w-full pl-14 pr-4 py-3 border border-slate-200 rounded-xl text-sm font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all duration-200" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Listing Type <span className="text-red-500">*</span></label>
                      <div className="grid grid-cols-2 gap-2">
                        <button type="button" onClick={() => setFormData({ ...formData, type: "sale" })}
                          className={`px-4 py-3 rounded-xl text-sm font-semibold border-2 transition-all duration-200 ${formData.type === "sale" ? "bg-blue-50 border-blue-500 text-blue-700 shadow-lg shadow-blue-100" : "bg-white border-slate-200 text-slate-500 hover:border-slate-300"}`}>
                          🏷️ For Sale
                        </button>
                        <button type="button" onClick={() => setFormData({ ...formData, type: "rent" })}
                          className={`px-4 py-3 rounded-xl text-sm font-semibold border-2 transition-all duration-200 ${formData.type === "rent" ? "bg-purple-50 border-purple-500 text-purple-700 shadow-lg shadow-purple-100" : "bg-white border-slate-200 text-slate-500 hover:border-slate-300"}`}>
                          📋 For Rent
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Location */}
                <div>
                  <div className="flex items-center gap-2 mb-5">
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center"><MapPin className="w-4 h-4 text-emerald-600" /></div>
                    <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Location Details</h4>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Street Address</label>
                      <input type="text" placeholder="123 Marina Street" value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 transition-all duration-200" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">City</label>
                      <input type="text" placeholder="Lagos" value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 transition-all duration-200" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">State</label>
                      <input type="text" placeholder="Lagos State" value={formData.state}
                        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                        className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 transition-all duration-200" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Country</label>
                      <input type="text" placeholder="Nigeria" value={formData.country}
                        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                        className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 transition-all duration-200" />
                    </div>
                  </div>
                </div>

                {/* Property Details */}
                <div>
                  <div className="flex items-center gap-2 mb-5">
                    <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center"><Maximize className="w-4 h-4 text-amber-600" /></div>
                    <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Property Details</h4>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Bedrooms</label>
                      <div className="relative">
                        <BedDouble className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input type="number" min="0" placeholder="3" value={formData.bedrooms}
                          onChange={(e) => setFormData({ ...formData, bedrooms: e.target.value })}
                          className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl text-sm font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400 transition-all duration-200" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Bathrooms</label>
                      <div className="relative">
                        <Bath className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input type="number" min="0" placeholder="2" value={formData.bathrooms}
                          onChange={(e) => setFormData({ ...formData, bathrooms: e.target.value })}
                          className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl text-sm font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400 transition-all duration-200" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Area (sqft)</label>
                      <div className="relative">
                        <Maximize className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input type="number" min="0" placeholder="1500" value={formData.area}
                          onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                          className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl text-sm font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400 transition-all duration-200" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Images */}
                <div>
                  <div className="flex items-center gap-2 mb-5">
                    <div className="w-8 h-8 rounded-lg bg-rose-100 flex items-center justify-center"><ImageIcon className="w-4 h-4 text-rose-600" /></div>
                    <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Property Images</h4>
                  </div>

                  <label className="relative group cursor-pointer block">
                    <div className="w-full p-10 border-2 border-dashed border-slate-300 rounded-2xl text-center hover:border-rose-400 hover:bg-rose-50/30 transition-all duration-200">
                      <div className="w-16 h-16 mx-auto rounded-2xl bg-rose-100 flex items-center justify-center mb-3 group-hover:bg-rose-200 transition-colors">
                        <Upload className="w-8 h-8 text-rose-500" />
                      </div>
                      <p className="text-sm font-semibold text-slate-700">
                        {formData.imageFiles.length > 0
                          ? `${formData.imageFiles.length} file(s) selected`
                          : "Click to select multiple images"}
                      </p>
                      <p className="text-xs text-slate-400 mt-1">Supports JPG, PNG, WebP · Select multiple files at once</p>
                    </div>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={(e) => {
                        const newFiles = Array.from(e.target.files || []);
                        if (newFiles.length > 0) {
                          setFormData((prev) => ({
                            ...prev,
                            imageFiles: [...prev.imageFiles, ...newFiles],
                          }));
                        }
                        e.target.value = '';
                      }}
                      className="hidden"
                    />
                  </label>

                  {formData.imageFiles.length > 0 && (
                    <div className="flex gap-2 mt-3 flex-wrap">
                      {formData.imageFiles.map((file, i) => (
                        <div key={`${file.name}-${i}`} className="relative w-20 h-20 rounded-xl bg-slate-100 overflow-hidden border-2 border-slate-200 group">
                          <img src={URL.createObjectURL(file)} alt="" className="w-full h-full object-cover" />
                          <button
                            type="button"
                            onClick={() => {
                              setFormData((prev) => ({
                                ...prev,
                                imageFiles: prev.imageFiles.filter((_, idx) => idx !== i),
                              }));
                            }}
                            className="absolute top-1 right-1 w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Footer */}
              <div className="sticky bottom-0 bg-white border-t border-slate-200 px-8 py-5 flex items-center justify-end gap-3">
                <button type="button" onClick={() => setShowModal(false)}
                  className="px-6 py-3 border-2 border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all duration-200">Cancel</button>
                <button type="submit" disabled={submitting}
                  className="px-8 py-3 bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-xl text-sm font-bold hover:from-slate-800 hover:to-slate-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-3 shadow-xl shadow-slate-200 hover:shadow-2xl hover:shadow-slate-300 hover:-translate-y-0.5">
                  {submitting ? <><RefreshCw className="w-5 h-5 animate-spin" />Creating Listing...</> : <><Plus className="w-5 h-5" />Create Property</>}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}