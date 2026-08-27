// Shows where the leads are coming from
export default function LeadSources() {
  return (
    <div className="mt-6 w-[75%] max-w-lg rounded-lg bg-white p-6 shadow-md">

      {/* Section title */}
      <h2 className="text-xl font-bold text-black">
        Lead Sources
      </h2>

      {/* Short description */}
      <p className="mb-6 text-gray-500">
        Where opportunities originate
      </p>

      {/* Social Media */}
      <div className="mb-4">
        <div className="mb-1 flex justify-between font-bold text-black">
          <span>Social Media</span>
          <span>41</span>
        </div>

        {/* Progress bar */}
        <div className="h-2 w-full rounded-full bg-gray-200">
          <div className="h-2 w-full rounded-full bg-[#4b707d]"></div>
        </div>
      </div>

      {/* Website Inquiry */}
      <div className="mb-4">
        <div className="mb-1 flex justify-between font-bold text-black">
          <span>Website Inquiry</span>
          <span>39</span>
        </div>

        <div className="h-2 w-full rounded-full bg-gray-200">
          <div className="h-2 w-[95%] rounded-full bg-[#4b707d]"></div>
        </div>
      </div>

      {/* Unspecified */}
      <div className="mb-4">
        <div className="mb-1 flex justify-between font-bold text-black">
          <span>Unspecified</span>
          <span>33</span>
        </div>

        <div className="h-2 w-full rounded-full bg-gray-200">
          <div className="h-2 w-[85%] rounded-full bg-[#4b707d]"></div>
        </div>
      </div>

      {/* Cold Call */}
      <div className="mb-4">
        <div className="mb-1 flex justify-between font-bold text-black">
          <span>Cold Call</span>
          <span>23</span>
        </div>

        <div className="h-2 w-full rounded-full bg-gray-200">
          <div className="h-2 w-[70%] rounded-full bg-[#4b707d]"></div>
        </div>
      </div>

      {/* Walk-in */}
      <div className="mb-4">
        <div className="mb-1 flex justify-between font-bold text-black">
          <span>Walk-in</span>
          <span>15</span>
        </div>

        <div className="h-2 w-full rounded-full bg-gray-200">
          <div className="h-2 w-[50%] rounded-full bg-[#4b707d]"></div>
        </div>
      </div>

      {/* Referral */}
      <div>
        <div className="mb-1 flex justify-between font-bold text-black">
          <span>Referral</span>
          <span>2</span>
        </div>

        <div className="h-2 w-full rounded-full bg-gray-200">
          <div className="h-2 w-[10%] rounded-full bg-[#4b707d]"></div>
        </div>
      </div>

    </div>
  );
}