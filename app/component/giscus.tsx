'use client'

import { useEffect, useRef } from 'react';

export default function Giscus() {
  const commentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.setAttribute('data-repo', 'solm0/solmee-xyz-nextjs');
    script.setAttribute('data-repo-id', 'R_kgDOO7JeOQ');
    script.setAttribute('data-category', 'Announcements');
    script.setAttribute('data-category-id', 'DIC_kwDOO7JeOc4Cr__s');
    script.setAttribute('data-mapping', 'pathname');
    script.setAttribute('data-strict', '0');
    script.setAttribute('data-reactions-enabled', '1');
    script.setAttribute('data-emit-metadata', '0');
    script.setAttribute('data-input-position', 'bottom');
    script.setAttribute('data-theme', 'catppuccin_latte');
    script.setAttribute('data-lang', 'ko');
    script.setAttribute('data-loading', 'lazy');
    script.crossOrigin = 'anonymous';
    script.async = true;

    if (commentRef.current) {
      commentRef.current.innerHTML = '';
      commentRef.current.appendChild(script);
    }
  }, []);

  return <div ref={commentRef} />;
}