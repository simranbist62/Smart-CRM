"use client";

import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  let pageName = "Dashboard";

  if (pathname === "/leads") {
    pageName = "Leads";
  }

  if (pathname === "/dashboard") {
    pageName = "Dashboard";
  }

  if (pathname === "/pipeline") {
    pageName = "Pipeline";
  }

  return (
    <div className="flex items-center justify-between border-b bg-white px-8 py-6">

      {/* Page name */}
      <div>
        <p className="text-xs font-semibold tracking-widest text-green-700">
          INTERACTIVE SALES WORKSPACE
        </p>

        <h1 className="text-3xl font-bold text-gray-800">
          {pageName}
        </h1>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">

        <span className="rounded-full border border-yellow-400 bg-yellow-50 px-4 py-2 text-xs font-semibold text-yellow-700">
          DEMO MODE
        </span>

        <button className="rounded-lg border bg-white px-4 py-3">
          🔔
        </button>

        <button className="rounded-lg bg-green-700 px-5 py-3 font-semibold text-white">
          + Add lead
        </button>

      </div>

    </div>
  );
}