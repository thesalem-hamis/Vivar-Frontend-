import { useEffect, useState, useCallback } from "react";
import { getDashboardStats } from "@/lib/supabase/admin";
import { supabase } from "@/lib/supabase/client";
import {
  Users, Home, Plus, BarChart3, Activity,
  Building2, MessageSquare, RefreshCw,
  ArrowUpRight, Clock, Tag, CheckCircle2, AlertCircle,
} from "lucide-react";

interface DashboardStats {
  users: number;
  properties: number;
  bookings: number;
  reviews: number;
  totalViews: number;
  todayViews: number;
  thisWeekViews: number;
}

const quickActions = [
  { icon: Plus, label: "Add Property", bgColor: "bg-gradient-to-br from-emerald-400 to-emerald-600", iconColor: "text-white", description: "Create new listing" },
  { icon: Users, label: "Manage Users", bgColor: "bg-gradient-to-br from-blue-400 to-blue-600", iconColor: "text-white", description: "View all users" },
  { icon: Building2, label: "Properties", bgColor: "bg-gradient-to-br from-indigo-400 to-indigo-600", iconColor: "text-white", description: "Manage listings" },
  { icon: MessageSquare, label: "Messages", bgColor: "bg-gradient-to-br from-pink-400 to-pink-600", iconColor: "text-white", description: "View inquiries" },
  { icon: BarChart3, label: "Analytics", bgColor: "bg-gradient-to-br from-purple-400 to-purple-600", iconColor: "text-white", description: "View reports" },
  { icon: Activity, label: "Activity", bgColor: "bg-gradient-to-br from-amber-400 to-amber-600", iconColor: "text-white", description: "Recent actions" },
];

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentBookings, setRecentBookings] = useState<any[]>([]);
  const [recentUsers, setRecentUsers] = useState<any[]>([]);
  const [recentProperties, setRecentProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAllData = useCallback(async () => {
    try {
      setError(null);

      // Fetch dashboard stats
      const statsData = await getDashboardStats();
      setStats(statsData);

      // Fetch recent bookings
      const { data: bookings } = await supabase
        .from("bookings")
        .select("*, properties(title)")
        .order("created_at", { ascending: false })
        .limit(3);
      setRecentBookings(bookings || []);

      // Fetch recent users
      const { data: users } = await supabase
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(3);
      setRecentUsers(users || []);

      // Fetch recent properties
      const { data: properties } = await supabase
        .from("properties")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(3);
      setRecentProperties(properties || []);
    } catch (err: any) {
      setError(err.message || "Failed to load dashboard");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  // Real-time refresh every 30 seconds
  useEffect(() => {
    const interval = setInterval(fetchAllData, 30000);
    return () => clearInterval(interval);
  }, [fetchAllData]);

  // Build real-time activity from actual data
  const recentActivity = [
    ...recentUsers.map((u: any) => ({
      icon: Users,
      color: "text-blue-600",
      bg: "bg-blue-50",
      title: "New user registered",
      time: getRelativeTime(u.created_at),
      description: u.full_name || "Anonymous user joined",
    })),
    ...recentProperties.map((p: any) => ({
      icon: Home,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      title: "Property listed",
      time: getRelativeTime(p.created_at),
      description: p.title || "New property added",
    })),
    ...recentBookings.map((b: any) => ({
      icon: CheckCircle2,
      color: "text-purple-600",
      bg: "bg-purple-50",
      title: "New booking",
      time: getRelativeTime(b.created_at),
      description: b.properties?.title || "Property booked",
    })),
  ]
    .sort((a, b) => new Date(b.time === "Just now" ? Date.now() : 0).getTime() - new Date(a.time === "Just now" ? Date.now() : 0).getTime())
    .slice(0, 6);

  const quickInsights = [
    { label: "For Sale", value: stats?.properties ?? "—", icon: Tag, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "For Rent", value: stats?.bookings ?? "—", icon: Tag, color: "text-purple-600", bg: "bg-purple-50" },
    { label: "Active Users", value: stats?.users ?? "—", icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50" },
  ];

  const statCards = [
    {
      key: "users" as const,
      label: "Total Users",
      icon: Users,
      iconBg: "bg-blue-500/10",
      iconColor: "text-blue-600",
      gradient: "from-blue-500/5 to-blue-600/5",
      border: "border-slate-100",
      description: "Registered accounts",
      trend: "+12%",
    },
    {
      key: "properties" as const,
      label: "Total Properties",
      icon: Home,
      iconBg: "bg-emerald-500/10",
      iconColor: "text-emerald-600",
      gradient: "from-emerald-500/5 to-emerald-600/5",
      border: "border-slate-100",
      description: "Active listings",
      trend: "+8%",
    },
    {
      key: "totalViews" as const,
      label: "Page Views",
      icon: BarChart3,
      iconBg: "bg-purple-500/10",
      iconColor: "text-purple-600",
      gradient: "from-purple-500/5 to-purple-600/5",
      border: "border-slate-100",
      description: "Total site visits",
      trend: "+15%",
    },
    {
      key: "todayViews" as const,
      label: "Today's Views",
      icon: Activity,
      iconBg: "bg-amber-500/10",
      iconColor: "text-amber-600",
      gradient: "from-amber-500/5 to-amber-600/5",
      border: "border-slate-100",
      description: "Visitors today",
      trend: "+5%",
    },
  ];

  if (loading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full border-4 border-slate-200 border-t-slate-900 animate-spin mx-auto" />
          <p className="mt-4 text-slate-600 font-medium">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-gradient-to-br from-red-50 to-red-100 border border-red-200 rounded-2xl p-8 text-center shadow-lg">
          <div className="w-14 h-14 rounded-full bg-red-200 flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-7 h-7 text-red-600" />
          </div>
          <h3 className="text-lg font-semibold text-red-900 mb-2">Dashboard Error</h3>
          <p className="text-sm text-red-600 mb-4">{error}</p>
          <button
            onClick={fetchAllData}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-red-600 text-white rounded-xl text-sm font-medium hover:bg-red-700 transition-colors"
          >
            <RefreshCw className="w-4 h-4" /> Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6 p-6">
      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 text-white shadow-lg">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-emerald-500/20 to-teal-500/20 rounded-full blur-3xl" />

        <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
                <BarChart3 className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-white/60 font-semibold">Dashboard Overview</p>
                <p className="text-sm text-white/50">
                  {new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
                </p>
              </div>
            </div>
            <h1 className="text-3xl font-bold tracking-tight">Welcome back 👋</h1>
            <p className="mt-2 text-white/70 max-w-md">Monitor your platform's performance, manage listings, and track user activity.</p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchAllData}
              className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white text-sm font-medium transition-all duration-200"
              title="Refresh dashboard"
            >
              <RefreshCw className="w-4 h-4" />
              <span className="hidden sm:inline">Refresh</span>
            </button>
            <button className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white text-slate-900 text-sm font-semibold hover:bg-white/90 transition-all duration-200 hover:-translate-y-0.5">
              <Plus className="w-5 h-5" /> Add Property
            </button>
          </div>
        </div>
      </div>

      {/* Main Stats — 4 cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card) => {
          const Icon = card.icon;
          const value = stats?.[card.key] ?? 0;
          return (
            <div
              key={card.key}
              className={`relative overflow-hidden bg-white rounded-2xl border ${card.border} hover:shadow-md transition-all duration-300 hover:-translate-y-0.5`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-50`} />
              <div className="relative p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className={`w-10 h-10 rounded-xl ${card.iconBg} flex items-center justify-center`}>
                    <Icon className={`w-5 h-5 ${card.iconColor}`} />
                  </div>
                  <div className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700">
                    <ArrowUpRight className="w-3 h-3" />
                    {card.trend}
                  </div>
                </div>
                <p className="text-xs font-medium text-slate-500 mb-0.5">{card.label}</p>
                <p className="text-3xl font-bold text-slate-900 tracking-tight">{Number(value).toLocaleString()}</p>
                <p className="text-[11px] text-slate-400 mt-1">{card.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {quickInsights.map((insight) => {
          const Icon = insight.icon;
          return (
            <div key={insight.label} className="bg-white rounded-2xl border border-slate-100 p-5 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl ${insight.bg} flex items-center justify-center`}>
                  <Icon className={`w-5 h-5 ${insight.color}`} />
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-500">{insight.label}</p>
                  <p className="text-2xl font-bold text-slate-900">{typeof insight.value === "number" ? insight.value.toLocaleString() : insight.value}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
        <div className="p-5 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Quick Actions</h3>
              <p className="text-xs text-slate-500">Shortcuts to common administrative tasks</p>
            </div>
          </div>
        </div>
        <div className="p-5 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.label}
                className="group flex flex-col items-center gap-3 p-4 rounded-2xl border border-slate-100 hover:border-slate-200 hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 bg-white"
              >
                <div className={`w-11 h-11 rounded-xl ${action.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
                  <Icon className={`w-5 h-5 ${action.iconColor}`} />
                </div>
                <div className="text-center">
                  <span className="text-sm font-semibold text-slate-800">{action.label}</span>
                  <p className="text-[11px] text-slate-400 mt-0.5">{action.description}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Recent Activity — Real data */}
      <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
        <div className="p-5 border-b border-slate-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
                <Clock className="w-5 h-5 text-slate-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Recent Activity</h3>
                <p className="text-xs text-slate-500">Auto-refreshes every 30s</p>
              </div>
            </div>
            <button onClick={fetchAllData} className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors flex items-center gap-1">
              <RefreshCw className="w-3.5 h-3.5" /> Refresh
            </button>
          </div>
        </div>
        <div className="divide-y divide-slate-50">
          {recentActivity.length === 0 ? (
            <div className="p-8 text-center text-sm text-slate-400">No recent activity yet</div>
          ) : (
            recentActivity.map((activity, index) => {
              const Icon = activity.icon;
              return (
                <div key={index} className="p-4 hover:bg-slate-50/50 transition-colors flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl ${activity.bg} flex items-center justify-center shrink-0`}>
                    <Icon className={`w-5 h-5 ${activity.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-900">{activity.title}</p>
                    <p className="text-xs text-slate-500 truncate">{activity.description}</p>
                  </div>
                  <span className="text-xs text-slate-400 shrink-0">{activity.time}</span>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

// Helper: Convert timestamp to relative time
function getRelativeTime(dateString: string): string {
  if (!dateString) return "Unknown";
  const date = new Date(dateString);
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 60) return "Just now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}