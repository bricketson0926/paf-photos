import { getPossibleTags } from "@/lib/data";
import PhotoUploadForm from "./PhotoUploadForm";

export default async function AddPhoto() {
  const possibleTags = await getPossibleTags();

  // remove potential null/empty tags from the list of possible tags
  const filteredPossibleTags = possibleTags.filter((tag) => typeof tag === "string" && tag.trim() !== "");

  return (
    <PhotoUploadForm
      possibleTags={filteredPossibleTags}
      apiUrl={process.env.NEXT_PUBLIC_API_URL ?? ""}
    />
  );
}