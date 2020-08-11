const express = require('express');
const router = express.Router();
const productController = require('../controllers/product');

router.get('', productController.findAllProducts);

router.get('/:categoryId', productController.findProductsByCategory);

router.get('/single/:id', productController.findProductById);

router.post('/create', productController.createProduct);

router.patch('/:id', productController.updateProduct);

router.delete('/:id', productController.deleteProduct);



module.exports = router;