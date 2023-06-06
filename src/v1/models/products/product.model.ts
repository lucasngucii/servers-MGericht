import mongoose from 'mongoose';
import { user } from '../users/user.model';

export type RatingTypes = {
   userId: string;
   rate: number;
   comment: string;
};
export type Tags = {
   name: string;
   description: string;
};
export interface Product extends mongoose.Document {
   name: string;
   price: number;
   description: string;
   image: string;
   category: string;
   //rating: RatingTypes[];
   //tags: Tags[];
}
export const ProductSchema: mongoose.Schema<Product> = new mongoose.Schema(
   {
      name: { type: String, required: true },
      price: { type: Number, required: true, min: 0 },
      description: { type: String, required: true },
      image: { type: String, required: true },
      category: { type: String, required: true },
      //rating: [{ type: String }],
      //tags: [{ type: String, required: true }],
   },
   {
      timestamps: true,
      toJSON: { virtuals: true },
      toObject: { virtuals: true },
      collection: 'products',
   }
);

export const productModel: mongoose.Model<Product> = mongoose.model(
   'Product',
   ProductSchema
);
