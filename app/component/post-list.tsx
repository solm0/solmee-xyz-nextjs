'use client'

import clsx from "clsx";
import { usePathname, useSearchParams, useRouter} from "next/navigation";
import { ChevronRight } from "lucide-react";
import { Post } from "../lib/type";

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
  note,
  hovered, setHovered,
}: {
  note: Post,
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
  const pathname = usePathname();
  const router = useRouter();

  const rootPath = pathname.split('/').slice(1, 2).toString();
  
  const handleClick = (href: string) => {
    const newParams = new URLSearchParams(searchParams.toString())

    if (rootPath === href) {
      router.push(`/?${newParams.toString()}`);
    } else {
      router.push(`/${href}?${newParams.toString()}`);
    }
  }

  return (
    <div
      key={note.id}
      className={clsx (
        "text-nowrap h-12 w-full transition-colors duration-300 hover:cursor-pointer flex items-center font-normal rounded-sm",
        hovered === note.id && "bg-button-100"
      )}
      onMouseEnter={() => onMouseEnter(note.id)}
      onMouseLeave={onMouseLeave}
      onClick={() => handleClick(note.id)}
    >
      {rootPath === note.id &&
        <ChevronRight className={clsx(
          "absolute left-0 text-text-900 w-4 h-4",
          hovered === note.id && "text-text-600",
        )} />
      }
      <ChronItem note={note} />
    </div>
  )
}