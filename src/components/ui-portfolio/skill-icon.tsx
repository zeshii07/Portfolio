import {
  Code2,
  Server,
  Database,
  Bot,
  ShieldCheck,
  Globe,
  Workflow,
  Wrench,
  type LucideIcon,
} from "lucide-react";

type IconName =
  | "frontend"
  | "backend"
  | "database"
  | "ai"
  | "security"
  | "website"
  | "ai"
  | "software"
  | "maintenance";

const iconMap: Record<string, LucideIcon> = {
  frontend: Code2,
  backend: Server,
  database: Database,
  ai: Bot,
  security: ShieldCheck,
  website: Globe,
  software: Workflow,
  maintenance: Wrench,
};

export function SkillIcon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Icon = iconMap[name] ?? Code2;
  return <Icon className={className} aria-hidden />;
}
