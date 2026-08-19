"use client";

import Navbar from "@/src/components/layout/Navbar";
import Sidebar from "@/src/components/layout/Sidebar";

export default function Pipelines() {
  return (
    <div className="min-h-screen bg-[#ebe7e6]">
      <div className="ml-64">
        <Navbar onAddLead={() => {}} />
      </div>
      <Sidebar />
    </div>
  );
}
