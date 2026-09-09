type Stats = {
  heading: string;
  number: number | string;
};

export default function PipelineSummary({ heading, number }: Stats) {
  return (
    <div className="w-full rounded-2xl border border-gray-200 bg-white px-7 py-6">
      <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
        NEW CONCEPT
      </span>

      <div className="mt-3 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Move opportunities through the funnel
          </h1>

          <p className="mt-1 text-gray-500">
            Track and manage your assigned opportunities.
          </p>
        </div>

        <div className="text-right">
          <p className="text-4xl font-bold text-green-700">{number}</p>

          <p className="text-xs font-semibold text-gray-500">{heading}</p>
        </div>
      </div>
    </div>
  );
}
