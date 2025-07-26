import { Metadata } from "next";
import { fetchProductData } from "@/lib/api";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  console.log("Metadata params:", resolvedParams); // Debug log
  const data = await fetchProductData(resolvedParams.lang || "en");
  return {
    title: data.title || "IELTS Course",
    description: data.description || "Learn IELTS with 10 Minute School",
    openGraph: {
      title: data.title || "IELTS Course",
      description: data.description || "Learn IELTS with 10 Minute School",
    },
  };
}

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const resolvedParams = await params;
  console.log("Layout params:", resolvedParams); // Debug log
  const data = await fetchProductData(resolvedParams.lang || "en");
  return (
    <>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({}) }} // Fallback to empty object
        />
      </head>
      {children}
    </>
  );
}
