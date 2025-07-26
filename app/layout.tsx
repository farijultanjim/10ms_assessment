import { NextIntlClientProvider } from "next-intl";
import "./globals.css"; // Located in app/ as per your structure

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = "en"; // Default fallback; middleware should override via routing
  console.log("Layout locale:", locale); // Debug log
  let messages;
  try {
    messages = (await import(`@/i18n/${locale}.json`)).default;
  } catch (error) {
    console.error("Locale import error:", error);
    messages = (await import("@/i18n/en.json")).default; // Fallback to en
  }

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
