import { ApiResponse } from "@/types/api-types";

interface CourseHeaderProps {
  data: ApiResponse;
}

export default function CourseHeader({ data }: CourseHeaderProps) {
  return (
    <div className=" text-white text-start py-10 sm:py-18 px-2">
      <h1 className="text-xl sm:text-4xl font-bold mb-4">{data.data.title}</h1>
      <div
        className="prose mx-auto sm:prose-lg lg:prose-xl text-gray-300"
        dangerouslySetInnerHTML={{ __html: data.data.description }}
      />
    </div>
  );
}
