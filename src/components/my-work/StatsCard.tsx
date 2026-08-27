const stats = [
  { title: "Assigned leads", value: "0" },
  { title: "Follow-ups", value: "0" },
  { title: "Meetings", value: "0" },
  { title: "Converted", value: "0", type: "green" },
  { title: "Overdue", value: "0", type: "red" },
];

export default function StatCards() {
  return (
    <div className="grid grid-cols-5 gap-3">
      {stats.map((stat) => (
        <div
          key={stat.title}
          className={`rounded-xl border border-gray-200 bg-white px-4 py-4 ${
            stat.type === "green"
              ? "border-t-2 border-t-[#347a61]"
              : stat.type === "red"
                ? "border-t-2 border-t-[#c94d45]"
                : ""
          }`}
        >
          <p className="text-xs text-gray-500">{stat.title}</p>

          <p className="mt-3 text-3xl font-semibold text-[#17201c]">
            {stat.value}
          </p>
        </div>
      ))}
    </div>
  );
}
