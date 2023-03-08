import { DocumentDefinition, Types } from "mongoose";
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
    // get token
    const token = getTokenUser(foundUser);
    return { user: foundUser, token };
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
    return newUser;
  } catch (error) {
    throw error;
  }
};
// get all users
export const getUsers = async () => {
  try {
    const foundUser = await userModel.find();
    !foundUser && new Error("User not found");
    return foundUser;
  } catch (error) {
    throw error;
  }
};
export const getUserById = async (id: string) => {
  try {
    const foundUser = await userModel.findById(id);
    !foundUser && new Error("User not found");
    return foundUser;
  } catch (error) {
    throw error;
  }
};
export const deleteUser = async (id: string) => {
  try {
    const deleteUser = await userModel.findByIdAndDelete(id);
    !deleteUser && new Error("User not found");
    return deleteUser;
  } catch (error) {
    throw error;
  }
};
export const updateUser = async (id: string, user: DocumentDefinition<user>) => {
  try {
    const foundUser = await userModel.findByIdAndUpdate(
      id,
      {
        password: user?.password,
        first_name: user?.first_name,
        last_name: user?.last_name,
        phone: user?.phone,
        address: user?.address,
      },
      { new: true }
    );
    !foundUser && new Error("User not found");
    console.log(foundUser);
    return foundUser;
  } catch (error) {
    throw error;
  }
};
export const changePassword = async (id: string, currentPassword: string, newPassword: string) => {
  try {
  } catch (error) {
    throw error;
  }
};

export const logout = async (user: DocumentDefinition<user>) => {
  try {
  } catch (error) {
    throw error;
  }
};
