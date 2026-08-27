import { ChevronRight } from "lucide-react";

export default function FollowUps() {
  return (
    <div className="mt-6 w-full max-w-2xl rounded-lg bg-white p-6 shadow-md">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-black">Follow-ups Due</h2>
        <button className="text-sm font-bold text-green-700">
          View All
        </button>
      </div>

      <p className="mt-1 text-sm text-gray-500">
        Upcoming follow-ups with leads
      </p>

      {/* Follow-up */}
      <div className="mt-8 flex items-center justify-between">
        <h3 className="font-bold text-black">
          St. Xaviers School, Jwalakhel
        </h3>

        <div className="flex items-center gap-1">
          <span className="text-sm font-medium text-gray-500">
            Ramesh Chaudhary
          </span>
          <ChevronRight size={18} className="text-black" />
        </div>
      </div>

      {/* Follow-up details */}
      <div className="flex items-center justify-between">
        <p className="mt-1 text-sm text-gray-500">
          Fr. J. Lewis (Admin)
        </p>

        <p className="mt-1 text-sm font-bold text-[#cc1225]">
          2020-06-25
        </p>
      </div>
    </div>
  );
}