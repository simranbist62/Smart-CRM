"use client";

type LeadHeaderProps = {
  onAddLead: () => void;
};

export default function LeadHeader({ onAddLead }: LeadHeaderProps) {
  return (
    <div className="flex flex-col gap-4 border-b bg-white px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
      
      <div>
        <p className="text-sm font-semibold tracking-wider text-green-700">
          Interactive sales workspace
        </p>

        <h1 className="mt-1 text-3xl font-bold text-black">
          Leads
        </h1>
      </div>

      <div className="flex items-center gap-3">
        
        <span className="rounded-full border border-yellow-300 bg-yellow-50 px-4 py-2 text-sm font-semibold text-black">
          DEMO MODE
        </span>

        <button className="rounded-lg border bg-white px-4 py-2 text-xl text-black shadow-sm">
          🔔
        </button>

        <button
          onClick={onAddLead}
          className="rounded-lg bg-green-700 px-5 py-3 font-semibold text-white hover:bg-green-800"
        >
          + Add lead
                  </button>

      </div>
    </div>
  );
}