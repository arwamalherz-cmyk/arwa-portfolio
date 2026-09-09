import type { CreateInput, Project } from "@/types/portfolio";
import { apiFetch, mock, mockId, USE_MOCK } from "./api";

const MOCK_PROJECTS: Project[] = [
  {
    id: "p-portfolio",
    title: "Personal Portfolio",
    description:
      "This site — a React + TypeScript portfolio with a Tailwind design system, light/dark themes and an admin-ready architecture.",
    tech: ["React", "TypeScript", "Tailwind CSS", "Vite"],
    repoUrl: "https://github.com/arwamalherz-cmyk",
    year: 2026,
    featured: true,
  },
  {
    id: "p-tasks",
    title: "Task Manager App",
    description:
      "A responsive task manager with filtering, persistence and a REST API backed by a relational database.",
    tech: ["React", "Node.js", "Express", "PostgreSQL"],
    year: 2025,
    featured: true,
  },
  {
    id: "p-weather",
    title: "Weather Dashboard",
    description:
      "A clean weather dashboard consuming a public API with search, geolocation and cached results.",
    tech: ["JavaScript", "REST API", "CSS"],
    year: 2025,
  },
];

const store = [...MOCK_PROJECTS];

export function getProjects(): Promise<Project[]> {
  return USE_MOCK ? mock(store) : apiFetch<Project[]>("/projects");
}

export function createProject(input: CreateInput<Project>): Promise<Project> {
  if (USE_MOCK) {
    const created: Project = { ...input, id: mockId() };
    store.unshift(created);
    return mock(created);
  }
  return apiFetch<Project>("/projects", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export function updateProject(
  id: string,
  input: Partial<CreateInput<Project>>,
): Promise<Project> {
  if (USE_MOCK) {
    const index = store.findIndex((item) => item.id === id);
    if (index === -1) throw new Error(`Project ${id} not found`);
    store[index] = { ...store[index]!, ...input };
    return mock(store[index]!);
  }
  return apiFetch<Project>(`/projects/${id}`, {
    method: "PUT",
    body: JSON.stringify(input),
  });
}

export function deleteProject(id: string): Promise<void> {
  if (USE_MOCK) {
    const index = store.findIndex((item) => item.id === id);
    if (index !== -1) store.splice(index, 1);
    return mock(undefined);
  }
  return apiFetch<void>(`/projects/${id}`, { method: "DELETE" });
}
