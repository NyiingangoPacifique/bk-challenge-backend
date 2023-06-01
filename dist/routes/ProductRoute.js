"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ProductController_1 = require("../controllers/ProductController");
const router = express_1.default.Router();
router.post('/', ProductController_1.createProduct);
router.get('/', ProductController_1.getProducts);
exports.default = router;
