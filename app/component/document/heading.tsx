import { HeadingNode, FormattedText } from "../../lib/type";
import { slugify } from "../../lib/slugify";
import { maruburi_bold } from "../../lib/localfont";

export default function Headings({
  heading,
}: {
  heading: HeadingNode;
}) {
  return (
    <>
      {heading.children.map((child) => {
        const text = (child as FormattedText).text || '';
        const id = slugify(text);

        switch(heading.level) {
          case 2:
            return (
              <h2 key={id} id={id} className={`text-xl py-4 pt-16 text-text-950 ${maruburi_bold.className}`}>
                {text}
              </h2>
            )
          case 3: 
            return (
              <h3 key={id} id={id} className={`text-lg py-4 pt-16 text-text-950 ${maruburi_bold.className}`}>
                {text}
              </h3>
            )
          case 4:
            return (
              <h4 key={id} id={id} className={`text-base py-4`} >
                {text}
              </h4>
            )
        }
      })}
    </>
  )
  
}