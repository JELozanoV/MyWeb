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
      className="flex items-center p-6 bg-white/10 rounded-2xl hover:bg-white/20 transition-all duration-300 group backdrop-blur-sm"
    >
      <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mr-6 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <div>
        <p className="font-medium text-white text-lg">{title}</p>
        <p className="text-primary-200">{subtitle}</p>
      </div>
    </a>
  );
}