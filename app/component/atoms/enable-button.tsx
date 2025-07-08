// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

'use client'

import clsx from 'clsx';
import { useToggleStore } from '@/app/lib/use-enabled';
import { useEffect } from 'react';

export default function EnableButton({
  value,
}: {
  value: { value: string, name: string };
}) {
  const values = {
    "note-inspector": "noteInspector",
    "hyperlink-map": "hyperlinkMap",
  } as const

  const initializeToggles = useToggleStore((s) => s.initializeToggles);
  const setIsOpen = useToggleStore((s) => s.setToggle);

  useEffect(() => {
    initializeToggles();
  }, [initializeToggles]);

  const key = values[value.value];
  const isEnabled = useToggleStore((s) => s.toggles[key])

  const handleClick = () => {
    const newEnabled = !isEnabled;
    setIsOpen(key, newEnabled);
  };

  return (
    <button
      className={clsx(
        "w-auto h-8 text-text-900 px-3 flex items-center rounded-sm hover:brightness-97 transition-[filter, colors] duration-300 pointer-events-auto",
        isEnabled === true ? "bg-green-100" : "bg-button-100",
      )}
      onClick={handleClick}
    >
      {value.name}
    </button>
  );
}