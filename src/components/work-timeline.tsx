"use client";

import { useEffect, useRef, useState } from "react";
import { workHistory } from "@/lib/data";
import type { WorkHistory } from "@/lib/types";

function formatYearRange(year: string): string {
    const years = year.match(/\d{4}/g);
    const start = years?.[0] ?? year;
    const end = /present/i.test(year)
        ? "Present"
        : years?.[1] ?? "";

    if (!end || start === end) return start;
    return `${start} - ${end}`;
}

function formatTimelineLabel(year: string): string {
    if (/present/i.test(year)) return "Present";
    return year.match(/\d{4}/)?.[0] ?? year;
}

export function WorkTimeline() {
    const newestFirst = [...workHistory].reverse();
    const oldestFirst = [...workHistory];
    const [overview, setOverview] = useState(false);
    const [activeIndex, setActiveIndex] = useState(oldestFirst.length - 1);

    return (
        <div>
            <div className="mb-10 flex justify-end">
                <div
                    className="inline-flex rounded-full border border-zinc-200 p-1 dark:border-zinc-800"
                    aria-label="Timeline view"
                >
                    <button
                        type="button"
                        aria-pressed={overview}
                        onClick={() => setOverview(true)}
                        className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${overview
                            ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-black"
                            : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                            }`}
                    >
                        Overview
                    </button>
                    <button
                        type="button"
                        aria-pressed={!overview}
                        onClick={() => setOverview(false)}
                        className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${!overview
                            ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-black"
                            : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                            }`}
                    >
                        Focus
                    </button>
                </div>
            </div>

            {overview ? (
                <div className="relative">
                    {/* vertical rail */}
                    <div
                        aria-hidden
                        className="absolute bottom-1 left-2 top-1 w-px bg-zinc-200 dark:bg-zinc-800 md:left-44"
                    />

                    <ol className="space-y-12">
                        {newestFirst.map((item) => (
                            <TimelineItem
                                key={`${item.company}-${item.year}`}
                                item={item}
                            />
                        ))}
                    </ol>
                </div>
            ) : (
                <div>
                    {/* horizontal stepper */}
                    <div className="relative">
                        <div
                            aria-hidden
                            className="absolute left-0 right-0 top-2 h-px bg-zinc-200 dark:bg-zinc-800"
                        />
                        <ol className="relative flex justify-between gap-4 overflow-x-auto pb-1">
                            {oldestFirst.map((item, index) => {
                                const isActive = index === activeIndex;
                                return (
                                    <li
                                        key={`${item.company}-${item.year}`}
                                        className="flex shrink-0 flex-col items-center gap-2"
                                    >
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setActiveIndex(index)
                                            }
                                            aria-label={`Show ${item.company}`}
                                            aria-current={
                                                isActive ? "step" : undefined
                                            }
                                            className={`relative z-10 h-4 w-4 rounded-full transition-colors ${isActive
                                                ? "bg-yellow-600 dark:bg-yellow-500"
                                                : "bg-zinc-300 hover:bg-zinc-400 dark:bg-zinc-700 dark:hover:bg-zinc-600"
                                                }`}
                                        />
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setActiveIndex(index)
                                            }
                                            className={`whitespace-nowrap text-xs font-medium transition-colors ${isActive
                                                ? "text-zinc-900 dark:text-zinc-100"
                                                : "text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200"
                                                }`}
                                        >
                                            {formatTimelineLabel(item.year)}
                                        </button>
                                        <span
                                            aria-hidden
                                            className={`h-0 w-0 border-x-4 border-t-4 border-x-transparent border-t-zinc-900 transition-opacity dark:border-t-zinc-100 ${isActive ? "opacity-100" : "opacity-0"
                                                }`}
                                        />
                                    </li>
                                );
                            })}
                        </ol>
                    </div>

                    {/* detail card */}
                    <div
                        key={activeIndex}
                        className="animate-fade-slide-in mt-6 rounded-xl border border-zinc-200 p-6 dark:border-zinc-800"
                    >
                        <h3 className="flex flex-wrap items-baseline gap-x-2 text-lg font-semibold">
                            {oldestFirst[activeIndex].company}
                            <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                                {oldestFirst[activeIndex].year}
                            </span>
                        </h3>
                        <p className="mt-1 text-sm font-medium text-zinc-600 dark:text-zinc-400">
                            {oldestFirst[activeIndex].titles.join(" · ")}
                        </p>
                        <ul className="mt-4 space-y-2">
                            {oldestFirst[activeIndex].desc.map((line) => (
                                <li
                                    key={line}
                                    className="flex gap-2 text-sm leading-6 text-zinc-700 dark:text-zinc-300"
                                >
                                    <span
                                        aria-hidden
                                        className="mt-2 h-1 w-1 shrink-0 rounded-full bg-zinc-400"
                                    />
                                    <span>{line}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
}

function TimelineItem({ item }: { item: WorkHistory }) {
    const ref = useRef<HTMLLIElement>(null);
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
        <li
            ref={ref}
            className={`group relative transition-all duration-700 ease-out md:grid md:grid-cols-[11rem_1fr] md:gap-10 ${visible
                ? "translate-x-0 opacity-100"
                : "translate-x-8 opacity-0"
                }`}
        >
            {/* year - left side on desktop */}
            <div className="hidden md:block">
                <span className="block whitespace-nowrap pr-5 text-right text-sm font-semibold text-zinc-800 transition-colors group-hover:text-black dark:text-zinc-200 dark:group-hover:text-white">
                    {formatYearRange(item.year)}
                </span>
            </div>

            {/* dot on the rail */}
            <span
                aria-hidden
                className="absolute left-2 top-1 block h-4 w-4 -translate-x-1/2 rounded-full bg-zinc-900 ring-4 ring-background transition-transform duration-300 group-hover:scale-125 dark:bg-zinc-100 md:left-44"
            />

            {/* content - right side */}
            <div className="pl-12 transition-transform duration-300 group-hover:translate-x-1 md:pl-0">
                <span className="mb-2 block text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400 md:hidden">
                    {item.year}
                </span>
                <h3 className="text-lg font-semibold">{item.company}</h3>
                <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                    {item.titles.join(" · ")}
                </p>
                <ul className="mt-3 space-y-2">
                    {item.desc.map((line) => (
                        <li
                            key={line}
                            className="flex gap-2 text-sm leading-6 text-zinc-700 dark:text-zinc-300"
                        >
                            <span
                                aria-hidden
                                className="mt-2 h-1 w-1 shrink-0 rounded-full bg-zinc-400"
                            />
                            <span>{line}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </li>
    );
}
