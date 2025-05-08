import { body, validationResult } from "express-validator";

import openAIService from "#services/openai.service";

export const validateProductStructure = [
  body("data")
    .exists()
    .withMessage("Product data is required")
    .isObject()
    .withMessage("Product data must be an object"),

  body("data.price.current")
    .exists()
    .withMessage("Current price is required")
    .isString()
    .withMessage("Current price must be a string"),

  body("data.price.currency")
    .exists()
    .withMessage("Currency is required")
    .isString()
    .withMessage("Currency must be a string"),

  body("data.identifiers.asin")
    .exists()
    .withMessage("ASIN is required")
    .isString()
    .withMessage("ASIN must be a string"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export const validateProductWithAI = async (req, res, next) => {
  try {
    const productData = req.body.data;
    const imageBase64 = req.body.image;

    req.product = await openAIService.validateProduct(productData, imageBase64);
    next();
  } catch (error) {
    console.error("AI Validation Error:", error);
    res.status(500).json({
      message: "Failed to validate product",
      error: error.message,
    });
  }
};
