import type { Metadata } from "next";
import "./globals.css";
import TopBar from "@/app/components/TopBar";
import Footer from "@/app/components/Footer";

export const metadata: Metadata = {
  title: "AI Interior Designer",
  description: "Transform your space with AI-powered interior design suggestions",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <TopBar />
        <div className="pt-16 flex-grow">
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
