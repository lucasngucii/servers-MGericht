import { DocumentDefinition } from "mongoose"
import { Cart, CartModel } from '../../models/carts/cart.model';
import { user, userModel } from '../../models/users/user.model';
import { Product, productModel } from "../../models/products/product.model"
export const createCart = async (id: string, cart: DocumentDefinition<Cart> ) => { 
    try {
        // check id user exists
        const userCheck = await userModel.findById(id)
        if (!userCheck) { 
            throw new Error("User not found")
        }
        // check 
    } catch (error) {
        throw error
    }
} 