"use client";

import { useState } from "react";
import Navbar from "../../components/layout/Navbar";

export default function LeadsPage() {

  const [search, setSearch] = useState("");

  const leads = [
    {
      school: "Budhanilkantha School",
      contact: "Mr. R. Sharma",
      phone: "01-4371200",
      status: "Converted",
      score: "100 · Hot",
      assigned: "Ramesh Chaudhary",
      date: "2026-06-26",
    },
    {
      school: "GEMS School",
      contact: "Ms. A. Karki",
      phone: "01-5201818",
      status: "Converted",
      score: "100 · Hot",
      assigned: "Ramesh Chaudhary",
      date: "2026-07-03",
    },
    {
      school: "St. Xavier's School, Jawalakhel",
      contact: "Fr. J. Lewis",
      phone: "01-5521303",
      status: "Likely / Warm",
      score: "37 · Developing",
      assigned: "Ramesh Chaudhary",
      date: "2026-06-25",
    },
    {
      school: "New Everest Academy",
      contact: "Ramesh Chaudhary",
      phone: "9854037128",
      status: "Converted",
      score: "93 · Hot",
      assigned: "Raj Chaudhary",
      date: "—",
    },
    {
      school: "New Light English Boarding School",
      contact: "Mr. Sujit Sah",
      phone: "9800862477",
      status: "Converted",
      score: "100 · Hot",
      assigned: "Ramesh Chaudhary",
      date: "2026-06-24",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Navbar */}
      <Navbar />

      {/* Main content */}
      <main className="p-8">

        {/* Search section */}
        <div className="mb-6 flex items-center gap-4">

          <input
            type="text"
            placeholder="Search school, contact or phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-xl rounded-lg border bg-white px-4 py-3 outline-none focus:border-green-600"
          />

          <select className="rounded-lg border bg-white px-4 py-3">
            <option>All statuses</option>
            <option>Converted</option>
            <option>Likely / Warm</option>
          </select>

          <p className="ml-auto text-sm text-gray-500">
            155 leads
          </p>

        </div>

        {/* Leads table */}
        <div className="overflow-x-auto rounded-lg border bg-white">

          <table className="w-full">

            {/* Table heading */}
            <thead className="bg-gray-100">
              <tr>

                <th className="px-5 py-4 text-left text-xs text-gray-500">
                  SCHOOL / LEAD
                </th>

                <th className="px-5 py-4 text-left text-xs text-gray-500">
                  CONTACT
                </th>

                <th className="px-5 py-4 text-left text-xs text-gray-500">
                  STATUS
                </th>

                <th className="px-5 py-4 text-left text-xs text-gray-500">
                  SCORE
                </th>

                <th className="px-5 py-4 text-left text-xs text-gray-500">
                  ASSIGNED TO
                </th>

                <th className="px-5 py-4 text-left text-xs text-gray-500">
                  NEXT ACTION
                </th>

              </tr>
            </thead>

            {/* Table data */}
            <tbody>

              {leads.map((lead, index) => (

                <tr
                  key={index}
                  className="border-t hover:bg-gray-50"
                >

                  <td className="px-5 py-5">
                    <p className="font-semibold text-gray-800">
                      {lead.school}
                    </p>

                    <p className="text-xs text-gray-400">
                      Walk-in
                    </p>
                  </td>

                  <td className="px-5 py-5">
                    <p className="text-sm text-gray-700">
                      {lead.contact}
                    </p>

                    <p className="text-xs text-gray-400">
                      {lead.phone}
                    </p>
                  </td>

                  <td className="px-5 py-5">

                    <span
                      className={
                        lead.status === "Converted"
                          ? "rounded-full bg-green-100 px-3 py-1 text-xs text-green-700"
                          : "rounded-full bg-yellow-100 px-3 py-1 text-xs text-yellow-700"
                      }
                    >
                      {lead.status}
                    </span>

                  </td>

                  <td className="px-5 py-5">
                    <span className="rounded-full bg-green-100 px-3 py-1 text-xs text-green-700">
                      {lead.score}
                    </span>
                  </td>

                  <td className="px-5 py-5 text-sm text-gray-700">
                    {lead.assigned}
                  </td>

                  <td className="px-5 py-5">

                    <p className="text-sm font-semibold text-red-400">
                      {lead.date}
                    </p>

                    <p className="text-xs text-gray-400">
                      Plan onboarding and request a referral
                    </p>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </main>

    </div>
  );
}