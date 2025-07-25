import { fetchProductData } from "@/lib/api";
import Title from "@/components/Title";
import CTA from "@/components/CTA";
import Header from "@/components/Header";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const resolvedParams = await params;
  const data = await fetchProductData(resolvedParams.lang || "en");

  return (
    <main className="bg-gray-100 min-h-screen">
      <Header />
      <Title title={data.title} />
      <CTA ctaText={data.cta_text} />
      <div className="container py-8 text-gray-800">
        More content will go here...
      </div>
    </main>
  );
}
