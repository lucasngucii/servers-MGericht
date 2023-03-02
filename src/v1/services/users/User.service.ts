import { DocumentDefinition } from "mongoose";
import { user, userModel } from "../../models/users/user.model";
import bcrypt from "bcrypt";
import { getTokenUser } from "../../utils/tokens/token";

export const login = async (user: DocumentDefinition<user>) => {
  try {
    //check if user exists
    !user && new Error("User not found");
    //check if password is correct
    const foundUser = await userModel.findOne({ username: user.username });
    if (!foundUser) {
      throw new Error("User not found");
    }
    const isMatch = await bcrypt.compareSync(user.password, foundUser.password);
    if (!isMatch) {
      throw new Error("Incorrect password");
    }

    return foundUser;
  } catch (error) {
    throw error;
  }
};
export const register = async (user: DocumentDefinition<user>) => {
  try {
    const foundUser = await userModel.findOne({ username: user.username });
    if (foundUser) {
      throw new Error("User already exists");
    }
    // hash password
    const hashedPassword = bcrypt.hashSync(user.password, 10);
    // create new user
    const newUser = await userModel.create({ ...user, password: hashedPassword });
    await newUser.save();
    // get token
    const token = getTokenUser(newUser);
    return { user: newUser, token };
  } catch (error) {
    throw error;
  }
};
