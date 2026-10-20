import type { Metadata } from "next";
import { ReactNode } from "react";
import Rote2RealShell from "@/components/rote2real/Rote2RealShell";

export const metadata: Metadata = {
  title: "Rote2Real | Brain Train",
  description:
    "A 20-day evidence-based sprint that turns academic knowledge into real, demonstrable work.",
};

export default function Rote2RealLayout({ children }: { children: ReactNode }) {
  return <Rote2RealShell>{children}</Rote2RealShell>;
}
