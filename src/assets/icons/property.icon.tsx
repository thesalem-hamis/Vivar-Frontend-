// All SVG icons are custom-drawn. Zero external icon dependencies.

interface IconProps {
  size?: number;
  className?: string;
  strokeWidth?: number;
}

// ─── Search ───────────────────────────────────────────────────────────────────
export const SearchIcon = ({
  size = 20,
  className = "",
  strokeWidth = 1.75,
}: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
  >
    <circle
      cx="10.5"
      cy="10.5"
      r="7"
      stroke="currentColor"
      strokeWidth={strokeWidth}
    />
    <path
      d="M21 21L15.8 15.8"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
    />
  </svg>
);

// ─── Filter sliders ──────────────────────────────────────────────────────────
export const FilterIcon = ({
  size = 20,
  className = "",
  strokeWidth = 1.75,
}: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
  >
    <path
      d="M4 6h16M7 12h10M10 18h4"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
    />
  </svg>
);

// ─── Sliders / Adjust ────────────────────────────────────────────────────────
export const SlidersIcon = ({
  size = 20,
  className = "",
  strokeWidth = 1.75,
}: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
  >
    <path
      d="M4 5h16M4 12h16M4 19h16"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
    />
    <circle
      cx="8"
      cy="5"
      r="2.5"
      fill="white"
      stroke="currentColor"
      strokeWidth={strokeWidth}
    />
    <circle
      cx="16"
      cy="12"
      r="2.5"
      fill="white"
      stroke="currentColor"
      strokeWidth={strokeWidth}
    />
    <circle
      cx="10"
      cy="19"
      r="2.5"
      fill="white"
      stroke="currentColor"
      strokeWidth={strokeWidth}
    />
  </svg>
);

// ─── Location pin ────────────────────────────────────────────────────────────
export const PinIcon = ({
  size = 20,
  className = "",
  strokeWidth = 1.75,
}: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
  >
    <path
      d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinejoin="round"
    />
    <circle
      cx="12"
      cy="9"
      r="2.5"
      stroke="currentColor"
      strokeWidth={strokeWidth}
    />
  </svg>
);

// ─── Bed ─────────────────────────────────────────────────────────────────────
export const BedIcon = ({
  size = 20,
  className = "",
  strokeWidth = 1.75,
}: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
  >
    <path
      d="M3 20v-8m0 0h18v8M3 12V8a2 2 0 012-2h14a2 2 0 012 2v4"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <rect
      x="6.5"
      y="10"
      width="4"
      height="2.5"
      rx="0.75"
      stroke="currentColor"
      strokeWidth={strokeWidth}
    />
    <rect
      x="13.5"
      y="10"
      width="4"
      height="2.5"
      rx="0.75"
      stroke="currentColor"
      strokeWidth={strokeWidth}
    />
    <path
      d="M3 16h18"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
    />
  </svg>
);

// ─── Bath ────────────────────────────────────────────────────────────────────
export const BathIcon = ({
  size = 20,
  className = "",
  strokeWidth = 1.75,
}: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
  >
    <path
      d="M4 12h16v2.5A5.5 5.5 0 0114.5 20h-5A5.5 5.5 0 014 14.5V12z"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinejoin="round"
    />
    <path
      d="M4 12V8a2 2 0 014 0v4M7.5 20.5v1.5M16.5 20.5v1.5"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
    />
  </svg>
);

// ─── Area / ruler ────────────────────────────────────────────────────────────
export const AreaIcon = ({
  size = 20,
  className = "",
  strokeWidth = 1.75,
}: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
  >
    <rect
      x="3"
      y="3"
      width="18"
      height="18"
      rx="2"
      stroke="currentColor"
      strokeWidth={strokeWidth}
    />
    <path
      d="M3 8h2M3 13h2M8 3v2M13 3v2"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
    />
    <path
      d="M8 8h8v8H8z"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeOpacity="0.4"
    />
  </svg>
);

// ─── Close / X ────────────────────────────────────────────────────────────────
export const CloseIcon = ({
  size = 20,
  className = "",
  strokeWidth = 2,
}: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
  >
    <path
      d="M18 6L6 18M6 6l12 12"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
    />
  </svg>
);

