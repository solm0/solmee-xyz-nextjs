import { UnorderedListNode, TextNode, LinkNode } from "@/app/lib/type"
import InlineLink from "./inline-link";
import InlineText from "./inline-text";

export default function Ul({
  ul,
}: {
  ul: UnorderedListNode
}) {
  function isLinkNode(node: TextNode): node is LinkNode {
    return node.href !== undefined;
  }

  return (
    <ul className="link-disc pl-8">
      {ul.children.map((child) => {
        return (
          child.children.map((ch, idx) => (
            <li key={idx}>{ch.children.map((c, idx) => {
              if (isLinkNode(c)) {
                return (
                  <InlineLink key={idx} link={c} />
                )
              } else {
                return (
                  <InlineText key={idx} text={c} />
                )
              }
            })}</li>
          ))
        )
      })}
    </ul>
  )
}