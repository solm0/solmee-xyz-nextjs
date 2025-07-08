'use client'

import { usePathname, useSearchParams, useRouter } from "next/navigation";
import clsx from 'clsx';

export default function ParamButton({
  name,
  backbutton = false,
}: {
  name: string;
  backbutton?: boolean;
}) {
  const newParams = new URLSearchParams(useSearchParams().toString());
  const router = useRouter();
  const pathname = usePathname();
  
  const menu = newParams.get("menu");

  let path: string;

  const handleClick = (name: string) => {
    if (menu === name) {
      if (backbutton) {
        newParams.set("menu", '무작위');
      } else {
        newParams.set("menu", name);
      }
    } else {
      newParams.set("menu", name);
    }

    if (pathname) {
      path = "/"
    } else {
      path = pathname;
    }
    
    router.push(`${path}?${newParams.toString()}`);
  }

  return (
    <button
      onClick={() => handleClick(name)}
      className={clsx(
        "w-auto h-8 text-text-900 flex items-center px-3 rounded-sm hover:brightness-97 transition-[filter, colors] duration-300  pointer-events-auto",
        menu === name ? "bg-button-200 font-semibold" : "bg-button-100",
      )}
    >
      {name}
    </button>
  )
}