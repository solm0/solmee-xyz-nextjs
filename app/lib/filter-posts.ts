import { Post } from "./type";

type RecursiveTextNode = {
  text?: string;
  children?: RecursiveTextNode[];
};

function recurse(node: RecursiveTextNode): string {
  if (typeof node?.text === 'string') return node.text;
  if (Array.isArray(node?.children)) {
    return node.children.map(recurse).join(' ');
  }
  return '';
}

function extractTextFromRichText(document: RecursiveTextNode[] | undefined): string {
  if (!document) return '';
  return document.map(recurse).join(' ');
}

export default function filterPosts({
  posts,
  tag = null,
  search = null,
}: {
  posts: Post[],
  tag?: string | null,
  search?: string | null,
}) {
  let filtered = posts;

  // tag
  if (tag) {
    filtered = filtered.filter(post => post.tags?.name === tag);
  }

  // search
  if (!search) return filtered;

  const searchablePosts = filtered.map(post => ({
    ...post,
    title: post.title,
    text: extractTextFromRichText(post.content?.document),
  }));

  filtered = searchablePosts.filter(post => {
    const lowerSearch = search.toLowerCase();
    return post.title.toLowerCase().includes(lowerSearch) ||
      post.text.toLowerCase().includes(lowerSearch);
  })

  return filtered;
}

// fuse를 쓰면 앞쪽 글만 검색됨. 단락별로 자르는 것도 고려

// import { Post, RichTextNode, ListItemChild, TextNode } from "./type";
// import Fuse from 'fuse.js'

// function extractTextFromRichText(document: RichTextNode[] | undefined): string {
//   if (!document) return '';

//   function recurse(node: any): string {
//     if (typeof node?.text === 'string') return node.text;
//     if (Array.isArray(node?.children)) {
//       return node.children.map(recurse).join(' ');
//     }
//     return '';
//   }

//   return document.map(recurse).join(' ');
// }

// export default function filterPosts({
//   posts,
//   tag = null,
//   search = null,
// }: {
//   posts: Post[],
//   tag?: string | null,
//   search?: string | null,
// }) {
//   let filtered = posts;

//   // tag
//   if (tag) {
//     filtered = filtered.filter(post => post.tags?.name === tag);
//   }

//   // search
//   if (!search) return filtered;

//   const searchablePosts = filtered.map(post => ({
//     ...post,
//     title: post.title,
//     text: extractTextFromRichText(post.content?.document),
//   }));

//   const fuse = new Fuse(searchablePosts, {
//     includeScore: true,
//     threshold: 0.8,
//     keys: ['title', 'text'],
//   });
//   const results = fuse.search(search).map(res => res.item);

//   return results;
// }