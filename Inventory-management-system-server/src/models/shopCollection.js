const { Schema, model } = require("mongoose");

const ShopeCollectionSchema = new Schema({
    "shopeName":{
        type: String ,
        required: true
    },
    "ShopOwner":{
        type: String,
        required: true
    },
    "ownerEmail":{
        type: String,
        required: true
    },
    "location":{
        type: String,
        required: true
    },
    
    "massage":{
        type: String,
        required: true
    },
    "shopLogo":{
        type: String,
        required: true
    },
    "productLimit":{
        type: Number,
        required: true
    },
    "shopid":{
        type: String,
        required: true
    }

})

const ShopeCollection = model('shoplist',ShopeCollectionSchema)
module.exports = ShopeCollection