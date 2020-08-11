
const {
    NotFoundInCatch,
    error500,
    error404,
    error422
} = require("../lib/error");
const {
    getAllResponse,
    createResponse,
    deleteResponse,
    response
} = require("../lib/response");

// Load in the mongoose models
const { Category, Product } = require('../db/models');

/**
* Purpose: Create a new product
*/

const createProduct = (req, res, next) => {
    // We want to create a new product in a category

    Category.findOne({
        name: req.body.category
    }).then((category) => {
        let newProduct = new Product({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: category._id
        });
        newProduct.save().then((newProductDoc) => {
            //res.send(newProductDoc);
            createResponse(res, newProductDoc);
        })
    }).catch(err => {
        error422(res, err);
        error500(
            res,
            err.message || "Some error occurred while creating the product."
        );
    });
};

/**
* Purpose: Get all products in a specific category
*/
const findProductsByCategory = (req, res, next) => {

    // We want to return all products that belong to a specific category (specified by categoryId)
    const pageOptions = {
        page: parseInt(req.query.page) || 0,
        limit: parseInt(req.query.limit) || 10
    }


    Product.find({
        category: req.params.categoryId
    }).skip(pageOptions.page * pageOptions.limit)
        .limit(pageOptions.limit).populate('category').then((products) => {
            //res.send(products);
            getAllResponse(res, products);
        }).catch(err => {
            error500(
                res,
                err.message || "Some error occurred while retrieving products."
            );
        });
};


/**
* Purpose: Find all the products 
*/
const findAllProducts = (req, res, next) => {

    // We want to return all products that belong to all the categories 

    const pageOptions = {
        page: parseInt(req.query.page) || 0,
        limit: parseInt(req.query.limit) || 10
    }

    Product.find({

    }).skip(pageOptions.page * pageOptions.limit)
        .limit(pageOptions.limit).populate('category').then((products) => {
            //res.send(products);
            getAllResponse(res, products);
        }).catch(err => {
            error500(
                res,
                err.message || "Some error occurred while retrieving products."
            );
        });
};

/**
* Purpose: Find a specific product by Id
*/
const findProductById = (req, res, next) => {

    // We want to return a product (specified by productId)
    Product.find({
        _id: req.params.id
    }).populate('category').then((product) => {
        //res.send(product);
        getOneResponse(res, product);
    }).catch((e) => {
        res.send(e);
    }).catch(err => {
        error500(
            res,
            err.message || "Some error occurred while retrieving product."
        );
    });
};

/**
* Purpose: Update a specified product
*/

const updateProduct = (req, res, next) => {
    // We want to update an existing product (specified by productId)

    Product.findOneAndUpdate({ _id: req.params.id }, {
        $set: req.body
    }).then(() => {
        //res.send({ 'message': 'updated successfully'});
        response(res, "Product updated successfully!");
    }).catch(err => {
        NotFoundInCatch(res, err, `Product not found with id ${err.value}`);
        error500(res, `Error updating product with id ${err.value}`);
    });
};

/**
* Purpose: Delete a product
*/

const deleteProduct = (req, res, next) => {
    // We want to delete the specified product (document with id in the URL)

    Product.findOneAndRemove({
        _id: req.params.id

    }).then((removedProductDoc) => {
        //res.send(removedProductDoc);
        deleteResponse(res, removedCategoryDoc, 'Product deleted successfully');
    }).catch(err => {
        NotFoundInCatch(res, err, `Product not found with id ${err.value}`);
        error500(res, `Could not delete product with id ${err.value}`);
    });
};

module.exports = {
    findAllProducts,
    findProductsByCategory,
    findProductById,
    createProduct,
    updateProduct,
    deleteProduct
};

