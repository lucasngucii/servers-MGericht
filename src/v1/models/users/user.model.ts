import mongoose from "mongoose";
// Profile_UserSchema
/* export interface Profile_User extends mongoose.Document {
  fist_name: string;
  last_name: string;
  image: string;
  phone: string;
  address: string;
  sex: string;
  birthday: Date;
}
export const Profile_UserSchema: mongoose.Schema<Profile_User> = new mongoose.Schema(
  {
    fist_name: { type: String, required: true },
    last_name: { type: String, required: true },
    image: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    sex: { type: String, required: true },
    birthday: { type: Date, required: true },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
    collection: "Profile_User",
  }
); */
// role Schema
/* export interface Role_User extends mongoose.Document {
  title: string;
  active: boolean;
  description: string;
}
export const Role_UserSchema: mongoose.Schema<Role_User> = new mongoose.Schema(
  {
    title: { type: String, required: true },
    active: { type: Boolean, required: true },
    description: { type: String, required: true },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
    collection: "Role_User",
  }
); */

export interface User extends mongoose.Document {
  username: string;
  email: string;
  password: string;
  role: boolean;
  fist_name: string;
  last_name: string;
  image: string;
  phone: string;
  address: string;
  sex: string;
  birthday: Date;
}
export const UserSchema: mongoose.Schema<User> = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      minlength: 6,
      lowercase: true,
      trim: true,
      validate: {
        validator: (value: string) => {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        },
        message: "Email not valid",
      },
    },
    email: { type: String, required: true },
    password: { type: String, required: true, minlength: 6 },
    role: { type: Boolean, required: true, default: false },
    fist_name: { type: String, required: true },
    last_name: { type: String, required: true },
    image: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    sex: { type: String, required: true },
    birthday: { type: Date, required: true },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
    collection: "User",
  }
);
export const UserModel = mongoose.model<User>("User", UserSchema);
