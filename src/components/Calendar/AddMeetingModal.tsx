"use client";

import { useState } from "react";


import type { Lead } from "@/src/lib/leads-store";

// These are the different types of activities we can add
// We have 4 options: CALL, MEETING, EMAIL, and FOLLOW_UP
type ActivityType = "CALL" | "MEETING" | "EMAIL" | "FOLLOW_UP";

// These are the "props" or inputs that this component expects
// - leads: a list of leads (people/organizations we're working with)
// - initialDate: the date we want to show by default
// - onClose: a function that runs when we want to close the modal
// - onSave: a function that saves the activity to the database
type Props = {
  leads: Lead[];
  initialDate: Date;
  onClose: () => void;
  onSave: (
    leadId: number,
    type: ActivityType,
    remarks: string,
    date: string,
  ) => Promise<void>;
};

export default function AddMeetingModal({
  leads,
  initialDate,
  onClose,
  onSave,
}: Props) {
  // STEP 1: Get today's date in the format "YYYY-MM-DD"
  // Example: if today is August 26, 2026, we get "2026-08-26"
  const year = initialDate.getFullYear();
  const month = String(initialDate.getMonth() + 1).padStart(2, "0");
  const day = String(initialDate.getDate()).padStart(2, "0");
  const defaultDate = `${year}-${month}-${day}`;

  // STEP 2: Set up state variables to track form data
  // These are like "memory" for the form as the user types

  // Which lead is selected? (starts empty)
  const [leadId, setLeadId] = useState("");

  // What date is selected? (starts with today)
  const [date, setDate] = useState(defaultDate);

  // What type of activity? (starts with MEETING)
  const [activityType, setActivityType] = useState<ActivityType>("MEETING");

  // What are the details/remarks? (starts empty)
  const [remarks, setRemarks] = useState("");

  // STEP 3: Set up state for status messages
  const [error, setError] = useState(""); // Shows error messages
  const [saving, setSaving] = useState(false); // Shows if we're saving

  // STEP 4: Function that runs when we click "Save"
  async function handleSave() {
    // Check if we selected a lead
    if (!leadId) {
      setError("Please choose a lead.");
      return; // Stop the function here
    }

    // Check if we entered any details
    if (!remarks.trim()) {
      setError("Please enter activity details.");
      return; // Stop the function here
    }

    // Start saving...
    setSaving(true);
    setError("");

    try {
      // Call the onSave function that was passed from the parent
      await onSave(
        Number(leadId), // Convert leadId to a number
        activityType,
        remarks.trim(),
        date,
      );
      // If successful, the parent component will close the modal
    } catch (error) {
      // If there's an error, show it
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Could not save activity.");
      }
      setSaving(false); // Stop showing "Saving..."
    }
  }

  // STEP 5: Show the modal on the screen
  return (
    // This creates a dark overlay that covers the entire screen
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      {/* This is the white modal box that appears on top */}
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        {/* HEADER: Title and close button */}
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-800">Add Activity</h2>
          <button onClick={onClose} className="text-2xl text-gray-500">
            × {/* This is the close (X) button */}
          </button>
        </div>

        {/* FORM: All the input fields */}
        <div className="space-y-4">
          {/* LEAD dropdown: Choose which lead this activity is for */}
          <div>
            <label className="text-sm font-semibold text-gray-700">Lead</label>
            <select
              value={leadId}
              onChange={(e) => setLeadId(e.target.value)}
              className="mt-2 w-full rounded-lg border p-3"
            >
              <option value="">Choose a lead</option>
              {leads.map((lead) => (
                <option key={lead.id} value={lead.id}>
                  {lead.organizationName}
                </option>
              ))}
            </select>
          </div>

          {/* ACTIVITY TYPE dropdown: Choose what kind of activity */}
          <div>
            <label className="text-sm font-semibold text-gray-700">
              Activity Type
            </label>
            <select
              value={activityType}
              onChange={(e) => setActivityType(e.target.value as ActivityType)}
              className="mt-2 w-full rounded-lg border p-3"
            >
              <option value="MEETING">Meeting</option>
              <option value="CALL">Call</option>
              <option value="EMAIL">Email</option>
              <option value="FOLLOW_UP">Follow-up</option>
            </select>
          </div>

          {/* DATE picker: When is this activity? */}
          <div>
            <label className="text-sm font-semibold text-gray-700">
              Next Action Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="mt-2 w-full rounded-lg border p-3"
            />
          </div>

          {/* DETAILS textarea: Notes about the activity */}
          <div>
            <label className="text-sm font-semibold text-gray-700">
              Details
            </label>
            <textarea
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              placeholder="Enter activity details..."
              className="mt-2 min-h-24 w-full rounded-lg border p-3"
            />
          </div>
        </div>

        {/* ERROR MESSAGE: Show if there's a problem */}
        {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

        {/* BUTTONS: Cancel and Save */}
        <div className="mt-6 flex justify-end gap-3">
          <button onClick={onClose} className="rounded-lg border px-4 py-2">
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="rounded-lg bg-green-700 px-4 py-2 text-white disabled:opacity-60"
          >
            {saving ? "Saving..." : "Add Activity"}
          </button>
        </div>
      </div>
    </div>
  );
}
