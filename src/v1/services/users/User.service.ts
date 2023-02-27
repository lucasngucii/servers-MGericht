import { DocumentDefinition } from "mongoose";
import { User, UserModel } from "../../models/users/user.model";
import bcrypt from "bcrypt";
export const register = async (user: DocumentDefinition<User>): Promise<any> => {
  try {
    const FoundUser = await UserModel.findOne({ username: user.username });
    if (FoundUser) {
      throw new Error("User already exists");
    }
    // hash password
    const hashedPassword = await bcrypt.hash(user.password, 8);
    // new user
    const newUser = new UserModel({
      username: user.username.toLowerCase(),
      email: user.email.toLowerCase(),
      password: hashedPassword,
    });
    await newUser.save();
  } catch (error) {
    throw error;
  }
};
