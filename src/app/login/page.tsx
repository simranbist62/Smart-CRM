"use client";

import Link from "next/link";
import { useState } from "react";
import axios from "axios";

export default function LoginPage() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        "https://crm-backend-eh94.onrender.com/auth/login",
        {
          email: form.email,
          password: form.password,
        },
        {
          withCredentials: true,
        },
      );

      console.log(response.data);
      alert("Login successful");
    } catch (error) {
      console.error(error);

      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.message || "Invalid email or password");
      } else {
        setError("Something went wrong");
      }
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-4 rounded-xl bg-white p-8 shadow"
      >
        <h1 className="text-2xl font-bold text-[#0B1F16]">Login</h1>

        {error && (
          <p className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
            {error}
          </p>
        )}

        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) =>
            setForm({
              ...form,
              email: e.target.value,
            })
          }
          className="w-full rounded-lg border p-3 text-black"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) =>
            setForm({
              ...form,
              password: e.target.value,
            })
          }
          className="w-full rounded-lg border p-3 text-black"
          required
        />

        <button
          type="submit"
          className="w-full rounded-lg bg-[#0B1F16] py-3 font-semibold text-white"
        >
          Login
        </button>

        <p className="text-sm text-gray-500">
          Don't have an account?{" "}
          <Link href="/register" className="font-semibold text-[#0B1F16]">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}
