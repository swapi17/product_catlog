
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
* Purpose: Create a new category
*/

const createCategory = (req, res, next) => {
    // We want to create a new category and return the new category document back to the user (which includes the id)
    // The list information (fields) will be passed in via the JSON request body
    let name = req.body.name;
    let description = req.body.description;

    let newCategory = new Category({
        name,
        description
    });
    newCategory.save().then((categoryDoc) => {
        // the full category document is returned (incl. id)
        //res.send(categoryDoc);
        createResponse(res, categoryDoc);
    }).catch(err => {
        error422(res, err);
        error500(
            res,
            err.message || "Some error occurred while creating the category."
        );
    });
};


/**
* Purpose: Get all categories
*/
const findAllCategories = (req, res, next) => {
    // We want to return an array of all the product categories 
    const pageOptions = {
        page: parseInt(req.query.page) || 0,
        limit: parseInt(req.query.limit) || 10
    }

    Category.find({

    }).skip(pageOptions.page * pageOptions.limit)
        .limit(pageOptions.limit).
        then((categories) => {
            //res.send(categories);
            getAllResponse(res, categories);
        }).catch((e) => {
            res.send(e);
        }).catch(err => {
            error500(
                res,
                err.message || "Some error occurred while retrieving categories."
            );
        });
};

/**
* Purpose: Update a specified category
*/

const updateCategory = (req, res, next) => {
    // We want to update the specified category (category document with id in the URL) with the new values specified in the JSON body of the request
    Category.findOneAndUpdate({ _id: req.params.id }, {
        $set: req.body
    }).then(() => {
        //res.send({ 'message': 'updated successfully'});
        response(res, "Category updated successfully!");
    }).catch(err => {
        NotFoundInCatch(res, err, `Category not found with id ${err.value}`);
        error500(res, `Error updating category with id ${err.value}`);
    });
};

/**
* Purpose: Delete a category
*/

const deleteCategory = (req, res, next) => {
    // We want to delete the specified category (document with id in the URL)
    Category.findOneAndRemove({
        _id: req.params.id
    }).then((removedCategoryDoc) => {
        //res.send(removedCategoryDoc);
        deleteResponse(res, removedCategoryDoc, 'Category deleted successfully');
        // delete all the products that are in the deleted category
        deleteProductsFromCategory(removedCategoryDoc._id);
    }).catch(err => {
        NotFoundInCatch(res, err, `Product not found with id ${err.value}`);
        error500(res, `Could not delete product with id ${err.value}`);
    });
};



/* HELPER METHODS */
let deleteProductsFromCategory = (_categoryId) => {
    Product.deleteMany({
        category: _categoryId
    }).then(() => {
        console.log("Products from " + _categoryId + " were deleted!");
    })
}

module.exports = {
    createCategory,
    findAllCategories,
    updateCategory,
    deleteCategory
};

