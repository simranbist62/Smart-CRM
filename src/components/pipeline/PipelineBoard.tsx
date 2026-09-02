import { Role } from "@/src/context/RoleContext";
import LeadCard from "./LeadCard";
import { leads } from "./leads";

type PipelineBoardProps = {
  viewingAs: Role;
};

export default function PipelineBoard({ viewingAs }: PipelineBoardProps) {
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
    <div className="mt-6 flex gap-4 overflow-x-auto">
      {stages.map((stage) => (
        <div key={stage.name} className="min-w-64 rounded-2xl bg-gray-100 p-4">
          <div className="flex justify-between">
            <h2 className="text-sm font-semibold text-black">{stage.name}</h2>

            <p className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-lg font-bold text-black">
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
