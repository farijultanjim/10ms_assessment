"use client";

import { useState } from "react";
import Image from "next/image";
import { ApiResponse } from "@/types/api-types";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

interface CourseCardProps {
  data: ApiResponse;
}

export default function CourseCard({ data }: CourseCardProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev > 0 ? prev - 1 : data.data.media.length - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev < data.data.media.length - 1 ? prev + 1 : 0
    );
  };

  const handleThumbnailClick = (index: number) => {
    setCurrentIndex(index);
  };

  const currentMedia = data.data.media[currentIndex];

  return (
    <div className="bg-white text-black p-1">
      {/* Media Carousel */}
      <div className="mb-4">
        <div className="relative">
          {currentMedia.resource_type === "video" ? (
            <iframe
              width="100%"
              height="auto"
              src={`https://www.youtube.com/embed/${currentMedia.resource_value}`}
              title={`YouTube video ${currentIndex + 1}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="aspect-video"
            />
          ) : (
            <Image
              src={currentMedia.resource_value}
              alt={`Gallery item ${currentIndex + 1}`}
              width={600}
              height={337} // 16:9 aspect ratio (600 / 337 ≈ 1.78)
              className="aspect-video object-cover rounded"
            />
          )}
          <button
            onClick={handlePrev}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white cursor-pointer text-gray-600 p-2 rounded-full"
            title="Previous media"
            aria-label="Previous media"
          >
            <ChevronLeftIcon className="w-4 h-4" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white cursor-pointer text-gray-600 p-2 rounded-full"
            title="Next media"
            aria-label="Next media"
          >
            <ChevronRightIcon className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Thumbnail Preview Row */}
      <div className="mb-4 px-3">
        <div className="flex overflow-x-auto space-x-3 pb-2 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
          {data.data.media.map((item, index) => (
            <div
              key={index}
              onClick={() => handleThumbnailClick(index)}
              className={`cursor-pointer ${
                index === currentIndex
                  ? "border-2 border-green-500 rounded"
                  : ""
              }`}
            >
              {item.resource_type === "video" ? (
                <Image
                  src={
                    item.thumbnail_url ||
                    "https://via.placeholder.com/100?text=No+Thumbnail"
                  }
                  alt={`Thumbnail ${index + 1}`}
                  width={96}
                  height={54}
                  className="aspect-video object-cover "
                />
              ) : (
                <Image
                  src={item.resource_value}
                  alt={`Thumbnail ${index + 1}`}
                  width={96}
                  height={54}
                  className="aspect-video object-cover "
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="px-4 py-2">
        {/* Enroll Button */}
        <button className="w-full bg-[#1CAB55] hover:bg-[#15803D] transition-colors text-white font-medium py-2 px-4 rounded-md cursor-pointer mb-6 border-b-4 border-[#14773B] hidden lg:block">
          {data.data.cta_text.name}
        </button>

        {/* Checklist */}
        <div className="mb-4 hidden lg:block">
          <h2 className="text-lg font-semibold mb-3">Course Highlights</h2>
          <ul className="space-y-2.5">
            {data.data.checklist.map((item, index) => (
              <li key={index} className=" flex items-center">
                <Image
                  src={item.icon}
                  alt={`${item.text} icon`}
                  width={24}
                  height={24}
                  className="mr-3"
                />
                {item.text}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
