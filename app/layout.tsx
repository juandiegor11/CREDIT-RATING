'use client';

import type { Metadata } from "next";
import { Geist, Geist_Mono, Pompiere, Poppins } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { usePathname } from "next/navigation";

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

const PUBLIC_ROUTES = ["/Login"]; // Define las rutas públicas aquí

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname(); // Obtiene la ruta actual

  const isPublicRoute = pathname ? PUBLIC_ROUTES.includes(pathname) : false; // Verifica si la ruta es pública

  return (
    <html lang="en">
      <body
        // className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        className={poppins.className}
      >
        <AuthProvider>
          {isPublicRoute ? (
            children // No aplica ProtectedRoute en rutas públicas
          ) : (
            <ProtectedRoute>{children}</ProtectedRoute>
          )}
        </AuthProvider>
      </body>
    </html>
  );
}
