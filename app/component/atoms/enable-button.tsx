// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

'use client'

import clsx from 'clsx';
import { useToggleStore } from '@/app/lib/use-enabled';
import { useEffect } from 'react';

export default function EnableButton({
  value,
}: {
  value: { value: string, name: string | React.ReactNode };
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
    setIsOpen(key, !isEnabled);
  };

  if (typeof value.name === 'string') {
    return (
      <div className='flex text-text-900 items-center gap-2'>
        <p>{`${value.name}:`}</p>
        <button
          className={clsx(
            "w-auto h-4 text-text-900 flex items-center rounded-sm hover:text-text-700 transition-colors duration-300 pointer-events-auto",
            isEnabled === true ? "text-green-500!" : "text-text-900",
          )}
          onClick={handleClick}
        >
          {`${isEnabled === true ? `보임` : `숨김`}`}
        </button>
      </div>
    )
  } else {
    return (
      <div
        className={`${isEnabled ? `text-green-500`: `text-text-900`} w-8 h-4 flex items-center justify-center rounded-sm transition-colors duration-300 pointer-events-auto hover:text-text-700`}
        onClick={handleClick}
      >
        {value.name}
      </div>
    )
  }
}