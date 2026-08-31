"use client";

import Navbar from "@/src/components/layout/Navbar";
import Sidebar from "@/src/components/layout/Sidebar";
import type { LeadPayload } from "@/src/lib/leads-store";

type CRMLayoutProps = {
  children: React.ReactNode;
  onSaveLead: (data: LeadPayload) => Promise<void>;
};

export default function CRMLayout({
  children,
  onSaveLead,
}: CRMLayoutProps) {
  return (
    <div className="min-h-screen bg-[#ebe7e6]">
      <Sidebar />

      <div className="lg:ml-64">
        <Navbar onSaveLead={onSaveLead} />

        <main>{children}</main>
      </div>
    </div>
  );
}