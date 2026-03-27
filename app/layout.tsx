import type { Metadata } from "next";
import { Castoro, Mulish } from "next/font/google";
import "./globals.css";

const castoro = Castoro({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-castoro",
  display: "swap",
});

const mulish = Mulish({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700", "800"],
  variable: "--font-mulish",
  display: "swap",
});

export const metadata: Metadata = {
  title: "MEDfacials | AI Facial Analysis & Treatment Recommendations",
  description: "AI-powered facial analysis with personalised treatment recommendations by Dr. Joe Stolte at MEDfacials",
  manifest: "/manifest.json",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${castoro.variable} ${mulish.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <meta name="theme-color" content="#FFF9EF" />
      </head>
      <body>{children}</body>
    </html>
  );
}
