import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Supriya & Praveen | Wedding Invitation",
  description: "Join us in celebrating the wedding of Supriya and Praveen.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${inter.variable} antialiased bg-black min-h-screen flex justify-center`}
      >
        <div className="w-full max-w-[450px] bg-[#FFFDD0] min-h-screen relative shadow-2xl overflow-x-hidden flex flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
