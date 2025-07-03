import { Graph } from "../lib/type";

export default function GraphRenderer({
  data
}: {
  data: Graph | undefined;
}) {
  if (data === undefined) return (<div>no graph</div>);

  return (
    <div className="flex flex-col gap-2">
      <div>{data.nodes.map((node) => <p key={node.id}>{node.id}</p>)}</div>
      <div className="text-green-900">{data.links.map((link) => <p key={`${link.source}<->${link.target}`}>{`${link.source}<->${link.target}`}</p>)}</div>
    </div>
  )
}