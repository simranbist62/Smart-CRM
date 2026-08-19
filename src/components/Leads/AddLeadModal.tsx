"use client";

import { useState } from "react";

// Defines the information stored for each lead
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

// Defines the props that the modal receives
type AddLeadModalProps = {
  lead: Lead | null;
  onClose: () => void;
  onSave: (lead: Lead) => void;
};

// Modal used to add a new lead or edit an existing lead
export default function AddLeadModal({
  lead,
  onClose,
  onSave,
}: AddLeadModalProps) {

  // Stores the values entered in the form
  const [school, setSchool] = useState(lead?.school || "");
  const [contact, setContact] = useState(lead?.contact || "");
  const [phone, setPhone] = useState(lead?.phone || "");
  const [status, setStatus] = useState(lead?.status || "New");
  const [score, setScore] = useState(
    lead?.score || "50 · Developing"
  );
  const [assignedTo, setAssignedTo] = useState(
    lead?.assignedTo || "Unassigned"
  );

  // Creates the lead object and sends it back to the parent component
  function handleSubmit() {
    const newLead: Lead = {
      id: lead?.id || Date.now(),
      school,
      source: lead?.source || "Walk-in",
      contact,
      phone,
      status,
      score,
      assignedTo,
      nextAction: "Follow up with lead",
    };

    onSave(newLead);
  }

  return (
    // Dark background behind the modal
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">

      {/* Modal box */}
      <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl">

        {/* Modal header */}
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-bold text-black">
            {lead ? "Edit Lead" : "Add Lead"}
          </h2>

          {/* Close button */}
          <button
            onClick={onClose}
            className="text-xl text-gray-500 hover:text-black"
          >
            ×
          </button>
        </div>

        {/* Form fields */}
        <div className="space-y-4">

          {/* School name */}
          <input
            value={school}
            onChange={(e) => setSchool(e.target.value)}
            placeholder="School name"
            className="w-full rounded-lg border p-3 text-black"
          />

          {/* Contact name */}
          <input
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            placeholder="Contact name"
            className="w-full rounded-lg border p-3 text-black"
          />

          {/* Phone number */}
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone number"
            className="w-full rounded-lg border p-3 text-black"
          />

          {/* Lead status */}
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full rounded-lg border p-3 text-black"
          >
            <option>New</option>
            <option>Converted</option>
            <option>Likely / Warm</option>
            <option>Lost</option>
          </select>

          {/* Lead score */}
          <select
            value={score}
            onChange={(e) => setScore(e.target.value)}
            className="w-full rounded-lg border p-3 text-black"
          >
            <option>100 · Hot</option>
            <option>75 · Warm</option>
            <option>50 · Developing</option>
            <option>25 · Cold</option>
          </select>

          {/* Person assigned to the lead */}
          <input
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
            placeholder="Assigned to"
            className="w-full rounded-lg border p-3 text-black"
          />

        </div>

        {/* Modal buttons */}
        <div className="mt-6 flex justify-end gap-3">

          {/* Cancel button */}
          <button
            onClick={onClose}
            className="rounded-lg border px-4 py-2 text-black"
          >
            Cancel
          </button>

          {/* Save or Add button */}
          <button
            onClick={handleSubmit}
            className="rounded-lg bg-green-700 px-5 py-2 text-white hover:bg-green-800"
          >
            {lead ? "Save Changes" : "Add Lead"}
          </button>

        </div>

      </div>
    </div>
  );
}