// API URL
const API_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";

// Lead status options
export type LeadStatus =
  | "NEW_LEAD"
  | "IN_PROGRESS"
  | "LIKELY_WARM"
  | "CONVERTED"
  | "NOT_INTERESTED"
  | "ON_HOLD";

// Reuse this list in dropdowns so every screen sends valid backend values.
export const leadStatuses: LeadStatus[] = [
  "NEW_LEAD",
  "IN_PROGRESS",
  "LIKELY_WARM",
  "CONVERTED",
  "NOT_INTERESTED",
  "ON_HOLD",
];

// Activity
export type Activity = {
  id?: number;
  type: "CALL" | "MEETING" | "EMAIL" | "FOLLOW_UP";
  remarks: string;
  occurredAt: string;
  nextActionDate?: string;
};

// Lead
export type Lead = {
  id: number;
  organizationName: string;
  contactName: string;
  designation?: string;
  phone: string;
  email?: string;
  province?: string;
  district?: string;
  source?: string;
  leadType?: string;
  priority?: "LOW" | "MEDIUM" | "HIGH";
  status: LeadStatus;
  nextActionDate?: string;
  notes?: string;
  assignedToId?: number;
  assignedToName?: string;
  activities?: Activity[];
};

// Data needed when creating or updating a lead
export type LeadData = Omit<Lead, "id" | "activities" | "assignedToName">;

// LeadPayload is the name used by the form components.
export type LeadPayload = LeadData;


// ========================================
// GET ALL LEADS
// ========================================

export async function getLeads(
  options: {
    q?: string;
    status?: LeadStatus;
    page?: number;
    size?: number;
  } = {}
) {
  const { q = "", status, page = 0, size = 25 } = options;
  let url = `${API_URL}/leads?q=${encodeURIComponent(q)}&page=${page}&size=${size}`;

  if (status) {
    url += `&status=${status}`;
  }

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to get leads");
  }

  return response.json();
}


// ========================================
// GET ONE LEAD
// ========================================

export async function getLead(id: number) {
  const response = await fetch(`${API_URL}/leads/${id}`);

  if (!response.ok) {
    throw new Error("Failed to get lead");
  }

  return response.json();
}


// ========================================
// CREATE LEAD
// ========================================

export async function createLead(data: LeadData) {
  const response = await fetch(`${API_URL}/leads`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to create lead");
  }

  return response.json();
}


// ========================================
// UPDATE LEAD
// ========================================

export async function updateLead(id: number, data: LeadData) {
  const response = await fetch(`${API_URL}/leads/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to update lead");
  }

  return response.json();
}


// ========================================
// ADD ACTIVITY
// ========================================

export async function addActivity(id: number, data: Activity) {
  const response = await fetch(`${API_URL}/leads/${id}/activities`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to add activity");
  }

  return response.json();
}
