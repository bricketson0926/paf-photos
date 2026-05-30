"use client";

import { SubmitEvent, useState } from "react";

type PhotoUploadFormProps = {
  possibleTags: string[];
  apiUrl: string;
};

export default function PhotoUploadForm({ possibleTags, apiUrl }: PhotoUploadFormProps) {
  const [status, setStatus] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isSuccessStatus = status.toLowerCase().includes("success");

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("");
    const form = event.currentTarget;

    const formData = new FormData(form);
    const newPhoto = formData.get("newPhoto");

    if (!(newPhoto instanceof File) || newPhoto.size === 0) {
      setStatus("Choose an image before submitting.");
      return;
    }

    if (!apiUrl) {
      setStatus("API URL is not configured.");
      return;
    }

    const payload = new FormData();
    payload.append("file", newPhoto);

    const title = formData.get("title");
    if (typeof title === "string") {
      payload.append("title", title.trim());
    }

    const description = formData.get("description");
    if (typeof description === "string") {
      payload.append("description", description.trim().replace(/^b(["'])(.*)\1$/, "$2"));
    }

    const yearTaken = formData.get("yearTaken");
    if (typeof yearTaken === "string") {
      const normalizedYearTaken = yearTaken.trim();
      if (normalizedYearTaken.length > 0) {
        payload.append("yearTaken", normalizedYearTaken);
      }
      if (normalizedYearTaken.length === 0) {
        payload.append("yearTaken", ""); // Ensure the field is sent even if empty
      }
    }

    const ext = newPhoto.name.split(".").pop()?.trim();
    if (ext) {
      payload.append("ext", ext);
    }

    // Gather tags from checked checkboxes and the new-tags text input.
    // The new-tags input may contain comma-separated values, so split those and normalize all tags, removing empties and duplicates.
    const rawTags = formData.getAll("tags");
    const splitTags = rawTags.flatMap((t) => {
      const s = typeof t === "string" ? t : "";
      return s.split(",").map((x) => x.trim()).filter((x) => x.length > 0);
    });
    const uniqueTags = Array.from(new Set(splitTags));
    const tagsCsv = uniqueTags.join(",");

    if (tagsCsv.length > 0) {
      payload.append("tags", tagsCsv);
    }
    if (tagsCsv.length === 0) {
      payload.append("tags", ""); // Ensure the field is sent even if empty
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(new URL("addPhoto", apiUrl).toString(), {
        method: "POST",
        body: payload,
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Upload failed: ${response.status} ${response.statusText}${text ? ` - ${text.slice(0, 200)}` : ""}`);
      }

      form.reset();
      setStatus("Photo uploaded successfully.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Upload failed.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans">
      <main className="min-w-2xl flex-col items-center justify-between py-32 px-16 bg-white sm:items-start">
        <form onSubmit={handleSubmit} className="w-full max-w-xl space-y-6 rounded-2xl border border-zinc-200 bg-zinc-50 p-8 shadow-sm">
          <div className="space-y-2">
            <label htmlFor="uploadedImage" className="block text-sm font-medium text-zinc-700">
              Upload Image
            </label>
            <input
              type="file"
              id="uploadedImage"
              name="newPhoto"
              accept="image/*"
              className="block w-full rounded-lg border border-zinc-300 bg-white text-sm text-zinc-700 file:mr-4 file:rounded-md file:border-0 file:bg-zinc-900 file:px-4 file:py-2 file:text-sm file:font-medium file:text-white hover:border-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900/20"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="photoTitle" className="block text-sm font-medium text-zinc-700">
              Photo Title
            </label>
            <input
              type="text"
              id="photoTitle"
              name="title"
              placeholder="Photo Title"
              className="block w-full rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900/20"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="photoDescription" className="block text-sm font-medium text-zinc-700">
              Photo Description
            </label>
            <input
              type="text"
              id="photoDescription"
              name="description"
              placeholder="Photo Description"
              className="block w-full rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900/20"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="yearTaken" className="block text-sm font-medium text-zinc-700">
              Year Taken (optional)
            </label>
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]{4}"
              id="yearTaken"
              name="yearTaken"
              placeholder="YYYY"
              className="block w-full rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900/20"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-zinc-700">
              Tags (preexisting)
            </label>
            <p className="text-xs text-zinc-500">Select one or more tags.</p>
            {possibleTags.length > 0 ? (
              <div className="max-h-48 overflow-y-auto rounded-lg border border-zinc-300 bg-white p-3">
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {possibleTags.map((tag) => (
                    <label key={tag} className="inline-flex items-center gap-2 text-sm text-zinc-900">
                      <input
                        type="checkbox"
                        name="tags"
                        value={tag}
                        className="h-4 w-4 rounded border-zinc-300 text-zinc-900 focus:ring-zinc-900/20"
                      />
                      <span>{tag}</span>
                    </label>
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-sm text-zinc-500">No preexisting tags available.</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="newTags" className="block text-sm font-medium text-zinc-700">
              New Tags (comma separated)
            </label>
            <input
              type="text"
              id="newTags"
              name="tags"
              placeholder="e.g. beach, sunset, family"
              className="block w-full rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900/20"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center justify-center rounded-lg bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-green-600 hover:scale-105 hover:rounded-2xl transition-all duration-300 hover:ring-green-600 hover:ring-4 active:ring-16 active:ring-green-600/30 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? "Submitting..." : "Submit New Photo"}
          </button>

          {status ? <p className={`text-sm ${isSuccessStatus ? "text-green-700" : "text-red-700"}`}>{status}</p> : null}
        </form>
      </main>
    </div>
  );
}