import html2canvas from 'html2canvas';

export function useScreenshot() {
  async function captureElement(element: HTMLElement): Promise<string> {
    try {
      // Save original styles
      const originalStyles = new Map();
      originalStyles.set('position', element.style.position);
      originalStyles.set('transform', element.style.transform);
      originalStyles.set('zIndex', element.style.zIndex);

      // Ensure element is properly positioned for screenshot
      element.style.position = 'relative';
      element.style.transform = 'none';
      element.style.zIndex = '1';

      // Take screenshot with high quality settings
      const canvas = await html2canvas(element, {
        logging: false,
        useCORS: true,
        allowTaint: true,
        onclone: (clonedDoc: Document) => {
          // Find and hide the button in the cloned document
          const clonedElement = clonedDoc.body.querySelector('.amz-button-container');
          if (clonedElement) {
            (clonedElement as HTMLElement).style.display = 'none';
          }
        }
      });

      // Restore original styles
      originalStyles.forEach((value, key) => {
        element.style[key] = value;
      });

      // Convert to high quality JPEG
      return canvas.toDataURL('image/jpeg', 0.95);
    } catch (error) {
      console.error('Error capturing screenshot:', error);
      throw error;
    }
  }

  return {
    captureElement
  };
} 