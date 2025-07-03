'use client'

import { ChevronLeft, Expand } from 'lucide-react';
import { Post, Graph } from '../lib/type';
import CreateInitialGraph from '../lib/create-initial-graph';
import { useState, useEffect } from 'react';
import GraphRenderer from './graph-renderer';
import clsx from 'clsx';

export function ControllerButton({
  role,
  icon,
  onClick,
  depth,
}: {
  role: string,
  icon: React.ReactNode;
  onClick?: () => void;
  depth?: number;
 }) {
  const disabled =
    (role === 'inc' && depth && depth >= 3 ? true : false) ||
    (role === 'dec' && depth && depth <= 1 ? true : false);
  
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        "px-2 py-2 rounded-sm hover:brightness-97 transition-filter duration-300 backdrop-blur-sm",
        disabled ? 'pointer-events-none text-text-600' : 'pointer-events-auto text-text-800',
      )}
    >
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
  // depth state
  const [depth, setDepth] = useState(1);

  const increaseDepth = () => {
    if (depth < 3) {
      setDepth(depth+1);
    } else return;
  }

  const decreaseDepth = () => {
    if (depth > 1) {
      setDepth(depth-1);
    } else return;
  }

  // initialize graph data
  const [graph, setGraph] = useState<Graph | undefined>(initGraph);

  useEffect(() => {
    const initialGraph = CreateInitialGraph(post);
    setGraph(initialGraph);
  }, [post]);

  // depth update graph data - depth를 함수에 파라미터로 넣기

  // filter update graph data

  return (
    <>
      <div className="w-80 h-80 border text-text-800 border-text-600 flex items-center justify-center rounded-sm backdrop-blur-md">
        <GraphRenderer data={graph} />
      </div>

      <div className="flex w-full justify-between">
        <div className="flex gap-1 items-center">
          <ControllerButton
            role='dec'
            icon={<ChevronLeft className="w-4 h-4" />}
            onClick={decreaseDepth}
            depth={depth}
          />
          <p className="px-2">{depth}</p>
          <ControllerButton
            role='inc'
            icon={<ChevronLeft className="w-4 h-4 -scale-x-100" />}
            onClick={increaseDepth}
            depth={depth}
          />
        </div>
        <div className="flex gap-1 items-center">
          <ControllerButton
            role='exp'
            icon={<Expand className="w-4 h-4"/>}
          />
        </div>
      </div>
    </>
  )
}