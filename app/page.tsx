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
// import Media from "@/components/Media";
// import Checklist from "@/components/Checklist";

// export default async function HomePage() {
//   const data: ApiResponse = await fetchCourseData();

//   return (
//     <main className="">
//       <div className="bg-gray-900  hidden lg:block">
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto relative">
//           <div className="lg:col-span-2">
//             <CourseHeader data={data} />
//           </div>
//           <div className="absolute top-10 right-0">
//             <CourseCard data={data} />
//           </div>
//         </div>
//       </div>
//       <div className="flex flex-col lg:hidden">
//         <div className="bg-gray-900 px-2 py-8">
//           <Media data={data} />
//           <CourseHeader data={data} />
//         </div>
//         <Checklist data={data} />
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-20 max-w-6xl mx-auto">
//         {/* all the sections */}
//         <div className="lg:col-span-2">
//           <CourseInstructor data={data} />
//           <CourseFeatures data={data} />
//           <GroupJoinEngagement data={data} />
//           <CoursePointers data={data} />
//           <CourseAbout data={data} />
//           <CourseFeatureExplanations data={data} />
//           <CourseFAQ data={data} />
//         </div>
//       </div>
//     </main>
//   );
// }

"use client";

import { useState, useEffect, useRef } from "react";
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
import Media from "@/components/Media";
import Checklist from "@/components/Checklist";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

export default function HomePage() {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [activeSection, setActiveSection] = useState<number | null>(null);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const navbarRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchCourseData();
      setData(result);
    };
    fetchData();

    const handleScroll = () => {
      sectionRefs.current.forEach((ref, index) => {
        if (ref && ref.getBoundingClientRect().top <= 100) {
          setActiveSection(index);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (index: number) => {
    sectionRefs.current[index]?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollNavbar = (direction: "left" | "right") => {
    if (navbarRef.current) {
      const scrollAmount = 200;
      navbarRef.current.scrollBy({
        left: direction === "right" ? scrollAmount : -scrollAmount,
        behavior: "smooth",
      });
    }
  };

  if (!data) return <div className="text-white">Loading...</div>;

  const displayedSectionTypes = [
    "instructors",
    "features",
    "group_join_engagement",
    "pointers",
    "about",
    "feature_explanations",
    "faq",
  ];

  // Filter sections once and use consistently
  const filteredSections = data.data.sections.filter((section) =>
    displayedSectionTypes.includes(section.type)
  );

  return (
    <main className="px-4 lg:px-0">
      <div className="bg-gray-900 hidden lg:block">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto relative">
          <div className="lg:col-span-2">
            <CourseHeader data={data} />
          </div>
          <div className="absolute top-10 right-0">
            <CourseCard data={data} />
          </div>
        </div>
      </div>
      <div className="flex flex-col lg:hidden">
        <div className="bg-gray-900 px-2 py-8">
          <Media data={data} />
          <CourseHeader data={data} />
        </div>
        <Checklist data={data} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-20 max-w-6xl mx-auto">
        {/* All the sections */}
        <div className="lg:col-span-2">
          <nav className="sticky top-0 z-30 bg-white  py-3">
            <div className="flex items-center px-4 py-2 border-b border-gray-300 gap-1.5">
              <button
                onClick={() => scrollNavbar("left")}
                className="text-gray-600 p-1.5 hover:text-gray-800 bg-gray-200 rounded-full cursor-pointer"
                aria-label="Scroll left"
              >
                <ChevronLeftIcon className="w-5 h-5" />
              </button>
              <ul
                ref={navbarRef}
                className="flex space-x-4 overflow-x-scroll no-scrollbar px-2"
              >
                {filteredSections.map((section, index) => (
                  <li key={section.type}>
                    <button
                      onClick={() => scrollToSection(index)}
                      className={`text-gray-600 hover:text-gray-800 font-medium whitespace-nowrap cursor-pointer ${
                        activeSection === index
                          ? "text-green-500 after:w-full after:h-[1px] after:bg-green-500 after:block after:mt-1"
                          : ""
                      }`}
                    >
                      {section.name}
                    </button>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => scrollNavbar("right")}
                className="text-gray-600 p-1.5 hover:text-gray-800 bg-gray-200 rounded-full cursor-pointer"
                aria-label="Scroll right"
              >
                <ChevronRightIcon className="w-5 h-5" />
              </button>
            </div>
          </nav>
          {filteredSections.map((section, index) => {
            let Component;
            switch (section.type) {
              case "instructors":
                Component = CourseInstructor;
                break;
              case "features":
                Component = CourseFeatures;
                break;
              case "group_join_engagement":
                Component = GroupJoinEngagement;
                break;
              case "pointers":
                Component = CoursePointers;
                break;
              case "about":
                Component = CourseAbout;
                break;
              case "feature_explanations":
                Component = CourseFeatureExplanations;
                break;
              case "faq":
                Component = CourseFAQ;
                break;
              default:
                return null;
            }
            return (
              <div
                ref={(el) => (sectionRefs.current[index] = el)}
                key={section.type}
                className="mb-6"
              >
                <Component data={data} />
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}