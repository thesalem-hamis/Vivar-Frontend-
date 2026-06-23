import { useAuthStore } from "@/store/useAuthStore";
import { Bell, Mail, Search, ChevronDown } from "lucide-react";

interface AdminHeaderProps {
  title?: string;
  subtitle?: string;
  actions?: React.ReactNode;
}

export default function AdminHeader({
  title,
  subtitle,
  actions,
}: AdminHeaderProps) {
  const { user } = useAuthStore();
  return (
    <header className="bg-white border-b border-gray-100 h-[68px] flex items-center px-8 gap-6 shrink-0">
      {/* Search */}
      <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-4 py-2.5 w-64 border border-gray-100 focus-within:border-[#3D7188] transition-colors">
        <Search size={15} className="text-gray-400 shrink-0" />
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent text-[13px] text-gray-600 outline-none w-full placeholder:text-gray-400"
        />
      </div>

      {/* Page Title (if provided, shows in header) */}
      {title && (
        <div className="hidden lg:block">
          <h1 className="text-[15px] font-bold text-[#0E292F] leading-none">
            {title}
          </h1>
          {subtitle && (
            <p className="text-[11px] text-gray-400 mt-0.5">{subtitle}</p>
          )}
        </div>
      )}

      {/* Right Side */}
      <div className="ml-auto flex items-center gap-2.5">
        {/* Actions slot */}
        {actions && (
          <div className="flex items-center gap-2 mr-2">{actions}</div>
        )}

        {/* Mail */}
        <button className="flex items-center justify-center w-9 h-9 rounded-xl bg-gray-50 hover:bg-gray-100 border border-gray-100 transition-colors">
          <Mail size={15} className="text-gray-500" />
        </button>

        {/* Notification bell */}
        <button className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-gray-50 hover:bg-gray-100 border border-gray-100 transition-colors">
          <Bell size={15} className="text-gray-500" />
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#0E292F] border-2 border-white" />
        </button>

        {/* Divider */}
        <div className="w-px h-8 bg-gray-100 mx-1" />

        {/* User profile */}
        <button className="flex items-center gap-2.5 px-2 py-1">
          <div className="w-8 h-8 rounded-full bg-[#0E292F] flex items-center justify-center shrink-0">
            <span className="text-white text-[12px] font-bold">{user?.name.split(" ")[0][0].toUpperCase()}{user?.name.split(" ")[1][0].toUpperCase()}</span>
          </div>
          <div className="hidden sm:block text-left">
            <p className="text-[13px] font-semibold text-gray-800 leading-none line-clamp-1">
              {user?.name}
            </p>
            <p className="text-[10px] text-gray-400 mt-0.5 line-clamp-1">
              {user?.email}
            </p>
          </div>
        </button>
      </div>
    </header>
  );
}
