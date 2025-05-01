// Generic API Response type
export interface ApiResponse<T> {
  data: T
  status: number
  message?: string
}

// Generic API Error type
export interface ApiError {
  status: number
  message: string
  errors?: Record<string, string[]>
}

// Auth types
export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  token: string
  user: UserData
}

export interface UserData {
  id: number
  email: string
  name: string
  role: string
}

// User types
export interface UserProfile {
  id: number
  email: string
  name: string
  avatar?: string
  settings: UserSettings
}

export interface UserSettings {
  theme: 'light' | 'dark'
  notifications: boolean
  language: string
}

// Product types
export interface Product {
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

export interface ProductCreateRequest {
  product: Product
  image: File
} 