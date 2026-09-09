import type { CreateInput, Skill } from "@/types/portfolio";
import { apiFetch, mock, mockId, USE_MOCK } from "./api";

const MOCK_SKILLS: Skill[] = [
  { id: "s-js", name: "JavaScript", category: "Languages", level: 85 },
  { id: "s-ts", name: "TypeScript", category: "Languages", level: 75 },
  { id: "s-py", name: "Python", category: "Languages", level: 70 },
  { id: "s-react", name: "React", category: "Frontend", level: 85 },
  { id: "s-tw", name: "Tailwind CSS", category: "Frontend", level: 85 },
  { id: "s-node", name: "Node.js", category: "Backend", level: 60 },
  { id: "s-express", name: "Express", category: "Backend", level: 55 },
  { id: "s-sql", name: "SQL", category: "Database", level: 65 },
  { id: "s-postgres", name: "PostgreSQL", category: "Database", level: 55 },
  { id: "s-git", name: "Git & GitHub", category: "Tools", level: 80 },
];

const store = [...MOCK_SKILLS];

export function getSkills(): Promise<Skill[]> {
  return USE_MOCK ? mock(store) : apiFetch<Skill[]>("/skills");
}

export function createSkill(input: CreateInput<Skill>): Promise<Skill> {
  if (USE_MOCK) {
    const created: Skill = { ...input, id: mockId() };
    store.push(created);
    return mock(created);
  }
  return apiFetch<Skill>("/skills", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export function updateSkill(
  id: string,
  input: Partial<CreateInput<Skill>>,
): Promise<Skill> {
  if (USE_MOCK) {
    const index = store.findIndex((item) => item.id === id);
    if (index === -1) throw new Error(`Skill ${id} not found`);
    store[index] = { ...store[index]!, ...input };
    return mock(store[index]!);
  }
  return apiFetch<Skill>(`/skills/${id}`, {
    method: "PUT",
    body: JSON.stringify(input),
  });
}

export function deleteSkill(id: string): Promise<void> {
  if (USE_MOCK) {
    const index = store.findIndex((item) => item.id === id);
    if (index !== -1) store.splice(index, 1);
    return mock(undefined);
  }
  return apiFetch<void>(`/skills/${id}`, { method: "DELETE" });
}
