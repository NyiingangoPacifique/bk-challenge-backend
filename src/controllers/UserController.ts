import { Request, Response } from 'express';
import { User } from '../../models';

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, isAdmin } = req.body;
    const user = await User.create({ name, email, isAdmin });
    res.status(201).json(user);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    console.error('Error getting users:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
