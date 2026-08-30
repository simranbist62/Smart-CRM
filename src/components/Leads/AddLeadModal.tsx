"use client";

import { useState } from "react";
import {
  leadStatuses,
  type Lead,
  type LeadPayload,
  type LeadStatus,
} from "@/src/lib/leads-api";

// Props received from the parent
type Props = {
  lead: Lead | null;
  onClose: () => void;
  onSave: (data: LeadPayload) => Promise<void>;
};

// Empty form for creating a new lead
const emptyLead: LeadPayload = {
  organizationName: "",
  contactName: "",
  phone: "",
  status: "NEW_LEAD",
  priority: "MEDIUM",
};

export default function AddLeadModal({
  lead,
  onClose,
  onSave,
}: Props) {

  // Form data
  const [form, setForm] = useState<LeadPayload>(
    lead
      ? {
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
      : emptyLead
  );

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Update a form field
  function setField(
    field: keyof LeadPayload,
    value: LeadPayload[keyof LeadPayload]
  ) {
    setForm({
      ...form,
      [field]: value,
    });
  }

  // Save the lead
  async function submit() {
    // Check required fields
    if (
      !form.organizationName.trim() ||
      !form.contactName.trim() ||
      !form.phone.trim()
    ) {
      setError("School, contact name, and phone are required.");
      return;
    }

    setSaving(true);
    setError("");

    try {
      await onSave(form);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Could not save the lead.");
      }

      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 p-4">
      <div className="w-full max-w-2xl rounded-xl bg-white p-6 shadow-xl">

        {/* Header */}
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-bold text-black">
            {lead ? "Edit Lead" : "Add Lead"}
          </h2>

          <button
            onClick={onClose}
            className="text-2xl text-gray-500"
          >
            &times;
          </button>
        </div>

        {/* Form */}
        <div className="grid gap-4 md:grid-cols-2">

          <Field
            label="School / Organization *"
            value={form.organizationName}
            onChange={(value) =>
              setField("organizationName", value)
            }
          />

          <Field
            label="Contact Name *"
            value={form.contactName}
            onChange={(value) =>
              setField("contactName", value)
            }
          />

          <Field
            label="Designation"
            value={form.designation ?? ""}
            onChange={(value) =>
              setField("designation", value)
            }
          />

          <Field
            label="Phone *"
            value={form.phone}
            onChange={(value) =>
              setField("phone", value)
            }
          />

          <Field
            label="Email"
            type="email"
            value={form.email ?? ""}
            onChange={(value) =>
              setField("email", value)
            }
          />

          <Field
            label="Source"
            value={form.source ?? ""}
            onChange={(value) =>
              setField("source", value)
            }
          />

          <Field
            label="Province"
            value={form.province ?? ""}
            onChange={(value) =>
              setField("province", value)
            }
          />

          <Field
            label="District"
            value={form.district ?? ""}
            onChange={(value) =>
              setField("district", value)
            }
          />

          <Field
            label="Lead Type"
            value={form.leadType ?? ""}
            onChange={(value) =>
              setField("leadType", value)
            }
          />

          <Field
            label="Next Action Date"
            type="date"
            value={form.nextActionDate ?? ""}
            onChange={(value) =>
              setField("nextActionDate", value)
            }
          />

          {/* Status */}
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

          {/* Priority */}
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

          {/* Assigned User */}
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

          {/* Notes */}
          <label className="text-sm font-medium text-gray-700 md:col-span-2">
            Notes

            <textarea
              value={form.notes ?? ""}
              onChange={(e) =>
                setField("notes", e.target.value)
              }
              className="mt-1 min-h-24 w-full rounded-lg border p-3 text-black"
            />
          </label>
        </div>

        {/* Error message */}
        {error && (
          <p className="mt-4 text-sm text-red-600">
            {error}
          </p>
        )}

        {/* Buttons */}
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


// Reusable input field
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
