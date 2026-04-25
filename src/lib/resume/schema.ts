export type ResumeBasics = {
  name: string;
  label: string;
  email: string;
  phone?: string;
  url?: string;
  summary: string;
  location: {
    city: string;
    region?: string;
    countryCode?: string;
  };
  profiles: Array<{ network: string; url: string }>;
};

export type ResumeWork = {
  name: string;
  position: string;
  location?: string;
  startDate: string;
  endDate?: string;
  summary?: string;
  highlights: string[];
};

export type ResumeEducation = {
  institution: string;
  area: string;
  studyType?: string;
  startDate: string;
  endDate?: string;
};

export type ResumeSkillGroup = {
  name: string;
  keywords: string[];
};

export type ResumeLanguage = {
  language: string;
  fluency: string;
};

export type Resume = {
  basics: ResumeBasics;
  work: ResumeWork[];
  education: ResumeEducation[];
  skills: ResumeSkillGroup[];
  languages: ResumeLanguage[];
};

function isStringArray(v: unknown): v is string[] {
  return Array.isArray(v) && v.every((x) => typeof x === "string");
}

export function assertResume(value: unknown): Resume {
  if (!value || typeof value !== "object")
    throw new Error("Resume: payload is not an object");
  const v = value as Record<string, unknown>;

  const basics = v.basics as ResumeBasics | undefined;
  if (!basics || typeof basics.name !== "string" || typeof basics.summary !== "string")
    throw new Error("Resume: invalid basics");

  if (!Array.isArray(v.work)) throw new Error("Resume: work must be array");
  for (const w of v.work as ResumeWork[]) {
    if (typeof w.name !== "string" || typeof w.position !== "string" || typeof w.startDate !== "string")
      throw new Error("Resume: invalid work entry");
    if (!isStringArray(w.highlights)) throw new Error("Resume: work.highlights must be string[]");
  }

  if (!Array.isArray(v.education)) throw new Error("Resume: education must be array");
  if (!Array.isArray(v.skills)) throw new Error("Resume: skills must be array");
  for (const s of v.skills as ResumeSkillGroup[]) {
    if (typeof s.name !== "string" || !isStringArray(s.keywords))
      throw new Error("Resume: invalid skills entry");
  }
  if (!Array.isArray(v.languages)) throw new Error("Resume: languages must be array");

  return v as unknown as Resume;
}
