import { ApiResponse } from "@/types/api-types";

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
    <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg mb-6">
      <h2 className="text-xl font-semibold mb-4">{section.name}</h2>
      <ul className="list-disc pl-5 space-y-2">
        {pointers.map((pointer) => (
          <li key={pointer.id} className="text-gray-300">
            {pointer.text}
          </li>
        ))}
      </ul>
    </div>
  );
}
