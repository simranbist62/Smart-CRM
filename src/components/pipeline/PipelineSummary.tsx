import { Role } from "@/src/context/RoleContext";

type PipelineSummaryProps = {
  viewingAs: Role;
};

export default function PipelineSummary({ viewingAs }: PipelineSummaryProps) {
  const title =
    viewingAs === "SALES"
      ? "Move your opportunities through the funnel"
      : "Move opportunities through the funnel";

  const description =
    viewingAs === "SALES"
      ? "Track and manage your assigned opportunities."
      : "Change a stage from each card. In the POC, updates persist in this browser.";

  return (
    <div className="w-full rounded-2xl border border-gray-200 bg-white px-7 py-6">
      <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
        NEW CONCEPT
      </span>

      <div className="mt-3 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>

          <p className="mt-1 text-gray-500">{description}</p>
        </div>

        <div className="text-right">
          <p className="text-4xl font-bold text-green-700">155</p>

          <p className="text-xs font-semibold text-gray-500">
            {viewingAs === "SALES" ? "MY LEADS" : "TOTAL LEADS"}
          </p>
        </div>
      </div>
    </div>
  );
}
