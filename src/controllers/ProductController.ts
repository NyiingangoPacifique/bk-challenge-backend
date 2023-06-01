import { Request, Response } from 'express';
import { Product } from '../../models';

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, cost, category } = req.body;
    const product = await Product.create({ name, cost, category });
    res.status(201).json(product);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    console.error('Error getting products:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
