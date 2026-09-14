import type { Metadata } from "next";
import { ProjectCards } from "@/components/project-cards";

export const metadata: Metadata = {
    title: "Projects",
    description:
        "Projects, freelance work, and systems built by Mc Rolls Angeles across government, healthcare, SaaS, and e-commerce.",
};

export default function ProjectsPage() {
    return (
        <div className="mx-auto w-full max-w-6xl px-6 py-12">
            <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
            <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                A selection of projects I have worked on.
            </p>
            <div className="mt-10">
                <ProjectCards />
            </div>
        </div>
    );
}
