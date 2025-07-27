"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { ApiResponse } from "@/types/api-types";

interface CourseAboutProps {
  data: ApiResponse;
}

export default function CourseAbout({ data }: CourseAboutProps) {
  const section = data.data.sections.find(
    (section) => section.type === "about"
  );
  const aboutItems = section?.values || [];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  if (!aboutItems.length || !section) return null;

  return (
    <div className="mb-12">
      <h2 className="text-2xl font-semibold mb-4">{section.name}</h2>
      <div className="space-y-2 border border-gray-300 p-6 rounded-lg">
        {aboutItems.map((item, index) => (
          <div
            key={item.id}
            className="border-b border-gray-300 border-dashed "
          >
            <button
              onClick={() => toggleAccordion(index)}
              className="w-full text-left py-3 font-medium flex justify-between items-center cursor-pointer"
              aria-label={`Toggle details for ${item.title.replace(
                /<[^>]+>/g,
                ""
              )}`}
            >
              <div
                className="prose prose-invert "
                dangerouslySetInnerHTML={{ __html: item.title }}
              />
              <ChevronDown
                className={`transition-transform duration-300 ${
                  openIndex === index ? "rotate-180" : ""
                }`}
                size={20}
              />
            </button>
            {openIndex === index && (
              <div
                className="prose prose-invert max-w-prose py-2 text-gray-600"
                dangerouslySetInnerHTML={{ __html: item.description }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
