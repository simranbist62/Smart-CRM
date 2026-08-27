export default function Summary() {
  return (
    <section className="flex items-center justify-between rounded-2xl bg-gradient-to-r from-[#214c3d] to-[#39775f] px-7 py-6 text-white">
      <div>
        <p className="text-[10px] font-semibold tracking-[1.5px] text-gray-200">
          THIS MONTH
        </p>

        <h2 className="mt-2 text-2xl font-bold">Good day, CRM</h2>

        <p className="mt-1 text-sm text-gray-200">
          Focus on the follow-ups that move your warmest leads forward.
        </p>
      </div>

      {/* Performance circle */}
      <div className="mr-2 flex h-28 w-28 items-center justify-center rounded-full border-[5px] border-[#e0b44c] bg-[#39775f] outline outline-8 outline-white/10">
        <div className="text-center">
          <p className="text-xl font-bold">0</p>
          <p className="text-[8px] tracking-wide text-gray-200">
            PERFORMANCE SCORE
          </p>
        </div>
      </div>
    </section>
  );
}
