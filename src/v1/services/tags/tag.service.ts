import { tagModel } from "../../models/tags/tag.model";
export const getAllProductByTags = async (tags: string[]) => { 
    try {
        const tagsProduct = await tagModel.find({ name: { $in: tags } }).populate("product_id");
        console.log(tagsProduct);
    } catch (error) {
        throw error;
    }
}