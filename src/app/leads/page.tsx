"use client";

import { useEffect, useMemo, useState } from "react";

import Navbar from "../../components/layout/Navbar";
import Sidebar from "../../components/layout/Sidebar";

import LeadFilters from "../../components/Leads/LeadFilters";
import LeadTable from "../../components/Leads/LeadTable";
import AddLeadModal from "../../components/Leads/AddLeadModal";

import {
  createLead,
  getLeads,
  updateLead,
  type Lead,
  type LeadPayload,
  type LeadStatus,
} from "@/src/lib/leads-store";
export default function LeadsPage() {
  // Search and filter
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<LeadStatus | "All">("All");

  // Lead data
  const [leads, setLeads] = useState<Lead[]>([]);
  const [hasLoaded, setHasLoaded] = useState(false);

  // Modal
  const [showModal, setShowModal] = useState(false);
  const [editingLead, setEditingLead] = useState<Lead | null>(null);

  // Load leads when page opens
  useEffect(() => {
    async function loadLeads() {
      try {
        const response = await getLeads({ size: 500 });
        setLeads(response.content ?? []);
      } catch (error) {
        console.error("Failed to load leads:", error);
      } finally {
        setHasLoaded(true);
      }
    }

    loadLeads();
  }, []);

  // Filter leads
  const filteredLeads = useMemo(() => {
    const query = search.trim().toLowerCase();

    return leads.filter((lead) => {
      const matchesQuery =
        !query ||
        [lead.organizationName, lead.contactName, lead.phone, lead.email]
          .filter(Boolean)
          .some((value) => value!.toLowerCase().includes(query));

      const matchesStatus = status === "All" || lead.status === status;

      return matchesQuery && matchesStatus;
    });
  }, [leads, search, status]);

  // Create or update lead
  async function saveLead(data: LeadPayload) {
    try {
      const savedLead = editingLead
        ? await updateLead(editingLead.id, data)
        : await createLead(data);

      setLeads((currentLeads) => {
        if (editingLead) {
          return currentLeads.map((lead) =>
            lead.id === savedLead.id ? savedLead : lead,
          );
        }

        return [...currentLeads, savedLead];
      });

      setShowModal(false);
      setEditingLead(null);
    } catch (error) {
      console.error("Failed to save lead:", error);
    }
  }

  // Open add modal
  function openAddModal() {
    setEditingLead(null);
    setShowModal(true);
  }

  // Open edit modal
  function openEditModal(lead: Lead) {
    setEditingLead(lead);
    setShowModal(true);
  }

  // Close modal
  function closeModal() {
    setShowModal(false);
    setEditingLead(null);
  }

  return (
    <div className="min-h-screen bg-[#f7f8f5]">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="lg:ml-64">
        {/* Navbar */}
        <Navbar onAddLead={openAddModal} />

        {/* Filters */}
        <LeadFilters
          search={search}
          setSearch={setSearch}
          status={status}
          setStatus={setStatus}
          totalLeads={filteredLeads.length}
        />

        {/* Leads table */}
        {!hasLoaded ? (
          <p className="mx-6 text-sm text-gray-500">Loading leads...</p>
        ) : (
          <LeadTable leads={filteredLeads} onEdit={openEditModal} />
        )}
      </div>

      {/* Add/Edit modal */}
      {showModal && (
        <AddLeadModal
          lead={editingLead}
          onClose={closeModal}
          onSave={saveLead}
        />
      )}
    </div>
  );
}
