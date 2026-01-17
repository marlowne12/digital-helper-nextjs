import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ChatWidget } from "@/components/ChatWidget";
import { Contact } from "@/components/Contact";
import { RevealOnScroll } from "@/components/RevealOnScroll";
// import { Toaster } from "@/components/ui/toaster"; // Shadcn toaster if available, or just skip for now

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Modern Web Design in Richland, WA | Digital Helper",
  description: "Digital Helper transforms outdated local business websites in Richland, WA into modern, high-converting sites. Web design, mobile optimization & AI-powered content.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <Navbar />
        {children}
        <RevealOnScroll>
          <Contact />
        </RevealOnScroll>
        <Footer />
        <ChatWidget />
      </body>
    </html>
  );
}
