// import { useEffect, useState, useCallback, useMemo } from "react";
// import {
//   getAllProperties,
//   createProperty,
//   deleteProperty,
//   uploadPropertyImages,
// } from "@/lib/supabase/admin";
// import { subscribeToProperties } from "@/lib/supabase/realtime";
// import {
//   Search,
//   Trash2,
//   Plus,
//   MapPin,
//   BedDouble,
//   Bath,
//   Maximize,
//   X,
//   Upload,
//   Image as ImageIcon,
//   RefreshCw,
//   Building2,
//   Eye,
//   Edit,
//   Grid3x3,
//   List,
//   TrendingUp,
//   CheckCircle2,
//   Tag,
//   Sparkles,
//   PartyPopper,
//   Check,
// } from "lucide-react";

// // Toast Notification Component
// interface Toast {
//   id: string;
//   message: string;
//   type: "success" | "error";
// }

// const ToastNotification = ({ toast, onClose }: { toast: Toast; onClose: () => void }) => {
//   useEffect(() => {
//     const timer = setTimeout(onClose, 4000);
//     return () => clearTimeout(timer);
//   }, [onClose]);

//   return (
//     <div
//       className={`fixed top-6 right-6 z-[100] animate-slide-in ${
//         toast.type === "success" ? "bg-emerald-50 border-emerald-200" : "bg-red-50 border-red-200"
//       } border-2 rounded-2xl p-4 shadow-2xl backdrop-blur-sm max-w-md`}
//     >
//       <div className="flex items-start gap-3">
//         <div
//           className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
//             toast.type === "success" ? "bg-emerald-100" : "bg-red-100"
//           }`}
//         >
//           {toast.type === "success" ? (
//             <Check className="w-5 h-5 text-emerald-600" />
//           ) : (
//             <X className="w-5 h-5 text-red-600" />
//           )}
//         </div>
//         <div className="flex-1">
//           <h4 className={`text-sm font-semibold ${toast.type === "success" ? "text-emerald-900" : "text-red-900"}`}>
//             {toast.type === "success" ? "Success!" : "Error"}
//           </h4>
//           <p className={`text-sm mt-1 ${toast.type === "success" ? "text-emerald-700" : "text-red-700"}`}>
//             {toast.message}
//           </p>
//         </div>
//         <button
//           onClick={onClose}
//           className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 ${
//             toast.type === "success" ? "text-emerald-500 hover:bg-emerald-100" : "text-red-500 hover:bg-red-100"
//           }`}
//         >
//           <X className="w-4 h-4" />
//         </button>
//       </div>
//     </div>
//   );
// };

// // Success Modal Component
// const SuccessModal = ({ onClose }: { onClose: () => void }) => {
//   return (
//     <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-[100] flex items-center justify-center p-4">
//       <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 text-center border border-white/20">
//         <div className="relative mb-6">
//           <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-200">
//             <Check className="w-12 h-12 text-white" />
//           </div>
//           <div className="absolute top-0 right-0 -translate-y-2 translate-x-2">
//             <PartyPopper className="w-10 h-10 text-amber-400" />
//           </div>
//           <div className="absolute top-0 left-0 -translate-y-2 -translate-x-2">
//             <Sparkles className="w-10 h-10 text-amber-400" />
//           </div>
//         </div>
//         <h3 className="text-2xl font-bold text-slate-900 mb-2">Property Created!</h3>
//         <p className="text-slate-600 mb-2">Your property listing has been successfully published.</p>
//         <p className="text-sm text-slate-400 mb-6">It's now live and visible to potential buyers</p>
        
//         <div className="flex items-center justify-center gap-2 mb-6">
//           <div className="flex -space-x-2">
//             {[1, 2, 3, 4].map((i) => (
//               <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 border-2 border-white flex items-center justify-center text-white text-xs font-bold">
//                 ✓
//               </div>
//             ))}
//           </div>
//           <span className="text-xs text-slate-400 ml-2">Property is now searchable</span>
//         </div>

//         <button
//           onClick={onClose}
//           className="w-full py-3.5 bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-2xl text-sm font-bold hover:from-slate-800 hover:to-slate-700 transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
//         >
//           Continue
//         </button>
//       </div>
//     </div>
//   );
// };

// interface PropertyFormData {
//   title: string;
//   description: string;
//   price: string;
//   type: string;
//   bedrooms: string;
//   bathrooms: string;
//   area: string;
//   address: string;
//   city: string;
//   state: string;
//   country: string;
//   imageFiles: File[];
// }

// const initialFormData: PropertyFormData = {
//   title: "",
//   description: "",
//   price: "",
//   type: "sale",
//   bedrooms: "",
//   bathrooms: "",
//   area: "",
//   address: "",
//   city: "",
//   state: "",
//   country: "Nigeria",
//   imageFiles: [],
// };

// export default function PropertiesPage() {
//   const [properties, setProperties] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [showModal, setShowModal] = useState(false);
//   const [formData, setFormData] = useState<PropertyFormData>(initialFormData);
//   const [submitting, setSubmitting] = useState(false);
//   const [deletingId, setDeletingId] = useState<string | null>(null);
//   const [selectedType, setSelectedType] = useState<string>("all");
//   const [selectedStatus, setSelectedStatus] = useState<string>("all");
//   const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
//   const [toasts, setToasts] = useState<Toast[]>([]);
//   const [showSuccessModal, setShowSuccessModal] = useState(false);

//   const addToast = (message: string, type: "success" | "error") => {
//     const id = Math.random().toString(36).substring(7);
//     setToasts((prev) => [...prev, { id, message, type }]);
//   };

//   const removeToast = (id: string) => {
//     setToasts((prev) => prev.filter((t) => t.id !== id));
//   };

//   const fetchProperties = useCallback(async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       const data = await getAllProperties();
//       const mapped = (data || []).map((p: any) => ({
//         ...p,
//         type: p.listing_type || p.property_type || "sale",
//       }));
//       setProperties(mapped);
//     } catch (err: any) {
//       setError(err.message || "Failed to load properties");
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchProperties();
//   }, [fetchProperties]);

//   useEffect(() => {
//     const unsubscribe = subscribeToProperties(
//       (property) => {
//         setProperties((prev) => [
//           { ...property, type: property.listing_type || property.property_type || "sale" },
//           ...prev,
//         ]);
//       },
//       (property) => {
//         setProperties((prev) =>
//           prev.map((p) =>
//             p.id === property.id
//               ? { ...property, type: property.listing_type || property.property_type || "sale" }
//               : p
//           )
//         );
//       },
//       ({ id }) => {
//         setProperties((prev) => prev.filter((p) => p.id !== id));
//       }
//     );
//     return () => unsubscribe();
//   }, []);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setSubmitting(true);
//     try {
//       const property = await createProperty({
//         title: formData.title,
//         description: formData.description,
//         price: parseFloat(formData.price),
//         type: formData.type,
//         bedrooms: parseInt(formData.bedrooms) || 0,
//         bathrooms: parseInt(formData.bathrooms) || 0,
//         area_sqft: formData.area ? parseFloat(formData.area) : undefined,
//         latitude: 6.5244,
//         longitude: 3.3792,
//         address: formData.address,
//         city: formData.city,
//         state: formData.state,
//         country: formData.country,
//       });

//       if (formData.imageFiles.length > 0) {
//         await uploadPropertyImages(property.id, formData.imageFiles, 0);
//       }

