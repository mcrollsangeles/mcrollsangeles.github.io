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

const SITE_URL = "https://mcrollsangeles.github.io";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${profile.name} - ${profile.title}`,
    template: `%s · ${profile.name}`,
  },
  description: profile.summary,
  keywords: [
    "Full Stack Developer",
    "Web Developer",
    "PHP",
    "JavaScript",
    "Python",
    "Laravel",
    "React",
    "Next.js",
    "Node.js",
    profile.name,
  ],
  authors: [{ name: profile.name }],
  creator: profile.name,
  publisher: profile.name,
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "profile",
    url: "/",
    siteName: profile.name,
    title: `${profile.name} - ${profile.title}`,
    description: profile.summary,
    locale: "en_PH",
    images: [
      {
        url: profile.avatar,
        alt: profile.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} - ${profile.title}`,
    description: profile.summary,
    images: [profile.avatar],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: profile.name,
              jobTitle: profile.title,
              email: profile.email,
              url: SITE_URL,
              image: `${SITE_URL}${profile.avatar}`,
              address: {
                "@type": "PostalAddress",
                addressCountry: profile.country,
              },
              sameAs: profile.socials.map((social) => social.url),
            }),
          }}
        />
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
