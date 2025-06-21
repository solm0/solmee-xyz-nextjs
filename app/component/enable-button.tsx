'use client'

import clsx from 'clsx';

export default function EnableButton({
  value,
  isEnabled,
}: {
  value: { value: string, name: string};
  isEnabled: boolean
}) {
  return (
    <button
      className={clsx(
        "w-auto h-8 text-text-900 px-3 flex items-center rounded-sm hover:brightness-97 transition-[filter, colors] duration-300",
        isEnabled ? "bg-button-on" : "bg-button-100",
      )}
    >
      {value.name}
    </button>
  )
}