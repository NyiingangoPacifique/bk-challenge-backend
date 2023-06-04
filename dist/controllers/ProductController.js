"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../../models");
class ProductController {
    getAllProducts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const products = yield models_1.Product.findAll();
                res.json(products);
            }
            catch (error) {
                res.status(500).json({ error: 'Internal server error' });
            }
        });
    }
    getProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const productId = parseInt(req.params.id);
                const product = yield models_1.Product.findByPk(productId);
                if (!product) {
                    res.status(404).json({ error: 'Product not found' });
                }
                else {
                    res.json(product);
                }
            }
            catch (error) {
                res.status(500).json({ error: 'Internal server error' });
            }
        });
    }
    createProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, cost, category } = req.body;
                const product = yield models_1.Product.create({ name, cost, category });
                res.status(201).json(product);
            }
            catch (error) {
                res.status(500).json({ error: 'Internal server error' });
            }
        });
    }
    updateProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const productId = parseInt(req.params.id);
                const { name, cost, category } = req.body;
                const product = yield models_1.Product.findByPk(productId);
                if (!product) {
                    res.status(404).json({ error: 'Product not found' });
                }
                else {
                    product.name = name;
                    product.cost = cost;
                    product.category = category;
                    yield product.save();
                    res.json(product);
                }
            }
            catch (error) {
                res.status(500).json({ error: 'Internal server error' });
            }
        });
    }
    deleteProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const productId = parseInt(req.params.id);
                const product = yield models_1.Product.findByPk(productId);
                if (!product) {
                    res.status(404).json({ error: 'Product not found' });
                }
                else {
                    yield product.destroy();
                    res.json({ message: 'Product deleted successfully' });
                }
            }
            catch (error) {
                res.status(500).json({ error: 'Internal server error' });
            }
        });
    }
}
exports.default = new ProductController();
