import { projects } from "@/lib/data";

export function ProjectCards() {
    const items = [...projects].reverse();

    return (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
                <article
                    key={`${item.project}-${item.company}`}
                    className="flex flex-col rounded-xl border border-zinc-200 p-6 dark:border-zinc-800"
                >
                    <div className="flex items-start justify-between gap-3">
                        <h2 className="text-lg font-semibold leading-snug">
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
                    <p className="mt-4 text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                        {item.role}
                    </p>
                </article>
            ))}
        </div>
    );
}
