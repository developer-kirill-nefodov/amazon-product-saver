import { ref } from "vue";
import type { ProductData } from "../types/Product";
import { cleanObject } from "../utils/cleanObject";

export function useProductData() {
  const productData = ref<ProductData | null>(null);

  const extractProductData = (element: HTMLElement): ProductData | null => {
    try {
      // Initialize empty product data
      const data: ProductData = {
        title: { title: "" },
        price: { current: "", currency: "" },
        ratings: { average: 0 },
        identifiers: { asin: "", url: "" },
        image: "",
      };

      // Get ASIN
      const asin = element.getAttribute("data-asin");
      if (!asin) {
        console.error("No ASIN found");
        return null;
      }
      data.identifiers.asin = asin;

      //Get url
      const titleRecipeEl = element.querySelector('[data-cy="title-recipe"] a');
      if (titleRecipeEl) {
        const relativeUrl = titleRecipeEl.getAttribute("href") || "";
        const fullUrl = new URL(relativeUrl, window.location.href).href;
        data.identifiers.url = fullUrl;
      }

      //Title
      const titleEl = element.querySelector("h2[aria-label]");
      const fullTitle = titleEl?.getAttribute("aria-label")?.trim() || "";
      data.title.title = fullTitle;

      //Price
      const priceContainer = element.querySelector(
        'a[aria-describedby="price-link"] .a-price'
      );

      if (priceContainer) {
        const priceSymbol =
          priceContainer
            .querySelector(".a-price-symbol")
            ?.textContent?.trim() || "$";
        const priceWhole =
          priceContainer
            .querySelector(".a-price-whole")
            ?.textContent?.replace(/[.,]/g, "")
            .trim() || "";
        const priceFraction =
          priceContainer
            .querySelector(".a-price-fraction")
            ?.textContent?.trim() || "0";

        const priceCurrent = `${priceSymbol}${priceWhole}.${priceFraction}`;

        data.price.current = priceCurrent || "0";
        data.price.currency = priceSymbol || "$";
      } else {
        data.price.current = "0";
        data.price.currency = "$";
      }

      // Rating
      const ratingEl = element.querySelector(
        '[data-cy="reviews-ratings-slot"] .a-icon-alt'
      );
      if (ratingEl) {
        const ratingText = ratingEl.textContent?.trim();
        const ratingMatch = ratingText?.match(/([\d.]+)\s+out of 5/);
        if (ratingMatch) {
          if (!data.ratings) {
            data.ratings = { average: 0 };
          }
          data.ratings.average = parseFloat(ratingMatch[1]);
        }
      }

      //Get Img
      const imageContainer = element.querySelector(
        'span[data-component-type="s-product-image"] img'
      );

      if (imageContainer) {
        const imageUrl = imageContainer.getAttribute("src") || "";
        data.image = imageUrl;
      } else {
        data.image = "";
      }

      //Get colors
      const colorSwatches = document.querySelectorAll(
        `div[data-asin="${asin}"] div[data-csa-c-content-id="color-swatch-link"] a.a-link-normal`
      );

      const colors: string[] = []; // Temporary array to collect colors
      colorSwatches.forEach((swatch) => {
        const ariaLabel = (swatch as HTMLElement).getAttribute("aria-label");
        if (ariaLabel) {
          colors.push(ariaLabel);
        }
      });

      // Only add colors to data if the array is not empty
      if (colors.length > 0) {
        data.colors = colors;
      }

      console.log("Extracted product data:", data);

      return cleanObject(data) as ProductData;
    } catch (error) {
      console.error("Error extracting product data:", error);
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
    updateProductData,
  };
}