//       setShowModal(false);
//       setFormData(initialFormData);
//       setShowSuccessModal(true);
//       fetchProperties();
//     } catch (err: any) {
//       addToast(err.message || "Failed to create property", "error");
//       console.error(err);
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const handleDelete = async (id: string) => {
//     if (!confirm("Are you sure you want to delete this property?")) return;
//     setDeletingId(id);
//     try {
//       await deleteProperty(id);
//       setProperties((prev) => prev.filter((p) => p.id !== id));
//       addToast("Property deleted successfully", "success");
//     } catch (err: any) {
//       addToast("Failed to delete property", "error");
//       console.error(err);
//     } finally {
//       setDeletingId(null);
//     }
//   };

//   const filteredProperties = properties.filter((property) => {
//     if (selectedType !== "all" && property.type !== selectedType) return false;
//     if (selectedStatus !== "all" && property.status !== selectedStatus) return false;
//     if (searchQuery) {
//       const q = searchQuery.toLowerCase();
//       const title = (property.title || "").toLowerCase();
//       const city = (property.city || "").toLowerCase();
//       const address = (property.address || "").toLowerCase();
//       return title.includes(q) || city.includes(q) || address.includes(q);
//     }
//     return true;
//   });

//   const stats = useMemo(() => {
//     const available = properties.filter((p) => p.status === "available").length;
//     const forSale = properties.filter((p) => p.type === "sale").length;
//     const forRent = properties.filter((p) => p.type === "rent").length;
//     return { available, forSale, forRent };
//   }, [properties]);

//   const getStatusBadge = (status: string) => {
//     const styles: Record<string, string> = {
//       available: "bg-emerald-50 text-emerald-700 border-emerald-200",
//       pending: "bg-yellow-50 text-yellow-700 border-yellow-200",
//       sold: "bg-red-50 text-red-700 border-red-200",
//       rented: "bg-amber-50 text-amber-700 border-amber-200",
//     };
//     return styles[status] || "bg-slate-50 text-slate-700 border-slate-200";
//   };

//   const getTypeBadge = (type: string) => {
//     const styles: Record<string, string> = {
//       sale: "bg-blue-50 text-blue-700 border-blue-200",
//       rent: "bg-purple-50 text-purple-700 border-purple-200",
//     };
//     return styles[type] || "bg-slate-50 text-slate-700 border-slate-200";
//   };

//   if (loading) {
//     return (
//       <div className="min-h-[80vh] flex items-center justify-center">
//         <div className="text-center">
//           <div className="w-16 h-16 rounded-full border-4 border-slate-200 border-t-slate-900 animate-spin mx-auto" />
//           <p className="mt-4 text-slate-600 font-medium">Loading properties...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-[80vh] flex items-center justify-center">
//         <div className="bg-gradient-to-br from-red-50 to-red-100 border border-red-200 rounded-2xl p-8 max-w-md text-center shadow-lg">
//           <div className="w-14 h-14 rounded-full bg-red-200 flex items-center justify-center mx-auto mb-4">
//             <X className="w-7 h-7 text-red-600" />
//           </div>
//           <h3 className="text-lg font-semibold text-red-900 mb-2">Error Loading Properties</h3>
//           <p className="text-sm text-red-600 mb-4">{error}</p>
//           <button
//             onClick={fetchProperties}
//             className="inline-flex items-center gap-2 px-5 py-2.5 bg-red-600 text-white rounded-xl text-sm font-medium hover:bg-red-700 transition-colors"
//           >
//             <RefreshCw className="w-4 h-4" />
//             Retry
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-7xl mx-auto space-y-6 p-6">
//       {/* Toast Notifications */}
//       {toasts.map((toast) => (
//         <ToastNotification
//           key={toast.id}
//           toast={toast}
//           onClose={() => removeToast(toast.id)}
//         />
//       ))}

//       {/* Success Modal */}
//       {showSuccessModal && (
//         <SuccessModal onClose={() => setShowSuccessModal(false)} />
//       )}

//       {/* Header */}
//       <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl p-8 text-white shadow-2xl">
//         <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl" />
//         <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-emerald-500/20 to-teal-500/20 rounded-full blur-3xl" />
//         <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
//           <div>
//             <div className="flex items-center gap-3 mb-2">
//               <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
//                 <Building2 className="w-5 h-5" />
//               </div>
//               <span className="text-sm font-medium text-white/70">Property Management</span>
//             </div>
//             <h1 className="text-3xl font-bold tracking-tight">Properties</h1>
//             <p className="mt-2 text-white/70">Manage all property listings on the platform.</p>
//           </div>
//           <div className="flex items-center gap-3">
//             <button
//               onClick={fetchProperties}
//               className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white text-sm font-medium transition-all duration-200"
//               title="Refresh"
//             >
//               <RefreshCw className="w-4 h-4" />
//             </button>
//             <button
//               onClick={() => setShowModal(true)}
//               className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white text-slate-900 text-sm font-semibold hover:bg-white/90 transition-all duration-200 shadow-lg hover:-translate-y-0.5"
//             >
//               <Plus className="w-5 h-5" />
//               Add Property
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Quick Stats */}
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//         <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-shadow">
//           <div className="flex items-center justify-between mb-3">
//             <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
//               <Building2 className="w-5 h-5 text-slate-700" />
//             </div>
//             <TrendingUp className="w-4 h-4 text-slate-400" />
//           </div>
//           <p className="text-2xl font-bold text-slate-900">{properties.length}</p>
//           <p className="text-xs text-slate-500 mt-1">Total Properties</p>
//         </div>
//         <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-shadow">
//           <div className="flex items-center justify-between mb-3">
//             <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
//               <CheckCircle2 className="w-5 h-5 text-emerald-600" />
//             </div>
//           </div>
//           <p className="text-2xl font-bold text-slate-900">{stats.available}</p>
//           <p className="text-xs text-slate-500 mt-1">Available</p>
//         </div>
//         <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-shadow">
//           <div className="flex items-center justify-between mb-3">
//             <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
//               <Tag className="w-5 h-5 text-blue-600" />
//             </div>
//           </div>
//           <p className="text-2xl font-bold text-slate-900">{stats.forSale}</p>
//           <p className="text-xs text-slate-500 mt-1">For Sale</p>
//         </div>
//         <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-shadow">
//           <div className="flex items-center justify-between mb-3">
//             <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
//               <Tag className="w-5 h-5 text-purple-600" />
//             </div>
//           </div>
//           <p className="text-2xl font-bold text-slate-900">{stats.forRent}</p>
//           <p className="text-xs text-slate-500 mt-1">For Rent</p>
//         </div>
//       </div>

//       {/* Filters */}
//       <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
//         <div className="flex flex-col sm:flex-row gap-4">
//           <div className="relative flex-1">
//             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
//             <input
//               type="text"
//               placeholder="Search by title, city, or address..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-300"
//             />
//           </div>
//           <div className="flex gap-2 flex-wrap">
//             <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)}
//               className="px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 bg-white">
//               <option value="all">All Types</option>
//               <option value="sale">For Sale</option>
//               <option value="rent">For Rent</option>
//             </select>
//             <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}
//               className="px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 bg-white">
//               <option value="all">All Status</option>
//               <option value="available">Available</option>
//               <option value="pending">Pending</option>
//               <option value="sold">Sold</option>
//               <option value="rented">Rented</option>
//             </select>
//             <div className="flex rounded-xl border border-slate-200 overflow-hidden">
//               <button onClick={() => setViewMode("grid")}
//                 className={`p-2.5 transition-colors ${viewMode === "grid" ? "bg-slate-900 text-white" : "bg-white text-slate-600 hover:bg-slate-50"}`}>
//                 <Grid3x3 className="w-4 h-4" />
//               </button>
//               <button onClick={() => setViewMode("list")}
//                 className={`p-2.5 transition-colors ${viewMode === "list" ? "bg-slate-900 text-white" : "bg-white text-slate-600 hover:bg-slate-50"}`}>
//                 <List className="w-4 h-4" />
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Result count */}
//       {filteredProperties.length > 0 && (
//         <div className="flex items-center justify-between px-1">
//           <p className="text-sm text-slate-500">
//             Showing <span className="font-semibold text-slate-900">{filteredProperties.length}</span> of{" "}
//             <span className="font-semibold text-slate-900">{properties.length}</span> properties
//           </p>
//         </div>
//       )}

