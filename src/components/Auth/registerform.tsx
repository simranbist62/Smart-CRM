"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "../../lib/auth";

export default function RegisterForm() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("SALES");
  const [designation, setDesignation] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const result = await registerUser(
        name,
        email,
        password,
        role,
        designation,
      );

      localStorage.setItem("token", result.data.token);
      localStorage.setItem("user", JSON.stringify(result.data.user));

      router.push("/dashboard");
    } catch (error) {
      setError(error instanceof Error ? error.message : "Registration failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Full Name */}
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Full Name
        </label>

        <input
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Enter your full name"
          required
          className="w-full rounded-xl border border-gray-200 px-4 py-3 text-black outline-none focus:border-[#23845c] focus:ring-2 focus:ring-[#23845c]/20"
        />
      </div>

      {/* Email */}
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Email
        </label>

        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Enter your email"
          required
          className="w-full rounded-xl border border-gray-200 px-4 py-3 text-black outline-none focus:border-[#23845c] focus:ring-2 focus:ring-[#23845c]/20"
        />
      </div>

      {/* Password */}
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Password
        </label>

        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Create a password"
          required
          className="w-full rounded-xl border border-gray-200 px-4 py-3 text-black outline-none focus:border-[#23845c] focus:ring-2 focus:ring-[#23845c]/20"
        />
      </div>

      {/* Role + Designation */}
      <div className="grid grid-cols-2 gap-4">
        {/* Role */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Role
          </label>

          <select
            value={role}
            onChange={(event) => setRole(event.target.value)}
            required
            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-black outline-none focus:border-[#23845c]"
          >
            <option value="SALES">Sales</option>
            <option value="MANAGER">Manager</option>
          </select>
        </div>

        {/* Designation */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Designation
          </label>

          <select
            value={designation}
            onChange={(event) => setDesignation(event.target.value)}
            required
            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-black outline-none focus:border-[#23845c]"
          >
            <option value="">Select Designation</option>
            <option value="Sales Executive">Sales Executive</option>
            <option value="Sales Manager">Sales Manager</option>
            <option value="Sales Representative">Sales Representative</option>
          </select>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-[#23845c] py-3.5 font-semibold text-white transition hover:bg-[#176b48] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Creating account..." : "Create Account"}
      </button>
    </form>
  );
}
