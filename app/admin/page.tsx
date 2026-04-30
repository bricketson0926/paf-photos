import { redirect } from "next/navigation"

export default function AdminPage() {
    // Only redirects (forcefully) to the photos page for now. Could potentially add more admin features in the future...
    redirect("/admin/photos", "replace");
}