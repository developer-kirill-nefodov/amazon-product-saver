import { Product } from '#models/index';

class ProductService {
  async create(productData) {
    const { image, ...rest } = productData;
    return await Product.create({
      ...rest,
      image: image ? image.toString('base64') : null
    });
  }
}

export default new ProductService(); 