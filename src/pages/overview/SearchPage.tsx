import { useState } from "react";
import { usePropertySearch } from "../../hooks/usePropertySearch";
import { PropertyCard } from "@/components/property/PropertiesCard";
import { PropertySkeleton } from "@/components/ui/PropertySkeleton";
import { FilterSidebar } from "@/components/property/FilterSideBar";
import { ActiveFilterPills } from "@/components/property/ActiveFilterPills";
import { SearchHero, SearchBar } from "@/components/property/SearchHero";
import {
  EmptyState,
  ErrorState,
  Pagination,
} from "@/components/property/SearchStates";
import { SORT_LABELS, type SortOption } from "../../types/property.types";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// ── Inline SVGs ───────────────────────────────────────────────────────────────
const GridSVG = ({ active }: { active: boolean }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <rect
      x="3"
      y="3"
      width="8"
      height="8"
      rx="1.5"
      stroke="currentColor"
      strokeWidth={active ? "2.2" : "1.75"}
    />
    <rect
      x="13"
      y="3"
      width="8"
      height="8"
      rx="1.5"
      stroke="currentColor"
      strokeWidth={active ? "2.2" : "1.75"}
    />
    <rect
      x="3"
      y="13"
      width="8"
      height="8"
      rx="1.5"
      stroke="currentColor"
      strokeWidth={active ? "2.2" : "1.75"}
    />
    <rect
      x="13"
      y="13"
      width="8"
      height="8"
      rx="1.5"
      stroke="currentColor"
      strokeWidth={active ? "2.2" : "1.75"}
    />
  </svg>
);
const ListSVG = ({ active }: { active: boolean }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <rect
      x="3"
      y="4"
      width="5"
      height="5"
      rx="1"
      stroke="currentColor"
      strokeWidth={active ? "2.2" : "1.75"}
    />
    <rect
      x="3"
      y="14"
      width="5"
      height="5"
      rx="1"
      stroke="currentColor"
      strokeWidth={active ? "2.2" : "1.75"}
    />
    <path
      d="M11 6.5h10M11 16.5h10"
      stroke="currentColor"
      strokeWidth={active ? "2.2" : "1.75"}
      strokeLinecap="round"
    />
  </svg>
);
const FilterSVG = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
    <path
      d="M3 5h18M6 12h12M10 19h4"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);
const SortSVG = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
    <path
      d="M3 6h18M6 12h12M9 18h6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);
