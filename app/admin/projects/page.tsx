'use client';

import { useCallback, useEffect, useState, type FormEvent } from "react";
import {
  ExternalLink,
  LoaderCircle,
  Pencil,
  Plus,
  Save,
  Trash2,
  X,
} from "lucide-react";
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
  type ApiProject,
} from "@/app/lib/api";

type ProjectForm = {
  name: string;
  image: string;
  link: string;
  description: string;
  skills: string;
};

const EMPTY_FORM: ProjectForm = {
  name: "",
  image: "",
  link: "",
  description: "",
  skills: "",
};

const inputCls =
  "w-full rounded-xl border border-blue-700/50 bg-blue-950/40 px-3 py-2.5 text-sm text-white placeholder:text-blue-300/40 outline-none transition focus:border-blue-400/70 focus:ring-2 focus:ring-blue-500/20";
const labelCls = "mb-1.5 block text-xs font-medium text-blue-200/70";
const secondaryButtonCls =
  "inline-flex items-center justify-center gap-2 rounded-xl border border-blue-700/50 px-3 py-2 text-sm text-blue-100 transition hover:border-blue-500 hover:bg-blue-900/40 disabled:cursor-not-allowed disabled:opacity-50";
const primaryButtonCls =
  "inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50";

function toForm(project: ApiProject): ProjectForm {
  return {
    name: project.name,
    image: project.image,
    link: project.link ?? "",
    description: project.description,
    skills: project.skills.join(", "),
  };
}

function toPayload(form: ProjectForm, order: number) {
  return {
    name: form.name.trim(),
    image: form.image.trim(),
    link: form.link.trim() || undefined,
    description: form.description.trim(),
    skills: form.skills
      .split(",")
      .map((skill) => skill.trim())
      .filter(Boolean),
    order,
  };
}

function ProjectFields({
  form,
  onChange,
}: {
  form: ProjectForm;
  onChange: (next: ProjectForm) => void;
}) {
  const updateField = (field: keyof ProjectForm, value: string) => {
    onChange({ ...form, [field]: value });
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelCls}>Project name</label>
          <input
            required
            maxLength={120}
            value={form.name}
            onChange={(event) => updateField("name", event.target.value)}
            className={inputCls}
            placeholder="Project name"
          />
        </div>
        <div>
          <label className={labelCls}>Project link (optional)</label>
          <input
            type="url"
            value={form.link}
            onChange={(event) => updateField("link", event.target.value)}
            className={inputCls}
            placeholder="https://example.com"
          />
        </div>
      </div>
      <div>
        <label className={labelCls}>Image URL</label>
        <input
          required
          type="url"
          value={form.image}
          onChange={(event) => updateField("image", event.target.value)}
          className={inputCls}
          placeholder="https://example.com/project-image.png"
        />
      </div>
      <div>
        <label className={labelCls}>Description</label>
        <textarea
          required
          rows={4}
          maxLength={2000}
          value={form.description}
          onChange={(event) => updateField("description", event.target.value)}
          className={`${inputCls} resize-y`}
          placeholder="What does this project do?"
        />
      </div>
      <div>
        <label className={labelCls}>Technologies / skills</label>
        <input
          value={form.skills}
          onChange={(event) => updateField("skills", event.target.value)}
          className={inputCls}
          placeholder="Next.js, TypeScript, PostgreSQL"
        />
        <p className="mt-1.5 text-xs text-blue-200/45">
          Separate each technology with a comma.
        </p>
      </div>
    </div>
  );
}

