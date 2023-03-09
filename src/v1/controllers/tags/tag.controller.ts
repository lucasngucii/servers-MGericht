import { Request, Response, NextFunction } from 'express';
import { HTTP_INTERNAL_SERVER_ERROR } from '../../constants/http-status/http_status';
import { getErrorMessage } from '../../utils/error/errorMessage';
export const getAllProductByTags = async (req: Request, res: Response, next: NextFunction) => { 
    try {
        
    } catch (error) {
        res.status(HTTP_INTERNAL_SERVER_ERROR).json({ message: getErrorMessage(error) });
    }
}