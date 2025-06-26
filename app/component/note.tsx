import { Post } from "../lib/type"
import Heading from "./heading";

export default function Note({
  post
}: {
  post: Post
}) {
  post.content?.document.map((document, idx) => {
    switch (document.type) {
      case 'heading':
        return (
          <Heading key={idx} heading={document} />
        )
      case 'paragraph':
        return (
          <div
            key={idx}
            className='pb-8'
          >
            {document.children?.[0].text}
          </div>
        );
      case 'unordered-list':
        return (
          <div></div>
        )
      case 'ordered-list':
      case 'blockquote':
      case 'code':
      case 'layout':
    }
  })
}