// import { useState, useEffect } from "react";
// import { Outlet, NavLink, useNavigate } from "react-router-dom";
// import { supabase } from "@/lib/supabase/client";
// import {
//   LayoutDashboard,
//   Users,
//   Home,
//   LogOut,
//   Menu,
//   X,
//   ChevronRight,
// } from "lucide-react";

// const navItems = [
//   { to: "/admin", icon: LayoutDashboard, label: "Dashboard", end: true },
//   { to: "/admin/users", icon: Users, label: "Users" },
//   { to: "/admin/properties", icon: Home, label: "Properties" },
// ];

// export default function AdminLayout() {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [checkingAuth, setCheckingAuth] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const checkAdmin = async () => {
//       const { data: { user } } = await supabase.auth.getUser();
//       if (!user) {
//         navigate("/login", { replace: true });
//         return;
//       }

//       const { data } = await supabase
//         .from('admin_users')
//         .select('user_id')
//         .eq('user_id', user.id)
//         .single();

//       if (!data) {
//         navigate("/login", { replace: true });
//         return;
//       }

//       setCheckingAuth(false);
//     };

//     checkAdmin();

//     const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
//       if (event === 'SIGNED_OUT') {
//         navigate("/login", { replace: true });
//       }
//     });

//     return () => subscription.unsubscribe();
//   }, [navigate]);

//   const handleLogout = async () => {
//     await supabase.auth.signOut();
//     navigate("/login", { replace: true });
//   };

//   if (checkingAuth) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-slate-50">
//         <div className="text-center">
//           <div className="w-16 h-16 rounded-full border-4 border-slate-200 border-t-slate-900 animate-spin mx-auto" />
//           <p className="mt-4 text-slate-600 font-medium">Checking authentication...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-slate-50">
//       {/* Mobile sidebar backdrop */}
//       {sidebarOpen && (
//         <div
//           className="fixed inset-0 bg-black/50 z-40 lg:hidden"
//           onClick={() => setSidebarOpen(false)}
//         />
//       )}

//       {/* Sidebar */}
//       <aside
//         className={`
//           fixed top-0 left-0 z-50 h-full w-64 bg-white border-r border-slate-200 
//           transform transition-transform duration-200 ease-in-out
//           lg:translate-x-0
//           ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
//         `}
//       >
//         <div className="flex items-center justify-between h-16 px-6 border-b border-slate-200">
//           <div className="flex items-center gap-2">
//             <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
//               <span className="text-white font-bold text-sm">V</span>
//             </div>
//             <span className="font-semibold text-slate-900">Vivar Admin</span>
//           </div>
//           <button
//             onClick={() => setSidebarOpen(false)}
//             className="lg:hidden p-1 rounded-md hover:bg-slate-100"
//           >
//             <X className="w-5 h-5 text-slate-500" />
//           </button>
//         </div>

//         <nav className="p-4 space-y-1">
//           {navItems.map((item) => (
//             <NavLink
//               key={item.to}
//               to={item.to}
//               end={item.end}
//               onClick={() => setSidebarOpen(false)}
//               className={({ isActive }) =>
//                 `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors
//                 ${
//                   isActive
//                     ? "bg-slate-900 text-white"
//                     : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
//                 }`
//               }
//             >
//               <item.icon className="w-5 h-5" />
//               {item.label}
//               <ChevronRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100" />
//             </NavLink>
//           ))}
//         </nav>

//         <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-200">
//           <button
//             onClick={handleLogout}
//             className="flex items-center gap-3 px-3 py-2.5 w-full rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
//           >
//             <LogOut className="w-5 h-5" />
//             Logout
//           </button>
//         </div>
//       </aside>

//       {/* Main content */}
//       <div className="lg:pl-64">
//         {/* Top bar */}
//         <header className="sticky top-0 z-30 bg-white border-b border-slate-200 h-16 flex items-center px-4 lg:px-8">
//           <button
//             onClick={() => setSidebarOpen(true)}
//             className="lg:hidden p-2 rounded-md hover:bg-slate-100 mr-4"
//           >
//             <Menu className="w-5 h-5 text-slate-600" />
//           </button>
//           <div className="flex-1">
//             <h1 className="text-lg font-semibold text-slate-900">Admin Dashboard</h1>
//           </div>
//           <div className="flex items-center gap-4">
//             <div className="hidden sm:flex items-center gap-2 text-sm text-slate-600">
//               <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center">
//                 <span className="text-slate-600 font-medium text-xs">AD</span>
//               </div>
//               <span>Admin</span>
//             </div>
//           </div>
//         </header>

