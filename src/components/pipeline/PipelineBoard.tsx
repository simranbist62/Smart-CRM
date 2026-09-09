import LeadCard from "./LeadCard";

type Lead = {
  id: number;
  organizationName: string;
  contactName: string | null;
  designation: string | null;
  phone: string | null;
  priority: string | null;
  leadType: string;
  status: string;
  notes: string | null;
  assignedTo: {
    id: number;
    name: string;
    email: string;
    role: string;
  } | null;
};

type PipelineData = {
  NEW_LEAD: Lead[];
  IN_PROGRESS: Lead[];
  LIKELY_WARM: Lead[];
  ON_HOLD: Lead[];
  CONVERTED: Lead[];
  NOT_INTERESTED: Lead[];
};

const stages = [
  { label: "New Lead", value: "NEW_LEAD" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Likely / Warm", value: "LIKELY_WARM" },
  { label: "On Hold", value: "ON_HOLD" },
  { label: "Converted", value: "CONVERTED" },
  { label: "Not Interested", value: "NOT_INTERESTED" },
];

export default function PipelineBoard({ data }: { data: PipelineData | null }) {
  if (!data) {
    return null;
  }

  return (
    <div className="mt-6 w-full overflow-x-auto pb-4">
      <div className="flex min-w-max gap-5">
        {stages.map((stage) => {
          const leads = data[stage.value as keyof PipelineData] || [];

          return (
            <div key={stage.value} className="w-[280px] shrink-0">
              {/* Column header */}
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-sm font-bold text-gray-800">
                  {stage.label}
                </h2>

                <span className="rounded-full bg-gray-200 px-2.5 py-1 text-xs font-semibold text-gray-600">
                  {leads.length}
                </span>
              </div>

              {/* Cards */}
              <div className="space-y-3">
                {leads.map((lead) => (
                  <LeadCard key={lead.id} lead={lead} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
