import ProductService from "#services/product.service";

class ProductController {
  async create(req, res) {
    try {
      const product = await ProductService.create(req.product);

      res.status(201).json({
        message: "Product created successfully",
        product,
      });
    } catch (error) {
      console.error("Error creating product:", error);
      res.status(500).json({
        message: "Failed to create product",
        error: error.message,
      });
    }
  }
}

export default new ProductController();
