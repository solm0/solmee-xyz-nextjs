'use client'

import dynamic from "next/dynamic";
import { Graph, Post } from "../lib/type";
import { useEffect, useState } from "react";
import generateGlobalGraph from "../lib/generate-global-graph";
import { useSearchParams } from "next/navigation";
import filterPosts from "../lib/filter-posts";

export default function GlobalGraphRenderer({
  posts,
}: {
  posts: Post[];
}) {
  // set graph
  const [graph, setGraph] = useState<Graph>({ nodes: [], links: [] });
  useEffect(() => {
    generateGlobalGraph(posts, graph);
    setGraph(graph);
  }, [])

  // filter
  const searchParams = useSearchParams();
  const newParams = new URLSearchParams(searchParams.toString());
  const tag = newParams.get("tag");
  const search = newParams.get("search");

  const filteredPosts = filterPosts({
    posts: posts,
    tag: tag,
    search: search,
  })

  const DynamicGlobalGraph = dynamic(() => import('./graph-global'), {ssr: false});

  return (
      <DynamicGlobalGraph graphData={graph} filteredData={filteredPosts} />
  )
}