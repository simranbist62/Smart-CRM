// Displays the current workload assigned to each team member
export default function TeamWorkload() {
  return (
    <div className="mt-6 w-full max-w-xl rounded-lg bg-white p-6 shadow-md">

      {/* Section title */}
      <h2 className="text-xl font-bold text-black">
        Team Workload
      </h2>

      {/* Short description */}
      <p className="mb-6 text-gray-500">
        Active lead ownership
      </p>

      {/* Preeti's workload */}
      <div className="mb-4">
        <div className="mb-1 flex justify-between font-bold text-black">
          <span>Preeti Bachhar</span>
          <span>103</span>
        </div>

        {/* Workload progress bar */}
        <div className="h-2 w-full rounded-full bg-gray-200">
          <div className="h-2 w-full rounded-full bg-[#5633a1]"></div>
        </div>
      </div>

      {/* Ramesh's workload */}
      <div className="mb-4">
        <div className="mb-1 flex justify-between font-bold text-black">
          <span>Ramesh Chaudhary</span>
          <span>35</span>
        </div>

        <div className="h-2 w-full rounded-full bg-gray-200">
          <div className="h-2 w-[50%] rounded-full bg-[#5633a1]"></div>
        </div>
      </div>

      {/* Renuka's workload */}
      <div className="mb-4">
        <div className="mb-1 flex justify-between font-bold text-black">
          <span>Renuka Shrestha</span>
          <span>12</span>
        </div>

        <div className="h-2 w-full rounded-full bg-gray-200">
          <div className="h-2 w-[25%] rounded-full bg-[#5633a1]"></div>
        </div>
      </div>

      {/* Raj's workload */}
      <div>
        <div className="mb-1 flex justify-between font-bold text-black">
          <span>Raj Chaudhary</span>
          <span>4</span>
        </div>

        <div className="h-2 w-full rounded-full bg-gray-200">
          <div className="h-2 w-[10%] rounded-full bg-[#5633a1]"></div>
        </div>
      </div>

    </div>
  );
}