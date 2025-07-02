import { pretendard } from "../lib/localfont"
import Giscus from "./giscus"
import Link from "next/link"
import { ChevronDown } from "lucide-react";

export default function Footer() {
  return (
    <footer className={`${pretendard.className} text-text-700 text-sm mb-8 flex flex-col gap-12`}>
      <Giscus />
      <div className="flex justify-between items-center">
        <span>© 2024-2025 정솔미</span>
        <div className="flex gap-3 items-center">
          <Link href='https://github.com/solm0/solmee-xyz-nextjs' target="_blank" className="hover:opacity-60 transition-opacity duration-300">소스코드</Link>
        </div>
      </div>
      <div className={`${pretendard.className} text-sm text-text-800 relative w-full h-72 flex flex-col justify-end items-center gap-2`}>
        <span>더 스크롤해 노트 닫기</span>
        <ChevronDown className="w-5 h-5 animate-bounce" />
      </div>
    </footer>
  )
}