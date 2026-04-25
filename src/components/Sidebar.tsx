"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "Dashboard" },
  { href: "/analytics", label: "Analytics" },
  { href: "/billing", label: "Billing" },
  { href: "/profile", label: "Profile" },
  { href: "/settings", label: "Settings" },
  { href: "/projects",label: "Projects" }
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden min-h-screen w-70 shrink-0 border-r lg:flex lg:flex-col">
      <div className="border-b border-white/5 px-6 py-6">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br from-[#2f6feb] to-[#22d3ee] text-lg font-bold text-white shadow-[0_12px_30px_rgba(47,111,235,0.35)]">
            A
          </div>

          <div>
            <p className="text-[11px] uppercase tracking-[0.24em] text-[#8ea3bf]">
              personal space
            </p>
            <h1 className="mt-1 text-xl font-semibold tracking-tight text-[#eaf2ff]">
              My Dashboard
            </h1>
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-between px-4 py-5">
        <nav className="space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`group relative flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-[linear-gradient(90deg,rgba(47,111,235,0.18),rgba(34,211,238,0.10))] text-white ring-1 ring-inset ring-white/10"
                    : "text-[#8ea3bf] hover:bg-white/3 hover:text-white"
                }`}
              >
                <span
                  className={`h-2.5 w-2.5 rounded-full transition-all ${
                    isActive
                      ? "bg-[#22d3ee] shadow-[0_0_14px_rgba(34,211,238,0.75)]"
                      : "bg-[#42536d] group-hover:bg-[#8ea3bf]"
                  }`}
                />
                {item.label}

                {isActive && (
                  <span className="absolute inset-y-2 left-0 w-1 rounded-r-full bg-[#22d3ee]" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="rounded-3xl border border-white/5 bg-white/3 p-4 backdrop-blur-sm">
          <p className="text-sm font-semibold text-white">Pro access</p>
          <p className="mt-1 text-sm leading-6 text-[#8ea3bf]">
            Analytics, billing and personal settings are available here.
          </p>
        </div>
      </div>
    </aside>
  );
}