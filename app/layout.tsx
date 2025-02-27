import type { Metadata } from "next";
import { Geist, Geist_Mono, Pompiere, Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["200", "400", "500", "800"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CRC",
  description: "Credit Risk Rating for Companies",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
       // className={`${geistSans.variable} ${geistMono.variable} antialiased`}
       className={poppins.className}
      >
        {children}
        
      </body>
    </html>
  );
}
