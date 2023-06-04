"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const sequelize_1 = require("sequelize");
const ProductRoute_1 = __importDefault(require("./routes/ProductRoute"));
const UserRoute_1 = __importDefault(require("./routes/UserRoute"));
const OrderRoute_1 = __importDefault(require("./routes/OrderRoute"));
const AuthRoute_1 = __importDefault(require("./routes/AuthRoute"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = 3000;
console.log("====================", process.env.DATABASE_URL);
const sequelize = new sequelize_1.Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
});
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use('/api/auth', AuthRoute_1.default);
app.use('/products', ProductRoute_1.default);
app.use('/users', UserRoute_1.default);
app.use('/orders', OrderRoute_1.default);
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
