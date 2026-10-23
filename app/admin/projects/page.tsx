'use client';
import { useCallback, useEffect, useState, type FormEvent } from "react";
import { LoaderCircle, Plus, X } from "lucide-react";
import { createProject, deleteProject, getProjects, updateProject, type ApiProject } from "@/app/lib/api";
import { ProjectCard } from "@/components/admin/projects/project-card";
import { ProjectFormModal } from "@/components/admin/projects/project-form-modal";
import { DeleteProjectDialog } from "@/components/admin/projects/delete-project-dialog";
import { EMPTY_PROJECT_FORM, projectPrimaryButtonClass, toProjectForm, toProjectPayload, type ProjectForm } from "@/components/admin/projects/project-form-fields";

const ProjectsAdmin = () => {
  const [projects, setProjects] = useState<ApiProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [projectToEdit, setProjectToEdit] = useState<ApiProject | null>(null);
  const [editForm, setEditForm] = useState<ProjectForm>(EMPTY_PROJECT_FORM);
  const [addOpen, setAddOpen] = useState(false);
  const [addForm, setAddForm] = useState<ProjectForm>(EMPTY_PROJECT_FORM);
  const [projectToDelete, setProjectToDelete] = useState<ApiProject | null>(null);

  const loadProjects = useCallback(async () => {
    setLoading(true);
    try { setProjects(await getProjects()); setError(null); }
    catch (err) { setError(err instanceof Error ? err.message : "Could not load projects."); }
    finally { setLoading(false); }
  }, []);
  useEffect(() => { void loadProjects(); }, [loadProjects]);

  const openAddModal = () => { setError(null); setAddForm(EMPTY_PROJECT_FORM); setAddOpen(true); };
  const openEditModal = (project: ApiProject) => { setError(null); setProjectToEdit(project); setEditForm(toProjectForm(project)); };

  const handleCreate = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); setSaving(true); setError(null);
    try { await createProject(toProjectPayload(addForm, projects.length)); setAddOpen(false); setAddForm(EMPTY_PROJECT_FORM); await loadProjects(); }
    catch (err) { setError(err instanceof Error ? err.message : "Could not create the project."); }
    finally { setSaving(false); }
  };
  const handleUpdate = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); if (!projectToEdit) return; setSaving(true); setError(null);
    try { await updateProject(projectToEdit.id, toProjectPayload(editForm, projectToEdit.order)); setProjectToEdit(null); setEditForm(EMPTY_PROJECT_FORM); await loadProjects(); }
    catch (err) { setError(err instanceof Error ? err.message : "Could not update the project."); }
    finally { setSaving(false); }
  };
  const handleDelete = async () => {
    if (!projectToDelete) return; setDeleting(true); setError(null);
    try { await deleteProject(projectToDelete.id); setProjectToDelete(null); await loadProjects(); }
    catch (err) { setError(err instanceof Error ? err.message : "Could not delete the project."); }
    finally { setDeleting(false); }
  };
  const closeEditModal = () => { if (saving) return; setProjectToEdit(null); setEditForm(EMPTY_PROJECT_FORM); setError(null); };
  const cancelDelete = () => { setProjectToDelete(null); setError(null); };

  return <div className="mx-auto w-full max-w-6xl space-y-7">
    <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div><p className="text-sm font-medium text-blue-300/70">Portfolio management</p><h1 className="mt-1 text-2xl font-bold text-white sm:text-3xl">Projects</h1><p className="mt-2 text-sm text-blue-100/55">Manage the projects displayed on your public portfolio.</p></div>
      <button type="button" onClick={openAddModal} className={projectPrimaryButtonClass}><Plus size={17} /> Add project</button>
    </header>
    {error && !projectToDelete && !projectToEdit && !addOpen && <div role="alert" className="flex items-start justify-between gap-3 rounded-xl border border-red-800/50 bg-red-950/30 px-4 py-3 text-sm text-red-200"><p>{error}</p><button type="button" onClick={() => setError(null)} aria-label="Dismiss error" className="rounded-md p-0.5 text-red-200/70 hover:text-white"><X size={16} /></button></div>}
    <div className="flex items-center justify-between border-b border-blue-900/60 pb-3"><h2 className="font-semibold text-white">All projects</h2><span className="rounded-full border border-blue-800/50 bg-blue-950/50 px-3 py-1 text-xs text-blue-200/70">{projects.length} {projects.length === 1 ? "project" : "projects"}</span></div>
    {loading ? <div className="flex items-center justify-center gap-2 py-16 text-sm text-blue-200/60"><LoaderCircle size={18} className="animate-spin" /> Loading projects…</div>
      : projects.length === 0 ? <div className="rounded-2xl border border-dashed border-blue-800/60 bg-blue-950/20 px-6 py-14 text-center"><div className="mx-auto flex size-12 items-center justify-center rounded-2xl border border-blue-800/50 bg-blue-900/30 text-blue-200"><Plus size={22} /></div><h3 className="mt-4 font-semibold text-white">No projects yet</h3><p className="mx-auto mt-1 max-w-sm text-sm text-blue-100/55">Add your first project to start building your portfolio showcase.</p><button type="button" onClick={openAddModal} className={`${projectPrimaryButtonClass} mt-5`}><Plus size={16} /> Add your first project</button></div>
      : <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">{projects.map((project) => <ProjectCard key={project.id} project={project} onEdit={openEditModal} onDelete={setProjectToDelete} />)}</div>}
    <ProjectFormModal open={addOpen} mode="add" form={addForm} saving={saving} error={addOpen ? error : null} onFormChange={setAddForm} onClose={() => { if (!saving) { setAddOpen(false); setError(null); } }} onSubmit={handleCreate} />
    <ProjectFormModal open={Boolean(projectToEdit)} mode="edit" form={editForm} saving={saving} error={projectToEdit ? error : null} onFormChange={setEditForm} onClose={closeEditModal} onSubmit={handleUpdate} />
    <DeleteProjectDialog project={projectToDelete} deleting={deleting} error={projectToDelete ? error : null} onCancel={cancelDelete} onConfirm={handleDelete} />
  </div>;
};
export default ProjectsAdmin;
