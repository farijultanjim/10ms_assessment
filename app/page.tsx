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
import { useLanguage } from "@/components/Header";

export default function HomePage() {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [activeSection, setActiveSection] = useState<number | null>(null);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const navbarRef = useRef<HTMLUListElement>(null);
  const { lang } = useLanguage();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchCourseData(lang);
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [lang]);

  useEffect(() => {
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

  const filteredSections = data.data.sections.filter((section) =>
    displayedSectionTypes.includes(section.type)
  );

  return (
    <main className="px-4 lg:px-0">
      <div
        className="bg-gray-900 hidden lg:block"
        style={{
          backgroundImage: `url(${"https://cdn.10minuteschool.com/images/ui_%281%29_1716445506383.jpeg"})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
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
        <div
          className="bg-gray-900 px-2 py-8"
          style={{
            backgroundImage: `url(${"https://cdn.10minuteschool.com/images/ui_%281%29_1716445506383.jpeg"})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <Media data={data} />
          <CourseHeader data={data} />
        </div>
        <Checklist data={data} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-20 max-w-6xl mx-auto">
        <div className="lg:col-span-2">
          <nav className="sticky top-0 z-30 bg-white py-3">
            <div className="flex items-center py-2 border-b border-gray-300 gap-1.5">
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
                ref={(el) => {
                  sectionRefs.current[index] = el;
                }}
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
