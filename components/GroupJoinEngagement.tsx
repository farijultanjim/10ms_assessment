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
    <div className="bg-gray-900 text-white p-8 rounded-lg mb-12 relative overflow-hidden">
      <Image
        src={engagement.background.image}
        alt="Background"
        fill
        className="object-cover opacity-50"
        style={{ zIndex: 0 }}
      />
      <div className="relative z-10">
        <div className="flex items-center justify-between gap-5">
          <div className="flex flex-col gap-3">
            {engagement.top_left_icon_img && (
              <Image
                src={engagement.top_left_icon_img}
                alt="Top left icon"
                width={170}
                height={170}
                className=""
              />
            )}
            <h2 className="text-xl font-bold mb-2">{engagement.title}</h2>
            <p className="mb-4 text-sm">{engagement.description}</p>
            <a
              href={engagement.cta.clicked_url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#1CAB55] hover:bg-[#15803D] transition-colors text-white font-medium py-2 px-8 rounded-md cursor-pointer border-[#14773B] border-b-4 w-fit"
            >
              {engagement.cta.text}
            </a>
          </div>
          <div className="hidden lg:block">
            <Image
              src={engagement.thumbnail}
              alt="Thumbnail"
              width={450}
              height={450}
              className="object-cover aspect-video"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
