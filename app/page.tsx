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

export default async function HomePage() {
  const data: ApiResponse = await fetchCourseData();

  return (
    <main className="">
      <div className="bg-gray-900  ">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto relative">
          <div className="lg:col-span-2">
            <CourseHeader data={data} />
          </div>
          <div className="absolute top-10 right-0">
            <CourseCard data={data} />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-20 max-w-6xl mx-auto">
        {/* all the sections */}
        <div className="lg:col-span-2">
          <CourseInstructor data={data} />
          <CourseFeatures data={data} />
          <GroupJoinEngagement data={data} />
          <CoursePointers data={data} />
          <CourseAbout data={data} />
          <CourseFeatureExplanations data={data} />
          <CourseFAQ data={data} />
        </div>
      </div>
    </main>
  );
}

// "use client";

// import { useState, useEffect, useRef } from "react";
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
// import StickyCourseCard from "@/components/StickyCourseCard";

// export default function HomePage() {
//   const [data, setData] = useState<ApiResponse | null>(null);
//   const [isSticky, setIsSticky] = useState(false);
//   const cardRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       const result = await fetchCourseData();
//       setData(result);
//     };
//     fetchData();

//     const handleScroll = () => {
//       if (cardRef.current) {
//         const cardRect = cardRef.current.getBoundingClientRect();
//         const isFullyBelowViewport = cardRect.top >= window.innerHeight;
//         const isPartiallyVisible = cardRect.bottom > 0;
//         setIsSticky(isFullyBelowViewport && !isPartiallyVisible);
//       }
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   if (!data) return <div className="text-white">Loading...</div>;

//   return (
//     <main className="bg-black">
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto p-4">
//         {/* Mobile layout */}
//         <div className="lg:hidden">
//           <div className="course-card" ref={cardRef}>
//             <CourseCard data={data} />
//           </div>
//           <CourseHeader data={data} />
//           <StickyCourseCard data={data} />
//           <CourseInstructor data={data} />
//           <CourseFeatures data={data} />
//           <GroupJoinEngagement data={data} />
//           <CoursePointers data={data} />
//           <CourseAbout data={data} />
//           <CourseFeatureExplanations data={data} />
//           <CourseFAQ data={data} />
//         </div>

//         {/* Desktop layout */}
//         <div className="hidden lg:block lg:col-span-2">
//           <CourseHeader data={data} />
//           <CourseInstructor data={data} />
//           <CourseFeatures data={data} />
//           <GroupJoinEngagement data={data} />
//           <CoursePointers data={data} />
//           <CourseAbout data={data} />
//           <CourseFeatureExplanations data={data} />
//           <CourseFAQ data={data} />
//         </div>
//         <div className="hidden lg:block lg:col-span-1">
//           {!isSticky && (
//             <div className="course-card" ref={cardRef}>
//               <CourseCard data={data} />
//             </div>
//           )}
//           {isSticky && <StickyCourseCard data={data} />}
//         </div>
//       </div>
//     </main>
//   );
// }
