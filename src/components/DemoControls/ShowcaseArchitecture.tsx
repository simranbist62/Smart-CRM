export default function ShowcaseArchitecture() {
  return (
    <div className="rounded-xl border border-[#e1e4df] bg-white p-6 shadow-sm">

      <h2 className="mb-6 text-xl font-bold text-gray-800">
        Showcase architecture
      </h2>


      {/* Hosting */}

      <ArchitectureItem
        title="HOSTING"
        value="Vercel static + Next.js"
      />


      {/* Data source */}

      <ArchitectureItem
        title="DATA SOURCE"
        value="Excel-derived bundled JSON"
      />


      {/* Persistence */}

      <ArchitectureItem
        title="PERSISTENCE"
        value="Browser localStorage"
      />


      {/* Role */}

      <ArchitectureItem
        title="ROLE DEMONSTRATION"
        value="Admin · Manager · Sales"
      />


      {/* Description */}

      <p className="mt-5 text-sm leading-5 text-gray-500">
        This POC is intentionally optimized for demonstrations.
        Changes are device-specific and are not shared between
        browsers.
      </p>

    </div>
  );
}


function ArchitectureItem({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="border-b border-[#e6e8e5] py-4 last:border-b-0">

      <p className="text-[11px] font-medium tracking-wide text-gray-400">
        {title}
      </p>

      <p className="mt-1 text-sm font-semibold text-gray-800">
        {value}
      </p>

    </div>
  );
}