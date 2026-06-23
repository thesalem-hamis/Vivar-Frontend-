import { useState } from "react";
import { formatPrice } from "../../lib/api/services/property.api";
import type { Property } from "../../types/property.types";
import { PURPOSE_LABELS, SUB_TYPE_LABELS } from "../../types/property.types";
import {
  BedIcon,
  BathIcon,
  AreaIcon,
  PinIcon,
  VerifiedIcon,
  HeartIcon,
  ArrowRightIcon,
  EyeIcon,
  SparkleIcon,
} from "../../assets/icons/property.icon";

// ─── Image fallbacks by property type ────────────────────────────────────────

const TYPE_IMAGES: Record<string, string[]> = {
  HOUSE: [
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?q=80&w=800&auto=format&fit=crop",
  ],
  FLAT_APARTMENT: [
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600210492486-715a3ca7b5cb?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1571055107559-3e67626fa8be?q=80&w=800&auto=format&fit=crop",
  ],
  COMMERCIAL: [
    "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop",
  ],
  LAND: [
    "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=800&auto=format&fit=crop",
  ],
  EVENT_CENTRE: [
    "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=800&auto=format&fit=crop",
  ],
};

function getImage(p: Property): string {
  const pool = TYPE_IMAGES[p.propertyType] ?? TYPE_IMAGES.HOUSE;
  const idx =
    parseInt(p.id.replace(/\D/g, "").slice(-2) || "0", 10) % pool.length;
  return pool[idx];
}

// ─── Purpose badge colours ────────────────────────────────────────────────────

