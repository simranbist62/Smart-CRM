"use client";

import { useState, useEffect } from "react";
import FollowsUp from "@/src/components/dashboard/FollowsUp";
import LeadSources from "@/src/components/dashboard/LeadSources";
import Pipeline from "@/src/components/dashboard/Pipeline";
import TeamWorkload from "@/src/components/dashboard/TeamWorkload";
import Navbar from "@/src/components/layout/Navbar";
import Sidebar from "@/src/components/layout/Sidebar";
import api from "@/src/api/api";
import StatCard from "@/src/components/dashboard/StatCard";

type FollowUp = {
  id: number;
  organizationName: string;
  contactName: string;
  nextActionDate: string;
  assignedTo: {
    name: string;
  };
};

type DashboardData = {
  total: number;
  converted: number;
  warm: number;
  overdue: number;
  conversionRate: number;
  byStatus: [];
  byOwner: [];
  bySource: [];
  dueLeads: FollowUp[];
};

export default function Dashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchDashboard = async () => {
    try {
      const response = await api.get("/dashboard");

      console.log("Dashboard response:", response.data);

      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  return (
    <div className="min-h-screen bg-[#f5f6f3]">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="lg:ml-64">
        {/* Navbar */}
        <Navbar />

        <main className="p-6">
          {/* Statistics */}
          <div className="flex gap-6">
            <StatCard heading="Total leads" number={data?.total ?? 0} />
            <StatCard heading="Converted" number={data?.converted ?? 0} />
            <StatCard heading="Likely/Warm" number={data?.warm ?? 0} />
            <StatCard heading="Overdue" number={data?.overdue ?? 0} />
            <StatCard
              heading="Conversion"
              number={
                data ? `${(data.conversionRate * 100).toFixed(2)}%` : "0%"
              }
            />
          </div>

          {/* Pipeline + Team Workload */}
          <div className="flex flex-col gap-4 lg:flex-row">
            <Pipeline data={data?.byStatus} />

            <TeamWorkload data={data?.byOwner} />
          </div>

          {/* Follow-ups + Lead Sources */}
          <div className="mt-4 flex flex-col gap-4 lg:flex-row">
            <FollowsUp data={data?.dueLeads} />

            <LeadSources data={data?.bySource} />
          </div>
        </main>
      </div>
    </div>
  );
}
