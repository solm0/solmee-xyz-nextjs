import clsx from "clsx";
import { ArrowUpToLine } from "lucide-react";

export default function GoToTop({
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
    <div className={clsx(
      "fixed bg-button-100 h-8 w-auto right-8 top-8 flex gap-4 pointer-events-none transition-opacity rounded-sm px-3 z-80",
      !isHeadingVisible ? 'opacity-100' : 'opacity-0',
    )}
    >
      <div className='text-sm h-8 w-auto rounded-sm flex items-center pointer-events-auto'>
          {title}
        </div>
        <button
          onClick={goToTop}
          className="w-auto h-8 rounded-sm flex justify-center items-center hover:text-text-700 transition-all duration-300 pointer-events-auto"
        >
          <ArrowUpToLine className="w-4 h-4" />
        </button>
    </div>
  )
}