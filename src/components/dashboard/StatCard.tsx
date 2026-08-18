type Stats = {
  heading: string;
  number: number;
};

export default function StatCard({ heading, number }: Stats) {
  return (
    <div className="bg-white rounded-lg w-48 h-28 p-6">
      <h3 className="text-[#adabaa] font-bold">{heading}</h3>
      <p className="text-black font-bold text-3xl">{number}</p>
    </div>
  );
}
