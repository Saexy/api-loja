const express = require('express');
const router = express.Router();

const ProductController = require('./controllers/ProductController');
const ProductMiddleware = require('./middlewares/ProductMiddleware');

const UserController = require('./controllers/UserController');
const UserMiddleware = require('./middlewares/UserMiddleware');

router.get('/products', UserMiddleware.validateToken, ProductController.getProducts);
router.post('/products', UserMiddleware.validateToken, ProductMiddleware.validateProduct, ProductController.addProduct);
router.delete('/products/:id', UserMiddleware.validateToken, ProductController.deleteProduct);
router.put('/products/:id', UserMiddleware.validateToken, ProductMiddleware.validateProduct, ProductController.updateProduct);
router.post('/login', UserMiddleware.validateLogin, UserController.loginUser);
router.post('/register', UserMiddleware.validateRegister, UserController.registerUser);

module.exports = router;