import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async ({ locale }) => {
  const resolvedLocale = locale ?? "en"; // Default to 'en' if locale is undefined
  return {
    messages: (await import(`@/i18n/${resolvedLocale}.json`)).default,
    locale: resolvedLocale,
  };
});
