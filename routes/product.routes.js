
const express = require("express")

const router = express.Router()



const {getAllProducts,getProductById,addProduct,updateProduct,deleteProduct} = require('../controllers/product.controller')
const {isAuth} = require('../utils/authentication')

// To retrive all products

// router.get('/products',(req,res)=>{
//     res.status(200).send('products retrived')
// })

router.get('/products', getAllProducts)

// To retrive a product by productId

router.get('/products/:productId',getProductById)

// To add a new product
router.post('/products',isAuth,addProduct)

// To update a product
router.put('/products/:productId',isAuth,updateProduct)

// To delete a product
router.delete('/products/:productId',isAuth,deleteProduct)




module.exports = router