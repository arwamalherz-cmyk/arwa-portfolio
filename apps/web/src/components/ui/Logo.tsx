interface LogoProps {
  className?: string;
}

export function Logo({ className = '' }: LogoProps) {
  return (
    <span className={`select-none font-mono text-lg font-bold tracking-tight ${className}`.trim()}>
      <span className="text-text-secondary">&lt;</span>
      <span className="text-primary">Arwa</span>
      <span className="text-text-secondary"> /&gt;</span>
    </span>
  );
}
