import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Plus,
  Filter,
  Eye,
  Pencil,
  Trash2,
  BedDouble,
  Bath,
  ArrowUpRight,
} from "lucide-react";
import {
  mockProperties,
  statusColors,
  formatPrice,
  type Property,
} from "../../../lib/data";

const typeFilters = [
  "All",
  "For Sale",
  "For Rent",
  "Sold",
  "Off-Plan",
] as const;

export default function Properties() {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [view, setView] = useState<"grid" | "table">("table");
  const [properties, setProperties] = useState<Property[]>(mockProperties);

  const filtered = properties.filter((p) => {
    const matchSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.location.toLowerCase().includes(search.toLowerCase()) ||
      p.type.toLowerCase().includes(search.toLowerCase());
    const matchFilter = activeFilter === "All" || p.status === activeFilter;
    return matchSearch && matchFilter;
  });

  const handleDelete = (id: string) => {
    if (confirm("Remove this property from the list?")) {
      setProperties((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const counts = {
    All: mockProperties.length,
    "For Sale": mockProperties.filter((p) => p.status === "For Sale").length,
    "For Rent": mockProperties.filter((p) => p.status === "For Rent").length,
    Sold: mockProperties.filter((p) => p.status === "Sold").length,
    "Off-Plan": mockProperties.filter((p) => p.status === "Off-Plan").length,
  } as Record<string, number>;

  return (
    <div className="p-6 space-y-5">
      {/* ── Header ── */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-[28px] font-bold text-[#0E292F] tracking-tight leading-none">
            Properties
          </h1>
          <p className="text-[13px] text-gray-500 mt-1.5">
            Manage all Vivar Realty property listings.
          </p>
        </div>
        <Link
          to="/admin/properties/add"
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0E292F] text-white text-[13px] font-semibold hover:bg-[#1D3F48] transition-colors shadow-sm shrink-0"
        >
          <Plus size={15} /> Add Property
        </Link>
      </div>

      {/* ── Filter Tabs + Search ── */}
      <div className="bg-white rounded-2xl px-5 py-4 flex flex-col sm:flex-row sm:items-center gap-4">
        {/* Filter tabs */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {typeFilters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[12px] font-semibold transition-colors ${
                activeFilter === f
                  ? "bg-[#0E292F] text-white"
                  : "text-gray-500 hover:bg-gray-100"
              }`}
            >
              {f}
              <span
                className={`text-[10px] px-1.5 rounded-full ${
                  activeFilter === f
                    ? "bg-white/20 text-white"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                {counts[f]}
              </span>
            </button>
          ))}
        </div>

        {/* Search + view toggle */}
        <div className="flex items-center gap-2 ml-auto">
          <div className="flex items-center gap-2 bg-gray-50 border border-gray-100 rounded-xl px-3 py-2 w-56 focus-within:border-[#3D7188] transition-colors">
            <Search size={14} className="text-gray-400 shrink-0" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search properties..."
              className="bg-transparent text-[13px] text-gray-700 outline-none w-full placeholder:text-gray-400"
            />
          </div>
          <button className="flex items-center gap-1.5 px-3 py-2 border border-gray-200 rounded-xl text-[12px] font-medium text-gray-600 hover:bg-gray-50 transition-colors">
            <Filter size={13} /> Filters
          </button>
          {/* View toggle */}
          <div className="flex border border-gray-200 rounded-xl overflow-hidden">
            {(["table", "grid"] as const).map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={`px-3 py-2 text-[11px] font-semibold transition-colors capitalize ${
                  view === v
                    ? "bg-[#0E292F] text-white"
                    : "text-gray-500 hover:bg-gray-50"
                }`}
              >
                {v}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── RESULTS ── */}
      {view === "table" ? (
        <div className="bg-white rounded-2xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                {[
                  "Property",
                  "Location",
                  "Type",
                  "Price",
                  "Beds/Baths",
                  "Status",
                  "Listed",
                  "Agent",
                  "",
                ].map((h) => (
                  <th
                    key={h}
                    className="text-left px-5 py-3.5 text-[11px] font-bold tracking-[0.1em] text-gray-400 uppercase first:pl-5"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td
                    colSpan={9}
                    className="text-center py-16 text-[13px] text-gray-400"
                  >
                    No properties match your search.
                  </td>
                </tr>
              ) : (
                filtered.map((p) => (
                  <tr
                    key={p.id}
                    className="border-b border-gray-50 hover:bg-gray-50/60 transition-colors group"
                  >
                    {/* Image + Name */}
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-xl overflow-hidden shrink-0 bg-gray-100">
                          <img
                            src={p.image}
                            alt={p.title}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[13px] font-semibold text-[#0E292F] leading-none truncate max-w-[160px]">
                            {p.title}
                          </p>
                          {p.featured && (
                            <span className="text-[9px] font-bold tracking-wider text-[#3D7188] uppercase mt-0.5 inline-block">
                              Featured
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    {/* Location */}
                    <td className="px-5 py-3">
                      <span className="text-[12px] text-gray-600">
                        {p.location}
                      </span>
                    </td>
                    {/* Type */}
                    <td className="px-5 py-3">
                      <span className="text-[12px] text-gray-600 whitespace-nowrap">
                        {p.type}
                      </span>
                    </td>
                    {/* Price */}
                    <td className="px-5 py-3">
                      <span className="text-[13px] font-bold text-[#0E292F] whitespace-nowrap">
                        {formatPrice(p.price, p.currency)}
                      </span>
                      {p.status === "For Rent" && (
                        <span className="text-[10px] text-gray-400">/yr</span>
                      )}
                    </td>
                    {/* Beds / Baths */}
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2 text-[11px] text-gray-500">
                        <span className="flex items-center gap-1">
                          <BedDouble size={12} /> {p.beds}
                        </span>
                        <span className="flex items-center gap-1">
                          <Bath size={12} /> {p.baths}
                        </span>
                      </div>
                    </td>
                    {/* Status */}
                    <td className="px-5 py-3">
                      <span
                        className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${statusColors[p.status]}`}
                      >
                        {p.status}
                      </span>
                    </td>
                    {/* Date */}
                    <td className="px-5 py-3">
                      <span className="text-[11px] text-gray-400">
                        {new Date(p.listedDate).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </td>
                    {/* Agent */}
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-[#0E292F]/10 flex items-center justify-center shrink-0">
                          <span className="text-[10px] font-bold text-[#0E292F]">
                            {p.agentInitials}
                          </span>
                        </div>
                        <span className="text-[11px] text-gray-600 hidden xl:block whitespace-nowrap">
                          {p.agent}
                        </span>
                      </div>
                    </td>
                    {/* Actions */}
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Link
                          to={`/admin/properties/edit/${p.id}`}
                          title="Edit"
                          className="flex items-center justify-center w-7 h-7 rounded-lg bg-[#0E292F]/8 text-[#0E292F] hover:bg-[#0E292F] hover:text-white transition-colors"
                        >
                          <Pencil size={12} />
                        </Link>
                        <Link
                          to={`/properties`}
                          title="View on site"
                          className="flex items-center justify-center w-7 h-7 rounded-lg bg-[#3D7188]/10 text-[#3D7188] hover:bg-[#3D7188] hover:text-white transition-colors"
                        >
                          <Eye size={12} />
                        </Link>
                        <button
                          onClick={() => handleDelete(p.id)}
                          title="Delete"
                          className="flex items-center justify-center w-7 h-7 rounded-lg bg-red-50 text-red-400 hover:bg-red-500 hover:text-white transition-colors"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="px-5 py-4 border-t border-gray-100 flex items-center justify-between">
            <p className="text-[12px] text-gray-400">
              Showing {filtered.length} of {mockProperties.length} properties
            </p>
            <div className="flex items-center gap-1.5">
              {[1, 2, 3].map((n) => (
                <button
                  key={n}
                  className={`w-8 h-8 rounded-lg text-[13px] font-semibold transition-colors ${
                    n === 1
                      ? "bg-[#0E292F] text-white"
                      : "text-gray-500 hover:bg-gray-100"
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        // Grid view
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-2xl overflow-hidden group border border-gray-100 hover:shadow-lg transition-shadow"
            >
              <div className="relative aspect-[16/9] overflow-hidden">
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <span
                  className={`absolute top-3 left-3 text-[10px] font-bold px-2.5 py-1 rounded-full ${statusColors[p.status]}`}
                >
                  {p.status}
                </span>
                <div className="absolute top-3 right-3 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Link
                    to={`/admin/properties/edit/${p.id}`}
                    className="w-7 h-7 bg-white rounded-lg flex items-center justify-center shadow"
                  >
                    <Pencil size={12} className="text-[#0E292F]" />
                  </Link>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="w-7 h-7 bg-white rounded-lg flex items-center justify-center shadow"
                  >
                    <Trash2 size={12} className="text-red-500" />
                  </button>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-[14px] font-bold text-[#0E292F] leading-snug">
                  {p.title}
                </h3>
                <p className="text-[12px] text-gray-400 mt-1 flex items-center gap-1">
                  <span>📍</span> {p.location}
                </p>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-[16px] font-bold text-[#0E292F]">
                    {formatPrice(p.price, p.currency)}
                  </span>
                  <div className="flex items-center gap-2 text-[11px] text-gray-400">
                    <span className="flex items-center gap-1">
                      <BedDouble size={12} />
                      {p.beds}
                    </span>
                    <span className="flex items-center gap-1">
                      <Bath size={12} />
                      {p.baths}
                    </span>
                  </div>
                </div>
                <Link
                  to={`/admin/properties/edit/${p.id}`}
                  className="mt-3 flex items-center justify-center gap-2 w-full py-2 border border-[#0E292F]/15 rounded-xl text-[12px] font-semibold text-[#0E292F] hover:bg-[#0E292F] hover:text-white transition-colors"
                >
                  Edit Property <ArrowUpRight size={13} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
