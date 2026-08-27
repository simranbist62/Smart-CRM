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


// ------------------------------------
// LEAD TYPE
// ------------------------------------

type Lead = {
  id: number;
  school: string;
  source: string;
  contact: string;
  phone: string;
  status: string;
  score: string;
  assigned: string;
  date: string;
  action: string;
};


// ------------------------------------
// LEADS PAGE
// ------------------------------------

export default function LeadsPage() {

  // ------------------------------------
  // POPUP
  // ------------------------------------

  const [showAddPopup, setShowAddPopup] = useState(false);

  const [editingLead, setEditingLead] =
    useState<Lead | null>(null);


  // ------------------------------------
  // SEARCH
  // ------------------------------------

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [editingLead, setEditingLead] = useState<Lead | null>(null);

  const [statusFilter, setStatusFilter] =
    useState("All statuses");


  // ------------------------------------
  // FORM
  // ------------------------------------

  const [school, setSchool] = useState("");

  const [contact, setContact] = useState("");

  const [phone, setPhone] = useState("");

  const [source, setSource] = useState("Walk-in");

  const [status, setStatus] = useState("New");

  const [score, setScore] = useState("50 · Developing");

  const [assigned, setAssigned] =
    useState("Unassigned");

  const [date, setDate] = useState("");

  const [action, setAction] =
    useState("Follow up with lead");


  // ------------------------------------
  // INITIAL LEADS
  // ------------------------------------

  const [leads, setLeads] = useState<Lead[]>([
    {
      id: 1,
      school: "Budhanilkantha School",
      source: "Referral",
      contact: "Mr. R. Sharma (Principal Office)",
      phone: "01-4371200",
      status: "Converted",
      score: "100 · Hot",
      assigned: "Ramesh Chaudhary",
      date: "2026-06-26",
      action: "Plan onboarding and request a referral",
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
      contact: "Ms. A. Karki (Academic Coordinator)",
      phone: "01-5201818",
      status: "Converted",
      score: "100 · Hot",
      assigned: "Ramesh Chaudhary",
      date: "2026-07-03",
      action: "Plan onboarding and request a referral",
      contact: "Ms. A. Karki",
      phone: "01-5201818",
      status: "Converted",
      score: "100 · Hot",
      assignedTo: "Ramesh Chaudhary",
      nextAction: "Plan onboarding and request a referral",
    },

    {
      id: 3,
      school: "St. Xavier's School, Jawalakhel",
      source: "Website Inquiry",
      contact: "Fr. J. Lewis (Admin)",
      phone: "01-5521303",
      status: "Likely / Warm",
      score: "37 · Developing",
      assigned: "Ramesh Chaudhary",
      date: "2026-06-25",
      action: "Complete the scheduled follow-up today",
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
      assigned: "Raj Chaudhary",
      date: "—",
      action: "Plan onboarding and request a referral",
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
      assigned: "Ramesh Chaudhary",
      date: "2026-06-24",
      action: "Plan onboarding and request a referral",
    },

    {
      id: 6,
      school: "Everest Secondary Academy",
      source: "Walk-in",
      contact: "Mr. Ritesh Pajiyar",
      phone: "9844149273",
      status: "Converted",
      score: "100 · Hot",
      assigned: "Ramesh Chaudhary",
      date: "2026-08-22",
      action: "Plan onboarding and request a referral",
    },

    {
      id: 7,
      school: "Laliguras Academy",
      source: "Social Media",
      contact: "Mr. Ujwal Sharma",
      phone: "9854036871",
      status: "Converted",
      score: "89 · Hot",
      assigned: "Ramesh Chaudhary",
      date: "2026-06-24",
      action: "Plan onboarding and request a referral",
    },
  ]);


  // ------------------------------------
  // CLEAR FORM
  // ------------------------------------

  function clearForm() {

    setSchool("");
    setContact("");
    setPhone("");
    setSource("Walk-in");
    setStatus("New");
    setScore("50 · Developing");
    setAssigned("Unassigned");
    setDate("");
    setAction("Follow up with lead");

  }


  // ------------------------------------
  // ADD LEAD
  // ------------------------------------

  function addLead() {

    if (
      school === "" ||
      contact === "" ||
      phone === ""
    ) {
      alert("Please fill School, Contact and Phone.");
      return;
    }

    const newLead: Lead = {
      id: Date.now(),
      school: school,
      source: source,
      contact: contact,
      phone: phone,
      status: status,
      score: score,
      assigned: assigned,
      date: date || "—",
      action: action,
    };

    setLeads([...leads, newLead]);

    clearForm();

    setShowAddPopup(false);
  }


  // ------------------------------------
  // OPEN EDIT POPUP
  // ------------------------------------

  function editLead(lead: Lead) {

    setEditingLead(lead);

  }


  // ------------------------------------
  // SAVE EDITED LEAD
  // ------------------------------------

  function saveEditedLead() {

    if (editingLead === null) {
      return;
    }

    const updatedLeads = leads.map((lead) => {

      if (lead.id === editingLead.id) {
        return editingLead;
      }

      return lead;

    });

    setLeads(updatedLeads);

    setEditingLead(null);
  }


  // ------------------------------------
  // DELETE LEAD
  // ------------------------------------

  function deleteLead(id: number) {

    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this lead?"
      );

    if (!confirmDelete) {
      return;
    }

    const newLeads =
      leads.filter((lead) => lead.id !== id);

    setLeads(newLeads);
  }


  // ------------------------------------
  // FILTER LEADS
  // ------------------------------------

  const filteredLeads = leads.filter((lead) => {

    const searchText =
      lead.school +
      " " +
      lead.contact +
      " " +
      lead.phone;

    const matchesSearch =
      searchText
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All statuses" ||
      lead.status === statusFilter;

    return matchesSearch && matchesStatus;

  });


  // ------------------------------------
  // PAGE
  // ------------------------------------

  return (
    <div className="min-h-screen bg-[#f8f9f6] text-[#202520]">


      {/* ================================= */}
      {/* NAVBAR */}
      {/* ================================= */}

      <Navbar
        onAddLead={() => setShowAddPopup(true)}
      />


      {/* ================================= */}
      {/* MAIN */}
      {/* ================================= */}

      <main className="px-4 py-6 sm:px-6 lg:px-8">


        {/* ================================= */}
        {/* SEARCH */}
        {/* ================================= */}

        <div className="mb-6 flex flex-col gap-3 lg:flex-row lg:items-center">


          {/* Search */}

          <div className="flex w-full items-center rounded-xl border border-[#dedfd9] bg-white px-4 py-3 shadow-sm lg:max-w-[580px]">

            <span className="mr-3 text-xl">
              🔍
            </span>

            <input
              type="text"
              placeholder="Search school, contact or phone..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="w-full bg-transparent text-sm text-[#202520] outline-none placeholder:text-[#777b76]"
            />

          </div>


          {/* Status filter */}

          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value)
            }
            className="rounded-xl border border-[#dedfd9] bg-white px-4 py-3 text-sm text-[#202520] outline-none"
          >

            <option>All statuses</option>

            <option>New</option>

            <option>Converted</option>

            <option>Likely / Warm</option>

            <option>Lost</option>

          </select>


          {/* Count */}

          <p className="text-sm text-[#777b76] lg:ml-auto">
            {leads.length} leads
          </p>

        </div>


        {/* ================================= */}
        {/* TABLE */}
        {/* ================================= */}

        <div className="overflow-hidden rounded-xl border border-[#dedfd9] bg-white shadow-sm">

          {/* Horizontal scroll on small screens */}

          <div className="overflow-x-auto">

            <table className="w-full min-w-[1050px]">


              {/* TABLE HEADER */}

              <thead>

                <tr className="bg-[#eef0eb]">

                  <th className="px-4 py-4 text-left text-[11px] font-bold uppercase tracking-wide text-[#626862]">
                    School / Lead
                  </th>

                  <th className="px-4 py-4 text-left text-[11px] font-bold uppercase tracking-wide text-[#626862]">
                    Contact
                  </th>

                  <th className="px-4 py-4 text-left text-[11px] font-bold uppercase tracking-wide text-[#626862]">
                    Status
                  </th>

                  <th className="px-4 py-4 text-left text-[11px] font-bold uppercase tracking-wide text-[#626862]">
                    Score
                  </th>

                  <th className="px-4 py-4 text-left text-[11px] font-bold uppercase tracking-wide text-[#626862]">
                    Assigned To
                  </th>

                  <th className="px-4 py-4 text-left text-[11px] font-bold uppercase tracking-wide text-[#626862]">
                    Next Action
                  </th>

                  <th className="px-4 py-4 text-left text-[11px] font-bold uppercase tracking-wide text-[#626862]">
                    Actions
                  </th>

                </tr>

              </thead>


              {/* TABLE BODY */}

              <tbody>

                {filteredLeads.map((lead) => (

                  <tr
                    key={lead.id}
                    className="border-t border-[#eeeeea] hover:bg-[#fafbf8]"
                  >


                    {/* SCHOOL */}

                    <td className="px-4 py-5">

                      <p className="font-semibold text-[#202520]">
                        {lead.school}
                      </p>

                      <p className="mt-1 text-xs text-[#777b76]">
                        {lead.source}
                      </p>

                    </td>


                    {/* CONTACT */}

                    <td className="px-4 py-5">

                      <p className="text-sm font-medium text-[#303530]">
                        {lead.contact}
                      </p>

                      <p className="mt-1 text-xs text-[#777b76]">
                        {lead.phone}
                      </p>

                    </td>


                    {/* STATUS */}

                    <td className="px-4 py-5">

                      {lead.status === "Converted" ? (

                        <span className="rounded-full bg-[#e2f0e8] px-3 py-1.5 text-xs font-semibold text-[#4c8068]">
                          Converted
                        </span>

                      ) : lead.status === "Lost" ? (

                        <span className="rounded-full bg-[#f8e5e3] px-3 py-1.5 text-xs font-semibold text-[#a85e56]">
                          Lost
                        </span>

                      ) : (

                        <span className="rounded-full bg-[#fff1cf] px-3 py-1.5 text-xs font-semibold text-[#856d29]">
                          {lead.status}
                        </span>

                      )}

                    </td>


                    {/* SCORE */}

                    <td className="px-4 py-5">

                      <span className="rounded-full bg-[#e2f0e8] px-3 py-1.5 text-xs font-semibold text-[#4c8068]">
                        {lead.score}
                      </span>

                    </td>


                    {/* ASSIGNED */}

                    <td className="px-4 py-5 text-sm text-[#303530]">
                      {lead.assigned}
                    </td>


                    {/* NEXT ACTION */}

                    <td className="px-4 py-5">

                      <p className="text-sm font-semibold text-[#b76a61]">
                        {lead.date}
                      </p>

                      <p className="mt-1 text-xs text-[#777b76]">
                        {lead.action}
                      </p>

                    </td>


                    {/* ACTIONS */}

                    <td className="px-4 py-5">

                      <div className="flex gap-2">

                        <button
                          onClick={() =>
                            editLead(lead)
                          }
                          className="rounded-lg border border-[#dfe2dc] bg-white px-3 py-2 text-xs font-semibold text-[#202520] hover:bg-[#eef0eb]"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() =>
                            deleteLead(lead.id)
                          }
                          className="rounded-lg border border-[#edcfcc] bg-white px-3 py-2 text-xs font-semibold text-[#a85e56] hover:bg-[#f9e9e7]"
                        >
                          Delete
                        </button>

                      </div>

                    </td>

                  </tr>

                ))}


                {/* NO RESULTS */}

                {filteredLeads.length === 0 && (

                  <tr>

                    <td
                      colSpan={7}
                      className="px-6 py-12 text-center text-sm text-[#777b76]"
                    >
                      No leads found.

                    </td>

                  </tr>

                )}

              </tbody>

            </table>

          </div>

        </div>

      </main>


      {/* ================================= */}
      {/* ADD LEAD POPUP */}
      {/* ================================= */}

      {showAddPopup && (

        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/40 p-4">

          <div className="my-8 w-full max-w-lg rounded-2xl bg-[#f8f9f6] p-6 shadow-2xl">


            {/* Heading */}

            <div className="mb-6 flex items-center justify-between">

              <div>

                <p className="text-xs font-semibold uppercase tracking-wider text-[#527b69]">
                  Lead Management
                </p>

                <h2 className="mt-1 text-2xl font-bold text-[#202520]">
                  Add Lead
                </h2>

              </div>


              <button
                onClick={() =>
                  setShowAddPopup(false)
                }
                className="text-2xl text-[#202520]"
              >
                ×
              </button>

            </div>


            {/* School */}

            <label className="mb-2 block text-sm font-semibold text-[#202520]">
              School / Lead
            </label>

            <input
              value={school}
              onChange={(e) =>
                setSchool(e.target.value)
              }
              placeholder="Enter school name"
              className="mb-4 w-full rounded-xl border border-[#dfe2dc] bg-white px-4 py-3 text-sm text-[#202520] outline-none focus:border-[#527b69]"
            />


            {/* Source */}

            <label className="mb-2 block text-sm font-semibold text-[#202520]">
              Source
            </label>

            <select
              value={source}
              onChange={(e) =>
                setSource(e.target.value)
              }
              className="mb-4 w-full rounded-xl border border-[#dfe2dc] bg-white px-4 py-3 text-sm text-[#202520]"
            >

              <option>Walk-in</option>

              <option>Referral</option>

              <option>Cold Call</option>

              <option>Website Inquiry</option>

              <option>Social Media</option>

            </select>


            {/* Contact */}

            <label className="mb-2 block text-sm font-semibold text-[#202520]">
              Contact
            </label>

            <input
              value={contact}
              onChange={(e) =>
                setContact(e.target.value)
              }
              placeholder="Enter contact name"
              className="mb-4 w-full rounded-xl border border-[#dfe2dc] bg-white px-4 py-3 text-sm text-[#202520] outline-none focus:border-[#527b69]"
            />


            {/* Phone */}

            <label className="mb-2 block text-sm font-semibold text-[#202520]">
              Phone
            </label>

            <input
              value={phone}
              onChange={(e) =>
                setPhone(e.target.value)
              }
              placeholder="Enter phone number"
              className="mb-4 w-full rounded-xl border border-[#dfe2dc] bg-white px-4 py-3 text-sm text-[#202520] outline-none focus:border-[#527b69]"
            />


            {/* Status */}

            <label className="mb-2 block text-sm font-semibold text-[#202520]">
              Status
            </label>

            <select
              value={status}
              onChange={(e) =>
                setStatus(e.target.value)
              }
              className="mb-4 w-full rounded-xl border border-[#dfe2dc] bg-white px-4 py-3 text-sm text-[#202520]"
            >

              <option>New</option>

              <option>Likely / Warm</option>

              <option>Converted</option>

              <option>Lost</option>

            </select>


            {/* Score */}

            <label className="mb-2 block text-sm font-semibold text-[#202520]">
              Score
            </label>

            <select
              value={score}
              onChange={(e) =>
                setScore(e.target.value)
              }
              className="mb-4 w-full rounded-xl border border-[#dfe2dc] bg-white px-4 py-3 text-sm text-[#202520]"
            >

              <option>100 · Hot</option>

              <option>90 · Hot</option>

              <option>75 · Warm</option>

              <option>50 · Developing</option>

              <option>37 · Developing</option>

            </select>


            {/* Assigned */}

            <label className="mb-2 block text-sm font-semibold text-[#202520]">
              Assigned To
            </label>

            <select
              value={assigned}
              onChange={(e) =>
                setAssigned(e.target.value)
              }
              className="mb-4 w-full rounded-xl border border-[#dfe2dc] bg-white px-4 py-3 text-sm text-[#202520]"
            >

              <option>Unassigned</option>

              <option>Ramesh Chaudhary</option>

              <option>Raj Chaudhary</option>

            </select>


            {/* Date */}

            <label className="mb-2 block text-sm font-semibold text-[#202520]">
              Next Action Date
            </label>

            <input
              type="date"
              value={date}
              onChange={(e) =>
                setDate(e.target.value)
              }
              className="mb-4 w-full rounded-xl border border-[#dfe2dc] bg-white px-4 py-3 text-sm text-[#202520]"
            />


            {/* Action */}

            <label className="mb-2 block text-sm font-semibold text-[#202520]">
              Next Action
            </label>

            <input
              value={action}
              onChange={(e) =>
                setAction(e.target.value)
              }
              className="mb-6 w-full rounded-xl border border-[#dfe2dc] bg-white px-4 py-3 text-sm text-[#202520]"
            />


            {/* Buttons */}

            <div className="flex justify-end gap-3">

              <button
                onClick={() =>
                  setShowAddPopup(false)
                }
                className="rounded-xl border border-[#dfe2dc] bg-white px-5 py-3 text-sm font-semibold text-[#202520]"
              >
                Cancel
              </button>

              <button
                onClick={addLead}
                className="rounded-xl bg-[#527b69] px-5 py-3 text-sm font-semibold text-white hover:bg-[#456b5b]"
              >
                Add Lead
              </button>

            </div>

          </div>

        </div>

      )}


      {/* ================================= */}
      {/* EDIT LEAD POPUP */}
      {/* ================================= */}

      {editingLead && (

        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/40 p-4">

          <div className="my-8 w-full max-w-lg rounded-2xl bg-[#f8f9f6] p-6 shadow-2xl">


            {/* Heading */}

            <div className="mb-6 flex items-center justify-between">

              <div>

                <p className="text-xs font-semibold uppercase tracking-wider text-[#527b69]">
                  Lead Management
                </p>

                <h2 className="mt-1 text-2xl font-bold text-[#202520]">
                  Edit Lead
                </h2>

              </div>


              <button
                onClick={() =>
                  setEditingLead(null)
                }
                className="text-2xl text-[#202520]"
              >
                ×
              </button>

            </div>


            {/* School */}

            <label className="mb-2 block text-sm font-semibold text-[#202520]">
              School / Lead
            </label>

            <input
              value={editingLead.school}
              onChange={(e) =>
                setEditingLead({
                  ...editingLead,
                  school: e.target.value,
                })
              }
              className="mb-4 w-full rounded-xl border border-[#dfe2dc] bg-white px-4 py-3 text-sm text-[#202520]"
            />


            {/* Source */}

            <label className="mb-2 block text-sm font-semibold text-[#202520]">
              Source
            </label>

            <select
              value={editingLead.source}
              onChange={(e) =>
                setEditingLead({
                  ...editingLead,
                  source: e.target.value,
                })
              }
              className="mb-4 w-full rounded-xl border border-[#dfe2dc] bg-white px-4 py-3 text-sm text-[#202520]"
            >

              <option>Walk-in</option>

              <option>Referral</option>

              <option>Cold Call</option>

              <option>Website Inquiry</option>

              <option>Social Media</option>

              <option>New Lead</option>

            </select>


            {/* Contact */}

            <label className="mb-2 block text-sm font-semibold text-[#202520]">
              Contact
            </label>

            <input
              value={editingLead.contact}
              onChange={(e) =>
                setEditingLead({
                  ...editingLead,
                  contact: e.target.value,
                })
              }
              className="mb-4 w-full rounded-xl border border-[#dfe2dc] bg-white px-4 py-3 text-sm text-[#202520]"
            />


            {/* Phone */}

            <label className="mb-2 block text-sm font-semibold text-[#202520]">
              Phone
            </label>

            <input
              value={editingLead.phone}
              onChange={(e) =>
                setEditingLead({
                  ...editingLead,
                  phone: e.target.value,
                })
              }
              className="mb-4 w-full rounded-xl border border-[#dfe2dc] bg-white px-4 py-3 text-sm text-[#202520]"
            />


            {/* Status */}

            <label className="mb-2 block text-sm font-semibold text-[#202520]">
              Status
            </label>

            <select
              value={editingLead.status}
              onChange={(e) =>
                setEditingLead({
                  ...editingLead,
                  status: e.target.value,
                })
              }
              className="mb-4 w-full rounded-xl border border-[#dfe2dc] bg-white px-4 py-3 text-sm text-[#202520]"
            >

              <option>New</option>

              <option>Likely / Warm</option>

              <option>Converted</option>

              <option>Lost</option>

            </select>


            {/* Score */}

            <label className="mb-2 block text-sm font-semibold text-[#202520]">
              Score
            </label>

            <select
              value={editingLead.score}
              onChange={(e) =>
                setEditingLead({
                  ...editingLead,
                  score: e.target.value,
                })
              }
              className="mb-4 w-full rounded-xl border border-[#dfe2dc] bg-white px-4 py-3 text-sm text-[#202520]"
            >

              <option>100 · Hot</option>

              <option>90 · Hot</option>

              <option>75 · Warm</option>

              <option>50 · Developing</option>

              <option>37 · Developing</option>

              <option>—</option>

            </select>


            {/* Assigned */}

            <label className="mb-2 block text-sm font-semibold text-[#202520]">
              Assigned To
            </label>

            <select
              value={editingLead.assigned}
              onChange={(e) =>
                setEditingLead({
                  ...editingLead,
                  assigned: e.target.value,
                })
              }
              className="mb-4 w-full rounded-xl border border-[#dfe2dc] bg-white px-4 py-3 text-sm text-[#202520]"
            >

              <option>Unassigned</option>

              <option>Ramesh Chaudhary</option>

              <option>Raj Chaudhary</option>

            </select>


            {/* Date */}

            <label className="mb-2 block text-sm font-semibold text-[#202520]">
              Next Action Date
            </label>

            <input
              type="date"
              value={editingLead.date === "—" ? "" : editingLead.date}
              onChange={(e) =>
                setEditingLead({
                  ...editingLead,
                  date: e.target.value || "—",
                })
              }
              className="mb-4 w-full rounded-xl border border-[#dfe2dc] bg-white px-4 py-3 text-sm text-[#202520]"
            />


            {/* Action */}

            <label className="mb-2 block text-sm font-semibold text-[#202520]">
              Next Action
            </label>

            <input
              value={editingLead.action}
              onChange={(e) =>
                setEditingLead({
                  ...editingLead,
                  action: e.target.value,
                })
              }
              className="mb-6 w-full rounded-xl border border-[#dfe2dc] bg-white px-4 py-3 text-sm text-[#202520]"
            />


            {/* Buttons */}

            <div className="flex justify-end gap-3">

              <button
                onClick={() =>
                  setEditingLead(null)
                }
                className="rounded-xl border border-[#dfe2dc] bg-white px-5 py-3 text-sm font-semibold text-[#202520]"
              >
                Cancel
              </button>


              <button
                onClick={saveEditedLead}
                className="rounded-xl bg-[#527b69] px-5 py-3 text-sm font-semibold text-white hover:bg-[#456b5b]"
              >
                Save Changes
              </button>

            </div>

          </div>

        </div>

      )}

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