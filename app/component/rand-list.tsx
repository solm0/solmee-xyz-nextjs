'use client'

import clsx from "clsx";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { ChevronRight } from "lucide-react";

export default function RandList({ 
  note,
  goUp, setGoUp,
  hovered, setHovered,
}: {
  note: { title: string, id: string, preview: string},
  goUp: boolean,
  setGoUp: (value: boolean) => void,
  hovered: string | null;
  setHovered: (id: string | null) => void,
}) {
  const onMouseEnter = (id: string) => {
    setHovered(id);
  }

  const onMouseLeave = () => {
    setHovered(null);
  }

  const searchParams = useSearchParams();
  const router = useRouter();
  const subPath = usePathname().split('/').slice(2, 3).toString();

  const handleClick = (href: string) => {
    const newParams = new URLSearchParams(searchParams.toString())

    // 현재 path와 같고 false면(위에있으면) 아래로 내리기, 라우팅 /:id
    if (goUp === true) {
      if (subPath === href) {
        const newUp = !goUp
        setGoUp(newUp);

        router.push(`/rand?${newParams.toString()}`);
      } else {
        router.push(`/rand/${href}?${newParams.toString()}`);
      }
    } else {
      const newUp = !goUp
      setGoUp(newUp);

      router.push(`/rand/${href}?${newParams.toString()}`);
    }
  }

  return (
    <div
      key={note.id}
      className={clsx (
        "text-nowrap h-12 w-full transition-[opacity] duration-300 hover:cursor-pointer flex items-center",
        hovered && hovered !== note.id && "opacity-40!"
      )}
      onMouseEnter={() => onMouseEnter(note.id)}
      onMouseLeave={onMouseLeave}
      onClick={() => handleClick(note.id)}
    >
      {subPath === note.id &&
        <ChevronRight className={clsx(
          "absolute left-0 text-text-900 border-r-0 w-4 h-4",
          hovered && hovered !== note.id && "text-text-700",
        )} />
      }
      <p className="w-full text-text-700 truncate">
        <span className="text-text-900">{note.title}</span>
        <span className={clsx (
          "ml-2 text-text-800 opacity-40",
          hovered && hovered !== note.id && 'opacity-0!',
          hovered && hovered === note.id && 'text-selected-500! opacity-100'
        )}
        >
          {note.preview}
        </span>
      </p>
    </div>
  )
}