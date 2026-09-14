import Link from "next/link";
import { profile } from "@/lib/data";

const NAV_LINKS = [
    { href: "/", label: "Home" },
    { href: "/work-history", label: "Work History" },
    { href: "/projects", label: "Projects" },
];

export function SiteHeader() {
    return (
        <header className="sticky top-0 z-10 border-b border-zinc-200 bg-background/80 backdrop-blur dark:border-zinc-800">
            <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6">
                <Link
                    href="/"
                    className="font-semibold tracking-tight hover:opacity-70 transition-opacity"
                >
                    {profile.name}
                </Link>
                <nav className="flex items-center gap-6 text-sm font-medium">
                    {NAV_LINKS.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="text-zinc-600 transition-colors hover:text-black dark:text-zinc-400 dark:hover:text-zinc-100"
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>
            </div>
        </header>
    );
}
