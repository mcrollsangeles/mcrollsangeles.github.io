"use client";

import { useEffect, useRef, useState } from "react";
import { projects } from "@/lib/data";
import type { Project } from "@/lib/types";

type SortOrder = "desc" | "asc";

function getSortYear(year: string) {
    const matches = year.match(/\d{4}/g);
    return matches ? Number(matches[matches.length - 1]) : 0;
}

export function ProjectCards() {
    const [order, setOrder] = useState<SortOrder>("desc");

    const items = [...projects].sort((a, b) => {
        const diff = getSortYear(a.year) - getSortYear(b.year);
        return order === "desc" ? -diff : diff;
    });

    return (
        <div>
            <div className="mb-6 flex justify-end">
                <label className="flex items-center gap-2 text-xs font-medium text-zinc-600 dark:text-zinc-300">
                    Sort by year
                    <select
                        value={order}
                        onChange={(event) =>
                            setOrder(event.target.value as SortOrder)
                        }
                        className="rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-xs font-medium text-zinc-700 focus:outline-none focus:ring-2 focus:ring-zinc-400 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200"
                    >
                        <option value="desc">Newest first</option>
                        <option value="asc">Oldest first</option>
                    </select>
                </label>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((item) => (
                    <ProjectCard
                        key={`${item.project}-${item.company}`}
                        item={item}
                    />
                ))}
            </div>
        </div>
    );
}

function ProjectCard({ item }: { item: Project }) {
    const ref = useRef<HTMLElement>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
        );

        observer.observe(element);
        return () => observer.disconnect();
    }, []);

    return (
        <article
            ref={ref}
            className={`group flex flex-col rounded-xl border border-zinc-200 p-6 transition-colors hover:border-yellow-600 dark:border-zinc-800 dark:hover:border-yellow-500 ${visible ? "animate-fade-slide-in" : "opacity-0"
                }`}
        >
            <div className="flex items-start justify-between gap-3">
                <h2 className="text-lg font-semibold leading-snug transition-colors group-hover:text-yellow-600 dark:group-hover:text-yellow-500">
                    {item.project}
                </h2>
                <span className="shrink-0 rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
                    {item.year}
                </span>
            </div>
            <p className="mt-1 text-sm font-medium text-zinc-500 dark:text-zinc-400">
                {item.company}
            </p>
            <p className="mt-3 flex-1 text-sm leading-6 text-zinc-700 dark:text-zinc-300">
                {item.desc}
            </p>
            <p className="mt-4 text-xs font-medium uppercase tracking-wide text-zinc-500 transition-colors group-hover:text-blue-600 dark:text-zinc-400 dark:group-hover:text-blue-400">
                {item.role}
            </p>
        </article>
    );
}
