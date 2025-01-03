type Base = {
  _createdAt: string;
  _id: string;
  _rev: string;
  _type: string;
  _updatedAt: string;
};
export interface Post extends Base {
  title: string;
  description: string;
  summary: string;
  slug: Slug;
  image: image;
  publishedAt: string;
}
interface image {
  _type: "image";
  asset: Reference;
}
interface Reference {
  _ref: string;
  _type: "reference";
}
interface Slug {
  _type: "slug";
  current: string;
}
