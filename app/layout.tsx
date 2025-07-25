import { NextIntlClientProvider } from "next-intl";
import "./globals.css";

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
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
