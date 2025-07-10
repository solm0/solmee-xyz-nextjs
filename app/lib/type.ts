export type Post = {
  id: string;
  title: string;
  preview?: string;
  publishedAt: string | number | Date;
  content?: PostContent | null;
  author?: User | null;
  tags: Tag;
  keywords: Keyword[];
  meta: boolean;
  status: 'published' | 'draft';
  chron: {
    year?: string;
    month?: string;
    day?: string;
  }
  order?: number;
  links?: Post[];
  backlinks?: Post[];
  internalLinks?: Post[];
  internalBacklinks?: Post[];
};

export type User = {
  id: string;
  name: string;
  email: string;
  posts?: Post[];
};

export type FormattedText = {
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  code?: boolean;
  keyboard?: boolean;
  subscript?: boolean;
  superscript?: boolean;
  type?: string;
};

export type LinkNode = {
  type: 'link';
  href: string;
  children: FormattedText[];
};

export type TextNode = FormattedText | LinkNode | RelationshipNode;

export type HeadingNode = {
  type: 'heading';
  level: 2 | 3 | 4 | 5 | 6;
  children: TextNode[];
};

export type ParagraphNode = {
  type: 'paragraph' | 'list-item-content' | "layout-area";
  children: TextNode[];
  textAlign?: 'start' | 'center' | 'end';
};

export type DividerNode = {
  type: 'divider';
  children: { text: string }[];
};

export type BlockquoteNode = {
  type: 'blockquote';
  children: ParagraphNode[];
};

export type CodeBlockNode = {
  type: 'code';
  children: FormattedText[];
  caption?: string;
};

export type ListItemChild = ParagraphNode | UnorderedListNode | OrderedListNode;

export type ListItemNode = {
  type: 'list-item';
  children: ListItemChild[];
};

export type OrderedListNode = {
  type: 'ordered-list';
  children: ListItemNode[];
};

export type UnorderedListNode = {
  type: 'unordered-list';
  children: ListItemNode[];
};

export type LayoutAreaNode = {
  type: 'layout-area';
  children: RichTextNode[];
};

export type LayoutNode = {
  type: 'layout';
  layout: number[];
  children: LayoutAreaNode[];
};

export type RichTextNode =
  | HeadingNode
  | ParagraphNode
  | DividerNode
  | BlockquoteNode
  | CodeBlockNode
  | OrderedListNode
  | UnorderedListNode
  | LayoutNode;

export type PostContent = {
  document: RichTextNode[];
  relationships?: {
    tag?: Tag[];
  };
};

export type Tag = {
  id: string;
  name: string;
  posts: Post[];
};

export type Keyword = {
  id: string;
  name: string;
  posts: Post[];
};

// Final root object
export type TagsResponse = {
  tags: Tag[];
};

export type RelationshipNode = {
  type: 'relationship';
  relationship: 'post';
  data: {
    id: string;
    label?: string;
    data?: Post;
  };
  children: { text: string }[]; // usually an empty text node
};

export type Node = {
  id: string;
  title: string;
  depth?: number;
  val?: number;
}

export type Link = {
  source: string | {id: string};
  target: string | {id: string};
}

export type Graph = {
  nodes: Node[],
  links: Link[]
}

export type KeywordsByTag = {
  [tag: string]: string[];
};