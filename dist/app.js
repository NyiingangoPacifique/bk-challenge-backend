"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const sequelize_1 = require("sequelize");
const ProductRoute_1 = __importDefault(require("./routes/ProductRoute"));
const UserRoute_1 = __importDefault(require("./routes/UserRoute"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config(); // Load environment variables from .env file
const app = (0, express_1.default)();
const port = 3000;
console.log("====================", process.env.DATABASE_URL);
// Create a new Sequelize instance using the database URL and explicit dialect
const sequelize = new sequelize_1.Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres', // Replace with the appropriate database dialect
});
app.use(express_1.default.json());
app.use('/products', ProductRoute_1.default);
app.use('/users', UserRoute_1.default);
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
