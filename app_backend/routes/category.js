const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category');

router.get('', categoryController.findAllCategories);

router.post('/create', categoryController.createCategory);

router.patch('/:id', categoryController.updateCategory);

router.delete('/:id', categoryController.deleteCategory);



module.exports = router;