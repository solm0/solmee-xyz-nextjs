'use client'

import { Post } from "../lib/type";
import Content from '@/app/component/content';
import Footer from '@/app/component/footer';
import Toc from '@/app/component/toc';
import Metadata from '@/app/component/metadata';
import { maruburi_bold } from '@/app/lib/localfont';
import { useEffect, useRef, useState } from "react";
import Header from "./header";
import RingLinks from "./ring-links";
import SequenceNav from "./sequence-nav";

export default function Note({
  post,
}: {
  post: Post;
}) {
  const headRef = useRef<HTMLDivElement>(null);

  const [isHeadingVisible, setIsHeadingVisible] = useState(true);

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

  const RingLink = () => {
    if (post.links && post.links?.length > 0) {   // 부모노트일 경우
      return (<RingLinks id={post.id} links={post.links} backlink={post} />);
    } else if (post.backlinks?.[0]) {             // 자식노트일 경우
      return (<RingLinks id={post.id} links={post.backlinks?.[0].links ?? null} backlink={post.backlinks?.[0]} />)
    } else return;
  }

  const generateSequence = () => {
    let prev = null;
    let next = null;
    let isFirstChild = false;

    if (post.links && post.links?.length > 0) {
      const sorted = [...post.links].sort(
        (a, b) => (a.order ?? 0) - (b.order ?? 0)
      );
      next = sorted[0];
    } else if (post.backlinks?.[0]) {
      const currentOrder = post.order ?? 0;
      const links = post.backlinks[0].links ?? [];

      prev = links.find(link => link.order === currentOrder - 1) ?? null;
      next = links.find(link => link.order === currentOrder + 1) ?? null;

      if (prev === null) {
        prev = post.backlinks?.[0];
        isFirstChild = true;
      }
    }
    return { prev, next, isFirstChild };
  };

  const { prev, next, isFirstChild } = generateSequence();
  
  return (
    <>
      <h1
        ref={headRef}
        className={`leading-12 text-3xl text-text-950 ${maruburi_bold.className}`}
      >
        {post?.title}
      </h1>

      <div className="flex flex-col gap-2">
        <RingLink />
        <Metadata post={post} />
      </div>
      
      <div className="flex flex-col">
        {post.content && <Content post={post.content.document} />}
      </div>

      {(post.backlinks?.length || (post.links?.length ?? 0) > 0) &&
        <SequenceNav isFirstChild={isFirstChild} prev={prev} next={next} />
      }

      <Footer post={post} />

      <Toc post={post} />
      <Header title={post.title} isHeadingVisible={isHeadingVisible} />
    </>
  )
}