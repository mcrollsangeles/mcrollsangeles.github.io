import type {
    Education,
    Profile,
    Project,
    TechTool,
    WorkHistory,
} from "./types";

import profileData from "./files/profile.json";
import techToolsData from "./files/tech_tools.json";
import educationData from "./files/education.json";
import workHistoryData from "./files/work_history.json";
import projectsData from "./files/projects.json";

export const profile = profileData[0] as Profile;
export const techTools = techToolsData as TechTool[];
export const education = educationData as Education[];
export const workHistory = workHistoryData as WorkHistory[];
export const projects = projectsData as Project[];

export type TechGroup = {
    type: string;
    label: string;
    tools: TechTool[];
};

const GROUP_ORDER: { type: string; label: string }[] = [
    { type: "frontend", label: "Frontend" },
    { type: "backend", label: "Backend" },
    { type: "database", label: "Database" },
    { type: "devops", label: "DevOps" },
    { type: "project_management", label: "Project Management" },
    { type: "testing", label: "Testing" },
];

export function getTechGroups(): TechGroup[] {
    const groups = GROUP_ORDER.map(({ type, label }) => ({
        type,
        label,
        tools: techTools.filter((tool) => tool.type === type),
    })).filter((group) => group.tools.length > 0);

    // Keep any types that aren't part of the predefined order.
    const known = new Set(GROUP_ORDER.map((group) => group.type));
    const leftovers = techTools.filter((tool) => !known.has(tool.type));
    if (leftovers.length > 0) {
        groups.push({ type: "other", label: "Other", tools: leftovers });
    }

    return groups;
}
