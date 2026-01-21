import { ReactNode } from 'react';

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
      className="flex items-center p-6 dark:bg-white/10 bg-white border border-primary-900/10 dark:border-white/10 shadow-sm dark:shadow-none rounded-2xl dark:hover:bg-white/20 hover:bg-primary-200/20 transition-all duration-300 group backdrop-blur-sm"
    >
      <div className="w-12 h-12 bg-transparent group-hover:bg-white dark:group-hover:bg-white/10 rounded-xl flex items-center justify-center mr-6 group-hover:scale-110 transition-transform">
        <div className="text-primary-900 dark:text-white">
          {icon}
        </div>
      </div>
      <div>
        <p className="font-medium dark:text-white text-primary-900 text-lg">{title}</p>
        <p className="dark:text-primary-200 text-primary-900/70">{subtitle}</p>
      </div>
    </a>
  );
}