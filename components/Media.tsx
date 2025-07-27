"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { ApiResponse } from "@/types/api-types";

interface MediaProps {
  data: ApiResponse;
}

export default function Media({ data }: MediaProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const thumbnailsRef = useRef<HTMLDivElement>(null);

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
    <div className="mb-4">
      {/* Main Media Display */}
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
            height={337}
            className="aspect-video object-cover rounded"
          />
        )}
        <button
          onClick={handlePrev}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white cursor-pointer text-gray-600 p-2 rounded-full shadow-lg hover:bg-gray-50 transition-colors"
          title="Previous media"
          aria-label="Previous media"
        >
          <ChevronLeftIcon className="w-4 h-4" />
        </button>
        <button
          onClick={handleNext}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white cursor-pointer text-gray-600 p-2 rounded-full shadow-lg hover:bg-gray-50 transition-colors"
          title="Next media"
          aria-label="Next media"
        >
          <ChevronRightIcon className="w-4 h-4" />
        </button>
      </div>

      {/* Scrollable Thumbnails Section */}
      <div className="pt-4 px-3">
        {/* Scrollable Thumbnails Container */}
        <div
          ref={thumbnailsRef}
          className="flex overflow-x-auto space-x-3 pb-2 no-scrollbar"
        >
          {data.data.media.map((item, index) => (
            <div
              key={index}
              onClick={() => handleThumbnailClick(index)}
              className={`flex-shrink-0 cursor-pointer transition-all duration-200 ${
                index === currentIndex
                  ? "border-2 border-green-500 rounded "
                  : "border-2 border-transparent rounded hover:border-gray-300"
              }`}
            >
              {item.resource_type === "video" ? (
                <div className="relative">
                  <Image
                    src={
                      item.thumbnail_url ||
                      "https://via.placeholder.com/100x56?text=No+Thumbnail"
                    }
                    alt={`Thumbnail ${index + 1}`}
                    width={70}
                    height={56}
                    className="aspect-video object-cover rounded"
                  />
                  {/* Video Play Icon Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white/40 rounded-full p-1.5">
                      <div className="bg-white rounded-full p-0.5">
                        <svg className="w-3 h-3" viewBox="0 0 24 24">
                          <path
                            d="M8 5v14l11-7z"
                            fill="#ef4444"
                            stroke="none"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <Image
                  src={item.resource_value}
                  alt={`Thumbnail ${index + 1}`}
                  width={70}
                  height={56}
                  className="aspect-video object-cover rounded"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
