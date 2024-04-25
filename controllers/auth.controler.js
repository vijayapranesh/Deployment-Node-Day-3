

const Users = require('../models/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')



const signup = async (req, res)=>{
    try{
            // body: {
        //     name: '',
        //     email: '',
        //     mobileNumber: '',
        //     password: '',
        //     gender: "",
        //     role: ""
        // }
        const payload = req.body
        
        if(!payload.password){
        return res.status(400).send({message : "password is needed"})
        }

        const hashedValue = await bcrypt.hash(payload.password, 10) // => 10 is a salting round

        payload.hashedPassword = hashedValue
    //   {
    //       name: '',
    //       email: '',
    //       password: "",
    //       hashedPassword: ''
    //       mobileNumber : '',
    //       gender: '',
    //       role:
    //   }

        delete payload.password
    //   {
    //       name: '',
    //       email: '',
    //       hashedPassword: ''
    //       mobileNumber : '',
    //       gender: '',
    //       role:
    //   }

        const newUser = new Users(payload)

        newUser
            .save()
            .then((data)=>{
                res.status(201).send({message : "User has been registered successfully"})
            })
            .catch((error)=>{
                res.status(400).send({message : "Error while registering user"})
            })

    } catch(error){
        res.status(500).send({message : "internal server error"})
    }
}

const signin = async (req,res) =>{
    try{
         const {email, password} = req.body

         // checking if user exists or not
         const existingUser = await Users.findOne({email:email})

         console.log("Existing User:",existingUser)


         // if user doesn't exist
        if(!existingUser){
            res.status(400).send({message: "User does not exist."})
        }

         // if user exists, compare passwords
         const isValid = await bcrypt.compare(password, existingUser.hashedPassword)  // true or false

         
         // if password is not valid
         if(!isValid){
            res.status(401).send({message: "Invalid credentials."})
         }
         
         // if credentials are valid, jwt token has been generated
         // ssvsfsfwrtw4rtwfsafasfa with secret key
         // Encryption: orignal form to random form
         const token = await jwt.sign({ _id: existingUser._id },process.env.SECRET_KEY)

         
         // token has been set in the cookies with expiration of 24Hr
         res.cookie("accessToken",token,{expires: new Date(Date.now() + 86400000)})

         res.status(200).send( {message: "User signed-in successfully."})

         
    } catch(error){
        res.status(500).send({message : "internal server error"})
    }
}

const signout = async(req, res) => {
    try{
        await res.clearCookie("accessToken")

        return res.status(200).send({
            message: "User has been signed-out successfully.",
          });

    } catch(error){
        res.status(500).send({message : "internal server error"})
    }
}




module.exports = {signup, signin, signout}