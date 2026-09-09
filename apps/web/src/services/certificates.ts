import type { Certificate, CreateInput } from "@/types/portfolio";
import { apiFetch, mock, mockId, USE_MOCK } from "./api";

const MOCK_CERTIFICATES: Certificate[] = [
  { id: "c-web", title: "Responsive Web Design", issuer: "freeCodeCamp", year: 2025 },
  { id: "c-js", title: "JavaScript Algorithms and Data Structures", issuer: "freeCodeCamp", year: 2025 },
  { id: "c-db", title: "Relational Databases", issuer: "Coursera", year: 2024 },
];

const store = [...MOCK_CERTIFICATES];

export function getCertificates(): Promise<Certificate[]> {
  return USE_MOCK ? mock(store) : apiFetch<Certificate[]>("/certificates");
}

export function createCertificate(
  input: CreateInput<Certificate>,
): Promise<Certificate> {
  if (USE_MOCK) {
    const created: Certificate = { ...input, id: mockId() };
    store.unshift(created);
    return mock(created);
  }
  return apiFetch<Certificate>("/certificates", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export function updateCertificate(
  id: string,
  input: Partial<CreateInput<Certificate>>,
): Promise<Certificate> {
  if (USE_MOCK) {
    const index = store.findIndex((item) => item.id === id);
    if (index === -1) throw new Error(`Certificate ${id} not found`);
    store[index] = { ...store[index]!, ...input };
    return mock(store[index]!);
  }
  return apiFetch<Certificate>(`/certificates/${id}`, {
    method: "PUT",
    body: JSON.stringify(input),
  });
}

export function deleteCertificate(id: string): Promise<void> {
  if (USE_MOCK) {
    const index = store.findIndex((item) => item.id === id);
    if (index !== -1) store.splice(index, 1);
    return mock(undefined);
  }
  return apiFetch<void>(`/certificates/${id}`, { method: "DELETE" });
}
