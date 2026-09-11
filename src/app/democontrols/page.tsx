"use client";

import CRMLayout from "@/src/components/layout/CRMLayout";
import DemoDataControls from "@/src/components/DemoControls/DemoDataControls";
import ShowcaseArchitecture from "@/src/components/DemoControls/ShowcaseArchitecture";

export default function DemoControlsPage() {
  return (
    <CRMLayout onSaveLead={async (_data) => {}}>

      <main className="min-h-screen bg-[#f3f4f1] p-6">

        {/* Page Content */}

        <div className="mx-auto max-w-7xl">

          {/* Top section */}

          <div className="mb-6">

            <p className="mb-1 text-sm font-medium text-[#527b69]">
              POC DATA TOOLKIT
            </p>

            <h2 className="text-2xl font-bold text-gray-800">
              Demo controls
            </h2>

          </div>


          {/* Cards */}

          <div className="grid gap-5 lg:grid-cols-[2fr_1fr]">

            <DemoDataControls />

            <ShowcaseArchitecture />

          </div>

        </div>

      </main>

    </CRMLayout>
  );
}