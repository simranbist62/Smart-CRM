"use client";

import Link from "next/link";
import { ReactNode } from "react";

type AuthLayoutProps = {
  children: ReactNode;
  title: string;
  description: string;
  type: "login" | "register";
};

export default function AuthLayout({
  children,
  title,
  description,
  type,
}: AuthLayoutProps) {
  return (
    <main className="min-h-screen bg-[#f4faf7] flex items-center justify-center p-6">
      <div className="w-full max-w-5xl min-h-[600px] bg-white rounded-3xl shadow-xl overflow-hidden flex">
        
        {/* Left Side */}
        <div className="hidden md:flex md:w-1/2 bg-[#123c2d] relative overflow-hidden items-center justify-center p-10">
          
          <div className="absolute w-72 h-72 rounded-full bg-[#2f8f68] opacity-30 -top-20 -left-20" />
          <div className="absolute w-80 h-80 rounded-full bg-[#65b891] opacity-20 -bottom-24 -right-24" />

          <div className="relative z-10 text-white">
            <div className="mb-10">
              <h1 className="text-4xl font-bold">
                Smart CRM
              </h1>

              <p className="mt-3 text-green-100">
                Manage your customers, leads and business
                relationships in one place.
              </p>
            </div>

            <div className="space-y-5">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                  ✓
                </div>
                <p>Manage your leads efficiently</p>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                  ✓
                </div>
                <p>Track your sales activities</p>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                  ✓
                </div>
                <p>Organize your customer relationships</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-8 md:p-12">
          <div className="w-full max-w-md">
            
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900">
                {title}
              </h2>

              <p className="text-gray-500 mt-2">
                {description}
              </p>
            </div>

            {children}

            <div className="text-center mt-6 text-sm text-gray-500">
              {type === "login" ? (
                <>
                  Don't have an account?{" "}
                  <Link
                    href="/register"
                    className="font-semibold text-[#23845c] hover:text-[#176b48]"
                  >
                    Create account
                  </Link>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="font-semibold text-[#23845c] hover:text-[#176b48]"
                  >
                    Sign in
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}