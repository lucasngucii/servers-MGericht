import mongoose from "mongoose";

export const validateID = (id: string) => { 
    const isValid = mongoose.Types.ObjectId.isValid(id);
    !isValid && new Error("Invalid ID");
}
