<template>
  <button class="save-product-button" :class="{
    'loading': isLoading,
    'success': isSuccess,
    'error': !!error
  }" :disabled="isLoading" @click="handleClick">
    <span v-if="isLoading" class="loader"></span>
    <span>{{ buttonText }}</span>
  </button>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useScreenshot } from '../composables/useScreenshot';
import { useProductData } from '../composables/useProductData';
import { useProductApi } from "@/content-scripts/composables/useProductApi.ts";

const props = defineProps<{
  containerRef: HTMLElement;
}>();

const isSuccess = ref(false);
const { saveProduct, error, isLoading } = useProductApi();
const { captureElement } = useScreenshot();
const { updateProductData } = useProductData();

const buttonText = computed(() => {
  if (isLoading.value) return 'Saving...';
  if (isSuccess.value) return 'Saved!';
  if (error.value) return 'Error!';
  return 'Save Product';
});

async function handleClick() {
  if (isLoading.value) return;

  isLoading.value = true;
  isSuccess.value = false;
  error.value = null;

  try {
    const productContainer = props.containerRef.closest('.s-result-item');
    if (!productContainer) {
      throw new Error('Product container not found');
    }

    const extractedData = updateProductData(props.containerRef);
    if (!extractedData) {
      throw new Error('Failed to extract product data');
    }

    const screenshot = await captureElement(productContainer as HTMLElement);

    const result = await saveProduct(extractedData);

    if (result && result.product) {
      isSuccess.value = true;
      setTimeout(() => {
        isSuccess.value = false;
      }, 2000);
    } else {
      throw new Error('Failed to save product');
    }
  } catch (err) {
    console.error('Error saving product:', err);
    error.value = err instanceof Error ? err.message : 'An unknown error occurred';
    setTimeout(() => {
      error.value = null;
    }, 2000);
  } finally {
    isLoading.value = false;
  }
}
</script>

<style>
.save-product-button {
  background-color: #ffd814;
  border: 1px solid #FCD200;
  border-radius: 8px;
  padding: 8px 16px;
  cursor: pointer;
  font-size: 13px;
  font-weight: 500;
  width: 100%;
  transition: all 0.2s;
  position: relative;
  z-index: 1001;
  white-space: nowrap;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.save-product-button:hover:not(:disabled) {
  background-color: #f7ca00;
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.save-product-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

.save-product-button.loading {
  background-color: #ffd814;
  cursor: not-allowed;
}

.save-product-button.success {
  background-color: #4CAF50;
  border-color: #45a049;
  color: white;
}

.save-product-button.error {
  background-color: #f44336;
  border-color: #da190b;
  color: white;
}

.loader {
  width: 16px;
  height: 16px;
  border: 2px solid #fff;
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  animation: rotation 1s linear infinite;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.amz-button-container {
  display: block !important;
  visibility: visible !important;
  opacity: 1 !important;
}
</style>