"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  Briefcase,
  Users,
  ListFilter,
  CalendarDays,
  UserRound,
  Trophy,
  Settings,
  SquareArrowRightExit,
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-[#0B1F16] p-5 text-white">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#D9A441] font-bold text-[#0B1F16]">
          SM
        </div>

        <div>
          <h1 className="text-lg font-bold">Smart CRM</h1>
          <p className="text-xs text-white/60">MULYAANKAN</p>
        </div>
      </div>

      <div className="mb-6 rounded-lg bg-[#D9A441] px-2 py-2">
        <p className="text-center text-xs font-semibold text-[#0B1F16]">
          POC · LOCAL DATA
        </p>
      </div>

      <nav>
        <ul className="space-y-2">
          <li>
            <Link
              href="/dashboard"
              className={`flex items-center gap-3 rounded-lg px-4 py-3 
                ${
                  pathname === "/dashboard"
                    ? "bg-white/10"
                    : "hover:bg-white/10"
                }`}
            >
              <LayoutDashboard size={18} />
              Dashboard
            </Link>
          </li>

          <li>
            <Link
              href="/my-work"
              className={`flex items-center gap-3 rounded-lg px-4 py-3 
                ${
                  pathname === "/my-work" ? "bg-white/10" : " hover:bg-white/10"
                }`}
            >
              <Briefcase size={18} />
              My Work
            </Link>
          </li>

          <li>
            <Link
              href="/leads"
              className={`flex items-center gap-3 rounded-lg px-4 py-3 
                ${
                  pathname === "/leads" ? "bg-white/10" : " hover:bg-white/10"
                }`}
            >
              <Users size={18} />
              Leads
            </Link>
          </li>

          <li>
            <Link
              href="/pipeline"
              className={`flex items-center gap-3 rounded-lg px-4 py-3 
                ${
                  pathname === "/pipeline"
                    ? "bg-white/10"
                    : " hover:bg-white/10"
                }`}
            >
              <ListFilter size={18} />
              Pipeline
            </Link>
          </li>

          <li>
            <Link
              href="/calendar"
              className={`flex items-center gap-3 rounded-lg px-4 py-3 
                ${
                  pathname === "/calendar"
                    ? "bg-white/10"
                    : " hover:bg-white/10"
                }`}
            >
              <CalendarDays size={18} />
              Calendar
            </Link>
          </li>

          <li>
            <Link
              href="/staff"
              className={`flex items-center gap-3 rounded-lg px-4 py-3 
                ${
                  pathname === "/staff" ? "bg-white/10" : " hover:bg-white/10"
                }`}
            >
              <UserRound size={18} />
              Staff
            </Link>
          </li>

          <li>
            <Link
              href="/leaderboard"
              className={`flex items-center gap-3 rounded-lg px-4 py-3 
                ${
                  pathname === "/my-work" ? "bg-white/10" : " hover:bg-white/10"
                }`}
            >
              <Trophy size={18} />
              Leaderboard
            </Link>
          </li>

          <li>
            <Link
              href="/democontrols"
              className={`flex items-center gap-3 rounded-lg px-4 py-3 
                ${
                  pathname === "/democontrols"
                    ? "bg-white/10"
                    : " hover:bg-white/10"
                }`}
            >
              <Settings size={18} />
              Demo controls
            </Link>
          </li>
        </ul>
      </nav>

      <hr className="mt-6 border-white/30" />

      <div className="mt-6">
        <p className="mb-2 text-xs text-white/50">VIEWING AS</p>

        <select className="w-full rounded-lg bg-white/10 px-3 py-2 text-sm text-white outline-none mb-4">
          <option className="text-black">CRM Administrator - Admin</option>
          <option className="text-black">User</option>
        </select>

        <div className="mt-4 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#D9A441] font-bold text-[#0B1F16]">
            CA
          </div>

          <div>
            <p className="text-sm font-semibold">CRM Administrator</p>
            <p className="text-xs text-white/50">ADMIN</p>
          </div>
        </div>
      </div>

      <Link
        href="/"
        className="mt-8 flex items-center gap-3 rounded-lg px-3 py-3 hover:bg-white/10"
      >
        <SquareArrowRightExit size={18} />
        Exit Demo
      </Link>
    </aside>
  );
}
