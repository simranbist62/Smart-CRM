"use client";

import {
  leadStatuses,
  type LeadStatus,
} from "@/src/lib/leads-store";

// Props received from the parent component
type LeadFiltersProps = {
  search: string;
  setSearch: (value: string) => void;
  status: LeadStatus | "All";
  setStatus: (value: LeadStatus | "All") => void;
  totalLeads: number;
};

export default function LeadFilters({
  search,
  setSearch,
  status,
  setStatus,
  totalLeads,
}: LeadFiltersProps) {
  return (
    <div className="flex flex-col gap-4 px-6 py-6 md:flex-row md:items-center">

      {/* Search box */}
      <input
        type="text"
        placeholder="Search school, contact or phone..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-black outline-none focus:border-green-600 md:max-w-xl"
      />

      {/* Status filter */}
      <select
        value={status}
        onChange={(e) =>
          setStatus(e.target.value as LeadStatus | "All")
        }
        className="rounded-lg border border-gray-200 bg-white px-4 py-3 text-black outline-none focus:border-green-600"
      >
        <option value="All">All statuses</option>

        {leadStatuses.map((statusName) => (
          <option key={statusName} value={statusName}>
            {statusName.replaceAll("_", " ")}
          </option>
        ))}
      </select>

      {/* Total leads */}
      <p className="ml-auto whitespace-nowrap text-sm text-gray-500">
        {totalLeads} leads
      </p>

    </div>
  );
}
