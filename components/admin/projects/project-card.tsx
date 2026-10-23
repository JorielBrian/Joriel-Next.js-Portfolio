"use client";

import type { FormEvent } from "react";
import { ExternalLink, LoaderCircle, Pencil, Save, Trash2, X } from "lucide-react";
import type { ApiProject } from "@/app/lib/api";
import {
  ProjectFormFields,
  projectPrimaryButtonClass,
  projectSecondaryButtonClass,
  type ProjectForm,
} from "./project-form-fields";

type ProjectCardProps = {
  project: ApiProject;
  isEditing: boolean;
  form: ProjectForm;
  saving: boolean;
  onFormChange: (next: ProjectForm) => void;
  onStartEdit: (project: ApiProject) => void;
  onCancelEdit: () => void;
  onUpdate: (event: FormEvent<HTMLFormElement>, project: ApiProject) => void;
  onDeleteRequest: (project: ApiProject) => void;
};

export const ProjectCard = ({
  project,
  isEditing,
  form,
  saving,
  onFormChange,
  onStartEdit,
  onCancelEdit,
  onUpdate,
  onDeleteRequest,
}: ProjectCardProps) => (
  <article className="min-w-0 overflow-hidden rounded-2xl border border-blue-800/40 bg-blue-950/25 transition-colors hover:border-blue-700/70">
    {isEditing ? (
      <form onSubmit={(event) => onUpdate(event, project)} className="space-y-4 p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-blue-300/65">Editing project</p>
            <h3 className="mt-1 font-semibold text-white">{project.name}</h3>
          </div>
          <button
            type="button"
            onClick={onCancelEdit}
            disabled={saving}
            aria-label="Cancel editing"
            className="rounded-lg p-2 text-blue-200/70 transition hover:bg-blue-900/50 hover:text-white disabled:opacity-50"
          >
            <X size={17} />
          </button>
        </div>
        <ProjectFormFields form={form} onChange={onFormChange} />
        <div className="flex flex-wrap justify-end gap-2 border-t border-blue-900/60 pt-4">
          <button type="button" onClick={onCancelEdit} disabled={saving} className={projectSecondaryButtonClass}>
            Cancel
          </button>
          <button type="submit" disabled={saving} className={projectPrimaryButtonClass}>
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
              onClick={() => onStartEdit(project)}
              aria-label={`Edit ${project.name}`}
              title="Edit project"
              className="rounded-lg border border-white/10 bg-slate-950/80 p-2 text-blue-100 shadow-lg backdrop-blur transition hover:bg-blue-700 hover:text-white"
            >
              <Pencil size={15} />
            </button>
            <button
              type="button"
              onClick={() => onDeleteRequest(project)}
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
              onClick={() => onStartEdit(project)}
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
