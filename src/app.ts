import express from 'express';
import cookieParser from 'cookie-parser';
import { Sequelize } from 'sequelize';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import productRoutes from './routes/ProductRoute';
import userRoutes from './routes/UserRoute';
import orderRoutes from './routes/OrderRoute';
import authRoutes from './routes/AuthRoute';
import seedFertilizerRoutes from './routes/SeedFertilizerRoute';
import dotenv from 'dotenv';
import cors from 'cors'; 

dotenv.config(); 
const app = express();
const port = 5000;
console.log("====================",process.env.DATABASE_URL)
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres', 
});

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Your API Title',
      version: '1.0.0',
      description: 'API documentation for your endpoints',
    },
    servers: [
      {
        url: 'http://localhost:5000/api',
      },
    ],
  },
  apis: ['./src/routes/*.ts'], // Replace with the correct path to your route files
};
const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve);
app.get('/api-docs', swaggerUi.setup(swaggerDocs));


app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/combination', seedFertilizerRoutes)

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
