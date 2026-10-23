"use client";

import type { FormEvent } from "react";
import { LoaderCircle, Plus, X } from "lucide-react";
import {
  ProjectFormFields,
  projectPrimaryButtonClass,
  projectSecondaryButtonClass,
  type ProjectForm,
} from "./project-form-fields";

type AddProjectModalProps = {
  open: boolean;
  form: ProjectForm;
  saving: boolean;
  onFormChange: (next: ProjectForm) => void;
  onClose: () => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export const AddProjectModal = ({
  open,
  form,
  saving,
  onFormChange,
  onClose,
  onSubmit,
}: AddProjectModalProps) => {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/80 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !saving) onClose();
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
            <p className="text-xs font-medium uppercase tracking-wider text-blue-300/65">Project details</p>
            <h2 id="add-project-title" className="mt-1 text-xl font-bold text-white">Add project</h2>
            <p className="mt-1 text-sm text-blue-100/55">Add a project to your public portfolio.</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={saving}
            aria-label="Close add project dialog"
            className="rounded-lg p-2 text-blue-200/70 transition hover:bg-blue-900/50 hover:text-white disabled:opacity-50"
          >
            <X size={18} />
          </button>
        </div>
        <form onSubmit={onSubmit} className="space-y-5">
          <ProjectFormFields form={form} onChange={onFormChange} />
          <div className="flex flex-col-reverse gap-2 border-t border-blue-900/60 pt-5 sm:flex-row sm:justify-end">
            <button type="button" onClick={onClose} disabled={saving} className={projectSecondaryButtonClass}>
              Cancel
            </button>
            <button type="submit" disabled={saving} className={projectPrimaryButtonClass}>
              {saving ? <LoaderCircle size={16} className="animate-spin" /> : <Plus size={16} />}
              {saving ? "Adding project…" : "Add project"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};
