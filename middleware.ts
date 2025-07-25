import createMiddleware from "next-intl/middleware";

const nextIntlMiddleware = createMiddleware({
  locales: ["en", "bn"],
  defaultLocale: "en",
});

export default nextIntlMiddleware;

export const config = {
  matcher: [
    // Match all routes except API, _next, and static files
    "/((?!api|_next|.*\\..*).*)",
  ],
};
