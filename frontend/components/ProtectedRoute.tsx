"use client";

import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({
  allowedRole,
  children,
}: {
  allowedRole: "admin" | "intern";
  children: React.ReactNode;
}) {
  const { role } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!role) {
      router.replace("/login");
      return;
    }

    if (role !== allowedRole) {
      router.replace("/login");
    }
  }, [role]);

  if (!role || role !== allowedRole) return null;

  return <>{children}</>;
}
