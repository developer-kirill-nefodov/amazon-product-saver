export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000',
  TIMEOUT: 15000,
  HEADERS: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
} as const

export const API_ENDPOINTS = {
  PRODUCT: {
    CREATE: '/product/create'
  }
} as const 