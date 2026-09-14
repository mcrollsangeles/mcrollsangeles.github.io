"use client";

import { useEffect, useRef, useState } from "react";
import {
    DndContext,
    PointerSensor,
    useDraggable,
    useSensor,
    useSensors,
    type DragEndEvent,
} from "@dnd-kit/core";
import Image from "next/image";
import { profile } from "@/lib/data";
import { TechIcon } from "@/lib/icons";

const SOCIAL_SLUGS: Record<string, string> = {
    github: "github",
    linkedin: "linkedin",
};

function getInitials(name: string) {
    return name
        .split(" ")
        .filter(Boolean)
        .map((part) => part[0])
        .slice(0, 2)
        .join("")
        .toUpperCase();
}

export function ProfileSection() {
    const [showTag, setShowTag] = useState(false);
    const [showPsyduck, setShowPsyduck] = useState(false);
    const [psyduckPos, setPsyduckPos] = useState({ x: 0, y: 0 });
    const [typedSummary, setTypedSummary] = useState("");
    const summaryDone = typedSummary.length >= profile.summary.length;
    const psyduckTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const psyduckSensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    );

    const flashPsyduck = () => {
        setShowPsyduck(true);
        setPsyduckPos({ x: 0, y: 0 });
        if (psyduckTimer.current) clearTimeout(psyduckTimer.current);
        psyduckTimer.current = setTimeout(() => setShowPsyduck(false), 3000);
    };

    const pausePsyduckTimer = () => {
        if (psyduckTimer.current) clearTimeout(psyduckTimer.current);
        psyduckTimer.current = null;
    };

    const resumePsyduckTimer = () => {
        if (psyduckTimer.current) clearTimeout(psyduckTimer.current);
        psyduckTimer.current = setTimeout(() => setShowPsyduck(false), 3000);
    };

    const handlePsyduckDragEnd = (event: DragEndEvent) => {
        setPsyduckPos((prev) => ({
            x: prev.x + event.delta.x,
            y: prev.y + event.delta.y,
        }));
        resumePsyduckTimer();
    };

    const show = () => {
        setShowTag(true);
        flashPsyduck();
    };
    const hide = () => setShowTag(false);
    const toggle = () => {
        const next = !showTag;
        setShowTag(next);
        if (next) flashPsyduck();
    };

    useEffect(() => {
        return () => {
            if (psyduckTimer.current) clearTimeout(psyduckTimer.current);
        };
    }, []);

    useEffect(() => {
        const full = profile.summary;
        let index = 0;
        const timer = setInterval(() => {
            index += 2;
            setTypedSummary(full.slice(0, index));
            if (index >= full.length) {
                clearInterval(timer);
            }
        }, 12);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="flex flex-col gap-8 py-16 sm:pt-20 sm:pb-14">
            <div
                aria-hidden={!showPsyduck}
                className={`pointer-events-none fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-500 ${showPsyduck ? "opacity-100" : "opacity-0"
                    }`}
            >
                <DndContext
                    id="psyduck"
                    sensors={psyduckSensors}
                    onDragStart={pausePsyduckTimer}
                    onDragEnd={handlePsyduckDragEnd}
                >
                    <DraggablePsyduck
                        active={showPsyduck}
                        position={psyduckPos}
                    />
                </DndContext>
            </div>
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
                <div
                    className="relative"
                    onMouseEnter={show}
                    onMouseLeave={hide}
                >
                    <button
                        type="button"
                        onClick={toggle}
                        aria-label="That's me!"
                        className="block h-24 w-24 cursor-pointer rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2"
                    >
                        {profile.avatar ? (
                            <Image
                                src={profile.avatar}
                                alt={profile.name}
                                width={96}
                                height={96}
                                className="h-24 w-24 rounded-full object-cover"
                            />
                        ) : (
                            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-zinc-900 text-2xl font-semibold text-white transition-transform duration-200 hover:scale-105 dark:bg-zinc-100 dark:text-black">
                                {getInitials(profile.name)}
                            </div>
                        )}
                    </button>

                    <div
                        aria-hidden={!showTag}
                        className={`pointer-events-none absolute -top-11 left-1/2 -translate-x-1/2 transition-opacity duration-200 ${showTag ? "opacity-100" : "opacity-0"
                            }`}
                    >
                        <span
                            className={`relative block whitespace-nowrap rounded-full bg-zinc-900 px-3 py-1 text-sm font-medium text-white shadow-lg dark:bg-zinc-100 dark:text-black ${showTag ? "animate-pop-in" : ""
                                }`}
                        >
                            {"That's me!"}
                            <span
                                aria-hidden
                                className="absolute left-1/2 top-full -mt-0.5 -translate-x-1/2 border-4 border-transparent border-t-zinc-900 dark:border-t-zinc-100"
                            />
                        </span>
                    </div>
                </div>

                <div className="min-w-0">
                    <h1
                        onMouseEnter={show}
                        onMouseLeave={hide}
                        onClick={toggle}
                        className="cursor-pointer text-3xl font-bold tracking-tight sm:text-4xl"
                    >
                        {profile.name}
                    </h1>
                    <p className="mt-1 text-lg font-medium text-zinc-600 dark:text-zinc-400">
                        {profile.title}
                    </p>
                    <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
                        {profile.country} {" | "}
                        <a
                            href={`mailto:${profile.email}`}
                            className="hover:underline"
                        >
                            {profile.email}
                        </a>
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                        {profile.socials.map((social) => (
                            <a
                                key={social.name}
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 rounded-full border border-zinc-200 px-3 py-1.5 text-sm font-medium transition-colors hover:bg-zinc-100 dark:border-zinc-800 dark:hover:bg-zinc-900"
                            >
                                <TechIcon
                                    slug={SOCIAL_SLUGS[social.name.toLowerCase()]}
                                    name={social.name}
                                    className="h-4 w-4"
                                />
                                {social.name}
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            <p className="relative max-w-4xl text-base leading-7 text-zinc-700 dark:text-zinc-300">
                <span aria-hidden className="invisible">
                    {profile.summary}
                </span>
                <span aria-hidden className="absolute left-0 top-0">
                    {typedSummary}
                    {!summaryDone && (
                        <span className="ml-0.5 inline-block animate-pulse">
                            ▌
                        </span>
                    )}
                </span>
                <span className="sr-only">{profile.summary}</span>
            </p>
        </section>
    );
}

function DraggablePsyduck({
    active,
    position,
}: {
    active: boolean;
    position: { x: number; y: number };
}) {
    const { attributes, listeners, setNodeRef, transform, isDragging } =
        useDraggable({ id: "psyduck", disabled: !active });

    const style = {
        transform: `translate3d(${position.x + (transform?.x ?? 0)}px, ${position.y + (transform?.y ?? 0)
            }px, 0)`,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...listeners}
            {...attributes}
            className={`${active ? "pointer-events-auto" : "pointer-events-none"} ${isDragging ? "cursor-grabbing" : "cursor-grab"
                }`}
        >
            <Image
                src="/psyduck_approves.png"
                alt="Psyduck approves"
                width={320}
                height={320}
                className={`h-72 w-72 object-contain drop-shadow-lg sm:h-96 sm:w-96 ${active ? "animate-pop-in" : ""
                    }`}
            />
        </div>
    );
}
