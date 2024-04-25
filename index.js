
require('dotenv').config();
const express = require('express')
const app = express()

const categoryRoutes = require('./routes/category.routes')
const productRoutes = require('./routes/product.routes')
const authRoutes = require('./routes/auth.routes')


const db = require('./db/connect');
const cookieParser = require('cookie-parser');




// Parsing the request into JSON from the frontend
// app.use => attaching middlewares (function for specific purpose)
app.use(express.json())
app.use(cookieParser())

//connecting DB
db()

//custom middleware
app.use(productRoutes);
app.use(categoryRoutes);
app.use(authRoutes);

const port = process.env.PORT || 5000

app.listen(port,()=>{
    console.log(`App is running on port nummber ${port}`)
})