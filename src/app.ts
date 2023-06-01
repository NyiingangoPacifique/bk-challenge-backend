import express from 'express';
import { Sequelize } from 'sequelize';
import productRoutes from './routes/ProductRoute';
import userRoutes from './routes/UserRoute';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

const app = express();
const port = 3000;
console.log("====================",process.env.DATABASE_URL)
// Create a new Sequelize instance using the database URL and explicit dialect
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres', // Replace with the appropriate database dialect
});

app.use(express.json());

app.use('/products', productRoutes);
app.use('/users', userRoutes);

// Sync the database using Sequelize migrations
sequelize
  .sync({ alter: true }) // Use alter: true to apply migrations without dropping tables
  .then(() => {
    console.log('Database connected');
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });
