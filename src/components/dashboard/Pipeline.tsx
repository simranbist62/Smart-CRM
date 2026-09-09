type PipelineStatus = {
  label: string;
  value: number;
};

type PipelineProps = {
  data?: PipelineStatus[];
};

export default function Pipeline({ data = [] }: PipelineProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-xl mt-6">
      <h2 className="text-xl font-bold text-black">Pipeline Health</h2>
      <p className="text-gray-500 mb-6">Leads by current status</p>

      {data.map((item) => (
        <div className="mb-4" key={item.label}>
          <div className="flex justify-between font-bold mb-1 text-black">
            <span>{item.label.replaceAll("_", " ")}</span>
            <span>{item.value}</span>
          </div>

          <div className="h-2 w-full rounded-full bg-gray-200">
            <div
              className="h-2 rounded-full bg-green-700"
              style={{ width: `${item.value}%` }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
}
