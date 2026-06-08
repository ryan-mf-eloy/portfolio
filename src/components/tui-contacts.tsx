import { Mail, MapPin, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

const GitHubIcon = (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden>
    <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.69-3.87-1.54-3.87-1.54-.52-1.33-1.27-1.69-1.27-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.76 2.69 1.25 3.34.96.1-.74.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.15 1.18a10.92 10.92 0 0 1 5.74 0c2.18-1.49 3.14-1.18 3.14-1.18.62 1.58.23 2.75.11 3.04.74.81 1.18 1.84 1.18 3.1 0 4.42-2.69 5.39-5.26 5.68.41.36.78 1.06.78 2.13 0 1.54-.01 2.78-.01 3.16 0 .31.21.68.8.56C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5z" />
  </svg>
);

const LinkedInIcon = (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden>
    <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
  </svg>
);

const WhatsAppIcon = (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden>
    <path d="M17.5 14.4c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51-.17-.01-.37-.01-.57-.01-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.49 0 1.47 1.07 2.89 1.22 3.09.15.2 2.1 3.21 5.08 4.5.71.31 1.27.49 1.7.63.71.23 1.36.19 1.88.12.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35zM12 .5C5.65.5.5 5.65.5 12c0 2.11.55 4.09 1.5 5.8L.5 23.5l5.86-1.54A11.46 11.46 0 0 0 12 23.5C18.35 23.5 23.5 18.35 23.5 12S18.35.5 12 .5zm0 21c-1.84 0-3.55-.55-4.99-1.49l-.36-.21-3.7.97.99-3.61-.23-.37A9.49 9.49 0 0 1 2.5 12C2.5 6.76 6.76 2.5 12 2.5S21.5 6.76 21.5 12 17.24 21.5 12 21.5z" />
  </svg>
);

type Social = {
  label: string;
  href: string;
  external: boolean;
  icon: ReactNode;
};

const SOCIALS: Social[] = [
  {
    label: "GitHub",
    href: "https://github.com/ryan-mf-eloy",
    external: true,
    icon: GitHubIcon,
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/ryan-eloy-5906b91a5",
    external: true,
    icon: LinkedInIcon,
  },
  {
    label: "Email",
    href: "mailto:developer@ryaneloy.dev",
    external: false,
    icon: <Mail aria-hidden size={18} strokeWidth={2.1} />,
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/5511973041534",
    external: true,
    icon: WhatsAppIcon,
  },
];

function InfoRow({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  href?: string;
}) {
  const valueClass =
    "tui-mono min-w-0 overflow-hidden text-ellipsis whitespace-nowrap text-[13px] text-oz-text-soft";

  return (
    <div className="grid grid-cols-[22px_68px_minmax(0,1fr)] items-center gap-3">
      <Icon aria-hidden size={19} strokeWidth={1.8} className="text-oz-text" />
      <span className="tui-mono text-[11px] uppercase text-oz-text-mute">
        {label}
      </span>
      {href ? (
        <a
          href={href}
          className={`${valueClass} no-underline transition-colors hover:text-oz-green`}
        >
          {value}
        </a>
      ) : (
        <span className={valueClass}>{value}</span>
      )}
    </div>
  );
}

export function TuiContacts() {
  return (
    <section
      id="contact"
      className="scroll-mt-28"
      aria-label="Contact information"
    >
      <div className="flex max-w-[540px] flex-col gap-4">
        <InfoRow icon={MapPin} label="Location" value="São Paulo · Brazil" />
        <InfoRow
          icon={Mail}
          label="Email"
          value="developer@ryaneloy.dev"
          href="mailto:developer@ryaneloy.dev"
        />
      </div>

      <div className="mt-6 grid max-w-[540px] grid-cols-2 gap-3 sm:grid-cols-4">
        {SOCIALS.map((social) => (
          <a
            key={social.label}
            href={social.href}
            target={social.external ? "_blank" : undefined}
            rel={social.external ? "noopener noreferrer" : undefined}
            className="social-link inline-flex h-12 min-w-0 items-center justify-center gap-2 rounded-[10px] border border-oz-border bg-oz-surface px-3 text-[14px] font-medium text-oz-text no-underline"
          >
            <span className="shrink-0 text-current">{social.icon}</span>
            <span className="truncate">{social.label}</span>
          </a>
        ))}
      </div>
    </section>
  );
}
