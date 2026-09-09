import type { CreateInput, Experience } from "@/types/portfolio";
import { apiFetch, mock, mockId, USE_MOCK } from "./api";

const MOCK_EXPERIENCE: Experience[] = [
  {
    id: "e-freelance",
    role: "Front-End Developer (Freelance)",
    company: "Self-employed",
    period: "2023 — Present",
    description:
      "Building responsive, database-connected web interfaces for small clients and personal products.",
    current: true,
  },
  {
    id: "e-training",
    role: "Web Development Trainee",
    company: "University Program",
    period: "2024",
    description:
      "Hands-on training in modern JavaScript, component-based UI and working with REST APIs.",
  },
];

const store = [...MOCK_EXPERIENCE];

export function getExperience(): Promise<Experience[]> {
  return USE_MOCK ? mock(store) : apiFetch<Experience[]>("/experience");
}

export function createExperience(
  input: CreateInput<Experience>,
): Promise<Experience> {
  if (USE_MOCK) {
    const created: Experience = { ...input, id: mockId() };
    store.unshift(created);
    return mock(created);
  }
  return apiFetch<Experience>("/experience", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export function updateExperience(
  id: string,
  input: Partial<CreateInput<Experience>>,
): Promise<Experience> {
  if (USE_MOCK) {
    const index = store.findIndex((item) => item.id === id);
    if (index === -1) throw new Error(`Experience ${id} not found`);
    store[index] = { ...store[index]!, ...input };
    return mock(store[index]!);
  }
  return apiFetch<Experience>(`/experience/${id}`, {
    method: "PUT",
    body: JSON.stringify(input),
  });
}

export function deleteExperience(id: string): Promise<void> {
  if (USE_MOCK) {
    const index = store.findIndex((item) => item.id === id);
    if (index !== -1) store.splice(index, 1);
    return mock(undefined);
  }
  return apiFetch<void>(`/experience/${id}`, { method: "DELETE" });
}
