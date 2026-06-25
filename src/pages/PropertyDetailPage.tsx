import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase/client";
import { trackPropertyView } from "@/lib/trackPageView";
import {
  MapPin, BedDouble, Bath, Maximize, Home, ArrowLeft,
  Phone, Mail, Clock, Loader2, ChevronLeft, ChevronRight, X
} from "lucide-react";

export default function PropertyDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [property, setProperty] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const fetchProperty = useCallback(async () => {
    if (!id) return;
    try {
      setLoading(true);
      setError(null);
      const { data, error: fetchError } = await supabase
        .from("properties")
        .select("*, property_images(*)")
        .eq("id", id)
        .single();

      if (fetchError) throw fetchError;

      const mapped = {
        ...data,
        type: data.listing_type || "sale",
        location: [data.address, data.city, data.state].filter(Boolean).join(", ") || data.city || "Unknown",
        area: data.area_sqft || 0,
        images: (data.property_images || []).map((img: any) => img.url),
        createdAt: data.created_at,
      };

      setProperty(mapped);
      trackPropertyView(mapped.id);
    } catch (err: any) {
      setError(err.message || "Unable to load property");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchProperty();
  }, [fetchProperty]);

  // Lock body scroll when lightbox is open
  useEffect(() => {
    if (lightboxOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [lightboxOpen]);

  const formatPrice = (price: any) => {
    const num = Number(price);
    return isNaN(num) ? "0" : num.toLocaleString();
  };

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex(prev => prev === 0 ? property.images.length - 1 : prev - 1);
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex(prev => prev === property.images.length - 1 ? 0 : prev + 1);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-neutral-400 mx-auto" />
          <p className="mt-4 text-sm text-neutral-500">Loading property...</p>
        </div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center max-w-md px-6">
          <Home className="w-12 h-12 text-neutral-300 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-neutral-900 mb-2">Property Not Found</h2>
          <p className="text-sm text-neutral-500 mb-6">
            {error || "This property is no longer available or doesn't exist."}
          </p>
          <button
            onClick={() => navigate("/properties")}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white rounded-lg text-sm font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to listings
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Bar */}
      <div className="border-b border-neutral-200 bg-white">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate("/properties")}
            className="inline-flex items-center gap-2 text-sm text-neutral-600 hover:text-neutral-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to listings
          </button>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 text-xs font-medium bg-emerald-50 text-emerald-700 rounded-full">
              Available
            </span>
            <span className="px-3 py-1 text-xs font-medium bg-neutral-100 text-neutral-700 rounded-full">
              {property.type === "sale" ? "For Sale" : property.type === "rent" ? "For Rent" : "Commercial"}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Compact Image Gallery */}
        <div className="relative h-72 sm:h-80 rounded-lg overflow-hidden bg-neutral-100 mb-8 group cursor-pointer" onClick={() => setLightboxOpen(true)}>
          {property.images?.length > 0 ? (
            <>
              <img
                src={property.images[currentImageIndex]}
                alt={property.title}
                className="w-full h-full object-contain"
              />
              
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 backdrop-blur-sm rounded-lg px-4 py-2 text-sm font-medium text-neutral-900 shadow-lg">
                  Click to view full image
                </div>
              </div>

              {property.images.length > 1 && (
                <>
                  {/* Navigation Arrows */}
                  <button
                    onClick={handlePrevImage}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/95 hover:bg-white shadow-md flex items-center justify-center transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <ChevronLeft className="w-4 h-4 text-neutral-700" />
                  </button>
                  <button
                    onClick={handleNextImage}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/95 hover:bg-white shadow-md flex items-center justify-center transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <ChevronRight className="w-4 h-4 text-neutral-700" />
                  </button>
                  
                  {/* Counter */}
                  <div className="absolute bottom-3 right-3 px-2.5 py-1 bg-white/95 rounded-md text-xs font-medium text-neutral-700 shadow-sm">
                    {currentImageIndex + 1}/{property.images.length}
                  </div>
                  
                  {/* Dots */}
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                    {property.images.map((_: string, i: number) => (
                      <button
                        key={i}
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentImageIndex(i);
                        }}
                        className={`h-1.5 rounded-full transition-all ${
                          i === currentImageIndex ? "w-5 bg-white shadow-sm" : "w-1.5 bg-white/70"
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-neutral-50">
              <div className="text-center">
                <Home className="w-10 h-10 text-neutral-300 mx-auto mb-2" />
                <p className="text-sm text-neutral-400">No images</p>
              </div>
            </div>
          )}
        </div>

        {/* Title & Price */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-6 pb-6 border-b border-neutral-100">
          <div className="flex-1">
            <h1 className="text-xl sm:text-2xl font-semibold text-neutral-900 mb-1.5">
              {property.title}
            </h1>
            <div className="flex items-center gap-1.5 text-sm text-neutral-500">
              <MapPin className="w-3.5 h-3.5" />
              <span>{property.location || "Location not specified"}</span>
            </div>
          </div>
          <div className="sm:text-right">
            <p className="text-xl sm:text-2xl font-semibold text-neutral-900">
              ₦{formatPrice(property.price)}
            </p>
            {property.type === "rent" && (
              <p className="text-xs text-neutral-500 mt-0.5">per annum</p>
            )}
          </div>
        </div>

        {/* Property Details */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          <div className="border border-neutral-200 rounded-lg p-3.5">
            <BedDouble className="w-4 h-4 text-neutral-400 mb-1.5" />
            <p className="text-lg font-semibold text-neutral-900">{property.bedrooms || 0}</p>
            <p className="text-xs text-neutral-500 font-medium">Bedrooms</p>
          </div>
          <div className="border border-neutral-200 rounded-lg p-3.5">
            <Bath className="w-4 h-4 text-neutral-400 mb-1.5" />
            <p className="text-lg font-semibold text-neutral-900">{property.bathrooms || 0}</p>
            <p className="text-xs text-neutral-500 font-medium">Bathrooms</p>
          </div>
          <div className="border border-neutral-200 rounded-lg p-3.5">
            <Maximize className="w-4 h-4 text-neutral-400 mb-1.5" />
            <p className="text-lg font-semibold text-neutral-900">
              {property.area ? property.area.toLocaleString() : "—"}
            </p>
            <p className="text-xs text-neutral-500 font-medium">Sqft</p>
          </div>
          <div className="border border-neutral-200 rounded-lg p-3.5">
            <Home className="w-4 h-4 text-neutral-400 mb-1.5" />
            <p className="text-lg font-semibold text-neutral-900 capitalize">
              {property.property_type || property.type}
            </p>
            <p className="text-xs text-neutral-500 font-medium">Type</p>
          </div>
        </div>

        {/* Description */}
        {property.description && (
          <div className="mb-6">
            <h2 className="text-sm font-semibold text-neutral-900 uppercase tracking-wider mb-2.5">
              Description
            </h2>
            <p className="text-sm text-neutral-600 leading-relaxed">{property.description}</p>
          </div>
        )}

        {/* Meta Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          <div className="group relative bg-gradient-to-br from-neutral-50 to-white border border-neutral-200 rounded-lg p-4 hover:border-neutral-300 hover:shadow-md transition-all duration-300 overflow-hidden">
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 rounded-md bg-neutral-900 flex items-center justify-center">
                  <Home className="w-3.5 h-3.5 text-white" />
                </div>
                <p className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider">Property Type</p>
              </div>
              <p className="text-sm font-bold text-neutral-900 capitalize tracking-tight">
                {property.property_type || property.type}
              </p>
            </div>
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-neutral-100/50 to-transparent rounded-full -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-500" />
          </div>

          <div className="group relative bg-gradient-to-br from-neutral-50 to-white border border-neutral-200 rounded-lg p-4 hover:border-neutral-300 hover:shadow-md transition-all duration-300 overflow-hidden">
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 rounded-md bg-neutral-900 flex items-center justify-center">
                  <Clock className="w-3.5 h-3.5 text-white" />
                </div>
                <p className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider">Listed On</p>
              </div>
              <p className="text-sm font-bold text-neutral-900 tracking-tight">
                {property.createdAt
                  ? new Date(property.createdAt).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })
                  : "Recently"}
              </p>
            </div>
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-neutral-100/50 to-transparent rounded-full -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-500" />
          </div>
        </div>

        {/* Contact */}
        <div className="bg-neutral-900 rounded-lg p-5 sm:p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-semibold text-white mb-1">Interested in this property?</h2>
              <p className="text-sm text-neutral-400">Contact our team for more information.</p>
            </div>
            <div className="flex gap-2.5 w-full sm:w-auto">
              <a
                href="tel:+2348092949777"
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2 bg-white text-neutral-900 rounded-md text-sm font-medium hover:bg-neutral-100 transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                Call
              </a>
              <button className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2 border border-neutral-600 text-white rounded-md text-sm font-medium hover:border-neutral-400 transition-colors">
                <Mail className="w-3.5 h-3.5" />
                Message
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center"
          onClick={() => setLightboxOpen(false)}
        >
          {/* Close button */}
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>

          {/* Image counter */}
          <div className="absolute top-4 left-4 px-3 py-1.5 bg-white/10 rounded-md text-sm font-medium text-white backdrop-blur-sm">
            {currentImageIndex + 1} / {property.images.length}
          </div>

          {/* Navigation arrows */}
          {property.images.length > 1 && (
            <>
              <button
                onClick={handlePrevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>
              <button
                onClick={handleNextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>
            </>
          )}

          {/* Main image */}
          <div className="w-full h-full max-w-7xl max-h-[90vh] mx-auto p-4 flex items-center justify-center">
            <img
              src={property.images[currentImageIndex]}
              alt={property.title}
              className="max-w-full max-h-full object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </div>

          {/* Thumbnail strip */}
          {property.images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 overflow-x-auto max-w-[90vw] px-4 py-2">
              {property.images.map((img: string, i: number) => (
                <button
                  key={i}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentImageIndex(i);
                  }}
                  className={`flex-shrink-0 w-16 h-12 rounded-md overflow-hidden border-2 transition-all ${
                    i === currentImageIndex ? "border-white opacity-100" : "border-transparent opacity-60 hover:opacity-80"
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}