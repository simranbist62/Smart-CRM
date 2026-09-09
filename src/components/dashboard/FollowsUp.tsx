import { ChevronRight } from "lucide-react";
type FollowUp = {
  id: number;
  organizationName: string;
  contactName: string;
  nextActionDate: string;
  assignedTo: {
    name: string;
  };
};

type FollowUpsProps = {
  data?: FollowUp[];
};

export default function FollowUps({ data = [] }: FollowUpsProps) {
  return (
    <div className="mt-6 w-full max-w-2xl rounded-lg bg-white p-6 shadow-md">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-black">Follow-ups Due</h2>

        <button className="text-sm font-bold text-green-700">View All</button>
      </div>

      <p className="mt-1 text-sm text-gray-500">
        Upcoming follow-ups with leads
      </p>

      {/* Follow-ups */}
      {data.map((item) => (
        <div key={item.id} className="mt-8">
          {/* Lead + assigned person */}
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-black">{item.organizationName}</h3>

            <div className="flex items-center gap-1">
              <span className="text-sm font-medium text-gray-500">
                {item.assignedTo.name}
              </span>

              <ChevronRight size={18} className="text-black" />
            </div>
          </div>

          {/* Details */}
          <div className="flex items-center justify-between">
            <p className="mt-1 text-sm text-gray-500">{item.contactName}</p>

            <p className="mt-1 text-sm font-bold text-[#cc1225]">
              {item.nextActionDate}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
