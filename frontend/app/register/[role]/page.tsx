import { notFound } from "next/navigation";

import { ROLE_CONFIG } from "@/lib/register/roleConfig";

import RegisterLayout from "@/components/auth/RegisterLayout";

interface Props {
  params: Promise<{
    role: string;
  }>;
}

export default async function RegisterPage({
  params,
}: Props) {
  const { role } = await params;

  const config =
    ROLE_CONFIG[
      role as keyof typeof ROLE_CONFIG
    ];

  if (!config) {
    notFound();
  }

  return (
    <RegisterLayout
      role={role}
      config={config}
    />
  );
}