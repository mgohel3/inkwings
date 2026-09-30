import type { Metadata } from "next";
import { WorkClient } from "@/components/work/WorkClient";

export const metadata: Metadata = {
  title: "Work | InkWings Printing Solution, Ahmedabad",
  description:
    "A gallery of InkWings print work across stationery, packaging, marketing, promotional, advertising and merchandise.",
};

export default function WorkPage() {
  return <WorkClient />;
}
