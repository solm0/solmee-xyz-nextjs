import { LayoutNode } from "@/app/lib/type";
import Note from "../note";

export default function LayoutBlock({
  layout,
}: {
  layout: LayoutNode;
}) {
  let den = 0;

  for (let i=0; i<layout.layout.length; i++) {
    den += layout.layout[i];
  }

  return (
    <div className="flex gap-4">
      {layout.layout.map((num, idx) => (
        <div
          key={idx}
          style={{ width: `${(num / den) * 100}%` }}
        >
          <Note post={layout.children?.[idx].children} />
        </div>
      ))}
    </div>
  )
}