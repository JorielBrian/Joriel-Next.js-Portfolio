'use client';

import { useEffect, useRef, useState } from "react";
import { Check, FileDown, Save, Upload } from "lucide-react";
import {
  ApiContentBlock,
  ApiResume,
  getAllContent,
  getResume,
  getResumeDownloadUrl,
  updateContentBlock,
  uploadResume,
} from "@/app/lib/api";

const KEYS = ["TITLES", "INTRODUCTION", "ABOUT", "STORY", "GOALS", "OUTSIDE_WORK"];
const LABELS: Record<string, string> = {
  TITLES: "Titles",
  INTRODUCTION: "Introduction",
  ABOUT: "About",
  STORY: "Story",
  GOALS: "Goals",
  OUTSIDE_WORK: "Outside work",
};

// TITLES holds short rotating phrases (the Hero typewriter effect), not
// paragraphs — so it splits on every line instead of on blank-line gaps
// like the rest of the content blocks do.
const LINE_SPLIT_KEYS = new Set(["TITLES"]);
const MAX_CV_SIZE_BYTES = 10 * 1024 * 1024;

export default function ContentAdmin() {
  const [blocks, setBlocks] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [savedKey, setSavedKey] = useState<string | null>(null);

  const [resume, setResume] = useState<ApiResume | null>(null);
  const [resumeLoading, setResumeLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadingResume, setUploadingResume] = useState(false);
  const [resumeError, setResumeError] = useState<string | null>(null);
  const [resumeSuccess, setResumeSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    getAllContent()
      .then((data: ApiContentBlock[]) => {
        const map: Record<string, string> = {};
        for (const key of KEYS) {
          const found = data.find((b) => b.key === key);
          const joiner = LINE_SPLIT_KEYS.has(key) ? "\n" : "\n\n";
          map[key] = found ? found.paragraphs.join(joiner) : "";
        }
        setBlocks(map);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));

    getResume()
      .then(setResume)
      .catch((e: unknown) => {
        setResumeError(e instanceof Error ? e.message : "Could not load CV details");
      })
      .finally(() => setResumeLoading(false));
  }, []);

  const handleSave = async (key: string) => {
    setSaving(key);
    setError(null);
    setSavedKey(null);
    const paragraphs = LINE_SPLIT_KEYS.has(key)
      ? blocks[key].split("\n").map((p) => p.trim()).filter(Boolean)
      : blocks[key].split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
    try {
      await updateContentBlock(key, paragraphs);
      setSavedKey(key);
      setTimeout(() => setSavedKey(null), 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(null);
    }
  };

  const handleResumeUpload = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedFile) {
      setResumeError("Choose a PDF file first.");
      return;
    }
    if (selectedFile.type !== "application/pdf") {
      setResumeError("Only PDF files are accepted.");
      return;
    }
    if (selectedFile.size > MAX_CV_SIZE_BYTES) {
      setResumeError("The file must be 10 MB or smaller.");
      return;
    }

    setUploadingResume(true);
    setResumeError(null);
    setResumeSuccess(false);
    try {
      const updatedResume = await uploadResume(selectedFile);
      setResume(updatedResume);
      setSelectedFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      setResumeSuccess(true);
    } catch (err) {
      setResumeError(err instanceof Error ? err.message : "CV upload failed");
    } finally {
      setUploadingResume(false);
    }
  };

  if (loading) return <p className="text-blue-300/60 text-sm">Loading...</p>;

  return (
    <div className="max-w-3xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Bio content</h1>
      </div>

      {error && <p className="rounded-xl border border-red-800/40 bg-red-950/30 px-4 py-2 text-sm text-red-300">{error}</p>}

      <div className="space-y-5">
        {KEYS.map((key) => (
          <div key={key} className="card mt-0 space-y-3">
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-wide text-blue-200/90">{LABELS[key]}</h2>
              <p className="mt-0.5 text-xs text-blue-300/50">
                {LINE_SPLIT_KEYS.has(key)
                  ? "One title per line — these rotate in the hero's typewriter effect."
                  : "Separate paragraphs with a blank line."}
              </p>
            </div>
            <textarea
              value={blocks[key] || ""}
              onChange={(e) => setBlocks({ ...blocks, [key]: e.target.value })}
              className="min-h-32 w-full resize-y rounded-xl border border-blue-700/50 bg-blue-950/40 px-3 py-2.5 text-sm outline-none transition placeholder:text-blue-300/40 focus:border-blue-400/70 focus:ring-2 focus:ring-blue-500/20"
            />
            <div className="flex items-center gap-3">
              <button
                onClick={() => handleSave(key)}
                disabled={saving === key}
                className="flex items-center gap-2 rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-blue-500 disabled:opacity-50"
              >
                <Save size={14} />
                {saving === key ? "Saving..." : "Save"}
              </button>
              {savedKey === key && (
                <span className="flex items-center gap-1 text-sm text-green-400">
                  <Check size={14} /> Saved
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Keep CV management directly below the Outside work content block. */}
      <section className="card mt-0 space-y-4">
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-blue-200/90">Upload CV</h2>
          <p className="mt-1 text-xs text-blue-300/60">
            Upload a PDF up to 10 MB. A successful upload replaces the current CV.
          </p>
        </div>

        {resumeLoading ? (
          <p className="text-sm text-blue-300/60">Checking current CV...</p>
        ) : resume ? (
          <div className="flex flex-col gap-3 rounded-xl border border-blue-700/40 bg-blue-950/30 p-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <p className="text-sm font-medium text-blue-100">Current CV</p>
              <p className="break-all text-xs text-blue-300/60">{resume.original_filename}</p>
              <p className="mt-1 text-xs text-blue-300/40">
                Uploaded {new Date(resume.uploaded_at).toLocaleString()}
              </p>
            </div>
            <a
              href={getResumeDownloadUrl()}
              target="_blank"
              rel="noreferrer"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full border border-blue-600/50 px-4 py-2 text-sm text-blue-100 transition hover:border-blue-400 hover:bg-blue-900/40"
            >
              <FileDown size={14} /> Download current CV
            </a>
          </div>
        ) : (
          <p className="text-sm text-blue-300/60">No CV has been uploaded yet.</p>
        )}

        <form onSubmit={handleResumeUpload} className="space-y-3">
          <input
            ref={fileInputRef}
            type="file"
            accept="application/pdf,.pdf"
            onChange={(event) => {
              setSelectedFile(event.target.files?.[0] ?? null);
              setResumeError(null);
              setResumeSuccess(false);
            }}
            className="block w-full text-sm text-blue-200/80 file:mr-4 file:rounded-full file:border-0 file:bg-blue-800 file:px-4 file:py-2 file:font-semibold file:text-white hover:file:bg-blue-700"
          />
          {selectedFile && (
            <p className="text-xs text-blue-300/60">
              Selected: {selectedFile.name} ({(selectedFile.size / (1024 * 1024)).toFixed(2)} MB)
            </p>
          )}

          {resumeError && (
            <p className="rounded-xl border border-red-800/40 bg-red-950/30 px-4 py-2 text-sm text-red-300">
              {resumeError}
            </p>
          )}
          {resumeSuccess && (
            <p className="flex items-center gap-2 text-sm text-green-400">
              <Check size={14} /> CV uploaded and replaced successfully.
            </p>
          )}

          <button
            type="submit"
            disabled={uploadingResume || !selectedFile}
            className="flex items-center gap-2 rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Upload size={14} />
            {uploadingResume ? "Uploading..." : resume ? "Replace CV" : "Upload CV"}
          </button>
        </form>
      </section>
    </div>
  );
}
