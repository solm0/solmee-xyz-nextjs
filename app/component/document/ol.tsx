import { OrderedListNode } from "@/app/lib/type"
import Paragraph from "./paragraph";

export default function Ol({
  ol,
}: {
  ol: OrderedListNode
}) {
  return (
    <ol className="list-decimal pl-8">
      {ol.children.map((child, idx) => (
        <li key={idx}>
          {child.children.map((ch, idx) => {
            if (ch.type === 'list-item-content') {
              return (
                <Paragraph key={idx} p={ch} />
              );
            } else {
              return (
                <Ol key={idx} ol={ch as OrderedListNode} />
              )
            }
          })}
        </li>
      ))}
    </ol>
  )
}