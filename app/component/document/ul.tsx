import { UnorderedListNode } from "@/app/lib/type"
import Paragraph from "./paragraph";

export default function Ul({
  ul,
}: {
  ul: UnorderedListNode
}) {
  return (
    <ul className="list-disc pl-8">
      {ul.children.map((child, idx) => (
        <li key={idx}>
          {child.children.map((ch, idx) => {
            if (ch.type === 'list-item-content') {
              return (
                <Paragraph key={idx} p={ch} />
              );
            } else {
              return (
                <Ul key={idx} ul={ch as UnorderedListNode} />
              )
            }
          })}
        </li>
      ))}
    </ul>
  )
}