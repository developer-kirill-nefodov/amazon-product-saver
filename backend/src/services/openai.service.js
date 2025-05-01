import OpenAI from 'openai';
import dotenv from 'dotenv';

import { safeJsonParse } from "#utils/safe-json-parse";

dotenv.config();

class OpenAIService {
  constructor() {
    this.client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async validateProduct(productData, imageBase64) {
    try {
      const prompt = `
        You are a product validation expert. Your task is to compare provided product data with the product image and return a valid JSON object with the following exact structure:
        
        {
          "title": { "full": "string", "brand": "string", "model": "string" },
          "price": { "current": "string", "original": "string", "currency": "string", "deals": [] },
          "specifications": {
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
          "ratings": { "average": "number", "count": "number", "distribution": {} },
          "shipping": { delivery: { date: '', location: '' }, price: '' },
          "identifiers": { "asin": "string", "url": "string" },
          "image": "string"
        }
        
        - If some data is missing or unclear, leave the field empty (e.g. "" for strings, {} or [] for objects/arrays).
        - Do not add or remove fields.
        - The structure must match exactly.
        - Use the image to correct or complete missing product information, if possible.
        - If the image is not sufficient for any field, leave it blank.
        
        Product data:
        ${JSON.stringify(productData, null, 2)}
        
        Compare this with the provided image and return the completed product JSON.
        Only return the final JSON object and nothing else.
      `;


      const messages = [
        {
          role: "system",
          content: "You are a product validation expert. Your task is to validate product data and provide detailed feedback."
        },
        {
          role: "user",
          content: prompt
        }
      ];

      if (imageBase64) {
        messages.push({
          role: "user",
          content: [
            {
              type: "image_url",
              image_url: { url: imageBase64 }
            }
          ]
        });
      }

      const response = await this.client.chat.completions.create({
        model: "gpt-4o",
        messages,
      });

      return safeJsonParse(response.choices[0].message.content);
    } catch (error) {
      console.error('OpenAI API Error:', error);
      throw new Error('Failed to validate product with OpenAI');
    }
  }
}

export default new OpenAIService();