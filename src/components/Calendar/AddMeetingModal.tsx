"use client";

import { useState } from "react";
import type { Meeting } from "./CalendarGrid";

// Props that this modal receives from the parent component
type AddMeetingModalProps = {
  meeting: Meeting | null;        // Existing meeting when editing
  onClose: () => void;             // Function to close the modal
  onSave: (meeting: Meeting) => void; // Function to save the meeting
};

export default function AddMeetingModal({
  meeting,
  onClose,
  onSave,
}: AddMeetingModalProps) {

  // Store the day entered by the user
  // If editing, use the existing meeting day
  // Otherwise, use 18 as the default day
  const [day, setDay] = useState(
    String(meeting?.day || 18)
  );

  // Store the activity/meeting title
  const [title, setTitle] = useState(
    meeting?.title || ""
  );

  // Store the meeting type
  const [type, setType] = useState<Meeting["type"]>(
    meeting?.type || "meeting"
  );

  // This function runs when the user clicks Save/Add
  function handleSubmit() {

    // Do nothing if the title is empty
    if (!title.trim()) {
      return;
    }

    // Create the meeting object
    const newMeeting: Meeting = {
      // If editing, keep the old ID
      // If adding, create a new ID
      id: meeting?.id || Date.now(),

      // Convert the day from string to number
      day: Number(day),

      // Remove unnecessary spaces from the title
      title: title.trim(),

      // Save the selected meeting type
      type: type,
    };

    // Send the meeting back to the parent component
    onSave(newMeeting);
  }

  return (
    // Dark background behind the modal
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0b1f16]/50 px-4">

      {/* Modal box */}
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">

        {/* Header */}
        <div className="mb-5 flex items-center justify-between">

          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-[#397b65]">
              August 2026
            </p>

            <h2 className="mt-1 text-xl font-bold text-[#202520]">
              {meeting ? "Edit activity" : "Add activity"}
            </h2>
          </div>

          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="text-2xl text-[#69756e] hover:text-[#202520]"
            aria-label="Close"
          >
            &times;
          </button>
        </div>

        {/* Form fields */}
        <div className="space-y-4">

          {/* Activity name */}
          <label className="block text-sm font-semibold text-[#37403a]">
            Activity name

            <input
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="e.g. Demo with Sunrise School"
              className="mt-2 w-full rounded-lg border border-[#dfe4de] p-3 text-sm outline-none focus:border-[#397b65]"
            />
          </label>

          {/* Day and Type */}
          <div className="grid grid-cols-2 gap-3">

            
            <label className="text-sm font-semibold text-[#37403a]">
              Day

              <input
                type="number"
                min="1"
                max="31"
                value={day}
                onChange={(event) => setDay(event.target.value)}
                className="mt-2 w-full rounded-lg border border-[#dfe4de] p-3 text-sm outline-none focus:border-[#397b65]"
              />
            </label>

            {/* Type dropdown */}
            <label className="text-sm font-semibold text-[#37403a]">
              Type

              <select
                value={type}
                onChange={(event) =>
                  setType(event.target.value as Meeting["type"])
                }
                className="mt-2 w-full rounded-lg border border-[#dfe4de] bg-white p-3 text-sm outline-none focus:border-[#397b65]"
              >
                <option value="meeting">
                  Online meeting
                </option>

                <option value="follow-up">
                  Follow-up
                </option>
              </select>
            </label>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex justify-end gap-3">

          {/* Cancel button */}
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-[#dfe4de] px-4 py-2 text-sm font-semibold text-[#37403a]"
          >
            Cancel
          </button>

          {/* Save/Add button */}
          <button
            type="button"
            onClick={handleSubmit}
            className="rounded-lg bg-[#397b65] px-4 py-2 text-sm font-semibold text-white hover:bg-[#2f6754]"
          >
            {meeting ? "Save changes" : "Add activity"}
          </button>

        </div>
      </div>
    </div>
  );
}