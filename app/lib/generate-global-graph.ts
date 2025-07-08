import { Graph, Post, ParagraphNode, RelationshipNode } from "./type";

export function addLinkIfNotExists(graph: Graph, link: { source: string; target: string }) {
  if (!graph.links.find((l) =>
    ((l.source === link.source) && (l.target === link.target))
    || ((l.source === link.target) && (l.target === link.source))
  )) {
    graph.links.push(link);
  }
}

export default async function generateGlobalGraph(
  posts: Post[],
  graph: Graph,
) {
  posts.map((post) => {

    // nodes
    const node = { id: post.id, title: post.title, val: 1};
    graph.nodes.push(node);

    // inline links
    const paragraphs = post.content?.document.filter((doc): doc is ParagraphNode => {
      return doc.type === 'paragraph'
    })
    const relationships = paragraphs?.flatMap((p) => {
      return p.children.filter((ch): ch is RelationshipNode => {
        return ch.type === 'relationship';
      })
    })
    relationships?.forEach((r) => {
      if (!r.data.data?.id) return;
      const link = { source: post.id, target: r.data.data?.id}
      addLinkIfNotExists(graph, link);
    })

    // links
    post.links?.forEach(linked => {
      if (!linked.id) return;
      const link = { source: post.id, target: linked.id };
      const linkedNode = graph.nodes.find((node) => node.id === post.id || linked.id)
      if (linkedNode?.val) {
        linkedNode.val += 1;
      }
      addLinkIfNotExists(graph, link);
    });
  })
}