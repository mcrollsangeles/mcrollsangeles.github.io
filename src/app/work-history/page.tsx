import type { Metadata } from "next";
import { WorkTimeline } from "@/components/work-timeline";

export const metadata: Metadata = {
    title: "Work History",
};

export default function WorkHistoryPage() {
    return (
        <div className="mx-auto w-full max-w-6xl px-6 py-12">
            <h1 className="text-3xl font-bold tracking-tight">Work History</h1>
            <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                My professional journey over the years.
            </p>
            <div className="mt-10">
                <WorkTimeline />
            </div>
        </div>
    );
}
