const { Schema, model } = require("mongoose");

const ProductCollectionSchema = new Schema({
     "productName":{
        type:String,
        require: true
     },
     "productLocation":{  
        type:String,
        require: true
     },
     "productDescription":{
        type:String,
        require: true
     },
     "photoImage":{
        type:String,
        require: true
     },
     "formattedDate":{
        type:String,
        require: true
     },
     "shopeName":{
        type:String,
        require: true
     },
     "userEmail":{
        type:String,
        require: true
     },
     "productCategory":{
        type: String,
        require: true
     },
     "productQuantiy":{
        type: Number,
        require: true
     },
     "cost":{
        type: Number,
        require: true
     },
     "productDiscount":{
        type: Number,
        require: true
     },
     "profit":{
        type: Number,
        require: true
     },
     "SaleCount":{
        type: Number,
        require: true
     },
     "sellingPrice":{
        type: Number,
        require: true
     },

})

const productCollection = model('productCollection',ProductCollectionSchema)

module.exports = productCollection