"use client";

export type ProjectForm = {
  name: string;
  image: string;
  link: string;
  description: string;
  skills: string;
};

export const EMPTY_PROJECT_FORM: ProjectForm = {
  name: "",
  image: "",
  link: "",
  description: "",
  skills: "",
};

export const projectInputClass =
  "w-full rounded-xl border border-blue-700/50 bg-blue-950/40 px-3 py-2.5 text-sm text-white placeholder:text-blue-300/40 outline-none transition focus:border-blue-400/70 focus:ring-2 focus:ring-blue-500/20";
export const projectLabelClass = "mb-1.5 block text-xs font-medium text-blue-200/70";
export const projectSecondaryButtonClass =
  "inline-flex items-center justify-center gap-2 rounded-xl border border-blue-700/50 px-3 py-2 text-sm text-blue-100 transition hover:border-blue-500 hover:bg-blue-900/40 disabled:cursor-not-allowed disabled:opacity-50";
export const projectPrimaryButtonClass =
  "inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50";

export const toProjectForm = (project: {
  name: string;
  image: string;
  link?: string | null;
  description: string;
  skills: string[];
}): ProjectForm => ({
  name: project.name,
  image: project.image,
  link: project.link ?? "",
  description: project.description,
  skills: project.skills.join(", "),
});

export const toProjectPayload = (form: ProjectForm, order: number) => ({
  name: form.name.trim(),
  image: form.image.trim(),
  link: form.link.trim() || undefined,
  description: form.description.trim(),
  skills: form.skills
    .split(",")
    .map((skill) => skill.trim())
    .filter(Boolean),
  order,
});

type ProjectFormFieldsProps = {
  form: ProjectForm;
  onChange: (next: ProjectForm) => void;
};

export const ProjectFormFields = ({ form, onChange }: ProjectFormFieldsProps) => {
  const updateField = (field: keyof ProjectForm, value: string) => {
    onChange({ ...form, [field]: value });
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={projectLabelClass}>Project name</label>
          <input
            required
            maxLength={120}
            value={form.name}
            onChange={(event) => updateField("name", event.target.value)}
            className={projectInputClass}
            placeholder="Project name"
          />
        </div>
        <div>
          <label className={projectLabelClass}>Project link (optional)</label>
          <input
            type="url"
            value={form.link}
            onChange={(event) => updateField("link", event.target.value)}
            className={projectInputClass}
            placeholder="https://example.com"
          />
        </div>
      </div>
      <div>
        <label className={projectLabelClass}>Image URL</label>
        <input
          required
          type="url"
          value={form.image}
          onChange={(event) => updateField("image", event.target.value)}
          className={projectInputClass}
          placeholder="https://example.com/project-image.png"
        />
      </div>
      <div>
        <label className={projectLabelClass}>Description</label>
        <textarea
          required
          rows={4}
          maxLength={2000}
          value={form.description}
          onChange={(event) => updateField("description", event.target.value)}
          className={`${projectInputClass} resize-y`}
          placeholder="What does this project do?"
        />
      </div>
      <div>
        <label className={projectLabelClass}>Technologies / skills</label>
        <input
          value={form.skills}
          onChange={(event) => updateField("skills", event.target.value)}
          className={projectInputClass}
          placeholder="Next.js, TypeScript, PostgreSQL"
        />
        <p className="mt-1.5 text-xs text-blue-200/45">
          Separate each technology with a comma.
        </p>
      </div>
    </div>
  );
};
