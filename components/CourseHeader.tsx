import { ApiResponse } from "@/types/api-types";
import Image from "next/image";

interface CourseHeaderProps {
  data: ApiResponse;
}

export default function CourseHeader({ data }: CourseHeaderProps) {
  return (
    <div className=" text-white text-start py-10 sm:py-18 px-2">
      <h1 className="text-xl sm:text-4xl font-bold">{data.data.title}</h1>
      <div className="flex items-center gap-2 my-3">
        <Image
          src={
            "https://cdn.10minuteschool.com/images/Dev_Handoff_Q1_24_Frame_2_1725444418666.png"
          }
          alt="rating"
          width={130}
          height={130}
        />
        <span>(81.8% শিক্ষার্থী কোর্স শেষে ৫ রেটিং দিয়েছেন)</span>
      </div>
      <div
        className="prose mx-auto sm:prose-lg lg:prose-xl text-gray-300"
        dangerouslySetInnerHTML={{ __html: data.data.description }}
      />
    </div>
  );
}
