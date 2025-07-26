// import { getRequestConfig } from 'next-intl/server';

// export default getRequestConfig(async ({ locale }) => {
//   const resolvedLocale = locale ?? 'en'; // Replace 'en' with your default locale if needed
//   return {
//     messages: (await import(`@/i18n/${resolvedLocale}.json`)).default,
//     locale: resolvedLocale,
//   };
// });

// // import { getRequestConfig } from "next-intl/server";

// // export default getRequestConfig(async ({ locale }) => ({
// //   messages: (await import(`../i18n/${locale}.json`)).default,
// // }));