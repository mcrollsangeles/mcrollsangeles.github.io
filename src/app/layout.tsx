import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { profile } from "@/lib/data";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: `${profile.name} - ${profile.title}`,
    template: `%s · ${profile.name}`,
  },
  description: profile.summary,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <footer className="border-t border-zinc-200 py-8 dark:border-zinc-800">
          <div className="mx-auto w-full max-w-6xl px-6 text-sm text-zinc-500 dark:text-zinc-400">
            © {new Date().getFullYear()} {profile.name}
          </div>
        </footer>
      </body>
    </html>
  );
}
