'use client'

import { usePathname, useSearchParams, useRouter } from "next/navigation";
import clsx from 'clsx';

export default function LinkButton({
  href,
  name,
  backbutton = false,
}: {
  href: string;
  name: string;
  backbutton?: boolean;
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const router = useRouter();
  let rootPath = pathname.split('/').slice(1, 2).toString();
  console.log(rootPath)

  const handleClick = (href: string) => {
    if (href === rootPath) {
      if (backbutton === true) {
        rootPath = "/";
      }
    } else {
      rootPath = href;
    }
    
    router.push(`/${rootPath}?${searchParams}`);
  }

  return (
    <button
      onClick={() => handleClick(href)}
      className={clsx(
        "w-auto h-8 text-text-900 flex items-center px-3 rounded-sm hover:brightness-97 transition-[filter, colors] duration-300",
        rootPath === href ? "bg-button-200 font-semibold" : "bg-button-100",
      )}
    >
      {name}
    </button>
  )
}