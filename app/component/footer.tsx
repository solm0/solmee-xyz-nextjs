import { pretendard } from "../lib/localfont"
import Giscus from "./giscus"
import HyperlinkMapInline from "./hyperlink-map/hyper-link-map-inline"
import GraphController from "./hyperlink-map/graph-controller"
import { Post } from "../lib/type"
import Copyright from "./copyright"

export default function Footer({
  post,
}: {
  post: Post;
}) {
  return (
    <footer className={`${pretendard.className} text-text-800 text-sm flex flex-col gap-24 mb-48`}>
      <HyperlinkMapInline>
        <GraphController post={post} />
      </HyperlinkMapInline>
      <Giscus />
      <Copyright />
    </footer>
  )
}