//       {/* Properties Grid / List */}
//       {filteredProperties.length === 0 ? (
//         <div className="bg-white rounded-2xl border border-slate-200 p-16 text-center">
//           <div className="w-20 h-20 mx-auto rounded-2xl bg-slate-100 flex items-center justify-center mb-6">
//             <Building2 className="w-10 h-10 text-slate-400" />
//           </div>
//           <h3 className="text-xl font-semibold text-slate-900 mb-2">No properties found</h3>
//           <p className="text-slate-500 mb-6">
//             {searchQuery || selectedType !== "all" || selectedStatus !== "all"
//               ? "Try adjusting your search or filters"
//               : "Get started by adding your first property listing"}
//           </p>
//           {!searchQuery && selectedType === "all" && selectedStatus === "all" && (
//             <button onClick={() => setShowModal(true)}
//               className="inline-flex items-center gap-2 px-5 py-3 bg-slate-900 text-white rounded-xl text-sm font-semibold hover:bg-slate-800 transition-colors">
//               <Plus className="w-5 h-5" /> Add Your First Property
//             </button>
//           )}
//         </div>
//       ) : viewMode === "grid" ? (
//         <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
//           {filteredProperties.map((property) => (
//             <div key={property.id}
//               className="group bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
//               <div className="relative h-52 bg-slate-100 overflow-hidden">
//                 {property.property_images?.[0]?.url ? (
//                   <img src={property.property_images[0].url} alt={property.title}
//                     className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
//                 ) : (
//                   <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">
//                     <ImageIcon className="w-16 h-16 text-slate-300" />
//                   </div>
//                 )}
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
//                 <div className="absolute top-3 right-3">
//                   <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border backdrop-blur-sm capitalize ${getStatusBadge(property.status)}`}>
//                     {property.status}
//                   </span>
//                 </div>
//                 <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
//                   <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border backdrop-blur-sm ${getTypeBadge(property.type)}`}>
//                     {property.type === "sale" ? "For Sale" : "For Rent"}
//                   </span>
//                   <span className="text-white font-bold text-lg drop-shadow-lg">
//                     ₦{Number(property.price).toLocaleString()}
//                   </span>
//                 </div>
//               </div>
//               <div className="p-5">
//                 <h3 className="font-semibold text-slate-900 text-lg mb-2 line-clamp-1">{property.title}</h3>
//                 <div className="flex items-center gap-1.5 text-sm text-slate-500 mb-4">
//                   <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
//                   <span className="line-clamp-1">
//                     {[property.address, property.city, property.state].filter(Boolean).join(", ") || "—"}
//                   </span>
//                 </div>
//                 <div className="flex items-center gap-4 text-sm text-slate-500 mb-4 pb-4 border-b border-slate-100">
//                   <span className="flex items-center gap-1.5"><BedDouble className="w-4 h-4 text-slate-400" /><span className="font-medium text-slate-700">{property.bedrooms}</span></span>
//                   <span className="flex items-center gap-1.5"><Bath className="w-4 h-4 text-slate-400" /><span className="font-medium text-slate-700">{property.bathrooms}</span></span>
//                   <span className="flex items-center gap-1.5"><Maximize className="w-4 h-4 text-slate-400" /><span className="font-medium text-slate-700">{property.area_sqft || "—"}</span><span className="text-xs text-slate-400">sqft</span></span>
//                 </div>
//                 <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
//                   <button className="p-2 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"><Eye className="w-4 h-4" /></button>
//                   <button className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"><Edit className="w-4 h-4" /></button>
//                   <button onClick={() => handleDelete(property.id)} disabled={deletingId === property.id}
//                     className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50">
//                     {deletingId === property.id ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead>
//                 <tr className="border-b border-slate-200 bg-slate-50/80">
//                   <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Property</th>
//                   <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Type</th>
//                   <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
//                   <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Price</th>
//                   <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Details</th>
//                   <th className="text-right px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-slate-100">
//                 {filteredProperties.map((property) => (
//                   <tr key={property.id} className="hover:bg-slate-50/50 transition-colors group">
//                     <td className="px-6 py-4">
//                       <div className="flex items-center gap-3">
//                         <div className="w-12 h-12 rounded-xl bg-slate-100 overflow-hidden shrink-0 flex items-center justify-center">
//                           {property.property_images?.[0]?.url ? (
//                             <img src={property.property_images[0].url} alt="" className="w-full h-full object-cover" />
//                           ) : (<Building2 className="w-6 h-6 text-slate-400" />)}
//                         </div>
//                         <div>
//                           <p className="text-sm font-semibold text-slate-900">{property.title}</p>
//                           <p className="text-xs text-slate-500">{property.city || "—"}</p>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4"><span className={`px-2.5 py-1 rounded-full text-xs font-semibold border capitalize ${getTypeBadge(property.type)}`}>{property.type}</span></td>
//                     <td className="px-6 py-4"><span className={`px-2.5 py-1 rounded-full text-xs font-semibold border capitalize ${getStatusBadge(property.status)}`}>{property.status}</span></td>
//                     <td className="px-6 py-4 font-semibold text-slate-900">₦{Number(property.price).toLocaleString()}</td>
//                     <td className="px-6 py-4 text-sm text-slate-500">{property.bedrooms} beds · {property.bathrooms} baths · {property.area_sqft || "—"} sqft</td>
//                     <td className="px-6 py-4">
//                       <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
//                         <button className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50"
//                           onClick={() => handleDelete(property.id)} disabled={deletingId === property.id}>
//                           {deletingId === property.id ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       )}

//       {/* Add Property Modal */}
//       {showModal && (
//         <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4">
//           <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[92vh] overflow-hidden flex flex-col border border-white/20">
//             <div className="relative bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 px-8 py-6 flex items-center justify-between shrink-0">
//               <div className="relative flex items-center gap-4">
//                 <div className="w-12 h-12 rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center shadow-lg">
//                   <Plus className="w-6 h-6 text-white" />
//                 </div>
//                 <div>
//                   <h3 className="text-2xl font-bold text-white tracking-tight">Create New Listing</h3>
//                   <p className="text-white/60 text-sm mt-0.5">Add a stunning property to your portfolio</p>
//                 </div>
//               </div>
//               <button onClick={() => setShowModal(false)}
//                 className="relative w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center transition-all duration-200 hover:rotate-90">
//                 <X className="w-5 h-5 text-white" />
//               </button>
//             </div>

//             <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
//               <div className="p-8 space-y-8">
//                 {/* Basic Info */}
//                 <div>
//                   <div className="flex items-center gap-2 mb-5">
//                     <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center"><Building2 className="w-4 h-4 text-blue-600" /></div>
//                     <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Basic Information</h4>
//                   </div>
//                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                     <div className="sm:col-span-2">
//                       <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Property Title <span className="text-red-500">*</span></label>
//                       <input type="text" required placeholder="e.g. Luxury Penthouse with Ocean View" value={formData.title}
//                         onChange={(e) => setFormData({ ...formData, title: e.target.value })}
//                         className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all duration-200" />
//                     </div>
//                     <div className="sm:col-span-2">
//                       <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Description</label>
//                       <textarea rows={4} placeholder="Write a compelling description..." value={formData.description}
//                         onChange={(e) => setFormData({ ...formData, description: e.target.value })}
//                         className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all duration-200 resize-none" />
//                     </div>
//                     <div>
//                       <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Price <span className="text-red-500">*</span></label>
//                       <div className="relative">
//                         <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-1">
//                           <span className="text-slate-500 font-bold text-sm">₦</span>
//                           <span className="w-px h-4 bg-slate-200" />
//                         </div>
//                         <input type="number" required min="0" placeholder="250,000" value={formData.price}
//                           onChange={(e) => setFormData({ ...formData, price: e.target.value })}
//                           className="w-full pl-14 pr-4 py-3 border border-slate-200 rounded-xl text-sm font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all duration-200" />
//                       </div>
//                     </div>
//                     <div>
//                       <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Listing Type <span className="text-red-500">*</span></label>
//                       <div className="grid grid-cols-2 gap-2">
//                         <button type="button" onClick={() => setFormData({ ...formData, type: "sale" })}
//                           className={`px-4 py-3 rounded-xl text-sm font-semibold border-2 transition-all duration-200 ${formData.type === "sale" ? "bg-blue-50 border-blue-500 text-blue-700 shadow-lg shadow-blue-100" : "bg-white border-slate-200 text-slate-500 hover:border-slate-300"}`}>
//                           🏷️ For Sale
//                         </button>
//                         <button type="button" onClick={() => setFormData({ ...formData, type: "rent" })}
//                           className={`px-4 py-3 rounded-xl text-sm font-semibold border-2 transition-all duration-200 ${formData.type === "rent" ? "bg-purple-50 border-purple-500 text-purple-700 shadow-lg shadow-purple-100" : "bg-white border-slate-200 text-slate-500 hover:border-slate-300"}`}>
//                           📋 For Rent
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Location */}
//                 <div>
//                   <div className="flex items-center gap-2 mb-5">
//                     <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center"><MapPin className="w-4 h-4 text-emerald-600" /></div>
//                     <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Location Details</h4>
//                   </div>
//                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                     <div className="sm:col-span-2">
//                       <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Street Address</label>
//                       <input type="text" placeholder="123 Marina Street" value={formData.address}
//                         onChange={(e) => setFormData({ ...formData, address: e.target.value })}
//                         className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 transition-all duration-200" />
//                     </div>
//                     <div>
//                       <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">City</label>
//                       <input type="text" placeholder="Lagos" value={formData.city}
//                         onChange={(e) => setFormData({ ...formData, city: e.target.value })}
//                         className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 transition-all duration-200" />
//                     </div>
//                     <div>
//                       <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">State</label>
//                       <input type="text" placeholder="Lagos State" value={formData.state}
//                         onChange={(e) => setFormData({ ...formData, state: e.target.value })}
//                         className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 transition-all duration-200" />
//                     </div>
//                     <div>
//                       <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Country</label>
//                       <input type="text" placeholder="Nigeria" value={formData.country}
//                         onChange={(e) => setFormData({ ...formData, country: e.target.value })}
//                         className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 transition-all duration-200" />
//                     </div>
//                   </div>
//                 </div>

