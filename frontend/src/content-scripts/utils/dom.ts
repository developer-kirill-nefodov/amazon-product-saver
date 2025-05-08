export function isValidProductContainer(container: Element | null): boolean {
  if (!container) return false;
  
  const asin = container.getAttribute('data-asin');
  // const addToCartButton = container.querySelector('input[name="submit.addToCart"], button[name="submit.addToCart"]');
  // const price = container.querySelector('.a-price');

  // return !!(asin && addToCartButton && price);
  return !!(asin );
}
