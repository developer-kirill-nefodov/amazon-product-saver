import { createApp } from 'vue';
import ProductButton from '../components/ProductButton.vue';

export function createProductButton(container: Element, imageContainer: Element) {
  try {
    const mountPoint = document.createElement('div');
    mountPoint.className = 'amz-button-container';
    
    const containerStyle = window.getComputedStyle(imageContainer as HTMLElement);
    if (containerStyle.position === 'static') {
      (imageContainer as HTMLElement).style.position = 'relative';
    }
    
    Object.assign(mountPoint.style, {
      position: 'absolute',
      top: '10px',
      right: '10px',
      zIndex: '1000',
      width: 'auto',
      minWidth: '100px',
      backgroundColor: 'transparent'
    });
    
    imageContainer.appendChild(mountPoint);
    
    const app = createApp(ProductButton, { 
      containerRef: container 
    });
    
    app.config.errorHandler = (err, instance, info) => {
      console.error('Vue Error:', err);
      console.error('Component:', instance);
      console.error('Error Info:', info);
    };
    
    app.mount(mountPoint);
    
  } catch (error) {
    console.error('Error creating product button:', error);
  }
} 