import { Request, Response, NextFunction } from 'express';
import { HTTP_INTERNAL_SERVER_ERROR } from '../../constants/http-status/http_status';
import { getErrorMessage } from '../../utils/error/errorMessage';
import * as tagService from '../../services/tags/tag.service';
export const getAllProductByTags = async (req: Request, res: Response, next: NextFunction) => { 
    try {
        const { tags } = req.body;
        const tagsProduct = await tagService.getAllProductByTags(tags);
        res.status(200).json({ tagsProduct });
    } catch (error) {
        res.status(HTTP_INTERNAL_SERVER_ERROR).json({ message: getErrorMessage(error) });
    }
}
