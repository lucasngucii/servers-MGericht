import { DocumentDefinition } from "mongoose";
import { Cart, CartModel, cartItem, CartSchema } from "../../models/carts/cart.model";
import { user, userModel } from "../../models/users/user.model";
import { Product, productModel } from "../../models/products/product.model";

export const addProductToCart = async (userId: string, productId: string) => {
  try {
    const user = await userModel.findById(userId).select("-password").exec();
    if (!user) throw new Error("User not found");
    const product = await productModel.findById(productId).exec();
    if (!product) throw new Error("Product not found");
    const itemAdded = await CartModel.findOne({ user_id: user._id, "items.product_id": product._id });
    
    if (itemAdded) { 
      

    }
    

    const newCart = {
      user_id: user._id,
      items: [
        {
          product_id: product._id,
          quantity: 1,
          price: product.price,
        },
      ],
    };
    const cart = await CartModel.create(newCart);
    await cart.save();
    return cart;
  } catch (error) {
    throw error;
  }
};
