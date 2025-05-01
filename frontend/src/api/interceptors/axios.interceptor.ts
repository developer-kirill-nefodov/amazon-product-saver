import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios'
import { API_CONFIG } from '../config/apiConfig'
import type { ApiError } from '../types/api.types'

export const createApiInstance = (): AxiosInstance => {
  const api = axios.create({
    baseURL: API_CONFIG.BASE_URL,
    timeout: API_CONFIG.TIMEOUT,
    headers: API_CONFIG.HEADERS
  })

  // Request interceptor
  api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = localStorage.getItem('token')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    (error: AxiosError) => {
      return Promise.reject(error)
    }
  )

  // Response interceptor
  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError<ApiError>) => {
      if (error.response?.status === 401) {
        // Handle unauthorized access
        localStorage.removeItem('token')
        // You might want to redirect to login or refresh token
      }
      return Promise.reject(error)
    }
  )

  return api
}

export const api = createApiInstance() 