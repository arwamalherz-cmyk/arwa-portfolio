import { TechBadge } from '@/components/ui/TechBadge';

const TECH_BADGES = [
  { label: 'React', position: '-top-4 -left-4 sm:-left-8', delay: '0s' },
  { label: 'TypeScript', position: '-top-4 -right-2 sm:-right-6', delay: '0.6s' },
  { label: 'Python', position: 'top-1/3 -right-4 sm:-right-10', delay: '1.2s' },
  { label: 'JavaScript', position: '-bottom-4 -left-2 sm:-left-6', delay: '1.8s' },
  { label: 'Flutter', position: '-bottom-6 right-6 sm:right-10', delay: '0.9s' },
];

export function TerminalCard() {
  return (
    <div className="relative mx-auto w-full min-w-0 max-w-md px-6 py-6 sm:px-10">
      <div className="overflow-hidden rounded-2xl bg-navy shadow-xl shadow-primary/10">
        <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
          <span className="size-3 rounded-full bg-red-400/70" />
          <span className="size-3 rounded-full bg-yellow-400/70" />
          <span className="size-3 rounded-full bg-green-400/70" />
          <span className="ml-2 font-mono text-xs text-white/40">arwa@portfolio:~$</span>
        </div>
        <pre className="overflow-x-auto px-5 py-5 font-mono text-[13px] leading-relaxed text-white/80">
          <code>
            <span className="text-primary-secondary">const</span> developer = {'{'}
            {'\n'}  name: <span className="text-emerald-300">'Arwa Alherz'</span>,
            {'\n'}  role: <span className="text-emerald-300">'CS Student'</span>,
            {'\n'}  stack: [<span className="text-emerald-300">'React'</span>, <span className="text-emerald-300">'TypeScript'</span>, <span className="text-emerald-300">'Python'</span>],
            {'\n'}  passion: <span className="text-emerald-300">'Building Solutions'</span>,
            {'\n'}  status: <span className="text-emerald-300">'available'</span>
            {'\n'}{'}'}
            {'\n\n'}
            <span className="text-white/40">// Let's build something amazing!</span>
          </code>
        </pre>
      </div>

      {TECH_BADGES.map((badge) => (
        <TechBadge
          key={badge.label}
          label={badge.label}
          className={`absolute animate-float ${badge.position}`}
          style={{ animationDelay: badge.delay }}
        />
      ))}
    </div>
  );
}
