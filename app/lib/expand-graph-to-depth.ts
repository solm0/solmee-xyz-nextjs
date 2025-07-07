import { Post, Graph, ParagraphNode, RelationshipNode } from "./type";

export function addNodeIfNotExists(graph: Graph, node: { id: string; title: string; depth: number; }) {
  if (!graph.nodes.find((n) => n.id === node.id)) {
    graph.nodes.push(node);
  }
}

export function addLinkIfNotExists(graph: Graph, link: { source: string; target: string }) {
  if (!graph.links.find((l) =>
    ((l.source === link.source) && (l.target === link.target))
    || ((l.source === link.target) && (l.target === link.source))
  )) {
    graph.links.push(link);
  }
}

export default async function expandGraphToDepth(
  rootPost: Post,
  depth: number,
  graph: Graph,
) {
  const visited = new Set<string>();

  async function recurse(currentPost: Post, currentDepth: number) {
    console.log('recurse', currentDepth, depth)
    if (currentDepth > depth) return;
    if (visited.has(currentPost.id)) return;
    visited.add(currentPost.id);

    const currentNode = { id: currentPost.id, title: currentPost.title, depth: currentDepth };
    addNodeIfNotExists(graph, currentNode);

    // inline links
    const paragraphs = currentPost.content?.document.filter((doc): doc is ParagraphNode => {
      return doc.type === 'paragraph'
    })
    const relationships = paragraphs?.flatMap((p) => {
      return p.children.filter((ch): ch is RelationshipNode => {
        return ch.type === 'relationship';
      })
    })

    if (currentDepth < depth) {
      relationships?.forEach((r) => {
        if (!r.data.id || !r.data.data?.title) return;
        const node = { id: r.data.id, title: r.data.data.title, depth: currentDepth + 1 };
        const link = { source: currentPost.id, target: r.data.id };
        addNodeIfNotExists(graph, node);
        addLinkIfNotExists(graph, link);
      });
  
      // inline backlinks
      // ...(currentPost.inlineBacklinks || [])
  
      // links
      currentPost.links?.forEach(linked => {
        if (!linked.id || !linked.title) return;
        const node = { id: linked.id, title: linked.title, depth: currentDepth + 1 };
        const link = { source: currentPost.id, target: linked.id };
        addNodeIfNotExists(graph, node);
        addLinkIfNotExists(graph, link);
      });
  
      // backlinks
      currentPost.backlinks?.forEach(backlinked => {
        if (!backlinked.id || !backlinked.title) return;
        const node = { id: backlinked.id, title: backlinked.title, depth: currentDepth + 1 };
        const link = { source: backlinked.id, target: currentPost.id };
        addNodeIfNotExists(graph, node);
        addLinkIfNotExists(graph, link);
      });
    }

    const relationshipPosts = (relationships ?? [])
      .map(r => r.data?.data)
      .filter((p): p is Post => !!p && !!p.id && !!p.title);

    console.log(currentPost, relationshipPosts, currentPost.links, currentPost.backlinks)
    const nextPosts: Post[] = [
      ...(currentPost.links || []),
      ...(currentPost.backlinks || []),
      ...relationshipPosts,
    ];
    console.log('nextPosts', nextPosts)
    
    for (const childPost of nextPosts) {
      if (!childPost || visited.has(childPost.id)) continue;
      await recurse(childPost, currentDepth + 1);
    }
  }

  await recurse(rootPost, 0);
  console.log("Graph after recursion:", graph, depth);
}