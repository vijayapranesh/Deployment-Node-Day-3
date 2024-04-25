
const Categories = require('../models/category.model')


const getAllCategories = (req,res) =>{
    try{
        Categories.find()
            .then((data)=>{
                res.status(200).send({
                    Message : "Category has been retrived",
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



const getCategoryById = (req,res)=>{
    try{
        let categoryId = req.params.categoryId;
        Categories.findById(categoryId)
            .then((data)=>{
                res.status(200).send({
                    Message : "Category has been retrived by categoryId",
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



const addCategory = (req,res)=>{
    try{
        const newCategory = new Categories(req.body);
    
        newCategory.save()
        .then((data)=>{
            res.status(201).send({
                Message : "Category has been added",
               
            })
        }).catch((error)=>{
            res.status(400).send({
                message: "Error while adding Category",
            })
        })

    } catch(error){
        res.status(500).send({message:"Internal server error"})
    }
}


const updateCategory = async(req,res)=>{
    try{
        let categoryId = req.params.categoryId;

        const existingCategory= await Categories.findById(categoryId)

        if(!existingCategory){
            return res.status(400).send({
                message: "Category not found",
            })
        }


        Products.findByIdAndUpdate({_id:categoryId},{$set: req.body})
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



const deletecategory = async (req,res)=>{
    try{
        let categoryId = req.params.categoryId;


        const existingProduct = await Categories.findById(categoryId)

        if(!existingProduct){
            return res.status(400).send({
                message: "Category not found",
            })
        }


        Categories.findByIdAndDelete({_id:categoryId})
        .then((data)=>{
            res.status(200).send({message:"Category has been deleted successfully"})
        })
        .catch((error)=>{
            res.status(400).send({message:"error while deleting Category"})
        })
    } catch(error) {
        res.status(500).send({message :'Internal server error'})
    }
}

module.exports = {getAllCategories,getCategoryById,addCategory,updateCategory,deletecategory}