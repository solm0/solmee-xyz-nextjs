'use client'

// import type { Metadata } from "next";
import { useState } from "react";
import clsx from "clsx";
import { maruburi } from "@/app/lib/localfont";
import { tempNotes } from "@/app/lib/data/tempNotes";
import { useRouter, usePathname } from "next/navigation";

// export const metadata: Metadata = {
//   title: "solmee.xyz",
//   description: "홈",
// };

export default function RandLayout ({
  children
}: {
  children: React.ReactNode;
}) {
  const [hovered, setHovered] = useState<string | null>(null);

  const onMouseEnter = (id: string) => {
    setHovered(id);
  }

  const onMouseLeave = () => {
    setHovered(null);
  }

  const [goUp, setGoUp] = useState(false);
  const router = useRouter();
  const subPath = usePathname().split('/').slice(2, 3).toString();

  const handleClick = () => {
    // index 위치 조절
    const newUp = !goUp
    // 현재 path와 같고 true면 아래로 내리기
    setGoUp(newUp);

    // goto /:id
    if (subPath) {
      router.push('/rand')
    } else {
      router.push('/rand/helo')
    }
  }

  // 현재 path에 따라 clsx로 표시하기

  return (
    <>
      <section className={clsx (
        `${maruburi.className} font-semibold relative h-1/2 w-full border-t border-text-700 pt-8 pl-8 overflow-y-scroll transition-all duration-700 ease-[cubic-bezier(0.75,0.05,0.45,0.95)]`,
        goUp ? '-top-8' : 'top-1/2'
      )}>
        {tempNotes.map((note) => (
          <div
            key={note.id}
            className={clsx (
              "text-nowrap h-12 w-full transition-[opacity] duration-300 hover:cursor-pointer",
              hovered && hovered !== note.id && "opacity-40"
            )}
            onMouseEnter={() => onMouseEnter(note.id)}
            onMouseLeave={onMouseLeave}
            onClick={handleClick}
          >
            <p className="w-full text-text-700 truncate">
              <span className="text-text-900">{note.title}</span>
              <span className={clsx (
                "ml-2 text-text-800 opacity-40",
                hovered && hovered !== note.id && 'opacity-0!',
                hovered && hovered === note.id && 'text-selected-500! opacity-100'
              )}
              >
                {note.desc}
              </span>
            </p>
          </div>
        ))}
      </section>
      <section>
        {children}
      </section>
    </>
  )
}