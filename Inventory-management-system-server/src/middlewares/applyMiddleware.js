const cookiesParser = require('cookie-parser');
const cors = require('cors');
const express = require('express');
const { LOCAL_CLIENT, CLIENT } = require('../config/defaults');

const applaymiddleware = (app) =>{
    app.use(cors({
        origin:[
            LOCAL_CLIENT,
            CLIENT
        ],
        credentials:true
    }));
    app.use(express.json())
    app.use(cookiesParser())
}


module.exports = {applaymiddleware}