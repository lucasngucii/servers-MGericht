import mongoose, { ObjectId } from 'mongoose';

export interface CartItem {
   productId: ObjectId;
   quantity: number;
   price: number;
   total: number;
}

export interface Cart extends mongoose.Document {
   user_Id: ObjectId;
   productList: CartItem[];
}

export const CartSchema: mongoose.Schema<Cart> = new mongoose.Schema(
   {
      user_Id: { type: mongoose.Types.ObjectId, ref: 'User' },
      productList: [
         {
            productId: { type: mongoose.Types.ObjectId, ref: 'Product' },
            quantity: { type: Number },
            price: { type: Number },
         },
      ],
   },
   {
      timestamps: true,
      toJSON: { virtuals: true },
      toObject: { virtuals: true },
      collection: 'carts',
   }
);

CartSchema.virtual('total').get(function () {
   return this.productList.reduce((total, item) => total + item.price * item.quantity, 0);
});
export const cartModel: mongoose.Model<Cart> = mongoose.model('Cart', CartSchema);
