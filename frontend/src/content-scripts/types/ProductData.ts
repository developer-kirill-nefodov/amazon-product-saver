export interface ProductData {
  title: {
    full: string;
    brand: string;
    model: string;
  };
  price: {
    current: string;
    original: string;
    currency: string;
    deals: string[];
  };
  specifications: {
    display: {
      size: string;
      type: string;
      resolution: string;
    };
    memory: {
      ram: string;
      storage: string;
      expandable: string;
    };
    battery: {
      capacity: string;
      type: string;
    };
    camera: {
      main: string;
      front: string;
    };
    os: {
      name: string;
      version: string;
    };
    network: {
      type: string;
      features: string[];
    };
    dimensions: string;
    color: string;
    features: string[];
  };
  ratings: {
    average: string;
    count: string;
    stars: string;
  };
  shipping: {
    delivery: {
      date: string;
      location: string;
    };
    price: string;
  };
  identifiers: {
    asin: string;
    url: string;
  };
  variants: {
    colors: string[];
    capacities: string[];
  };
} 