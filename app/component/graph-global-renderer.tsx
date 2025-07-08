'use client'

import dynamic from "next/dynamic";
import { Graph, Post } from "../lib/type";
import { useEffect, useState } from "react";
import generateGlobalGraph from "../lib/generate-global-graph";

export default function GlobalGraphRenderer({
  posts,
}: {
  posts: Post[];
}) {
  const [graph, setGraph] = useState<Graph>({ nodes: [], links: [] });
  useEffect(() => {
    generateGlobalGraph(posts, graph);
    setGraph(graph);
  }, [])

  if (posts === undefined) return (<div>no posts</div>);
  const DynamicGlobalGraph = dynamic(() => import('./graph-global'), {ssr: false});

  return (
    <div className="h-auto w-auto border">

      <DynamicGlobalGraph graphData={graph} />
    </div>
  )
}