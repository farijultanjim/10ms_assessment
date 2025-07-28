import { ApiResponse } from "@/types/api-types";

export async function fetchCourseData(
  lang: string = "en"
): Promise<ApiResponse> {
  try {
    const response = await fetch(
      `https://api.10minuteschool.com/discovery-service/api/v1/products/ielts-course?lang=${lang}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: ApiResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching course data:", error);
    throw error; // Re-throw to handle upstream
  }
}
