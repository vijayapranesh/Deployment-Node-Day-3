
const express = require("express")

const router = express.Router()

const {getAllCategories,getCategoryById,addCategory,updateCategory,deletecategory} = require('../controllers/catagory.controller')
const {isAuth} = require('../utils/authentication')
// To retrive all products

router.get('/categories', getAllCategories)

// To retrive a product by productId

router.get('/categories/:categoryId',getCategoryById)

// To add a new product
router.post('/categories',isAuth,addCategory)

// To update a product
router.put('/categories/:categoryId',isAuth,updateCategory)

// To delete a product
router.delete('/categories/:categoryId',isAuth,deletecategory)




module.exports = router