"use client";

import LeaderboardTable from "@/src/components/Leaderboard/LeaderboardTable";

import Navbar from "@/src/components/layout/Navbar";
import Sidebar from "@/src/components/layout/Sidebar";

export default function Leaderboard() {
  return (
    <div className="min-h-screen bg-[#ebe7e6]">
      
      <Sidebar />

      <div className="lg:ml-64">
        
        {/* Use the same top navbar as the rest of the app, so the
            title, DEMO MODE badge, and Add Lead button all work
            the same way here as everywhere else. */}
        <Navbar />

        <main>
          <div className="p-6">
            <LeaderboardTable />
          </div>
        </main>

      </div>
    </div>
  );
}