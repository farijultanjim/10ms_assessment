import Image from "next/image";
import { ApiResponse } from "@/types/api-types";

interface ChecklistProps {
  data: ApiResponse;
}

export default function Checklist({ data }: ChecklistProps) {
  return (
    <div className="px-4 py-2">
      {/* pricing section  */}
      <div className="mb-6">
        <div className="flex items-center gap-3">
          <span className="text-xl font-semibold text-gray-800">৳ 3850</span>
          <span className="text-lg text-gray-700 line-through">৳ 5000</span>
          <span className="bg-orange-500 text-white text-sm px-3 py-2 rounded font-medium">
            1150 ৳ ছাড়
          </span>
        </div>
      </div>

      {/* Enroll Button */}
      <button className="w-full bg-[#1CAB55] hover:bg-[#15803D] transition-colors text-white font-medium py-2 px-4 rounded-md cursor-pointer mb-6 border-b-4 border-[#14773B]">
        {data.data.cta_text.name}
      </button>

      {/* Checklist */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-3">Course Highlights</h2>
        <ul className="space-y-2.5">
          {data.data.checklist.map((item, index) => (
            <li key={index} className="flex items-center text-md">
              <Image
                src={item.icon}
                alt={`${item.text} icon`}
                width={24}
                height={24}
                className="mr-3"
              />
              {item.text}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
