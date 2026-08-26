"use client";

// Import all the parts we need
import { useEffect, useMemo, useState } from "react";

// Import the layout pieces (navbar and sidebar)
import Navbar from "../../components/layout/Navbar";
import Sidebar from "../../components/layout/Sidebar";

// Import the lead management components
import LeadFilters from "../../components/Leads/LeadFilters";
import LeadTable from "../../components/Leads/LeadTable";
import AddLeadModal from "../../components/Leads/AddLeadModal";

// Import the functions that work with leads (save, get, update)
import {
  createLead,        // function to add a new lead
  getLeads,          // function to get all leads
  updateLead,        // function to update an existing lead
  type Lead,         // what a Lead looks like
  type LeadPayload,  // what data we need to create/update a lead
  type LeadStatus,   // possible statuses (like "Active", "Closed", etc.)
} from "@/src/lib/leads-store";


// This is the main page that shows all leads
export default function LeadsPage() {

  // ============================================
  // 1. STATE VARIABLES (memory for the page)
  // ============================================

  // Search and filter - what the user types in the search box
  const [search, setSearch] = useState("");
  
  // Status filter - show all leads or filter by status
  const [status, setStatus] = useState<LeadStatus | "All">("All");

  // Lead data - the list of leads we show on the page
  const [leads, setLeads] = useState<Lead[]>([]);
  
  // Has loaded? - shows "Loading..." until leads are ready
  const [hasLoaded, setHasLoaded] = useState(false);

  // Modal states - controls the popup window for adding/editing
  const [showModal, setShowModal] = useState(false);      // Should the modal be visible?
  const [editingLead, setEditingLead] = useState<Lead | null>(null); // Which lead are we editing? (null = adding new)


  // ============================================
  // 2. LOAD LEADS WHEN PAGE OPENS
  // ============================================

  // This runs once when the page first loads
  useEffect(() => {
    // Load leads from the "database" (which is stored in the browser)
    const timer = window.setTimeout(() => {
      setLeads(getLeads({ size: 500 }).content); // Get up to 500 leads
      setHasLoaded(true); // We're done loading
    }, 0);

    // Clean up the timer when the component unmounts
    return () => window.clearTimeout(timer);
  }, []); // Empty array = run only once when page loads


  // ============================================
  // 3. FILTER LEADS (search + status)
  // ============================================

  // This recalculates the filtered list whenever:
  // - leads change (new data)
  // - search changes (user types)
  // - status changes (user filters)
  const filteredLeads = useMemo(() => {
    // Clean up the search term (remove spaces, make lowercase)
    const query = search.trim().toLowerCase();
    
    // Go through each lead and see if it matches
    return leads.filter((lead) => {
      // Check if the lead matches the search query
      const matchesQuery = !query || 
        // Look in these fields for the search term
        [lead.organizationName, lead.contactName, lead.phone, lead.email]
          .filter(Boolean) // Remove any empty/null values
          .some((value) => value!.toLowerCase().includes(query)); // Does any field contain the search term?
      
      // Check if the lead matches the status filter
      const matchesStatus = status === "All" || lead.status === status;
      
      // Only keep this lead if it matches BOTH the search AND the status
      return matchesQuery && matchesStatus;
    });
  }, [leads, search, status]); // Recalculate when these change


  // ============================================
  // 4. SAVE LEAD (create or update)
  // ============================================

  // This function saves a lead (either new or edited)
  async function saveLead(data: LeadPayload) {
    // If we're editing, update the existing lead
    // If we're adding new, create a new lead
    const savedLead = editingLead
      ? updateLead(editingLead.id, data)  // UPDATE
      : createLead(data);                  // CREATE

    // Update the list of leads in state
    setLeads((currentLeads) => {
      if (editingLead) {
        // If editing: replace the old lead with the updated one
        return currentLeads.map((lead) => 
          lead.id === savedLead.id ? savedLead : lead
        );
      } else {
        // If adding: add the new lead to the end of the list
        return [...currentLeads, savedLead];
      }
    });
    
    // Close the modal and clear the editing state
    setShowModal(false);
    setEditingLead(null);
  }


  // ============================================
  // 5. MODAL CONTROL FUNCTIONS
  // ============================================

  // Open modal to add a NEW lead
  function openAddModal() {
    setEditingLead(null); // No lead = adding new
    setShowModal(true);   // Show the modal
  }

  // Open modal to EDIT an existing lead
  function openEditModal(lead: Lead) {
    setEditingLead(lead); // This lead = editing
    setShowModal(true);   // Show the modal
  }

  // Close the modal (without saving)
  function closeModal() {
    setShowModal(false);   // Hide the modal
    setEditingLead(null);  // Clear the editing state
  }


  // ============================================
  // 6. RENDER THE PAGE
  // ============================================

  return (
    <div className="min-h-screen bg-[#f7f8f5]">
      
      {/* SIDEBAR - the menu on the left side */}
      <Sidebar />

      {/* MAIN CONTENT - the area to the right of the sidebar */}
      <div className="lg:ml-64">
        
        {/* NAVBAR - the top bar with the "Add Lead" button */}
        <Navbar onAddLead={openAddModal} />

        {/* FILTERS - search box and status dropdown */}
        <LeadFilters
          search={search}
          setSearch={setSearch}
          status={status}
          setStatus={setStatus}
          totalLeads={filteredLeads.length} // Show how many leads match
        />

        {/* TABLE - shows the list of leads */}
        {!hasLoaded ? (
          // Show loading message while data is loading
          <p className="mx-6 text-sm text-gray-500">
            Loading leads...
          </p>
        ) : (
          // Show the table with all filtered leads
          <LeadTable
            leads={filteredLeads}
            onEdit={openEditModal} // When user clicks "Edit", open the modal
          />
        )}
      </div>

      {/* MODAL - popup window for adding/editing a lead */}
      {showModal && (
        <AddLeadModal
          lead={editingLead}        // If null, we're adding new
          onClose={closeModal}      // What to do when user clicks "Cancel"
          onSave={saveLead}         // What to do when user clicks "Save"
        />
      )}
    </div>
  );
}
