type MonthlyProgressProps = {
  performance: {
    leadsAdded: number;
    followUps: number;
    meetings: number;
    conversionRate: number;
  };
};

export default function MonthlyProgress({ performance }: MonthlyProgressProps) {
  const progressItems = [
    {
      title: "New leads",
      value: performance.leadsAdded.toString(),
      progress: "0%",
    },
    {
      title: "Follow-ups",
      value: performance.followUps.toString(),
      progress: "0%",
    },
    {
      title: "Meetings",
      value: performance.meetings.toString(),
      progress: "0%",
    },
    {
      title: "Conversion rate",
      value: `${performance.conversionRate}%`,
      progress: `${Math.min(performance.conversionRate, 100)}%`,
    },
  ];

  return (
    <section className="h-[277px] rounded-xl border border-gray-200 bg-white p-5">
      <h2 className="text-base font-bold text-[#17201c]">Monthly progress</h2>

      <p className="mt-1 text-xs text-gray-500">
        Achievement against assigned targets
      </p>

      <div className="mt-5 space-y-4">
        {progressItems.map((item) => (
          <div key={item.title}>
            <div className="mb-2 flex justify-between text-xs">
              <span className="text-[#17201c]">{item.title}</span>

              <span className="font-semibold text-[#17201c]">{item.value}</span>
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-[#e9ede9]">
              <div
                className="h-full rounded-full bg-[#347a61]"
                style={{ width: item.progress }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
