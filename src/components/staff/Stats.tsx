type StaffProps = {
  heading: string;
  number: number;
};

export default function Stats({ heading, number }: StaffProps) {
  return (
    <div className="h-24 w-68 rounded-lg bg-white p-6">
      {/* Card heading */}
      <h3 className="font-bold text-[#adabaa]">{heading}</h3>

      {/* Card number */}
      <p className="text-3xl font-bold text-black">{number}</p>
    </div>
  );
}
