"use client";
import api from "@/src/api/api";
import { useEffect, useState } from "react";

type Staff = {
  id: number;
  name: string;
  email: string;
  role: string;
  designation: string;
  phone: string;
};

export default function StaffCard() {
  const [staff, setStaff] = useState<Staff[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const response = await api.get("/users");
        console.log("Staff response:", response.data);

        setStaff(response.data);
      } catch (error) {
        console.error("Failed to fetch staff: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStaff();
  }, []);

  if (loading) {
    return <p>Loading staff...</p>;
  }

  if (!loading && staff.length === 0) {
    return <p className="text-gray-500">No staff members found.</p>;
  }
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {staff.map((member) => (
        <div
          key={member.id}
          className="rounded-2xl border border-gray-200 bg-white p-7 shadow-sm"
        >
          {/* Top row */}
          <div className="flex items-start justify-between">
            {/* Avatar */}
            <div className="flex h-6 w-14 items-center justify-center rounded-2xl bg-[#e5f1ec] text-m font-bold text-[#247d68]">
              {member.name
                .split(" ")
                .map((word) => word[0])
                .join("")
                .slice(0, 2)
                .toUpperCase()}
            </div>

            {/* Active badge */}
            <span className="rounded-full bg-[#e5f1ec] px-2 py-1.5 text-sm font-semibold text-[#247d68]">
              Active
            </span>
          </div>

          <h2 className="mt-3 text-lg font-semibold text-black">
            {member.name}
          </h2>

          <h3 className="text-sm text-gray-500">{member.designation}</h3>

          <p className="text-sm text-gray-500">{member.email}</p>

          <div className="mt-5 grid grid-cols-3 gap-4 border-t pt-4">
            <div>
              <p className="font-semibold text-black">0</p>
              <p className="text-sm text-black">Leads</p>
            </div>

            <div>
              <p className="font-semibold text-black">0</p>
              <p className="text-sm text-gray-500 text-black">Converted</p>
            </div>

            <div>
              <p className="font-semibold text-black">0</p>
              <p className="text-sm text-gray-500 text-black">Score</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
