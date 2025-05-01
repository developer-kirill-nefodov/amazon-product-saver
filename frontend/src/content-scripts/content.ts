import { isValidProductContainer } from './utils/dom';
import { createProductButton } from './utils/buttons';

let isProcessing = false;

function addButtonsToProducts() {
  if (isProcessing) return;
  isProcessing = true;

  try {
    const productContainers = document.querySelectorAll('[data-asin].s-result-item');
    
    const validProducts = Array.from(productContainers).filter(container => {
      if (container.querySelector('.amz-button-container')) {
        return false;
      }
      return isValidProductContainer(container);
    });

    validProducts.forEach((container) => {
      const imageContainer = container.querySelector('.s-product-image-container');
      if (imageContainer) {
        createProductButton(container, imageContainer);
      }
    });

  } catch (error) {
    console.error('Error in addButtonsToProducts:', error);
  } finally {
    isProcessing = false;
  }
}

// Initial load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', addButtonsToProducts);
} else {
  addButtonsToProducts();
}

// Setup observer for dynamic content
const observer = new MutationObserver((mutations) => {
  const shouldProcess = mutations.some(mutation => {
    if ((mutation.target as Element).classList?.contains('amz-button-container')) {
      return false;
    }

    return mutation.addedNodes.length > 0 && (
      (mutation.target as Element).classList?.contains('s-result-list') ||
      (mutation.target as Element).classList?.contains('s-search-results') ||
      (mutation.target as Element).classList?.contains('puis-list-col-right')
    );
  });

  if (shouldProcess) {
    addButtonsToProducts();
  }
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});

setTimeout(addButtonsToProducts, 1000);

export {}; 