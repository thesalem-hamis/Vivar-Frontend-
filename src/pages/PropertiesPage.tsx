import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/lib/supabase/client";
import { trackPropertyView } from "@/lib/trackPageView";
import {
  Search, MapPin, BedDouble, Bath, Maximize, Home, Filter, X, ArrowLeft,
  Calendar, Building2, User, Mail, Phone, Clock,
} from "lucide-react";

type PropertyType = "sale" | "rent";

const propertyTypes: { value: PropertyType | "all"; label: string }[] = [
  { value: "all", label: "All Properties" },
  { value: "sale", label: "For Sale" },
  { value: "rent", label: "For Rent" },
];

export default function PropertiesListingPage() {
  const [properties, setProperties] = useState<any[]>([]);
  const [filtered, setFiltered] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<PropertyType | "all">("all");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<any>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const fetchProperties = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const { data, error: fetchError } = await supabase
        .from("properties")
        .select("*, property_images(*)")
        .eq("status", "available")
        .order("created_at", { ascending: false });

      if (fetchError) throw fetchError;

      const mapped = (data || []).map((p: any) => ({
        ...p,
        type: p.listing_type || "sale",
        location: [p.address, p.city, p.state].filter(Boolean).join(", ") || p.city || "Unknown",
        area: p.area_sqft || 0,
        images: (p.property_images || []).map((img: any) => img.url),
        createdAt: p.created_at,
      }));

      setProperties(mapped);
      setFiltered(mapped);
    } catch (err: any) {
      setError(err.message || "Unable to load properties");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  // Real-time updates
  useEffect(() => {
    const channel = supabase
      .channel("public-properties")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "properties" },
        () => {
          fetchProperties();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchProperties]);

  useEffect(() => {
    let result = properties;

    if (selectedType !== "all") {
      result = result.filter((p) => p.type === selectedType);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          (p.title || "").toLowerCase().includes(q) ||
          (p.location || "").toLowerCase().includes(q) ||
          (p.description || "").toLowerCase().includes(q)
      );
    }

    setFiltered(result);
  }, [searchQuery, selectedType, properties]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedType("all");
  };

  const openDetails = (property: any) => {
    setSelectedProperty(property);
    setCurrentImageIndex(0);
    trackPropertyView(property.id);
  };

  const closeDetails = () => {
    setSelectedProperty(null);
    setCurrentImageIndex(0);
  };

  const nextImage = () => {
    if (!selectedProperty) return;
    setCurrentImageIndex((prev) =>
      prev === selectedProperty.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    if (!selectedProperty) return;
    setCurrentImageIndex((prev) =>
      prev === 0 ? selectedProperty.images.length - 1 : prev - 1
    );
  };

  const hasActiveFilters = searchQuery.trim() !== "" || selectedType !== "all";

  const formatPrice = (price: any) => {
    const num = Number(price);
    return isNaN(num) ? "0" : num.toLocaleString();
  };

  const formatArea = (area: any) => {
    const num = Number(area);
    return isNaN(num) ? "—" : num.toLocaleString();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="w-16 h-16 rounded-2xl border-4 border-slate-200 border-t-slate-900 animate-spin mx-auto" />
          <p className="mt-4 text-slate-600 font-medium">Discovering properties...</p>
          <p className="text-sm text-slate-400 mt-1">Loading the best listings for you</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="bg-white rounded-2xl border border-slate-200 p-8 max-w-md text-center shadow-lg">
          <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
            <X className="w-7 h-7 text-red-500" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 mb-2">Unable to Load</h3>
          <p className="text-sm text-slate-500 mb-4">{error}</p>
          <button
            onClick={fetchProperties}
            className="px-5 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-medium hover:bg-slate-800 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero — Compact */}
      <div className="relative bg-gradient-to-r from-slate-900 to-slate-800 border-b border-slate-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div className="shrink-0">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white/80 text-xs font-medium mb-3">
                <Building2 className="w-3 h-3" />
                Investment Portfolio
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Premium Properties
              </h1>
              <p className="mt-1.5 text-sm text-white/50 max-w-md">
                Curated real estate investments verified for long-term value.
              </p>
            </div>

            {/* Search & Filters */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-72">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search properties..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-white/20 focus:bg-white/15 transition-all"
                />
              </div>
              <button
                onClick={() => setShowFilters((v) => !v)}
                className={`shrink-0 inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border text-xs font-semibold transition-all duration-200 ${
                  showFilters || hasActiveFilters
                    ? "border-white bg-white text-slate-900"
                    : "border-white/10 text-white/80 hover:border-white/30"
                }`}
              >
                <Filter className="w-3.5 h-3.5" />
                Filters
                {hasActiveFilters && (
                  <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-slate-900 text-white text-[10px]">
                    {(selectedType !== "all" ? 1 : 0) + (searchQuery.trim() ? 1 : 0)}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Filter chips */}
          {showFilters && (
            <div className="mt-4 flex flex-wrap items-center gap-2">
              {propertyTypes.map((type) => (
                <button
                  key={type.value}
                  onClick={() => setSelectedType(type.value)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                    selectedType === type.value
                      ? "bg-white text-slate-900 shadow-md"
                      : "bg-white/5 text-white/70 hover:bg-white/10 border border-white/10"
                  }`}
                >
                  {type.label}
                </button>
              ))}
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-white/50 hover:text-white transition-colors"
                >
                  <X className="w-3 h-3" />
                  Clear
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-sm text-slate-500">
              <span className="font-semibold text-slate-900 text-lg">{filtered.length}</span>{" "}
              {filtered.length === 1 ? "property" : "properties"} found
            </p>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="bg-white rounded-3xl border border-slate-200 p-16 text-center shadow-sm">
            <div className="w-20 h-20 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-6">
              <Home className="w-10 h-10 text-slate-400" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">No properties found</h3>
            <p className="text-slate-500 mb-6">Try adjusting your search or filter criteria</p>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="inline-flex items-center gap-2 px-5 py-3 bg-slate-900 text-white rounded-xl text-sm font-semibold hover:bg-slate-800 transition-colors"
              >
                Clear filters
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filtered.map((property) => (
              <article
                key={property.id}
                className="group bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative h-56 bg-slate-100 overflow-hidden">
                  {property.images?.[0] ? (
                    <img
                      src={property.images[0]}
                      alt={property.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">
                      <Home className="w-16 h-16 text-slate-300" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1.5 rounded-full text-[11px] font-bold bg-white/95 backdrop-blur-sm text-slate-900 shadow-lg">
                      {property.type === "sale" ? "🏷️ For Sale" : "📋 For Rent"}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className="px-3 py-1.5 rounded-full text-[11px] font-bold bg-emerald-500 text-white shadow-lg">
                      Available
                    </span>
                  </div>
                  {property.images.length > 1 && (
                    <div className="absolute bottom-3 right-3 px-2 py-1 rounded-lg bg-black/50 backdrop-blur-sm text-white text-xs font-medium">
                      +{property.images.length - 1} photos
                    </div>
                  )}
                </div>

                <div className="p-5">
                  <h3 className="text-lg font-semibold text-slate-900 line-clamp-1 mb-2 group-hover:text-slate-700 transition-colors">
                    {property.title}
                  </h3>
                  <div className="flex items-center gap-1.5 text-sm text-slate-500 mb-4">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="line-clamp-1">{property.location || "—"}</span>
                  </div>

                  <div className="flex items-baseline gap-1 mb-4">
                    <span className="text-2xl font-bold text-slate-900">₦{formatPrice(property.price)}</span>
                    {property.type === "rent" && <span className="text-sm text-slate-500">/year</span>}
                  </div>

                  <div className="flex items-center gap-4 text-sm text-slate-500 mb-5 pb-5 border-b border-slate-100">
                    <span className="flex items-center gap-1.5"><BedDouble className="w-4 h-4 text-slate-400" /><span className="font-semibold text-slate-700">{property.bedrooms || 0}</span></span>
                    <span className="flex items-center gap-1.5"><Bath className="w-4 h-4 text-slate-400" /><span className="font-semibold text-slate-700">{property.bathrooms || 0}</span></span>
                    <span className="flex items-center gap-1.5"><Maximize className="w-4 h-4 text-slate-400" /><span className="font-semibold text-slate-700">{formatArea(property.area)}</span><span className="text-xs text-slate-400">sqft</span></span>
                  </div>

                  <div className="flex items-center justify-between">
                    <p className="text-xs text-slate-400 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      {property.createdAt
                        ? new Date(property.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })
                        : "Recently"}
                    </p>
                    <button
                      onClick={() => openDetails(property)}
                      className="text-sm font-semibold text-slate-900 hover:text-slate-600 transition-colors group-hover:underline"
                    >
                      View details →
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {/* Property Detail Modal */}
      {selectedProperty && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-5xl max-h-[92vh] overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="relative bg-gradient-to-r from-slate-900 to-slate-800 px-6 py-4 flex items-center justify-between shrink-0">
              <button
                onClick={closeDetails}
                className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="text-sm font-medium">Back to listings</span>
              </button>
              <div className="flex items-center gap-3">
                <span className="px-3 py-1.5 rounded-full text-xs font-bold bg-emerald-500 text-white">
                  Available
                </span>
                <span className="px-3 py-1.5 rounded-full text-xs font-bold bg-white/20 text-white">
                  {selectedProperty.type === "sale" ? "For Sale" : "For Rent"}
                </span>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              {/* Image Gallery */}
              <div className="relative h-[400px] bg-slate-900">
                {selectedProperty.images?.length > 0 ? (
                  <>
                    <img
                      src={selectedProperty.images[currentImageIndex]}
                      alt={selectedProperty.title}
                      className="w-full h-full object-cover"
                    />
                    {selectedProperty.images.length > 1 && (
                      <>
                        <button
                          onClick={prevImage}
                          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/40 text-white flex items-center justify-center transition-all"
                        >
                          ←
                        </button>
                        <button
                          onClick={nextImage}
                          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/40 text-white flex items-center justify-center transition-all"
                        >
                          →
                        </button>
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                          {selectedProperty.images.map((_: string, i: number) => (
                            <button
                              key={i}
                              onClick={() => setCurrentImageIndex(i)}
                              className={`w-2.5 h-2.5 rounded-full transition-all ${
                                i === currentImageIndex ? "bg-white scale-110" : "bg-white/40 hover:bg-white/60"
                              }`}
                            />
                          ))}
                        </div>
                        <div className="absolute bottom-4 right-4 px-3 py-1.5 rounded-lg bg-black/50 backdrop-blur-sm text-white text-xs font-medium">
                          {currentImageIndex + 1} / {selectedProperty.images.length}
                        </div>
                      </>
                    )}
                  </>
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Home className="w-24 h-24 text-white/20" />
                  </div>
                )}
              </div>

              {/* Details */}
              <div className="p-8">
                <div className="flex items-start justify-between gap-6 mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">{selectedProperty.title}</h2>
                    <div className="flex items-center gap-1.5 text-slate-500">
                      <MapPin className="w-4 h-4 text-slate-400" />
                      <span>{selectedProperty.location || "—"}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold text-slate-900">₦{formatPrice(selectedProperty.price)}</p>
                    {selectedProperty.type === "rent" && <p className="text-sm text-slate-500">per year</p>}
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                  <div className="bg-slate-50 rounded-xl p-4 text-center">
                    <BedDouble className="w-5 h-5 text-slate-500 mx-auto mb-1" />
                    <p className="text-lg font-bold text-slate-900">{selectedProperty.bedrooms || 0}</p>
                    <p className="text-xs text-slate-500">Bedrooms</p>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-4 text-center">
                    <Bath className="w-5 h-5 text-slate-500 mx-auto mb-1" />
                    <p className="text-lg font-bold text-slate-900">{selectedProperty.bathrooms || 0}</p>
                    <p className="text-xs text-slate-500">Bathrooms</p>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-4 text-center">
                    <Maximize className="w-5 h-5 text-slate-500 mx-auto mb-1" />
                    <p className="text-lg font-bold text-slate-900">{formatArea(selectedProperty.area)}</p>
                    <p className="text-xs text-slate-500">Sqft</p>
                  </div>
                </div>

                {/* Description */}
                {selectedProperty.description && (
                  <div className="mb-8">
                    <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-3">Description</h3>
                    <p className="text-slate-600 leading-relaxed">{selectedProperty.description}</p>
                  </div>
                )}

                {/* Additional Info */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl">
                    <Building2 className="w-5 h-5 text-slate-500" />
                    <div>
                      <p className="text-xs text-slate-500">Property Type</p>
                      <p className="text-sm font-semibold text-slate-900 capitalize">{selectedProperty.property_type || selectedProperty.type}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl">
                    <Calendar className="w-5 h-5 text-slate-500" />
                    <div>
                      <p className="text-xs text-slate-500">Listed On</p>
                      <p className="text-sm font-semibold text-slate-900">
                        {selectedProperty.createdAt
                          ? new Date(selectedProperty.createdAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
                          : "Recently"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Contact CTA */}
                <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-6 text-white">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                      <User className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">Interested in this property?</h4>
                      <p className="text-white/60 text-sm">Contact an agent for more information</p>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button className="flex-1 px-5 py-3 bg-white text-slate-900 rounded-xl text-sm font-bold hover:bg-white/90 transition-all">
                      <span className="flex items-center justify-center gap-2">
                        <Phone className="w-4 h-4" />
                        Request a Call
                      </span>
                    </button>
                    <button className="flex-1 px-5 py-3 bg-white/10 backdrop-blur-sm rounded-xl text-sm font-bold hover:bg-white/20 transition-all border border-white/10">
                      <span className="flex items-center justify-center gap-2">
                        <Mail className="w-4 h-4" />
                        Send Message
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}