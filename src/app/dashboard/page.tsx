"use client";

import { useState } from "react";
import FollowsUp from "@/src/components/dashboard/FollowsUp";
import LeadSources from "@/src/components/dashboard/LeadSources";
import Pipeline from "@/src/components/dashboard/Pipeline";
import StatCard from "@/src/components/dashboard/StatCard";
import TeamWorkload from "@/src/components/dashboard/TeamWorkload";
import Navbar from "@/src/components/layout/Navbar";
import Sidebar from "@/src/components/layout/Sidebar";
import AddLeadModal from "@/src/components/Leads/AddLeadModal";

type Lead = {
  id: number;
  school: string;
  source: string;
  contact: string;
  phone: string;
  status: string;
  score: string;
  assignedTo: string;
  nextAction: string;
};

export default function Dashboard() {
  const [showModal, setShowModal] = useState(false);
  const [editingLead, setEditingLead] = useState<Lead | null>(null);

  const handleAddLead = () => {
    setEditingLead(null);
    setShowModal(true);
  };

  const handleSaveLead = (lead: Lead) => {
    console.log("Lead saved:", lead);
    setShowModal(false);
    setEditingLead(null);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingLead(null);
  };

  return (
    <div className="min-h-screen bg-[#ebe7e6]">
      <Sidebar />

      <div className="lg:ml-64">
        <Navbar onAddLead={handleAddLead} />

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

      {showModal && (
        <AddLeadModal
          lead={editingLead}
          onClose={handleCloseModal}
          onSave={handleSaveLead}
        />
      )}
    </div>
  );
}