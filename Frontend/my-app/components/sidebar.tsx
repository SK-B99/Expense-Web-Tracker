"use client";

import {
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  ArrowLeftRight,
  BarChart3,
  LogOut,
  User,
  X,
} from "lucide-react";

const navItems = [
  {
    id: "overview",
    name: "Overview",
    icon: LayoutDashboard,
  },
  {
    id: "transactions",
    name: "Transactions",
    icon: ArrowLeftRight,
  },
  {
    id: "reports",
    name: "Reports",
    icon: BarChart3,
  },
];

type SidebarProps = {
  collapsed: boolean;
  mobileOpen: boolean;
  onToggle: () => void;
  onMobileClose: () => void;
  activeView: string;
  onViewChange: (id: string) => void;
};

export default function Sidebar({
  collapsed,
  mobileOpen,
  onToggle,
  onMobileClose,
  activeView,
  onViewChange,
}: SidebarProps) {
  return (
    <>
      
      {mobileOpen && (
        <button
          type="button"
          aria-label="Close navigation"
          onClick={onMobileClose}
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-[2px] lg:hidden"
        />
      )}

      <aside
        className={[
          "fixed inset-y-0 left-0 z-50 flex min-h-screen flex-col",
          "border-r border-gray-200 bg-gray-50",
          "transition-all duration-300 ease-in-out",

          
          "w-72",
          mobileOpen ? "translate-x-0" : "-translate-x-full",

         
          "lg:translate-x-0",
          collapsed ? "lg:w-20" : "lg:w-72",
        ].join(" ")}
      >
     
        <div className="border-b border-gray-200 p-6">
          <div className="flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={() => {
                onViewChange("overview");
                onMobileClose();
              }}
              className={[
                "flex min-w-0 items-center gap-3 rounded-lg",
                "focus-visible:outline-none",
                "focus-visible:ring-2",
                "focus-visible:ring-blue-500",
                collapsed ? "lg:mx-auto" : "",
              ].join(" ")}
            >
            
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-600 font-bold text-white shadow-sm">
                S
              </div>

           
              <div
                className={[
                  "overflow-hidden transition-all duration-200",
                  collapsed
                    ? "lg:w-0 lg:opacity-0"
                    : "w-auto opacity-100",
                ].join(" ")}
              >
                <h1 className="whitespace-nowrap font-bold leading-tight text-gray-900">
                  Spendify
                </h1>

                <p className="mt-0.5 whitespace-nowrap text-xs text-gray-500">
                  Personal finance
                </p>
              </div>
            </button>

            
            <button
              type="button"
              onClick={onMobileClose}
              aria-label="Close sidebar"
              className="rounded-lg p-2 text-gray-500 hover:bg-white hover:text-gray-900 lg:hidden"
            >
              <X size={18} />
            </button>

            
            <button
              type="button"
              onClick={onToggle}
              aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
              title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
              className="hidden rounded-lg p-2 text-gray-500 hover:bg-white hover:text-gray-900 lg:block"
            >
              {collapsed ? (
                <ChevronRight size={18} />
              ) : (
                <ChevronLeft size={18} />
              )}
            </button>
          </div>
        </div>

       
        <nav className="flex-1 overflow-y-auto p-4">
          <p
            className={[
              "mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-gray-400",
              collapsed
                ? "lg:pointer-events-none lg:opacity-0"
                : "opacity-100",
            ].join(" ")}
          >
            Main
          </p>

          <div className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    onViewChange(item.id);
                    onMobileClose();
                  }}
                  title={collapsed ? item.name : undefined}
                  aria-current={isActive ? "page" : undefined}
                  className={[
                    "group flex w-full items-center gap-3 rounded-lg px-3 py-2.5",
                    "text-sm font-medium transition-colors",
                    "focus-visible:outline-none",
                    "focus-visible:ring-2",
                    "focus-visible:ring-blue-500",

                    collapsed ? "lg:justify-center" : "",

                    isActive
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-600 hover:bg-white hover:text-gray-900",
                  ].join(" ")}
                >
                  <Icon
                    size={19}
                    className={[
                      "shrink-0",
                      isActive
                        ? "text-blue-600"
                        : "text-gray-400 group-hover:text-gray-600",
                    ].join(" ")}
                  />

                  <span
                    className={[
                      "overflow-hidden whitespace-nowrap transition-all duration-200",
                      collapsed
                        ? "lg:w-0 lg:opacity-0"
                        : "w-auto opacity-100",
                    ].join(" ")}
                  >
                    {item.name}
                  </span>
                </button>
              );
            })}
          </div>
        </nav>

       
        <div className="border-t border-gray-200 p-4">
          
          <div
            className={[
              "rounded-lg bg-white p-3",
              collapsed ? "lg:bg-transparent lg:p-0" : "",
            ].join(" ")}
          >
            <div
              className={[
                "flex items-center gap-3",
                collapsed ? "lg:justify-center" : "",
              ].join(" ")}
            >
              <button
                type="button"
                aria-label="Admin profile"
                title="Admin Name"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100"
              >
                <User size={18} />
              </button>

              <div
                className={[
                  "min-w-0 overflow-hidden transition-all duration-200",
                  collapsed
                    ? "lg:w-0 lg:opacity-0"
                    : "w-auto opacity-100",
                ].join(" ")}
              >
                <p className="truncate text-sm font-medium text-gray-900">
                  Admin Name
                </p>

                <p className="text-xs text-gray-500">
                  Administrator
                </p>
              </div>
            </div>
          </div>

          
          <button
            type="button"
            className={[
              "mt-2 flex w-full items-center gap-3 rounded-lg",
              "px-3 py-2.5 text-sm text-red-600",
              "transition-colors hover:bg-red-50",
              collapsed ? "lg:justify-center" : "",
            ].join(" ")}
          >
            <LogOut size={19} className="shrink-0" />

            <span
              className={[
                "overflow-hidden whitespace-nowrap transition-all duration-200",
                collapsed
                  ? "lg:w-0 lg:opacity-0"
                  : "w-auto opacity-100",
              ].join(" ")}
            >
              Sign out
            </span>
          </button>
        </div>
      </aside>
    </>
  );
}