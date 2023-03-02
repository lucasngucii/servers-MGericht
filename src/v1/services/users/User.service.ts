import { DocumentDefinition } from 'mongoose';
import { user, userModel } from '../../models/users/user.model';

export const login = async (user: DocumentDefinition<user>) => {
  try {
    //check if user exists
    !user && new Error("User not found");
    //check if password is correct
    const foundUser = await userModel.findOne({ username: user.username });
    if(!foundUser) {
      throw new Error("User not found"); 
    }
    /* const isMatch = await foundUser.comparePassword(user.password); */
    return foundUser;
  } catch (error) {
    throw error;
  }
}
export const register = async (user: DocumentDefinition<user>) => {
  try {
    return await userModel.create(user);
  } catch (error) {
    throw error;
  }
 }