import { Icons } from "@/components/icons/icons";
import type { Skill, TechStackItem } from "@/types";

const base = "/images/tech-stack";
const s = (file: string) => `${base}/${file}`;
const t = (light: string, dark: string) => ({ dark: s(dark), light: s(light) });

export const skills: Skill[] = [
  {
    description:
      "Building modern apps with whole scale of fullstack technologies.",
    Icon: Icons.globe,
    id: 1,
    size: "sm",
    title: "App Development",
  },
  {
    description: "Exploring possibilities of multimedia processing",
    Icon: Icons.camera,
    id: 2,
    size: "sm",
    title: "Video & audio",
  },
  {
    description: "Controlling machine workflows",
    Icon: Icons.bot,
    id: 3,
    size: "sm",
    title: "AI & automation",
  },
];

export const technologies: TechStackItem[] = [
  {
    categories: ["Languages"],
    href: "https://www.typescriptlang.org",
    icon: s("typescript.svg"),
    label: "TypeScript",
  },
  {
    categories: ["Languages"],
    href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
    icon: s("javascript.svg"),
    label: "JavaScript",
  },
  {
    categories: ["Languages"],
    href: "https://www.python.org",
    icon: s("python.svg"),
    label: "Python",
  },
  {
    categories: ["Frontend"],
    href: "https://react.dev",
    icon: t("react_light.svg", "react_dark.svg"),
    label: "React",
  },
  {
    categories: ["Frontend"],
    href: "https://nextjs.org",
    icon: s("nextjs_icon_dark.svg"),
    label: "Next.js",
  },
  {
    categories: ["Frontend"],
    href: "https://tailwindcss.com",
    icon: s("tailwindcss.svg"),
    label: "Tailwind CSS",
  },
  {
    categories: ["Frontend"],
    href: "https://ui.shadcn.com",
    icon: t("shadcn-ui.svg", "shadcn-ui_dark.svg"),
    label: "shadcn/ui",
  },
  {
    categories: ["Frontend"],
    href: "https://www.radix-ui.com",
    icon: t("radix-ui_light.svg", "radix-ui_dark.svg"),
    label: "Radix UI",
  },
  {
    categories: ["Frontend"],
    href: "https://tanstack.com",
    icon: s("tanstack.svg"),
    label: "TanStack",
  },
  {
    categories: ["Backend"],
    href: "https://nodejs.org",
    icon: s("nodejs.svg"),
    label: "Node.js",
  },
  {
    categories: ["Backend"],
    href: "https://www.postgresql.org",
    icon: s("postgresql.svg"),
    label: "PostgreSQL",
  },
  {
    categories: ["Backend"],
    href: "https://redis.io",
    icon: s("redis.svg"),
    label: "Redis",
  },
  {
    categories: ["Workflow & AI"],
    href: "https://git-scm.com",
    icon: s("git.svg"),
    label: "Git",
  },
  {
    categories: ["Workflow & AI"],
    href: "https://www.docker.com",
    icon: s("docker.svg"),
    label: "Docker",
  },
  {
    categories: ["Workflow & AI"],
    href: "https://vercel.com",
    icon: t("vercel.svg", "vercel_dark.svg"),
    label: "Vercel",
  },
  {
    categories: ["Workflow & AI"],
    href: "https://chatgpt.com/codex",
    icon: t("openai.svg", "openai_dark.svg"),
    label: "Codex",
  },
  {
    categories: ["Analytics"],
    href: "https://posthog.com",
    icon: s("posthog.svg"),
    label: "PostHog",
  },
  {
    categories: ["Design"],
    href: "https://www.figma.com",
    icon: s("figma.svg"),
    label: "Figma",
  },
];
