import { ref } from 'vue';
import type { ProductData } from '../types/Product';

const API_BASE_URL = process.env.VITE_API_URL || 'http://localhost:4000/api/v1';

export function useProductApi() {
  const error = ref<string | null>(null);
  const isLoading = ref(false);

  async function saveProduct(productData: ProductData) {
    try {
      isLoading.value = true;
      error.value = null;

      const formData = new FormData();
      formData.append('data', JSON.stringify(productData));

      const response = await fetch(`${API_BASE_URL}/products`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Accept': 'application/json',
        },
        body: formData
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to save product');
      }

      const result = await response.json();
      return result;
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An unknown error occurred';
      throw err;
    } finally {
      isLoading.value = false;
    }
  }

  return {
    saveProduct,
    error,
    isLoading
  };
} 