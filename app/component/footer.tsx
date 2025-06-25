import { pretendard } from "../lib/localfont"
import Giscus from "./giscus"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className={`${pretendard.className} text-text-800 text-sm mb-8 flex flex-col gap-12`}>
      <Giscus />
      <div className="flex justify-between">
        <span>© 2024-2025 정솔미</span>
        <div className="flex gap-3">
          <Link href='github.com/solm0/solmee-xyz-nextjs' className="hover:text-text-700 transition-colors duration-300">소스코드</Link>
          <Link href='github.com/solm0/solmee-xyz-nextjs' className="hover:text-text-700 transition-colors duration-300">RSS</Link>
        </div>
      </div>
    </footer>
  )
}