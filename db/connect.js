
const mongoose = require('mongoose') // node.js ORM for mongodb

const db = async () => {
    try{
        await mongoose.connect(process.env.MANGO_URL)

        console.log('DB connection established')
    }catch(error){
        console.log("Error",error)
    }
}

module.exports = db  