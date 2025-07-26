import Image from "next/image";
import { ApiResponse } from "@/types/api-types";

interface GroupJoinEngagementProps {
  data: ApiResponse;
}

export default function GroupJoinEngagement({
  data,
}: GroupJoinEngagementProps) {
  const section = data.data.sections.find(
    (section) => section.type === "group_join_engagement"
  );
  const engagement = section?.values[0];

  if (!engagement || !section) return null;

  return (
    <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg mb-6 relative overflow-hidden">
      <Image
        src={engagement.background.image}
        alt="Background"
        fill
        className="object-cover opacity-50"
        style={{ zIndex: 0 }}
      />
      <div className="relative z-10">
        {engagement.top_left_icon_img && (
          <Image
            src={engagement.top_left_icon_img}
            alt="Top left icon"
            width={200}
            height={200}
            className="absolute top-4 left-4"
          />
        )}
        <h2
          className="text-2xl font-bold mb-2"
           
        >
          {engagement.title}
        </h2>
        <p
          className="text-lg mb-4"
          
        >
          {engagement.description}
        </p>
        <div className="mb-4">
          <Image
            src={engagement.thumbnail}
            alt="Thumbnail"
            width={300}
            height={169} // 16:9 aspect ratio (300 / 169 ≈ 1.78)
            className="rounded-lg object-cover"
          />
        </div>
        <a
          href={engagement.cta.clicked_url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          {engagement.cta.text}
        </a>
      </div>
    </div>
  );
}
