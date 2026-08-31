// ============================================
// FILE: LEADS STORAGE
// This file stores leads in the browser's localStorage.
// Think of localStorage as a small database in your browser.
// ============================================

// This is the "key" we use to save and find our data in localStorage
// It's like a folder name where we keep all our leads
const STORAGE_KEY = "smart-crm-leads";


// ============================================
// PART 1: LEAD TYPES (What does a Lead look like?)
// ============================================

// LEAD STATUS - These are all the possible stages a lead can be in
// Think of it like: where is this customer in our sales process?
export type LeadStatus =
  | "NEW_LEAD"        // Just added, haven't contacted yet
  | "IN_PROGRESS"     // Currently working with them
  | "LIKELY_WARM"     // They seem interested
  | "CONVERTED"       // They became a customer! 🎉
  | "NOT_INTERESTED"  // They said no
  | "ON_HOLD";        // We paused working with them

// This is a list of all possible statuses (used for dropdown menus)
export const leadStatuses: LeadStatus[] = [
  "NEW_LEAD",
  "IN_PROGRESS",
  "LIKELY_WARM",
  "CONVERTED",
  "NOT_INTERESTED",
  "ON_HOLD",
];


// ACTIVITY - Something we did with the lead (a call, meeting, email, etc.)
// Example: "Called John on August 26th"
export type Activity = {
  id?: number;                // Unique ID for this activity
  type: "CALL" | "MEETING" | "EMAIL" | "FOLLOW_UP";  // What kind of activity?
  remarks: string;            // Notes about what happened
  occurredAt: string;         // When did it happen? (date string)
  nextActionDate?: string;    // When should we do something next?
};


// LEAD - All the information about one customer/organization
// This is the complete picture of a lead
export type Lead = {
  id: number;                 // Unique ID (like a student ID number)
  organizationName: string;   // Company or school name
  contactName: string;        // Person we talk to
  designation?: string;       // Their job title (optional)
  phone: string;              // Phone number
  email?: string;             // Email address (optional)
  province?: string;          // Which province? (optional)
  district?: string;          // Which district? (optional)
  source?: string;            // How did we find them? (optional)
  leadType?: string;          // What kind of lead? (optional)
  priority?: "LOW" | "MEDIUM" | "HIGH";  // How important is this lead?
  status: LeadStatus;         // Current status (from the list above)
  nextActionDate?: string;    // When to contact them next
  notes?: string;             // Extra notes (optional)
  assignedToId?: number;      // Who is handling this lead? (optional)
  assignedToName?: string;    // Name of the person handling this lead
  activities?: Activity[];    // All activities we've done with this lead
};


// LEAD PAYLOAD - Data needed when creating or updating a lead
// This is like a "short form" version - we don't need ID, activities, or assigned name
// because those are generated automatically or come from elsewhere
export type LeadPayload = Omit<
  Lead,
  "id" | "activities" | "assignedToName"
>;


// ============================================
// PART 2: LOCAL STORAGE FUNCTIONS
// (Reading and writing to the browser's storage)
// ============================================

// GET LEADS - Read all leads from localStorage
function readLeads(): Lead[] {
  // localStorage only works in the browser, not on the server
  // So if we're on the server, return an empty list
  if (typeof window === "undefined") {
    return [];
  }

  try {
    // Try to get the leads from localStorage
    const savedLeads = localStorage.getItem(STORAGE_KEY);

    // If there's nothing saved, return an empty list
    if (!savedLeads) {
      return [];
    }

    // Convert the JSON string back into a JavaScript array
    return JSON.parse(savedLeads) as Lead[];

  } catch {
    // If something goes wrong (like corrupted data), return an empty list
    return [];
  }
}


// SAVE LEADS - Save all leads to localStorage
function saveLeads(leads: Lead[]) {
  // Convert the leads array to a JSON string and save it
  localStorage.setItem(
    STORAGE_KEY,      // The key (folder name)
    JSON.stringify(leads)  // The data (converted to a string)
  );
}


// ============================================
// PART 3: GET LEADS (with filtering and pagination)
// ============================================

