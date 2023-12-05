require("dotenv").config();
 const express = require('express');
const { applaymiddleware } = require('./src/middlewares/applyMiddleware');
const connectDB = require('./src/db/ConnectDB');
const app = express();
 const port = process.env.PORT || 5000;
const authRoues = require('./src/routes/v1/services/index')

 applaymiddleware(app);

 app.use(authRoues)


 // server health 

 app.get('/health', (req, res) => {
    res.send('inventory management system running')
  })
  

 app.all("*",(req, res, next) =>{
    const error = new Error(`Con't find ${req.url} on the server`)
    error.status = 404;
    next(error);
 })

 app.use((err, req, res , next) =>{
    res.status(err.status || 500 ).json({
        message : err.message
    })
 })


 const main = async ( ) =>{
    await connectDB()
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })
 }

 main()

// module.exports = app;