//                 {/* Property Details */}
//                 <div>
//                   <div className="flex items-center gap-2 mb-5">
//                     <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center"><Maximize className="w-4 h-4 text-amber-600" /></div>
//                     <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Property Details</h4>
//                   </div>
//                   <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//                     <div>
//                       <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Bedrooms</label>
//                       <div className="relative">
//                         <BedDouble className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
//                         <input type="number" min="0" placeholder="3" value={formData.bedrooms}
//                           onChange={(e) => setFormData({ ...formData, bedrooms: e.target.value })}
//                           className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl text-sm font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400 transition-all duration-200" />
//                       </div>
//                     </div>
//                     <div>
//                       <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Bathrooms</label>
//                       <div className="relative">
//                         <Bath className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
//                         <input type="number" min="0" placeholder="2" value={formData.bathrooms}
//                           onChange={(e) => setFormData({ ...formData, bathrooms: e.target.value })}
//                           className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl text-sm font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400 transition-all duration-200" />
//                       </div>
//                     </div>
//                     <div>
//                       <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Area (sqft)</label>
//                       <div className="relative">
//                         <Maximize className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
//                         <input type="number" min="0" placeholder="1500" value={formData.area}
//                           onChange={(e) => setFormData({ ...formData, area: e.target.value })}
//                           className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl text-sm font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400 transition-all duration-200" />
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Images */}
//                 <div>
//                   <div className="flex items-center gap-2 mb-5">
//                     <div className="w-8 h-8 rounded-lg bg-rose-100 flex items-center justify-center"><ImageIcon className="w-4 h-4 text-rose-600" /></div>
//                     <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Property Images</h4>
//                   </div>

//                   <label className="relative group cursor-pointer block">
//                     <div className="w-full p-10 border-2 border-dashed border-slate-300 rounded-2xl text-center hover:border-rose-400 hover:bg-rose-50/30 transition-all duration-200">
//                       <div className="w-16 h-16 mx-auto rounded-2xl bg-rose-100 flex items-center justify-center mb-3 group-hover:bg-rose-200 transition-colors">
//                         <Upload className="w-8 h-8 text-rose-500" />
//                       </div>
//                       <p className="text-sm font-semibold text-slate-700">
//                         {formData.imageFiles.length > 0
//                           ? `${formData.imageFiles.length} file(s) selected`
//                           : "Click to select multiple images"}
//                       </p>
//                       <p className="text-xs text-slate-400 mt-1">Supports JPG, PNG, WebP · Select multiple files at once</p>
//                     </div>
//                     <input
//                       type="file"
//                       multiple
//                       accept="image/*"
//                       onChange={(e) => {
//                         const newFiles = Array.from(e.target.files || []);
//                         if (newFiles.length > 0) {
//                           setFormData((prev) => ({
//                             ...prev,
//                             imageFiles: [...prev.imageFiles, ...newFiles],
//                           }));
//                         }
//                         e.target.value = '';
//                       }}
//                       className="hidden"
//                     />
//                   </label>

//                   {formData.imageFiles.length > 0 && (
//                     <div className="flex gap-2 mt-3 flex-wrap">
//                       {formData.imageFiles.map((file, i) => (
//                         <div key={`${file.name}-${i}`} className="relative w-20 h-20 rounded-xl bg-slate-100 overflow-hidden border-2 border-slate-200 group">
//                           <img src={URL.createObjectURL(file)} alt="" className="w-full h-full object-cover" />
//                           <button
//                             type="button"
//                             onClick={() => {
//                               setFormData((prev) => ({
//                                 ...prev,
//                                 imageFiles: prev.imageFiles.filter((_, idx) => idx !== i),
//                               }));
//                             }}
//                             className="absolute top-1 right-1 w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
//                           >
//                             <X className="w-3 h-3" />
//                           </button>
//                         </div>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               </div>

//               {/* Footer */}
//               <div className="sticky bottom-0 bg-white border-t border-slate-200 px-8 py-5 flex items-center justify-end gap-3">
//                 <button type="button" onClick={() => setShowModal(false)}
//                   className="px-6 py-3 border-2 border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all duration-200">Cancel</button>
//                 <button type="submit" disabled={submitting}
//                   className="px-8 py-3 bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-xl text-sm font-bold hover:from-slate-800 hover:to-slate-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-3 shadow-xl shadow-slate-200 hover:shadow-2xl hover:shadow-slate-300 hover:-translate-y-0.5">
//                   {submitting ? <><RefreshCw className="w-5 h-5 animate-spin" />Creating Listing...</> : <><Plus className="w-5 h-5" />Create Property</>}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


// import { useEffect, useState, useCallback, useMemo } from "react";
// import {
//   getAllProperties,
//   createProperty,
//   deleteProperty,
//   uploadPropertyImages,
// } from "@/lib/supabase/admin";
// import { subscribeToProperties } from "@/lib/supabase/realtime";
// import {
//   Search,
//   Trash2,
//   Plus,
//   MapPin,
//   BedDouble,
//   Bath,
//   Maximize,
//   X,
//   Upload,
//   Image as ImageIcon,
//   RefreshCw,
//   Building2,
//   Eye,
//   Edit,
//   Grid3x3,
//   List,
//   Check,
//   Tag,
//   CheckCircle2,
//   ArrowUpRight,
//   ChevronDown,
// } from "lucide-react";

// // ─── Types ────────────────────────────────────────────────────────────────────

// interface Toast {
//   id: string;
//   message: string;
//   type: "success" | "error";
// }

// interface PropertyFormData {
//   title: string;
//   description: string;
//   price: string;
//   type: string;
//   bedrooms: string;
//   bathrooms: string;
//   area: string;
//   address: string;
//   city: string;
//   state: string;
//   country: string;
//   imageFiles: File[];
// }

// const initialFormData: PropertyFormData = {
//   title: "",
//   description: "",
//   price: "",
//   type: "sale",
//   bedrooms: "",
//   bathrooms: "",
//   area: "",
//   address: "",
//   city: "",
//   state: "",
//   country: "Nigeria",
//   imageFiles: [],
// };

// // ─── Shimmer ──────────────────────────────────────────────────────────────────

// const ShimmerCard = () => (
//   <div className="bg-white border border-[#EBEBEB] rounded-xl overflow-hidden">
//     <div className="h-52 bg-gradient-to-r from-[#F5F5F5] via-[#FAFAFA] to-[#F5F5F5] animate-shimmer bg-[length:200%_100%]" />
//     <div className="p-5 space-y-3">
//       <div className="h-3.5 w-3/4 rounded bg-gradient-to-r from-[#F5F5F5] via-[#FAFAFA] to-[#F5F5F5] animate-shimmer bg-[length:200%_100%]" />
//       <div className="h-3 w-1/2 rounded bg-gradient-to-r from-[#F5F5F5] via-[#FAFAFA] to-[#F5F5F5] animate-shimmer bg-[length:200%_100%]" />
//       <div className="pt-3 border-t border-[#F0F0F0] flex gap-4">
//         {[1, 2, 3].map((i) => (
//           <div key={i} className="h-2.5 flex-1 rounded bg-gradient-to-r from-[#F5F5F5] via-[#FAFAFA] to-[#F5F5F5] animate-shimmer bg-[length:200%_100%]" />
//         ))}
//       </div>
//     </div>
//   </div>
// );

// const ShimmerStat = () => (
//   <div className="p-6 border-r border-[#EBEBEB] last:border-r-0">
//     <div className="space-y-3">
//       <div className="h-2.5 w-28 rounded bg-gradient-to-r from-[#F5F5F5] via-[#FAFAFA] to-[#F5F5F5] animate-shimmer bg-[length:200%_100%]" />
//       <div className="h-9 w-14 rounded bg-gradient-to-r from-[#F5F5F5] via-[#FAFAFA] to-[#F5F5F5] animate-shimmer bg-[length:200%_100%]" />
//       <div className="h-2 w-20 rounded bg-gradient-to-r from-[#F5F5F5] via-[#FAFAFA] to-[#F5F5F5] animate-shimmer bg-[length:200%_100%]" />
//     </div>
//   </div>
// );

// const ShimmerGrid = () => (
//   <>
//     <div className="bg-white border border-[#EBEBEB] rounded-xl grid grid-cols-2 md:grid-cols-4 divide-x divide-[#EBEBEB]">
//       {[1, 2, 3, 4].map((i) => <ShimmerStat key={i} />)}
//     </div>
//     <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
//       {[1, 2, 3, 4, 5, 6].map((i) => <ShimmerCard key={i} />)}
//     </div>
//   </>
// );

// // ─── Empty State ──────────────────────────────────────────────────────────────

