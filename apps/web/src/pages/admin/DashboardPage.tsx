import type { ComponentType } from "react";
import { useEffect, useState } from "react";
import {
  Award,
  Briefcase,
  FolderKanban,
  Mail,
  Wrench,
} from "lucide-react";
import { getCertificates } from "@/services/certificates";
import { getContactMessages } from "@/services/contact";
import { getExperience } from "@/services/experience";
import { getProjects } from "@/services/projects";
import { getSkills } from "@/services/skills";
import type { ContactMessage } from "@/types/portfolio";

interface ResourceStat {
  key: string;
  label: string;
  description: string;
  icon: ComponentType<{ size?: number; "aria-hidden"?: boolean }>;
  count: number | null;
}

export function DashboardPage() {
  const [stats, setStats] = useState<ResourceStat[]>([
    { key: "projects", label: "Projects", description: "Portfolio work shown on the site", icon: FolderKanban, count: null },
    { key: "certificates", label: "Certificates", description: "Courses and credentials", icon: Award, count: null },
    { key: "experience", label: "Experience", description: "Roles and training", icon: Briefcase, count: null },
    { key: "skills", label: "Skills", description: "Technologies grouped by area", icon: Wrench, count: null },
    { key: "messages", label: "Contact Messages", description: "Submissions from the contact form", icon: Mail, count: null },
  ]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);

  useEffect(() => {
    let active = true;
    Promise.all([
      getProjects(),
      getCertificates(),
      getExperience(),
      getSkills(),
      getContactMessages(),
    ]).then(([projects, certificates, experience, skills, contactMessages]) => {
      if (!active) return;
      const counts: Record<string, number> = {
        projects: projects.length,
        certificates: certificates.length,
        experience: experience.length,
        skills: skills.length,
        messages: contactMessages.length,
      };
      setStats((current) =>
        current.map((stat) => ({ ...stat, count: counts[stat.key] ?? 0 })),
      );
      setMessages(contactMessages.slice(0, 3));
    });
    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-text">
          Overview
        </h1>
        <p className="mt-1 text-sm text-text-secondary">
          Manage the content that powers the public portfolio.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map(({ key, label, description, icon: Icon, count }) => (
          <article
            key={key}
            className="flex flex-col rounded-2xl border border-border bg-surface p-5 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <span className="grid size-10 place-items-center rounded-xl bg-primary-soft text-primary">
                <Icon size={18} aria-hidden={true} />
              </span>
              <span className="rounded-full bg-primary-soft px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-primary">
                Soon
              </span>
            </div>
            <p className="mt-4 text-3xl font-extrabold text-text">
              {count === null ? "—" : count}
            </p>
            <p className="text-sm font-semibold text-text">{label}</p>
            <p className="mt-1 text-xs text-text-secondary">{description}</p>
            <button
              type="button"
              disabled
              className="mt-4 w-full cursor-not-allowed rounded-lg border border-border bg-background px-3 py-2 text-sm font-medium text-text-secondary"
            >
              Manage
            </button>
          </article>
        ))}
      </div>

      <section className="rounded-2xl border border-border bg-surface p-5 shadow-sm">
        <h2 className="text-sm font-semibold text-text">Latest contact messages</h2>
        <ul className="mt-4 divide-y divide-border">
          {messages.length === 0 ? (
            <li className="py-3 text-sm text-text-secondary">No messages yet.</li>
          ) : (
            messages.map((message) => (
              <li key={message.id} className="py-3">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-sm font-semibold text-text">
                    {message.name}
                  </p>
                  <time
                    dateTime={message.createdAt}
                    className="shrink-0 text-xs text-text-secondary"
                  >
                    {message.createdAt.slice(0, 10)}
                  </time>
                </div>
                <p className="mt-1 line-clamp-2 text-sm text-text-secondary">
                  {message.message}
                </p>
              </li>
            ))
          )}
        </ul>
      </section>
    </div>
  );
}
