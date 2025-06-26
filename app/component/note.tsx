import { Post } from "../lib/type"
import Headings from "./document/heading";
import Paragraph from "./document/paragraph";
import Ul from "./document/ul";

export default function Note({
  post
}: {
  post: Post
}) {
  return (
    <>
      {
        post.content?.document.map((document, idx) => {

          switch (document.type) {
            case 'heading':
              return (
                <Headings key={idx} heading={document} />
              )
            case 'paragraph':
              return (
                <Paragraph key={idx} p={document} />
              );
            case 'unordered-list':
              return (
                <Ul key={idx} ul={document} />
              )
            case 'ordered-list':
            case 'divider':
            case 'blockquote':
            case 'code':
            case 'layout':
          }
        })
      }
    </>
  )
}