const ChevronSVG = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
    <path
      d="M6 9l6 6 6-6"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function SearchPage() {
  const {
    results,
    featured,
    loading,
    error,
    filters,
    activeFilterCount,
    updateFilter,
    clearAllFilters,
    goToPage,
  } = usePropertySearch();

  const [layout, setLayout] = useState<"grid" | "list">("grid");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);

  const handleSearch = (q: string) => updateFilter("q", q || null);
  const handleSort = (s: SortOption) => {
    updateFilter("sort", s);
    setSortOpen(false);
  };

  const currentSort = (filters.sort ?? "newest") as SortOption;
  const properties = results?.data ?? [];
  const meta = results?.meta;
  const hasFilters = activeFilterCount > 0 || !!filters.searchQuery;

  return (
    <div className="min-h-screen bg-[#f4f6f8] flex flex-col font-sans selection:bg-[#D4E9B9] selection:text-[#0E292F]">
      {/* ── Navbar ── */}
      <div className="bg-[#0E292F]">
        <Navbar />
      </div>

      {/* ── Hero search strip ── */}
      <SearchHero
        initialQuery={filters.searchQuery}
        onSearch={handleSearch}
        totalProperties={meta?.total}
      />

      {/* ── Body ── */}
      <div className="flex-1 max-w-[1400px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-7">
          {/* ── Desktop Sidebar ── */}
          <aside className="hidden lg:block w-[260px] shrink-0">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sticky top-6">
              <FilterSidebar
                filters={filters}
                activeFilterCount={activeFilterCount}
                updateFilter={updateFilter}
                clearAllFilters={clearAllFilters}
              />
            </div>
          </aside>

          {/* ── Mobile Filter Drawer ── */}
          {drawerOpen && (
            <>
              <div
                className="lg:hidden fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
                onClick={() => setDrawerOpen(false)}
              />
              <div className="lg:hidden fixed inset-y-0 left-0 z-50 w-[300px] bg-white shadow-2xl flex flex-col">
                <div className="flex-1 overflow-y-auto p-5">
                  <FilterSidebar
                    filters={filters}
                    activeFilterCount={activeFilterCount}
                    updateFilter={updateFilter}
                    clearAllFilters={clearAllFilters}
                    onClose={() => setDrawerOpen(false)}
                  />
                </div>
                <div className="p-4 border-t border-gray-100 shrink-0">
                  <button
                    onClick={() => setDrawerOpen(false)}
                    className="w-full py-3 rounded-xl bg-[#0E292F] text-white text-[13px] font-bold"
                  >
                    Show {meta?.total ?? ""} results
                  </button>
                </div>
              </div>
            </>
          )}

          {/* ── Main content ── */}
          <div className="flex-1 min-w-0">
            {/* ── Toolbar bar ── */}
            <div className="flex flex-wrap items-center gap-3 mb-5">
              {/* Mobile filter button */}
              <button
                onClick={() => setDrawerOpen(true)}
                className="lg:hidden flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 bg-white text-[12px] font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <FilterSVG />
                Filters
                {activeFilterCount > 0 && (
                  <span className="bg-[#0E292F] text-white text-[10px] font-bold px-1.5 rounded-full">
                    {activeFilterCount}
                  </span>
                )}
              </button>

              {/* Mobile search compact */}
              <div className="lg:hidden flex-1 min-w-0">
                <SearchBar
                  initialQuery={filters.searchQuery}
                  onSearch={handleSearch}
                  compact
                />
              </div>

              {/* Spacer */}
              <div className="hidden lg:block flex-1" />

              {/* Sort dropdown */}
              <div className="relative">
                <button
                  onClick={() => setSortOpen((o) => !o)}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 bg-white text-[12px] font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <SortSVG />
                  {SORT_LABELS[currentSort]}
                  <ChevronSVG />
                </button>
                {sortOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setSortOpen(false)}
                    />
                    <div className="absolute right-0 top-full mt-2 z-20 w-52 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden py-1.5">
                      {(
                        Object.entries(SORT_LABELS) as [SortOption, string][]
                      ).map(([val, label]) => (
                        <button
                          key={val}
                          onClick={() => handleSort(val)}
                          className={`flex items-center justify-between w-full px-4 py-2.5 text-[12px] font-semibold text-left transition-colors
                            ${
                              currentSort === val
                                ? "text-[#0E292F] bg-[#0E292F]/5"
                                : "text-gray-600 hover:bg-gray-50"
                            }`}
                        >
                          {label}
                          {currentSort === val && (
                            <svg
                              width="13"
                              height="13"
                              viewBox="0 0 24 24"
                              fill="none"
                            >
                              <path
                                d="M5 12l5 5L19 7"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          )}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Layout toggle */}
              <div className="flex rounded-xl border border-gray-200 bg-white overflow-hidden">
                <button
                  onClick={() => setLayout("grid")}
                  title="Grid view"
                  className={`flex items-center justify-center w-9 h-9 transition-colors
                    ${layout === "grid" ? "bg-[#0E292F] text-white" : "text-gray-400 hover:text-gray-700 hover:bg-gray-50"}`}
                >
                  <GridSVG active={layout === "grid"} />
                </button>
                <button
                  onClick={() => setLayout("list")}
                  title="List view"
                  className={`flex items-center justify-center w-9 h-9 transition-colors
                    ${layout === "list" ? "bg-[#0E292F] text-white" : "text-gray-400 hover:text-gray-700 hover:bg-gray-50"}`}
                >
                  <ListSVG active={layout === "list"} />
                </button>
              </div>
            </div>

            {/* ── Active filter pills ── */}
            <div className="mb-5">
              <ActiveFilterPills
                filters={filters}
                updateFilter={updateFilter}
                clearAllFilters={clearAllFilters}
                totalResults={meta?.total}
              />
            </div>

            {/* ── Results ── */}
            {loading ? (
              <PropertySkeleton
                count={layout === "grid" ? 9 : 5}
                layout={layout}
              />
            ) : error ? (
              <div className="bg-white rounded-2xl border border-gray-100">
                <ErrorState
                  message={error}
                  onRetry={() => window.location.reload()}
                />
              </div>
            ) : properties.length === 0 ? (
              <div className="bg-white rounded-2xl border border-gray-100">
                <EmptyState hasFilters={hasFilters} onClear={clearAllFilters} />
              </div>
            ) : layout === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {properties.map((p) => (
                  <PropertyCard key={p.id} property={p} layout="grid" />
                ))}
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {properties.map((p) => (
                  <PropertyCard key={p.id} property={p} layout="list" />
                ))}
              </div>
            )}

            {/* ── Pagination ── */}
            {!loading && !error && meta && meta.totalPages > 1 && (
              <Pagination
                current={meta.page}
                total={meta.totalPages}
                onPageChange={goToPage}
              />
            )}

            {/* ── Featured fallback (when no filters set) ── */}
            {!loading &&
              !error &&
              properties.length === 0 &&
              featured.length > 0 &&
              !hasFilters && (
                <div className="mt-16">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="h-px flex-1 bg-gray-200" />
                    <span className="text-[11px] font-bold tracking-[0.15em] text-gray-400 uppercase">
                      Featured by Vivar
                    </span>
                    <div className="h-px flex-1 bg-gray-200" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                    {featured.slice(0, 6).map((p) => (
                      <PropertyCard key={p.id} property={p} layout="grid" />
                    ))}
                  </div>
                </div>
              )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
