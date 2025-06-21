'use client'

import { usePathname } from "next/navigation";
import Link from "next/link";
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
  const pathname = usePathname();

  return (
    <button
      className={clsx(
        "w-auto h-8 bg-button-100 px-4 py-5 flex items-center rounded-sm",
        pathname === href && "bg-button-200",
      )}
    >
      <Link
        href={
          backbutton ?
          pathname === href ? '/' : href
          : href
        }
      >
          {name}
      </Link>
    </button>
  )
}