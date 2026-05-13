import { getPossibleTags } from "@/lib/data";
import { sendToServer } from "@/lib/actions";

export default async function AddPhoto() {
  const possibleTags = await getPossibleTags(); // Lint says await is unnecesary as of before implementing the full getPossibleTags function, but it will be necessary once that function is implemented. So I left it in.
  
  async function submitNewPhoto(formData:FormData) {
    'use server'

    const rawFormData = {
      newPhoto: formData.get('newPhoto'),
      title: formData.get('title'),
      description: formData.get('description'),
      photographer: formData.get('photographer'),
      tags: formData.getAll('tags'),
    }

    // Send multipart form data so the file and fields arrive in the expected format.
    // Of type multipart/form-data with file, title, tags, description, and ext fields.
    const payload = new FormData();

    if (rawFormData.newPhoto instanceof File && rawFormData.newPhoto.size > 0) {
      payload.append('file', rawFormData.newPhoto);
    }

    if (typeof rawFormData.title === 'string') {
      payload.append('title', rawFormData.title.trim());
    }

    if (typeof rawFormData.description === 'string') {
      const description = rawFormData.description
        .trim()
        .replace(/^b(["'])(.*)\1$/, '$2');
      payload.append('description', description);
    }

    // if (typeof rawFormData.photographer === 'string') {
    //   payload.append('photographer', rawFormData.photographer.trim());
    // } Waiting for go ahead on whether to include photographer field or not.

    if (rawFormData.newPhoto instanceof File && rawFormData.newPhoto.name.includes('.')) {
      const ext = rawFormData.newPhoto.name.split('.').pop()?.trim();
      if (ext) {
        payload.append('ext', ext);
      }
    }

    const tagsCsv = rawFormData.tags
      .map((tag) => tag.toString().trim())
      .filter(Boolean)
      .join(',');

    if (tagsCsv.length > 0) {
      payload.append('tags', tagsCsv);
    }

    await sendToServer(payload);
  }

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans">
      <main className="min-w-2xl flex-col items-center justify-between py-32 px-16 bg-white sm:items-start">
        <form action={submitNewPhoto} className="w-full max-w-xl space-y-6 rounded-2xl border border-zinc-200 bg-zinc-50 p-8 shadow-sm">
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
            <label htmlFor="photographer" className="block text-sm font-medium text-zinc-700">
              Photographer
            </label>
            <input
              type="text"
              id="photographer"
              name="photographer"
              placeholder="Photographer Name"
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
            className="inline-flex items-center justify-center rounded-lg bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-green-600 hover:scale-105 hover:rounded-2xl transition-all duration-300 hover:ring-green-600 hover:ring-4 active:ring-16 active:ring-green-600/30"
          >
            Submit New Photo
          </button>
        </form>
      </main>
    </div>
  );
}