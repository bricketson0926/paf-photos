import { getPossibleTags } from "@/lib/data";
import PhotoUploadForm from "./PhotoUploadForm";

export default async function AddPhoto() {
  const possibleTags = await getPossibleTags();

  return (
    <PhotoUploadForm
      possibleTags={possibleTags}
      apiUrl={process.env.NEXT_PUBLIC_API_URL ?? ""}
    />
  );
}