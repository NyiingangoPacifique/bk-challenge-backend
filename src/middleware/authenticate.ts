import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

interface AuthenticatedRequest extends Request {
  user?: JwtPayload;
}

const authenticate = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.token; // Assuming the token is stored in a cookie named 'token'
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

const verifyAdmin = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  if (req.user?.isAdmin) {
    next();
  } else {
    return res.status(403).json({ message: 'Access denied' });
  }
};

export { authenticate, verifyAdmin };
