'use client'

import clsx from "clsx";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { Post } from "../lib/type";

export function RandItem({
  hovered,
  note
}: {
  hovered: string | null,
  note: Post
}) {
  return (
    <p className="w-full text-text-600 truncate">
      <span className="text-text-900">{note.title}</span>
      <span className={clsx (
        "ml-2 text-text-800 opacity-40 transition-[colors, opacity] duration-300",
        hovered && hovered !== note.id && 'opacity-0!',
        hovered && hovered === note.id && 'text-green-500! opacity-100'
      )}
      >
        {note.excerpt}
      </span>
    </p>
  )
}

export function ChronItem({
  note,
}: {
  note: Post,
}) {
  return (
    <>
      <div className="w-16 shrink-0 text-text-800">{note.chron.year && `${note.chron.year}년`}</div>
      <div className="w-16 shrink-0 text-text-800">{note.chron.month && `${note.chron.month}월`}</div>
      <div className="w-16 shrink-0 text-text-800">{note.chron.day && `${note.chron.day}일`}</div>
      <p className="col-span-11 w-full text-text-900 truncate">{note.title}</p>
    </>
  )
}

export default function PostList({ 
  menu,
  note,
  goUp, setGoUp,
  hovered, setHovered,
}: {
  menu: string,
  note: Post,
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
  const pathname = usePathname();

  const rootPath = pathname.split('/').slice(1, 2).toString();

  const handleClick = (href: string) => {
    const newParams = new URLSearchParams(searchParams.toString())

    // 현재 path와 같고 false면(위에있으면) 아래로 내리기, 라우팅 /:id
    if (goUp === true) {
      if (rootPath === href) {
        const newUp = !goUp
        setGoUp(newUp);

        router.push(`/?${newParams.toString()}`);
      } else {
        router.push(`/${href}?${newParams.toString()}`);
      }
    } else if (!rootPath) {
      const newUp = !goUp
      setGoUp(newUp);
      router.push(`/${href}?${newParams.toString()}`);
    } else {
      const newUp = !goUp
      setGoUp(newUp);

      router.push(`/${href}?${newParams.toString()}`);
    }
  }

  return (
    <div
      key={note.id}
      className={clsx (
        "text-nowrap h-12 w-full transition-[opacity] duration-300 hover:cursor-pointer flex items-center font-normal",
        hovered && hovered !== note.id && "opacity-40!"
      )}
      onMouseEnter={() => onMouseEnter(note.id)}
      onMouseLeave={onMouseLeave}
      onClick={() => handleClick(note.id)}
    >
      {rootPath === note.id &&
        <ChevronRight className={clsx(
          "absolute left-0 text-text-900 w-4 h-4",
          hovered && hovered !== note.id && "text-text-600",
        )} />
      }
      {menu === '최신순' ?
        <ChronItem note={note} />
        : <RandItem hovered={hovered} note={note} />
      }
    </div>
  )
}