"use client";

import { usePathname } from "next/navigation";

type NavbarProps = {
  onAddLead?: () => void;
  actionLabel?: string;
};

export default function Navbar({
  onAddLead,
  actionLabel = "Add lead",
}: NavbarProps) {
  const pathname = usePathname();

  let pageName = "Dashboard";

  if (pathname === "/leads") {
    pageName = "Leads";
  } else if (pathname === "/pipeline") {
    pageName = "Pipeline";
  } else if (pathname === "/calendar") {
    pageName = "Calendar";
  } else if (pathname === "/my-work") {
    pageName = "My Work";
  } else if (pathname === "/staff") {
    pageName = "Staff";
  } else if (pathname === "/leaderboard") {
    pageName = "Leaderboard";
  } else if (pathname === "/democontrols") {
    pageName = "Demo Controls";
  } else if (pathname === "/dashboard") {
    pageName = "Dashboard";
  }

  return (
    <header className="w-full border-b border-[#e3e5df] bg-[#f8f9f6] px-4 py-5 sm:px-8">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        {/* LEFT SIDE */}
        <div>
          <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#527b69]">
            Interactive Sales Workspace
          </p>

          <h1 className="text-3xl font-bold text-[#202520]">{pageName}</h1>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Demo Mode */}
          <span className="rounded-full border border-[#d8c16b] bg-[#fff8dc] px-4 py-2 text-[11px] font-bold tracking-wide text-[#796522]">
            DEMO MODE
          </span>

          {/* Notification */}
          <button
            type="button"
            aria-label="Notifications"
            className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-[#e0e2dd] bg-white text-lg text-[#202520] shadow-sm"
          >
            🔔
            <span className="absolute -right-1 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#bd6d63] px-1 text-[10px] font-bold text-white">
              40
            </span>
          </button>

          {/* Add Lead */}
          {onAddLead && (
            <button
              type="button"
              onClick={onAddLead}
              className="rounded-xl bg-[#527b69] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#456b5b]"
            >
              <span className="mr-2 text-lg">+</span>
              {actionLabel}
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
