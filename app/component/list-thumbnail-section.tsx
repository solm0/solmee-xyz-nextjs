'use client'

import clsx from "clsx"

export default function ListThumbnailSection({
  goUp,
  children
}: {
  goUp: boolean,
  children: React.ReactNode,
}) {
  return (
    <section className={clsx (
      'relative h-1/2 w-full pt-8 pb-8 overflow-scroll transition-all duration-700 ease-[cubic-bezier(0.75,0.05,0.45,0.95)] focus:outline-hidden',
      'flex gap-1 flex-wrap justify-center md:justify-start',
      goUp ? 'top-0 border-0' : 'top-1/2 border-t border-text-600'
    )}>
      {children}
    </section>
  )
}