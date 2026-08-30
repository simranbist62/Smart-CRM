"use client";

// This is a simple definition of what a "Meeting" looks like
// It tells us that each meeting has:
// - id: a number
// - date: a string (like "2026-08-18")
// - day: a number
// - title: a string
// - type: either "meeting" or "follow-up"
export type Meeting = {
  id: number;
  date: string;
  day: number;
  title: string;
  type: "meeting" | "follow-up";
};

// These are the "props" or inputs that this component expects to receive
// - meetings: a list of meetings
// - currentDate: the month/year we are showing
// - onMeetingClick: a function that runs when you click a meeting
type CalendarGridProps = {
  meetings: Meeting[];
  currentDate: Date;
  onMeetingClick: (meeting: Meeting) => void;
};

// List of the 7 days of the week, starting with Sunday
const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// This is the main component that shows the calendar grid
export default function CalendarGrid({
  meetings,
  currentDate,
  onMeetingClick,
}: CalendarGridProps) {
  // Step 1: Find out what day of the week the 1st of the month is
  // Example: if the 1st is Wednesday, firstDay = 3 (since Sunday = 0)
  const firstDay = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  // Step 2: Find out how many days are in this month
  // Example: August has 31 days, so totalDays = 31
  const totalDays = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  // Step 3: Create 42 boxes (6 rows × 7 days = 42)
  // We use 42 because that's enough to cover any month
  const cells = Array.from({ length: 42 }, (_, index) => {
    // Calculate which day number goes in this box
    // If the 1st is Wednesday (firstDay = 3), then:
    // index 0 -> day = -2 (empty)
    // index 3 -> day = 1 (first day of month)
    const day = index - firstDay + 1;

    // If this day is between 1 and the total days in the month,
    // show the day number. Otherwise, show nothing (null)
    if (day > 0 && day <= totalDays) {
      return day;
    }
    return null;
  });

  // Step 4: Show the calendar on the screen
  return (
    // Outer container with border and shadow
    <div className="overflow-x-auto rounded-xl border border-[#dfe4de] bg-white shadow-sm">
      {/* Make sure the calendar is wide enough on small phone screens */}
      <div className="min-w-[760px]">
        {/* Weekday header row (Sun, Mon, Tue, etc.) */}
        <div className="grid grid-cols-7 border-b border-[#dfe4de] bg-[#eef2ed]">
          {weekDays.map((day) => (
            <div
              key={day}
              className="px-3 py-3 text-xs font-bold uppercase tracking-wide text-[#3f5147]"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar days grid (the actual dates) */}
        <div className="grid grid-cols-7">
          {cells.map((day, index) => {
            // If we have a day number, create a date string like "2026-08-18"
            const dateKey = day
              ? `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
              : "";

            // Find all meetings that happen on this day
            const dayMeetings = day
              ? meetings.filter((meeting) => meeting.date === dateKey)
              : [];

            // Check if this day is today (hardcoded to August 18, 2026)
            // This is just for demonstration
            const isToday =
              currentDate.getFullYear() === 2026 &&
              currentDate.getMonth() === 7 &&
              day === 18;

            return (
              <div
                key={index}
                className="min-h-[136px] border-b border-r border-[#dfe4de] bg-white p-3"
              >
                {/* Show the day number if it exists */}
                {day && (
                  <div
                    className={`mb-2 flex h-6 w-6 items-center justify-center text-xs font-bold ${
                      isToday
                        ? "rounded-full bg-[#397b65] text-white" // Highlight today
                        : "text-sm text-[#17231c]"
                    }`}
                  >
                    {day}
                  </div>
                )}

                {/* Show meetings for this day */}
                <div className="space-y-1">
                  {/* Show only the first 3 meetings */}
                  {dayMeetings.slice(0, 3).map((meeting) => (
                    <button
                      key={meeting.id}
                      type="button"
                      onClick={() => onMeetingClick(meeting)}
                      className={`block w-full truncate rounded-r-md border-l-4 px-2.5 py-2 text-left text-xs leading-5 transition hover:brightness-95 focus:outline-none focus:ring-2 focus:ring-[#397b65] focus:ring-offset-1 ${
                        meeting.type === "follow-up"
                          ? "border-[#397b65] bg-[#e8f3ee] text-[#315d4e]" // Green for follow-up
                          : "border-[#d9a441] bg-[#fff6e2] text-[#554922]" // Yellow for online meeting
                      }`}
                    >
                      {/* Show the type of meeting */}
                      <span className="block font-bold uppercase tracking-wide">
                        {meeting.type === "follow-up"
                          ? "Follow-up"
                          : "Online meeting"}
                      </span>

                      {/* Show the meeting title */}
                      <span className="block truncate">{meeting.title}</span>
                    </button>
                  ))}

                  {/* If there are more than 3 meetings, show "+X more" */}
                  {dayMeetings.length > 3 && (
                    <p className="px-2 pt-1 text-xs font-medium text-[#4c5d53]">
                      +{dayMeetings.length - 3} more
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}