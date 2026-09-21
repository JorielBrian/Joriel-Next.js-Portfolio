import { Proficiency, Preference, Category } from "@/app/data/enum";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface ApiProject {
  id: number;
  name: string;
  image: string;
  link?: string | null;
  description: string;
  skills: string[];
  order: number;
}

export interface ApiQualification {
  id: number;
  title: string;
  company: string;
  date: string;
  contract: string;
  description: string[];
  skills: string[];
  order: number;
}

export interface ApiSkill {
  id: number;
  skill: string;
  image: string;
  focus: boolean;
  proficiency: Proficiency;
  preference: Preference;
  category: Category;
  order: number;
}

export interface ApiContentBlock {
  key: string;
  paragraphs: string[];
}

async function apiFetch<T>(path: string): Promise<T> {
  if (!API_URL) {
    throw new Error(
      "NEXT_PUBLIC_API_URL is not set. Add it to .env.local, e.g. NEXT_PUBLIC_API_URL=https://joriel-python-portfolio.onrender.com"
    );
  }
  const res = await fetch(`${API_URL}${path}`);
  if (!res.ok) {
    throw new Error(`Request to ${path} failed: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

export interface ApiMe {
  username: string;
}

export async function login(username: string, password: string): Promise<ApiMe> {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.detail || "Login failed");
  }
  return res.json();
}

export async function logout(): Promise<void> {
  await fetch(`${API_URL}/auth/logout`, { method: "POST", credentials: "include" });
}

export async function getMe(): Promise<ApiMe | null> {
  if (!API_URL) return null;
  const res = await fetch(`${API_URL}/auth/me`, { credentials: "include" });
  if (!res.ok) return null;
  return res.json();
}

export const getProjects = () => apiFetch<ApiProject[]>("/projects");
export const getQualifications = () => apiFetch<ApiQualification[]>("/qualifications");
export const getSkills = () => apiFetch<ApiSkill[]>("/skills");
export const getContentBlock = (key: string) => apiFetch<ApiContentBlock>(`/content/${key}`);
export const getAllContent = () => apiFetch<ApiContentBlock[]>("/content");

// ---- Admin writes (require an active login session, cookie sent automatically) ----

async function adminFetch<T>(path: string, method: string, body?: unknown): Promise<T> {
  if (!API_URL) throw new Error("NEXT_PUBLIC_API_URL is not set.");
  const res = await fetch(`${API_URL}${path}`, {
    method,
    credentials: "include",
    headers: body ? { "Content-Type": "application/json" } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    const errBody = await res.json().catch(() => null);
    throw new Error(errBody?.detail || `${method} ${path} failed: ${res.status}`);
  }
  if (res.status === 204) return undefined as T;
  return res.json();
}

export const createProject = (data: Omit<ApiProject, "id">) => adminFetch<ApiProject>("/projects", "POST", data);
export const updateProject = (id: number, data: Partial<Omit<ApiProject, "id">>) => adminFetch<ApiProject>(`/projects/${id}`, "PUT", data);
export const deleteProject = (id: number) => adminFetch<void>(`/projects/${id}`, "DELETE");

export const createQualification = (data: Omit<ApiQualification, "id">) => adminFetch<ApiQualification>("/qualifications", "POST", data);
export const updateQualification = (id: number, data: Partial<Omit<ApiQualification, "id">>) => adminFetch<ApiQualification>(`/qualifications/${id}`, "PUT", data);
export const deleteQualification = (id: number) => adminFetch<void>(`/qualifications/${id}`, "DELETE");

export const createSkill = (data: Omit<ApiSkill, "id">) => adminFetch<ApiSkill>("/skills", "POST", data);
export const updateSkill = (id: number, data: Partial<Omit<ApiSkill, "id">>) => adminFetch<ApiSkill>(`/skills/${id}`, "PUT", data);
export const deleteSkill = (id: number) => adminFetch<void>(`/skills/${id}`, "DELETE");

export const updateContentBlock = (key: string, paragraphs: string[]) => adminFetch<ApiContentBlock>(`/content/${key}`, "PUT", { paragraphs });
