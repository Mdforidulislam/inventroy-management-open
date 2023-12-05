const mongoose = require("mongoose");


const salesCollectionSchema = new mongoose.Schema({
          "transactionId":{
            type:String,
            require:true
          },
          "shopeName":{
            type:String,
            require:true
          },
          "userEmail":{
            type:String,
            require:true
          },
          "productName":{
            type:String,
            require:true
          },
          "image":{
            type:String,
            require:true
          },
          "formattedDate":{
            type:String,
            require:true
          },
          "profit":{
            type: Number,
            require:true
          },
          "amount":{
            type:Number,
            require:true
          },
          "seling":{
            type:Number,
            require:true
          }
})

const salesCollection = mongoose.model('salesCollection',salesCollectionSchema)

module.exports = salesCollection