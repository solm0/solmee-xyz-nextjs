'use client'

import { useState } from "react";
import clsx from 'clsx';

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

  return (
    <div>
      <button
        onClick={handleClick}
        className="w-auto h-8 bg-button-100 px-4 py-5 flex items-center rounded-sm"
      >
        {name}
      </button>
      <div className={clsx(
        "h-auto flex flex-col items-start gap-2 ml-8 overflow-clip transition-all",
        isOpen ? "max-h-96 mt-2" : "max-h-0"
      )}>
        {children}
      </div>
    </div>
  )
}