"use client";

import { useState } from "react";
import api from "../../api/api";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "SALES",
    designation: "Sales Executive",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await api.post("/auth/register", {
        name: form.name,
        email: form.email,
        password: form.password,
        role: form.role,
        designation: form.designation,
      });
      console.log("Register response:", response.data);
      alert("Registered Successfully");
      router.push("/login");
    } catch (error: any) {
      console.error(
        "Registration failed",
        error.response?.data || error.message,
      );

      alert(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-4 rounded-xl bg-white p-8 shadow"
      >
        <h1 className="text-2xl font-bold text-[#0B1F16]">Create Account</h1>

        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full rounded-lg border p-3 text-black"
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full rounded-lg border p-3 text-black"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="w-full rounded-lg border p-3 text-black"
          required
        />

        <input
          type="password"
          placeholder="Confirm Password"
          value={form.confirmPassword}
          onChange={(e) =>
            setForm({ ...form, confirmPassword: e.target.value })
          }
          className="w-full rounded-lg border p-3 text-black"
          required
        />

        <select
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
          className="w-full rounded-lg border p-3 text-black"
          required
        >
          <option value="">Select Role</option>
          <option value="SALES">Sales</option>
          <option value="MANAGER">Manager</option>
          <option value="ADMIN">Admin</option>
        </select>

        <select
          value={form.designation}
          onChange={(e) => setForm({ ...form, designation: e.target.value })}
          className="w-full rounded-lg border p-3 text-black"
          required
        >
          <option value="">Select Designation</option>
          <option value="Sales Executive">Sales Executive</option>
          <option value="Sales Manager">Sales Manager</option>
          <option value="Sales Representative">Sales Representative</option>
          <option value="CRM Administrator">CRM Administrator</option>
        </select>

        <button
          type="submit"
          className="w-full rounded-lg bg-[#0B1F16] py-3 font-semibold text-white"
        >
          Register
        </button>
      </form>
    </div>
  );
}
