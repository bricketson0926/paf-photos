import type { Metadata } from "next";
import AdminNavbar from "@/app/_components/adminNavbar";


export const metadata: Metadata = {
  title: "PAF | Admin",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <div className="min-h-full flex flex-col h-full antialiased">
        <AdminNavbar />
        {children}
      </div>
  );
}
