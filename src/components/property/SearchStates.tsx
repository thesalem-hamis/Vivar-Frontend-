interface EmptyStateProps {
  hasFilters: boolean;
  onClear: () => void;
}

export function EmptyState({ hasFilters, onClear }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-24 px-6 text-center">
      {/* Illustration */}
      <div className="w-24 h-24 rounded-3xl bg-[#0E292F]/5 flex items-center justify-center mb-6">
        <svg
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          className="text-[#0E292F]/30"
        >
          <rect
            x="2"
            y="2"
            width="20"
            height="20"
            rx="3"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.5" />
          <path
            d="M2 15l5-4 4 4 3-3 8 7"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M14 2l4 4M18 2l-4 4"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <h3 className="text-[18px] font-bold text-[#0E292F] mb-2">
        {hasFilters
          ? "No properties match your filters"
          : "No properties found"}
      </h3>
      <p className="text-[13px] text-gray-400 max-w-sm leading-relaxed mb-6">
        {hasFilters
          ? "Try broadening your search — adjust the price range, remove a filter, or search in a different area."
          : "We couldn't find any listings right now. Try a different search term or come back later."}
      </p>

      {hasFilters && (
        <button
          onClick={onClear}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0E292F] text-white text-[13px] font-semibold hover:bg-[#1D3F48] transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path
              d="M3 12a9 9 0 1018 0 9 9 0 00-18 0"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M3 4v8h8"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Clear all filters
        </button>
      )}

      <p className="text-[11px] text-gray-300 mt-6">
        Can't find what you're looking for?{" "}
        <a
          href="/contact"
          className="text-[#3D7188] hover:text-[#0E292F] font-semibold transition-colors"
        >
          Tell us your requirements
        </a>
      </p>
    </div>
  );
}

// ─── Error State ──────────────────────────────────────────────────────────────

export function ErrorState({
  message,
  onRetry,
}: {
  message: string;
  onRetry: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-24 px-6 text-center">
      <div className="w-20 h-20 rounded-3xl bg-red-50 flex items-center justify-center mb-5">
        <svg
          width="36"
          height="36"
          viewBox="0 0 24 24"
          fill="none"
          className="text-red-400"
        >
          <path
            d="M12 2L2 20h20L12 2z"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinejoin="round"
          />
          <path
            d="M12 9v5M12 16.5v.5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <h3 className="text-[16px] font-bold text-[#0E292F] mb-2">
        Something went wrong
      </h3>
      <p className="text-[13px] text-gray-400 max-w-sm mb-6">{message}</p>
      <button
        onClick={onRetry}
        className="flex items-center gap-2 px-6 py-3 rounded-xl border border-[#0E292F]/20 text-[#0E292F] text-[13px] font-semibold hover:bg-[#0E292F] hover:text-white transition-all"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
          <path
            d="M3 12a9 9 0 1018 0 9 9 0 00-18 0"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M3 4v8h8"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Try again
      </button>
    </div>
  );
}

// ─── Pagination ───────────────────────────────────────────────────────────────

interface PaginationProps {
  current: number;
  total: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ current, total, onPageChange }: PaginationProps) {
  if (total <= 1) return null;

  // Build page numbers to show (always include first, last, current ±1, with ellipsis)
  const pages: (number | "…")[] = [];
  const addPage = (p: number) => {
    if (!pages.includes(p)) pages.push(p);
  };

  addPage(1);
  if (current > 3) pages.push("…");
  for (
    let i = Math.max(2, current - 1);
    i <= Math.min(total - 1, current + 1);
    i++
  )
    addPage(i);
  if (current < total - 2) pages.push("…");
  if (total > 1) addPage(total);

  return (
    <div className="flex items-center justify-center gap-1.5 pt-10">
      {/* Prev */}
      <button
        onClick={() => onPageChange(current - 1)}
        disabled={current === 1}
        className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-gray-200 text-[12px] font-semibold text-gray-600 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
          <path
            d="M15 18l-6-6 6-6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Prev
      </button>

      {/* Page numbers */}
      {pages.map((p, i) =>
        p === "…" ? (
          <span
            key={`ell-${i}`}
            className="w-9 h-9 flex items-center justify-center text-gray-400 text-[12px]"
          >
            …
          </span>
        ) : (
          <button
            key={p}
            onClick={() => onPageChange(p as number)}
            className={`w-9 h-9 rounded-xl text-[13px] font-bold transition-all duration-200
              ${
                current === p
                  ? "bg-[#0E292F] text-white shadow-sm"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
          >
            {p}
          </button>
        ),
      )}

      {/* Next */}
      <button
        onClick={() => onPageChange(current + 1)}
        disabled={current === total}
        className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-gray-200 text-[12px] font-semibold text-gray-600 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
      >
        Next
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
          <path
            d="M9 18l6-6-6-6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}
