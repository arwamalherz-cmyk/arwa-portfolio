import type { ContactMessage, ContactMessageInput } from "@/types/portfolio";
import { apiFetch, mock, mockId, USE_MOCK } from "./api";

const MOCK_MESSAGES: ContactMessage[] = [
  {
    id: "m-1",
    name: "Sara N.",
    email: "sara@example.com",
    message: "Loved your portfolio! Are you open to a small freelance project?",
    createdAt: "2026-08-28T10:12:00.000Z",
  },
  {
    id: "m-2",
    name: "Omar K.",
    email: "omar@example.com",
    message: "Can you share more details about the Task Manager project?",
    createdAt: "2026-09-02T15:40:00.000Z",
  },
];

const store = [...MOCK_MESSAGES];

/** Public: submit a message from the contact form. */
export function sendContactMessage(
  input: ContactMessageInput,
): Promise<ContactMessage> {
  if (USE_MOCK) {
    const created: ContactMessage = {
      ...input,
      id: mockId(),
      createdAt: new Date().toISOString(),
    };
    store.unshift(created);
    return mock(created);
  }
  return apiFetch<ContactMessage>("/contact", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

/** Admin: list received messages, newest first. */
export function getContactMessages(): Promise<ContactMessage[]> {
  return USE_MOCK
    ? mock(store)
    : apiFetch<ContactMessage[]>("/contact");
}
