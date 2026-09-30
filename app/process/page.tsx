import type { Metadata } from "next";
import { ProcessClient } from "@/components/process/ProcessClient";

export const metadata: Metadata = {
  title: "Process | InkWings Printing Solution, Ahmedabad",
  description: "How InkWings works: discover the requirement, create the artwork, print, and deliver.",
};

export default function ProcessPage() {
  return <ProcessClient />;
}
