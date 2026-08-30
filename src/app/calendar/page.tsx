"use client";

import { useEffect, useMemo, useState } from "react";

import Navbar from "../../components/layout/Navbar";
import Sidebar from "../../components/layout/Sidebar";
import AddMeetingModal from "../../components/Calendar/AddMeetingModal";
import CalendarGrid, {
  type Meeting,
} from "../../components/Calendar/CalendarGrid";

import { addActivity, getLeads, type Lead } from "@/src/lib/leads-api";

export default function CalendarPage() {
  // Current month shown on the calendar
  const [currentDate, setCurrentDate] = useState(new Date());

  // Leads saved in this browser
  const [leads, setLeads] = useState<Lead[]>([]);

  // Controls the Add Activity modal
  const [showModal, setShowModal] = useState(false);

  // Stores error messages
  const [error, setError] = useState("");

  // Load leads when the page opens
  useEffect(() => {
    async function loadLeads() {
      try {
        const response = await getLeads({ size: 500 });
        setLeads(response.content ?? []);
      } catch (error) {
        console.error("Failed to load leads:", error);
      }
    }

    loadLeads();
  }, []);

  // Convert leads into calendar meetings
  const meetings = useMemo<Meeting[]>(() => {
    return leads
      .filter((lead) => lead.nextActionDate)
      .map((lead) => ({
        id: lead.id,
        date: lead.nextActionDate!,
        day: Number(lead.nextActionDate!.slice(-2)),
        title: lead.organizationName,
        type: "follow-up" as const,
      }));
  }, [leads]);

  // Save a new activity
  async function saveActivity(
    leadId: number,
    type: "CALL" | "MEETING" | "EMAIL" | "FOLLOW_UP",
    remarks: string,
    date: string,
  ) {
    try {
      const updatedLead = await addActivity(leadId, {
        type: type,
        remarks: remarks,
        occurredAt: new Date().toISOString().slice(0, 10),
        nextActionDate: date,
      });

      // Update the lead in the list
      setLeads((currentLeads) =>
        currentLeads.map((lead) => (lead.id === leadId ? updatedLead : lead)),
      );

      // Close the modal
      setShowModal(false);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Could not save activity.");
      }
    }
  }

  // Display current month and year
  const monthName = currentDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  // Go to previous month
  function goToPreviousMonth() {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1),
    );
  }

  // Go to next month
  function goToNextMonth() {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1),
    );
  }

  // Go to today's month
  function goToToday() {
    setCurrentDate(new Date());
  }

  return (
    <div className="min-h-screen bg-[#f7f8f5]">
      {/* Sidebar */}
      <Sidebar />

      <main className="lg:ml-64">
        {/* Navbar */}
        <Navbar
          onAddLead={() => setShowModal(true)}
          actionLabel="Add activity"
        />

        <section className="px-4 py-8 sm:px-8 lg:px-9">
          {/* Calendar heading and buttons */}
          <div className="mb-5 flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
            <div>
              <h2 className="text-3xl font-bold text-[#202520]">{monthName}</h2>

              <p className="mt-1 text-sm font-medium text-[#4c5d53]">
                {meetings.length} scheduled lead follow-ups
              </p>
            </div>

            {/* Calendar navigation */}
            <div className="flex gap-2">
              <button
                onClick={goToPreviousMonth}
                className="rounded-lg border border-[#b8c4ba] bg-white px-4 py-3 text-sm font-semibold text-[#17231c] shadow-sm transition hover:bg-[#eef2ed]"
              >
                Previous
              </button>

              <button
                onClick={goToToday}
                className="rounded-lg border border-[#b8c4ba] bg-white px-5 py-3 text-sm font-semibold text-[#17231c] shadow-sm transition hover:bg-[#eef2ed]"
              >
                Today
              </button>

              <button
                onClick={goToNextMonth}
                className="rounded-lg border border-[#b8c4ba] bg-white px-5 py-3 text-sm font-semibold text-[#17231c] shadow-sm transition hover:bg-[#eef2ed]"
              >
                Next
              </button>
            </div>
          </div>

          {/* Error message */}
          {error && (
            <p className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">
              {error}
            </p>
          )}

          {/* Calendar */}
          <CalendarGrid
            meetings={meetings}
            currentDate={currentDate}
            onMeetingClick={() => {}}
          />
        </section>
      </main>

      {/* Add Activity Modal */}
      {showModal && (
        <AddMeetingModal
          leads={leads}
          initialDate={currentDate}
          onClose={() => setShowModal(false)}
          onSave={saveActivity}
        />
      )}
    </div>
  );
}
