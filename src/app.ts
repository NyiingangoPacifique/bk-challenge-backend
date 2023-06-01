import express from 'express';
import { Sequelize } from 'sequelize';
import productRoutes from './routes/ProductRoute';
import userRoutes from './routes/UserRoute';
import dotenv from 'dotenv';

dotenv.config(); 
const app = express();
const port = 3000;
console.log("====================",process.env.DATABASE_URL)
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres', 
});

app.use(express.json());

app.use('/products', productRoutes);
app.use('/users', userRoutes);

sequelize
  .sync({ alter: true }) 
  .then(() => {
    console.log('Database connected');
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });
