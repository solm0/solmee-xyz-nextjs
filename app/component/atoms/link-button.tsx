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
        "w-auto h-4 text-text-900 flex items-center rounded-sm hover:text-text-700 transition-colors duration-300",
        rootPath === href ? "underline underline-offset-4 decoration-text-900 decoration-[1px]" : "font-normal",
      )}
    >
      {name}
    </button>
  )
}