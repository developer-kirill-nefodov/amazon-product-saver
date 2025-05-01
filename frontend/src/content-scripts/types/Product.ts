export interface ProductTitle {
  full: string;
  brand: string;
  model: string;
}

export interface ProductPrice {
  current: string;
  original?: string;
  currency: string;
  deals?: string[];
}

export interface ProductSpecifications {
  display?: {
    size: string;
    type: string;
    resolution: string;
  };
  memory?: {
    ram: string;
    storage: string;
    expandable: string;
  };
  battery?: {
    capacity: string;
    type: string;
  };
  camera?: {
    main: string;
    front: string;
  };
  os?: {
    name: string;
    version: string;
  };
  network?: {
    type: string;
    features: string[];
  };
  dimensions?: string;
  color?: string;
  features?: string[];
}

export interface ProductRatings {
  average: number;
  count: number;
  distribution?: Record<string, number>;
}

export interface ProductShipping {
  delivery: {
    date: string;
    location: string;
  };
  price: string;
}

export interface ProductIdentifiers {
  asin: string;
  url: string;
}

export interface ProductData {
  title: ProductTitle;
  price: ProductPrice;
  specifications?: ProductSpecifications;
  ratings?: ProductRatings;
  shipping?: ProductShipping;
  identifiers: ProductIdentifiers;
  image?: string;
}

export interface Product extends ProductData {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
} 