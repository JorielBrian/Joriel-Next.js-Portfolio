'use client';
import { useEffect, useState } from "react";
import { Save, Check } from "lucide-react";
import { getAllContent, updateContentBlock, ApiContentBlock } from "@/app/lib/api";

const KEYS = ["INTRODUCTION", "ABOUT", "STORY", "GOALS", "OUTSIDE_WORK"];
const LABELS: Record<string, string> = {
  INTRODUCTION: "Introduction",
  ABOUT: "About",
  STORY: "Story",
  GOALS: "Goals",
  OUTSIDE_WORK: "Outside work",
};

export default function ContentAdmin() {
  const [blocks, setBlocks] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [savedKey, setSavedKey] = useState<string | null>(null);

  useEffect(() => {
    getAllContent()
      .then((data: ApiContentBlock[]) => {
        const map: Record<string, string> = {};
        for (const key of KEYS) {
          const found = data.find((b) => b.key === key);
          map[key] = found ? found.paragraphs.join("\n\n") : "";
        }
        setBlocks(map);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async (key: string) => {
    setSaving(key);
    setError(null);
    setSavedKey(null);
    const paragraphs = blocks[key].split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
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

  if (loading) return <p className="text-blue-300/60 text-sm">Loading...</p>;

  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold">Bio content</h1>
        <p className="text-sm text-blue-300/60 mt-1">Separate paragraphs with a blank line.</p>
      </div>

      {error && <p className="text-sm text-red-300 bg-red-950/30 border border-red-800/40 rounded-xl px-4 py-2">{error}</p>}

      <div className="space-y-5">
        {KEYS.map((key) => (
          <div key={key} className="card mt-0 space-y-3">
            <h2 className="font-semibold text-sm uppercase tracking-wide text-blue-200/90">{LABELS[key]}</h2>
            <textarea
              value={blocks[key] || ""}
              onChange={(e) => setBlocks({ ...blocks, [key]: e.target.value })}
              className="w-full rounded-xl border border-blue-700/50 bg-blue-950/40 px-3 py-2.5 text-sm placeholder:text-blue-300/40 outline-none focus:border-blue-400/70 focus:ring-2 focus:ring-blue-500/20 transition min-h-32 resize-y"
            />
            <div className="flex items-center gap-3">
              <button
                onClick={() => handleSave(key)}
                disabled={saving === key}
                className="flex items-center gap-2 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-semibold px-5 py-2 text-sm transition disabled:opacity-50"
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
    </div>
  );
}
