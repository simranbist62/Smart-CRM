export default function Pipeline() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-xl mt-6">
      <h2 className="text-xl font-bold text-black">Pipeline Health</h2>
      <p className="text-gray-500 mb-6">Leads by current status</p>

      {/* New Lead */}
      <div className="mb-4">
        <div className="flex justify-between font-bold mb-1 text-black">
          <span>New Lead</span>
          <span>44</span>
        </div>
        <div className="h-2 w-full rounded-full bg-gray-200">
          <div className="h-2 w-full rounded-full bg-green-700"></div>
        </div>
      </div>

      {/* Not Interested */}
      <div className="mb-4">
        <div className="flex justify-between mb-1 font-bold mb-1 text-black">
          <span>Not Interested</span>
          <span>35</span>
        </div>
        <div className="h-2 w-full rounded-full bg-gray-200">
          <div className="h-2 w-[85%] rounded-full bg-green-700"></div>
        </div>
      </div>

      {/* UnSpecified */}
      <div className="mb-4">
        <div className="flex justify-between font-bold mb-1 text-black mb-1">
          <span>Unspecified</span>
          <span>29</span>
        </div>
        <div className="h-2 w-full rounded-full bg-gray-200">
          <div className="h-2 w-[75%] rounded-full bg-green-700"></div>
        </div>
      </div>

      {/* Converted */}
      <div className="mb-4">
        <div className="flex justify-between font-bold mb-1 text-black mb-1">
          <span>Converted</span>
          <span>21</span>
        </div>
        <div className="h-2 w-full rounded-full bg-gray-200">
          <div className="h-2 w-[62%] rounded-full bg-green-700"></div>
        </div>
      </div>

      {/* In progress */}
      <div className="mb-4">
        <div className="flex justify-between font-bold mb-1 text-black mb-1">
          <span> In progress </span>
          <span>16</span>
        </div>
        <div className="h-2 w-full rounded-full bg-gray-200">
          <div className="h-2 w-[52%] rounded-full bg-green-700"></div>
        </div>
      </div>

      {/* Likely/Warm */}
      <div className="mb-4">
        <div className="flex justify-between font-bold mb-1 text-black mb-1">
          <span>Likely / Warm </span>
          <span>6</span>
        </div>
        <div className="h-2 w-full rounded-full bg-gray-200">
          <div className="h-2 w-[18%] rounded-full bg-green-700"></div>
        </div>
      </div>

      {/* On hold */}
      <div>
        <div className="flex justify-between font-bold mb-1 text-black mb-1">
          <span>On hold </span>
          <span>4</span>
        </div>
        <div className="h-2 w-full rounded-full bg-gray-200">
          <div className="h-2 w-[10%] rounded-full bg-green-700"></div>
        </div>
      </div>
    </div>
  );
}