// const PropertiesEmptyState = ({
//   filtered,
//   onAdd,
// }: {
//   filtered: boolean;
//   onAdd: () => void;
// }) => (
//   <div className="bg-white border border-[#EBEBEB] rounded-xl py-24 px-8 flex flex-col items-center text-center gap-3">
//     <div className="w-14 h-14 rounded-full bg-[#F5F5F5] flex items-center justify-center mb-1">
//       <Building2 className="w-6 h-6 text-[#ABABAB]" />
//     </div>
//     <h3 className="text-[15px] font-semibold text-[#111111]">
//       {filtered ? "No properties match your filters" : "No listings yet"}
//     </h3>
//     <p className="text-sm text-[#7A7A7A] leading-relaxed max-w-[300px]">
//       {filtered
//         ? "Try clearing your search or adjusting the filters."
//         : "Add your first property listing to get started."}
//     </p>
//     {!filtered && (
//       <button
//         onClick={onAdd}
//         className="mt-2 inline-flex items-center gap-2 px-5 py-2.5 bg-[#0E292F] text-white text-sm font-medium rounded-lg hover:bg-[#163a42] transition-colors"
//       >
//         <Plus className="w-4 h-4" />
//         Add property
//       </button>
//     )}
//   </div>
// );

// // ─── Toast ────────────────────────────────────────────────────────────────────

// const ToastNotification = ({
//   toast,
//   onClose,
// }: {
//   toast: Toast;
//   onClose: () => void;
// }) => {
//   useEffect(() => {
//     const timer = setTimeout(onClose, 4000);
//     return () => clearTimeout(timer);
//   }, [onClose]);

//   return (
//     <div
//       className={`fixed top-5 right-5 z-[100] flex items-start gap-3 p-4 rounded-xl border max-w-xs ${
//         toast.type === "success"
//           ? "bg-white border-[#DDEEDD] text-[#1A4A1A]"
//           : "bg-white border-[#FDDEDE] text-[#4A1A1A]"
//       }`}
//       style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}
//     >
//       <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${toast.type === "success" ? "bg-[#22C55E]" : "bg-[#EF4444]"}`}>
//         {toast.type === "success"
//           ? <Check className="w-3 h-3 text-white" />
//           : <X className="w-3 h-3 text-white" />}
//       </div>
//       <p className="text-sm font-medium flex-1">{toast.message}</p>
//       <button onClick={onClose} className="text-[#ABABAB] hover:text-[#555] transition-colors shrink-0">
//         <X className="w-3.5 h-3.5" />
//       </button>
//     </div>
//   );
// };

// // ─── Success Modal ────────────────────────────────────────────────────────────

// const SuccessModal = ({ onClose }: { onClose: () => void }) => (
//   <div className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-[100] flex items-center justify-center p-4">
//     <div className="bg-white rounded-2xl max-w-sm w-full p-8 text-center border border-[#EBEBEB]"
//          style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.12)" }}>
//       <div className="w-12 h-12 mx-auto rounded-full bg-[#F0FDF4] flex items-center justify-center mb-5">
//         <Check className="w-6 h-6 text-[#22C55E]" />
//       </div>
//       <h3 className="text-[17px] font-semibold text-[#111111] mb-1.5">Property published</h3>
//       <p className="text-sm text-[#7A7A7A] mb-6 leading-relaxed">
//         Your listing is now live and visible to potential buyers.
//       </p>
//       <button
//         onClick={onClose}
//         className="w-full py-2.5 bg-[#0E292F] text-white rounded-lg text-sm font-medium hover:bg-[#163a42] transition-colors"
//       >
//         Continue
//       </button>
//     </div>
//   </div>
// );

// // ─── Badge helpers ────────────────────────────────────────────────────────────

// const statusStyles: Record<string, string> = {
//   available: "bg-[#F0FDF4] text-[#15803D]",
//   pending:   "bg-[#FFFBEB] text-[#B45309]",
//   sold:      "bg-[#FEF2F2] text-[#DC2626]",
//   rented:    "bg-[#FFF7ED] text-[#C2410C]",
// };

// const typeStyles: Record<string, string> = {
//   sale: "bg-[#EFF6FF] text-[#1D4ED8]",
//   rent: "bg-[#F5F3FF] text-[#6D28D9]",
// };

// const getStyle = (map: Record<string, string>, key: string) =>
//   map[key] ?? "bg-[#F5F5F5] text-[#555555]";

// // ─── Form helpers ─────────────────────────────────────────────────────────────

// const SectionLabel = ({ label }: { label: string }) => (
//   <p className="text-xs font-semibold uppercase tracking-widest text-[#ABABAB] mb-5">{label}</p>
// );

// // ─── Main Page ────────────────────────────────────────────────────────────────

// export default function PropertiesPage() {
//   const [properties, setProperties]         = useState<any[]>([]);
//   const [loading, setLoading]               = useState(true);
//   const [error, setError]                   = useState<string | null>(null);
//   const [searchQuery, setSearchQuery]       = useState("");
//   const [showModal, setShowModal]           = useState(false);
//   const [formData, setFormData]             = useState<PropertyFormData>(initialFormData);
//   const [submitting, setSubmitting]         = useState(false);
//   const [deletingId, setDeletingId]         = useState<string | null>(null);
//   const [selectedType, setSelectedType]     = useState("all");
//   const [selectedStatus, setSelectedStatus] = useState("all");
//   const [viewMode, setViewMode]             = useState<"grid" | "list">("grid");
//   const [toasts, setToasts]                 = useState<Toast[]>([]);
//   const [showSuccessModal, setShowSuccessModal] = useState(false);

//   const addToast = (message: string, type: "success" | "error") => {
//     const id = Math.random().toString(36).substring(7);
//     setToasts((prev) => [...prev, { id, message, type }]);
//   };

//   const removeToast = (id: string) =>
//     setToasts((prev) => prev.filter((t) => t.id !== id));

//   const fetchProperties = useCallback(async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       const data = await getAllProperties();
//       const mapped = (data || []).map((p: any) => ({
//         ...p,
//         type: p.listing_type || p.property_type || "sale",
//       }));
//       setProperties(mapped);
//     } catch (err: any) {
//       setError(err.message || "Failed to load properties");
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => { fetchProperties(); }, [fetchProperties]);

//   useEffect(() => {
//     const unsubscribe = subscribeToProperties(
//       (p) => setProperties((prev) => [{ ...p, type: p.listing_type || p.property_type || "sale" }, ...prev]),
//       (p) => setProperties((prev) => prev.map((x) => x.id === p.id ? { ...p, type: p.listing_type || p.property_type || "sale" } : x)),
//       ({ id }) => setProperties((prev) => prev.filter((p) => p.id !== id)),
//     );
//     return () => unsubscribe();
//   }, []);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setSubmitting(true);
//     try {
//       const property = await createProperty({
//         title:       formData.title,
//         description: formData.description,
//         price:       parseFloat(formData.price),
//         type:        formData.type,
//         bedrooms:    parseInt(formData.bedrooms) || 0,
//         bathrooms:   parseInt(formData.bathrooms) || 0,
//         area_sqft:   formData.area ? parseFloat(formData.area) : undefined,
//         latitude:    6.5244,
//         longitude:   3.3792,
//         address:     formData.address,
//         city:        formData.city,
//         state:       formData.state,
//         country:     formData.country,
//       });
//       if (formData.imageFiles.length > 0) {
//         await uploadPropertyImages(property.id, formData.imageFiles, 0);
//       }
//       setShowModal(false);
//       setFormData(initialFormData);
//       setShowSuccessModal(true);
//       fetchProperties();
//     } catch (err: any) {
//       addToast(err.message || "Failed to create property", "error");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const handleDelete = async (id: string) => {
//     if (!confirm("Delete this property? This cannot be undone.")) return;
//     setDeletingId(id);
//     try {
//       await deleteProperty(id);
//       setProperties((prev) => prev.filter((p) => p.id !== id));
//       addToast("Property deleted", "success");
//     } catch {
//       addToast("Failed to delete property", "error");
//     } finally {
//       setDeletingId(null);
//     }
//   };

//   const filteredProperties = properties.filter((p) => {
//     if (selectedType !== "all" && p.type !== selectedType) return false;
//     if (selectedStatus !== "all" && p.status !== selectedStatus) return false;
//     if (searchQuery) {
//       const q = searchQuery.toLowerCase();
//       return (
//         (p.title   || "").toLowerCase().includes(q) ||
//         (p.city    || "").toLowerCase().includes(q) ||
//         (p.address || "").toLowerCase().includes(q)
//       );
//     }
//     return true;
//   });

