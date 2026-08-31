"use client";

const teamMembers = [
  {
    rank: 1,
    initials: "PB",
    name: "Preeti Bachhar",
    designation: "Sales Executive",
    assigned: 103,
    followUps: 92,
    meetings: 14,
    converted: 4,
    score: 107.4,
  },
  {
    rank: 2,
    initials: "RC",
    name: "Ramesh Chaudhary",
    designation: "Sales Executive",
    assigned: 36,
    followUps: 3,
    meetings: 0,
    converted: 15,
    score: 32.9,
  },
  {
    rank: 3,
    initials: "RC",
    name: "Raj Chaudhary",
    designation: "Sales Executive",
    assigned: 4,
    followUps: 0,
    meetings: 0,
    converted: 2,
    score: 10,
  },
  {
    rank: 4,
    initials: "SM",
    name: "Sales Manager",
    designation: "Sales Manager",
    assigned: 0,
    followUps: 0,
    meetings: 0,
    converted: 0,
    score: 0,
  },
  {
    rank: 5,
    initials: "RS",
    name: "Renuka Shrestha",
    designation: "Sales Executive",
    assigned: 12,
    followUps: 0,
    meetings: 0,
    converted: 0,
    score: 0,
  },
];

export default function LeaderboardTable() {
  return (
    <div className="rounded-xl bg-white p-6 shadow-sm">
      
      <h2 className="text-xl font-bold text-gray-900">
        Monthly team performance
      </h2>

      <p className="mt-1 text-sm text-gray-500">
        Balanced score from targets, follow-ups, meetings and conversions
      </p>

      <div className="mt-6 overflow-x-auto">
        
        <div className="min-w-[900px]">
          
          {/* Table headings */}
          <div className="grid grid-cols-7 rounded-lg bg-[#f1f4ef] px-4 py-3 text-xs font-medium uppercase text-gray-500">
            <div>Rank</div>
            <div>Staff Member</div>
            <div>Assigned</div>
            <div>Follow-ups</div>
            <div>Meetings</div>
            <div>Converted</div>
            <div>Score</div>
          </div>

          {/* Team members */}
          {teamMembers.map((member) => (
            <div
              key={member.rank}
              className="grid grid-cols-7 items-center border-b border-gray-100 px-4 py-4"
            >
              
              <div className="font-semibold text-[#c59627]">
                {member.rank}
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e5eee9] text-sm font-bold text-[#4d8068]">
                  {member.initials}
                </div>

                <div>
                  <p className="font-semibold text-gray-900">
                    {member.name}
                  </p>

                  <p className="text-xs text-gray-500">
                    {member.designation}
                  </p>
                </div>
              </div>

              <div>{member.assigned}</div>

              <div>{member.followUps}</div>

              <div>{member.meetings}</div>

              <div>{member.converted}</div>

              <div className="font-semibold text-[#4d8068]">
                {member.score}
              </div>

            </div>
          ))}

        </div>
      </div>
    </div>
  );
}