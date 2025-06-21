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
      <Link
        href={
          backbutton ?
          pathname === href ? '/' : href
          : href
        }
      >
        <button
          className={clsx(
            "w-auto h-8 text-text-900 flex items-center px-3 rounded-sm hover:brightness-98 transition-[filter, colors] duration-300",
            pathname === href ? "bg-button-200 font-bold" : "bg-button-100",
          )}
        >
          {name}
        </button>
      </Link>
  )
}