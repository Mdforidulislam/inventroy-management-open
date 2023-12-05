require("dotenv").config();
const jwt = require("jsonwebtoken");
const UsersCollection = require("../models/Users");

const verifyAdmin = async ( req, res , next) =>{
    try{
         const {email} = req.email;
        const allInfoUser = await UsersCollection.findOne({ email: email })

        if (allInfoUser?.role !== 'admin') {
            return res.status(403).send({message: ' forbideen access'})
        }
        next()


    }catch(error){
        console.log('addmin access error ');
    }
}

module.exports = verifyAdmin