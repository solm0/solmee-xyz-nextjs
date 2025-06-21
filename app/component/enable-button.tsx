'use client'

import clsx from 'clsx';
import { useState, useEffect } from "react";
import usePersistentState from '../lib/use-persistent-state';

export default function EnableButton({
  value,
}: {
  value: { value: string, name: string};
}) {
  const [isEnabled, setIsEnabled] = usePersistentState(value.value, true);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);
  
  if (!isHydrated) return null; // or skeleton

  const handleClick = () => {
    const newEnabled = !isEnabled;
    setIsEnabled(newEnabled);
  }

  return (
    <button
      className={clsx(
        "w-auto h-8 text-text-900 px-3 flex items-center rounded-sm hover:brightness-98 transition-[filter, colors] duration-300",
        isEnabled ? "bg-button-on" : "bg-button-100",
      )}
      onClick={handleClick}
    >
      {value.name}
    </button>
  )
}