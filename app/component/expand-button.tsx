'use client'

import { useState } from "react";
import clsx from 'clsx';
import { useIsSettingOpen } from "../lib/use-is-setting-open";
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
        className="w-auto h-8 bg-button-100 text-text-900 px-3 flex items-center rounded-sm hover:brightness-97 transition-[filter] duration-300"
      >
        {name}
      </button>
      <div className={clsx(
        "h-auto flex flex-col items-start gap-1 ml-8 overflow-clip transition-all",
        isOpen ? "max-h-96 mt-1" : "max-h-0"
      )}>
        {children}
      </div>
    </div>
  )
}