import MapUploadForm from "./MapUploadForm";

export default async function AddMap() {
  return (
    <MapUploadForm
      apiUrl={process.env.API_URL ?? ""}
    />
  );
}