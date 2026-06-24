// import { useEffect, useState, useCallback } from "react";
// import { getDashboardStats } from "@/lib/supabase/admin";
// import { supabase } from "@/lib/supabase/client";
// import {
//   Users, Home, Plus, BarChart3, Activity,
//   Building2, MessageSquare, RefreshCw,
//   ArrowUpRight, Clock, Tag, CheckCircle2, AlertCircle,
// } from "lucide-react";

// interface DashboardStats {
//   users: number;
//   properties: number;
//   bookings: number;
//   reviews: number;
//   totalViews: number;
//   todayViews: number;
//   thisWeekViews: number;
// }

// const quickActions = [
//   { icon: Plus, label: "Add Property", bgColor: "bg-gradient-to-br from-emerald-400 to-emerald-600", iconColor: "text-white", description: "Create new listing" },
//   { icon: Users, label: "Manage Users", bgColor: "bg-gradient-to-br from-blue-400 to-blue-600", iconColor: "text-white", description: "View all users" },
//   { icon: Building2, label: "Properties", bgColor: "bg-gradient-to-br from-indigo-400 to-indigo-600", iconColor: "text-white", description: "Manage listings" },
//   { icon: MessageSquare, label: "Messages", bgColor: "bg-gradient-to-br from-pink-400 to-pink-600", iconColor: "text-white", description: "View inquiries" },
//   { icon: BarChart3, label: "Analytics", bgColor: "bg-gradient-to-br from-purple-400 to-purple-600", iconColor: "text-white", description: "View reports" },
//   { icon: Activity, label: "Activity", bgColor: "bg-gradient-to-br from-amber-400 to-amber-600", iconColor: "text-white", description: "Recent actions" },
// ];

// export default function DashboardPage() {
//   const [stats, setStats] = useState<DashboardStats | null>(null);
//   const [recentBookings, setRecentBookings] = useState<any[]>([]);
//   const [recentUsers, setRecentUsers] = useState<any[]>([]);
//   const [recentProperties, setRecentProperties] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const fetchAllData = useCallback(async () => {
//     try {
//       setError(null);

//       // Fetch dashboard stats
//       const statsData = await getDashboardStats();
//       setStats(statsData);

//       // Fetch recent bookings
//       const { data: bookings } = await supabase
//         .from("bookings")
//         .select("*, properties(title)")
//         .order("created_at", { ascending: false })
//         .limit(3);
//       setRecentBookings(bookings || []);

//       // Fetch recent users
//       const { data: users } = await supabase
//         .from("profiles")
//         .select("*")
//         .order("created_at", { ascending: false })
//         .limit(3);
//       setRecentUsers(users || []);

//       // Fetch recent properties
//       const { data: properties } = await supabase
//         .from("properties")
//         .select("*")
//         .order("created_at", { ascending: false })
//         .limit(3);
//       setRecentProperties(properties || []);
//     } catch (err: any) {
//       setError(err.message || "Failed to load dashboard");
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchAllData();
//   }, [fetchAllData]);

//   // Real-time refresh every 30 seconds
//   useEffect(() => {
//     const interval = setInterval(fetchAllData, 30000);
//     return () => clearInterval(interval);
//   }, [fetchAllData]);

//   // Build real-time activity from actual data
//   const recentActivity = [
//     ...recentUsers.map((u: any) => ({
//       icon: Users,
//       color: "text-blue-600",
//       bg: "bg-blue-50",
//       title: "New user registered",
//       time: getRelativeTime(u.created_at),
//       description: u.full_name || "Anonymous user joined",
//     })),
//     ...recentProperties.map((p: any) => ({
//       icon: Home,
//       color: "text-emerald-600",
//       bg: "bg-emerald-50",
//       title: "Property listed",
//       time: getRelativeTime(p.created_at),
//       description: p.title || "New property added",
//     })),
//     ...recentBookings.map((b: any) => ({
//       icon: CheckCircle2,
//       color: "text-purple-600",
//       bg: "bg-purple-50",
//       title: "New booking",
//       time: getRelativeTime(b.created_at),
//       description: b.properties?.title || "Property booked",
//     })),
//   ]
//     .sort((a, b) => new Date(b.time === "Just now" ? Date.now() : 0).getTime() - new Date(a.time === "Just now" ? Date.now() : 0).getTime())
//     .slice(0, 6);

//   const quickInsights = [
//     { label: "For Sale", value: stats?.properties ?? "—", icon: Tag, color: "text-blue-600", bg: "bg-blue-50" },
//     { label: "For Rent", value: stats?.bookings ?? "—", icon: Tag, color: "text-purple-600", bg: "bg-purple-50" },
//     { label: "Active Users", value: stats?.users ?? "—", icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50" },
//   ];

