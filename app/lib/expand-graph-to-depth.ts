import { Post, Graph } from "./type";

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

export function processLinks(
  post: Post,
  graph: Graph,
  field: 'internalLinks' | 'internalBacklinks' | 'links' | 'backlinks',
  depth: number,
) {
  post[field]?.forEach(l => {
    if (!l.id || !l.title) return;
    
    const node = { id: l.id, title: l.title, depth: depth + 1 };

    let link;
    if (field === 'internalLinks' || field === 'links') {
      // console.log(`source: ${post.title}, target: ${l.title}`)
      link = { source: post.id, target: l.id };
    } else {
      link = { source: l.id, target: post.id };
    }

    addNodeIfNotExists(graph, node);
    addLinkIfNotExists(graph, link);
  });
}

export default async function expandGraphToDepth(
  rootPost: Post,
  depth: number,
  graph: Graph,
) {
  const visited = new Set<string>();

  async function recurse(currentPost: Post, currentDepth: number) {
    // console.log('recurse', currentDepth, depth)
    if (currentDepth > depth) return;
    if (visited.has(currentPost.id)) return;
    visited.add(currentPost.id);

    const currentNode = { id: currentPost.id, title: currentPost.title, depth: currentDepth };
    addNodeIfNotExists(graph, currentNode);

    if (currentDepth < depth) {
      processLinks(currentPost, graph, 'internalLinks', currentDepth);
      processLinks(currentPost, graph, 'internalBacklinks', currentDepth);
      processLinks(currentPost, graph, 'links', currentDepth);
      processLinks(currentPost, graph, 'backlinks', currentDepth);
    }

    const nextPosts: Post[] = [
      ...(currentPost.internalLinks || []),
      ...(currentPost.internalBacklinks || []),
      ...(currentPost.links || []),
      ...(currentPost.backlinks || []),
    ];
    // console.log('nextPosts', nextPosts)
    
    for (const childPost of nextPosts) {
      if (!childPost || visited.has(childPost.id)) continue;
      await recurse(childPost, currentDepth + 1);
    }
  }

  await recurse(rootPost, 0);
  // console.log("Graph after recursion:", graph, depth);
}