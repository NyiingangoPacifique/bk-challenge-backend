import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import { validateUserInput } from './helper/validation';
import { User } from '../../models';

const SECRET_KEY = process.env.JWT_SECRET;

// Register user
export const register = async (req: Request, res: Response) => {
  const { name, email, phone, password, isAdmin } = req.body;
  // Validate the user input
  const validationErrors = validateUserInput({ name, email,phone, isAdmin });
  if (validationErrors) {
    // Return a 400 Bad Request if validation fails
    return res.status(400).json({ errors: validationErrors });
  }

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log("%%%%%%%%%%%%",hashedPassword)
    // Create a new user
    const user = await User.create({ name, email, phone, isAdmin, password: hashedPassword });
    console.log("%%%%%%%%%%%%",user)
    // Generate JWT token
    const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '1d' });

    // Set the token as a cookie
    res.cookie('token', token, { httpOnly: true });

    res.json({ message: 'User registered successfully', token });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user' });
  }
};

// Login user
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare the provided password with the hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        isAdmin: user.isAdmin,
      },
      SECRET_KEY,
      { expiresIn: '1d' }
    );
    // Set the token as a cookie
    res.cookie('token', token, { httpOnly: true });

    res.json({ message: 'Logged in successfully', token });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in' });
  }
};

// Logout user
export const logout = (req: Request, res: Response) => {
  // Clear the token cookie
  res.clearCookie('token');
  res.json({ message: 'Logged out successfully' });
};


