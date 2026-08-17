import Sidebar from "@/src/components/layout/Sidebar";

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />

      <div className="flex-1">
        <main className="p-6">
          <h1 className="text-3xl font-bold text-black">Dashboard</h1>
        </main>
      </div>
    </div>
  );
}
