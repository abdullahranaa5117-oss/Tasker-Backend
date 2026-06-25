const express = require('express');
const router = express.Router();
const CategoryController = require('../controller/Category.controller');

router.get('/',CategoryController.getCategory);
router.post('/',CategoryController. createnewCategory);
router.put( '/:id',CategoryController.updateCategory);
router.delete( '/:id',CategoryController.deleteCategory);


module.exports = router;

