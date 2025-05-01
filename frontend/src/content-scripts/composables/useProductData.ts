import { ref } from 'vue';
import type { ProductData } from '../types/Product';
import { cleanObject } from '../utils/cleanObject';

export function useProductData() {
  const productData = ref<ProductData | null>(null);

  const extractProductData = (element: HTMLElement): ProductData | null => {
    try {
      // Initialize empty product data
      const data: ProductData = {
        title: { full: '', brand: '', model: '' },
        price: { current: '', currency: '' },
        specifications: {
          display: { size: '', type: '', resolution: '' },
          memory: { ram: '', storage: '', expandable: '' },
          battery: { capacity: '', type: '' },
          camera: { main: '', front: '' },
          os: { name: '', version: '' },
          network: { type: '', features: [] },
          dimensions: '',
          color: '',
          features: []
        },
        ratings: { average: 0, count: 0 },
        shipping: { delivery: { date: '', location: '' }, price: '' },
        identifiers: { asin: '', url: '' }
      };

      // Get ASIN
      const asin = element.getAttribute('data-asin');
      if (!asin) {
        console.error('No ASIN found');
        return null;
      }
      data.identifiers.asin = asin;

      // Get title
      const titleElement = element.querySelector('h2 a span, h2 span.a-text-normal');
      if (titleElement) {
        const fullTitle = titleElement.textContent?.trim() || '';
        data.title.full = fullTitle;

        // Brand detection
        if (fullTitle.includes('Apple')) data.title.brand = 'Apple';
        else if (fullTitle.includes('Samsung')) data.title.brand = 'Samsung';
        
        // Model extraction (everything after brand name)
        if (data.title.brand) {
          data.title.model = fullTitle.split(data.title.brand)[1]?.trim() || '';
        }

        // Extract specifications from title
        const specs = {
          display: fullTitle.match(/(\d+\.?\d+)(?:\s*-?\s*inch|″)/i),
          ram: fullTitle.match(/(\d+)\s*GB\s*RAM/i) || fullTitle.match(/(\d+)GB\/\d+GB/i),
          storage: fullTitle.match(/(\d+)\s*GB(?:\s+storage|\s+ROM|\s*$)/i) || fullTitle.match(/\d+GB\/(\d+)GB/i),
          battery: fullTitle.match(/(\d+)\s*mAh/i),
          camera: fullTitle.match(/(\d+)MP/i),
          screenType: fullTitle.match(/(HD|FHD|QHD|AMOLED|LCD)/i)
        };

        if (specs.display && data.specifications?.display) {
          data.specifications.display.size = specs.display[1] + '"';
        }
        if (specs.screenType && data.specifications?.display) {
          data.specifications.display.type = specs.screenType[0];
        }
        if (specs.ram && data.specifications?.memory) {
          data.specifications.memory.ram = specs.ram[1] + 'GB';
        }
        if (specs.storage && data.specifications?.memory) {
          data.specifications.memory.storage = specs.storage[1] + 'GB';
        }
        if (specs.battery && data.specifications?.battery) {
          data.specifications.battery.capacity = specs.battery[1] + 'mAh';
        }
        if (specs.camera && data.specifications?.camera) {
          data.specifications.camera.main = specs.camera[1] + 'MP';
        }
      }

      // Get price
      const priceWhole = element.querySelector('.a-price-whole');
      const priceFraction = element.querySelector('.a-price-fraction');
      const currencySymbol = element.querySelector('.a-price-symbol');
      
      if (priceWhole && priceFraction) {
        const whole = priceWhole.textContent?.trim() || '0';
        const fraction = priceFraction.textContent?.trim() || '00';
        const currency = currencySymbol?.textContent?.trim() || '$';
        data.price.current = `${currency}${whole}.${fraction}`;
        data.price.currency = currency;
      }

      // Get ratings
      const ratingElement = element.querySelector('.a-icon-star-small');
      if (ratingElement && data.ratings) {
        const ratingText = ratingElement.getAttribute('aria-label') || '';
        const ratingMatch = ratingText.match(/([\d.]+)/);
        if (ratingMatch) {
          data.ratings.average = parseFloat(ratingMatch[1]);
        }
      }

      // Get review count
      const reviewCount = element.querySelector('.a-size-base.s-underline-text');
      if (reviewCount && data.ratings) {
        const countText = reviewCount.textContent?.trim() || '';
        const countMatch = countText.match(/(\d+)/);
        if (countMatch) {
          data.ratings.count = parseInt(countMatch[1], 10);
        }
      }

      // Get URL
      const productLink = element.querySelector('h2 a.a-link-normal') as HTMLAnchorElement;
      if (productLink) {
        data.identifiers.url = productLink.href;
      }

      // Get image URL for screenshot backup
      const imageElement = element.querySelector('img.s-image');
      if (imageElement && data.specifications?.features) {
        const imageUrl = imageElement.getAttribute('src');
        if (imageUrl) {
          data.specifications.features.push(`Image: ${imageUrl}`);
        }
      }

      return cleanObject(data) as ProductData;
    } catch (error) {
      console.error('Error extracting product data:', error);
      return null;
    }
  };

  const updateProductData = (element: HTMLElement): ProductData | null => {
    const data = extractProductData(element);
    productData.value = data;
    return data;
  };

  return {
    productData,
    updateProductData
  };
} 