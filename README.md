# mc-angeles

Personal portfolio site for **Mc Rolls Angeles**, a Full Stack Developer. Built with [Next.js](https://nextjs.org) and [Tailwind CSS](https://tailwindcss.com), and statically exported for GitHub Pages.

## Features

- Profile summary and social links
- Tech tools grouped by category (frontend, backend, database, DevOps, project management, testing)
- Education timeline
- Project list (`/projects`)
- Work history timeline (`/work-history`)

## Tech Stack

- [Next.js 16](https://nextjs.org) (App Router)
- [React 19](https://react.dev)
- [TypeScript](https://www.typescriptlang.org)
- [Tailwind CSS 4](https://tailwindcss.com)
- [simple-icons](https://github.com/simple-icons/simple-icons) for tool icons
- [dnd-kit](https://dndkit.com) for drag-and-drop sorting

## Getting Started

First, install dependencies and run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the site. The page auto-updates as you edit files.

## Available Scripts

| Command         | Description                              |
| --------------- | ---------------------------------------- |
| `npm run dev`   | Start the development server             |
| `npm run build` | Build the site as a static export to `out/` |
| `npm run lint`  | Run ESLint                               |

## Content

All portfolio content lives in JSON files under `src/lib/files/`:

| File                  | Content                                 |
| --------------------- | --------------------------------------- |
| `profile.json`        | Name, title, summary, avatar, socials   |
| `tech_tools.json`     | Tools and their category/type           |
| `education.json`      | Education history                       |
| `work_history.json`   | Work experience                         |
| `projects.json`       | Projects                                 |
| `recommendation.json` | Recommendations                          |

Types for each are defined in `src/lib/types.ts`, and the data is loaded in `src/lib/data.ts`.

## Project Structure

```
src/
  app/                 # Routes: home, /projects, /work-history
  components/          # UI sections and cards
  lib/
    data.ts            # Loads and groups the JSON content
    icons.tsx          # Tool icon mapping
    types.ts           # TypeScript types
    files/             # JSON content files
```

## Deployment

The site is configured for static export via `output: "export"` in `next.config.ts`. Building produces the `out/` directory, which is deployed to GitHub Pages by the workflow in `.github/workflows/deploy.yml`.

- **User site** (`username.github.io`): the repo must be named `<username>.github.io`. No `basePath` is needed.
- **Project site** (`username.github.io/<repo>`): add `basePath: "/<repo>"` to `next.config.ts`.

Note that the workflow triggers on pushes to `main`, so make sure the repo's default branch matches (or update the workflow).
