import { DocumentDefinition } from "mongoose";
import { user } from "../../models/users/user.model";
import jwt from "jsonwebtoken";
export const getTokenUser =  (user: DocumentDefinition<user>) => {
  try {
    const expiresIn = "1d";
    const secret = process.env.JWT_SECRET || "secret-key";
    const token = jwt.sign({ user }, secret, { expiresIn });
    return { token };
  } catch (error) {
      throw error;
  }
};
