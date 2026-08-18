import FollowsUp from "@/src/components/dashboard/FollowsUp";
import Pipeline from "@/src/components/dashboard/Pipeline";
import StatCard from "@/src/components/dashboard/StatCard";
import TeamWorkload from "@/src/components/dashboard/TeamWorkload";
import Sidebar from "@/src/components/layout/Sidebar";

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-[#ebe7e6]">
      <Sidebar />

      <div className="flex-1">
        <main className="p-6">
          <div className="flex gap-8">
            <StatCard heading="Total Leads" number={155} />
            <StatCard heading="Converted" number={21} />
            <StatCard heading="Likely/Warm" number={6} />
            <StatCard heading="Overdue" number={1} />
            <StatCard heading="Conversion" number={13.5} />
          </div>

          <div className="flex gap-4">
            <Pipeline />
            <TeamWorkload />
          </div>

          <div>
            <FollowsUp />
          </div>
        </main>
      </div>
    </div>
  );
}
