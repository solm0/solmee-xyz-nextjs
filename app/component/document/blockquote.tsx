import { BlockquoteNode } from "@/app/lib/type";
import Paragraph from "./paragraph";

export default function Blockquote({
  quote,
}: {
  quote: BlockquoteNode;
}) {
  return (
    <blockquote className="border-l-3 border-text-600 p-4 text-text-800">
      {quote.children.map((child, idx) => (
        <Paragraph key={idx} p={child} />
      ))}
    </blockquote>
  )
}