const PURPOSE_BADGE: Record<string, string> = {
  FOR_SALE: "bg-[#0E292F] text-white",
  FOR_RENT: "bg-[#3D7188] text-white",
  SHORT_LET: "bg-amber-800 text-white",
  JOINT_VENTURE: "bg-violet-900 text-white",
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function locationStr(p: Property): string {
  if (!p.location) return "Nigeria";
  return [p.location.localityArea, p.location.state].filter(Boolean).join(", ");
}

function estateLine(p: Property): string | null {
  return p.location?.estateName ?? null;
}

// ─── Grid Card ────────────────────────────────────────────────────────────────

function GridCard({ p }: { p: Property }) {
  const [liked, setLiked] = useState(false);

  return (
    <article className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-400 flex flex-col">
      {/* ── Image ── */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={getImage(p)}
          alt={p.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

        {/* Top badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          <span
            className={`text-[10px] font-bold tracking-[0.12em] uppercase px-2.5 py-1 rounded-full ${PURPOSE_BADGE[p.purpose]}`}
          >
            {PURPOSE_LABELS[p.purpose]}
          </span>
          {p.isFeatured && (
            <span className="flex items-center gap-1 text-[10px] font-bold tracking-[0.12em] uppercase px-2.5 py-1 rounded-full bg-[#D4E9B9] text-[#0E292F]">
              <SparkleIcon size={10} className="text-[#0E292F]" /> Featured
            </span>
          )}
        </div>

        {/* Heart */}
        <button
          onClick={() => setLiked(!liked)}
          aria-label={liked ? "Remove from favourites" : "Save to favourites"}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors shadow-sm"
        >
          <HeartIcon
            size={14}
            filled={liked}
            className={liked ? "text-red-500" : "text-gray-500"}
          />
        </button>

        {/* Location over image */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1">
          <PinIcon size={12} className="text-[#D4E9B9] shrink-0" />
          <span className="text-white text-[11px] font-medium leading-none">
            {locationStr(p)}
          </span>
        </div>

        {/* Views */}
        {p.viewsCount > 0 && (
          <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-black/30 backdrop-blur-sm px-2 py-1 rounded-full">
            <EyeIcon size={10} className="text-white/80" />
            <span className="text-[9px] text-white/80 font-medium">
              {p.viewsCount}
            </span>
          </div>
        )}
      </div>

      {/* ── Body ── */}
      <div className="flex flex-col flex-1 p-4">
        {/* Title + verified */}
        <div className="flex items-start gap-2 mb-0.5">
          <h3 className="text-[14px] font-bold text-[#0E292F] leading-snug line-clamp-2 flex-1">
            {p.title}
          </h3>
          {p.isVerified && (
            <VerifiedIcon
              size={16}
              className="text-[#3D7188] shrink-0 mt-0.5"
            />
          )}
        </div>

        {/* Sub-type & estate */}
        <p className="text-[11px] text-gray-400 mb-3 leading-none">
          {SUB_TYPE_LABELS[p.propertySubType]}
          {estateLine(p) && (
            <span className="text-gray-300"> · {estateLine(p)}</span>
          )}
        </p>

        {/* Feature chips */}
        <div className="flex items-center gap-2.5 mb-4 flex-wrap">
          {p.bedrooms != null && (
            <span className="flex items-center gap-1 text-[11px] text-gray-600">
              <BedIcon size={13} className="text-gray-400" /> {p.bedrooms} Bed
              {p.bedrooms !== 1 ? "s" : ""}
            </span>
          )}
          {p.bathrooms != null && (
            <span className="flex items-center gap-1 text-[11px] text-gray-600">
              <BathIcon size={13} className="text-gray-400" /> {p.bathrooms}{" "}
              Bath{p.bathrooms !== 1 ? "s" : ""}
            </span>
          )}
          {p.floorAreaSqm != null && (
            <span className="flex items-center gap-1 text-[11px] text-gray-600">
              <AreaIcon size={13} className="text-gray-400" />{" "}
              {Number(p.floorAreaSqm).toFixed(0)} m²
            </span>
          )}
          {p.amenities?.isServiced && (
            <span className="ml-auto text-[9px] font-bold tracking-wider text-[#3D7188] bg-[#3D7188]/10 px-1.5 py-0.5 rounded-full uppercase">
              Serviced
            </span>
          )}
        </div>

        {/* Price + CTA */}
        <div className="mt-auto pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
          <div>
            <p className="text-[18px] font-bold text-[#0E292F] leading-none font-serif">
              {formatPrice(p.pricing)}
            </p>
            {p.amenities?.hasBq && (
              <p className="text-[10px] text-gray-400 mt-0.5">Includes BQ</p>
            )}
          </div>
          <a
            href={`/properties/${p.id}`}
            className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-[11px] font-bold tracking-wider uppercase border border-[#0E292F]/15 text-[#0E292F] hover:bg-[#0E292F] hover:text-white hover:border-[#0E292F] transition-all duration-250"
          >
            View <ArrowRightIcon size={12} strokeWidth={2.5} />
          </a>
        </div>
      </div>
    </article>
  );
}

// ─── List Card ────────────────────────────────────────────────────────────────

function ListCard({ p }: { p: Property }) {
  const [liked, setLiked] = useState(false);

  return (
    <article className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 flex">
      {/* Image */}
      <div className="relative w-52 sm:w-72 shrink-0 overflow-hidden">
        <img
          src={getImage(p)}
          alt={p.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/10" />

        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          <span
            className={`text-[10px] font-bold tracking-[0.12em] uppercase px-2.5 py-1 rounded-full ${PURPOSE_BADGE[p.purpose]}`}
          >
            {PURPOSE_LABELS[p.purpose]}
          </span>
          {p.isFeatured && (
            <span className="flex items-center gap-1 text-[10px] font-bold uppercase px-2.5 py-1 rounded-full bg-[#D4E9B9] text-[#0E292F]">
              <SparkleIcon size={9} /> Featured
            </span>
          )}
        </div>

        <button
          onClick={() => setLiked(!liked)}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors shadow-sm"
        >
          <HeartIcon
            size={14}
            filled={liked}
            className={liked ? "text-red-500" : "text-gray-500"}
          />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 p-5 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-3 mb-1">
            <h3 className="text-[15px] font-bold text-[#0E292F] leading-snug">
              {p.title}
            </h3>
            {p.isVerified && (
              <VerifiedIcon
                size={17}
                className="text-[#3D7188] shrink-0 mt-0.5"
              />
            )}
          </div>

          <div className="flex items-center gap-1.5 mb-2">
            <PinIcon size={12} className="text-[#3D7188]" />
            <span className="text-[12px] text-gray-500">{locationStr(p)}</span>
            {estateLine(p) && (
              <span className="text-[11px] text-gray-400 before:content-['·'] before:mx-1">
                {estateLine(p)}
              </span>
            )}
          </div>

          {p.description && (
            <p className="text-[12px] text-gray-400 leading-relaxed line-clamp-2 mb-3">
              {p.description}
            </p>
          )}

          {/* Feature row */}
          <div className="flex items-center gap-4 flex-wrap">
            {p.bedrooms != null && (
              <span className="flex items-center gap-1.5 text-[12px] text-gray-600">
                <BedIcon size={14} className="text-gray-400" /> {p.bedrooms}{" "}
                Beds
              </span>
            )}
            {p.bathrooms != null && (
              <span className="flex items-center gap-1.5 text-[12px] text-gray-600">
                <BathIcon size={14} className="text-gray-400" /> {p.bathrooms}{" "}
                Baths
              </span>
            )}
            {p.floorAreaSqm != null && (
              <span className="flex items-center gap-1.5 text-[12px] text-gray-600">
                <AreaIcon size={14} className="text-gray-400" />{" "}
                {Number(p.floorAreaSqm).toFixed(0)} m²
              </span>
            )}
            {p.amenities?.isServiced && (
              <span className="text-[10px] font-bold tracking-wider text-[#3D7188] bg-[#3D7188]/10 px-2 py-0.5 rounded-full uppercase">
                Serviced
              </span>
            )}
            {p.amenities?.hasBq && (
              <span className="text-[10px] font-bold tracking-wider text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full uppercase">
                BQ
              </span>
            )}
          </div>
        </div>

        {/* Price + CTA */}
        <div className="flex items-center justify-between gap-4 mt-4 pt-4 border-t border-gray-100">
          <div>
            <p className="text-[22px] font-bold text-[#0E292F] leading-none font-serif">
              {formatPrice(p.pricing)}
            </p>
            <p className="text-[10px] text-gray-400 mt-1">
              {SUB_TYPE_LABELS[p.propertySubType]}
            </p>
          </div>
          <a
            href={`/properties/${p.id}`}
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-[#0E292F] text-white text-[12px] font-semibold hover:bg-[#1D3F48] transition-colors whitespace-nowrap"
          >
            View Details <ArrowRightIcon size={14} strokeWidth={2.5} />
          </a>
        </div>
      </div>
    </article>
  );
}

// ─── Public export ────────────────────────────────────────────────────────────

interface PropertyCardProps {
  property: Property;
  layout?: "grid" | "list";
}

export function PropertyCard({ property, layout = "grid" }: PropertyCardProps) {
  return layout === "list" ? (
    <ListCard p={property} />
  ) : (
    <GridCard p={property} />
  );
}
