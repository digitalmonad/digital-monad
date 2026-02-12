type Metadata = {
  title: string;
  publishedAt: string;
  summary: string;
  image?: string;
  categories?: string[];
  tags?: string[];
};

type Post = {
  metadata: Metadata;
  slug: string;
  content: string;
};
