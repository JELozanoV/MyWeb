import { ReactNode } from 'react';
import { FiArrowUpRight } from 'react-icons/fi';

interface ContactLinkCardProps {
  icon: ReactNode;
  title: string;
  subtitle: string;
  href: string;
  target?: string;
}

export default function ContactLinkCard({ icon, title, subtitle, href, target }: ContactLinkCardProps) {
  return (
    <a
      href={href}
      target={target}
      rel={target === '_blank' ? 'noopener noreferrer' : undefined}
      className="card group flex items-center gap-3 !p-4 sm:gap-5 sm:!p-5"
    >
      <span className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-line bg-surface-2 text-accent-fg transition-transform duration-300 group-hover:scale-110">
        {icon}
      </span>
      <span className="relative min-w-0 flex-1">
        <span className="block font-display text-lg font-medium text-fg">{title}</span>
        <span className="block break-all text-[13px] text-muted sm:text-sm">{subtitle}</span>
      </span>
      <FiArrowUpRight
        size={20}
        className="relative shrink-0 text-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-fg"
      />
    </a>
  );
}
