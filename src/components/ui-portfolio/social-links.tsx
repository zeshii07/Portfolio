import { Github, Linkedin, Mail, MessageCircle } from "lucide-react";
import type { SocialLink } from "@/types/portfolio";

const iconMap = {
  github: Github,
  linkedin: Linkedin,
  email: Mail,
  whatsapp: MessageCircle,
} as const;

export function SocialLinks({
  links,
  className,
  iconClassName,
}: {
  links: SocialLink[];
  className?: string;
  iconClassName?: string;
}) {
  return (
    <ul className={className}>
      {links.map((link) => {
        const Icon = iconMap[link.icon];
        return (
          <li key={link.label} className="contents">
            <a
              href={link.href}
              target={link.icon === "email" ? undefined : "_blank"}
              rel="noopener noreferrer"
              className="inline-flex size-10 items-center justify-center rounded-xl border border-token bg-surface text-secondary transition-all hover:border-primary/40 hover:text-primary hover:bg-surface-raised focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              aria-label={link.label}
            >
              <Icon className={iconClassName ?? "size-4"} aria-hidden />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
