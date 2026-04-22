"use client";

import { usePathname } from "next/navigation";

function getPageTitle(pathname: string) {
  switch (pathname) {
    case "/":
      return "Dashboard";
    case "/analytics":
      return "Analytics";
    case "/billing":
      return "Billing";
    case "/profile":
      return "Profile";
    case "/settings":
      return "Settings";
    default:
      return "Dashboard";
  }
}

function getPageDescription(pathname: string) {
  switch (pathname) {
    case "/":
      return "Overview of your account and main metrics.";
    case "/analytics":
      return "Track usage, performance and recent activity.";
    case "/billing":
      return "Manage subscription and payment details.";
    case "/profile":
      return "Personal account information.";
    case "/settings":
      return "Update your profile and preferences.";
    default:
      return "Welcome back.";
  }
}

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-20 border-b border-white/5 bg-[#07111f]/80 backdrop-blur-xl">
      <div className="flex items-center justify-between px-6 py-5 lg:px-8">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-[#eaf2ff]">
            {getPageTitle(pathname)}
          </h2>
          <p className="mt-1 text-sm text-[#8ea3bf]">
            {getPageDescription(pathname)}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden rounded-2xl border border-white/5 bg-white/3 px-4 py-2 text-sm text-[#8ea3bf] md:block">
            ar******@gmail.com
          </div>

          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-linear-to-br from-[#2f6feb] to-[#22d3ee] text-sm font-bold text-white shadow-[0_12px_28px_rgba(47,111,235,0.35)]">
            A
          </div>
        </div>
      </div>
    </header>
  );
}
