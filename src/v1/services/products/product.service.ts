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
export const getProductById = async (id: string) => {
  try {
    !id && new Error("id not in params");
    const product = await productModel.findById(id);
    !product && new Error("Product not found");
    return product;
  } catch (error) {
    throw error;
  }
};
export const createProduct = async (product: DocumentDefinition<Product>) => {
  try {
    !product && new Error("Product not found");
    // check if product exist
    const productFound = await productModel.findOne({ name: product.name });
    if (productFound) throw new Error("Product already exist");
    // create new product
    const newProduct = await productModel.create(product);
    await newProduct.save();
  } catch (error) {
    throw error;
  }
};
export const updateProduct = async (id: string, product: DocumentDefinition<Product>) => {
  try {
    !id && !product && new Error("id or product not in params");
    const updatedProduct = await productModel.findByIdAndUpdate(id, product, { new: true });
    !updatedProduct && new Error("Product not found");
    return updatedProduct;
  } catch (error) {
    throw error;
  }
};

export const deleteProduct = async (id: string) => {
  try {
    const product = await productModel.findByIdAndDelete(id);
    !product && new Error("Product not found");
    return product;
  } catch (error) {
    throw error;
  }
};
export const searchKeyword = async (keyword: string) => {
  try {
    const product = await productModel.findOne({
      $or: [
        { name: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    });
    !product && new Error("Product not found");
    return product;
  } catch (error) {
    throw error;
  }
};
