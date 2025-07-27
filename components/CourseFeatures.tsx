import Image from "next/image";
import { ApiResponse } from "@/types/api-types";

interface CourseFeaturesProps {
  data: ApiResponse;
}

export default function CourseFeatures({ data }: CourseFeaturesProps) {
  const section = data.data.sections.find(
    (section) => section.type === "features"
  );
  const features = section?.values || [];

  if (!features.length || !section) return null;

  return (
    <div className="mb-12">
      <h2 className="text-2xl font-semibold mb-4">{section.name}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 bg-gray-900 text-white p-8 rounded-lg">
        {features.map((feature) => (
          <div key={feature.id} className="flex items-start gap-4">
            <Image
              src={feature.icon}
              alt={`${feature.title} icon`}
              width={36}
              height={36}
              className="flex-shrink-0"
            />
            <div>
              <h3 className=" font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm">{feature.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
