type DueLead = {
  id: number;
  name?: string;
  company?: string;
  phone?: string;
  email?: string;
  dueDate?: string;
};

type ActionQueueProps = {
  dueLeads: DueLead[];
};

export default function ActionQueue({ dueLeads }: ActionQueueProps) {
  return (
    <section className="h-[277px] rounded-xl border border-gray-200 bg-white p-5">
      <h2 className="text-base font-bold text-[#17201c]">Action queue</h2>

      <p className="mt-1 text-xs text-gray-500">
        Due today and overdue follow-ups
      </p>

      <div className="mt-4">
        {dueLeads.length === 0 ? (
          <div className="flex h-[190px] items-center justify-center">
            <p className="text-sm text-gray-500">You are all caught up.</p>
          </div>
        ) : (
          <div className="max-h-[190px] space-y-2 overflow-y-auto">
            {dueLeads.map((lead) => (
              <div
                key={lead.id}
                className="rounded-lg border border-gray-100 bg-gray-50 px-4 py-3"
              >
                <p className="text-sm font-semibold text-[#17201c]">
                  {lead.name ?? "Unnamed lead"}
                </p>

                {lead.company && (
                  <p className="mt-1 text-xs text-gray-500">{lead.company}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
