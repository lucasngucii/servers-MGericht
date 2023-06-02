import { DocumentDefinition, Types } from 'mongoose';
import { user, userModel } from '../../models/users/user.model';
import bcrypt from 'bcrypt';
import { generateRefreshToken } from '../../middlewares/jwt/refreshToken';
import nodemailer from 'nodemailer';
import configs from '../../configs';
import jwt from 'jsonwebtoken';

export const login = async (user: DocumentDefinition<user>) => {
   try {
      //check if user exists
      !user && new Error('User not found');
      //check if password is correct
      const foundUser = await userModel.findOne({ username: user.username });
      if (!foundUser) {
         throw new Error('User not found');
      }
      const isMatch = await bcrypt.compareSync(user.password, foundUser.password);
      if (!isMatch) {
         throw new Error('Incorrect password');
      }
      const refreshToken = generateRefreshToken(foundUser._id);
      // get and save token
      await userModel.findByIdAndUpdate(
         foundUser._id,
         { verificationToken: refreshToken },
         { new: true }
      );
      return { user: foundUser, refreshToken };
   } catch (error) {
      throw error;
   }
};

export const register = async (user: DocumentDefinition<user>) => {
   const bcrypt_salt = parseInt(process.env.BCRYPT_SALT as string);
   try {
      // check if user exists
      const foundUser = await userModel.findOne({ username: user.username });
      if (foundUser) {
         throw new Error('User already exists');
      }
      // hash password
      const hashedPassword = bcrypt.hashSync(user.password, bcrypt_salt);
      // generate verification token
      const verificationToken = generateRefreshToken(user._id);
      // create new user
      const newUser = await userModel.create({
         ...user,
         password: hashedPassword,
         verificationToken,
      });

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
      !foundUser && new Error('User not found');
      return foundUser;
   } catch (error) {
      throw error;
   }
};

export const getUserById = async (id: string) => {
   try {
      const foundUser = await userModel.findById(id);
      !foundUser && new Error('User not found');
      return foundUser;
   } catch (error) {
      throw error;
   }
};

export const getUserByTokenAndUpdate = async (token: string) => {
   try {
      const foundUser = await userModel.findOneAndUpdate(
         { refreshToken: token },
         { refreshToken: '' }
      );
      !foundUser && new Error('User not found');
      return foundUser;
   } catch (error) {
      throw error;
   }
};

export const getUserByUsername = async (username: string) => {
   try {
      const foundUser = await userModel.findOne({ username });
      !foundUser && new Error('User not found');
      return foundUser;
   } catch (error) {
      throw error;
   }
};

export const deleteUser = async (id: string) => {
   try {
      const deleteUser = await userModel.findByIdAndDelete(id);
      !deleteUser && new Error('User not found');
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
      !foundUser && new Error('User not found');
      console.log(foundUser);
      return foundUser;
   } catch (error) {
      throw error;
   }
};

export const changePassword = async (
   id: string,
   currentPassword: string,
   newPassword: string
) => {
   try {
      const foundUser = await userModel.findById(id);
      if (!foundUser) {
         throw new Error('User not found');
      }
      console.log({ user: foundUser });
      const isMatch = await bcrypt.compareSync(currentPassword, foundUser.password);
      !isMatch && new Error('Incorrect password');
      const hashedPassword = bcrypt.hashSync(newPassword, 10);
      await userModel.findByIdAndUpdate(id, { password: hashedPassword }, { new: true });
   } catch (error) {
      throw error;
   }
};
export const changePasswordForget = async (email: string, newPassword: string) => {
   try {
      const foundUser = await userModel.findOne({ email });
      if (!foundUser) {
         throw new Error(`User with email ${email} not found`);
      }
   } catch (error) {}
};
export const logout = async (token: string) => {
   try {
      console.log(token);
      const foundUser = await userModel.findOneAndUpdate({ token: token }, { token: '' });
      return foundUser;
   } catch (error) {
      throw error;
   }
};

export const getUserByRefreshToken = async (refreshToken: string) => {
   try {
      const foundUser = await userModel.findOne({ token: refreshToken });
      console.log({ foundUser });
      return foundUser;
   } catch (error) {
      throw error;
   }
};
export const getUserByEmail = async (user: DocumentDefinition<user>) => {
   try {
      const foundUser = await userModel.findOne({ email: user.email });
      return foundUser;
   } catch (error) {
      throw error;
   }
};

export const blockUser = async (id: string) => {
   try {
      const blockUser = await userModel.findByIdAndUpdate(
         id,
         {
            isBlocked: true,
         },
         {
            new: true,
         }
      );
      !blockUser && new Error('User not found');
      return blockUser;
   } catch (error) {
      throw error;
   }
};
export const unblockUser = async (id: string) => {
   try {
      const unBlockUser = await userModel.findByIdAndUpdate(
         id,
         { isBlocked: false },
         { new: true }
      );
      !unBlockUser && new Error('User not found');
      return unBlockUser;
   } catch (error) {
      throw error;
   }
};

export const verifyEmail = async (verificationToken: string) => {
   try {
      const decodedToken: any = jwt.verify(
         verificationToken,
         process.env.JWT_SECRET as string
      );
      const { email } = decodedToken;
      const User = await userModel.findOneAndUpdate(
         { email, verificationToken: verificationToken },
         { isVerified: true, verificationToken: null },
         { new: true }
      );
      !User && new Error('User not found');
      return User;
   } catch (error) {
      throw error;
   }
};

// customer
export const getCustomerById = async (id: string) => {
   try {
      const customer = await userModel.findById(id);
      return customer;
   } catch (error) {
      throw error;
   }
};


export const getAllCustomer = async () => {
   try {
      const customer = await userModel.find({ role: "Customer" });
      return customer;
   } catch (error) {
      throw error;
   }
};

