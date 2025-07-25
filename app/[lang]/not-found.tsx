"use client";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="container py-12 text-center">
      <h1 className="text-4xl font-bold text-gray-800">404 - Page Not Found</h1>
      <p className="mt-4 text-lg text-gray-600">
        The page you are looking for does not exist.
      </p>
      <button
        onClick={() => router.push("/en")}
        className="mt-6 btn-primary text-lg py-3 px-6"
      >
        Go to Home
      </button>
    </div>
  );
}
