"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserController_1 = require("../controllers/UserController");
const authenticate_1 = require("../middleware/authenticate");
const router = express_1.default.Router();
router.post('/', UserController_1.createUser);
router.get('/', UserController_1.getUsers);
router.get('/protected', authenticate_1.authenticate, (req, res) => {
    // Access the authenticated user through req.user
    res.json({ message: 'Protected route' });
});
router.get('/isadmin', authenticate_1.verifyAdmin, (req, res) => {
    // Access the authenticated user through req.user
    res.json({ message: 'Admin route' });
});
exports.default = router;
