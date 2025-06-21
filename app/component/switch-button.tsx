'use client'

import clsx from 'clsx';
import { useState, useEffect } from "react";
import usePersistentState from '../lib/use-persistent-state';

export default function SwitchField({
  value,
}: {
  value: {value: string, name: string, options: {value: string, name: string}[]}
}) {
  return (
    <div className="flex gap-2">
      <label htmlFor={value.value}>{value.name}:</label>
      <SwitchButton value={value.value} options={value.options} />
    </div>
  )
}

export function SwitchButton({
  value,
  options,
}: {
  value: string,
  options: {value: string, name: string}[]
}) {
  const [state, setState] = usePersistentState(value, options[0].value);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);
  
  if (!isHydrated) return null; // or skeleton

  const handleClick = (selection: string) => {
    setState(selection);
  }

  return (
    <form className="flex gap-2">
      {options.map((option, idx) => (
        <div
          key={idx}
          className={clsx(
            "px-2 py-2 flex items-center justify-center rounded-sm",
            state === option.value ? "bg-white" : 'bg-transparent'
          )}
        >
          <label htmlFor={option.value}>{option.name}</label>
          <input
            id={option.value}
            type="radio"
            value={option.value}
            className="opacity-0 hidden"
            onClick={() => handleClick(option.value)}
          />
        </div>
      ))}
    </form> 
  )
}