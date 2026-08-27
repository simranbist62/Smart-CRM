"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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

  const navItems = [
    {
      href: "/dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      href: "/my-work",
      label: "My Work",
      icon: Briefcase,
    },
    {
      href: "/leads",
      label: "Leads",
      icon: Users,
    },
    {
      href: "/pipeline",
      label: "Pipeline",
      icon: ListFilter,
    },
    {
      href: "/calendar",
      label: "Calendar",
      icon: CalendarDays,
    },
    {
      href: "/staff",
      label: "Staff",
      icon: UserRound,
    },
    {
      href: "/leaderboard",
      label: "Leaderboard",
      icon: Trophy,
    },
    {
      href: "/democontrols",
      label: "Demo controls",
      icon: Settings,
    },
  ];

  const linkClasses = (href: string) =>
    `flex items-center gap-3 rounded-lg px-4 py-3 transition ${
      pathname === href
        ? "bg-[#275444] text-white"
        : "text-white/70 hover:bg-white/10"
    }`;

  return (
    <aside className="fixed left-0 top-0 z-20 hidden h-screen w-64 overflow-y-auto bg-[#0B1F16] p-5 text-white lg:block">
      {/* Logo / Brand */}
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#D9A441] font-bold text-[#0B1F16]">
          SM
        </div>

        <div>
          <h1 className="text-lg font-bold">Smart CRM</h1>
          <p className="text-xs text-white/60">MULYAANKAN</p>
        </div>
      </div>

      {/* Demo Badge */}
      <div className="mb-6 rounded-lg bg-[#D9A441] px-2 py-2">
        <p className="text-center text-xs font-semibold text-[#0B1F16]">
          POC · LOCAL DATA
        </p>
      </div>

      {/* Navigation */}
      <nav>
        <ul className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <li key={item.href}>
                <Link href={item.href} className={linkClasses(item.href)}>
                  <Icon size={18} />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <hr className="mt-6 border-white/30" />

      {/* User Section */}
      <div className="mt-6">
        <p className="mb-2 text-xs text-white/50">VIEWING AS</p>

        <select className="mb-4 w-full rounded-lg bg-white/10 px-3 py-2 text-sm text-white outline-none">
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

      {/* Exit Demo */}
      <Link
        href="/"
        className="mt-8 flex items-center gap-3 rounded-lg px-3 py-3 text-white/70 transition hover:bg-white/10 hover:text-white"
      >
        <SquareArrowRightExit size={18} />
        Exit Demo
      </Link>
    </aside>
  );
}
