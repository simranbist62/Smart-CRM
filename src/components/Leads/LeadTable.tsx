"use client";

import type { Lead } from "@/src/lib/leads-api";

// Props for the component
type Props = {
  leads: Lead[];
  onEdit: (lead: Lead) => void;
};

export default function LeadTable({ leads, onEdit }: Props) {
  return (
    <div className="mx-6 overflow-x-auto rounded-xl border border-gray-200 bg-white">
      <table className="w-full min-w-[850px]">
        {/* Table Header */}
        <thead className="bg-gray-100">
          <tr className="text-left text-xs uppercase tracking-wide text-gray-600">
            <th className="px-4 py-4">School / Lead</th>
            <th className="px-4 py-4">Contact</th>
            <th className="px-4 py-4">Status</th>
            <th className="px-4 py-4">Priority</th>
            <th className="px-4 py-4">Assigned to</th>
            <th className="px-4 py-4">Next Action</th>
            <th className="px-4 py-4">Edit</th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {leads.map((lead) => (
            <tr
              key={lead.id}
              className="border-t border-gray-200 text-sm text-black hover:bg-gray-50"
            >
              {/* School / Lead */}
              <td className="px-4 py-4">
                <p className="font-semibold">{lead.organizationName}</p>

                <p className="text-xs text-gray-500">
                  {lead.source || "No source"}
                </p>
              </td>

              {/* Contact */}
              <td className="px-4 py-4">
                <p>{lead.contactName}</p>

                <p className="text-xs text-gray-500">{lead.phone}</p>
              </td>

              {/* Status */}
              <td className="px-4 py-4">
                <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800">
                  {lead.status.replaceAll("_", " ")}
                </span>
              </td>

              {/* Priority */}
              <td className="px-4 py-4">{lead.priority || "—"}</td>

              {/* Assigned To */}
              <td className="px-4 py-4">
                {lead.assignedToName || lead.assignedToId || "Unassigned"}
              </td>

              {/* Next Action */}
              <td className="px-4 py-4">
                {lead.nextActionDate || "Not scheduled"}
              </td>

              {/* Edit Button */}
              <td className="px-4 py-4">
                <button
                  onClick={() => onEdit(lead)}
                  className="rounded-md border border-gray-300 px-3 py-1 hover:bg-gray-100"
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}

          {/* No Leads */}
          {leads.length === 0 && (
            <tr>
              <td colSpan={7} className="px-4 py-8 text-center text-gray-500">
                No leads found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
