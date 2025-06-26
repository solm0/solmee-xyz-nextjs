import { HeadingNode, FormattedText } from "../../lib/type";
import { slugify } from "../../lib/slugify";
import { maruburi_bold } from "../../lib/localfont";

export default function Headings({
  heading,
}: {
  heading: HeadingNode;
}) {
  let fontSize: string;
  
  switch(heading.level) {
    case 2: fontSize = '!text-xl'; break;
    case 3: fontSize = '!text-lg'; break;
    case 4: fontSize = '!text-base'; break;
    case 5: fontSize = '!text-sm'; break;
    case 6: fontSize = '!text-xs'; break;
  }

  return (
    <>
      {heading.children.map((child) => {
        const text = (child as FormattedText).text || '';
        const id = slugify(text);
        
        return (
          <div
            key={id}
            id={id}
            className={`mb-2 ${maruburi_bold.className} ${fontSize}`}
          >
            {text}
          </div>
        )
      })}
    </>
  )
  
}