import { ApiResponse } from "@/types/api-types";
import Image from "next/image";

interface StickyCourseCardProps {
  data: ApiResponse;
}

export default function StickyCourseCard({ data }: StickyCourseCardProps) {
  const course = data?.data;

  if (!course) return null;

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg sticky top-8">
      <button className="w-full bg-[#1CAB55] hover:bg-[#15803D] transition-colors text-white font-medium py-2 px-4 rounded-md cursor-pointer mb-6 border-b-4 border-[#14773B]">
        {data.data.cta_text.name}
      </button>

      <h3 className="text-lg font-bold mb-2">Course Highlights</h3>
      <ul className="space-y-2.5 ">
        {data.data.checklist.map((item, index) => (
          <li key={index} className=" flex items-center">
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
  );
}
