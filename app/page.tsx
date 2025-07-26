// import { fetchCourseData } from "@/lib/data-fetch";
// import { ApiResponse } from "@/types/api-types";
// import CourseHeader from "@/components/CourseHeader";
// import CourseCard from "@/components/CourseCard";
// import CourseInstructor from "@/components/CourseInstructor";
// import CourseFeatures from "@/components/CourseFeatures";
// import GroupJoinEngagement from "@/components/GroupJoinEngagement";
// import CoursePointers from "@/components/CoursePointers";
// import CourseAbout from "@/components/CourseAbout";
// import CourseFeatureExplanations from "@/components/CourseFeatureExplanations";
// import CourseFAQ from "@/components/CourseFAQ";

// export default async function HomePage() {
//   const data: ApiResponse = await fetchCourseData();

//   return (
//     <main className="bg-black">
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
//         {/* Main content area with CourseHeader and CourseInstructor */}
//         <div className="lg:col-span-2">
//           <CourseHeader data={data} />
//           <CourseInstructor data={data} />
//           <CourseFeatures data={data} />
//           <GroupJoinEngagement data={data} />
//           <CoursePointers data={data} />
//           <CourseAbout data={data} />
//           <CourseFeatureExplanations data={data} />
//           <CourseFAQ data={data} />
//         </div>

//         {/* Sidebar card area (sticky on desktop, top on mobile) */}
//         <div className="lg:sticky lg:top-8">
//           <CourseCard data={data} />
//         </div>
//       </div>
//     </main>
//   );
// }


"use client";

import { useState, useEffect } from "react";
import { fetchCourseData } from "@/lib/data-fetch";
import { ApiResponse } from "@/types/api-types";
import CourseHeader from "@/components/CourseHeader";
import CourseCard from "@/components/CourseCard";
import CourseInstructor from "@/components/CourseInstructor";
import CourseFeatures from "@/components/CourseFeatures";
import GroupJoinEngagement from "@/components/GroupJoinEngagement";
import CoursePointers from "@/components/CoursePointers";
import CourseAbout from "@/components/CourseAbout";
import CourseFeatureExplanations from "@/components/CourseFeatureExplanations";
import CourseFAQ from "@/components/CourseFAQ";
import StickyCourseCard from "@/components/StickyCourseCard";

export default function HomePage() {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchCourseData();
      setData(result);
    };
    fetchData();

    const handleScroll = () => {
      const cardHeight =
        document.querySelector(".course-card")?.clientHeight || 0;
      setIsSticky(window.scrollY > cardHeight);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!data) return <div className="text-white">Loading...</div>;

  return (
    <main className="bg-black">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto p-4">
        {/* Mobile layout */}
        <div className="lg:hidden">
          <CourseCard data={data} className="course-card" />
          <CourseHeader data={data} />
          <StickyCourseCard data={data} />
          <CourseInstructor data={data} />
          <CourseFeatures data={data} />
          <GroupJoinEngagement data={data} />
          <CoursePointers data={data} />
          <CourseAbout data={data} />
          <CourseFeatureExplanations data={data} />
          <CourseFAQ data={data} />
        </div>

        {/* Desktop layout */}
        <div className="hidden lg:block lg:col-span-2">
          <CourseHeader data={data} />
          <CourseInstructor data={data} />
          <CourseFeatures data={data} />
          <GroupJoinEngagement data={data} />
          <CoursePointers data={data} />
          <CourseAbout data={data} />
          <CourseFeatureExplanations data={data} />
          <CourseFAQ data={data} />
        </div>
        <div className="hidden lg:block lg:col-span-1">
          {!isSticky && <CourseCard data={data} className="course-card" />}
          {isSticky && <StickyCourseCard data={data} />}
        </div>
      </div>
    </main>
  );
}