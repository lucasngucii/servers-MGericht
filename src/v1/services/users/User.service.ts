import { DocumentDefinition } from "mongoose";
import { User, UserModel } from "../../models/users/user.model";
import bcrypt from "bcrypt";
export const register = async (user: DocumentDefinition<User>): Promise<any> => {
  try {
    
    const foundUser = await UserModel.findOne({ email: user.email });
    if (foundUser) { 
      throw new Error("User already exists");
    }
    //hashing password
    const hashedPassword = await bcrypt.hash(user.password, 10);
     //create a new user object
    const newUser = await UserModel.create({ ...user, password: hashedPassword });
    await newUser.save();
   
    
  } catch (error) {
    throw error;
  }
};
