import { ProductModel, Product } from './productModel';

class ProductService {
    async createProduct(product: Product): Promise<Product> {
        const newProduct = new ProductModel(product);
        return await newProduct.save();
    }

    async getAllProducts(): Promise<Product[]> {
        return await ProductModel.find().exec();
    }

    async getProductById(id: string): Promise<Product | null> {
        return await ProductModel.findById(id).exec();
    }
}


export { ProductService };