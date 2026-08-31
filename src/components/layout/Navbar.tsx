"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";

import { createLead, type LeadPayload } from "@/src/lib/leads-store";
import AddLeadModal from "@/src/components/Leads/AddLeadModal";

type NavbarProps = {
  onSaveLead?: (data: LeadPayload) => Promise<void>;
  // Optional: let a page override what happens when the button is
  // clicked (Calendar uses this to open its own "Add activity" modal
  // instead of the default Add Lead modal below).
  onAddLead?: () => void;
  actionLabel?: string;
};

export default function Navbar({
  onSaveLead,
  onAddLead,
  actionLabel = "Add lead",
}: NavbarProps) {
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
  }

  if (pathname === "/leaderboard") {
    pageName = "Team leaderboard";
  }

  // Saves the new lead when the Add Lead modal is submitted.
  // If the page gave us its own save function (onSaveLead), use that
  // so the page's lead list updates right away. Otherwise, just save
  // straight to local storage so the button still works on any page.
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

          {/* Left side */}
          <div>
            <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#527b69]">
              Interactive Sales Workspace
            </p>

            <h1 className="text-3xl font-bold text-gray-800">
              {pageName}
            </h1>
          </div>

          {/* Right side */}
          <div className="flex flex-wrap items-center gap-3">

            {/* Demo mode */}
            <span className="rounded-full border border-[#d8c16b] bg-[#fff8dc] px-4 py-2 text-[11px] font-bold tracking-wide text-[#796522]">
              DEMO MODE
            </span>

            {/* Notification */}
            <button
              type="button"
              className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-[#e0e2dd] bg-white text-lg text-[#202520] shadow-sm"
            >
              🔔

              <span className="absolute -right-1 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#bd6d63] px-1 text-[10px] font-bold text-white">
                40
              </span>
            </button>

            {/* Add Lead */}
            <button
              type="button"
              onClick={() => {
                // If the page gave us a custom action (like Calendar's
                // "Add activity" button), run that instead of opening
                // the default Add Lead modal.
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

      {/* Add Lead Modal */}
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