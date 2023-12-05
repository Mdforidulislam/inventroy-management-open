const { Schema, model } = require("mongoose");


const AdminIncomSchema = new Schema({
    "usd":{
        type: Number,
        require: true
    },
    "shopeName":{
        type:String,
        require:true
    },
    "adminEmail":{
        type:String,
        require:true
    }
})

const AdminIncome = model('adminIncome',AdminIncomSchema)

module.exports = AdminIncome