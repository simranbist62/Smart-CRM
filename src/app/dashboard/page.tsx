"use client";

import FollowsUp from "@/src/components/dashboard/FollowsUp";
import LeadSources from "@/src/components/dashboard/LeadSources";
import Pipeline from "@/src/components/dashboard/Pipeline";
import StatCard from "@/src/components/dashboard/StatCard";
import TeamWorkload from "@/src/components/dashboard/TeamWorkload";
import Navbar from "@/src/components/layout/Navbar";
import Sidebar from "@/src/components/layout/Sidebar";

export default function Dashboard() {
  const handleAddLead = () => {
    console.log("Add lead clicked");
    // You can later open a modal here if needed
  };

  return (
    <div className="min-h-screen bg-[#ebe7e6]">
      <Sidebar />

      <div className="lg:ml-64">
        <Navbar />

        <main className="p-6">
          <div className="flex flex-wrap gap-8">
            <StatCard heading="Total Leads" number={155} />
            <StatCard heading="Converted" number={21} />
            <StatCard heading="Likely/Warm" number={6} />
            <StatCard heading="Overdue" number={1} />
            <StatCard heading="Conversion" number={13.5} />
          </div>

          <div className="mt-6 flex flex-wrap gap-4">
            <Pipeline />
            <TeamWorkload />
          </div>

          <div className="mt-6 flex flex-wrap gap-4">
            <FollowsUp />
            <LeadSources />
          </div>
        </main>
      </div>
    </div>
  );
}