import Link from "next/link";
export default function AdminNavbar() {
    return (
        <div className="sticky top-32 z-40">
            <div className="mx-auto flex max-w-2xs flex-col items-center px-4 py mb-1 bg-gray-100 rounded-xl border border-gray-200 ">
                <h1 className="py-2 text-center text-3xl font-bold">
                Admin Only Navigation
                </h1>

                <nav className="grid grid-cols-2 gap-3 pb-2">
                    <Link
                        href="/admin/photos/add"
                        className="rounded-xl bg-gray-200 px-3 py-1 text-sm font-medium transition hover:bg-gray-300 text-center"
                    >
                        Add Photo
                    </Link>
                    <Link
                        href="/admin/maps/add"
                        className="rounded-xl bg-gray-200 px-3 py-1 text-sm font-medium transition hover:bg-gray-300 text-center"
                    >
                        Add Maps
                    </Link>
                    <Link
                        href="/admin/photos"
                        className="rounded-xl bg-gray-200 px-3 py-1 text-sm font-medium transition hover:bg-gray-300 text-center"
                    >
                        All Photos
                    </Link>
                    <Link
                        href="/admin/maps"
                        className="rounded-xl bg-gray-200 px-3 py-1 text-sm font-medium transition hover:bg-gray-300 text-center"
                    >
                        All Maps
                    </Link>
                </nav>
            </div>
        </div>
    );
}
