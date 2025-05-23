"use client"
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import { Providers } from "@/store/provider";
import { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [darkMode, setDarkMode] = useState<boolean>(true);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" />
        <title>Movie Portal</title>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased ${
          darkMode ? "dark" : ""
        }`}
      >
        <Providers>
        <Toaster
            position="bottom-center"
            toastOptions={{
              style: {
                borderRadius: "8px",
                padding: "14px",
                fontSize: "16px",
              },
              success: {
                style: {
                  background: "#6964b5", // Purple background
                  color: "#fff",
                  border: "1px solid #2A2A2A", // Darker purple border
                },
                iconTheme: {
                  primary: "#2A2A2A",
                  secondary: "#fff",
                },
              },
              error: {
                style: {
                  background: "red", // Red background
                  color: "#fff",
                  border: "1px solid rgb(255, 0, 0)", // Darker red border
                },
                iconTheme: {
                  primary: "#2A2A2A",
                  secondary: "#fff",
                },
              },
            }}
          />
          <Navbar setDarkMode={setDarkMode} darkMode={darkMode} />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
