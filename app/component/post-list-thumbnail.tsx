'use client'

import clsx from "clsx";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Post } from "../lib/type";

export default function PostListThumbnail({ 
  note,
  goUp, setGoUp,
  hovered, setHovered,
}: {
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
        "bg-button-200 w-82 h-82 transition-[opacity] duration-300 hover:cursor-pointer flex items-center justify-center rounded-sm",
        hovered && hovered !== note.id && "opacity-40!"
      )}
      onMouseEnter={() => onMouseEnter(note.id)}
      onMouseLeave={onMouseLeave}
      onClick={() => handleClick(note.id)}
    >
      {rootPath === note.id ? (
        <div>응</div>
        // <img
        //   src={note.thumbnail}
        //   alt={note.title}
        // />
      ) : (
        <div>아님</div>
      )}
    </div>
  )
}