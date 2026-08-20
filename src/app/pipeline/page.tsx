"use client";

import Navbar from "@/src/components/layout/Navbar";
import Sidebar from "@/src/components/layout/Sidebar";
import PipelineBoard from "@/src/components/pipeline/PipelineBoard";
import PipelineSummary from "@/src/components/pipeline/PipelineSummary";

export default function Pipelines() {
  return (
    <div className="min-h-screen bg-[#ebe7e6]">
      <div className="ml-64">
        <Navbar onAddLead={() => {}} />
      </div>
      <Sidebar />
      <main className="ml-64 p-6">
        <div>
          <PipelineSummary />
        </div>

        <div>
          <PipelineBoard />
        </div>
      </main>
    </div>
  );
}
