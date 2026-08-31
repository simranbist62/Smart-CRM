"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";

import { createLead, type LeadPayload } from "@/src/lib/leads-store";
import AddLeadModal from "@/src/components/Leads/AddLeadModal";

type NavbarProps = {
  onSaveLead?: (data: LeadPayload) => Promise<void>;
  onAddLead?: () => void;
  actionLabel?: string;
};

export default function Navbar({ onSaveLead, onAddLead, actionLabel = "Add lead" }: NavbarProps) {
  const pathname = usePathname();

  const [showAddLead, setShowAddLead] = useState(false);

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
  if (pathname === "/calendar") {
    pageName = "Calendar";
  } else if (pathname === "/my-work") {
    pageName = "My Work";
  } else if (pathname === "/staff") {
    pageName = "Staff";
  } else if (pathname === "/leaderboard") {
    pageName = "Team leaderboard";
  } else if (pathname === "/democontrols") {
    pageName = "Demo Controls";
  }

  async function handleSaveLead(data: LeadPayload) {
    if (onSaveLead) {
      await onSaveLead(data);
    } else {
      createLead(data);
    }
    setShowAddLead(false);
  }

  return (
    <>
      <header className="w-full border-b border-[#e3e5df] bg-[#f8f9f6] px-4 py-5 sm:px-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#527b69]">
              Interactive Sales Workspace
            </p>

            <h1 className="text-3xl font-bold text-[#202520]">
              {pageName}
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-[#d8c16b] bg-[#fff8dc] px-4 py-2 text-[11px] font-bold tracking-wide text-[#796522]">
              DEMO MODE
            </span>

            <button
              type="button"
              className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-[#e0e2dd] bg-white text-lg text-[#202520] shadow-sm"
            >
              🔔
              <span className="absolute -right-1 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#bd6d63] px-1 text-[10px] font-bold text-white">
                40
              </span>
            </button>

            <button
              type="button"
              onClick={() => {
                if (onAddLead) {
                  onAddLead();
                } else {
                  setShowAddLead(true);
                }
              }}
              className="rounded-xl bg-[#527b69] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#456b5b]"
            >
              <span className="mr-2 text-lg">+</span>
              {actionLabel}
            </button>
          </div>
        </div>
      </header>

      {showAddLead && (
        <AddLeadModal
          lead={null}
          onClose={() => setShowAddLead(false)}
          onSave={handleSaveLead}
        />
      )}
    </>
  );
}