import MapUploadForm from "./MapUploadForm";

export default async function AddMap() {
  return (
    <MapUploadForm
      apiUrl={process.env.NEXT_PUBLIC_API_URL ?? ""}
    />
  );
}
