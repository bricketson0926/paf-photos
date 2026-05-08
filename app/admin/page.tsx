'use client';

import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

export default function AdminPage() {
    const router = useRouter();
    const redirectedRef = useRef(false);

    useEffect(() => {
        if (!redirectedRef.current) {
            redirectedRef.current = true;
            router.replace("/admin/photos");
        }
    }, [router]);

    return null;
}