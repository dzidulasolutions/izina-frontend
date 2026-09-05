"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function SessionExpiredListener() {
  const router = useRouter();

  useEffect(() => {
    const handler = () => router.push("/login");
    window.addEventListener("auth:session-expired", handler);
    return () => window.removeEventListener("auth:session-expired", handler);
  }, [router]);

  return null;
}