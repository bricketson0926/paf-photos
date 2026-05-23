import Link from "next/link";
export default function AdminNavbar() {
    return (
        <div className="sticky top-32 z-40">
            <div className="mx-auto flex max-w-5xl flex-col items-center px-4 py-3">
                <h1 className="py-2 text-center text-3xl font-bold">
                Add New Media
                </h1>

                <nav className="flex flex-wrap items-center justify-center gap-3 pb-2">
                <Link
                    href="/admin/photos/add"
                    className="rounded-xl bg-gray-200 px-3 py-1 text-sm font-medium transition hover:bg-gray-300"
                >
                    Add Photo
                </Link>
                <Link
                    href="/admin/maps/add"
                    className="rounded-xl bg-gray-200 px-3 py-1 text-sm font-medium transition hover:bg-gray-300"
                >
                    Add Maps
                </Link>
                </nav>
            </div>
        </div>
    );
}
