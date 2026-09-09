interface LogoProps {
  className?: string;
}

export function Logo({ className = "" }: LogoProps) {
  return (
    <span
      className={`select-none text-lg font-semibold tracking-tight text-text ${className}`.trim()}
    >
      Arwa Alherz
    </span>
  );
}
