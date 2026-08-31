// Displays the current workload assigned to each team member
type teamWorkLoad = {
  label: string;
  value: number;
};

type teamProps = {
  data?: teamWorkLoad[];
};
export default function TeamWorkload({ data = [] }: teamProps) {
  return (
    <div className="mt-6 w-full max-w-xl rounded-lg bg-white p-6 shadow-md">
      {/* Section title */}
      <h2 className="text-xl font-bold text-black">Team Workload</h2>

      {/* Short description */}
      <p className="mb-6 text-gray-500">Active lead ownership</p>

      {data.map((item) => (
        <div className="mb-4" key={item.label}>
          <div className="mb-1 flex justify-between font-bold text-black">
            <span>{item.label}</span>
            <span>{item.value}</span>
          </div>

          {/* Workload progress bar */}
          <div className="h-2 w-full rounded-full bg-gray-200">
            <div
              className="h-2 rounded-full bg-[#5633a1]"
              style={{ width: `${item.value}%` }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
}
