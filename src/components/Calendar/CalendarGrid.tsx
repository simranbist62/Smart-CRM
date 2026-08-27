"use client";

// Meeting data type
export type Meeting = {
  id: number;
  date: string;
  day: number;
  title: string;
  type: "meeting" | "follow-up";
};

// Props received by CalendarGrid
type CalendarGridProps = {
  meetings: Meeting[];
  currentDate: Date;
  onMeetingClick: (meeting: Meeting) => void;
};


const weekDays = [
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
];

export default function CalendarGrid({
  meetings,
  currentDate,
  onMeetingClick,
}: CalendarGridProps) {

  const firstDay = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  const totalDays = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  // Create 42 calendar boxes
  // 42 boxes = 6 rows × 7 days
  const cells = Array.from(
    { length: 42 },
    (_, index) => {

      // Calculate which day belongs in this box
      const day = index - firstDay + 1;

      // If the number is between 1 and 31,
      // show the day. Otherwise show an empty box.
      if (day > 0 && day <= totalDays) {
        return day;
      }

      return null;
    }
  );

  return (
    // Main calendar container
    <div className="overflow-x-auto rounded-xl border border-[#dfe4de] bg-white shadow-sm">

      {/* Keeps the calendar wide enough on small screens */}
      <div className="min-w-[760px]">

        {/* Weekday header */}
        <div className="grid grid-cols-7 border-b border-[#dfe4de] bg-[#eef2ed]">

          {weekDays.map((day) => (
            <div
              key={day}
              className="px-3 py-3 text-[10px] font-bold uppercase tracking-wide text-[#69756e]"
            >
              {day}
            </div>
          ))}

        </div>

        {/* Calendar days */}
        <div className="grid grid-cols-7">

          {cells.map((day, index) => {

            // Find meetings that belong to this day
            const dateKey = day
              ? `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
              : "";

            const dayMeetings = day
              ? meetings.filter(
                  (meeting) => meeting.date === dateKey
                )
              : [];

            const isToday =
              currentDate.getFullYear() === 2026 &&
              currentDate.getMonth() === 7 &&
              day === 18;

            return (
              <div
                key={index}
                className="min-h-[126px] border-b border-r border-[#dfe4de] p-2"
              >

                {/* Day number */}
                {day && (
                  <div
                    className={`mb-2 flex h-6 w-6 items-center justify-center text-xs font-bold ${
                      isToday
                        ? "rounded-full bg-[#397b65] text-white"
                        : "text-[#37403a]"
                    }`}
                  >
                    {day}
                  </div>
                )}

                {/* Meetings inside the day */}
                <div className="space-y-1">

                  {/* Show maximum 3 meetings */}
                  {dayMeetings
                    .slice(0, 3)
                    .map((meeting) => (

                      <button
                        key={meeting.id}
                        type="button"
                        onClick={() => onMeetingClick(meeting)}
                        className={`block w-full truncate rounded-r-md border-l-2 px-2 py-1.5 text-left text-[9px] transition hover:brightness-95 ${
                          meeting.type === "follow-up"
                            ? "border-[#397b65] bg-[#e8f3ee] text-[#315d4e]"
                            : "border-[#d9a441] bg-[#fff6e2] text-[#554922]"
                        }`}
                      >

                        {/* Meeting type */}
                        <span className="block font-bold uppercase">
                          {meeting.type === "follow-up"
                            ? "Follow-up"
                            : "Online meeting"}
                        </span>

                        {/* Meeting title */}
                        <span className="block truncate">
                          {meeting.title}
                        </span>

                      </button>
                    ))}

                  {/* Show remaining meetings */}
                  {dayMeetings.length > 3 && (
                    <p className="px-2 pt-1 text-[10px] text-[#778079]">
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