"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ProductController_1 = __importDefault(require("../controllers/ProductController"));
const router = (0, express_1.Router)();
// Products
router.get('/', ProductController_1.default.getAllProducts);
router.get('/:id', ProductController_1.default.getProduct);
router.post('/', ProductController_1.default.createProduct);
router.put('/:id', ProductController_1.default.updateProduct);
router.delete('/:id', ProductController_1.default.deleteProduct);
exports.default = router;
