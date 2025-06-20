import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: '%s | Zeng Liangliang',
    default: 'Zeng Liangliang - Full-Stack Developer',
  },
  description: "Personal website and blog of Zeng Liangliang, a full-stack developer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-900 text-white`}>
        <Navbar />
        <main className="container mx-auto px-4 py-8">
        {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
