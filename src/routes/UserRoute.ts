import express from 'express';
import { createUser, getUsers } from '../controllers/UserController';
import {authenticate,verifyAdmin} from '../middleware/authenticate';
import isAdmin from '../middleware/isAdmin';

const router = express.Router();

router.post('/', createUser);
router.get('/', getUsers);
router.get('/protected', authenticate, (req, res) => {
    // Access the authenticated user through req.user
    res.json({ message: 'Protected route' });
  });
  router.get('/isadmin', verifyAdmin, (req, res) => {
    // Access the authenticated user through req.user
    res.json({ message: 'Admin route' });
  });

export default router;
