"use client";

import Sidebar from "../../components/layout/Sidebar";
import Navbar from "../../components/layout/Navbar";
import Summary from "../../components/my-work/Summary";
import StatCards from "../../components/my-work/StatsCard";
import ActionQueue from "../../components/my-work/ActionQueue";
import MonthlyProgress from "../../components/my-work/MonthlyProgress";
import api from "@/src/api/api";
import { useEffect, useState } from "react";

type WorkData = {
  performance: {
    assigned: number;
    conversionRate: number;
    converted: number;
    followUps: number;
    leadsAdded: number;
    meetings: number;
    month: number;
    overdue: number;
    score: number;
    staff: {
      id: number;
      name: string;
      email: string;
      role: string;
      active: boolean;
      designation: string;
    };
    target: number | null;
    warm: number;
    year: number;
  };
  dueLeads: any[];
};

export default function MyWork() {
  const [data, setData] = useState<WorkData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetch_works = async () => {
    try {
      const response = await api.get("my-work");
      console.log("Work data", response.data);

      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch_works();
  }, []);

  if (loading) {
    return <p className="text-black">Loading...</p>;
  }

  if (!data) {
    return <p className="text-black">No work data available.</p>;
  }
  console.log("DATA BEFORE RENDER:", data);
  return (
    <div className="min-h-screen bg-[#f7f8f6]">
      <div className="ml-64">
        <Navbar onAddLead={() => {}} />
      </div>
      <Sidebar />

      <main className="ml-[250px]">
        <div className="space-y-4 p-6">
          <Summary performance={data.performance} />

          <StatCards performance={data.performance} />

          <div className="grid grid-cols-[2fr_1fr] gap-4">
            <ActionQueue dueLeads={data.dueLeads} />
            <MonthlyProgress performance={data.performance} />
          </div>
        </div>
      </main>
    </div>
  );
}
