import clsx from "clsx";
import { ArrowUpToLine } from "lucide-react";

export default function Header({
  title,
  isHeadingVisible,
}: {
  title: string;
  isHeadingVisible: boolean;
}) {
  const goToTop = () => {
    const page = document.getElementById('note_wrapper');
    if (!page) return;
    console.log(page)

    page.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
  return (
    <header className={clsx(
      "fixed w-[calc(100%-24rem)] max-w-[47rem] flex justify-between h-auto left-[22rem] top-0 gap-2 bg-background border-b border-text-600 pointer-events-none transition-opacity pt-8",
      !isHeadingVisible ? 'opacity-100' : 'opacity-0',
    )}
    >
      <div className='text-sm h-auto w-auto rounded-sm flex items-center pointer-events-auto'>
        {title}
      </div>
      <button
        onClick={goToTop}
        className="w-7 h-7 rounded-sm bg-background flex justify-center items-center hover:text-text-700 transition-all duration-300 pointer-events-auto"
      >
        <ArrowUpToLine className="w-4 h-4" />
      </button>
    </header>
  );
}