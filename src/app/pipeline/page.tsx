"use client";

import api from "@/src/api/api";
import Navbar from "@/src/components/layout/Navbar";
import Sidebar from "@/src/components/layout/Sidebar";
import PipelineBoard from "@/src/components/pipeline/PipelineBoard";
import PipelineSummary from "@/src/components/pipeline/PipelineSummary";
import { useState, useEffect } from "react";

type Lead = {
  id: number;
  organizationName: string;
  contactName: string | null;
  designation: string | null;
  phone: string | null;
  priority: string | null;
  leadType: string;
  status: string;
  notes: string | null;
  assignedTo: {
    id: number;
    name: string;
    email: string;
    role: string;
  } | null;
};

type PipelineData = {
  NEW_LEAD: Lead[];
  IN_PROGRESS: Lead[];
  LIKELY_WARM: Lead[];
  ON_HOLD: Lead[];
  CONVERTED: Lead[];
  NOT_INTERESTED: Lead[];
};

export default function Pipelines() {
  const [data, setData] = useState<PipelineData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchPipeline = async () => {
    try {
      const response = await api.get("/pipeline");

      console.log("Pipeline response:", response.data);

      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPipeline();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#ebe7e6] flex items-center justify-center">
        <p className="text-black">Loading...</p>
      </div>
    );
  }

  const total =
    (data?.NEW_LEAD?.length ?? 0) +
    (data?.IN_PROGRESS?.length ?? 0) +
    (data?.LIKELY_WARM?.length ?? 0) +
    (data?.ON_HOLD?.length ?? 0) +
    (data?.CONVERTED?.length ?? 0) +
    (data?.NOT_INTERESTED?.length ?? 0);

  return (
    <div className="min-h-screen bg-[#ebe7e6]">
      <div className="ml-64">
        <Navbar onAddLead={() => {}} />
      </div>

      <Sidebar />

      <main className="ml-64 min-w-0 p-6">
        <PipelineSummary heading="Total Leads" number={total} />

        <PipelineBoard data={data} />
      </main>
    </div>
  );
}
