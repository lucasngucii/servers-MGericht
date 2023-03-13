import mongoose from "mongoose";

export interface Address extends mongoose.Document {
  lna: string;
  lng: string;
  street: string;
  city: string;
  state: string;
}
export const AddressSchema: mongoose.Schema<Address> = new mongoose.Schema(
  {
    lna: { type: String, required: true, trim: true },
    lng: { type: String, required: true, trim: true },
    street: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true },
    state: { type: String, required: true, trim: true },
  },
  {
    timestamps: true,
  }
);
export const AddressModel: mongoose.Model<Address> = mongoose.model<Address>("Address", AddressSchema);
export interface user extends mongoose.Document {
  email: string;
  username: string;
  password: string;
  first_name: string;
  last_name: string;
  phone: number;
  address: Address[];
  role: boolean;
  refreshToken: string;
  createdAt: Date;
}
export const userSchema: mongoose.Schema<user> = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    username: { type: String, required: true, unique: true, lowercase: true, trim: true, minlength: 6 },
    password: { type: String, required: true, trim: true, minlength: 8 },
    first_name: { type: String, required: true, trim: true },
    last_name: { type: String, required: true, trim: true },
    phone: { type: Number, required: true, trim: true },
    address: { type: [AddressSchema], required: true, trim: true },
    refreshToken: { type: String, trim: true, default: "" },
    role: { type: Boolean, required: true, trim: true },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    collection: "users",
  }
);
export const userModel: mongoose.Model<user> = mongoose.model("user", userSchema);
