export type Post = {
  id: string;
  title: string;
  preview?: string;
  publishedAt: string | number | Date;
  content?: PostContent | null;
  author?: User | null;
  tags: Tag;
  meta: boolean;
  status: 'published' | 'draft';
  chron: {
    year?: string;
    month?: string;
    day?: string;
  }
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
  href?: string;
};

export type LinkNode = {
  type: 'link';
  href: string;
  children: FormattedText[];
};

export type TextNode = FormattedText | LinkNode;

export type HeadingNode = {
  type: 'heading';
  level: 2 | 3 | 4 | 5 | 6;
  children: TextNode[];
};

export type ParagraphNode = {
  type: 'paragraph';
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
};

export type ListItemContentNode = {
  type: 'list-item-content';
  children: TextNode[];
};

export type ListItemNode = {
  type: 'list-item';
  children: ListItemContentNode[];
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

// Union of all possible block node types
type RichTextNode =
  | HeadingNode
  | ParagraphNode
  | DividerNode
  | BlockquoteNode
  | CodeBlockNode
  | OrderedListNode
  | UnorderedListNode
  | LayoutNode;

type PostContent = {
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

// Final root object
export type TagsResponse = {
  tags: Tag[];
};