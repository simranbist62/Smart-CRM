"use client";

type LeadFiltersProps = {
  search: string;
  setSearch: (value: string) => void;
  status: string;
  setStatus: (value: string) => void;
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
      
      <input
        type="text"
        placeholder="Search school, contact or phone..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-black outline-none focus:border-green-600 md:max-w-xl"
      />

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="rounded-lg border border-gray-200 bg-white px-4 py-3 text-black outline-none focus:border-green-600"
      >
        <option value="All">All statuses</option>
        <option value="New">New</option>
        <option value="Converted">Converted</option>
        <option value="Likely / Warm">Likely / Warm</option>
        <option value="Lost">Lost</option>
      </select>

      <p className="ml-auto whitespace-nowrap text-sm text-gray-500">
        {totalLeads} leads
      </p>

    </div>
  );
}