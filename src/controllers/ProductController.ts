import { Request, Response } from 'express';
import { Product,SeedFertilizer } from '../../models';
import { validateProductInput } from './helper/validation';

class ProductController {
  async getAllProducts(req: Request, res: Response): Promise<Response<any, Record<string, any>> | void>{
    try {
      const products = await Product.findAll();
      return res.json(products);
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getProduct(req: Request, res: Response): Promise<Response<any, Record<string, any>> | void> {
    try {
      
      if(/^-?\d*\.?\d+$/.test(req.params.id))
      {
        const productId = parseInt(req.params.id);
        const product = await Product.findByPk(productId);
        console.log("+++++++++++",product)
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        } else {
            return res.json(product);
        }
      }
      else{
        return res.status(400).json({ error: 'ProductId must be Number' });
      }
      
    } catch (error) {
        console.log("+++++++++++",error)
        return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getProductByName(req: Request, res: Response): Promise<Response<any, Record<string, any>> | void> {
    try {
      const productName = req.params.name;
      const product = await Product.findOne({ where: { name: productName } });
      if (!product) {
        return res.status(404).json({ error: 'Product with name not found' });
      } else {
        return res.json(product);
      }
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getProductsByCategory(req: Request, res: Response): Promise<Response<any, Record<string, any>> | void> {
    try {
      const categoryName = req.params.category;
      const products = await Product.findAll({ where: { category: categoryName } });
  
      if (products.length === 0) {
        return res.status(404).json({ error: 'No products found in the given category' });
      } else {
        return res.json(products);
      }
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
  
  

  async createProduct(req: Request, res: Response): Promise<Response<any, Record<string, any>> | void> {
    const { name, cost, description, image, stockQty, category, kgAcre } = req.body;
    console.log("************",req.body)
    const validationErrors = validateProductInput({ name, cost,description, image,stockQty,category,kgAcre });
    if (validationErrors) {
        // Return a 400 Bad Request if validation fails
        return res.status(400).json({ errors: validationErrors });
    }
    else{
        try {
            const isActive = true;
            const product = await Product.create({ name, cost, description, image, stockQty,kgAcre, category,isActive });
            
            if(category==="seed"){
                const seedProductId = product.id; // Assuming the product ID is available as "id"
                const fertilizerProductId=null;
                await SeedFertilizer.create({ seedProductId, fertilizerProductId });
            }
            if(category==="fertilizers"){
                const seedProductId = null; // Assuming the product ID is available as "id"
                const fertilizerProductId=product.id;
                await SeedFertilizer.create({ seedProductId, fertilizerProductId });
            }
            return res.status(201).json(product);
            } catch (error) {
                console.log("************",error)
            return res.status(500).json({ error: 'Internal server error' });
            }
    }
    
    
  }

  async updateProduct(req: Request, res: Response): Promise<Response<any, Record<string, any>> | void> {
    try {
      const productId = parseInt(req.params.id);
      const { name, cost,kgAcre,stockQty } = req.body;
      const product = await Product.findByPk(productId);
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      } else {
        product.name = name;
        product.cost = cost;
        product.kgAcre = kgAcre;
        product.stockQty = stockQty;
        await product.save();
        return res.json(product);
      }
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async deleteProduct(req: Request, res: Response): Promise<Response<any, Record<string, any>> | void> {
    try {
      const productId = parseInt(req.params.id);
      const product = await Product.findByPk(productId);
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      } else {
        await product.destroy();
        return res.json({ message: 'Product deleted successfully' });
      }
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
  }
 }

export default new ProductController();
