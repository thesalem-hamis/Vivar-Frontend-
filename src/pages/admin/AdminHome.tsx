import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  TrendingUp,
  Building2,
  CheckCircle2,
  MessageSquare,
  ArrowUpRight,
  Play,
  Pause,
  RotateCcw,
  Video,
  MapPin,
  BedDouble,
  Bath,
} from "lucide-react";

// ─── TYPES ────────────────────────────────────────────────────────────────────
interface Stat {
  label: string;
  value: number | string;
  change: string;
  positive: boolean | null;
  highlight: boolean;
  icon: React.ElementType;
}

// ─── BAR CHART ────────────────────────────────────────────────────────────────
function RoundedTopRect({
  x,
  y,
  w,
  h,
  rx,
  fill,
  stroke,
  strokeOpacity,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  rx: number;
  fill: string;
  stroke?: string;
  strokeOpacity?: number;
}) {
  const r = Math.min(rx, h / 2, w / 2);
  const d = [
    `M ${x + r} ${y}`,
    `H ${x + w - r}`,
    `Q ${x + w} ${y} ${x + w} ${y + r}`,
    `V ${y + h}`,
    `H ${x}`,
    `V ${y + r}`,
    `Q ${x} ${y} ${x + r} ${y}`,
    "Z",
  ].join(" ");
  return (
    <path
      d={d}
      fill={fill}
      stroke={stroke}
      strokeOpacity={strokeOpacity}
      strokeWidth={1}
    />
  );
}

