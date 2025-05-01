import { api } from '../interceptors/axios.interceptor'
import { API_ENDPOINTS } from '../config/apiConfig'
import type { ApiResponse, Product, ProductCreateRequest } from '../types/api.types'

export const productApi = {
  createProduct: async (request: ProductCreateRequest): Promise<ApiResponse<Product>> => {
    const formData = new FormData()
    formData.append('image', request.image)
    formData.append('product', JSON.stringify(request.product))

    const response = await api.post<ApiResponse<Product>>(
      API_ENDPOINTS.PRODUCT.CREATE,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    )
    return response.data
  }
} 