// ─── Chevron Down ────────────────────────────────────────────────────────────
export const ChevronDownIcon = ({
  size = 20,
  className = "",
  strokeWidth = 2,
}: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
  >
    <path
      d="M6 9l6 6 6-6"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// ─── Chevron Up ──────────────────────────────────────────────────────────────
export const ChevronUpIcon = ({
  size = 20,
  className = "",
  strokeWidth = 2,
}: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
  >
    <path
      d="M18 15l-6-6-6 6"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// ─── Grid ────────────────────────────────────────────────────────────────────
export const GridIcon = ({ size = 20, className = "" }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
  >
    <rect
      x="3"
      y="3"
      width="8"
      height="8"
      rx="1.5"
      stroke="currentColor"
      strokeWidth="1.75"
    />
    <rect
      x="13"
      y="3"
      width="8"
      height="8"
      rx="1.5"
      stroke="currentColor"
      strokeWidth="1.75"
    />
    <rect
      x="3"
      y="13"
      width="8"
      height="8"
      rx="1.5"
      stroke="currentColor"
      strokeWidth="1.75"
    />
    <rect
      x="13"
      y="13"
      width="8"
      height="8"
      rx="1.5"
      stroke="currentColor"
      strokeWidth="1.75"
    />
  </svg>
);

// ─── List ────────────────────────────────────────────────────────────────────
export const ListIcon = ({ size = 20, className = "" }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
  >
    <rect
      x="3"
      y="4.5"
      width="5"
      height="5"
      rx="1"
      stroke="currentColor"
      strokeWidth="1.75"
    />
    <rect
      x="3"
      y="14.5"
      width="5"
      height="5"
      rx="1"
      stroke="currentColor"
      strokeWidth="1.75"
    />
    <path
      d="M11 7h10M11 17h10"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
    />
  </svg>
);

// ─── Verified shield ─────────────────────────────────────────────────────────
export const VerifiedIcon = ({ size = 20, className = "" }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
  >
    <path
      d="M12 2.5L4 6v6c0 5.5 3.4 9.3 8 10.5 4.6-1.2 8-5 8-10.5V6L12 2.5z"
      fill="currentColor"
      fillOpacity="0.12"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
    <path
      d="M8.5 12l2.5 2.5 5-5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// ─── Heart ───────────────────────────────────────────────────────────────────
export const HeartIcon = ({
  size = 20,
  className = "",
  filled = false,
}: IconProps & { filled?: boolean }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={filled ? "currentColor" : "none"}
    className={className}
  >
    <path
      d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
      stroke="currentColor"
      strokeWidth="1.75"
    />
  </svg>
);

// ─── House ───────────────────────────────────────────────────────────────────
export const HouseIcon = ({ size = 20, className = "" }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
  >
    <path
      d="M3 10.5L12 3l9 7.5V21a1 1 0 01-1 1H4a1 1 0 01-1-1V10.5z"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinejoin="round"
    />
    <path
      d="M9 22V14h6v8"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinejoin="round"
    />
    <path
      d="M5.5 8.5l6.5-5 6.5 5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

// ─── Apartment building ───────────────────────────────────────────────────────
export const ApartmentIcon = ({ size = 20, className = "" }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
  >
    <rect
      x="3"
      y="2"
      width="18"
      height="20"
      rx="1.5"
      stroke="currentColor"
      strokeWidth="1.75"
    />
    <path
      d="M7 6h2v2H7zM11 6h2v2h-2zM15 6h2v2h-2zM7 11h2v2H7zM11 11h2v2h-2zM15 11h2v2h-2zM9 16h6v6H9z"
      stroke="currentColor"
      strokeWidth="1.4"
    />
  </svg>
);

// ─── Commercial / office ─────────────────────────────────────────────────────
export const CommercialIcon = ({ size = 20, className = "" }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
  >
    <rect
      x="2"
      y="5"
      width="20"
      height="16"
      rx="1.5"
      stroke="currentColor"
      strokeWidth="1.75"
    />
    <path
      d="M7 5V3m5 2V3m5 2V3"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
    />
    <path
      d="M6 10h3v3H6zM10.5 10h3v3h-3zM15 10h3v3h-3zM6 16h3v5H6zM10.5 16h3v5h-3zM15 16h3v5h-3z"
      stroke="currentColor"
      strokeWidth="1.3"
    />
  </svg>
);

// ─── Land / plot ─────────────────────────────────────────────────────────────
export const LandIcon = ({ size = 20, className = "" }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
  >
    <path
      d="M2 20h20"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
    />
    <path
      d="M4 20L9 8l5 7 4-5 3 10"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinejoin="round"
      strokeLinecap="round"
    />
    <circle cx="9" cy="5" r="2" stroke="currentColor" strokeWidth="1.5" />
    <path
      d="M9 3v-1.5M9 8.5V7M12.12 4.12l1.06-1.06M5.82 4.12L4.76 3.06M12.12 5.88l1.06 1.06M5.82 5.88L4.76 6.94"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
    />
  </svg>
);

// ─── Event centre ────────────────────────────────────────────────────────────
export const EventIcon = ({ size = 20, className = "" }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
  >
    <path
      d="M3 8h18v13H3z"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinejoin="round"
    />
    <path
      d="M1 8l11-6 11 6"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M9 21V13h6v8" stroke="currentColor" strokeWidth="1.75" />
    <path
      d="M7 11.5h2M15 11.5h2"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

// ─── Arrow right ─────────────────────────────────────────────────────────────
export const ArrowRightIcon = ({
  size = 20,
  className = "",
  strokeWidth = 2,
}: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
  >
    <path
      d="M5 12h14M14 6l6 6-6 6"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// ─── Arrow up-right ──────────────────────────────────────────────────────────
export const ArrowUpRightIcon = ({
  size = 20,
  className = "",
  strokeWidth = 2,
}: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
  >
    <path
      d="M7 17L17 7M17 7H7M17 7v10"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// ─── Map ─────────────────────────────────────────────────────────────────────
export const MapIcon = ({ size = 20, className = "" }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
  >
    <path
      d="M9 20L2 17V4l7 3m0 13V7m0 13l6-3m-6-10l6 3m0 10l7 3V7l-7-3m0 13V4"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// ─── Check ───────────────────────────────────────────────────────────────────
export const CheckIcon = ({
  size = 20,
  className = "",
  strokeWidth = 2.5,
}: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
  >
    <path
      d="M5 13l4 4L19 7"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// ─── Sort ────────────────────────────────────────────────────────────────────
export const SortIcon = ({ size = 20, className = "" }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
  >
    <path
      d="M3 6h18M7 12h10M11 18h2"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
    />
  </svg>
);

// ─── Spinner ─────────────────────────────────────────────────────────────────
export const SpinnerIcon = ({ size = 24, className = "" }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={`animate-spin ${className}`}
  >
    <circle
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="3"
      strokeOpacity="0.2"
    />
    <path
      d="M12 2a10 10 0 0110 10"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
    />
  </svg>
);

// ─── Star ────────────────────────────────────────────────────────────────────
export const StarIcon = ({
  size = 20,
  className = "",
  filled = false,
}: IconProps & { filled?: boolean }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={filled ? "currentColor" : "none"}
    className={className}
  >
    <path
      d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinejoin="round"
    />
  </svg>
);

// ─── View count / Eye ────────────────────────────────────────────────────────
export const EyeIcon = ({
  size = 20,
  className = "",
  strokeWidth = 1.75,
}: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
  >
    <path
      d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z"
      stroke="currentColor"
      strokeWidth={strokeWidth}
    />
    <circle
      cx="12"
      cy="12"
      r="3"
      stroke="currentColor"
      strokeWidth={strokeWidth}
    />
  </svg>
);

// ─── Image placeholder ───────────────────────────────────────────────────────
export const ImagePlaceholderIcon = ({
  size = 48,
  className = "",
}: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
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
    <circle cx="8" cy="8" r="2.5" stroke="currentColor" strokeWidth="1.5" />
    <path
      d="M2 15l6-5 4 4 3-3 7 7"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// ─── Sparkle / Featured ──────────────────────────────────────────────────────
export const SparkleIcon = ({ size = 20, className = "" }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
  >
    <path
      d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <circle
      cx="12"
      cy="12"
      r="3"
      fill="currentColor"
      fillOpacity="0.3"
      stroke="currentColor"
      strokeWidth="1.75"
    />
  </svg>
);

// ─── Property type icon map (convenience export) ──────────────────────────────
export const PROPERTY_TYPE_ICONS: Record<string, React.FC<IconProps>> = {
  HOUSE: HouseIcon,
  FLAT_APARTMENT: ApartmentIcon,
  COMMERCIAL: CommercialIcon,
  LAND: LandIcon,
  EVENT_CENTRE: EventIcon,
};
