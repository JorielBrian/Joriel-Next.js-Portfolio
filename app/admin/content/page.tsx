'use client';
import { useEffect, useState } from "react";
import { getAllContent, updateContentBlock, ApiContentBlock } from "@/app/lib/api";

const KEYS = ["INTRODUCTION", "ABOUT", "STORY", "GOALS", "OUTSIDE_WORK"];

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

  if (loading) return <p className="opacity-70">Loading...</p>;

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Bio content</h1>
      <p className="text-sm opacity-60">Separate paragraphs with a blank line.</p>

      {error && <p className="text-sm text-red-400">{error}</p>}

      {KEYS.map((key) => (
        <div key={key} className="space-y-2 border border-white/10 rounded-2xl p-5 max-w-2xl">
          <h2 className="font-semibold">{key}</h2>
          <textarea
            value={blocks[key] || ""}
            onChange={(e) => setBlocks({ ...blocks, [key]: e.target.value })}
            className="w-full rounded-lg border border-white/20 bg-transparent px-3 py-2 text-sm min-h-32"
          />
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleSave(key)}
              disabled={saving === key}
              className="rounded-lg bg-white text-black font-semibold px-4 py-2 text-sm disabled:opacity-50"
            >
              {saving === key ? "Saving..." : "Save"}
            </button>
            {savedKey === key && <span className="text-sm text-green-400">Saved</span>}
          </div>
        </div>
      ))}
    </div>
  );
}