//         {/* Page content */}
//         <main className="p-4 lg:p-8">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// }



import { useState, useEffect } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase/client";
import {
  PieChart,
  UsersRound,
  Building2,
  LogOut,
  AlignJustify,
  X,
} from "lucide-react";
import Logo from "@/assets/logo_black.png";

const navItems = [
  { to: "/admin", icon: PieChart, label: "Dashboard", end: true },
  { to: "/admin/users", icon: UsersRound, label: "Users" },
  { to: "/admin/properties", icon: Building2, label: "Properties" },
];

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAdmin = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { navigate("/login", { replace: true }); return; }

      const { data } = await supabase
        .from("admin_users")
        .select("user_id")
        .eq("user_id", user.id)
        .single();

      if (!data) { navigate("/login", { replace: true }); return; }
      setCheckingAuth(false);
    };

    checkAdmin();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_OUT") navigate("/login", { replace: true });
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login", { replace: true });
  };

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-neutral-50 flex" style={{ fontFamily: "'Poppins', sans-serif" }}>
        
        {/* Skeleton Sidebar */}
        <aside className="hidden lg:block w-[240px] bg-[#0E292F] h-full fixed left-0 top-0 p-5">
          <div className="h-8 w-32 bg-white/10 rounded-md animate-pulse mb-10" />
          <div className="space-y-4">
            <div className="h-10 w-full bg-white/5 rounded-r-full" />
            <div className="h-10 w-full bg-white/5 rounded-r-full" />
            <div className="h-10 w-full bg-white/5 rounded-r-full" />
          </div>
        </aside>

        {/* Main Content Skeleton Area */}
        <div className="flex-1 lg:pl-[240px] flex flex-col">
          {/* Skeleton Header */}
          <header className="h-16 bg-white border-b border-neutral-200/60 flex items-center justify-between px-8">
            <div className="h-5 w-48 bg-neutral-200 rounded animate-pulse" />
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-neutral-200 animate-pulse" />
              <div className="space-y-1 hidden sm:block">
                <div className="h-3 w-12 bg-neutral-200 rounded animate-pulse" />
                <div className="h-2 w-16 bg-neutral-100 rounded animate-pulse" />
              </div>
            </div>
          </header>

          {/* Core Modern Loader Overlay */}
          <main className="flex-1 flex flex-col items-center justify-center p-8 relative">
            <div className="flex flex-col items-center gap-5">
              {/* Shimmer Effect Container for Logo */}
              <div className="relative overflow-hidden rounded-lg px-4 py-2">
                <img 
                  src={Logo} 
                  alt="Loading..." 
                  className="h-12 w-auto object-contain opacity-40 mix-blend-multiply" 
                />
                {/* Sweeping Linear Shimmer Accent */}
                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent" />
              </div>
              
              {/* Clean Minimalist Progress Line */}
              <div className="w-32 h-[2px] bg-neutral-200 rounded-full overflow-hidden">
                <div className="h-full bg-[#3D7188] w-1/2 rounded-full animate-[loading_1.2s_ease-in-out_infinite]" />
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50/50" style={{ fontFamily: "'Poppins', sans-serif" }}>

      {/* Mobile backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/10 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ── SIDEBAR (#0E292F) ── */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-full w-[240px] bg-[#0E292F]
          transform transition-transform duration-200 ease-in-out
          lg:translate-x-0
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Logo */}
        <div className="flex items-center justify-between h-16 px-5 border-b border-white/10 mb-5">
          <img
            src={Logo}
            alt="Vivar"
            className="h-20 w-auto object-contain brightness-0 invert"
          />
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1.5 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-4 h-4 text-white/50" />
          </button>
        </div>

        {/* Nav - Right-sided capsule structure */}
        <nav className="pr-4 flex flex-col gap-1.5">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 pl-6 pr-4 py-3 text-sm font-medium transition-all duration-150 rounded-l-none rounded-r-full
                ${
                  isActive
                    ? "bg-[#3D7188] text-white shadow-sm font-semibold"
                    : "text-white/60 hover:bg-[#3D7188] hover:text-white"
                }`
              }
            >
              <item.icon className="w-4 h-4 shrink-0" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <div className="absolute bottom-0 left-0 right-0 pr-4 py-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 pl-6 pr-4 py-3 w-full rounded-l-none rounded-r-full text-sm font-medium text-white/40 hover:bg-[#3D7188] hover:text-white transition-all duration-150"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            Logout
          </button>
        </div>
      </aside>

      {/* ── MAIN CONTENT ── */}
      <div className="lg:pl-[240px] flex flex-col min-h-screen">

        {/* Header */}
        <header className="sticky top-0 z-30 bg-white border-b border-neutral-200/60 h-16 flex items-center px-5 lg:px-8 gap-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-xl hover:bg-neutral-50 transition-colors"
          >
            <AlignJustify className="w-5 h-5 text-neutral-500" />
          </button>

          <div className="flex-1">
            <h1 className="text-xl font-normal text-neutral-900 tracking-tight">
              Vivar Realty Dashboard
            </h1>
          </div>

          {/* Avatar */}
          <div className="flex items-center gap-2.5 pl-3 border-l border-neutral-200/80">
            <div className="w-8 h-8 rounded-full bg-[#0E292F] flex items-center justify-center shrink-0">
              <span className="text-white text-xs font-semibold">AD</span>
            </div>
            <div className="hidden sm:block">
              <p className="text-xs font-semibold text-neutral-900 leading-tight">Admin</p>
              <p className="text-[11px] text-neutral-400 leading-tight">Super Admin</p>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-5 lg:p-8">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}


// import { useState, useEffect } from "react";
// import { Outlet, NavLink, useNavigate } from "react-router-dom";
// import { supabase } from "@/lib/supabase/client";
// import {
//   PieChart,
//   UsersRound,
//   Building2,
//   LogOut,
//   AlignJustify,
//   X,
// } from "lucide-react";
// import Logo from "@/assets/logo_black.png";

// const navItems = [
//   { to: "/admin", icon: PieChart, label: "Dashboard", end: true },
//   { to: "/admin/users", icon: UsersRound, label: "Users" },
//   { to: "/admin/properties", icon: Building2, label: "Properties" },
// ];

// export default function AdminLayout() {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [checkingAuth, setCheckingAuth] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const checkAdmin = async () => {
//       const { data: { user } } = await supabase.auth.getUser();
//       if (!user) { navigate("/login", { replace: true }); return; }

//       const { data } = await supabase
//         .from("admin_users")
//         .select("user_id")
//         .eq("user_id", user.id)
//         .single();

//       if (!data) { navigate("/login", { replace: true }); return; }
//       setCheckingAuth(false);
//     };

//     checkAdmin();

//     const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
//       if (event === "SIGNED_OUT") navigate("/login", { replace: true });
//     });

//     return () => subscription.unsubscribe();
//   }, [navigate]);

//   const handleLogout = async () => {
//     await supabase.auth.signOut();
//     navigate("/login", { replace: true });
//   };

//   if (checkingAuth) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-[#FAFAF7]">
//         <div className="text-center">
//           <div className="w-10 h-10 mx-auto mb-5 rounded-full border-2 border-[#0E292F]/15 border-t-[#0E292F] animate-spin" />
//           <p className="font-serif-display text-xl text-[#0E292F] tracking-tight">
//             Setting up your workspace
//           </p>
//           <p className="text-xs text-[#A8A69E] mt-1.5 tracking-wide uppercase">
//             Secured admin node
//           </p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#FAFAF7] flex">
//       {/* Mobile backdrop */}
//       {sidebarOpen && (
//         <div
//           className="fixed inset-0 bg-[#0E292F]/40 z-40 lg:hidden backdrop-blur-sm"
//           onClick={() => setSidebarOpen(false)}
//         />
//       )}

//       {/* ── SIDEBAR ── */}
//       <aside
//         className={`fixed lg:sticky top-0 left-0 z-50 h-screen w-64 bg-[#0E292F] text-white flex flex-col transition-transform duration-300 ${
//           sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
//         }`}
//       >
//         {/* Logo / brand */}
//         <div className="flex items-center justify-between px-6 pt-7 pb-8">
//           <div className="flex items-center gap-2.5">
//             <div className="w-8 h-8 rounded-md bg-white/10 flex items-center justify-center">
//               <img src={Logo} alt="Vivar" className="w-5 h-5 invert" />
//             </div>
//             <div className="leading-tight">
//               <p className="font-serif-display text-lg text-white tracking-tight">Vivar</p>
//               <p className="text-[10px] uppercase tracking-[0.18em] text-white/40">Admin Node</p>
//             </div>
//           </div>
//           <button
//             onClick={() => setSidebarOpen(false)}
//             className="lg:hidden p-1.5 rounded-md hover:bg-white/10 transition-colors"
//           >
//             <X className="w-4 h-4" />
//           </button>
//         </div>

//         <p className="px-6 text-[10px] uppercase tracking-[0.18em] text-white/30 mb-3">
//           Workspace
//         </p>

//         {/* Nav */}
//         <nav className="flex-1 pr-3 space-y-0.5">
//           {navItems.map((item) => {
//             const Icon = item.icon;
//             return (
//               <NavLink
//                 key={item.to}
//                 to={item.to}
//                 end={item.end}
//                 onClick={() => setSidebarOpen(false)}
//                 className={({ isActive }) =>
//                   `flex items-center gap-3 pl-6 pr-4 py-2.5 text-sm transition-all duration-150 rounded-l-none rounded-r-full ${
//                     isActive
//                       ? "bg-[#3D7188]/90 text-white font-medium"
//                       : "text-white/55 hover:bg-white/[0.06] hover:text-white"
//                   }`
//                 }
//               >
//                 <Icon className="w-[18px] h-[18px]" strokeWidth={1.75} />
//                 <span>{item.label}</span>
//               </NavLink>
//             );
//           })}
//         </nav>

//         {/* Footer / Logout */}
//         <div className="px-4 py-5 border-t border-white/[0.08]">
//           <button
//             onClick={handleLogout}
//             className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-white/55 hover:text-white hover:bg-white/[0.06] rounded-md transition-colors"
//           >
//             <LogOut className="w-[18px] h-[18px]" strokeWidth={1.75} />
//             Sign out
//           </button>
//           <p className="text-[10px] text-white/30 mt-3 px-3 tracking-wide">
//             © Vivar Realty Limited
//           </p>
//         </div>
//       </aside>

//       {/* ── MAIN ── */}
//       <div className="flex-1 flex flex-col min-w-0">
//         {/* Header */}
//         <header className="sticky top-0 z-30 bg-[#FAFAF7]/85 backdrop-blur-md border-b border-[#ECEAE4]">
//           <div className="flex items-center gap-4 px-6 lg:px-10 h-16">
//             <button
//               onClick={() => setSidebarOpen(true)}
//               className="lg:hidden p-2 -ml-2 rounded-md hover:bg-black/[0.04] transition-colors"
//             >
//               <AlignJustify className="w-5 h-5 text-[#0E292F]" />
//             </button>

//             <div className="flex-1 min-w-0">
//               <p className="text-[10px] uppercase tracking-[0.18em] text-[#A8A69E]">
//                 Vivar Realty
//               </p>
//               <h1 className="font-serif-display text-[19px] leading-none text-[#0E292F] tracking-tight mt-0.5">
//                 Dashboard
//               </h1>
//             </div>

//             {/* Avatar */}
//             <div className="flex items-center gap-3 pl-4 border-l border-[#ECEAE4]">
//               <div className="text-right leading-tight hidden sm:block">
//                 <p className="text-sm font-medium text-[#0E292F]">Admin</p>
//                 <p className="text-[11px] text-[#A8A69E] tracking-wide">Super admin</p>
//               </div>
//               <div className="w-9 h-9 rounded-full bg-[#0E292F] text-white flex items-center justify-center text-xs font-medium tracking-wide">
//                 AD
//               </div>
//             </div>
//           </div>
//         </header>

//         {/* Page Content */}
//         <main className="flex-1">
//           <div className="px-6 lg:px-10 py-8 max-w-[1400px]">
//             <Outlet />
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }
