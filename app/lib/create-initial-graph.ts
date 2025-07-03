import { Graph, ParagraphNode, Post, RelationshipNode } from "./type";

export function addNodeIfNotExists(graph: Graph, node: { id: string; title: string; tag: string }) {
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

export function inlineOut(post: Post, graph: Graph): void {
  const paragraphs = post.content?.document.filter((doc): doc is ParagraphNode => {
    return doc.type === 'paragraph'
  })
  const relationships = paragraphs?.flatMap((p) => {
    return p.children.filter((ch): ch is RelationshipNode => {
      return ch.type === 'relationship';
    })
  })
  relationships?.map((r) => {

    // node
    const id = r.data.id;
    const title = r.data.data?.title;
    const tag = r.data.data?.tags?.id || '';

    if (!id || !title) return;
    const node = { id: id, title: title, tag: tag, depth: 1 };

    // link
    const source = post.id;
    const target = id;

    if (!source || !target) return;
    const link = { source: source, target: target};

    addNodeIfNotExists(graph, node);
    addLinkIfNotExists(graph, link);
  })
}

export function inlineIn(post: Post, graph: Graph) {
  console.log('inlineIn', post, graph);
  // 커스텀 훅 만든 후 inlineBacklink에서 가져오기
}

export function childLink(post: Post, graph: Graph) {
  post.links?.map((r) => {

    // node
    const id = r.id;
    const title = r.title;
    const tag = r.tags?.id;

    if (!id || !title) return;
    const node = { id: id, title: title, tag: tag, depth: 1 };

    // link
    const source = post.id;
    const target = id;

    if (!source || !target) return;
    const link = { source: source, target: target };

    addNodeIfNotExists(graph, node);
    addLinkIfNotExists(graph, link);
  })
}

export function parentLink(post: Post, graph: Graph) {

  // node
  const id = post.backlinks?.[0]?.id;
  const title = post.backlinks?.[0]?.title;
  const tag = post.backlinks?.[0]?.tags?.id || '';

  if (!id || !title) return;
  const node = { id: id, title: title, tag: tag, depth: 1 };

  // link
  const source = id;
  const target = post.id;

  if (!source || !target) return;
  const link = { source: source, target: target };

  addNodeIfNotExists(graph, node);
  addLinkIfNotExists(graph, link)
}

export default function CreateInitialGraph(post: Post): Graph | undefined {
  if (!post.id || !post.title || !post.tags) return;

  const initialGraph: Graph = {
    nodes: [],
    links: [],
  };

  const centralNode = { id: post.id, title: post.title, tag: post.tags.id }
  initialGraph.nodes.push(centralNode);

  inlineOut(post, initialGraph);
  inlineIn(post, initialGraph);
  childLink(post, initialGraph);
  parentLink(post, initialGraph);

  return initialGraph;
};