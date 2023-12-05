require("dotenv").config();
const jwt = require("jsonwebtoken");

const verifyToken = (req,res, next) =>{
    const token = req.headers.authorization;
    const accessToken = token.split(' ')[1]
    console.log('verify token',accessToken);
    if (!accessToken) {
        return res.status(401).send({messge:'unauthorize access'})
    }

    jwt.verify(accessToken,process.env.ACCESS_TOKEN_SECRET,(err,decoded) =>{
        if(err){
            console.log('error verify');
            return res.status(401).send({messge: 'unAuthorizd access'})
        }
        req.email = decoded;
        console.log('token verify',decoded);
        next()
    })
}

module.exports = verifyToken