
export interface Collection {
  id: string;
  name: string;
  description: string;
  isPublic: boolean;
  products: CollectionProduct[];
  createdBy: {
    id: string;
    name: string;
    avatar: string;
  };
  createdAt: string;
  updatedAt: string;
  followers: number;
  isFollowing?: boolean;
}

export interface CollectionProduct {
  id: string;
  productId: string;
  name: string;
  tagline: string;
  image: string;
  addedAt: string;
}
