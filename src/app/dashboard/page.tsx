"use client";

import FollowsUp from "@/src/components/dashboard/FollowsUp";
import LeadSources from "@/src/components/dashboard/LeadSources";
import Pipeline from "@/src/components/dashboard/Pipeline";
import TeamWorkload from "@/src/components/dashboard/TeamWorkload";
import Navbar from "@/src/components/layout/Navbar";
import Sidebar from "@/src/components/layout/Sidebar";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#f5f6f3]">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="ml-64">
        {/* Navbar */}
        <Navbar />

        <main className="p-6">
          {/* Pipeline + Team Workload */}
          <div className="flex flex-col gap-4 lg:flex-row">
            <Pipeline />

            <TeamWorkload />
          </div>

          {/* Follow-ups + Lead Sources */}
          <div className="mt-4 flex flex-col gap-4 lg:flex-row">
            <FollowsUp />

            <LeadSources />
          </div>
        </main>
      </div>
    </div>
  );
}