//   const stats = useMemo(() => ({
//     total:     properties.length,
//     available: properties.filter((p) => p.status === "available").length,
//     forSale:   properties.filter((p) => p.type === "sale").length,
//     forRent:   properties.filter((p) => p.type === "rent").length,
//   }), [properties]);

//   const isFiltered = !!searchQuery || selectedType !== "all" || selectedStatus !== "all";

//   const inputCls =
//     "px-3.5 py-2.5 border border-[#DDDDD] rounded-lg text-sm text-[#111111] placeholder:text-[#ABABAB] focus:outline-none focus:border-[#0E292F] focus:ring-1 focus:ring-[#0E292F]/20 transition-all bg-white w-full";

//   const Field = ({
//     label,
//     required,
//     children,
//     className = "",
//   }: {
//     label: string;
//     required?: boolean;
//     children: React.ReactNode;
//     className?: string;
//   }) => (
//     <div className={`flex flex-col gap-1.5 ${className}`}>
//       <label className="text-[13px] font-medium text-[#444444]">
//         {label}{required && <span className="text-[#EF4444] ml-0.5">*</span>}
//       </label>
//       {children}
//     </div>
//   );

//   // ── Loading ───────────────────────────────────────────────────────────────

//   if (loading) {
//     return (
//       <div className="max-w-7xl mx-auto space-y-5 p-6">
//         <div className="space-y-1.5">
//           <div className="h-7 w-48 rounded bg-gradient-to-r from-[#F5F5F5] via-[#FAFAFA] to-[#F5F5F5] animate-shimmer bg-[length:200%_100%]" />
//           <div className="h-3.5 w-64 rounded bg-gradient-to-r from-[#F5F5F5] via-[#FAFAFA] to-[#F5F5F5] animate-shimmer bg-[length:200%_100%]" />
//         </div>
//         <ShimmerGrid />
//       </div>
//     );
//   }

//   // ── Error ─────────────────────────────────────────────────────────────────

//   if (error) {
//     return (
//       <div className="min-h-[80vh] flex items-center justify-center p-6">
//         <div className="bg-white border border-[#EBEBEB] rounded-xl p-8 max-w-sm w-full text-center">
//           <div className="w-10 h-10 rounded-full bg-[#FEF2F2] flex items-center justify-center mx-auto mb-4">
//             <X className="w-4 h-4 text-[#EF4444]" />
//           </div>
//           <h3 className="text-[15px] font-semibold text-[#111111] mb-1">Failed to load</h3>
//           <p className="text-sm text-[#7A7A7A] mb-5">{error}</p>
//           <button
//             onClick={fetchProperties}
//             className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#0E292F] text-white text-sm font-medium rounded-lg hover:bg-[#163a42] transition-colors"
//           >
//             <RefreshCw className="w-4 h-4" />
//             Retry
//           </button>
//         </div>
//       </div>
//     );
//   }

//   // ── Page ──────────────────────────────────────────────────────────────────

//   return (
//     <div className="max-w-7xl mx-auto space-y-5 p-6 bg-[#F8F8F8] min-h-screen">

//       {/* Toasts */}
//       {toasts.map((toast) => (
//         <ToastNotification key={toast.id} toast={toast} onClose={() => removeToast(toast.id)} />
//       ))}

//       {showSuccessModal && <SuccessModal onClose={() => setShowSuccessModal(false)} />}

//       {/* ── Header ────────────────────────────────────────────────────────── */}
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-1">
//         <div>
//           <h1 className="text-[22px] font-bold text-[#111111] tracking-tight">Properties</h1>
//           <p className="text-sm text-[#7A7A7A] mt-0.5">Manage all your active listings.</p>
//         </div>
//         <div className="flex items-center gap-2 shrink-0">
//           <button
//             onClick={fetchProperties}
//             className="w-9 h-9 flex items-center justify-center rounded-lg border border-[#EBEBEB] bg-white hover:bg-[#F8F8F8] text-[#7A7A7A] transition-colors"
//             title="Refresh"
//           >
//             <RefreshCw className="w-4 h-4" />
//           </button>
//           <button
//             onClick={() => setShowModal(true)}
//             className="inline-flex items-center gap-1.5 px-4 h-9 bg-[#0E292F] text-white text-sm font-medium rounded-lg hover:bg-[#163a42] transition-colors"
//           >
//             <Plus className="w-4 h-4" />
//             Add listing
//           </button>
//         </div>
//       </div>

//       {/* ── Stats ─────────────────────────────────────────────────────────── */}
//       <div className="bg-white border border-[#EBEBEB] rounded-xl grid grid-cols-2 md:grid-cols-4 divide-x divide-[#EBEBEB]">
//         {[
//           { label: "Total listings",  value: stats.total,     sub: "All properties" },
//           { label: "Available",       value: stats.available, sub: "Ready to view" },
//           { label: "For sale",        value: stats.forSale,   sub: "Sale listings" },
//           { label: "For rent",        value: stats.forRent,   sub: "Rental listings" },
//         ].map(({ label, value, sub }) => (
//           <div key={label} className="px-6 py-5">
//             <p className="text-xs text-[#ABABAB] font-medium mb-2">{label}</p>
//             <p className="text-3xl font-bold text-[#111111] tracking-tight leading-none">{value}</p>
//             <p className="text-xs text-[#ABABAB] mt-2">{sub}</p>
//           </div>
//         ))}
//       </div>

//       {/* ── Filters ───────────────────────────────────────────────────────── */}
//       <div className="bg-white border border-[#EBEBEB] rounded-xl p-3 flex flex-col sm:flex-row gap-2.5">
//         {/* Search */}
//         <div className="relative flex-1">
//           <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#ABABAB]" />
//           <input
//             type="text"
//             placeholder="Search by title, city, or address"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="w-full pl-9 pr-4 py-2.5 border border-[#EBEBEB] rounded-lg text-sm text-[#111111] placeholder:text-[#ABABAB] focus:outline-none focus:border-[#0E292F]/40 focus:ring-1 focus:ring-[#0E292F]/10 transition-all bg-[#FAFAFA]"
//           />
//         </div>
//         <div className="flex gap-2 flex-wrap items-center">
//           {/* Type filter */}
//           <div className="relative">
//             <select
//               value={selectedType}
//               onChange={(e) => setSelectedType(e.target.value)}
//               className="appearance-none pl-3.5 pr-8 py-2.5 border border-[#EBEBEB] rounded-lg text-sm bg-[#FAFAFA] text-[#444444] focus:outline-none focus:border-[#0E292F]/40 cursor-pointer"
//             >
//               <option value="all">All types</option>
//               <option value="sale">For sale</option>
//               <option value="rent">For rent</option>
//             </select>
//             <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#ABABAB] pointer-events-none" />
//           </div>
//           {/* Status filter */}
//           <div className="relative">
//             <select
//               value={selectedStatus}
//               onChange={(e) => setSelectedStatus(e.target.value)}
//               className="appearance-none pl-3.5 pr-8 py-2.5 border border-[#EBEBEB] rounded-lg text-sm bg-[#FAFAFA] text-[#444444] focus:outline-none focus:border-[#0E292F]/40 cursor-pointer"
//             >
//               <option value="all">All statuses</option>
//               <option value="available">Available</option>
//               <option value="pending">Pending</option>
//               <option value="sold">Sold</option>
//               <option value="rented">Rented</option>
//             </select>
//             <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#ABABAB] pointer-events-none" />
//           </div>
//           {/* View toggle */}
//           <div className="flex rounded-lg border border-[#EBEBEB] overflow-hidden bg-[#FAFAFA]">
//             <button
//               onClick={() => setViewMode("grid")}
//               className={`p-2.5 transition-colors ${viewMode === "grid" ? "bg-[#0E292F] text-white" : "text-[#ABABAB] hover:text-[#555]"}`}
//             >
//               <Grid3x3 className="w-3.5 h-3.5" />
//             </button>
//             <button
//               onClick={() => setViewMode("list")}
//               className={`p-2.5 transition-colors ${viewMode === "list" ? "bg-[#0E292F] text-white" : "text-[#ABABAB] hover:text-[#555]"}`}
//             >
//               <List className="w-3.5 h-3.5" />
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Count */}
//       {filteredProperties.length > 0 && (
//         <p className="text-xs text-[#ABABAB] px-0.5">
//           {filteredProperties.length} of {properties.length} listings
//         </p>
//       )}

//       {/* ── Empty ──────────────────────────────────────────────────────────── */}
//       {filteredProperties.length === 0 && (
//         <PropertiesEmptyState filtered={isFiltered} onAdd={() => setShowModal(true)} />
//       )}

