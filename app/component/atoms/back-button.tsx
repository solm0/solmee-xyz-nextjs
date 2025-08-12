'use client'

import { useRouter, useSearchParams } from "next/navigation"
import { Undo2 } from "lucide-react";

export default function BackButton() {
  const searchParams = useSearchParams();
  const router = useRouter();

  return (
    <button
      onClick={() => {
        const prevPath = sessionStorage.getItem('prevPath') || '/';
        router.push(`${prevPath}?${searchParams}`)
      }}
      className="fixed top-4 right-4 md:top-8 md:right-8 bg-button-100 w-8 text-sm h-8 text-text-900 flex items-center justify-center px-3 rounded-sm hover:brightness-97 transition-[filter, colors] duration-300 pointer-events-auto z-80"
    >
      <Undo2 className="w-4 h-4 shrink-0" />
    </button>
  )
}