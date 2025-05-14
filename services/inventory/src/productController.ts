import { Request, Response } from 'express';
import { ProductService } from './productService';

class ProductController {
    private productService = new ProductService();
    async createProduct(req: Request, res: Response) {
        try {
            const product = await this.productService.createProduct(req.body);
            res.status(201).json(product);
        } catch (error) {
            res.status(500).json({ message: 'Error creating product' });
        }
    }
}

export { ProductController };