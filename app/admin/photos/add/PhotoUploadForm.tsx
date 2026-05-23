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

    const yearCreated = formData.get("yearCreated");
    if (typeof yearCreated === "string") {
      const normalizedYear = yearCreated.trim();
      if (normalizedYear.length > 0) {
        payload.append("taken", normalizedYear);
      }
      if (normalizedYear.length === 0) {
        payload.append("taken", ""); // Ensure the field is sent even if empty
      }
    }

    const ext = newPhoto.name.split(".").pop()?.trim();
    if (ext) {
      payload.append("ext", ext);
    }

    const tagsCsv = formData
      .getAll("tags")
      .map((tag) => tag.toString().trim())
      .filter(Boolean)
      .join(",");

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
            <label htmlFor="yearCreated" className="block text-sm font-medium text-zinc-700">
              Year Created (optional)
            </label>
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]{4}"
              id="yearCreated"
              name="yearCreated"
              placeholder="YYYY"
              className="block w-full rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900/20"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="tags" className="block text-sm font-medium text-zinc-700">
              Tags
            </label>
            <div className="flex flex-wrap gap-2">
              {possibleTags.map((tag) => (
                <label key={tag} className="cursor-pointer">
                  <input type="checkbox" name="tags" value={tag} className="peer sr-only" />
                  <span className="inline-flex items-center rounded-full border border-zinc-300 bg-white px-3 py-1.5 text-sm text-zinc-700 transition-colors hover:border-zinc-900 peer-checked:border-zinc-900 peer-checked:bg-zinc-900 peer-checked:text-white">
                    {tag}
                  </span>
                </label>
              ))}
            </div>
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