function PropertyBarChart() {
  const data = [
    { day: "S", v: 0.28 },
    { day: "M", v: 0.62 },
    { day: "T", v: 0.8 },
    { day: "W", v: 0.95, hi: true },
    { day: "T", v: 0.55 },
    { day: "F", v: 0.43 },
    { day: "S", v: 0.22 },
  ] as { day: string; v: number; hi?: boolean }[];

  const svgW = 400;
  const svgH = 220;
  const padX = 22;
  const padTop = 36;
  const padBot = 32;
  const chartH = svgH - padTop - padBot;
  const gap = 9;
  const totalGap = gap * (data.length - 1);
  const barW = (svgW - 2 * padX - totalGap) / data.length;
  const rx = barW / 2;

  return (
    <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full h-full">
      <defs>
        <pattern
          id="hatch"
          patternUnits="userSpaceOnUse"
          width="7"
          height="7"
          patternTransform="rotate(45)"
        >
          <line
            x1="0"
            y1="0"
            x2="0"
            y2="7"
            stroke="#0E292F"
            strokeWidth="1.5"
            opacity="0.18"
          />
        </pattern>
        <pattern
          id="hatch2"
          patternUnits="userSpaceOnUse"
          width="7"
          height="7"
          patternTransform="rotate(45)"
        >
          <line
            x1="0"
            y1="0"
            x2="0"
            y2="7"
            stroke="#3D7188"
            strokeWidth="1.5"
            opacity="0.28"
          />
        </pattern>
      </defs>

      {data.map((d, i) => {
        const x = padX + i * (barW + gap);
        const bh = d.v * chartH;
        const y = padTop + chartH - bh;
        const fillColor = d.hi
          ? "#0E292F"
          : i % 2 === 0
            ? "url(#hatch)"
            : "url(#hatch2)";

        return (
          <g key={i}>
            <RoundedTopRect
              x={x}
              y={y}
              w={barW}
              h={bh}
              rx={rx}
              fill={fillColor}
              stroke={d.hi ? "none" : "#0E292F"}
              strokeOpacity={d.hi ? 0 : 0.14}
            />
            {d.hi && (
              <g>
                <rect
                  x={x + barW / 2 - 16}
                  y={y - 26}
                  width={32}
                  height={18}
                  rx={5}
                  fill="#0E292F"
                />
                <text
                  x={x + barW / 2}
                  y={y - 12}
                  textAnchor="middle"
                  fontSize="10"
                  fontWeight="700"
                  fill="white"
                  fontFamily="sans-serif"
                >
                  95%
                </text>
              </g>
            )}
            <text
              x={x + barW / 2}
              y={svgH - 6}
              textAnchor="middle"
              fontSize="11"
              fill="#9ca3af"
              fontFamily="sans-serif"
            >
              {d.day}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

// ─── GAUGE CHART ──────────────────────────────────────────────────────────────
function GaugeChart({ value = 62 }: { value?: number }) {
  const cx = 100;
  const cy = 96;
  const r = 68;
  const toRad = (deg: number) => (deg * Math.PI) / 180;

  const startX = cx - r;
  const startY = cy;
  const angle = 180 - 180 * (value / 100);
  const endX = cx + r * Math.cos(toRad(angle));
  const endY = cy - r * Math.sin(toRad(angle));
  const largeArc = value > 50 ? 1 : 0;

  const trackPath = `M ${startX} ${startY} A ${r} ${r} 0 0 1 ${cx + r} ${startY}`;
  const fillPath = `M ${startX} ${startY} A ${r} ${r} 0 ${largeArc} 1 ${endX.toFixed(2)} ${endY.toFixed(2)}`;

  // Dot at end of filled arc
  const dotX = endX;
  const dotY = endY;

  return (
    <svg viewBox="0 0 200 130" className="w-full">
      <path
        d={trackPath}
        fill="none"
        stroke="#f3f4f6"
        strokeWidth="13"
        strokeLinecap="round"
      />
      <path
        d={fillPath}
        fill="none"
        stroke="#0E292F"
        strokeWidth="13"
        strokeLinecap="round"
      />
      <circle
        cx={dotX}
        cy={dotY}
        r="7"
        fill="white"
        stroke="#0E292F"
        strokeWidth="3"
      />
      <text
        x={cx}
        y={cy - 6}
        textAnchor="middle"
        fontSize="26"
        fontWeight="700"
        fill="#0E292F"
        fontFamily="sans-serif"
      >
        {value}%
      </text>
      <text
        x={cx}
        y={cy + 14}
        textAnchor="middle"
        fontSize="10"
        fill="#9ca3af"
        fontFamily="sans-serif"
      >
        Enquiry Rate
      </text>
      <text
        x={startX}
        y={cy + 22}
        fontSize="9"
        fill="#9ca3af"
        fontFamily="sans-serif"
      >
        0%
      </text>
      <text
        x={cx + r - 8}
        y={cy + 22}
        fontSize="9"
        fill="#9ca3af"
        fontFamily="sans-serif"
      >
        100%
      </text>
    </svg>
  );
}

// ─── SESSION TIMER ────────────────────────────────────────────────────────────
function SessionTimer() {
  const [seconds, setSeconds] = useState(5048);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [running]);

  const fmt = (s: number) => {
    const h = Math.floor(s / 3600)
      .toString()
      .padStart(2, "0");
    const m = Math.floor((s % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const sec = (s % 60).toString().padStart(2, "0");
    return `${h}:${m}:${sec}`;
  };

  return (
    <div className="bg-[#0E292F] rounded-2xl p-5 text-white h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[13px] font-semibold text-white/70">
          Session Timer
        </h3>
        <span className="text-[10px] font-bold tracking-widest text-[#D4E9B9] uppercase bg-white/10 px-2 py-1 rounded-full">
          Live
        </span>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center">
        <p className="text-[38px] font-mono font-bold tracking-wider text-white tabular-nums">
          {fmt(seconds)}
        </p>
        <p className="text-[11px] text-white/40 mt-1">Admin work session</p>
      </div>

      <div className="flex items-center justify-center gap-3 mt-4">
        <button
          onClick={() => setRunning(!running)}
          className="flex items-center justify-center w-11 h-11 rounded-full bg-white/15 hover:bg-white/25 transition-colors"
        >
          {running ? (
            <Pause size={16} className="text-white" />
          ) : (
            <Play size={16} className="text-white" />
          )}
        </button>
        <button
          onClick={() => {
            setRunning(false);
            setSeconds(0);
          }}
          className="flex items-center justify-center w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
        >
          <RotateCcw size={14} className="text-white/70" />
        </button>
      </div>
    </div>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
const stats: Stat[] = [
  {
    label: "Total Properties",
    value: 48,
    change: "Increased from last month",
    positive: true,
    highlight: true,
    icon: Building2,
  },
  {
    label: "Active Listings",
    value: 31,
    change: "Increased from last month",
    positive: true,
    highlight: false,
    icon: TrendingUp,
  },
  {
    label: "Properties Sold",
    value: 17,
    change: "Increased from last month",
    positive: true,
    highlight: false,
    icon: CheckCircle2,
  },
  {
    label: "Pending Enquiries",
    value: 8,
    change: "On Review",
    positive: null,
    highlight: false,
    icon: MessageSquare,
  },
];

const recentListings = [
  {
    name: "Luxury Duplex, Ikoyi",
    date: "Due: Jun 28, 2026",
    color: "bg-violet-500",
  },
  {
    name: "Serviced Apt, Victoria Is.",
    date: "Due: Jun 30, 2026",
    color: "bg-[#3D7188]",
  },
  {
    name: "Waterfront Villa, Lekki",
    date: "Due: Jul 2, 2026",
    color: "bg-amber-500",
  },
  {
    name: "Penthouse, Banana Is.",
    date: "Due: Jul 5, 2026",
    color: "bg-pink-500",
  },
  {
    name: "Executive Bungalow, Abuja",
    date: "Due: Jul 6, 2026",
    color: "bg-cyan-600",
  },
];

const enquiries = [
  {
    name: "Chidi Okafor",
    initials: "CO",
    task: "Luxury Duplex, Ikoyi Phase 1",
    status: "Completed",
    color: "bg-violet-100 text-violet-700",
  },
  {
    name: "Amaka Nwosu",
    initials: "AN",
    task: "Serviced Apartment, Victoria Island",
    status: "In Progress",
    color: "bg-blue-100 text-blue-700",
  },
  {
    name: "Emeka Adeyemi",
    initials: "EA",
    task: "Off-Plan Development, Lekki",
    status: "Pending",
    color: "bg-orange-100 text-orange-700",
  },
  {
    name: "Ngozi Eze",
    initials: "NE",
    task: "Diaspora Property — London Client",
    status: "In Progress",
    color: "bg-blue-100 text-blue-700",
  },
];

const featuredProperty = {
  name: "Viewing — Banana Island Penthouse",
  time: "02:00 PM – 04:00 PM",
  location: "Banana Island, Lagos",
  image:
    "https://images.unsplash.com/photo-1600210492486-715a3ca7b5cb?q=80&w=400&auto=format&fit=crop",
};

export default function AdminHome() {
  return (
    <div className="p-6 space-y-6">
      {/* ── Page Header ── */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-[28px] font-bold text-[#0E292F] tracking-tight leading-none">
            Dashboard
          </h1>
          <p className="text-[13px] text-gray-500 mt-1.5">
            Plan, prioritize, and manage your property portfolio with ease.
          </p>
        </div>
        <div className="flex items-center gap-2.5 shrink-0">
          <Link
            to="/admin/properties/add"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0E292F] text-white text-[13px] font-semibold hover:bg-[#1D3F48] transition-colors shadow-sm"
          >
            <span className="text-lg leading-none">+</span> Add Property
          </Link>
          <button className="px-4 py-2.5 rounded-xl border border-gray-200 text-[13px] font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
            Import Data
          </button>
        </div>
      </div>

      {/* ── STAT CARDS ── */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div
              key={s.label}
              className={`rounded-2xl p-5 flex flex-col gap-3 ${
                s.highlight ? "bg-[#0E292F] text-white" : "bg-white"
              }`}
            >
              <div className="flex items-center justify-between">
                <span
                  className={`text-[12px] font-semibold ${s.highlight ? "text-white/70" : "text-gray-500"}`}
                >
                  {s.label}
                </span>
                <button
                  className={`flex items-center justify-center w-8 h-8 rounded-full border ${
                    s.highlight
                      ? "border-white/20 text-white/70 hover:bg-white/10"
                      : "border-gray-200 text-gray-400 hover:bg-gray-50"
                  } transition-colors`}
                >
                  <ArrowUpRight size={14} />
                </button>
              </div>
              <span
                className={`text-[42px] font-bold leading-none tracking-tight ${s.highlight ? "text-white" : "text-[#0E292F]"}`}
              >
                {s.value}
              </span>
              <div className="flex items-center gap-1.5">
                <Icon
                  size={13}
                  className={s.highlight ? "text-[#D4E9B9]" : "text-[#3D7188]"}
                />
                <span
                  className={`text-[11px] ${s.highlight ? "text-white/60" : "text-gray-400"}`}
                >
                  {s.change}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── ROW 2 ── */}
      <div className="grid grid-cols-12 gap-4">
        {/* Bar Chart */}
        <div className="col-span-12 lg:col-span-5 bg-white rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[14px] font-bold text-[#0E292F]">
              Property Analytics
            </h2>
            <select className="text-[11px] text-gray-500 border border-gray-100 rounded-lg px-2 py-1 bg-gray-50 outline-none">
              <option>This week</option>
              <option>This month</option>
            </select>
          </div>
          <div className="h-[180px]">
            <PropertyBarChart />
          </div>
        </div>

        {/* Upcoming Viewing */}
        <div className="col-span-12 sm:col-span-6 lg:col-span-3 bg-white rounded-2xl p-5 flex flex-col">
          <h2 className="text-[14px] font-bold text-[#0E292F] mb-4">
            Upcoming Viewing
          </h2>
          <div className="rounded-xl overflow-hidden aspect-[16/9] mb-4">
            <img
              src={featuredProperty.image}
              alt=""
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="flex-1">
            <h3 className="text-[13px] font-semibold text-[#0E292F] leading-snug">
              {featuredProperty.name}
            </h3>
            <div className="flex items-center gap-1.5 mt-1.5 mb-1">
              <MapPin size={11} className="text-gray-400 shrink-0" />
              <p className="text-[11px] text-gray-500">
                {featuredProperty.location}
              </p>
            </div>
            <p className="text-[11px] text-gray-400">
              Time: {featuredProperty.time}
            </p>
          </div>
          <button className="mt-4 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#0E292F] text-white text-[12px] font-semibold hover:bg-[#1D3F48] transition-colors">
            <Video size={14} /> Start Meeting
          </button>
        </div>

        {/* Recent Listings */}
        <div className="col-span-12 sm:col-span-6 lg:col-span-4 bg-white rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[14px] font-bold text-[#0E292F]">
              Recent Listings
            </h2>
            <Link
              to="/admin/properties/add"
              className="flex items-center gap-1 text-[11px] font-semibold text-[#3D7188] hover:text-[#0E292F] transition-colors"
            >
              <span>+</span> New
            </Link>
          </div>
          <ul className="space-y-3">
            {recentListings.map((item, i) => (
              <li key={i} className="flex items-center gap-3 group">
                <div
                  className={`w-8 h-8 rounded-xl ${item.color} flex items-center justify-center shrink-0`}
                >
                  <Building2 size={14} className="text-white" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[12px] font-semibold text-[#0E292F] truncate">
                    {item.name}
                  </p>
                  <p className="text-[10px] text-gray-400 mt-0.5">
                    {item.date}
                  </p>
                </div>
                <Link
                  to="/admin/properties"
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <ArrowUpRight size={14} className="text-gray-400" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ── ROW 3 ── */}
      <div className="grid grid-cols-12 gap-4">
        {/* Recent Enquiries */}
        <div className="col-span-12 lg:col-span-5 bg-white rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[14px] font-bold text-[#0E292F]">
              Recent Enquiries
            </h2>
            <Link
              to="/admin/enquiries"
              className="text-[11px] font-semibold text-[#3D7188] hover:text-[#0E292F] flex items-center gap-1 transition-colors"
            >
              + Add Member
            </Link>
          </div>
          <ul className="space-y-3">
            {enquiries.map((eq, i) => (
              <li key={i} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#0E292F]/10 flex items-center justify-center shrink-0">
                  <span className="text-[11px] font-bold text-[#0E292F]">
                    {eq.initials}
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[12px] font-semibold text-[#0E292F] leading-none">
                    {eq.name}
                  </p>
                  <p className="text-[11px] text-gray-400 mt-0.5 truncate">
                    Enquiring on{" "}
                    <span className="text-[#0E292F]/70">{eq.task}</span>
                  </p>
                </div>
                <span
                  className={`shrink-0 text-[10px] font-bold px-2 py-1 rounded-full ${eq.color}`}
                >
                  {eq.status}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Gauge */}
        <div className="col-span-12 sm:col-span-6 lg:col-span-3 bg-white rounded-2xl p-5 flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-[14px] font-bold text-[#0E292F]">
              Listing Performance
            </h2>
          </div>
          <div className="flex-1 flex items-center justify-center">
            <div className="w-full max-w-[200px]">
              <GaugeChart value={62} />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-gray-100">
            {[
              { dot: "bg-[#0E292F]", label: "Converted", v: "62%" },
              { dot: "bg-[#3D7188]", label: "In Review", v: "24%" },
              { dot: "bg-gray-200", label: "Dropped", v: "14%" },
            ].map((it) => (
              <div key={it.label} className="flex flex-col items-center gap-1">
                <div className={`w-2 h-2 rounded-full ${it.dot}`} />
                <span className="text-[11px] font-bold text-[#0E292F]">
                  {it.v}
                </span>
                <span className="text-[10px] text-gray-400">{it.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Session Timer */}
        <div className="col-span-12 sm:col-span-6 lg:col-span-4">
          <SessionTimer />
        </div>
      </div>
    </div>
  );
}
