import { Data } from "@/types/api";

export async function fetchProductData(lang: string): Promise<Data> {
  try {
    const res = await fetch(
      `https://api.10minuteschool.com/discovery-service/api/v1/products/ielts-course?lang=${lang}`,
      {
        headers: {
          "X-TENMS-SOURCE-PLATFORM": "web",
          accept: "application/json",
        },
        cache: "no-store", // Ensure SSR
      }
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch product data: ${res.statusText}`);
    }

    const data = await res.json();
    // console.log("API Response:", data); // Temporary debug log
    return data.data; // Extract the nested 'data' object
  } catch (error) {
    console.error("API Error:", error);
    return {
      slug: "",
      id: 0,
      title: "Error Loading Course",
      description: "Unable to load course details due to an error.",
      media: [],
      checklist: [],
      seo: [],
      cta_text: { name: "Try Again", value: "enroll" },
      sections: [],
    }; // Fallback data on error
  }
}