// Get leads with options for searching, filtering, and pagination
// This is like asking: "Give me the leads, but only the ones that match my search"
export function getLeads(
  options: {
    q?: string;              // Search query (text to look for)
    status?: LeadStatus;     // Filter by status
    page?: number;           // Which page of results? (starts at 0)
    size?: number;           // How many leads per page?
  } = {}
) {
  // Set default values if not provided
  const searchText = options.q?.trim().toLowerCase() || "";  // Clean up search text
  const status = options.status;                              // Status filter
  const page = options.page ?? 0;                            // Default to page 0
  const size = options.size ?? 25;                           // Default to 25 per page

  // Get all leads from storage
  const allLeads = readLeads();

  // FILTER: Go through each lead and keep only the ones that match
  const filteredLeads = allLeads.filter((lead) => {
    // Check if this lead matches the search text
    const matchesSearch =
      !searchText ||  // If there's no search text, everything matches
      lead.organizationName.toLowerCase().includes(searchText) ||
      lead.contactName.toLowerCase().includes(searchText) ||
      lead.phone.toLowerCase().includes(searchText) ||
      lead.email?.toLowerCase().includes(searchText);  // ?. means "if email exists"

    // Check if this lead matches the status filter
    const matchesStatus =
      !status || lead.status === status;

    // Return true only if the lead matches BOTH the search AND the status
    return matchesSearch && matchesStatus;
  });

  // PAGINATION: Calculate which leads to show on this page
  // Example: if page=1 and size=10, show leads 10-19
  const start = page * size;   // Starting index
  const end = start + size;    // Ending index

  // Get only the leads for this page
  const leadsToShow = filteredLeads.slice(start, end);

  // Return the results with total count
  return {
    content: leadsToShow,                    // The leads for this page
    totalElements: filteredLeads.length,    // Total number of matching leads
  };
}


// ============================================
// PART 4: GET ONE LEAD (by ID)
// ============================================

// Find and return a single lead by their ID number
export function getLead(id: number) {
  // Get all leads
  const leads = readLeads();

  // Find the lead with matching ID
  const lead = leads.find((lead) => lead.id === id);

  // If no lead found, throw an error
  if (!lead) {
    throw new Error("Lead not found.");
  }

  return lead;  // Return the found lead
}


// ============================================
// PART 5: CREATE LEAD (Add a new lead)
// ============================================

// Create a new lead and save it
export function createLead(data: LeadPayload) {
  // Get all existing leads
  const leads = readLeads();

  // Create a new lead object
  const newLead: Lead = {
    ...data,               // Copy all the data from the form
    id: Date.now(),        // Use current timestamp as ID (unique)
    activities: [],        // Start with no activities
  };

  // Add the new lead to the list
  leads.push(newLead);

  // Save the updated list to localStorage
  saveLeads(leads);

  // Return the newly created lead
  return newLead;
}


// ============================================
// PART 6: UPDATE LEAD (Edit an existing lead)
// ============================================

// Update an existing lead's information
export function updateLead(
  id: number,        // ID of the lead to update
  data: LeadPayload  // New data for the lead
) {
  // Get all leads
  const leads = readLeads();

  // Find the index of the lead we want to update
  const index = leads.findIndex(
    (lead) => lead.id === id
  );

  // If lead not found, throw an error
  if (index === -1) {
    throw new Error("Lead not found.");
  }

  // Create an updated lead by merging old and new data
  const updatedLead: Lead = {
    ...leads[index],   // Keep the old data
    ...data,           // Override with new data
  };

  // Replace the old lead with the updated one
  leads[index] = updatedLead;

  // Save the updated list
  saveLeads(leads);

  // Return the updated lead
  return updatedLead;
}


// ============================================
// PART 7: ADD ACTIVITY (Add a new activity to a lead)
// ============================================

// Add a new activity (call, meeting, email, etc.) to a lead
export function addActivity(
  id: number,        // ID of the lead
  data: Activity     // The activity to add
) {
  // Get all leads
  const leads = readLeads();

  // Find the lead
  const index = leads.findIndex(
    (lead) => lead.id === id
  );

  // If lead not found, throw an error
  if (index === -1) {
    throw new Error("Lead not found.");
  }

  // Create a new activity with an ID
  const newActivity: Activity = {
    ...data,           // Copy the activity data
    id: Date.now(),    // Add a unique ID using timestamp
  };

  // Get existing activities (or empty array if none)
  const currentActivities =
    leads[index].activities || [];

  // Create an updated lead with the new activity
  const updatedLead: Lead = {
    ...leads[index],   // Keep the old lead data
    activities: [
      ...currentActivities,  // Keep existing activities
      newActivity,           // Add the new activity
    ],
    nextActionDate: data.nextActionDate,  // Update the next action date
  };

  // Replace the old lead with the updated one
  leads[index] = updatedLead;

  // Save the updated list
  saveLeads(leads);

  // Return the updated lead
  return updatedLead;
}