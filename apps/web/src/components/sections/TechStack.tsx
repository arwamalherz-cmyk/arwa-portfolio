import { Container } from "@/components/ui/Container";
import { TechBadge } from "@/components/ui/TechBadge";

const TECH = [
  "React",
  "TypeScript",
  "JavaScript",
  "Python",
  "Tailwind CSS",
  "GitHub",
  "Figma",
  "VS Code",
];

/** Compact pill row of the tech stack, shown under the hero. */
export function TechStack({ className = "" }: { className?: string }) {
  return (
    <div className={`border-y border-border bg-surface/60 ${className}`.trim()}>
      <Container>
        <div className="flex flex-col items-center gap-4 py-5 sm:flex-row sm:justify-between">
          <ul className="flex flex-wrap items-center justify-center gap-2.5">
            {TECH.map((tech) => (
              <li key={tech}>
                <TechBadge label={tech} />
              </li>
            ))}
          </ul>
          <p className="shrink-0 text-right text-xs font-medium leading-relaxed text-text-secondary">
            Always learning
            <br />
            Always building
          </p>
        </div>
      </Container>
    </div>
  );
}