//   const statCards = [
//     {
//       key: "users" as const,
//       label: "Total Users",
//       icon: Users,
//       iconBg: "bg-blue-500/10",
//       iconColor: "text-blue-600",
//       gradient: "from-blue-500/5 to-blue-600/5",
//       border: "border-slate-100",
//       description: "Registered accounts",
//       trend: "+12%",
//     },
//     {
//       key: "properties" as const,
//       label: "Total Properties",
//       icon: Home,
//       iconBg: "bg-emerald-500/10",
//       iconColor: "text-emerald-600",
//       gradient: "from-emerald-500/5 to-emerald-600/5",
//       border: "border-slate-100",
//       description: "Active listings",
//       trend: "+8%",
//     },
//     {
//       key: "totalViews" as const,
//       label: "Page Views",
//       icon: BarChart3,
//       iconBg: "bg-purple-500/10",
//       iconColor: "text-purple-600",
//       gradient: "from-purple-500/5 to-purple-600/5",
//       border: "border-slate-100",
//       description: "Total site visits",
//       trend: "+15%",
//     },
//     {
//       key: "todayViews" as const,
//       label: "Today's Views",
//       icon: Activity,
//       iconBg: "bg-amber-500/10",
//       iconColor: "text-amber-600",
//       gradient: "from-amber-500/5 to-amber-600/5",
//       border: "border-slate-100",
//       description: "Visitors today",
//       trend: "+5%",
//     },
//   ];

//   if (loading) {
//     return (
//       <div className="min-h-[80vh] flex items-center justify-center">
//         <div className="text-center">
//           <div className="w-16 h-16 rounded-full border-4 border-slate-200 border-t-slate-900 animate-spin mx-auto" />
//           <p className="mt-4 text-slate-600 font-medium">Loading dashboard...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-[80vh] flex items-center justify-center p-4">
//         <div className="max-w-md w-full bg-gradient-to-br from-red-50 to-red-100 border border-red-200 rounded-2xl p-8 text-center shadow-lg">
//           <div className="w-14 h-14 rounded-full bg-red-200 flex items-center justify-center mx-auto mb-4">
//             <AlertCircle className="w-7 h-7 text-red-600" />
//           </div>
//           <h3 className="text-lg font-semibold text-red-900 mb-2">Dashboard Error</h3>
//           <p className="text-sm text-red-600 mb-4">{error}</p>
//           <button
//             onClick={fetchAllData}
//             className="inline-flex items-center gap-2 px-5 py-2.5 bg-red-600 text-white rounded-xl text-sm font-medium hover:bg-red-700 transition-colors"
//           >
//             <RefreshCw className="w-4 h-4" /> Retry
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-7xl mx-auto space-y-6 p-6">
//       {/* Header */}
//       <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 text-white shadow-lg">
//         <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl" />
//         <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-emerald-500/20 to-teal-500/20 rounded-full blur-3xl" />

//         <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
//           <div>
//             <div className="flex items-center gap-3 mb-3">
//               <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
//                 <BarChart3 className="w-6 h-6" />
//               </div>
//               <div>
//                 <p className="text-xs uppercase tracking-[0.2em] text-white/60 font-semibold">Dashboard Overview</p>
//                 <p className="text-sm text-white/50">
//                   {new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
//                 </p>
//               </div>
//             </div>
//             <h1 className="text-3xl font-bold tracking-tight">Welcome back 👋</h1>
//             <p className="mt-2 text-white/70 max-w-md">Monitor your platform's performance, manage listings, and track user activity.</p>
//           </div>

