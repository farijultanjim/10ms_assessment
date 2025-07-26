import Image from "next/image";
import { ApiResponse } from "@/types/api-types";

interface CourseInstructorProps {
  data: ApiResponse;
}

export default function CourseInstructor({ data }: CourseInstructorProps) {
  const section = data.data.sections.find(
    (section) => section.type === "instructors"
  );
  const instructor = section?.values[0];

  if (!instructor) return null;

  return (
    <div className="my-8 ">
      <h2 className="text-2xl font-semibold mb-4">{section.name}</h2>
      <div className="flex flex-col sm:flex-row items-center gap-6 border border-gray-300 p-5 rounded-lg">
        <Image
          src={instructor.image}
          alt={`${instructor.name} profile`}
          width={100}
          height={100}
          className="rounded-full object-cover"
        />
        <div>
          <h3 className="text-xl font-medium mb-2">{instructor.name}</h3>
          
          <div
            className="prose prose-invert max-w-prose text-sm"
            dangerouslySetInnerHTML={{ __html: instructor.description }}
          />
        </div>
      </div>
    </div>
  );
}
