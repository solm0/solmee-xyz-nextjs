'use client'

import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import clsx from 'clsx';

export default function ParamButton({
  param,
  name,
  backbutton = false,
}: {
  param: string;
  name: string;
  backbutton?: boolean;
}) {
  const newParams = new URLSearchParams(useSearchParams().toString());
  const router = useRouter();
  const pathname = usePathname();
  
  useEffect(() => {
    newParams.set("view", 'rand');
    router.push(`${pathname}?${newParams.toString()}`);
  }, [])

  const view = newParams.get("view");

  let path: string;

  const handleClick = (param: string) => {
    if (view === param) {
      if (backbutton) {
        newParams.delete("view");
      } else {
        newParams.set("view", param);
      }
    } else {
      newParams.set("view", param);
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
      onClick={() => handleClick(param)}
      className={clsx(
        "w-auto h-8 text-text-900 flex items-center px-3 rounded-sm hover:brightness-97 transition-[filter, colors] duration-300",
        view === param ? "bg-button-200 font-semibold" : "bg-button-100",
      )}
    >
      {name}
    </button>
  )
}