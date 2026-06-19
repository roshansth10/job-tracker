import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Job Application Tracker",
  description: "Track your job applications",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen text-gray-900">
        <header className="bg-white/90 backdrop-blur border-b border-gray-200 shadow-sm py-4 px-6">
          <h1 className="text-xl font-semibold text-gray-900 text-center">
            Job Application Tracker
          </h1>
        </header>
        <main className="max-w-5xl mx-auto p-6">{children}</main>
      </body>
    </html>
  );
}