import { DocumentDefinition } from "mongoose";
import { User, UserModel } from "../../models/users/user.model";
import bcrypt from "bcrypt";
export const register = async (user: DocumentDefinition<User>): Promise<any> => {
  try {
    const userFound = await UserModel.findOne({ username: user.username });
    if (userFound) {
      throw new Error("usename or email already exists");
    }
    // hashing passwords
    const hashedPassword = await bcrypt.hash(user.password, 8);
    const newUser = new UserModel( {
      id: user.id,
      username: user.username,
      email: user.email.toLowerCase(),
      password: hashedPassword,
      role: user.role,
      
    });
    //create a new user object
    const dbUser = await newUser.save();
  } catch (error) {
    throw error;
  }
};
