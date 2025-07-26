import createMiddleware from "next-intl/middleware";
import { NextRequest } from "next/server";

const nextIntlMiddleware = createMiddleware({
  locales: ["en", "bn"],
  defaultLocale: "en",
  localePrefix: "always", // Ensures /en and /bn are always prefixed
});

export default function middleware(request: NextRequest) {
  const locale = request.nextUrl.pathname.split("/")[1] || "en"; // Fallback locale detection
  console.log("Middleware locale:", locale); // Debug log
  const response = nextIntlMiddleware(request);
  return response;
}

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js|png|jpg|jpeg|gif|svg|woff2?|ttf|ico)[^?]|[^?]*\\?[^?]*).*)",
  ],
};
