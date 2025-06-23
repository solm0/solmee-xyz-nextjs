import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "solmee.xyz",
  description: "홈",
};

export default function Layout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
    </>
  )
}