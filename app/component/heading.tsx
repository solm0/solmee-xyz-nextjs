import { DocumentNode } from "../lib/type";
import { slugify } from "../lib/slugify";
import { maruburi_bold } from "../lib/localfont";

export default function Heading({
  heading,
}: {
  heading: DocumentNode;
}) {
  const text = heading.children?.[0]?.text || '';
  const id = heading.type === "heading" ? slugify(text) : undefined;



  return (
    <div
      id={id}
      className={`!text-xl mb-2 ${maruburi_bold.className}`}
    >
      {text}
    </div>
  )
}