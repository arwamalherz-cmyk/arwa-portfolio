import type { CSSProperties } from 'react';

interface TechBadgeProps {
  label: string;
  className?: string;
  style?: CSSProperties;
}

export function TechBadge({ label, className = '', style }: TechBadgeProps) {
  return (
    <span
      style={style}
      className={`inline-flex items-center rounded-full border border-primary/15 bg-surface px-3 py-1.5 text-xs font-medium text-text shadow-md shadow-primary/5 ${className}`.trim()}
    >
      {label}
    </span>
  );
}
