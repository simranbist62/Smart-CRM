"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export type Role = "ADMIN" | "MANAGER" | "SALES";

type RoleContextType = {
  viewingAs: Role;
  setViewingAs: (role: Role) => void;
};

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export function RoleProvider({ children }: { children: ReactNode }) {
  const [viewingAs, setViewingAs] = useState<Role>("ADMIN");

  return (
    <RoleContext.Provider value={{ viewingAs, setViewingAs }}>
      {children}
    </RoleContext.Provider>
  );
}

export function useRole() {
  const context = useContext(RoleContext);

  if (!context) {
    throw new Error("useRole must be used inside RoleProvider");
  }

  return context;
}
