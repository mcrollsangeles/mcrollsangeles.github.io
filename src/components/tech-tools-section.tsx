"use client";

import { useState } from "react";
import {
    DndContext,
    KeyboardSensor,
    PointerSensor,
    closestCenter,
    useSensor,
    useSensors,
    type DragEndEvent,
} from "@dnd-kit/core";
import {
    SortableContext,
    arrayMove,
    rectSortingStrategy,
    sortableKeyboardCoordinates,
    useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { TechGroup } from "@/lib/data";
import type { TechTool } from "@/lib/types";
import { TechIcon } from "@/lib/icons";
import { useReveal } from "@/lib/use-reveal";

export function TechToolsSection({ groups }: { groups: TechGroup[] }) {
    const { ref, visible } = useReveal<HTMLDivElement>();

    return (
        <section className="border-t border-zinc-200 py-12 dark:border-zinc-800">
            <div
                ref={ref}
                className={visible ? "animate-fade-slide-in" : "opacity-0"}
            >
                <h2 className="text-2xl font-bold tracking-tight">Tech Stack</h2>
                <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
                    Drag items to reorder within each group.
                </p>
            </div>
            <div className="mt-8 space-y-10">
                {groups.map((group) => (
                    <SortableGroup key={group.type} group={group} />
                ))}
            </div>
        </section>
    );
}

function SortableGroup({ group }: { group: TechGroup }) {
    const [tools, setTools] = useState<TechTool[]>(group.tools);
    const { ref, visible } = useReveal<HTMLDivElement>();
    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        }),
    );

    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;
        if (!over || active.id === over.id) return;

        setTools((prev) => {
            const oldIndex = prev.findIndex((tool) => tool.name === active.id);
            const newIndex = prev.findIndex((tool) => tool.name === over.id);
            if (oldIndex < 0 || newIndex < 0) return prev;
            return arrayMove(prev, oldIndex, newIndex);
        });
    }

    return (
        <div
            ref={ref}
            className={visible ? "animate-fade-slide-in" : "opacity-0"}
        >
            <h3 className="text-sm font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                {group.label}
            </h3>
            <DndContext
                id={group.type}
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                <SortableContext
                    items={tools.map((tool) => tool.name)}
                    strategy={rectSortingStrategy}
                >
                    <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
                        {tools.map((tool, index) => (
                            <SortableTool
                                key={tool.name}
                                tool={tool}
                                index={index}
                            />
                        ))}
                    </ul>
                </SortableContext>
            </DndContext>
        </div>
    );
}

function SortableTool({
    tool,
    index,
}: {
    tool: TechTool;
    index: number;
}) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: tool.name });

    const { ref: revealRef, visible } = useReveal<HTMLLIElement>();

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        animationDelay: `${index * 40}ms`,
    };

    return (
        <li
            ref={(node) => {
                revealRef.current = node;
                setNodeRef(node);
            }}
            style={style}
            {...attributes}
            {...listeners}
            className={`flex cursor-grab items-center gap-2.5 rounded-lg border border-zinc-200 px-3 py-2.5 transition-all duration-200 hover:scale-[1.04] hover:border-zinc-300 hover:bg-zinc-100 active:cursor-grabbing dark:border-zinc-800 dark:hover:border-zinc-700 dark:hover:bg-zinc-800/60 ${visible ? "animate-fade-in" : "opacity-0"
                } ${isDragging
                    ? "relative z-10 opacity-90 shadow-lg ring-2 ring-zinc-400 dark:ring-zinc-600"
                    : ""
                }`}
        >
            <TechIcon
                slug={tool.slug}
                name={tool.name}
                className="h-5 w-5 text-zinc-600 dark:text-zinc-300"
            />
            <span className="truncate text-sm font-medium">{tool.name}</span>
        </li>
    );
}
