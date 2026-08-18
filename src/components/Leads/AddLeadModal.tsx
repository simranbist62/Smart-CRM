"use client";

import { useState } from "react";

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

type AddLeadModalProps = {
  lead: Lead | null;
  onClose: () => void;
  onSave: (lead: Lead) => void;
};

export default function AddLeadModal({
  lead,
  onClose,
  onSave,
}: AddLeadModalProps) {
  const [school, setSchool] = useState(lead?.school || "");
  const [contact, setContact] = useState(lead?.contact || "");
  const [phone, setPhone] = useState(lead?.phone || "");
  const [status, setStatus] = useState(lead?.status || "New");
  const [score, setScore] = useState(lead?.score || "50 · Developing");
  const [assignedTo, setAssignedTo] = useState(
    lead?.assignedTo || "Unassigned"
  );

  function handleSubmit() {
    const newLead: Lead = {
      id: lead?.id || Date.now(),
      school: school,
      source: lead?.source || "Walk-in",
      contact: contact,
      phone: phone,
      status: status,
      score: score,
      assignedTo: assignedTo,
      nextAction: "Follow up with lead",
    };

    onSave(newLead);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      
      <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl">
        
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-bold text-black">
            {lead ? "Edit Lead" : "Add Lead"}
          </h2>

          <button
            onClick={onClose}
            className="text-xl text-gray-500 hover:text-black"
          >
            ×
          </button>
        </div>

        <div className="space-y-4">

          <input
            value={school}
            onChange={(e) => setSchool(e.target.value)}
            placeholder="School name"
            className="w-full rounded-lg border p-3 text-black"
          />

          <input
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            placeholder="Contact name"
            className="w-full rounded-lg border p-3 text-black"
          />

          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone number"
            className="w-full rounded-lg border p-3 text-black"
          />

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

          <input
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
            placeholder="Assigned to"
            className="w-full rounded-lg border p-3 text-black"
          />

        </div>

        <div className="mt-6 flex justify-end gap-3">

          <button
            onClick={onClose}
            className="rounded-lg border px-4 py-2 text-black"
          >
            Cancel
          </button>

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