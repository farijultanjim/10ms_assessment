import Image from "next/image";
import { Check } from "lucide-react";
import { ApiResponse } from "@/types/api-types";

interface CourseFeatureExplanationsProps {
  data: ApiResponse;
}

export default function CourseFeatureExplanations({
  data,
}: CourseFeatureExplanationsProps) {
  const section = data.data.sections.find(
    (section) => section.type === "feature_explanations"
  );
  const features = section?.values || [];

  if (!features.length || !section) return null;

  return (
    <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg mb-6">
      <h2 className="text-xl font-semibold mb-4">{section.name}</h2>
      <div className="grid grid-cols-1 gap-6">
        {features.map((feature) => (
          <div
            key={feature.id}
            className="flex flex-col md:flex-row items-center gap-4"
          >
            <div className="flex-1">
              <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
              <ul className="space-y-2">
                {feature.checklist.map((item: string, index: number) => (
                  <li key={index} className="flex items-center text-gray-300">
                    <Check className="w-5 h-5 text-green-400 mr-2" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex-shrink-0">
              <Image
                src={feature.file_url}
                alt={`${feature.title} illustration`}
                width={150}
                height={150}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
