import { auth } from "@/auth";

export default function Admin() {
  async function submitNewPhoto(formData:FormData) {
    'use server'
    const session = await auth()
    if (!session?.user) {
      throw new Error('Unauthorized')
    }
 
    const rawFormData = {
      newPhoto: formData.get('newPhoto'),
      description: formData.get('description'),
      photographer: formData.get('photographer'),
      dateTaken: formData.get('dateTaken'),
      tags: formData.get('tags'),
    }

    // mutate/parse/clean/generate data if needed
    const processedData = {
      ...rawFormData,
      tagsList: rawFormData.tags?.toString().split(',').map(tag => tag.trim()) || [],
    }

    // send the data to the server or database
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
            <label htmlFor="dateTaken" className="block text-sm font-medium text-zinc-700">
              Date Taken
            </label>
            <input
              type="date"
              id="dateTaken"
              name="dateTaken"
              className="block w-full rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm text-zinc-900 focus:border-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900/20"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="tags" className="block text-sm font-medium text-zinc-700">
              Tags
            </label>
            <input
              type="text"
              id="tags"
              name="tags"
              placeholder="Tags (comma-separated)"
              className="block w-full rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900/20"
            />
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