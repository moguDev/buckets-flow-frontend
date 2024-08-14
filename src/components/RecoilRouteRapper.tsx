"use client";
import { RecoilRoot } from "recoil";

export default function RecoilRootRapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RecoilRoot>{children}</RecoilRoot>;
}
