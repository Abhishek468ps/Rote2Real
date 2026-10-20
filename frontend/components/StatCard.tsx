"use client";

import { useRouter } from "next/navigation";

type Props = {
  title: string;
  value: number;
  href: string;
};

export default function StatCard({ title, value, href }: Props) {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(href)}
      className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 cursor-pointer
                 hover:border-blue-600 hover:bg-zinc-800 transition"
    >
      <p className="text-sm text-zinc-400">{title}</p>
      <p className="text-2xl font-semibold mt-1">{value}</p>
    </div>
  );
}


