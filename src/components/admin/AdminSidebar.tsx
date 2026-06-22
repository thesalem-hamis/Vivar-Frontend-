import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Building2,
  MessageSquare,
  FolderOpen,
  BookOpen,
  Users,
  BarChart2,
  Settings,
  HelpCircle,
  LogOut,
} from "lucide-react";
import LOGO_MAIN from "../../assets/logo_main.png";
import { useAuthStore } from "@/store/useAuthStore";

const navSections = [
  {
    label: "MAIN",
    items: [
      { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
      {
        icon: Building2,
        label: "Properties",
        href: "/admin/properties",
        badge: "12",
      },
      {
        icon: MessageSquare,
        label: "Enquiries",
        href: "/admin/enquiries",
        badge: "5",
      },
      { icon: FolderOpen, label: "Projects", href: "/admin/projects" },
      { icon: BookOpen, label: "Insights", href: "/admin/insights" },
    ],
  },
  {
    label: "MANAGEMENT",
    items: [
      { icon: Users, label: "Team", href: "/admin/team" },
      { icon: BarChart2, label: "Analytics", href: "/admin/analytics" },
      { icon: Settings, label: "Settings", href: "/admin/settings" },
    ],
  },
  {
    label: "ACCOUNT",
    items: [
      { icon: HelpCircle, label: "Help", href: "/admin/help" },
      { icon: LogOut, label: "Logout", href: "/admin#",  },
    ],
  },
];

export default function AdminSidebar() {
  const { pathname } = useLocation();
  const { logout } = useAuthStore();

  const isActive = (href: string) =>
    href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);

  return (
    <aside className="w-[220px] h-screen bg-white border-r border-gray-100 flex flex-col shrink-0">
      {/* Logo */}
      <div className="px-4 py-5 border-b border-gray-100 flex items-center gap-3">
        <div className="h-6 w-9 overflow-hidden flex items-center">

          <img
            src={LOGO_MAIN}
            alt=""
            className="h-15 w-auto object-cover"
          />
        </div>
        <div className="min-w-0">
          <p className="font-bold text-[#0E292F] text-[13px] leading-none truncate">
            Vivar Realty
          </p>
          <p className="text-[10px] text-gray-400 mt-0.5">Admin Portal</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-5">
        {navSections.map((section) => (
          <div key={section.label}>
            <p className="text-[10px] font-bold tracking-[0.15em] text-gray-400 uppercase px-2 mb-2">
              {section.label}
            </p>
            <ul className="space-y-0.5">
              {section.items.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);
                return (
                  <li key={item.label} onClick={() => {
                    if (item.label === "Logout") {
                      logout();
                    }
                  }}>
                    <Link
                      to={item.href}
                      className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-200 ${active
                          ? "bg-[#0E292F] text-white shadow-sm"
                          : "text-gray-600 hover:bg-gray-50 hover:text-[#0E292F]"
                        }`}
                    >
                      <Icon
                        size={15}
                        strokeWidth={active ? 2.5 : 1.75}
                        className="shrink-0"
                      />
                      <span className="flex-1 truncate">{item.label}</span>
                      {item.badge && (
                        <span
                          className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${active
                              ? "bg-white/20 text-white"
                              : "bg-[#0E292F]/10 text-[#0E292F]"
                            }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Bottom promo card */}
      <div className="m-3 p-4 bg-[#0E292F] rounded-2xl">
        <p className="text-white text-[13px] font-semibold leading-snug">
          List a New
          <br />
          Property
        </p>
        <p className="text-white/50 text-[11px] mt-1 mb-3 leading-relaxed">
          Add verified listings instantly
        </p>
        <Link
          to="/admin/properties/add"
          className="block w-full py-2 bg-[#D4E9B9] text-[#0E292F] text-[11px] font-bold text-center rounded-lg hover:bg-white transition-colors"
        >
          + Add Listing
        </Link>
      </div>
    </aside>
  );
}
