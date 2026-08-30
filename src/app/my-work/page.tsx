"use client";

import Sidebar from "../../components/layout/Sidebar";
import Navbar from "../../components/layout/Navbar";
import Summary from "../../components/my-work/Summary";
import StatCards from "../../components/my-work/StatsCard";
import ActionQueue from "../../components/my-work/ActionQueue";
import MonthlyProgress from "../../components/my-work/MonthlyProgress";

export default function MyWork() {
  return (
    <div className="min-h-screen bg-[#f7f8f6]">
      <div className="ml-64">
        <Navbar onAddLead={() => {}} />
      </div>
      <Sidebar />

      <main className="ml-[250px]">
        <div className="space-y-4 p-6">
          <Summary />

          <StatCards />

          <div className="grid grid-cols-[2fr_1fr] gap-4">
            <ActionQueue />
            <MonthlyProgress />
          </div>
        </div>
      </main>
    </div>
  );
}
