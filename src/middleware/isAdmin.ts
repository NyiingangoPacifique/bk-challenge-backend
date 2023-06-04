import { Request, Response, NextFunction } from 'express';
import User from '../../models/';

interface AuthenticatedRequest extends Request {
    user?: User;
  }
  const isAdmin = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const userId = req.user?.id;

  try {
    const user = await User.findOne({ where: { id: userId } });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.isAdmin) {
      // User is an admin, proceed to the next middleware
      next();
    } else {
      return res.status(403).json({ message: 'User is not an admin' });
    }
  } catch (error) {
    console.error('Error checking admin status:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export default isAdmin;
