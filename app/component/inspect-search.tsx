'use client'

import { useState, useEffect } from "react";
import { useDebouncedCallback } from "use-debounce";
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import clsx from "clsx";

export default function InspectSearch() {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const [value, setValue] = useState(searchParams.get("search")?.toString() || "");

  useEffect(() => {
    setValue(searchParams.get("search")?.toString() || "");
  }, [searchParams]);

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (term) {
      params.set("search", term);
    } else {
      params.delete("search");
    }

    replace(`${pathname}?${params.toString()}`);
  }, 300);

  const handleClear = () => {
    setValue("");
    handleSearch("");
  };

  return (
    <div
      id="search-input"
      className="h-auto w-full flex flex-col gap-1"
    >
      <input
        type="text"
        value={value}
        onChange={(e) => {
          const term = e.target.value;
          setValue(term);
          handleSearch(term);
        }}
        className="h-8 bg-transparent focus:outline-none placeholder-neutral-400 text-text-900 font-medium pr-8"
        placeholder="문자열을 입력하세요."
        spellCheck="false"
      />
      <button
        onClick={handleClear}
        className={clsx(
          "w-auto h-8 bg-button-100 text-text-900 px-3 flex items-center rounded-sm hover:brightness-97 transition-[filter, opacity] duration-300 self-start",
          value ? 'opacity-100' : 'opacity-0'
        )}
      >
        지우기
      </button>
    </div>
  )
}