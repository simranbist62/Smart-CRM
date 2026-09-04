"use client";

import Navbar from "@/src/components/layout/Navbar";
import Sidebar from "@/src/components/layout/Sidebar";
import Stats from "@/src/components/staff/Stats";
import StaffCard from "@/src/components/staff/StaffCard";
import api from "@/src/api/api";
import { useEffect, useState } from "react";

type Staff = {
  id: number;
  name: string;
  email: string;
  role: string;
  active: boolean;
  designation: string;
};

type TeamPerformance = {
  assigned: number;
  converted: number;
  overdue: number;
};

export default function Staff() {
  const [staff, setStaff] = useState<Staff[]>([]);

  const [performance, setPerformance] = useState<TeamPerformance>({
    assigned: 0,
    converted: 0,
    overdue: 0,
  });

  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "SALES",
    designation: "",
    phone: "",
    password: "",
    province: "",
    district: "",
  });

  // Fetch staff and team performance
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [staffResponse, leaderboardResponse] = await Promise.all([
          api.get("/users"),
          api.get("/staff/leaderboard"),
        ]);

        console.log("Staff response:", staffResponse.data);
        console.log("Leaderboard response:", leaderboardResponse.data);

        const staffData = staffResponse.data.content || staffResponse.data;

        const leaderboardData =
          leaderboardResponse.data.content || leaderboardResponse.data;

        setStaff(staffData);

        // Calculate team totals
        setPerformance({
          assigned: leaderboardData.reduce(
            (total: number, member: any) => total + (member.assigned || 0),
            0,
          ),

          converted: leaderboardData.reduce(
            (total: number, member: any) => total + (member.converted || 0),
            0,
          ),

          overdue: leaderboardData.reduce(
            (total: number, member: any) => total + (member.overdue || 0),
            0,
          ),
        });
      } catch (error) {
        console.error("Failed to fetch staff data:", error);
      }
    };

    fetchData();
  }, []);

  // Calculate active staff
  const activeTeam = staff.filter((member) => member.active).length;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await api.post("/users", form);

      console.log("Staff created:", response.data);

      setShowForm(false);

      setForm({
        name: "",
        email: "",
        role: "SALES",
        designation: "",
        phone: "",
        password: "",
        province: "",
        district: "",
      });

      // Refresh staff list
      const staffResponse = await api.get("/users");

      setStaff(staffResponse.data.content || staffResponse.data);
    } catch (error) {
      console.error("Failed to create staff:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f6f3]">
      <Sidebar />

      <div className="ml-64">
        <Navbar />

        <main className="p-6">
          {/* Add Staff Button */}
          <div className="mb-4 flex justify-end">
            <button
              type="button"
              onClick={() => setShowForm(true)}
              className="flex items-center gap-2 rounded-lg bg-[#247d68] px-4 py-2 font-semibold text-white shadow-sm transition hover:bg-[#1d6958]"
            >
              <span className="text-sm">+ Add staff</span>
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-4">
            <Stats heading="Active team" number={activeTeam} />

            <Stats heading="Assigned leads" number={performance.assigned} />

            <Stats heading="Team conversions" number={performance.converted} />

            <Stats heading="Overdue follow-ups" number={performance.overdue} />
          </div>

          {/* Staff List */}
          <div className="mt-6">
            <StaffCard />
          </div>
        </main>
      </div>

      {/* Add Staff Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-xl"
          >
            <p className="text-sm font-semibold text-[#247d68]">
              NEW TEAM MEMBER
            </p>

            <h2 className="mb-6 text-2xl font-bold text-gray-800">
              Add Staff Account
            </h2>

            {/* Name + Email */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter name"
                  required
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-black outline-none focus:border-[#23845c]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter email"
                  required
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-black outline-none focus:border-[#23845c]"
                />
              </div>
            </div>

            {/* Designation + Phone */}
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Designation
                </label>

                <select
                  name="designation"
                  value={form.designation}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-black outline-none focus:border-[#23845c]"
                >
                  <option value="">Select designation</option>

                  <option value="Sales Executive">Sales Executive</option>

                  <option value="Sales Manager">Sales Manager</option>

                  <option value="Sales Representative">
                    Sales Representative
                  </option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Phone
                </label>

                <input
                  type="text"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                  required
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-black outline-none focus:border-[#23845c]"
                />
              </div>
            </div>

            {/* Role + Password */}
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Role
                </label>

                <select
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-black outline-none focus:border-[#23845c]"
                >
                  <option value="SALES">Sales</option>

                  <option value="MANAGER">Manager</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Password
                </label>

                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter password"
                  required
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-black outline-none focus:border-[#23845c]"
                />
              </div>
            </div>

            {/* Province + District */}
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Province
                </label>

                <input
                  type="text"
                  name="province"
                  value={form.province}
                  onChange={handleChange}
                  placeholder="Enter province"
                  required
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-black outline-none focus:border-[#23845c]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  District
                </label>

                <input
                  type="text"
                  name="district"
                  value={form.district}
                  onChange={handleChange}
                  placeholder="Enter district"
                  required
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-black outline-none focus:border-[#23845c]"
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="rounded-lg bg-gray-200 px-5 py-2 font-medium text-gray-700 hover:bg-gray-300"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="rounded-lg bg-[#247d68] px-5 py-2 font-semibold text-white hover:bg-[#1d6958]"
              >
                Create account
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
