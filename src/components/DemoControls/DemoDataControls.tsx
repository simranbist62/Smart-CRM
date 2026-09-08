"use client";

import { useRef, useState } from "react";

const STORAGE_KEY = "smart-crm-leads";

export default function DemoDataControls() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [message, setMessage] = useState("");

  // Export the data
  function handleExport() {
    const data = localStorage.getItem(STORAGE_KEY);

    if (!data) {
      setMessage("No demo data found.");
      return;
    }

    const blob = new Blob([data], {
      type: "application/json",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = "smart-crm-backup.json";

    link.click();

    URL.revokeObjectURL(url);

    setMessage("Demo data exported successfully.");
  }


  // Open file selector
  function handleImportClick() {
    fileInputRef.current?.click();
  }


  // Import JSON file
  function handleImport(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      try {
        const data = reader.result as string;

        JSON.parse(data);

        localStorage.setItem(STORAGE_KEY, data);

        setMessage("Demo data imported successfully.");

        window.location.reload();
      } catch {
        setMessage("Invalid JSON file.");
      }
    };

    reader.readAsText(file);
  }


  // Reset demo data
  function handleReset() {
    const confirmReset = window.confirm(
      "Are you sure you want to reset the demo data?"
    );

    if (!confirmReset) {
      return;
    }

    localStorage.removeItem(STORAGE_KEY);

    setMessage("Demo data has been reset.");

    window.location.reload();
  }


  return (
    <div className="rounded-xl border border-[#e1e4df] bg-white p-6 shadow-sm">

      {/* Small heading */}

      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.15em] text-[#527b69]">
        POC DATA TOOLKIT
      </p>


      {/* Title */}

      <h2 className="text-2xl font-bold text-gray-800">
        Portable browser data
      </h2>


      {/* Description */}

      <p className="mt-4 max-w-2xl text-sm leading-6 text-gray-500">
        The complete CRM runs from bundled demonstration data.
        All edits are saved to this browser only—there is no
        backend service or remote database.
      </p>


      {/* Buttons */}

      <div className="mt-6 flex flex-wrap gap-3">

        {/* Export */}

        <button
          type="button"
          onClick={handleExport}
          className="rounded-lg bg-[#527b69] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#456b5b]"
        >
          Export JSON backup
        </button>


        {/* Import */}

        <button
          type="button"
          onClick={handleImportClick}
          className="rounded-lg border border-[#dfe3df] bg-white px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
        >
          Import JSON
        </button>


        {/* Hidden file input */}

        <input
          ref={fileInputRef}
          type="file"
          accept=".json,application/json"
          onChange={handleImport}
          className="hidden"
        />


        {/* Reset */}

        <button
          type="button"
          onClick={handleReset}
          className="rounded-lg border border-[#e5b8b2] bg-white px-5 py-3 text-sm font-semibold text-[#bd6d63] transition hover:bg-[#fff7f6]"
        >
          Reset demo data
        </button>

      </div>


      {/* Message */}

      {message && (
        <p className="mt-4 text-sm font-medium text-[#527b69]">
          {message}
        </p>
      )}

    </div>
  );
}