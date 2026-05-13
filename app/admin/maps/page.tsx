import { Map } from "@/lib/types";
import { getPossibleTags } from "@/lib/data";

export default async function AddMap() {
  const possibleTags = await getPossibleTags(); // Lint says await is unnecesary as of before implementing the full getPossibleTags function, but it will be necessary once that function is implemented. So I left it in.
  
  async function submitNewMap(formData:FormData) {
    'use server'

    const rawFormData = {
      newMap: formData.get('newMap'),
      description: formData.get('description'),
      creator: formData.get('creator'),
      dateCreated: formData.get('dateCreated'),
    }

    // mutate/parse/clean/generate data if needed
    const processedData = {
      ...rawFormData,
    }

    // send the data to the server or database
  }

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans">
      <main className="min-w-2xl flex-col items-center justify-between py-32 px-16 bg-white sm:items-start">
        <form action={submitNewMap} className="w-full max-w-xl space-y-6 rounded-2xl border border-zinc-200 bg-zinc-50 p-8 shadow-sm">
          <div className="space-y-2">
            <label htmlFor="uploadedImage" className="block text-sm font-medium text-zinc-700">
              Upload Map Image
            </label>
            <input
              type="file"
              id="uploadedImage"
              name="newMap"
              accept="image/*"
              className="block w-full rounded-lg border border-zinc-300 bg-white text-sm text-zinc-700 file:mr-4 file:rounded-md file:border-0 file:bg-zinc-900 file:px-4 file:py-2 file:text-sm file:font-medium file:text-white hover:border-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900/20"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="mapTitle" className="block text-sm font-medium text-zinc-700">
              Map Title
            </label>
            <input
              type="text"
              id="mapTitle"
              name="title"
              placeholder="Map Title"
              className="block w-full rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900/20"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="mapDescription" className="block text-sm font-medium text-zinc-700">
              Map Description
            </label>
            <input
              type="text"
              id="mapDescription"
              name="description"
              placeholder="Map Description"
              className="block w-full rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900/20"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="creator" className="block text-sm font-medium text-zinc-700">
              Creator
            </label>
            <input
              type="text"
              id="creator"
              name="creator"
              placeholder="Creator Name"
              className="block w-full rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900/20"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="dateCreated" className="block text-sm font-medium text-zinc-700">
              Date Created
            </label>
            <input
              type="date"
              id="dateCreated"
              name="dateCreated"
              className="block w-full rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm text-zinc-900 focus:border-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900/20"
            />
          </div>

          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-lg bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-green-600 hover:scale-105 hover:rounded-2xl transition-all duration-300 hover:ring-green-600 hover:ring-4 active:ring-16 active:ring-green-600/30"
          >
            Submit New Map
          </button>
        </form>
      </main>
    </div>
  );
}