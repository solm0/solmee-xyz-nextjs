'use client'

import { ChevronLeft, Expand } from 'lucide-react';
import { Post, Graph } from '../lib/type';
import CreateInitialGraph from '../lib/create-initial-graph';
import { useState, useEffect } from 'react';
import GraphRenderer from './graph-renderer';

export function ControllerButton({
  icon,
}: {
  icon: React.ReactNode;
}) {
  return (
    <button className="px-2 py-2 rounded-sm hover:brightness-97 transition-filter duration-300 backdrop-blur-sm">
      {icon}
    </button>
  )
}

const initGraph: Graph = {
  nodes: [],
  links: [],
};

export default function GraphController({
  post,
}: {
  post: Post;
}) {
  const [graph, setGraph] = useState<Graph | undefined>(initGraph);

  useEffect(() => {
    const initialGraph = CreateInitialGraph(post);
    setGraph(initialGraph);
  }, [post]);

  return (
    <>
      <div className="w-80 h-80 border text-text-800 border-text-600 flex items-center justify-center rounded-sm backdrop-blur-md">
        <GraphRenderer data={graph} />
      </div>

      <div className="flex w-full justify-between">
        <div className="flex gap-1 items-center">
          <ControllerButton icon={<ChevronLeft className="w-4 h-4" />} />
          <p className="px-2">2</p>
          <ControllerButton icon={<ChevronLeft className="w-4 h-4 -scale-x-100" />} />
        </div>
        <div className="flex gap-1 items-center">
          <ControllerButton icon={<Expand className="w-4 h-4"/>} />
        </div>
      </div>
    </>
  )
}