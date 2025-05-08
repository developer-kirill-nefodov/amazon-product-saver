import express from "express";
import ProductController from "#controllers/product.controller";
import {
  validateProductStructure,
  validateProductWithAI,
} from "#middleware/openai.validator";
import {
  processFormData,
  parseFormData,
} from "#middleware/formData.middleware";

const router = express.Router();

router.post(
  "/",
  parseFormData,
  processFormData,
  // validateProductStructure,
  // validateProductWithAI,
  ProductController.create
);

export default router;