export default function ProjectsAdmin() {
  const [projects, setProjects] = useState<ApiProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<ProjectForm>(EMPTY_FORM);
  const [addOpen, setAddOpen] = useState(false);
  const [addForm, setAddForm] = useState<ProjectForm>(EMPTY_FORM);
  const [projectToDelete, setProjectToDelete] = useState<ApiProject | null>(null);

  const loadProjects = useCallback(async () => {
    setLoading(true);
    try {
      setProjects(await getProjects());
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load projects.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadProjects();
  }, [loadProjects]);

  const startEdit = (project: ApiProject) => {
    setError(null);
    setEditingId(project.id);
    setEditForm(toForm(project));
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm(EMPTY_FORM);
  };

  const handleUpdate = async (event: FormEvent<HTMLFormElement>, project: ApiProject) => {
    event.preventDefault();
    setSaving(true);
    setError(null);
    try {
      await updateProject(project.id, toPayload(editForm, project.order));
      cancelEdit();
      await loadProjects();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not update the project.");
    } finally {
      setSaving(false);
    }
  };

  const handleCreate = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    setError(null);
    try {
      await createProject(toPayload(addForm, projects.length));
      setAddOpen(false);
      setAddForm(EMPTY_FORM);
      await loadProjects();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not create the project.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!projectToDelete) return;
    setDeleting(true);
    setError(null);
    try {
      await deleteProject(projectToDelete.id);
      setProjectToDelete(null);
      if (editingId === projectToDelete.id) cancelEdit();
      await loadProjects();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not delete the project.");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-6xl space-y-7">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium text-blue-300/70">Portfolio management</p>
          <h1 className="mt-1 text-2xl font-bold text-white sm:text-3xl">Projects</h1>
          <p className="mt-2 text-sm text-blue-100/55">
            Manage the projects displayed on your public portfolio.
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            setError(null);
            setAddForm(EMPTY_FORM);
            setAddOpen(true);
          }}
          className={primaryButtonCls}
        >
          <Plus size={17} />
          Add project
        </button>
      </header>

      {error && (
        <div
          role="alert"
          className="flex items-start justify-between gap-3 rounded-xl border border-red-800/50 bg-red-950/30 px-4 py-3 text-sm text-red-200"
        >
          <p>{error}</p>
          <button
            type="button"
            onClick={() => setError(null)}
            aria-label="Dismiss error"
            className="rounded-md p-0.5 text-red-200/70 hover:text-white"
          >
            <X size={16} />
          </button>
        </div>
      )}

      <div className="flex items-center justify-between border-b border-blue-900/60 pb-3">
        <h2 className="font-semibold text-white">All projects</h2>
        <span className="rounded-full border border-blue-800/50 bg-blue-950/50 px-3 py-1 text-xs text-blue-200/70">
          {projects.length} {projects.length === 1 ? "project" : "projects"}
        </span>
      </div>

      {loading ? (
        <div className="flex items-center justify-center gap-2 py-16 text-sm text-blue-200/60">
          <LoaderCircle size={18} className="animate-spin" />
          Loading projects…
        </div>
      ) : projects.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-blue-800/60 bg-blue-950/20 px-6 py-14 text-center">
          <div className="mx-auto flex size-12 items-center justify-center rounded-2xl border border-blue-800/50 bg-blue-900/30 text-blue-200">
            <Plus size={22} />
          </div>
          <h3 className="mt-4 font-semibold text-white">No projects yet</h3>
          <p className="mx-auto mt-1 max-w-sm text-sm text-blue-100/55">
            Add your first project to start building your portfolio showcase.
          </p>
          <button
            type="button"
            onClick={() => setAddOpen(true)}
            className={`${primaryButtonCls} mt-5`}
          >
            <Plus size={16} />
            Add your first project
          </button>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => {
            const isEditing = editingId === project.id;

            return (
              <article
                key={project.id}
                className="min-w-0 overflow-hidden rounded-2xl border border-blue-800/40 bg-blue-950/25 transition-colors hover:border-blue-700/70"
              >
                {isEditing ? (
                  <form onSubmit={(event) => void handleUpdate(event, project)} className="space-y-4 p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-xs font-medium uppercase tracking-wider text-blue-300/65">
                          Editing project
                        </p>
                        <h3 className="mt-1 font-semibold text-white">{project.name}</h3>
                      </div>
                      <button
                        type="button"
                        onClick={cancelEdit}
                        disabled={saving}
                        aria-label="Cancel editing"
                        className="rounded-lg p-2 text-blue-200/70 transition hover:bg-blue-900/50 hover:text-white disabled:opacity-50"
                      >
                        <X size={17} />
                      </button>
                    </div>
                    <ProjectFields form={editForm} onChange={setEditForm} />
                    <div className="flex flex-wrap justify-end gap-2 border-t border-blue-900/60 pt-4">
                      <button type="button" onClick={cancelEdit} disabled={saving} className={secondaryButtonCls}>
                        Cancel
                      </button>
                      <button type="submit" disabled={saving} className={primaryButtonCls}>
                        {saving ? <LoaderCircle size={16} className="animate-spin" /> : <Save size={16} />}
                        {saving ? "Saving…" : "Save changes"}
                      </button>
                    </div>
                  </form>
                ) : (
                  <>
                    <div className="relative aspect-[16/9] overflow-hidden border-b border-blue-900/50 bg-blue-950/70">
                      {project.image ? (
                        <div
                          role="img"
                          aria-label={`${project.name} preview`}
                          className="size-full bg-cover bg-center"
                          style={{ backgroundImage: `url("${project.image.replace(/"/g, "%22")}")` }}
                        />
                      ) : (
                        <div className="flex size-full items-center justify-center text-sm text-blue-200/45">
                          No image available
                        </div>
                      )}
                      <div className="absolute right-3 top-3 flex gap-1.5">
                        <button
                          type="button"
                          onClick={() => startEdit(project)}
                          aria-label={`Edit ${project.name}`}
                          title="Edit project"
                          className="rounded-lg border border-white/10 bg-slate-950/80 p-2 text-blue-100 shadow-lg backdrop-blur transition hover:bg-blue-700 hover:text-white"
                        >
                          <Pencil size={15} />
                        </button>
                        <button
                          type="button"
                          onClick={() => setProjectToDelete(project)}
                          aria-label={`Delete ${project.name}`}
                          title="Delete project"
                          className="rounded-lg border border-white/10 bg-slate-950/80 p-2 text-red-200 shadow-lg backdrop-blur transition hover:bg-red-700 hover:text-white"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>
                    <div className="flex h-full flex-col p-5">
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="line-clamp-2 font-semibold text-white">{project.name}</h3>
                        {project.link && (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noreferrer"
                            aria-label={`Open ${project.name}`}
                            className="shrink-0 rounded-lg p-1.5 text-blue-300 transition hover:bg-blue-900/50 hover:text-white"
                          >
                            <ExternalLink size={16} />
                          </a>
                        )}
                      </div>
                      <p className="mt-3 line-clamp-4 flex-1 whitespace-pre-wrap text-sm leading-6 text-blue-100/65">
                        {project.description}
                      </p>
                      {project.skills.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-1.5">
                          {project.skills.map((skill) => (
                            <span
                              key={skill}
                              className="rounded-full border border-blue-800/50 bg-blue-900/30 px-2.5 py-1 text-xs text-blue-100/75"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      )}
                      <div className="mt-5 flex items-center justify-between border-t border-blue-900/60 pt-3 text-xs text-blue-200/40">
                        <span>Project #{project.order + 1}</span>
                        <button
                          type="button"
                          onClick={() => startEdit(project)}
                          className="inline-flex items-center gap-1.5 text-blue-300 transition hover:text-white"
                        >
                          <Pencil size={13} />
                          Edit details
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </article>
            );
          })}
        </div>
      )}

      {addOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/80 p-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget && !saving) setAddOpen(false);
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="add-project-title"
            className="my-auto w-full max-w-2xl rounded-2xl border border-blue-800/60 bg-slate-950 p-5 shadow-2xl shadow-black/40 sm:p-7"
          >
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-blue-300/65">
                  Project details
                </p>
                <h2 id="add-project-title" className="mt-1 text-xl font-bold text-white">
                  Add project
                </h2>
                <p className="mt-1 text-sm text-blue-100/55">
                  Add a project to your public portfolio.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setAddOpen(false)}
                disabled={saving}
                aria-label="Close add project dialog"
                className="rounded-lg p-2 text-blue-200/70 transition hover:bg-blue-900/50 hover:text-white disabled:opacity-50"
              >
                <X size={18} />
              </button>
            </div>
            <form onSubmit={(event) => void handleCreate(event)} className="space-y-5">
              <ProjectFields form={addForm} onChange={setAddForm} />
              <div className="flex flex-col-reverse gap-2 border-t border-blue-900/60 pt-5 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => setAddOpen(false)}
                  disabled={saving}
                  className={secondaryButtonCls}
                >
                  Cancel
                </button>
                <button type="submit" disabled={saving} className={primaryButtonCls}>
                  {saving ? <LoaderCircle size={16} className="animate-spin" /> : <Plus size={16} />}
                  {saving ? "Adding project…" : "Add project"}
                </button>
              </div>
            </form>
          </section>
        </div>
      )}

      {projectToDelete && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm">
          <section
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="delete-project-title"
            aria-describedby="delete-project-description"
            className="w-full max-w-md rounded-2xl border border-red-900/50 bg-slate-950 p-6 shadow-2xl shadow-black/40"
          >
            <div className="flex size-11 items-center justify-center rounded-xl border border-red-800/50 bg-red-950/50 text-red-300">
              <Trash2 size={20} />
            </div>
            <h2 id="delete-project-title" className="mt-4 text-lg font-bold text-white">
              Delete this project?
            </h2>
            <p id="delete-project-description" className="mt-2 text-sm leading-6 text-blue-100/65">
              You’re about to delete <span className="font-semibold text-white">{projectToDelete.name}</span>.
              This action cannot be undone.
            </p>
            {error && <p role="alert" className="mt-3 text-sm text-red-300">{error}</p>}
            <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setProjectToDelete(null)}
                disabled={deleting}
                className={secondaryButtonCls}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => void handleDelete()}
                disabled={deleting}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {deleting ? <LoaderCircle size={16} className="animate-spin" /> : <Trash2 size={16} />}
                {deleting ? "Deleting…" : "Delete project"}
              </button>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
