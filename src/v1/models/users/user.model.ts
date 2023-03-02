import mongoose from "mongoose";

export interface user extends mongoose.Document {
  email: string;
  username: string;
  password: string;
  first_name: string;
  last_name: string;
  phone: number;
  address: string[];
  role: boolean;
  createdAt: Date;
}
export const userSchema: mongoose.Schema<user> = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    username: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, trim: true },
    first_name: { type: String, required: true, trim: true },
    last_name: { type: String, required: true, trim: true },
    phone: { type: Number, required: true, trim: true },
    address: { type: [String], required: true, trim: true },
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
