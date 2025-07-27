import { ApiResponse } from "@/types/api-types";
import { Check } from "lucide-react";

interface CoursePointersProps {
  data: ApiResponse;
}

export default function CoursePointers({ data }: CoursePointersProps) {
  const section = data.data.sections.find(
    (section) => section.type === "pointers"
  );
  const pointers = section?.values || [];

  if (!pointers.length || !section) return null;

  return (
    <div className="mb-12">
      <h2 className="text-2xl font-semibold mb-6">{section.name}</h2>
      <div className="border border-gray-300 p-6 rounded-lg ">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {pointers.map((pointer) => (
            <p key={pointer.id} className="flex items-start text-md">
              <span>
                <Check className="text-blue-500 inline-block mr-2" />
              </span>
              <span>{pointer.text}</span>
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
