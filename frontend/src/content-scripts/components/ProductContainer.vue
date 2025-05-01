<template>
  <div class="product-container" :style="containerStyle">
    <ProductButton v-if="isValidProduct" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import type { CSSProperties } from 'vue';
import ProductButton from './ProductButton.vue';

const isValidProduct = ref(true); // Changed to true by default since validation happens in content.ts

const containerStyle = computed<CSSProperties>(() => ({
  position: 'absolute',
  left: '-120px',
  top: '0',
  height: '100%',
  width: '120px', // Added explicit width
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center', // Added to center the button
  zIndex: '1000',
  pointerEvents: 'auto' // Changed from none to auto
}));

onMounted(() => {
  console.log('ProductContainer mounted');
  try {
    const container = document.querySelector('.product-container')?.parentElement;
    console.log('Container parent element:', container);
    
    if (!container) {
      console.error('Product container parent not found');
      return;
    }

    // Set container position to relative if not already
    const currentPosition = window.getComputedStyle(container).position;
    console.log('Current container position:', currentPosition);
    
    if (currentPosition === 'static') {
      container.style.position = 'relative';
      console.log('Container position set to relative');
    }

    // Force container to be visible
    container.style.overflow = 'visible';
    console.log('Container overflow set to visible');
  } catch (error) {
    console.error('Error in ProductContainer setup:', error);
  }
});
</script>

<style>
.product-container {
  pointer-events: auto !important;
  visibility: visible !important;
  opacity: 1 !important;
  display: flex !important;
}

.product-container > * {
  pointer-events: auto !important;
  visibility: visible !important;
  opacity: 1 !important;
}
</style> 