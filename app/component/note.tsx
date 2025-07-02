'use client'

import { Post } from "../lib/type";
import Content from '@/app/component/content';
import Footer from '@/app/component/footer';
import Toc from '@/app/component/toc';
import Metadata from '@/app/component/metadata';
import { maruburi_bold } from '@/app/lib/localfont';
import { useEffect, useRef, useState } from "react";
import Header from "./header";

export default function Note({
  post,
}: {
  post: Post;
}) {
  const headRef = useRef<HTMLDivElement>(null);

  const [isHeadingVisible, setIsHeadingVisible] = useState(false);

  useEffect(() => {
    const heading = headRef.current;
    if(!heading) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsHeadingVisible(entry.isIntersecting);
        },
        {
          root: null,
          threshold: 0.1,
        }
      );

      observer.observe(heading);

      return () => {
        observer.disconnect();
      };
  }, []);
  
  return (
    <>
      <h1
        ref={headRef}
        className={`text-3xl ${maruburi_bold.className}`}
      >
        {post?.title}
      </h1>
      <Metadata post={post} />

      <div className="flex flex-col">
        {post.content && <Content post={post.content.document} />}
      </div>

      <Toc post={post} />
      <Footer />

      <Header title={post.title} isHeadingVisible={isHeadingVisible} />
    </>
  )
}