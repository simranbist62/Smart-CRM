import LeadCard from "./LeadCard";
import { leads } from "./leads";

export default function PipelineBoard() {
  const stages = [
    { name: "NEW LEAD", count: 73 },
    { name: "IN PROGRESS", count: 16 },
    { name: "LIKELY / WARM", count: 6 },
    { name: "ON HOLD", count: 4 },
    { name: "CONVERTED", count: 21 },
    { name: "UNSPECIFIED", count: 29 },
    { name: "NOT INTERESTED", count: 35 },
  ];

  return (
    <div className="flex gap-4 overflow-x-auto mt-6">
      {stages.map((stage) => (
        <div key={stage.name} className=" min-w-64 rounded-2xl bg-gray-100 p-4">
          <div className="flex justify-between">
            <h2 className="text-sm font-semibold text-black">{stage.name}</h2>

            <p className="flex text-lg justify-center items-center h-7 w-7 font-bold text-black rounded-full bg-white">
              {stage.count}
            </p>
          </div>

          {/* Lead Cards */}
          <div className="mt-4 space-y-3 text-black">
            {leads
              .filter((lead) => lead.stage.toUpperCase() === stage.name)
              .map((lead) => (
                <LeadCard key={lead.id} lead={lead} />
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}
