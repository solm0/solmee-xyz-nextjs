export type Tag = {
  id: string;
  name: string;
  posts?: Post[]; // optional to allow partial loading
};

export type Post = {
  id: string;
  title: string;
  preview?: string;
  publishedAt: string | number | Date;
  content?: DocumentField | null;
  author?: User | null;
  tags: Tag[];
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

export type DocumentNode = {
  type: string;
  level?: number;
  layout?: number[];
  children?: TextNode[];
}

export type TextNode = {
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  code?: boolean;
  // Add more formatting properties if needed
};

// Keystone Document Field format (simplified — you can refine this)
export type DocumentField = {
  document: DocumentNode[]; // Can be more specific with `@keystone-6/document-renderer`
  relationships?: {
    tag?: Tag[];
  };
};