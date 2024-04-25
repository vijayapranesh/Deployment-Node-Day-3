

const Products = require('../models/product.model')


const getAllProducts = (req,res) =>{
    try{
        Products.find()
            .then((data)=>{
                res.status(200).send({
                    Message : "product has been retrived",
                    data : data,
                })
            })
            .catch((error)=>{
                res.status(400).send({
                    Message : "Error while retriving data",
                    error : error,
                })
            })

    }catch(error){
        res.status(500).send({message:"Internal server error"})
    }
}



const getProductById = (req,res)=>{
    try{
        let productId = req.params.productId;
        Products.findById(productId)
            .then((data)=>{
                res.status(200).send({
                    Message : "product has been retrived by productId",
                    data : data,
                })
            })
            .catch((error)=>{
                res.status(400).send({
                    Message : "Error while retriving data by Id",
                    error : error,
                })
            })

    }catch(error){
        res.status(500).send({message:"Internal server error"})
    }
}



const addProduct = (req,res)=>{
    try{
        const newProduct = new Products(req.body);
    
        newProduct.save()
        .then((data)=>{
            res.status(201).send({
                Message : "product has been added",
               
            })
        }).catch((error)=>{
            res.status(400).send({
                message: "Error while adding product",
            })
        })

    } catch(error){
        res.status(500).send({message:"Internal server error"})
    }
}


const updateProduct = async(req,res)=>{
    try{
        let productId = req.params.productId;

        const existingProduct = await Products.findById(productId)

        if(!existingProduct){
            return res.status(400).send({
                message: "Product not found",
            })
        }


        Products.findByIdAndUpdate({_id:productId},{$set: req.body})
        .then((data)=>{
            res.status(200).send({message:"product has been updated successfully"})
        })
        .catch((error)=>{
            res.status(400).send({message:"error while updating product"})
        })
    } catch(error) {
        res.status(500).send({message :'Internal server error'})
    }
   
}



const deleteProduct = async (req,res)=>{
    try{
        let productId = req.params.productId;


        const existingProduct = await Products.findById(productId)

        if(!existingProduct){
            return res.status(400).send({
                message: "Product not found",
            })
        }


        Products.findByIdAndDelete({_id:productId})
        .then((data)=>{
            res.status(200).send({message:"product has been deleted successfully"})
        })
        .catch((error)=>{
            res.status(400).send({message:"error while deleting product"})
        })
    } catch(error) {
        res.status(500).send({message :'Internal server error'})
    }
}

module.exports = {getAllProducts,getProductById,addProduct,updateProduct,deleteProduct}