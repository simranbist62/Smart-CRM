 "use client"; 
 
import { useState } from "react"; 
import { 
  leadStatuses,        // List of possible statuses (NEW_LEAD, CONTACTED, etc.) 
  type Lead,            // The complete Lead type 
  type LeadPayload,     // The data we need to create/update a lead 
  type LeadStatus,      // The status type 
} from "@/src/lib/leads-store"; 
 
// ============================================ 
// PROPS - what this component receives 
// ============================================ 
type Props = { 
  lead: Lead | null;           // If null → we're adding a new lead 
  onClose: () => void;         // Function to close the modal 
  onSave: (data: LeadPayload) => Promise<void>; // Function to save the lead 
}; 
 
// ============================================ 
// EMPTY FORM - used when adding a new lead 
// ============================================ 
const emptyLead: LeadPayload = { 
  organizationName: "", 
  contactName: "", 
  phone: "", 
  status: "NEW_LEAD",      // Default status 
  priority: "MEDIUM",       // Default priority 
}; 
 
 
// ============================================ 
// MAIN COMPONENT 
// ============================================ 
export default function AddLeadModal({ 
  lead,        // The lead we're editing (null if adding new) 
  onClose,     // Close the modal 
  onSave,      // Save the lead 
}: Props) { 
 
  // ============================================ 
  // 1. STATE VARIABLES (form memory) 
  // ============================================ 
 
  // Form data - if we're editing, fill with lead data; if adding, use empty form 
  const [form, setForm] = useState<LeadPayload>( 
    lead 
      ? { 
          // If editing, copy all the lead's data into the form 
          organizationName: lead.organizationName, 
          contactName: lead.contactName, 
          designation: lead.designation, 
          phone: lead.phone, 
          email: lead.email, 
          province: lead.province, 
          district: lead.district, 
          source: lead.source, 
          leadType: lead.leadType, 
          priority: lead.priority, 
          status: lead.status, 
          nextActionDate: lead.nextActionDate, 
          notes: lead.notes, 
          assignedToId: lead.assignedToId, 
        } 
      : emptyLead // If adding, start with empty fields 
  ); 
 
  const [saving, setSaving] = useState(false); // Track if we're saving 
  const [error, setError] = useState("");      // Track error messages 
 
 
  // ============================================ 
  // 2. HELPER FUNCTIONS 
  // ============================================ 
 
  // Update a single field in the form 
  // Example: setField("organizationName", "ABC School") 
  function setField( 
    field: keyof LeadPayload, // Which field to update 
    value: LeadPayload[keyof LeadPayload] // What value to set 
  ) { 
    setForm({ 
      ...form,           // Keep all other fields the same 
      [field]: value,    // Update just this one field 
    }); 
  } 
 
 
  // ============================================ 
  // 3. SAVE FUNCTION 
  // ============================================ 
 
  // This runs when the user clicks "Save" 
  async function submit() { 
    // Check required fields - these must be filled in 
    if ( 
      !form.organizationName.trim() || // School name can't be empty 
      !form.contactName.trim() ||      // Contact name can't be empty 
      !form.phone.trim()              // Phone can't be empty 
    ) { 
      setError("School, contact name, and phone are required."); 
      return; // Stop the function - don't save yet 
    } 
 
    // Start saving 
    setSaving(true); 
    setError(""); 
 
    try { 
      await onSave(form); // Call the save function from the parent 
      // If successful, the parent will close the modal 
    } catch (error) { 
      // If there's an error, show it 
      if (error instanceof Error) { 
        setError(error.message); 
      } else { 
        setError("Could not save the lead."); 
      } 
      setSaving(false); // Stop showing "Saving..." 
    } 
  } 
 
 
  // ============================================ 
  // 4. RENDER THE MODAL 
  // ============================================ 
 
  return ( 
    // Dark overlay that covers the whole screen 
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 p-4"> 
       
      {/* White modal box */} 
      <div className="w-full max-w-2xl rounded-xl bg-white p-6 shadow-xl"> 
 
        {/* ========================================== */} 
        {/* HEADER - Title and close button */} 
        {/* ========================================== */} 
        <div className="mb-5 flex items-center justify-between"> 
          <h2 className="text-xl font-bold text-black"> 
            {lead ? "Edit Lead" : "Add Lead"} {/* Change title based on mode */} 
          </h2> 
          <button 
            onClick={onClose} 
            className="text-2xl text-gray-500" 
          > 
            &times; {/* × symbol - close button */} 
          </button> 
        </div> 
 
        {/* ========================================== */} 
        {/* FORM - All the input fields */} 
        {/* ========================================== */} 
        <div className="grid gap-4 md:grid-cols-2"> 
 
          {/* SCHOOL / ORGANIZATION (required) */} 
          <Field 
            label="School / Organization *" 
            value={form.organizationName} 
            onChange={(value) => setField("organizationName", value)} 
          /> 
 
          {/* CONTACT NAME (required) */} 
          <Field 
            label="Contact Name *" 
            value={form.contactName} 
            onChange={(value) => setField("contactName", value)} 
          /> 
 
          {/* DESIGNATION (optional) */} 
          <Field 
            label="Designation" 
            value={form.designation ?? ""} 
            onChange={(value) => setField("designation", value)} 
          /> 
 
          {/* PHONE (required) */} 
          <Field 
            label="Phone *" 
            value={form.phone} 
            onChange={(value) => setField("phone", value)} 
          /> 
 
          {/* EMAIL (optional) */} 
          <Field 
            label="Email" 
            type="email" 
            value={form.email ?? ""} 
            onChange={(value) => setField("email", value)} 
          /> 
 
          {/* SOURCE (optional) - where did the lead come from? */} 
          <Field 
            label="Source" 
            value={form.source ?? ""} 
            onChange={(value) => setField("source", value)} 
          /> 
 
          {/* PROVINCE (optional) */} 
          <Field 
            label="Province" 
            value={form.province ?? ""} 
            onChange={(value) => setField("province", value)} 
          /> 
 
          {/* DISTRICT (optional) */} 
          <Field 
            label="District" 
            value={form.district ?? ""} 
            onChange={(value) => setField("district", value)} 
          /> 
 
          {/* LEAD TYPE (optional) */} 
          <Field 
            label="Lead Type" 
            value={form.leadType ?? ""} 
            onChange={(value) => setField("leadType", value)} 
          /> 
 
          {/* NEXT ACTION DATE (optional) - when to follow up */} 
          <Field 
            label="Next Action Date" 
            type="date" 
            value={form.nextActionDate ?? ""} 
            onChange={(value) => setField("nextActionDate", value)} 
          /> 
 
          {/* STATUS - dropdown to select status */} 
          <label className="text-sm font-medium text-gray-700"> 
            Status 
            <select 
              value={form.status} 
              onChange={(e) => 
                setField("status", e.target.value as LeadStatus) 
              } 
              className="mt-1 w-full rounded-lg border p-3 text-black" 
            > 
              {leadStatuses.map((status) => ( 
                <option key={status} value={status}> 
                  {status} 
                </option> 
              ))} 
            </select> 
          </label> 
 
          {/* PRIORITY - dropdown (LOW, MEDIUM, HIGH) */} 
          <label className="text-sm font-medium text-gray-700"> 
            Priority 
            <select 
              value={form.priority} 
              onChange={(e) => 
                setField( 
                  "priority", 
                  e.target.value as LeadPayload["priority"] 
                ) 
              } 
              className="mt-1 w-full rounded-lg border p-3 text-black" 
            > 
              <option value="LOW">LOW</option> 
              <option value="MEDIUM">MEDIUM</option> 
              <option value="HIGH">HIGH</option> 
            </select> 
          </label> 
 
          {/* ASSIGNED USER ID (optional) - who is handling this lead */} 
          <Field 
            label="Assigned User ID" 
            type="number" 
            value={form.assignedToId?.toString() ?? ""} 
            onChange={(value) => 
              setField( 
                "assignedToId", 
                value ? Number(value) : undefined 
              ) 
            } 
          /> 
 
          {/* NOTES - text area for extra details */} 
          <label className="text-sm font-medium text-gray-700 md:col-span-2"> 
            Notes 
            <textarea 
              value={form.notes ?? ""} 
              onChange={(e) => setField("notes", e.target.value)} 
              className="mt-1 min-h-24 w-full rounded-lg border p-3 text-black" 
            /> 
          </label> 
        </div> 
 
        {/* ========================================== */} 
        {/* ERROR MESSAGE - shown if something goes wrong */} 
        {/* ========================================== */} 
        {error && ( 
          <p className="mt-4 text-sm text-red-600"> 
            {error} 
          </p> 
        )} 
 
        {/* ========================================== */} 
        {/* BUTTONS - Cancel and Save */} 
        {/* ========================================== */} 
        <div className="mt-6 flex justify-end gap-3"> 
          <button 
            onClick={onClose} 
            className="rounded-lg border px-4 py-2 text-black" 
          > 
            Cancel 
          </button> 
 
          <button 
            disabled={saving} 
            onClick={submit} 
            className="rounded-lg bg-green-700 px-5 py-2 text-white disabled:opacity-60" 
          > 
            {saving 
              ? "Saving..." 
              : lead 
              ? "Save Changes" 
              : "Add Lead"} 
          </button> 
        </div> 
      </div> 
    </div> 
  ); 
} 
 
 
// ============================================ 
// REUSABLE INPUT FIELD COMPONENT 
// ============================================ 
// This is a helper component to avoid repeating code 
function Field({ 
  label, 
  value, 
  onChange, 
  type = "text", 
}: { 
  label: string; 
  value: string; 
  onChange: (value: string) => void; 
  type?: string; 
}) { 
  return ( 
    <label className="text-sm font-medium text-gray-700"> 
      {label} 
      <input 
        type={type} 
        value={value} 
        onChange={(e) => onChange(e.target.value)} 
        className="mt-1 w-full rounded-lg border p-3 text-black" 
      /> 
    </label> 
  ); 
}