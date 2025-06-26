import { ParagraphNode, TextNode, LinkNode } from "@/app/lib/type";
import InlineLink from "./inline-link";
import InlineText from "./inline-text";

export default function Paragraph({
  p,
}: {
  p: ParagraphNode;
}) {
  function isLinkNode(node: TextNode): node is LinkNode {
    return node.href !== undefined;
  }

  return (
    <div className="pb-8">
      {p.children.map((child, idx) => {
        if (isLinkNode(child)) {
          return (
            <InlineLink key={idx} link={child} />
          )
        } else {
          return (
            <InlineText key={idx} text={child} />
          )
        }
      })}
    </div>
  )
}