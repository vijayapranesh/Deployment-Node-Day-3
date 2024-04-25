const express = require('express')
const {signup,signin, signout } = require('../controllers/auth.controler')
const router = express.Router()




router.post('/signup',signup)
router.post('/signin',signin)
router.get('/signout',signout)

module.exports = router




// AUTHENTICATION

// signup -> POST /signup

// body: {
//     name: '',
//     email: '',
//     mobileNumber: '',
//     password: '',
//     gender: ""
// }


// signin -> POST /signin

// body: {
//     email: "",
//     password: ""
// }


// signout -> GET /signout