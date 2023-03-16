
import { DocumentDefinition } from "mongoose"
import { Cart, CartModel } from '../../models/carts/cart.model';
import { user, userModel } from '../../models/users/user.model';
import { Product, productModel } from "../../models/products/product.model"

export const addProductToCart = async (userId: string, productId: string) => {
    try {
        const user = await userModel.findById(userId).select("-password").exec();
        if (!user) throw new Error("User not found");
        const product = await productModel.findById(productId).exec();
        if (!product) throw new Error("Product not found");
     
        
    } catch (error) {
        throw error;
    }
} 