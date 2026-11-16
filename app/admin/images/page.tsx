"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ImagePlus, RefreshCw, Trash2, Upload } from "lucide-react";
import {
  deleteImage,
  getImageUrl,
  getImages,
  replaceImage,
  uploadImage,
  type ApiImageAsset,
} from "@/app/lib/api";

const MAX_IMAGES = 10;
const MAX_FILE_BYTES = 8 * 1024 * 1024;

export default function ImagesAdmin() {
  const [images, setImages] = useState<ApiImageAsset[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const uploadRef = useRef<HTMLInputElement>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setImages(await getImages());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load the image library.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { void refresh(); }, [refresh]);

  const validateFile = (file: File) => {
    if (file.size > MAX_FILE_BYTES) throw new Error("Images must be 8 MB or smaller.");
    if (!["image/jpeg", "image/png", "image/webp", "image/gif"].includes(file.type)) {
      throw new Error("Choose a JPEG, PNG, WebP, or GIF image.");
    }
  };

  const handleUpload = async (file?: File) => {
    if (!file) return;
    setError(null);
    setNotice(null);
    try {
      validateFile(file);
      setUploading(true);
      const created = await uploadImage(file);
      setImages((current) => [...current, created].sort((a, b) => a.slot - b.slot));
      setNotice("Image added to your library.");
      if (uploadRef.current) uploadRef.current.value = "";
    } catch (err) {
      setError(err instanceof Error ? err.message : "Image upload failed.");
    } finally {
      setUploading(false);
    }
  };

  const handleReplace = async (asset: ApiImageAsset, file?: File) => {
    if (!file) return;
    setError(null);
    setNotice(null);
    try {
      validateFile(file);
      setUploading(true);
      const updated = await replaceImage(asset.id, file);
      setImages((current) => current.map((item) => item.id === asset.id ? updated : item));
      setNotice(`Image slot ${asset.slot} updated. Existing assignments are preserved.`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Image replacement failed.");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (asset: ApiImageAsset) => {
    if (!window.confirm(`Delete image slot ${asset.slot}? Any Bio section using it will return to its default image.`)) return;
    setError(null);
    setNotice(null);
    try {
      await deleteImage(asset.id);
      setImages((current) => current.filter((item) => item.id !== asset.id));
      setNotice(`Image slot ${asset.slot} deleted.`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not delete image.");
    }
  };

  return (
    <div className="mx-auto w-full max-w-6xl space-y-7">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">Portfolio media</p>
          <h2 className="mt-1 text-2xl font-bold text-white">Image library</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-blue-200/60">
            Keep up to ten images in one place. Replace an image to update every section assigned to it.
          </p>
        </div>
        <div className="text-sm font-medium tabular-nums text-blue-100/75">{images.length} / {MAX_IMAGES} images used</div>
      </header>

      {error && <p role="alert" className="rounded-xl border border-rose-500/30 bg-rose-950/30 px-4 py-3 text-sm text-rose-200">{error}</p>}
      {notice && <p role="status" className="rounded-xl border border-emerald-500/25 bg-emerald-950/20 px-4 py-3 text-sm text-emerald-200">{notice}</p>}

      <section className="rounded-2xl border border-blue-800/50 bg-blue-950/25 p-5 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-blue-700/50 bg-blue-900/40 text-blue-200"><ImagePlus size={20} /></span>
            <div>
              <h3 className="font-semibold text-white">Add an image</h3>
              <p className="mt-1 text-xs leading-5 text-blue-200/55">JPEG, PNG, WebP, or GIF · 8 MB maximum · stored privately and served through your API</p>
            </div>
          </div>
          <div>
            <input
              ref={uploadRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              disabled={uploading || images.length >= MAX_IMAGES}
              onChange={(event) => void handleUpload(event.target.files?.[0])}
              className="block w-full max-w-sm text-xs text-blue-100/70 file:mr-3 file:rounded-lg file:border-0 file:bg-blue-700 file:px-4 file:py-2.5 file:text-sm file:font-semibold file:text-white hover:file:bg-blue-600 disabled:opacity-50"
            />
            {uploading && <p className="mt-2 text-xs text-blue-200/60">Uploading image…</p>}
          </div>
        </div>
        {images.length >= MAX_IMAGES && <p className="mt-4 text-xs text-amber-200/80">Your library is full. Delete an image before adding another.</p>}
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-white">Stored images</h3>
          <button type="button" onClick={() => void refresh()} disabled={loading} className="inline-flex items-center gap-2 rounded-lg border border-blue-700/50 px-3 py-2 text-xs font-medium text-blue-100 hover:bg-blue-900/40 disabled:opacity-50">
            <RefreshCw size={14} className={loading ? "animate-spin" : ""} /> Refresh
          </button>
        </div>
        {loading ? <p className="text-sm text-blue-200/60">Loading image library…</p> : images.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-blue-700/50 p-10 text-center text-sm text-blue-200/55">No images uploaded yet. Add your first image above.</div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {images.map((asset) => (
              <article key={asset.id} className="overflow-hidden rounded-2xl border border-blue-800/50 bg-slate-950/50">
                <div className="relative aspect-[16/10] bg-blue-950">
                  <Image src={getImageUrl(asset.url)} alt={asset.original_filename} fill unoptimized sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw" className="object-cover" />
                  <span className="absolute left-3 top-3 rounded-lg border border-white/15 bg-slate-950/80 px-2.5 py-1 text-xs font-semibold text-white">Slot {asset.slot}</span>
                </div>
                <div className="space-y-3 p-4">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-blue-50" title={asset.original_filename}>{asset.original_filename}</p>
                    <p className="mt-1 text-xs text-blue-200/50">{asset.width} × {asset.height} · {(asset.size_bytes / 1024).toFixed(0)} KB</p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-blue-700/50 px-3 py-2 text-xs font-medium text-blue-100 hover:bg-blue-900/50">
                      <Upload size={13} /> Replace
                      <input type="file" accept="image/jpeg,image/png,image/webp,image/gif" disabled={uploading} onChange={(event) => void handleReplace(asset, event.target.files?.[0])} className="sr-only" />
                    </label>
                    <button type="button" onClick={() => void handleDelete(asset)} disabled={uploading} className="inline-flex items-center gap-2 rounded-lg border border-rose-700/40 px-3 py-2 text-xs font-medium text-rose-200 hover:bg-rose-950/50 disabled:opacity-50">
                      <Trash2 size={13} /> Delete
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
