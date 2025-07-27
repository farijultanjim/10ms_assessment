"use client";

import Media from "./Media";
import Checklist from "./Checklist";
import { ApiResponse } from "@/types/api-types";

interface CourseCardProps {
  data: ApiResponse;
}

export default function CourseCard({ data }: CourseCardProps) {
  return (
    <div className="bg-white text-black p-1 border border-gray-300 max-w-sm">
      <Media data={data} />
      <Checklist data={data} />
      
    </div>
  );
}
