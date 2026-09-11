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

import { useEffect, useState } from "react";
import api from "@/src/api/api";

type Role = "ADMIN" | "MANAGER" | "SALES";

type UserInfo = {
  name: string;
  designation: string;
  initials: string;
};

export default function Sidebar() {
  const pathname = usePathname();

  const [role, setRole] = useState<Role>("ADMIN");
  const [loading, setLoading] = useState(false);

  const [currentUser, setCurrentUser] = useState<UserInfo>({
    name: "CRM Administrator",
    designation: "ADMIN",
    initials: "CA",
  });

  /*
   * Navigation items
   */
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

  /*
   * Role and Designation are separate.
   *
   * Role:
   * ADMIN | MANAGER | SALES
   *
   * Designation:
   * SALES EXECUTIVE
   * SALES MANAGER
   * SALES REPRESENTATIVE
   */
  const roleDisplay: Record<Role, UserInfo> = {
    ADMIN: {
      name: "CRM Administrator",
      designation: "ADMIN",
      initials: "CA",
    },

    MANAGER: {
      name: "Manager",
      designation: "SALES MANAGER",
      initials: "M",
    },

    SALES: {
      name: "Sales",
      designation: "SALES REPRESENTATIVE",
      initials: "S",
    },
  };

  /*
   * Load the saved user from localStorage.
   *
   * This is important because after window.location.reload()
   * the component starts again.
   *
   * Without this, role would always become ADMIN.
   */
  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (!savedUser) {
      return;
    }

    try {
      const user = JSON.parse(savedUser);

      const savedRole = user.role as Role;

      if (
        savedRole !== "ADMIN" &&
        savedRole !== "MANAGER" &&
        savedRole !== "SALES"
      ) {
        return;
      }

      /*
       * Restore the selected role
       */
      setRole(savedRole);

      /*
       * Restore the selected user's information
       */
      setCurrentUser({
        name: user.name || roleDisplay[savedRole].name,

        designation: user.designation || roleDisplay[savedRole].designation,

        initials: roleDisplay[savedRole].initials,
      });
    } catch (error) {
      console.error("Failed to load saved user:", error);
    }
  }, []);

  /*
   * Switch role
   */
  const switchRole = async (newRole: Role) => {
    /*
     * ==========================================
     * STEP 1
     * CHANGE SIDEBAR UI IMMEDIATELY
     * ==========================================
     */

    const selectedUser = roleDisplay[newRole];

    setRole(newRole);

    setCurrentUser(selectedUser);

    try {
      setLoading(true);

      /*
       * ==========================================
       * STEP 2
       * SEND ROLE TO BACKEND
       * ==========================================
       */

      const response = await api.post("/auth/switch-role", {
        role: newRole,
      });

      console.log("Switch role response:", response.data);

      /*
       * ==========================================
       * STEP 3
       * GET NEW TOKEN + USER
       * ==========================================
       */

      const { token, user } = response.data.data;

      /*
       * ==========================================
       * STEP 4
       * SAVE NEW JWT
       * ==========================================
       */

      localStorage.setItem("token", token);

      /*
       * ==========================================
       * STEP 5
       * SAVE NEW USER
       * ==========================================
       */

      localStorage.setItem("user", JSON.stringify(user));

      /*
       * ==========================================
       * STEP 6
       * UPDATE SIDEBAR USING BACKEND DATA
       * ==========================================
       */

      setRole(user.role);

      setCurrentUser({
        name: user.name || selectedUser.name,

        designation: user.designation || selectedUser.designation,

        initials: selectedUser.initials,
      });

      /*
       * ==========================================
       * STEP 7
       * RELOAD APP
       *
       * This makes Dashboard, My Work,
       * Pipeline, etc. fetch again using
       * the NEW JWT.
       * ==========================================
       */

      window.location.reload();
    } catch (error) {
      console.error("Failed to switch role:", error);
    } finally {
      setLoading(false);
    }
  };

  /*
   * Dropdown change
   */
  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newRole = e.target.value as Role;

    console.log("Selected role:", newRole);

    switchRole(newRole);
  };

  /*
   * Navigation styles
   */
  const linkClasses = (href: string) =>
    `flex items-center gap-3 rounded-lg px-4 py-3 transition ${
      pathname === href
        ? "bg-[#275444] text-white"
        : "text-white/70 hover:bg-white/10"
    }`;

  return (
    <aside className="fixed left-0 top-0 z-20 hidden h-screen w-64 overflow-y-auto bg-[#0B1F16] p-5 text-white lg:block">
      {/* =========================================
          LOGO
          ========================================= */}

      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#D9A441] font-bold text-[#0B1F16]">
          SM
        </div>

        <div>
          <h1 className="text-lg font-bold">Smart CRM</h1>

          <p className="text-xs text-white/60">MULYAANKAN</p>
        </div>
      </div>

      {/* =========================================
          POC LABEL
          ========================================= */}

      <div className="mb-6 rounded-lg bg-[#D9A441] px-2 py-2">
        <p className="text-center text-xs font-semibold text-[#0B1F16]">
          POC · LOCAL DATA
        </p>
      </div>

      {/* =========================================
          NAVIGATION
          ========================================= */}

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

      {/* =========================================
          VIEWING AS
          ========================================= */}

      <div className="mt-6">
        <p className="mb-2 text-xs text-white/50">VIEWING AS</p>

        <select
          value={role}
          onChange={handleRoleChange}
          disabled={loading}
          className="mb-4 w-full rounded-lg bg-white/10 px-3 py-2 text-sm text-white outline-none disabled:cursor-not-allowed disabled:opacity-50"
        >
          <option value="ADMIN" className="text-black">
            CRM Administrator - Admin
          </option>

          <option value="MANAGER" className="text-black">
            Manager
          </option>

          <option value="SALES" className="text-black">
            Sales
          </option>
        </select>

        {/* =========================================
            CURRENT USER
            ========================================= */}

        <div className="mt-4 flex items-center gap-3">
          {/* Initials */}

          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#D9A441] font-bold text-[#0B1F16]">
            {currentUser.initials}
          </div>

          {/* Name + Designation */}

          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">{currentUser.name}</p>

            <p className="text-xs text-white/50">{currentUser.designation}</p>
          </div>
        </div>
      </div>

      {/* =========================================
          EXIT DEMO
          ========================================= */}

      <Link
        href="/"
        className="mt-8 flex items-center gap-3 rounded-lg px-3 py-3 text-white/70 transition hover:bg-white/10 hover:text-white"
      >
        <SquareArrowRightExit size={18} />

        <span>Exit Demo</span>
      </Link>
    </aside>
  );
}
