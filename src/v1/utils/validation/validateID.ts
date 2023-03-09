import mongoose from "mongoose";

const validateID = (id: string) => { 
    const isValid = mongoose.Types.ObjectId.isValid(id);
    !isValid && new Error("Invalid ID");
}
module.exports = validateID;