//           <div className="flex items-center gap-3">
//             <button
//               onClick={fetchAllData}
//               className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white text-sm font-medium transition-all duration-200"
//               title="Refresh dashboard"
//             >
//               <RefreshCw className="w-4 h-4" />
//               <span className="hidden sm:inline">Refresh</span>
//             </button>
//             <button className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white text-slate-900 text-sm font-semibold hover:bg-white/90 transition-all duration-200 hover:-translate-y-0.5">
//               <Plus className="w-5 h-5" /> Add Property
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Main Stats — 4 cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//         {statCards.map((card) => {
//           const Icon = card.icon;
//           const value = stats?.[card.key] ?? 0;
//           return (
//             <div
//               key={card.key}
//               className={`relative overflow-hidden bg-white rounded-2xl border ${card.border} hover:shadow-md transition-all duration-300 hover:-translate-y-0.5`}
//             >
//               <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-50`} />
//               <div className="relative p-5">
//                 <div className="flex items-start justify-between mb-3">
//                   <div className={`w-10 h-10 rounded-xl ${card.iconBg} flex items-center justify-center`}>
//                     <Icon className={`w-5 h-5 ${card.iconColor}`} />
//                   </div>
//                   <div className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700">
//                     <ArrowUpRight className="w-3 h-3" />
//                     {card.trend}
//                   </div>
//                 </div>
//                 <p className="text-xs font-medium text-slate-500 mb-0.5">{card.label}</p>
//                 <p className="text-3xl font-bold text-slate-900 tracking-tight">{Number(value).toLocaleString()}</p>
//                 <p className="text-[11px] text-slate-400 mt-1">{card.description}</p>
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       {/* Quick Insights */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         {quickInsights.map((insight) => {
//           const Icon = insight.icon;
//           return (
//             <div key={insight.label} className="bg-white rounded-2xl border border-slate-100 p-5 hover:shadow-md transition-shadow">
//               <div className="flex items-center gap-3">
//                 <div className={`w-10 h-10 rounded-xl ${insight.bg} flex items-center justify-center`}>
//                   <Icon className={`w-5 h-5 ${insight.color}`} />
//                 </div>
//                 <div>
//                   <p className="text-xs font-medium text-slate-500">{insight.label}</p>
//                   <p className="text-2xl font-bold text-slate-900">{typeof insight.value === "number" ? insight.value.toLocaleString() : insight.value}</p>
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       {/* Quick Actions */}
//       <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
//         <div className="p-5 border-b border-slate-100">
//           <div className="flex items-center gap-3">
//             <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center">
//               <Activity className="w-5 h-5" />
//             </div>
//             <div>
//               <h3 className="text-lg font-bold text-slate-900">Quick Actions</h3>
//               <p className="text-xs text-slate-500">Shortcuts to common administrative tasks</p>
//             </div>
//           </div>
//         </div>
//         <div className="p-5 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
//           {quickActions.map((action) => {
//             const Icon = action.icon;
//             return (
//               <button
//                 key={action.label}
//                 className="group flex flex-col items-center gap-3 p-4 rounded-2xl border border-slate-100 hover:border-slate-200 hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 bg-white"
//               >
//                 <div className={`w-11 h-11 rounded-xl ${action.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
//                   <Icon className={`w-5 h-5 ${action.iconColor}`} />
//                 </div>
//                 <div className="text-center">
//                   <span className="text-sm font-semibold text-slate-800">{action.label}</span>
//                   <p className="text-[11px] text-slate-400 mt-0.5">{action.description}</p>
//                 </div>
//               </button>
//             );
//           })}
//         </div>
//       </div>

//       {/* Recent Activity — Real data */}
//       <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
//         <div className="p-5 border-b border-slate-100">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-3">
//               <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
//                 <Clock className="w-5 h-5 text-slate-600" />
//               </div>
//               <div>
//                 <h3 className="text-lg font-bold text-slate-900">Recent Activity</h3>
//                 <p className="text-xs text-slate-500">Auto-refreshes every 30s</p>
//               </div>
//             </div>
//             <button onClick={fetchAllData} className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors flex items-center gap-1">
//               <RefreshCw className="w-3.5 h-3.5" /> Refresh
//             </button>
//           </div>
//         </div>
//         <div className="divide-y divide-slate-50">
//           {recentActivity.length === 0 ? (
//             <div className="p-8 text-center text-sm text-slate-400">No recent activity yet</div>
//           ) : (
//             recentActivity.map((activity, index) => {
//               const Icon = activity.icon;
//               return (
//                 <div key={index} className="p-4 hover:bg-slate-50/50 transition-colors flex items-center gap-4">
//                   <div className={`w-10 h-10 rounded-xl ${activity.bg} flex items-center justify-center shrink-0`}>
//                     <Icon className={`w-5 h-5 ${activity.color}`} />
//                   </div>
//                   <div className="flex-1 min-w-0">
//                     <p className="text-sm font-semibold text-slate-900">{activity.title}</p>
//                     <p className="text-xs text-slate-500 truncate">{activity.description}</p>
//                   </div>
//                   <span className="text-xs text-slate-400 shrink-0">{activity.time}</span>
//                 </div>
//               );
//             })
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// // Helper: Convert timestamp to relative time
// function getRelativeTime(dateString: string): string {
//   if (!dateString) return "Unknown";
//   const date = new Date(dateString);
//   const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
//   if (seconds < 60) return "Just now";
//   if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
//   if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
//   if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
//   return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
// }





// import { useEffect, useState, useCallback } from "react";
// import { getDashboardStats } from "@/lib/supabase/admin";
// import { supabase } from "@/lib/supabase/client";
// import {
//   Users, Home, Plus, Building2, RefreshCw,
//   Clock, Tag, CheckCircle2, AlertCircle,
// } from "lucide-react";

// interface DashboardStats {
//   users: number;
//   properties: number;
//   bookings: number;
//   reviews: number;
//   totalViews: number;
//   todayViews: number;
//   thisWeekViews: number;
// }

// function getRelativeTime(dateString: string): string {
//   if (!dateString) return "Unknown";
//   const date = new Date(dateString);
//   const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
//   if (seconds < 60) return "Just now";
//   if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
//   if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
//   if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
//   return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
// }

// const quickActions = [
//   { icon: Plus, label: "Add Property", bg: "bg-[#0E292F] hover:bg-[#1D3F48] text-white", iconColor: "text-white", description: "Create new listing" },
//   { icon: Users, label: "Manage Users", bg: "bg-white hover:bg-[#0E292F]/5 text-black border border-[#0E292F]/10", iconColor: "text-blue-600", description: "View all users" },
//   { icon: Building2, label: "Properties", bg: "bg-white hover:bg-[#0E292F]/5 text-black border border-[#0E292F]/10", iconColor: "text-emerald-600", description: "Manage listings" },
// ];

// // ── HIGH FIDELITY SHIMMER SKELETON LOADER ──
// function DashboardSkeleton() {
//   // Shimmer animation applied via custom background utility classes
//   const shimmer = "relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-neutral-100 before:to-transparent bg-neutral-200/70";

//   return (
//     <div className="max-w-7xl mx-auto space-y-6" style={{ fontFamily: "'Poppins', sans-serif" }}>
      
//       {/* Header Panel Skeleton */}
//       <div className="bg-white border border-[#0E292F]/15 rounded-xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
//         <div className="space-y-2.5 flex-1">
//           <div className={`h-3 w-32 rounded ${shimmer}`} />
//           <div className={`h-7 w-56 rounded ${shimmer}`} />
//           <div className={`h-4 w-72 rounded bg-neutral-100`} />
//         </div>
//         <div className="flex gap-2 shrink-0">
//           <div className={`w-9 h-9 rounded-lg ${shimmer}`} />
//           <div className={`w-32 h-9 rounded-lg ${shimmer}`} />
//         </div>
//       </div>

//       {/* KPI Metrics Skeleton */}
//       <div className="bg-white border border-[#0E292F]/15 rounded-xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#0E292F]/10 overflow-hidden">
//         {[1, 2, 3, 4].map((i) => (
//           <div key={i} className="p-6 flex flex-col justify-center gap-2">
//             <div className={`h-3 w-24 rounded ${shimmer}`} />
//             <div className={`h-8 w-16 rounded ${shimmer}`} />
//           </div>
//         ))}
//       </div>

//       {/* Split Column Workspace Skeleton */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         <div className="lg:col-span-2 space-y-6">
          
//           {/* Quick Actions Panel */}
//           <div className="bg-white border border-[#0E292F]/15 rounded-xl overflow-hidden">
//             <div className="px-5 py-4 border-b border-[#0E292F]/10">
//               <div className={`h-4 w-28 rounded ${shimmer}`} />
//             </div>
//             <div className="p-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
//               {[1, 2, 3].map((i) => (
//                 <div key={i} className="p-4 bg-white border border-neutral-100 rounded-xl flex flex-col gap-3">
//                   <div className={`w-6 h-6 rounded-lg ${shimmer}`} />
//                   <div className="space-y-1.5">
//                     <div className={`h-3 w-20 rounded ${shimmer}`} />
//                     <div className={`h-2.5 w-28 rounded bg-neutral-100`} />
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Micro Insights */}
//           <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//             {[1, 2, 3].map((i) => (
//               <div key={i} className="bg-white border border-[#0E292F]/15 rounded-xl p-4 flex items-center gap-3">
//                 <div className={`w-8 h-8 rounded-lg shrink-0 ${shimmer}`} />
//                 <div className="space-y-1.5 flex-1">
//                   <div className={`h-2.5 w-14 rounded ${shimmer}`} />
//                   <div className={`h-4 w-10 rounded ${shimmer}`} />
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Activity Log Panel */}
//         <div className="bg-white border border-[#0E292F]/15 rounded-xl overflow-hidden flex flex-col justify-between">
//           <div>
//             <div className="px-5 py-4 border-b border-[#0E292F]/10 flex items-center justify-between">
//               <div className={`h-4 w-24 rounded ${shimmer}`} />
//               <div className={`h-3.5 w-8 rounded ${shimmer}`} />
//             </div>
//             <div className="divide-y divide-[#0E292F]/5">
//               {[1, 2, 3, 4].map((i) => (
//                 <div key={i} className="p-4 flex items-start gap-3">
//                   <div className="w-1.5 h-1.5 rounded-full bg-neutral-300 mt-2 shrink-0 animate-pulse" />
//                   <div className="flex-1 space-y-2">
//                     <div className="flex justify-between items-center gap-2">
//                       <div className={`h-3 w-32 rounded ${shimmer}`} />
//                       <div className={`h-2.5 w-12 rounded bg-neutral-100`} />
//                     </div>
//                     <div className={`h-3 w-48 rounded bg-neutral-100`} />
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//           <div className="p-3.5 bg-neutral-50 border-t border-neutral-100 flex justify-center">
//             <div className={`h-3 w-44 rounded bg-neutral-200/50`} />
//           </div>
//         </div>
//       </div>

//     </div>
//   );
// }

// export default function DashboardPage() {
//   const [stats, setStats] = useState<DashboardStats | null>(null);
//   const [recentBookings, setRecentBookings] = useState<any[]>([]);
//   const [recentUsers, setRecentUsers] = useState<any[]>([]);
//   const [recentProperties, setRecentProperties] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const fetchAllData = useCallback(async () => {
//     try {
//       setError(null);
//       const statsData = await getDashboardStats();
//       setStats(statsData);

//       const { data: bookings } = await supabase
//         .from("bookings")
//         .select("*, properties(title)")
//         .order("created_at", { ascending: false })
//         .limit(3);
//       setRecentBookings(bookings || []);

//       const { data: users } = await supabase
//         .from("profiles")
//         .select("*")
//         .order("created_at", { ascending: false })
//         .limit(3);
//       setRecentUsers(users || []);

//       const { data: properties } = await supabase
//         .from("properties")
//         .select("*")
//         .order("created_at", { ascending: false })
//         .limit(3);
//       setRecentProperties(properties || []);
//     } catch (err: any) {
//       setError(err.message || "Failed to load dashboard");
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchAllData();
//   }, [fetchAllData]);

//   useEffect(() => {
//     const interval = setInterval(fetchAllData, 30000);
//     return () => clearInterval(interval);
//   }, [fetchAllData]);

//   const recentActivity = [
//     ...recentUsers.map((u: any) => ({
//       icon: Users,
//       title: "New user registered",
//       time: getRelativeTime(u.created_at),
//       description: u.full_name || "Anonymous user joined",
//     })),
//     ...recentProperties.map((p: any) => ({
//       icon: Home,
//       title: "Property listed",
//       time: getRelativeTime(p.created_at),
//       description: p.title || "New property added",
//     })),
//     ...recentBookings.map((b: any) => ({
//       icon: CheckCircle2,
//       title: "New booking",
//       time: getRelativeTime(b.created_at),
//       description: b.properties?.title || "Property booked",
//     })),
//   ]
//     .sort((a, b) => new Date(b.time === "Just now" ? Date.now() : 0).getTime() - new Date(a.time === "Just now" ? Date.now() : 0).getTime())
//     .slice(0, 4);

//   const quickInsights = [
//     { label: "For Sale", value: stats?.properties ?? "0", icon: Tag, bg: "bg-blue-50 border-blue-200 text-blue-600" },
//     { label: "For Rent", value: stats?.bookings ?? "0", icon: Tag, bg: "bg-pink-50 border-pink-200 text-pink-600" },
//     { label: "Active Users", value: stats?.users ?? "0", icon: CheckCircle2, bg: "bg-orange-50 border-orange-200 text-orange-600" },
//   ];

//   const statCards = [
//     { key: "users" as const, label: "Total Users", icon: Users, iconBg: "bg-blue-50/70 border-blue-200/80", iconColor: "text-blue-600" },
//     { key: "properties" as const, label: "Total Properties", icon: Home, iconBg: "bg-emerald-50/70 border-emerald-200/80", iconColor: "text-emerald-600" },
//     { key: "totalViews" as const, label: "Page Views", icon: Building2, iconBg: "bg-pink-50/70 border-pink-200/80", iconColor: "text-pink-600" },
//     { key: "todayViews" as const, label: "Today's Views", icon: Clock, iconBg: "bg-orange-50/70 border-orange-200/80", iconColor: "text-orange-600" },
//   ];

//   // Pristine custom shimmer component handles state loading cleanly
//   if (loading) {
//     return <DashboardSkeleton />;
//   }

//   if (error) {
//     return (
//       <div className="min-h-[70vh] flex items-center justify-center p-4" style={{ fontFamily: "'Poppins', sans-serif" }}>
//         <div className="max-w-md w-full bg-white border border-[#0E292F]/10 rounded-xl p-8 text-center shadow-sm">
//           <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
//             <AlertCircle className="w-4 h-4 text-red-600" />
//           </div>
//           <h3 className="text-sm font-semibold text-black mb-1">System Sync Failure</h3>
//           <p className="text-xs text-[#1D3F48]/70 mb-5">{error}</p>
//           <button
//             onClick={fetchAllData}
//             className="inline-flex items-center gap-2 px-4 py-2 bg-[#0E292F] text-white rounded-lg text-xs font-medium hover:bg-[#1D3F48] transition-colors"
//           >
//             <RefreshCw className="w-3 h-3" /> Retry Sync
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-7xl mx-auto space-y-6" style={{ fontFamily: "'Poppins', sans-serif" }}>
      
//       {/* ── HEADER PANEL ── */}
//       <div className="bg-white border border-[#0E292F]/15 rounded-xl p-6 sm:p-8">
//         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
//           <div className="space-y-1">
//             <div className="flex items-center gap-2 text-xs font-semibold tracking-widest text-[#1D3F48] uppercase">
//               <span>Overview</span>
//               <span className="w-1 h-1 rounded-full bg-[#0E292F]" />
//               <span className="font-normal normal-case tracking-normal text-[#1D3F48]/60">
//                 {new Date().toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}
//               </span>
//             </div>
//             <h1 className="text-xl sm:text-2xl font-semibold text-black tracking-tight">Welcome back, Admin</h1>
//             <p className="text-xs sm:text-sm text-[#1D3F48]/70">Monitor system properties, analytics and logs.</p>
//           </div>

//           <div className="flex items-center gap-2 shrink-0">
//             <button
//               onClick={fetchAllData}
//               className="p-2.5 rounded-lg border border-[#0E292F]/15 bg-white text-[#0E292F] hover:bg-[#0E292F]/5 transition-colors"
//               title="Refresh console"
//             >
//               <RefreshCw className="w-3.5 h-3.5" />
//             </button>
//             <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#0E292F] text-white text-xs font-medium hover:bg-[#1D3F48] transition-colors">
//               <Plus className="w-3.5 h-3.5" /> Add Property
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* ── KPI METRICS CONTAINER ── */}
//       <div className="bg-white border border-[#0E292F]/15 rounded-xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#0E292F]/10 overflow-hidden">
//         {statCards.map((card) => {
//           const Icon = card.icon;
//           const value = stats?.[card.key] ?? 0;
//           return (
//             <div key={card.key} className="p-6 flex items-center justify-between gap-4">
//               <div className="space-y-1 flex-1 min-w-0">
//                 <p className="text-xs font-medium text-[#1D3F48]/60 truncate">{card.label}</p>
//                 <p className="text-2xl sm:text-3xl font-semibold text-black tracking-tight truncate">
//                   {Number(value).toLocaleString()}
//                 </p>
//               </div>
//               <div className={`w-9 h-9 rounded-xl border ${card.iconBg} flex items-center justify-center shrink-0`}>
//                 <Icon className={`w-4 h-4 ${card.iconColor}`} />
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       {/* ── SPLIT WORKSPACE BLOCK ── */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
//         {/* Left Side Content */}
//         <div className="lg:col-span-2 space-y-6">
          
//           {/* Quick Actions Panel */}
//           <div className="bg-white border border-[#0E292F]/15 rounded-xl overflow-hidden">
//             <div className="px-5 py-4 border-b border-[#0E292F]/10">
//               <h3 className="text-sm font-medium text-neutral-700">Quick Actions</h3>
//             </div>
//             <div className="p-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
//               {quickActions.map((action) => {
//                 const Icon = action.icon;
//                 return (
//                   <button
//                     key={action.label}
//                     className={`flex flex-col items-start gap-3 p-4 rounded-xl transition-all duration-150 text-left ${action.bg}`}
//                   >
//                     <div className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0">
//                       <Icon className={`w-3.5 h-3.5 ${action.iconColor}`} />
//                     </div>
//                     <div>
//                       <span className="text-xs font-semibold block">{action.label}</span>
//                       <span className="text-[10px] opacity-60 mt-0.5 block line-clamp-1">{action.description}</span>
//                     </div>
//                   </button>
//                 );
//               })}
//             </div>
//           </div>

//           {/* Micro Insights */}
//           <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//             {quickInsights.map((insight) => {
//               const Icon = insight.icon;
//               return (
//                 <div key={insight.label} className="bg-white border border-[#0E292F]/15 rounded-xl p-4 flex items-center gap-3 shadow-[0_2px_6px_-3px_rgba(0,0,0,0.02)]">
//                   <div className={`w-8 h-8 rounded-lg border flex items-center justify-center shrink-0 ${insight.bg}`}>
//                     <Icon className="w-3.5 h-3.5" />
//                   </div>
//                   <div>
//                     <p className="text-[11px] font-semibold text-[#1D3F48]/60">{insight.label}</p>
//                     <p className="text-base font-semibold text-black">{typeof insight.value === "number" ? insight.value.toLocaleString() : insight.value}</p>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>

//         </div>

//         {/* Right Side Console Log */}
//         <div className="bg-white border border-[#0E292F]/15 rounded-xl overflow-hidden flex flex-col justify-between">
//           <div>
//             <div className="px-5 py-4 border-b border-[#0E292F]/10 flex items-center justify-between">
//               <div className="flex items-center gap-2">
//                 <Clock className="w-3.5 h-3.5 text-[#1D3F48]" />
//                 <h3 className="text-sm font-medium text-neutral-700">Activity Log</h3>
//               </div>
//               <span className="text-[9px] font-semibold tracking-wider bg-[#0E292F] px-1.5 py-0.5 rounded text-white uppercase">Live</span>
//             </div>

//             <div className="divide-y divide-[#0E292F]/5">
//               {recentActivity.length === 0 ? (
//                 <div className="p-8 text-center text-xs text-[#1D3F48]/50">No recent system logs.</div>
//               ) : (
//                 recentActivity.map((activity, index) => {
//                   return (
//                     <div key={index} className="p-4 hover:bg-[#0E292F]/5 transition-colors flex items-start gap-3">
//                       <div className="w-1 h-1 rounded-full bg-[#1D3F48] mt-2 shrink-0" />
//                       <div className="flex-1 min-w-0">
//                         <div className="flex items-center justify-between gap-2">
//                           <p className="text-xs font-semibold text-black truncate">{activity.title}</p>
//                           <span className="text-[10px] text-[#1D3F48]/60 whitespace-nowrap shrink-0">{activity.time}</span>
//                         </div>
//                         <p className="text-[11px] text-[#1D3F48]/70 truncate mt-0.5">{activity.description}</p>
//                       </div>
//                     </div>
//                   );
//                 })
//               )}
//             </div>
//           </div>

//           <div className="p-3.5 bg-[#0E292F]/5 border-t border-[#0E292F]/10 text-center">
//             <p className="text-[10px] text-[#1D3F48]/60 font-medium tracking-wide">Data refreshes dynamically every 30s</p>
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// }

import { useEffect, useState, useCallback } from "react";
import { getDashboardStats } from "@/lib/supabase/admin";
import { supabase } from "@/lib/supabase/client";
import {
  Users, Home, Plus, Building2, RefreshCw,
  Clock, Tag, CheckCircle2, AlertCircle, ArrowUpRight,
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

const quickActions = [
  { icon: Plus, label: "Add property", description: "Create a new listing" },
  { icon: Users, label: "Manage users", description: "View all accounts" },
  { icon: Building2, label: "Properties", description: "Review listings" },
];

// ── Skeleton ──
function DashboardSkeleton() {
  const block = "bg-neutral-200 rounded-md animate-pulse";
  return (
    <div className="space-y-8 font-sans">
      <div className="space-y-3">
        <div className={`${block} h-3 w-24`} />
        <div className={`${block} h-9 w-80`} />
        <div className={`${block} h-3 w-64`} />
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-neutral-200 border border-neutral-200 rounded-xl overflow-hidden">
        {[1,2,3,4].map(i => (
          <div key={i} className="bg-white p-5 space-y-3">
            <div className={`${block} h-3 w-20`} />
            <div className={`${block} h-8 w-24`} />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className={`${block} border border-neutral-200 h-72 lg:col-span-1`} />
        <div className={`${block} border border-neutral-200 h-72 lg:col-span-2`} />
      </div>
    </div>
  );
}

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
      const statsData = await getDashboardStats();
      setStats(statsData);

      const { data: bookings } = await supabase
        .from("bookings")
        .select("*, properties(title)")
        .order("created_at", { ascending: false })
        .limit(3);
      setRecentBookings(bookings || []);

      const { data: users } = await supabase
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(3);
      setRecentUsers(users || []);

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

  useEffect(() => { fetchAllData(); }, [fetchAllData]);

  useEffect(() => {
    const interval = setInterval(fetchAllData, 30000);
    return () => clearInterval(interval);
  }, [fetchAllData]);

  const recentActivity = [
    ...recentUsers.map((u: any) => ({
      icon: Users,
      title: "New user registered",
      time: getRelativeTime(u.created_at),
      description: u.full_name || "Anonymous user joined",
    })),
    ...recentProperties.map((p: any) => ({
      icon: Home,
      title: "Property listed",
      time: getRelativeTime(p.created_at),
      description: p.title || "New property added",
    })),
    ...recentBookings.map((b: any) => ({
      icon: CheckCircle2,
      title: "New booking",
      time: getRelativeTime(b.created_at),
      description: b.properties?.title || "Property booked",
    })),
  ].slice(0, 6);

  const quickInsights = [
    { label: "For sale", value: stats?.properties ?? 0, icon: Tag },
    { label: "For rent", value: stats?.bookings ?? 0, icon: Tag },
    { label: "Active users", value: stats?.users ?? 0, icon: CheckCircle2 },
  ];

  const statCards = [
    { key: "users" as const, label: "Total users", icon: Users },
    { key: "properties" as const, label: "Total properties", icon: Home },
    { key: "totalViews" as const, label: "Page views", icon: Building2 },
    { key: "todayViews" as const, label: "Today's views", icon: Clock },
  ];

  if (loading) return <DashboardSkeleton />;

  if (error) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center font-sans">
        <div className="text-center max-w-sm bg-white border border-neutral-200 rounded-xl p-6">
          <div className="w-12 h-12 mx-auto rounded-full bg-red-50 flex items-center justify-center mb-4">
            <AlertCircle className="w-5 h-5 text-red-600" />
          </div>
          <h2 className="text-2xl font-semibold text-[#0E292F] tracking-tight">
            Sync failure
          </h2>
          <p className="text-sm text-neutral-500 mt-2">{error}</p>
          <button
            onClick={fetchAllData}
            className="mt-5 inline-flex items-center gap-2 px-4 h-9 bg-[#0E292F] text-white text-sm font-medium rounded-md hover:bg-[#163a42] transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10 font-sans antialiased text-neutral-800 bg-neutral-50/50 p-6 rounded-2xl">
      {/* ── HEADER ── */}
      <header className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-400">
            Overview ·{" "}
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}
          </p>
          <h1 className="text-3xl lg:text-4xl font-bold text-[#0E292F] tracking-tight mt-2">
            Welcome back, Admin.
          </h1>
          <p className="text-sm text-neutral-500 mt-2 max-w-md">
            Monitor system properties, analytics and live activity across the platform.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={fetchAllData}
            className="inline-flex items-center gap-1.5 h-9 px-3.5 border border-neutral-200 bg-white text-sm font-medium text-[#0E292F] rounded-md hover:bg-neutral-50 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Refresh
          </button>
          <button className="inline-flex items-center gap-1.5 h-9 px-4 bg-[#0E292F] text-white text-sm font-medium rounded-md hover:bg-[#163a42] transition-colors">
            <Plus className="w-3.5 h-3.5" /> Add property
          </button>
        </div>
      </header>

      {/* ── KPI STRIP ── */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-neutral-200 border border-neutral-200 rounded-xl overflow-hidden">
        {statCards.map((card) => {
          const Icon = card.icon;
          const value = stats?.[card.key] ?? 0;
          return (
            <div key={card.key} className="bg-white p-5 transition-colors">
              <div className="flex items-start justify-between">
                <p className="text-xs font-semibold text-neutral-800 tracking-normal font-sans">
                  {card.label}
                </p>
                <Icon className="w-4 h-4 text-neutral-400" strokeWidth={2} />
              </div>
              <p className="text-3xl font-bold text-[#0E292F] mt-4 tracking-tight font-sans">
                {Number(value).toLocaleString()}
              </p>
              <p className="text-[11px] text-neutral-400 mt-2 tracking-wide font-sans">
                Updated just now
              </p>
            </div>
          );
        })}
      </section>

      {/* ── SPLIT WORKSPACE ── */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left: Quick actions + insights */}
        <div className="space-y-5 lg:col-span-1">
          {/* Quick Actions */}
          <div className="bg-white border border-neutral-200 rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xs font-semibold text-neutral-800 tracking-normal font-sans">
                Quick actions
              </h2>
            </div>
            <div className="space-y-2">
              {quickActions.map((action) => {
                const Icon = action.icon;
                return (
                  <button
                    key={action.label}
                    className="w-full flex items-center gap-4 p-3 bg-white border border-transparent rounded-lg text-left hover:border-neutral-200 transition-all"
                  >
                    <div className="w-10 h-10 rounded-lg bg-[#0E292F] text-white flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5" strokeWidth={2} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-[#0E292F] font-sans">{action.label}</p>
                      <p className="text-xs text-neutral-400 mt-0.5 font-sans">{action.description}</p>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-[#0E292F]" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* At a glance */}
          <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden">
            <div className="px-5 py-4 border-b border-neutral-100">
              <h2 className="text-xs font-semibold text-neutral-800 tracking-normal font-sans">
                At a glance
              </h2>
            </div>
            <div className="divide-y divide-neutral-100">
              {quickInsights.map((insight) => {
                const Icon = insight.icon;
                return (
                  <div key={insight.label} className="flex items-center justify-between px-5 py-3.5 bg-white">
                    <div className="flex items-center gap-3">
                      <Icon className="w-4 h-4 text-neutral-400" strokeWidth={2} />
                      <p className="text-sm text-neutral-600 font-medium font-sans">{insight.label}</p>
                    </div>
                    <p className="text-lg font-bold text-[#0E292F] tracking-tight font-sans">
                      {typeof insight.value === "number"
                        ? insight.value.toLocaleString()
                        : insight.value}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Activity log */}
        <div className="lg:col-span-2 bg-white border border-neutral-200 rounded-xl flex flex-col">
          <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-100">
            <div>
              <h2 className="text-xs font-semibold text-neutral-800 tracking-normal font-sans">
                Activity log
              </h2>
              <p className="text-[11px] text-neutral-400 mt-0.5 font-sans">
                Real-time events across the platform
              </p>
            </div>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-wide text-green-700 bg-green-50 border border-green-200 rounded-full px-2.5 py-1 font-sans">
              <span className="w-1.5 h-1.5 rounded-full bg-green-600 animate-pulse" />
              Live
            </span>
          </div>

          <div className="flex-1 divide-y divide-neutral-100">
            {recentActivity.length === 0 ? (
              <p className="text-sm text-neutral-400 p-8 text-center bg-white font-sans">
                No recent system logs.
              </p>
            ) : (
              recentActivity.map((activity, index) => {
                const Icon = activity.icon;
                return (
                  <div key={index} className="flex items-start gap-4 px-5 py-4 hover:bg-neutral-50/50 transition-colors bg-white">
                    <div className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center mt-0.5 shrink-0">
                      <Icon className="w-4 h-4 text-[#0E292F]" strokeWidth={2} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-sm font-semibold text-[#0E292F] truncate font-sans">
                          {activity.title}
                        </p>
                        <span className="text-[11px] text-neutral-400 tracking-wide shrink-0 font-sans">
                          {activity.time}
                        </span>
                      </div>
                      <p className="text-xs text-neutral-500 mt-0.5 truncate font-sans">
                        {activity.description}
                      </p>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          <div className="px-5 py-3 border-t border-neutral-100 bg-neutral-50/30">
            <p className="text-[11px] text-neutral-400 tracking-wide font-sans">
              Data refreshes automatically every 30s
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}