'use client'

import { useState } from "react";
import clsx from 'clsx';
import { useIsSettingOpen } from "@/app/lib/use-is-setting-open";
import { useEffect } from "react";

export default function ExpandButton({
  children,
  name,
}: {
  children: React.ReactNode;
  name: string | React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    const newOpen = !isOpen;
    setIsOpen(newOpen);
  }

  const setIsSettingOpen = useIsSettingOpen((state) => state.setValue);
  useEffect(() => {
    if (typeof(name) !== "string") {
      setIsSettingOpen(isOpen)
    }
  }, [isOpen])

  return (
    <div>
      <button
        onClick={handleClick}
        className={`${isOpen ? `text-green-500`: `text-text-900`} w-6 h-4 px-3 flex items-center justify-center rounded-sm hover:brightness-97 transition-[filter, colors] duration-300 pointer-events-auto hover:text-text-700`}
      >
        {name}
      </button>
      <div className={clsx(
        "absolute h-auto w-40 flex flex-col p-3 -translate-x-2 items-start gap-1 overflow-clip transition-all bg-background rounded-sm",
        isOpen ? "max-h-96 mt-3" : "opacity-0 max-h-0"
      )}>
        {children}
      </div>
    </div>
  )
}