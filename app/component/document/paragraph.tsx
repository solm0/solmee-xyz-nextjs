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
  
  const styles: string[] = [];

  if (p.textAlign === 'start') styles.push('text-left');
  if (p.textAlign === 'center') styles.push('text-center');
  if (p.textAlign === 'end') styles.push('text-right');

  const style = styles.join(' ');

  return (
    <p className={`${style}`}>
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
    </p>
  )
}