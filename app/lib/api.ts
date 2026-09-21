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

export const getProjects = () => apiFetch<ApiProject[]>("/projects");
export const getQualifications = () => apiFetch<ApiQualification[]>("/qualifications");
export const getSkills = () => apiFetch<ApiSkill[]>("/skills");
export const getContentBlock = (key: string) => apiFetch<ApiContentBlock>(`/content/${key}`);
export const getAllContent = () => apiFetch<ApiContentBlock[]>("/content");
