'use client'

import clsx from 'clsx';
import { useState, useEffect } from "react";
import usePersistentState from '../lib/use-persistent-state';

type HoverState = {
  offsetX: number | null;
  width: number | null;
};

export default function SwitchField({
  value,
}: {
  value: {value: string, name: string, options: {value: string, name: string}[]}
}) {
  return (
    <div className="flex gap-1 text-text-900 items-center">
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
  const defaultState: HoverState = {
    offsetX: null,
    width: null,
  };

  const [state, setstate] = usePersistentState(value, options[0].value);
  const [isHydrated, setIsHydrated] = useState(false);
  const [hoverState, setHoverState] = useState(defaultState)

  useEffect(() => {
    if (hoverState.offsetX !== null && hoverState.width !== null) return;
  
    setTimeout(() => {
      const el = document.getElementById(state);
      if (!el) return;
  
      const rect = el.getBoundingClientRect();
      const offsetX = Math.floor(rect.left);
      const width = rect.width;
  
      setHoverState({ offsetX, width });
    }, 0);
  }, [state, hoverState.offsetX, hoverState.width]);

  useEffect(() => {
    setIsHydrated(true);
  }, []);
  

  if (!isHydrated) return null; // or skeleton

  const handleClick = (selection: string) => {
    setstate(selection);
  };

  const updateHandlePosition = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const offsetX = Math.floor(rect.left);
    const width = rect.width;

    setHoverState({ offsetX: offsetX, width: width });
  }

  return (
    <form
      className="flex gap-1"
      onMouseLeave={() => setHoverState({ offsetX: null, width: null})}
    >
      {options.map((option, idx) => (
        <div
          key={idx}
          id={option.value}
          className="h-8 px-3 flex items-center justify-center rounded-sm"
          onClick={() => handleClick(option.value)}
          onMouseEnter={(e) => updateHandlePosition(e)}
        >
          <label htmlFor={`${option.value}-input`}>{option.name}</label>
          <input
            id={`${option.value}-input`}
            type="radio"
            value={option.value}
            className="opacity-0 hidden"
          />
        </div>
      ))}
      <span
        className={clsx(
          'relative h-8 rounded-sm bg-button-100 -z-10 transition-all duration-300 ease-in-out',
          hoverState ? 'opacity-100' : 'opacity-0'
        )}
        style={{
          left: `${hoverState.offsetX! - 175}px`,
          width: `${hoverState.width}px`,
        }}
      >
      </span>
    </form> 
  )
}