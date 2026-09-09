// Shows where the leads are coming from
type leadSource = {
  label: string;
  value: number;
};

type sourceProps = {
  data?: leadSource[];
};

export default function LeadSources({ data = [] }: sourceProps) {
  return (
    <div className="mt-6 w-[75%] max-w-lg rounded-lg bg-white p-6 shadow-md">
      {/* Section title */}
      <h2 className="text-xl font-bold text-black">Lead Sources</h2>

      {/* Short description */}
      <p className="mb-6 text-gray-500">Where opportunities originate</p>

      {data.map((item) => (
        <div className="mb-4" key={item.label}>
          <div className="mb-1 flex justify-between font-bold text-black">
            <span>{item.label}</span>
            <span>{item.value}</span>
          </div>

          {/* Progress bar */}
          <div className="h-2 w-full rounded-full bg-gray-200">
            <div
              className="h-2 rounded-full bg-[#4b707d]"
              style={{ width: `${item.value}%` }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
}
