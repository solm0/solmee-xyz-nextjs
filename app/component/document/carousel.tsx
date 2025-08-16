'use client'

import { CarouselNode } from "@/app/lib/type";
import { useState, useEffect } from "react";
import { ChevronRight } from "lucide-react";
import { pretendard } from "@/app/lib/localfont";
import Image from 'next/image';

export default function Carousel({
  carIdx,
  carousel,
}: {
  carIdx: number,
  carousel: CarouselNode,
}) {

  function ControllerButton ({
    role,
    icon,
    onClick,
    length
  }: {
    role: string;
    icon: React.ReactNode;
    onClick: () => void;
    length: number;
  }) {
    let disabled;

    if (role === 'inc') {
      disabled = (idx??0) >= length;
    } else if (role === 'dec') {
      disabled = (idx??0) <= 1;
    }
    
    return (
      <button
        className={`
          px-2 h-8 rounded-sm transition-filter duration-300 backdrop-blur-sm bg-button-100 hover:bg-button-200
          ${disabled ? 'pointer-events-none text-text-600' : 'pointer-events-auto text-text-800'}
        `}
        onClick={onClick}
      >
        {icon}
      </button>
    )
  }

  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0, w: 0, h: 0 });
  const [idx, setIdx] = useState<number | null>(null)

  const handleModal = (idx: number) => {
    if (isOpen) {
      setIsOpen(false);
      setMounted(false)
      setPos({ x: 0, y: 0, w: 0, h: 0 })
      setIdx(null)
    } else {
      const el = document.getElementById(`img-${carIdx}-${idx}`);
      if (!el) return;
      const rect = el.getBoundingClientRect();
      setIdx(idx+1)
      setPos({ x: rect.x, y: rect.y, w: rect.width, h: rect.height });
      setIsOpen(true);

      requestAnimationFrame(() => {
        setMounted(true);
      });
    }
  }

  useEffect(() => {
    if (idx === null) return;
  
    const el = document.getElementById(`img-${carIdx}-${idx - 1}`);
    if (!el) return;
  
    const rect = el.getBoundingClientRect();
    setPos({ x: rect.x, y: rect.y, w: rect.width, h: rect.height });
  
    requestAnimationFrame(() => {
      setMounted(true);
    });
  }, [idx]);

  const generateUrl = (idx: number) => {
    const cloudName = "dpqjfptr6";
    const publicId = carousel.props.items[idx]?.imageSrc;
    const isGif = publicId.toLowerCase().startsWith('gif');
        const transformations = isGif
          ? "f_auto,q_auto"
          : "f_auto,q_auto,c_fill";
    return `https://res.cloudinary.com/${cloudName}/image/upload/${transformations}/${publicId}.jpg`;
  }

  return (
    <div
      className="w-full md:w-[calc(100vw-26rem)] overflow-scroll flex gap-4 snap-x h-96 md:h-[32rem] overscroll-auto scrollbar-hide my-4"
    >
      {carousel.props.items.map((item, idx) => {
        const cloudName = "dpqjfptr6";
        const publicId = item.imageSrc;
        const isGif = publicId.toLowerCase().startsWith('gif');
        const transformations = isGif
          ? "f_auto,q_auto"
          : "f_auto,q_auto,c_fill";
        const imageUrl = `https://res.cloudinary.com/${cloudName}/image/upload/${transformations}/${publicId}.jpg`;

        return (
          <div
            key={idx}
            className="relative flex flex-col gap-1 snap-start snap-normal h-full shrink-0"
          >
            <Image
              src={imageUrl}
              width={800}
              height={800}
              className="h-[22rem] md:h-[30rem] w-auto object-contain rounded-sm cursor-pointer"
              alt={item.alt}
              id={`img-${carIdx}-${idx}`}
              onClick={() => handleModal(idx)}
              unoptimized={true}
            />
            <p className={`${pretendard.className} text-sm h-4 text-text-700`}>{item.alt}</p>
          </div>
        )
      })}

      {isOpen && idx &&
        <div
          className="fixed backdrop-blur-2xl w-screen h-screen top-0 left-0 z-80"
        >
          <div
            className="absolute w-full h-full backdrop-blur-2xl"
            onClick={() => handleModal(-1)}
          />
          <div
            className='fixed transition-all duration-300 ease-in-out flex items-center justify-center'
            style={{
              top: pos.y,
              left: pos.x,
              width: pos.w,
              height: pos.h,
              transform: mounted
                ? `translate(${window.innerWidth / 2 - pos.x - pos.w / 2}px, ${window.innerHeight / 2 - pos.y - pos.h / 2}px) scale(1.5)`
                : 'translate(0, 0) scale(1)',
              transformOrigin: 'center',
            }}
            onClick={() => handleModal(-1)}
          >
            <Image
              width={800}
              height={800}
              src={generateUrl(idx-1)}
              className="w-auto h-[30rem] object-left-top rounded-sm cursor-pointer"
              alt={carousel.props.items[idx-1]?.alt}
              unoptimized={true}
            />
          </div>
          <div className="fixed w-screen mb-8 left-0 text-sm bottom-0 flex justify-center items-center gap-4">
            <ControllerButton
              role='dec'
              icon={<ChevronRight className="w-4 h-4 -scale-x-100" />}
              onClick={() => setIdx(idx - 1)}
              length={carousel.props.items.length}
            />
            <span>{`${idx}/${carousel.props.items.length}`}</span>
            <ControllerButton
              role='inc'
              icon={<ChevronRight className="w-4 h-4" />}
              onClick={() => setIdx(idx + 1)}
              length={carousel.props.items.length}
            />
          </div>
        </div>
      }
    </div>
  )
}