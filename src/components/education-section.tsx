"use client";

import { education } from "@/lib/data";
import type { Education } from "@/lib/types";
import { useReveal } from "@/lib/use-reveal";

export function EducationSection() {
    return (
        <section className="border-t border-zinc-200 py-12 dark:border-zinc-800">
            <h2 className="text-2xl font-bold tracking-tight">Education</h2>
            <ul className="mt-8 space-y-4">
                {education.map((item) => (
                    <EducationCard
                        key={`${item.university}-${item.title}`}
                        item={item}
                    />
                ))}
            </ul>
        </section>
    );
}

function EducationCard({ item }: { item: Education }) {
    const { ref, visible } = useReveal<HTMLLIElement>();

    return (
        <li
            ref={ref}
            className={`flex flex-col gap-2 rounded-xl border border-zinc-200 p-5 dark:border-zinc-800 sm:flex-row sm:items-center sm:justify-between ${visible ? "animate-fade-slide-in" : "opacity-0"
                }`}
        >
            <div>
                <h3 className="font-semibold">{item.university}</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    {item.title}
                </p>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    {item.location}
                </p>
            </div>
            <div className="sm:text-right">
                <p className="text-sm font-medium">{item.date}</p>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    {item.note}
                </p>
            </div>
        </li>
    );
}
