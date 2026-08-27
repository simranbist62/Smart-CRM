import { stages } from "./leads";

type Lead = {
  id: number;
  name: string;
  schoolName: string;
  status: string;
  complexity: string;
  slogan: string;
  stage: string;
};

export default function LeadCard({ lead }: { lead: Lead }) {
  return (
    <div className="rounded-xl bg-white p-4 shadow-sm border border-gray-200">
      {/* SchoolName */}
      <h3 className="text-sm font-semibold text-gray-900">{lead.schoolName}</h3>

      {/* Slogan */}
      <p className="mt-1 text-sm text-gray-500">{lead.slogan}</p>

      {/* Status + Complexity */}
      <div className="flex gap-2 mt-3">
        <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
          {lead.status}
        </span>

        <span className="rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-700">
          {lead.complexity}
        </span>
      </div>

      {/* Name */}
      <p className="mt-3 text-xs text-gray-600">{lead.name}</p>

      {/* Stage Dropdown */}
      <select
        value={lead.stage}
        onChange={(e) => console.log(e.target.value)}
        className="mt-4 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs text-gray-700 outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600"
      >
        {stages.map((stage) => (
          <option key={stage} value={stage}>
            {stage}
          </option>
        ))}
      </select>
    </div>
  );
}
