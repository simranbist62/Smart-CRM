export default function ActionQueue() {
  return (
    <section className="h-[277px] rounded-xl border border-gray-200 bg-white p-5">
      <h2 className="text-base font-bold text-[#17201c]">Action queue</h2>

      <p className="mt-1 text-xs text-gray-500">
        Due today and overdue follow-ups
      </p>

      <div className="flex h-[190px] items-center justify-center">
        <p className="text-sm text-gray-500">You are all caught up.</p>
      </div>
    </section>
  );
}
