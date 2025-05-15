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
    async getAllProducts(req: Request, res: Response) {
        try {
            const products = await this.productService.getAllProducts();
            res.json(products);
        } catch (error) {
            res.status(50).json({ message: 'Error retrieving products' });
        }
    }

    async getProductById(req: Request, res: Response): Promise<any> {
        try {
            const product = await this.productService.getProductById(req.params.id);
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.json(product);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving product' });
        }
    }

    async deleteProduct(req: Request, res: Response): Promise<any> {
        try {
            const success = await this.productService.deleteProduct(req.params.id);
            if (!success) {
                return res.status(404).json({ message: 'Product not found' })
            }
        }
        catch (error) {
            res.status(500).json({ message: 'Eror deleting product' });
        }
    }

    async updateProduct(req: Request, res: Response) {
        try {
            const product = await this.productService.updateProduct(req.params.id, req.body);
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.json(product);
        } catch (error) {
            res.status(500).json({ message: 'Error updating product' });
        }
    }
}

export { ProductController };