import { ProductModel, Product } from './productModel';

class ProductService {
    async createProduct(product: Product): Promise<Product> {
        const newProduct = new ProductModel(product);
        return await newProduct.save();
    }
}
export { ProductService };