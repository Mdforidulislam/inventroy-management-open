require("dotenv").config();
const jwt = require("jsonwebtoken");
const UsersCollection = require("../models/Users");

const verifyShopManager = async(req, res,next) =>{
        try{
            const {email} = req.email;
            console.log('verify shop',email);

            const userInfo = await UsersCollection.findOne({email: email})
            console.log(userInfo,'userchek');
            if(userInfo?.role !== 'shop manager' || userInfo.role !== 'admin' || userInfo.subShopManger[0].role==='sub shop manger'){
                next()
            }else{
                console.log('going here not eveythink');
                return res.status(403).send({ message: 'Forbidden access Your data' });
            }
            
        }catch(error){
            console.log(error);
        }
}

module.exports = verifyShopManager