import dynamic from "next/dynamic";
import { Graph } from "../lib/type";

export default function GraphRenderer({
  data
}: {
  data: Graph | undefined;
}) {
  if (data === undefined) return (<div>no graph</div>);
  const DynamicLocalGraph = dynamic(() => import('./graph'), {ssr: false});

  return (
    <div className="flex flex-col gap-2">
      <DynamicLocalGraph graphData={data} />
      {/* <div>{data.nodes.map((node) => <p key={node.id}>{node.id}</p>)}</div>
      <div className="text-green-900">{data.links.map((link) => <p key={`${link.source}<->${link.target}`}>{`${link.source}<->${link.target}`}</p>)}</div> */}
    </div>
  )
}