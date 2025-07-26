"use client";

import { CtaText } from "@/types/api";
import { useTranslations } from "next-intl";

interface CTAProps {
  ctaText: CtaText;
}

export default function CTA({ ctaText }: CTAProps) {
  const t = useTranslations("cta");

  return (
    <div className="container py-6 text-center">
      <button className="bg-red-600 text-white font-semibold text-lg py-3 px-8 rounded-lg hover:bg-red-700 transition">
        {t("default")} - 1000
      </button>
    </div>
  );
}
