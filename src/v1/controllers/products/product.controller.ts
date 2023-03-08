import { Request, Response, NextFunction } from "express";
import { HTTP_INTERNAL_SERVER_ERROR, HTTP_SUCCESS } from "../../constants/http-status/http_status";
import { getErrorMessage } from "../../utils/error/errorMessage";
import * as productServices from "../../services/products/product.service";

export const getAllProduct = async (req: Request, res: Response) => {
  try {
    const product = await productServices.getAllProduct();
    res.status(HTTP_SUCCESS).json(product);
  } catch (error) {
    res.status(HTTP_INTERNAL_SERVER_ERROR).json({ error: getErrorMessage(error) });
  }
};
export const getProductById = async (req: Request, res: Response) => { 
    try {
        const { id } = req.params;
        const product = await productServices.getProductById(id);
        res.status(HTTP_SUCCESS).json(product);
    } catch (error) {
        res.status(HTTP_INTERNAL_SERVER_ERROR).json({ error: getErrorMessage(error) });
    }
}
export const createProduct = async (req: Request, res: Response) => {
  try {
    const product = await productServices.createProduct(req.body);
    res.status(HTTP_SUCCESS).json({message: "Product created successfully", product});
  } catch (error) {
    res.status(HTTP_INTERNAL_SERVER_ERROR).json({ error: getErrorMessage(error) });
  }
};
export const updateProduct = async (req: Request, res: Response) => { 
    try {
        const { id } = req.params;
        const product = await productServices.updateProduct(id, req.body);
        res.status(HTTP_SUCCESS).json({message: "Product updated successfully", product});
    } catch (error) {
        res.status(HTTP_INTERNAL_SERVER_ERROR).json({ error: getErrorMessage(error) });
    }
}
export const deleteProduct = async (req: Request, res: Response) => { 
    try {
        const { id } = req.params;
        !id && new Error("id not in params");
        const product = await productServices.deleteProduct(id);
        res.status(HTTP_SUCCESS).json({message: "Product deleted successfully", product});
    } catch (error) {
        res.status(HTTP_INTERNAL_SERVER_ERROR).json({ error: getErrorMessage(error) });
    }
}
export const searchKeyword = async (req: Request, res: Response, next: NextFunction) => { 
    try {
        const { keyword } = req.query;
        !keyword && new Error("keyword not in params");
        const product = await productServices.searchKeyword(keyword as string);
    } catch (error) {
        res.status(HTTP_INTERNAL_SERVER_ERROR).json({ error: getErrorMessage(error) });
    }
}   