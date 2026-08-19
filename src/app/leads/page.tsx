"use client";

import { useState } from "react";

import Navbar from "../../components/layout/Navbar";
import Sidebar from "../../components/layout/Sidebar";
import LeadFilters from "../../components/Leads/LeadFilters";
import LeadTable from "../../components/Leads/LeadTable";
import AddLeadModal from "../../components/Leads/AddLeadModal";

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

export default function LeadsPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [editingLead, setEditingLead] = useState<Lead | null>(null);

  const [leads, setLeads] = useState<Lead[]>([
    {
      id: 1,
      school: "Budhanilkantha School",
      source: "Referral",
      contact: "Mr. R. Sharma",
      phone: "01-4371200",
      status: "Converted",
      score: "100 · Hot",
      assignedTo: "Ramesh Chaudhary",
      nextAction: "Plan onboarding and request a referral",
    },
    {
      id: 2,
      school: "GEMS School",
      source: "Cold Call",
      contact: "Ms. A. Karki",
      phone: "01-5201818",
      status: "Converted",
      score: "100 · Hot",
      assignedTo: "Ramesh Chaudhary",
      nextAction: "Plan onboarding and request a referral",
    },
    {
      id: 3,
      school: "St. Xavier's School",
      source: "Website Inquiry",
      contact: "Fr. J. Lewis",
      phone: "01-5521303",
      status: "Likely / Warm",
      score: "37 · Developing",
      assignedTo: "Ramesh Chaudhary",
      nextAction: "Complete the scheduled follow-up today",
    },
    {
      id: 4,
      school: "New Everest Academy",
      source: "Walk-in",
      contact: "Ramesh Chaudhary",
      phone: "9854037128",
      status: "Converted",
      score: "93 · Hot",
      assignedTo: "Raj Chaudhary",
      nextAction: "Plan onboarding and request a referral",
    },
    {
      id: 5,
      school: "New Light English Boarding School",
      source: "Walk-in",
      contact: "Mr. Sujit Sah",
      phone: "9800826477",
      status: "Converted",
      score: "100 · Hot",
      assignedTo: "Ramesh Chaudhary",
      nextAction: "Plan onboarding and request a referral",
    },
  ]);

  const filteredLeads = leads.filter((lead) => {
    const searchText =
      lead.school + " " + lead.contact + " " + lead.phone;

    const matchesSearch = searchText
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesStatus =
      status === "All" || lead.status === status;

    return matchesSearch && matchesStatus;
  });

  function saveLead(lead: Lead) {
    const existingLead = leads.find((item) => item.id === lead.id);

    if (existingLead) {
      setLeads((prevLeads) =>
        prevLeads.map((item) =>
          item.id === lead.id ? lead : item
        )
      );
    } else {
      setLeads((prevLeads) => [...prevLeads, lead]);
    }

    setShowModal(false);
    setEditingLead(null);
  }

  function editLead(lead: Lead) {
    setEditingLead(lead);
    setShowModal(true);
  }

  function addLead() {
    setEditingLead(null);
    setShowModal(true);
  }

  return (
    <div className="min-h-screen bg-[#f7f8f5]">
      <Sidebar />

      <div className="lg:ml-64">
        <Navbar onAddLead={addLead} />

       

        <LeadFilters
          search={search}
          setSearch={setSearch}
          status={status}
          setStatus={setStatus}
          totalLeads={filteredLeads.length}
        />

        <LeadTable
          leads={filteredLeads}
          onEdit={editLead}
        />
      </div>

      {showModal && (
        <AddLeadModal
          lead={editingLead}
          onClose={() => {
            setShowModal(false);
            setEditingLead(null);
          }}
          onSave={saveLead}
        />
      )}
    </div>
  );
}