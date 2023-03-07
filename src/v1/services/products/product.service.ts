import { DocumentDefinition } from "mongoose";
import { Product, productModel } from "../../models/products/product.model";
export const getAllProduct = async () => {
  try {
    const productFound = await productModel.find();
    !productFound && new Error("Product not found");
    return productFound;
  } catch (error) {
    throw error;
  }
};
export const getProductById = async (id: string) => {};
export const createProduct = async (product: DocumentDefinition<Product>) => {
  try {
    !product && new Error("Product not found");
    const newProduct = await productModel.create(product);
    await newProduct.save();
  } catch (error) {
    throw error;
  }
};
