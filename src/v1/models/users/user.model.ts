import mongoose from "mongoose";

export interface user extends mongoose.Document {
  email: string;
  username: string;
  password: string;
}
export const userSchema: mongoose.Schema<user> = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});
export const userModel: mongoose.Model<user> = mongoose.model("user", userSchema);
