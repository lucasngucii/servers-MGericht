import mongoose from 'mongoose';
import { Product, ProductSchema } from '../products/product.model';

export interface MenuItem {
   productId: mongoose.Types.ObjectId;
   productName?: string;
   productImage?: string;
}

export interface Menu extends mongoose.Document {
   name: string;
   description: string;
   productList: MenuItem[];
}
export const MenuSchema: mongoose.Schema<Menu> = new mongoose.Schema(
   {
      name: { type: String, required: true },
      description: { type: String, required: true },
      productList: [
         {
            productId: { type: mongoose.Types.ObjectId, ref: 'Product' },
            productName: { type: String },
            productImage: { type: String },
         },
      ],
   },
   {
      timestamps: true,
      toJSON: { virtuals: true },
      toObject: { virtuals: true },
      collection: 'menus',
   }
);

MenuSchema.pre<Menu>('findOne', function (next) {
   this.populate('productList.productId', 'name image');
   next();
});

export const menuModel: mongoose.Model<Menu> = mongoose.model('Menu', MenuSchema);


