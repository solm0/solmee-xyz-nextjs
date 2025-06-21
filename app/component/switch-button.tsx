'use client'

import clsx from 'clsx';
import { useState, useEffect } from "react";
import usePersistentState from '../lib/use-persistent-state';
import { useIsSettingOpen } from '../lib/use-is-setting-open';

type HoverState = {
  offsetX: number | null;
  width: number | null;
};

export default function SwitchField({
  value,
}: {
  value: {value: string, name: string, options: { value: string, name: string }[]}
}) {
  return (
    <div className="flex gap-2 text-text-900 items-center">
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
  const isSettingOpen = useIsSettingOpen((state) => state.value);
  
  const [state, setstate] = usePersistentState(value, options[0].value);
  const [isHydrated, setIsHydrated] = useState(false);
  const [hoverState, setHoverState] = useState<HoverState>({
    offsetX: null,
    width: null,
  });

  useEffect(() => {
    if (hoverState.offsetX !== null && hoverState.width !== null) return;
  
    setTimeout(() => {
      const el = document.getElementById(`${value}-${state}`);
      if (!el) return;
  
      const rect = el.getBoundingClientRect();
      const offsetX = Math.floor(rect.left);
      const width = rect.width;
  
      setHoverState({ offsetX: offsetX, width: width });
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
          id={`${value}-${option.value}`}
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
      {<span
        className={clsx(
          'absolute h-8 rounded-sm bg-button-100 -z-10 transition-all duration-300 ease-in-out',
          hoverState ? 'opacity-100' : 'opacity-0',
          value !== "base" && !isSettingOpen && 'hidden'
        )}
        style={value === "base" ? {
          left: `${hoverState.offsetX!-32}px`,
          width: `${hoverState.width}px`,
        } : {
          left: `${hoverState.offsetX!}px`,
          width: `${hoverState.width}px`,
        }}
      >
      </span>}
    </form> 
  )
}