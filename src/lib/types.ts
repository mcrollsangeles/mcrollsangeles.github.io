export type SocialLink = {
    name: string;
    url: string;
};

export type Profile = {
    name: string;
    title: string;
    country: string;
    email: string;
    summary: string;
    avatar: string;
    socials: SocialLink[];
};

export type TechTool = {
    name: string;
    category: string;
    type: string;
    slug?: string;
};

export type Education = {
    university: string;
    date: string;
    title: string;
    location: string;
    note: string;
};

export type WorkHistory = {
    company: string;
    desc: string[];
    year: string;
    totalYears: number;
    titles: string[];
};

export type Project = {
    project: string;
    company: string;
    desc: string;
    role: string;
    year: string;
};
