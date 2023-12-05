require("dotenv").config();

const config = {
    LOCAL_CLIENT: process.env.LOCAL_CLIENT,
    CLIENT : process.env.CLIENT ,
    STRIPE_SECRECT_TOKEN : process.env.STRIPE_SECRECT_TOKEN
}
module.exports = Object.freeze(config);