const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
    "name":{
        type:String ,
        required: true
    },
    "email":{
        type:String ,
        required: true
    },
    "role": {
        type: String,
        default: "user"
    },
    "shopeName":{
        type: String,
        default: 'no shop'
    },
    "userImg":{
        type: String,
        default: 'no shop'
    },
    "subShopManger":[{
        "role":{
            type: String,
            required: false
        },
        "email":{
            type: String,
            required: false
        },
    }]
})

const UsersCollection =model('Users',UserSchema)

module.exports = UsersCollection 