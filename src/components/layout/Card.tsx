// @/components/card.tsx
import { MapPin, BedDouble, Bath, Maximize, Clock, Bookmark } from "lucide-react";

interface PropertyCardProps {
  property: {
    id: string;
    title: string;
    location: string;
    price: number;
    type: "sale" | "rent";
    bedrooms?: number;
    bathrooms?: number;
    area?: number;
    property_type?: string;
    images: string[];
    createdAt?: string;
  };
  onClick: () => void;
  formatPrice: (price: any) => string;
}

export function PropertyCard({ property, onClick, formatPrice }: PropertyCardProps) {
  return (
    <article
      onClick={onClick}
      className="group bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col cursor-pointer"
    >
      {/* Media Window */}
      <div className="relative h-56 bg-gray-50 overflow-hidden shrink-0">
        {property.images?.[0] ? (
          <img
            src={property.images[0]}
            alt={property.title}
            className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-50/50">
            <span className="text-xs text-gray-400 font-medium">No Image Available</span>
          </div>
        )}
        
        {/* Status Tags */}
        <div className="absolute top-3 left-3 flex gap-1.5">
          <span className="px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wider uppercase bg-white/95 backdrop-blur-sm text-gray-900 shadow-sm">
            {property.type === "sale" ? "For Sale" : "For Rent"}
          </span>
          {property.property_type && (
            <span className="px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wider uppercase bg-emerald-600/10 backdrop-blur-sm text-emerald-800 shadow-sm">
              {property.property_type}
            </span>
          )}
        </div>
        
        <div className="absolute top-3 right-3">
          <button 
            onClick={(e) => e.stopPropagation()} 
            className="w-7 h-7 rounded-md bg-white/85 backdrop-blur-sm flex items-center justify-center text-gray-400 hover:text-emerald-600 transition-colors shadow-sm"
          >
            <Bookmark className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Details Box */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-baseline flex-wrap gap-1 mb-2">
            <span className="text-xl font-bold text-gray-900">
              ₦{formatPrice(property.price)}
            </span>
            {property.type === "rent" && (
              <span className="text-xs text-gray-400 font-medium">/ annum</span>
            )}
          </div>

          <h3 className="text-base font-semibold text-gray-900 line-clamp-1 mb-1 group-hover:text-emerald-700 transition-colors">
            {property.title}
          </h3>

          <div className="flex items-center gap-1 text-xs text-gray-400 font-medium mb-4">
            <MapPin className="w-3.5 h-3.5 text-gray-300 shrink-0" />
            <span className="line-clamp-1">{property.location}</span>
          </div>
        </div>

        {/* Minimal Specs Row */}
        <div className="pt-4 border-t border-gray-100 flex items-center justify-between gap-4 text-xs font-semibold text-gray-600">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-md border border-gray-100/50">
              <BedDouble className="w-3.5 h-3.5 text-gray-400" /> {property.bedrooms || 0}
            </span>
            <span className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-md border border-gray-100/50">
              <Bath className="w-3.5 h-3.5 text-gray-400" /> {property.bathrooms || 0}
            </span>
            {property.area ? (
              <span className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-md border border-gray-100/50">
                <Maximize className="w-3.5 h-3.5 text-gray-400" /> {property.area.toLocaleString()} sqft
              </span>
            ) : null}
          </div>
          
          <span className="text-[10px] text-gray-400 font-medium flex items-center gap-1 shrink-0">
            <Clock className="w-3 h-3" />
            {property.createdAt
              ? new Date(property.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })
              : "Now"}
          </span>
        </div>
      </div>
    </article>
  );
}