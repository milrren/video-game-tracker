import type { Metadata } from "next";
import Link from "next/link";
import { IBM_Plex_Sans, Noto_Serif_JP } from "next/font/google";
import ThemeToggle from "./ThemeToggle";
import "./globals.css";

const uiFont = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ui",
});

const displayFont = Noto_Serif_JP({
  subsets: ["latin"],
  weight: ["500", "700", "900"],
  variable: "--font-display",
});

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
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var key='vgt-theme';var saved=localStorage.getItem(key);var systemDark=window.matchMedia('(prefers-color-scheme: dark)').matches;var next=saved==='light'||saved==='dark'?saved:(systemDark?'dark':'light');document.documentElement.setAttribute('data-theme',next);}())`,
          }}
        />
      </head>
      <body className={`${uiFont.variable} ${displayFont.variable}`}>
        <header className="top-nav">
          <Link href="/" className="brand">
            <span className="brand-dot" aria-hidden="true" />
            Retro Quest Log
          </Link>
          <nav className="nav-links" aria-label="Primary">
            <Link className="nav-link" href="/">
              Home
            </Link>
            <Link className="nav-link" href="/games">
              Games
            </Link>
            <Link className="nav-link" href="/achievements">
              Achievements
            </Link>
          </nav>
          <ThemeToggle />
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
