import mongoose from 'mongoose';

export type cart = {
   productId: string;
   quantity: number;
};
export type Address = {
   lna: string;
   lng: string;
   street: string;
   city: string;
   state: string;
};

export interface user extends mongoose.Document {
   email: string;
   username: string;
   password: string;
   first_name: string;
   last_name: string;
   phone: number;
   address: Address[];
   role: boolean;
   token: string;
   cart: cart[];
   createdAt: Date;
}
export const userSchema: mongoose.Schema<user> = new mongoose.Schema(
   {
      email: { type: String, required: true, unique: true, lowercase: true, trim: true },
      username: {
         type: String,
         required: true,
         unique: true,
         lowercase: true,
         trim: true,
         minlength: 6,
      },
      password: { type: String, required: true, trim: true, minlength: 8 },
      first_name: { type: String, required: true, trim: true },
      last_name: { type: String, required: true, trim: true },
      phone: { type: Number, required: true, trim: true },
      address: {
         type: [
            {
               lna: { type: String, required: true, trim: true },
               lng: { type: String, required: true, trim: true },
               street: { type: String, required: true, trim: true },
               city: { type: String, required: true, trim: true },
               state: { type: String, required: true, trim: true },
            },
         ],
         trim: true,
      },
      token: { type: String, trim: true, default: '' },
      role: { type: Boolean, trim: true, default: false },
      cart: {
         type: [
            {
               productId: {
                  type: mongoose.Schema.Types.ObjectId,
                  ref: 'Cart',
                  required: true,
               },
               quantity: { type: Number, required: true },
            },
         ],
         default: [],
      },
   },
   {
      timestamps: true,
      toJSON: { virtuals: true },
      toObject: { virtuals: true },
      collection: 'users',
   }
);
export const userModel: mongoose.Model<user> = mongoose.model('user', userSchema);
