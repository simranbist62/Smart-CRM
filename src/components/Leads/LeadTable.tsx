"use client";

type Lead = {
  id: number;
  school: string;
  source: string;
  contact: string;
  phone: string;
  status: string;
  score: string;
  assignedTo: string;
  nextAction: string;
};

type LeadTableProps = {
  leads: Lead[];
  onEdit: (lead: Lead) => void;
};

export default function LeadTable({
  leads,
  onEdit,
}: LeadTableProps) {
  return (
    <div className="mx-6 overflow-x-auto rounded-xl border border-gray-200 bg-white">
      
      <table className="w-full min-w-[900px]">
        
        <thead className="bg-gray-100">
          <tr className="text-left text-xs uppercase tracking-wide text-gray-600">
            <th className="px-4 py-4">School / Lead</th>
            <th className="px-4 py-4">Contact</th>
            <th className="px-4 py-4">Status</th>
            <th className="px-4 py-4">Score</th>
            <th className="px-4 py-4">Assigned To</th>
            <th className="px-4 py-4">Next Action</th>
            <th className="px-4 py-4">Edit</th>
          </tr>
        </thead>

        <tbody>
          {leads.map((lead) => (
            <tr
              key={lead.id}
              className="border-t border-gray-200 text-sm text-black hover:bg-gray-50"
            >
              
              <td className="px-4 py-4">
                <p className="font-semibold">{lead.school}</p>
                <p className="text-xs text-gray-500">{lead.source}</p>
              </td>

              <td className="px-4 py-4">
                <p>{lead.contact}</p>
                <p className="text-xs text-gray-500">{lead.phone}</p>
              </td>

              <td className="px-4 py-4">
                <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800">
                  {lead.status}
                </span>
              </td>

              <td className="px-4 py-4">
                <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800">
                  {lead.score}
                </span>
              </td>

              <td className="px-4 py-4">
                {lead.assignedTo}
              </td>

              <td className="px-4 py-4">
                {lead.nextAction}
              </td>

              <td className="px-4 py-4">
                <button
                  onClick={() => onEdit(lead)}
                  className="rounded-md border border-gray-300 px-3 py-1 text-sm hover:bg-gray-100"
                >
                  Edit
                </button>
              </td>

            </tr>
          ))}
        </tbody>

      </table>

    </div>
  );
}