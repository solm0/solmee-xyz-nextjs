import { pretendard } from "../lib/localfont"
import Giscus from "./giscus"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className={`${pretendard.className} text-text-800 text-sm flex flex-col gap-24 mb-48`}>
      <Giscus />
      <div className="flex justify-between items-center">
        <span>© 2024-2025 정솔미</span>
        <div className="flex gap-3 items-center">
          <Link href='https://github.com/solm0/solmee-xyz-nextjs' target="_blank" className="hover:opacity-60 transition-opacity duration-300">소스코드</Link>
        </div>
      </div>
    </footer>
  )
}