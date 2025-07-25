"use client";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useTranslations } from "next-intl";

export default function Header() {
  const t = useTranslations("header");
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const changeLanguage = (lang: "en" | "bn") => {
    startTransition(() => {
      router.push(`/${lang}`);
    });
  };

  return (
    <header className="bg-gradient-to-r from-red-600 to-blue-600 text-white py-4">
      <div className="container flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <span className="text-xl font-bold">10 Minute School</span>
          <span className="text-sm">Kids English & More</span>
          {/* <img
            src="https://via.placeholder.com/50" // Replace with actual logo URL
            alt="10 Minute School Logo"
            className="h-10"
          /> */}
        </div>
        <div className="flex space-x-4">
          <button
            onClick={() => changeLanguage("en")}
            className="hover:underline disabled:opacity-50"
            disabled={isPending}
          >
            {t("english")}
          </button>
          <button
            onClick={() => changeLanguage("bn")}
            className="hover:underline disabled:opacity-50"
            disabled={isPending}
          >
            {t("bengali")}
          </button>
        </div>
      </div>
    </header>
  );
}
