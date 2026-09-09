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

const stages = [
  { label: "New lead", value: "NEW_LEAD" },
  { label: "In progress", value: "IN_PROGRESS" },
  { label: "Likely / Warm", value: "LIKELY_WARM" },
  { label: "On hold", value: "ON_HOLD" },
  { label: "Converted", value: "CONVERTED" },
  { label: "Not interested", value: "NOT_INTERESTED" },
];

export default function LeadCard({ lead }: { lead: Lead }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600">
          {lead.leadType}
        </span>

        <span className="text-xs font-medium text-gray-500">
          {lead.priority || "No priority"}
        </span>
      </div>

      <h3 className="mt-4 text-base font-bold leading-5 text-gray-900">
        {lead.organizationName}
      </h3>

      <p className="mt-2 text-sm leading-5 text-gray-500">
        {lead.notes || `Follow up with ${lead.designation || "contact"}`}
      </p>

      <div className="mt-5 flex items-center justify-between gap-3">
        <p className="min-w-0 truncate text-xs text-gray-500">
          {lead.assignedTo?.name || "Unassigned"}
        </p>

        <select
          value={lead.status}
          onChange={(e) => console.log(e.target.value)}
          className="w-[125px] rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-medium text-gray-700 outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600"
        >
          {stages.map((stage) => (
            <option key={stage.value} value={stage.value}>
              {stage.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
