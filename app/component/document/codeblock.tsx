import { CodeBlockNode } from "@/app/lib/type";
import { pretendard } from "@/app/lib/localfont";
import highlighter from "@/app/lib/code-highlighter";

export default function CodeBlock({
  codeblock,
}: {
  codeblock: CodeBlockNode;
}) {
  return (
    <figure className="flex flex-col gap-1 pb-8">
      {!codeblock.caption &&
        <figcaption className={`${pretendard.className} text-sm text-text-700`}>caption.tsx</figcaption>
      }
      <pre className="h-auto bg-button-100 text-sm rounded-sm font-mono p-4 selection:bg-background! overflow-x-auto">
        {codeblock.children.map((child, idx) => (
          <code
            key={idx}
            className="text-text-900"
            dangerouslySetInnerHTML={{ __html: highlighter(child.text) }}
          />
        ))}
      </pre>
    </figure>
  )
}