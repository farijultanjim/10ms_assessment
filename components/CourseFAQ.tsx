"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { ApiResponse } from "@/types/api-types";

interface CourseFAQProps {
  data: ApiResponse;
}

export default function CourseFAQ({ data }: CourseFAQProps) {
  const section = data.data.sections.find((section) => section.type === "faq");
  const faqItems = section?.values || [];

  
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  
  const toggleAccordion = (index: number) => {
      setOpenIndex(openIndex === index ? null : index);
    };
    
    if (!faqItems.length || !section) return null;
  return (
    <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg mb-6">
      <h2 className="text-xl font-semibold mb-4">{section.name}</h2>
      <div className="space-y-2">
        {faqItems.map((item, index) => (
          <div key={item.id} className="border-b border-gray-700">
            <button
              onClick={() => toggleAccordion(index)}
              aria-label={`Toggle details for ${item.question}`}
              className="w-full text-left py-3 font-medium flex justify-between items-center"
            >
              <span className="prose prose-invert">{item.question}</span>
              <ChevronDown
                className={`transition-transform duration-300 ${
                  openIndex === index ? "rotate-180" : ""
                }`}
                size={20}
              />
            </button>
            {openIndex === index && (
              <div
                className="prose prose-invert max-w-prose py-2"
                dangerouslySetInnerHTML={{ __html: item.answer }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
