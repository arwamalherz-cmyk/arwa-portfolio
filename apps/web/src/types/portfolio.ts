/**
 * Shared portfolio data shapes.
 *
 * These describe the resources the public site renders and the Admin
 * dashboard will manage. They are intentionally UI-agnostic so the same
 * types can back both the mock data and the real API responses.
 */

export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  url?: string;
  repoUrl?: string;
  year?: number;
  featured?: boolean;
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  year: number;
  url?: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
  current?: boolean;
}

export type SkillCategory =
  | "Languages"
  | "Frontend"
  | "Backend"
  | "Database"
  | "Tools";

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  level?: number; // 0-100, optional proficiency hint
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string; // ISO date
}

/** Payload accepted by the public contact form. */
export type ContactMessageInput = Pick<
  ContactMessage,
  "name" | "email" | "message"
>;

/** Generic "create" payload: everything except the server-owned id. */
export type CreateInput<T extends { id: string }> = Omit<T, "id">;
