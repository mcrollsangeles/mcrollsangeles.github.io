"use client";

import { useEffect, useRef, useState } from "react";

export function useReveal<T extends HTMLElement>() {
    const ref = useRef<T>(null);
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

    return { ref, visible };
}
