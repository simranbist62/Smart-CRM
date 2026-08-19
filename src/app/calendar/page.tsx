"use client";

import { useState } from "react";

// Layout components
import Navbar from "../../components/layout/Navbar";
import Sidebar from "../../components/layout/Sidebar";

// Calendar components
import AddMeetingModal from "../../components/Calendar/AddMeetingModal";
import CalendarGrid, {
  type Meeting,
} from "../../components/Calendar/CalendarGrid";


// --------------------------------------------------
// Starting meetings
// --------------------------------------------------

const startingMeetings: Meeting[] = [
  {
    id: 1,
    day: 2,
    title: "Shree Laxmanghat Secondary School",
    type: "meeting",
  },
  {
    id: 2,
    day: 2,
    title: "Himanchal boarding school",
    type: "meeting",
  },
  {
    id: 3,
    day: 2,
    title: "Babal little",
    type: "meeting",
  },

  {
    id: 4,
    day: 3,
    title: "BalBinayak English Boarding School",
    type: "meeting",
  },
  {
    id: 5,
    day: 3,
    title: "BalBrilliant United Public School",
    type: "meeting",
  },
  {
    id: 6,
    day: 3,
    title: "New vision academy",
    type: "meeting",
  },

  {
    id: 7,
    day: 4,
    title: "new vision academy",
    type: "meeting",
  },
  {
    id: 8,
    day: 4,
    title: "Sahamat Smart School",
    type: "meeting",
  },
  {
    id: 9,
    day: 4,
    title: "Linh Son Buddhist School",
    type: "meeting",
  },

  {
    id: 10,
    day: 5,
    title: "Rastra Nirman School",
    type: "follow-up",
  },
  {
    id: 11,
    day: 5,
    title: "Mahakavi Devkota School",
    type: "meeting",
  },

  {
    id: 12,
    day: 9,
    title: "Pashupati Shikshya mandir",
    type: "meeting",
  },
  {
    id: 13,
    day: 22,
    title: "Everest Secondary Academy",
    type: "follow-up",
  },
];


// --------------------------------------------------
// Calendar Page
// --------------------------------------------------

export default function CalendarPage() {

  const initialDate = new Date(2026, 7, 1);
  const [currentDate, setCurrentDate] = useState(initialDate);

  // Store all meetings
  const [meetings, setMeetings] =
    useState<Meeting[]>(startingMeetings);

  // Controls whether the modal is visible
  const [showModal, setShowModal] =
    useState(false);

  // Stores the meeting currently being edited
  // null means we are adding a new meeting
  const [editingMeeting, setEditingMeeting] =
    useState<Meeting | null>(null);


  // --------------------------------------------------
  // Open modal for a new meeting
  // --------------------------------------------------

  function openNewMeeting() {
    // No meeting is being edited
    setEditingMeeting(null);

    // Show the modal
    setShowModal(true);
  }


  // --------------------------------------------------
  // Save a meeting
  // --------------------------------------------------

  function saveMeeting(meeting: Meeting) {

    setMeetings((currentMeetings) => {

      // Check if this meeting already exists
      const meetingExists = currentMeetings.some(
        (item) => item.id === meeting.id
      );


      // If meeting exists, update it
      if (meetingExists) {
        return currentMeetings.map((item) =>
          item.id === meeting.id
            ? meeting
            : item
        );
      }


      // If meeting does not exist,
      // add the new meeting to the list
      return [
        ...currentMeetings,
        meeting,
      ];
    });


    // Close the modal
    setShowModal(false);

    // Clear the editing meeting
    setEditingMeeting(null);
  }

  function goToPreviousMonth() {
    setCurrentDate((date) =>
      new Date(date.getFullYear(), date.getMonth() - 1, 1)
    );
  }

  function goToNextMonth() {
    setCurrentDate((date) =>
      new Date(date.getFullYear(), date.getMonth() + 1, 1)
    );
  }

  function goToToday() {
    setCurrentDate(new Date(2026, 7, 1));
  }

  const monthLabel = currentDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });


  // --------------------------------------------------
  // Render page
  // --------------------------------------------------

  return (
    <div className="min-h-screen bg-[#f7f8f5]">

      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <main className="lg:ml-64">

        {/* Navbar */}
        <Navbar
          onAddLead={openNewMeeting}
          actionLabel="Add meeting"
        />


        {/* Page content */}
        <section className="px-4 py-8 sm:px-8 lg:px-9">

          {/* Page header */}
          <div className="mb-5 flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">

            {/* Title section */}
            <div>

              <span className="inline-block rounded-full bg-[#e4f2ec] px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#397b65]">
                New concept
              </span>

              <h2 className="mt-3 text-2xl font-bold text-[#202520] sm:text-3xl">
                {monthLabel}
              </h2>

              <p className="mt-1 text-sm text-[#778079]">
                {meetings.length} activities and follow-ups scheduled
              </p>


              {/* Calendar legend */}
              <div className="mt-4 flex gap-5 text-xs text-[#69756e]">

                <span>
                  <i className="mr-2 inline-block h-2 w-2 rounded-sm bg-[#397b65]" />
                  Follow-up
                </span>

                <span>
                  <i className="mr-2 inline-block h-2 w-2 rounded-sm bg-[#d9a441]" />
                  Meeting completed
                </span>

              </div>
            </div>


            {/* Calendar navigation buttons */}
            <div className="flex gap-2">

              <button
                type="button"
                onClick={goToPreviousMonth}
                className="rounded-lg border border-[#dfe4de] bg-white px-4 py-3 text-sm font-semibold text-[#37403a] shadow-sm"
              >
                Previous
              </button>

              <button
                type="button"
                onClick={goToToday}
                className="rounded-lg border border-[#dfe4de] bg-white px-5 py-3 text-sm font-semibold text-[#37403a] shadow-sm"
              >
                Today
              </button>

              <button
                type="button"
                onClick={goToNextMonth}
                className="rounded-lg border border-[#dfe4de] bg-white px-5 py-3 text-sm font-semibold text-[#37403a] shadow-sm"
              >
                Next
              </button>

            </div>

          </div>


          {/* Calendar */}
          <CalendarGrid
            meetings={meetings}
            currentDate={currentDate}
            onMeetingClick={(meeting) => {
              // Store the meeting that was clicked
              setEditingMeeting(meeting);

              // Open the modal
              setShowModal(true);
            }}
          />

        </section>
      </main>


      {/* Add/Edit Meeting Modal */}
      {showModal && (
        <AddMeetingModal
          meeting={editingMeeting}
          onClose={() => setShowModal(false)}
          onSave={saveMeeting}
        />
      )}

    </div>
  );
}