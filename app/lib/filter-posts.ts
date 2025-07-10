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
  keywords = null,
}: {
  posts: Post[],
  tag?: string | null,
  search?: string | null,
  keywords?: string[] | null,
}) {
  let filtered = posts;

  // tag
  if (tag) {
    filtered = filtered.filter(post => post.tags?.name === tag);
  }

  // search
  if (search) {
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
  }

  // keyword
  if (keywords && keywords.length > 0) {
    filtered = filtered.filter(post => {
      const postKeywords = post.keywords ? post.keywords?.map(pk => pk.name) : [];
      return keywords.every(kw => postKeywords.includes(kw));
    });
  }

  return filtered;

}