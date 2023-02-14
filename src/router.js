const express = require('express');
const router = express.Router();

const ProductController = require('./controllers/ProductController');
const ProductMiddleware = require('./middlewares/ProductMiddleware');

router.get('/products', ProductController.getProducts);
router.post('/products', ProductMiddleware.validateProduct, ProductController.addProduct);
router.delete('/products/:id', ProductController.deleteProduct);
router.put('/products/:id', ProductMiddleware.validateProduct, ProductController.updateProduct);

module.exports = router;