//       {/* ── Grid ──────────────────────────────────────────────────────────── */}
//       {filteredProperties.length > 0 && viewMode === "grid" && (
//         <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
//           {filteredProperties.map((property) => (
//             <div
//               key={property.id}
//               className="group bg-white rounded-xl border border-[#EBEBEB] hover:border-[#DADADA] hover:-translate-y-px transition-all duration-200 overflow-hidden"
//             >
//               {/* Image */}
//               <div className="relative h-52 bg-[#F5F5F5] overflow-hidden">
//                 {property.property_images?.[0]?.url ? (
//                   <img
//                     src={property.property_images[0].url}
//                     alt={property.title}
//                     className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
//                   />
//                 ) : (
//                   <div className="w-full h-full flex items-center justify-center">
//                     <Building2 className="w-10 h-10 text-[#DCDCDC]" />
//                   </div>
//                 )}

//                 {/* Overlay gradient */}
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

//                 {/* Badges */}
//                 <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2">
//                   <span className={`px-2 py-0.5 rounded text-[11px] font-semibold capitalize ${getStyle(statusStyles, property.status)}`}>
//                     {property.status}
//                   </span>
//                   <span className={`px-2 py-0.5 rounded text-[11px] font-semibold ${getStyle(typeStyles, property.type)}`}>
//                     {property.type === "sale" ? "For Sale" : "For Rent"}
//                   </span>
//                 </div>

//                 {/* Price */}
//                 <div className="absolute bottom-3 left-3">
//                   <span className="text-white font-bold text-[17px] drop-shadow">
//                     ₦{Number(property.price).toLocaleString()}
//                   </span>
//                 </div>

//                 {/* Actions overlay */}
//                 <div className="absolute top-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
//                   {/* These are now hidden behind the badges row on top — actions live in the card body */}
//                 </div>
//               </div>

//               {/* Body */}
//               <div className="p-4">
//                 <h3 className="font-semibold text-[#111111] text-sm mb-1 truncate leading-snug">
//                   {property.title}
//                 </h3>
//                 <div className="flex items-center gap-1 text-xs text-[#ABABAB] mb-3">
//                   <MapPin className="w-3 h-3 shrink-0" />
//                   <span className="truncate">
//                     {[property.address, property.city, property.state].filter(Boolean).join(", ") || "—"}
//                   </span>
//                 </div>

//                 <div className="flex items-center gap-4 text-xs text-[#7A7A7A] pt-3 border-t border-[#F0F0F0]">
//                   <span className="flex items-center gap-1">
//                     <BedDouble className="w-3.5 h-3.5 text-[#DCDCDC]" />
//                     <span className="font-semibold text-[#444444]">{property.bedrooms}</span> bd
//                   </span>
//                   <span className="flex items-center gap-1">
//                     <Bath className="w-3.5 h-3.5 text-[#DCDCDC]" />
//                     <span className="font-semibold text-[#444444]">{property.bathrooms}</span> ba
//                   </span>
//                   <span className="flex items-center gap-1">
//                     <Maximize className="w-3.5 h-3.5 text-[#DCDCDC]" />
//                     <span className="font-semibold text-[#444444]">{property.area_sqft ?? "—"}</span> sqft
//                   </span>

//                   {/* Actions — right-aligned */}
//                   <div className="ml-auto flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
//                     <button className="p-1.5 rounded-md text-[#ABABAB] hover:text-[#1D4ED8] hover:bg-[#EFF6FF] transition-colors">
//                       <Eye className="w-3.5 h-3.5" />
//                     </button>
//                     <button className="p-1.5 rounded-md text-[#ABABAB] hover:text-[#444] hover:bg-[#F5F5F5] transition-colors">
//                       <Edit className="w-3.5 h-3.5" />
//                     </button>
//                     <button
//                       onClick={() => handleDelete(property.id)}
//                       disabled={deletingId === property.id}
//                       className="p-1.5 rounded-md text-[#ABABAB] hover:text-[#DC2626] hover:bg-[#FEF2F2] transition-colors disabled:opacity-40"
//                     >
//                       {deletingId === property.id
//                         ? <RefreshCw className="w-3.5 h-3.5 animate-spin" />
//                         : <Trash2 className="w-3.5 h-3.5" />}
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* ── List View ──────────────────────────────────────────────────────── */}
//       {filteredProperties.length > 0 && viewMode === "list" && (
//         <div className="bg-white border border-[#EBEBEB] rounded-xl overflow-hidden">
//           <table className="w-full text-sm">
//             <thead>
//               <tr className="border-b border-[#F0F0F0]">
//                 {["Property", "Type", "Status", "Price", "Details", ""].map((h) => (
//                   <th key={h} className="text-left px-5 py-3 text-[11px] font-semibold text-[#ABABAB] uppercase tracking-wider whitespace-nowrap">
//                     {h}
//                   </th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-[#F5F5F5]">
//               {filteredProperties.map((property) => (
//                 <tr key={property.id} className="hover:bg-[#FAFAFA] transition-colors group">
//                   <td className="px-5 py-3.5">
//                     <div className="flex items-center gap-3">
//                       <div className="w-9 h-9 rounded-lg bg-[#F5F5F5] overflow-hidden shrink-0 flex items-center justify-center border border-[#EBEBEB]">
//                         {property.property_images?.[0]?.url
//                           ? <img src={property.property_images[0].url} alt="" className="w-full h-full object-cover" />
//                           : <Building2 className="w-4 h-4 text-[#DCDCDC]" />}
//                       </div>
//                       <div>
//                         <p className="font-semibold text-[#111111] text-[13px] leading-tight">{property.title}</p>
//                         <p className="text-[11px] text-[#ABABAB] mt-0.5">{property.city || "—"}</p>
//                       </div>
//                     </div>
//                   </td>
//                   <td className="px-5 py-3.5">
//                     <span className={`px-2 py-0.5 rounded text-[11px] font-semibold capitalize ${getStyle(typeStyles, property.type)}`}>
//                       {property.type}
//                     </span>
//                   </td>
//                   <td className="px-5 py-3.5">
//                     <span className={`px-2 py-0.5 rounded text-[11px] font-semibold capitalize ${getStyle(statusStyles, property.status)}`}>
//                       {property.status}
//                     </span>
//                   </td>
//                   <td className="px-5 py-3.5 font-bold text-[#111111] text-[13px] whitespace-nowrap">
//                     ₦{Number(property.price).toLocaleString()}
//                   </td>
//                   <td className="px-5 py-3.5 text-[12px] text-[#7A7A7A] whitespace-nowrap">
//                     {property.bedrooms} bd · {property.bathrooms} ba · {property.area_sqft ?? "—"} sqft
//                   </td>
//                   <td className="px-5 py-3.5">
//                     <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
//                       <button className="p-1.5 rounded-md text-[#ABABAB] hover:text-[#1D4ED8] hover:bg-[#EFF6FF] transition-colors">
//                         <Eye className="w-3.5 h-3.5" />
//                       </button>
//                       <button className="p-1.5 rounded-md text-[#ABABAB] hover:text-[#444] hover:bg-[#F5F5F5] transition-colors">
//                         <Edit className="w-3.5 h-3.5" />
//                       </button>
//                       <button
//                         onClick={() => handleDelete(property.id)}
//                         disabled={deletingId === property.id}
//                         className="p-1.5 rounded-md text-[#ABABAB] hover:text-[#DC2626] hover:bg-[#FEF2F2] transition-colors disabled:opacity-40"
//                       >
//                         {deletingId === property.id
//                           ? <RefreshCw className="w-3.5 h-3.5 animate-spin" />
//                           : <Trash2 className="w-3.5 h-3.5" />}
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}

//       {/* ── Add Property Modal ─────────────────────────────────────────────── */}
//       {showModal && (
//         <div className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-50 flex items-center justify-center p-4">
//           <div
//             className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col border border-[#EBEBEB]"
//             style={{ boxShadow: "0 24px 64px rgba(0,0,0,0.14)" }}
//           >
//             {/* Modal header */}
//             <div className="px-7 py-5 border-b border-[#EBEBEB] flex items-center justify-between shrink-0">
//               <div>
//                 <h3 className="text-[16px] font-bold text-[#111111]">New listing</h3>
//                 <p className="text-xs text-[#ABABAB] mt-0.5">Fill in the details to publish a property.</p>
//               </div>
//               <button
//                 onClick={() => setShowModal(false)}
//                 className="w-8 h-8 rounded-lg border border-[#EBEBEB] bg-[#FAFAFA] hover:bg-[#F0F0F0] flex items-center justify-center text-[#7A7A7A] transition-colors"
//               >
//                 <X className="w-4 h-4" />
//               </button>
//             </div>

//             {/* Form */}
//             <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
//               <div className="px-7 py-6 space-y-8">

