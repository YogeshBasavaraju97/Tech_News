export type Tcategories = {
  id: string;
  catName: string;
};

export type TPosts = {
  map(arg0: (post: TPosts) => import("react").JSX.Element): unknown;
  id: string;
  title: string;
  content: string;
  links: null | string[];
  imageURL?: string;
  publicId?: string;
  catName?: string;
  createdAt: string;
  authorEmail: string;
  author: {
    name: string;
  };
};
