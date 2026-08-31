import type { LeadPayload } from "@/src/lib/leads-store";

const API_URL = "https://crm-backend-eh94.onrender.com";

export async function createLead(data: LeadPayload) {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/api/leads`, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",

      ...(token
        ? {
            Authorization: `Bearer ${token}`,
          }
        : {}),
    },

    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message || "Could not create the lead."
    );
  }

  return result;
}