//                 {/* Basic info */}
//                 <div>
//                   <SectionLabel label="Basic details" />
//                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                     <Field label="Title" required className="sm:col-span-2">
//                       <input
//                         type="text"
//                         required
//                         placeholder="e.g. 3-bed duplex in Lekki Phase 1"
//                         value={formData.title}
//                         onChange={(e) => setFormData({ ...formData, title: e.target.value })}
//                         className={inputCls}
//                       />
//                     </Field>
//                     <Field label="Description" className="sm:col-span-2">
//                       <textarea
//                         rows={3}
//                         placeholder="Describe the property…"
//                         value={formData.description}
//                         onChange={(e) => setFormData({ ...formData, description: e.target.value })}
//                         className={`${inputCls} resize-none`}
//                       />
//                     </Field>
//                     <Field label="Price (₦)" required>
//                       <div className="relative">
//                         <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-[#ABABAB] font-medium pointer-events-none select-none">₦</span>
//                         <input
//                           type="number"
//                           required
//                           min="0"
//                           placeholder="0"
//                           value={formData.price}
//                           onChange={(e) => setFormData({ ...formData, price: e.target.value })}
//                           className={`${inputCls} pl-8`}
//                         />
//                       </div>
//                     </Field>
//                     <Field label="Listing type" required>
//                       <div className="flex gap-2">
//                         {[
//                           { value: "sale", label: "For sale" },
//                           { value: "rent", label: "For rent" },
//                         ].map(({ value, label }) => (
//                           <button
//                             key={value}
//                             type="button"
//                             onClick={() => setFormData({ ...formData, type: value })}
//                             className={`flex-1 py-2.5 rounded-lg text-sm font-medium border transition-all duration-150 ${
//                               formData.type === value
//                                 ? "bg-[#0E292F] border-[#0E292F] text-white"
//                                 : "bg-white border-[#EBEBEB] text-[#7A7A7A] hover:border-[#DDDDD]"
//                             }`}
//                           >
//                             {label}
//                           </button>
//                         ))}
//                       </div>
//                     </Field>
//                   </div>
//                 </div>

//                 {/* Location */}
//                 <div>
//                   <SectionLabel label="Location" />
//                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                     <Field label="Street address" className="sm:col-span-2">
//                       <input type="text" placeholder="123 Marina Drive" value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} className={inputCls} />
//                     </Field>
//                     <Field label="City">
//                       <input type="text" placeholder="Lagos" value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} className={inputCls} />
//                     </Field>
//                     <Field label="State">
//                       <input type="text" placeholder="Lagos State" value={formData.state} onChange={(e) => setFormData({ ...formData, state: e.target.value })} className={inputCls} />
//                     </Field>
//                     <Field label="Country" className="sm:col-span-2">
//                       <input type="text" placeholder="Nigeria" value={formData.country} onChange={(e) => setFormData({ ...formData, country: e.target.value })} className={inputCls} />
//                     </Field>
//                   </div>
//                 </div>

//                 {/* Property specs */}
//                 <div>
//                   <SectionLabel label="Property specs" />
//                   <div className="grid grid-cols-3 gap-4">
//                     <Field label="Bedrooms">
//                       <input type="number" min="0" placeholder="0" value={formData.bedrooms} onChange={(e) => setFormData({ ...formData, bedrooms: e.target.value })} className={inputCls} />
//                     </Field>
//                     <Field label="Bathrooms">
//                       <input type="number" min="0" placeholder="0" value={formData.bathrooms} onChange={(e) => setFormData({ ...formData, bathrooms: e.target.value })} className={inputCls} />
//                     </Field>
//                     <Field label="Area (sqft)">
//                       <input type="number" min="0" placeholder="0" value={formData.area} onChange={(e) => setFormData({ ...formData, area: e.target.value })} className={inputCls} />
//                     </Field>
//                   </div>
//                 </div>

//                 {/* Photos */}
//                 <div>
//                   <SectionLabel label="Photos" />
//                   <label className="block cursor-pointer">
//                     <div className="border border-dashed border-[#DDDDD] hover:border-[#0E292F]/30 hover:bg-[#FAFAFA] rounded-xl p-8 text-center transition-all">
//                       <div className="w-10 h-10 mx-auto rounded-lg bg-[#F5F5F5] flex items-center justify-center mb-3">
//                         <Upload className="w-5 h-5 text-[#ABABAB]" />
//                       </div>
//                       <p className="text-sm font-medium text-[#444444]">
//                         {formData.imageFiles.length > 0
//                           ? `${formData.imageFiles.length} photo${formData.imageFiles.length > 1 ? "s" : ""} selected`
//                           : "Click to upload photos"}
//                       </p>
//                       <p className="text-xs text-[#ABABAB] mt-1">JPG, PNG or WebP</p>
//                     </div>
//                     <input
//                       type="file"
//                       multiple
//                       accept="image/*"
//                       className="hidden"
//                       onChange={(e) => {
//                         const newFiles = Array.from(e.target.files || []);
//                         if (newFiles.length > 0) {
//                           setFormData((prev) => ({ ...prev, imageFiles: [...prev.imageFiles, ...newFiles] }));
//                         }
//                         e.target.value = "";
//                       }}
//                     />
//                   </label>

//                   {formData.imageFiles.length > 0 && (
//                     <div className="flex gap-2 mt-3 flex-wrap">
//                       {formData.imageFiles.map((file, i) => (
//                         <div key={`${file.name}-${i}`} className="relative w-16 h-16 rounded-lg overflow-hidden border border-[#EBEBEB] group">
//                           <img src={URL.createObjectURL(file)} alt="" className="w-full h-full object-cover" />
//                           <button
//                             type="button"
//                             onClick={() => setFormData((prev) => ({ ...prev, imageFiles: prev.imageFiles.filter((_, idx) => idx !== i) }))}
//                             className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
//                           >
//                             <X className="w-4 h-4 text-white" />
//                           </button>
//                         </div>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               </div>

//               {/* Footer */}
//               <div className="sticky bottom-0 bg-white border-t border-[#EBEBEB] px-7 py-4 flex items-center justify-between gap-3">
//                 <button
//                   type="button"
//                   onClick={() => setShowModal(false)}
//                   className="px-5 py-2.5 border border-[#EBEBEB] rounded-lg text-sm font-medium text-[#555555] hover:bg-[#F8F8F8] transition-colors"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   disabled={submitting}
//                   className="px-6 py-2.5 bg-[#0E292F] text-white rounded-lg text-sm font-semibold hover:bg-[#163a42] transition-colors disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-2"
//                 >
//                   {submitting ? (
//                     <><RefreshCw className="w-4 h-4 animate-spin" />Publishing…</>
//                   ) : (
//                     <><Plus className="w-4 h-4" />Publish listing</>
//                   )}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


import { useEffect, useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate()
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
        type: p.listing_type || p.property_type || "sale",
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
      (p) => setProperties((prev) => [{ ...p, type: p.listing_type || p.property_type || "sale" }, ...prev]),
      (p) => setProperties((prev) => prev.map((x) => x.id === p.id ? { ...p, type: p.listing_type || p.property_type || "sale" } : x)),
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
      type: property.listing_type || property.property_type || "sale",
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
              <option value="commercial">For commercial</option>
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
                            { value: "sale", label: "🏷️ For sale" },
                            { value: "rent", label: "📋 For rent" },
                            { value: "commercial", label: "🏢 For commercial" },
                            { value: "land", label: "🌾 Land" },
                          ].map(({ value, label }) => (
                            <button
                              key={value} type="button"
                              onClick={() => setEditFormData({ ...editFormData, type: value })}
                              className={`rounded-md text-sm font-semibold border transition-all duration-150 font-sans ${
                                editFormData.type === value
                                  ? "bg-[#0E292F] border-[#0E292F] text-white"
                                  : "bg-white border-[#E5E7EB] text-[#6B6B66] hover:border-[#0E292F]/30"
                              }`}
                            >
                              {label}
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
                            { value: "sale", label: "🏷️ For sale" },
                            { value: "rent", label: "📋 For rent" },
                            { value: "commercial", label: "🏢 For commercial" },
                            { value: "land", label: "🌾 Land" },
                          ].map(({ value, label }) => (
                            <button
                              key={value} type="button"
                              onClick={() => setFormData({ ...formData, type: value })}
                              className={`rounded-md text-sm font-semibold border transition-all duration-150 font-sans ${
                                formData.type === value
                                  ? "bg-[#0E292F] border-[#0E292F] text-white"
                                  : "bg-white border-[#E5E7EB] text-[#6B6B66] hover:border-[#0E292F]/30"
                              }`}
                            >
                              {label}
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