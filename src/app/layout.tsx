import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Video Game Tracker",
  description: "Track your video game collection and progress",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
