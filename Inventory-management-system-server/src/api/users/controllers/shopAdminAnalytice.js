const shopAdminAnalyticeData = require("../../../lib/users/shopAdminAnalytice");

const shopAdminAnalyticeApi = async(req,res) =>{
        const email = req.params;
        console.log(email,'admin income api');
        const result = await shopAdminAnalyticeData(email)
        res.send(result);
}

module.exports = shopAdminAnalyticeApi