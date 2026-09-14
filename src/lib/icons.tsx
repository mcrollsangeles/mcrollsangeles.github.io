import type { SimpleIcon } from "simple-icons";
import {
    siAngular,
    siClickup,
    siCodeigniter,
    siGithub,
    siGitlab,
    siGoogleanalytics,
    siJavascript,
    siJenkins,
    siJest,
    siJira,
    siJquery,
    siLaravel,
    siMysql,
    siNextdotjs,
    siNodedotjs,
    siPhp,
    siPostgresql,
    siPython,
    siReact,
    siStrapi,
    siVuedotjs,
    siWordpress,
} from "simple-icons";

const ICONS: Record<string, SimpleIcon> = {
    angular: siAngular,
    clickup: siClickup,
    codeigniter: siCodeigniter,
    github: siGithub,
    gitlab: siGitlab,
    googleanalytics: siGoogleanalytics,
    javascript: siJavascript,
    jenkins: siJenkins,
    jest: siJest,
    jira: siJira,
    jquery: siJquery,
    laravel: siLaravel,
    mysql: siMysql,
    nextdotjs: siNextdotjs,
    nodedotjs: siNodedotjs,
    php: siPhp,
    postgresql: siPostgresql,
    python: siPython,
    react: siReact,
    strapi: siStrapi,
    vuedotjs: siVuedotjs,
    wordpress: siWordpress,
};

export function getIcon(slug?: string): SimpleIcon | undefined {
    if (!slug) return undefined;
    return ICONS[slug];
}

type TechIconProps = {
    slug?: string;
    name: string;
    className?: string;
};

export function TechIcon({ slug, name, className = "h-5 w-5" }: TechIconProps) {
    const icon = getIcon(slug);

    if (!icon) {
        return (
            <span
                aria-hidden
                className={`inline-flex shrink-0 items-center justify-center rounded-md bg-zinc-200 text-xs font-semibold text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 ${className}`}
            >
                {name.charAt(0).toUpperCase()}
            </span>
        );
    }

    return (
        <svg
            viewBox="0 0 24 24"
            role="img"
            aria-label={`${name} icon`}
            className={`${className} shrink-0 fill-current`}
        >
            <path d={icon.path} />
        </svg>
    );
}
