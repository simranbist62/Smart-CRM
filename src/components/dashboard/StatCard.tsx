// Defines the data that the StatCard component receives
type Stats = {
  heading: string;
  number: number;
};

// Displays a small card with a heading and its number
export default function StatCard({ heading, number }: Stats) {
  return (
    <div className="h-28 w-48 rounded-lg bg-white p-6">

      {/* Card heading */}
      <h3 className="font-bold text-[#adabaa]">
        {heading}
      </h3>

      {/* Card number */}
      <p className="text-3xl font-bold text-black">
        {number}
      </p>

    </div>
  );
}