const { getRequestConfig } = require('next-intl/server');

module.exports = getRequestConfig(async ({ locale }) => {
  const resolvedLocale = locale ?? 'en'; // Default to 'en' if undefined
  console.log('Config locale:', resolvedLocale); // Debug log
  return {
    messages: (await import(`@/i18n/${resolvedLocale}.json`)).default,
    locale: resolvedLocale,
  };
});
